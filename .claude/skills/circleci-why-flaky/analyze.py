#!/usr/bin/env python3
"""Classify CircleCI workflow failures by root cause.

Outputs a markdown bullet list (stdout) of flake buckets with example links,
plus a summary of real (non-flake) failures.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone

API = "https://circleci.com/api/v2"
API_V1 = "https://circleci.com/api/v1.1"
APP = "https://app.circleci.com"
ANSI = re.compile(r"\x1b\[[0-9;]*[A-Za-z]")

# (label, category, regex) — first match wins.
# Flake patterns first, then real-issue patterns. Order matters within each group.
RULES: list[tuple[str, str, re.Pattern]] = [
    # ---- Flake ----
    (
        "vitest browser: birpc rpc closed (page died mid-test)",
        "flake",
        re.compile(r"\[birpc\] rpc is closed.*createTesters", re.I),
    ),
    (
        "vitest browser: failed to connect to session within timeout",
        "flake",
        re.compile(r'Failed to connect to the browser session "[^"]+" \[[^\]]+\] within the timeout', re.I),
    ),
    (
        "playwright: target page/browser closed",
        "flake",
        re.compile(r"TargetClosedError|Target page, context or browser has been closed", re.I),
    ),
    (
        "OOM / JavaScript heap out of memory",
        "flake",
        re.compile(r"JavaScript heap out of memory|FATAL ERROR.*allocation failed", re.I),
    ),
    (
        "apt-get could not reach archive.ubuntu.com (mirror outage)",
        "flake",
        re.compile(r"Unable to connect to archive\.ubuntu\.com|Failed to fetch http://(?:archive|security)\.ubuntu\.com", re.I),
    ),
    (
        "network error (ECONNRESET / ETIMEDOUT / DNS)",
        "flake",
        re.compile(r"ECONNRESET|ETIMEDOUT|getaddrinfo ENOTFOUND|EAI_AGAIN|socket hang up", re.I),
    ),
    (
        "npm/pnpm registry fetch failed",
        "flake",
        re.compile(r"ERR_PNPM_FETCH|ERR_PNPM_META_FETCH_FAIL|registry\.npmjs\.org.*ERR", re.I),
    ),
    (
        "disk: no space left on device",
        "flake",
        re.compile(r"no space left on device", re.I),
    ),
    # ---- Real (code/config) ----
    (
        "propTypes drift (run `pnpm proptypes`)",
        "real",
        re.compile(r"^[\-+] {2,}\w+: +PropTypes\.", re.M),
    ),
    (
        "TypeScript error",
        "real",
        re.compile(r"error TS\d{3,5}:", re.I),
    ),
    (
        "ESLint error",
        "real",
        re.compile(r"\d+ problems? \(\d+ errors?", re.I),
    ),
    (
        "test assertion failure",
        "real",
        re.compile(r"AssertionError|Expected:.*Received:|^.+ ✗ ", re.M | re.I),
    ),
]

STEP_TIMEOUT_LABEL = "step exceeded the time limit (likely a hung process)"


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def http_get(url: str, token: str | None = None, raw: bool = False, timeout: int = 30):
    headers = {"Accept": "application/json"}
    if token:
        headers["Circle-Token"] = token
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read() if raw else json.load(r)


def infer_repo() -> tuple[str, str, str] | None:
    try:
        url = subprocess.check_output(
            ["git", "remote", "get-url", "origin"], text=True, stderr=subprocess.DEVNULL
        ).strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None
    m = re.search(r"(github\.com|bitbucket\.org)[:/]([^/]+)/([^/.\s]+?)(?:\.git)?/?$", url)
    if not m:
        return None
    vcs = "github" if "github.com" in m.group(1) else "bitbucket"
    return vcs, m.group(2), m.group(3)


def infer_branch() -> str | None:
    try:
        b = subprocess.check_output(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"], text=True, stderr=subprocess.DEVNULL
        ).strip()
        return b if b and b != "HEAD" else None
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def load_token_from_cli_yml() -> str | None:
    path = os.path.expanduser("~/.circleci/cli.yml")
    if not os.path.exists(path):
        return None
    with open(path) as f:
        for line in f:
            m = re.match(r"^\s*token:\s*(\S+)\s*$", line)
            if m:
                tok = m.group(1)
                if tok and not tok.startswith("#"):
                    return tok
    return None


def setup_instructions(slug: str) -> str:
    return (
        f"\nCannot read CircleCI data for {slug}. The project is private (or unreachable) and no\n"
        "valid token was found.\n\n"
        "Install the CircleCI CLI:\n"
        "  macOS:  brew install circleci\n"
        "  Linux:  curl -fLSs https://raw.githubusercontent.com/CircleCI-Public/circleci-cli/main/install.sh | bash\n\n"
        "Then authenticate (writes ~/.circleci/cli.yml):\n"
        "  circleci setup\n\n"
        "After that, rerun this skill.\n"
    )


def check_access(slug: str, token: str | None) -> tuple[bool, bool, str]:
    """Return (ok, needs_token, mode_label)."""
    try:
        http_get(f"{API}/project/{slug}/pipeline?branch=master")
        return True, False, "public"
    except urllib.error.HTTPError as e:
        if e.code in (401, 403, 404):
            if not token:
                return False, True, f"private ({e.code})"
            try:
                http_get(f"{API}/project/{slug}/pipeline?branch=master", token=token)
                return True, True, "private + token"
            except urllib.error.HTTPError as e2:
                return False, True, f"token rejected ({e2.code})"
        raise


def fetch_pipelines(slug: str, branch: str, since: datetime, token: str | None):
    out = []
    page_token = None
    while True:
        url = f"{API}/project/{slug}/pipeline?branch={branch}"
        if page_token:
            url += f"&page-token={page_token}"
        data = http_get(url, token=token)
        items = data.get("items", [])
        if not items:
            break
        stop = False
        for p in items:
            created = datetime.fromisoformat(p["created_at"].replace("Z", "+00:00"))
            if created < since:
                stop = True
                break
            out.append(p)
        if stop:
            break
        page_token = data.get("next_page_token")
        if not page_token:
            break
    return out


def commit_subject(p: dict) -> str:
    v = (p.get("vcs") or {}).get("commit") or {}
    if v.get("subject"):
        return v["subject"]
    msg = ((p.get("trigger_parameters") or {}).get("git") or {}).get("commit_message", "")
    return msg.split("\n", 1)[0][:120]


def revision(p: dict) -> str | None:
    v = p.get("vcs") or {}
    if v.get("revision"):
        return v["revision"]
    return ((p.get("trigger_parameters") or {}).get("git") or {}).get("checkout_sha")


def classify(text: str, timed_out: bool) -> tuple[str, str]:
    if timed_out:
        return STEP_TIMEOUT_LABEL, "flake"
    if not text:
        return "(no log available)", "unclassified"
    snippet = text[-150_000:]  # last ~150KB — failures are near the end
    for label, cat, pat in RULES:
        if pat.search(snippet):
            return label, cat
    return "unclassified", "unclassified"


def workflow_url(vcs: str, org: str, repo: str, pipeline_number: int, wf_id: str) -> str:
    return f"{APP}/pipelines/{vcs}/{org}/{repo}/{pipeline_number}/workflows/{wf_id}"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--org")
    ap.add_argument("--repo")
    ap.add_argument("--vcs", choices=["github", "bitbucket"])
    ap.add_argument("--branch", help="default: current git branch")
    ap.add_argument("--workflow", help="filter to a specific workflow name (default: all)")
    ap.add_argument("--days", type=int, default=7)
    ap.add_argument("--max", type=int, default=200, help="max failed workflows to deep-analyze")
    ap.add_argument("--token", help="CircleCI token; overrides ~/.circleci/cli.yml")
    ap.add_argument("--cache-dir", default=os.path.join(tempfile.gettempdir(), "circleci-why-flaky-cache"))
    args = ap.parse_args()

    # ---- infer project ----
    if not (args.org and args.repo and args.vcs):
        info = infer_repo()
        if not info:
            print(
                "error: cannot infer repo from `git remote get-url origin`.\n"
                "       Pass --org, --repo, and --vcs explicitly.",
                file=sys.stderr,
            )
            return 2
        vcs, org, repo = info
        args.vcs = args.vcs or vcs
        args.org = args.org or org
        args.repo = args.repo or repo

    if not args.branch:
        args.branch = infer_branch() or "master"

    token = args.token or load_token_from_cli_yml()
    slug = f"{'gh' if args.vcs == 'github' else 'bb'}/{args.org}/{args.repo}"

    # ---- access check ----
    ok, needs_token, mode = check_access(slug, token)
    if not ok:
        print(setup_instructions(slug), file=sys.stderr)
        return 3
    used_token = token if needs_token else None  # don't send token if unauth works

    # ---- prep cache ----
    os.makedirs(args.cache_dir, exist_ok=True)

    since = datetime.now(timezone.utc) - timedelta(days=args.days)
    log(f"project: {slug} | branch: {args.branch} | window: {args.days}d | access: {mode}")

    # ---- 1. pipelines ----
    t0 = time.time()
    log(f"fetching pipelines on {args.branch} since {since.date()}...")
    pipelines = fetch_pipelines(slug, args.branch, since, used_token)
    log(f"  {len(pipelines)} pipelines  ({time.time()-t0:.1f}s)")
    if not pipelines:
        print(f"No pipelines on `{args.branch}` in the last {args.days} days.")
        return 0

    # ---- 2. workflows ----
    t0 = time.time()
    log("fetching workflows...")
    def fetch_wfs(p):
        return p["id"], http_get(f"{API}/pipeline/{p['id']}/workflow", token=used_token).get("items", [])
    with ThreadPoolExecutor(max_workers=16) as ex:
        wfs_per_pipe = dict(ex.map(fetch_wfs, pipelines))
    log(f"  done ({time.time()-t0:.1f}s)")

    pipe_by_id = {p["id"]: p for p in pipelines}
    all_wfs = []
    for pid, wfs in wfs_per_pipe.items():
        for w in wfs:
            if args.workflow and w.get("name") != args.workflow:
                continue
            p = pipe_by_id[pid]
            all_wfs.append({
                "wf_id": w["id"],
                "wf_name": w["name"],
                "status": w["status"],
                "pipeline_id": pid,
                "pipeline_number": p["number"],
                "created_at": w["created_at"],
                "subject": commit_subject(p),
                "revision": revision(p),
            })
    failed_wfs = [w for w in all_wfs if w["status"] in ("failed", "failing")]
    total_wfs = len(all_wfs)
    if total_wfs == 0:
        target = f"workflow {args.workflow!r}" if args.workflow else "any workflow"
        print(f"No {target} runs on `{args.branch}` in the last {args.days} days.")
        return 0

    if not args.workflow:
        wf_names = Counter(w["wf_name"] for w in all_wfs)
        log(f"  workflows: {', '.join(f'{n}={c}' for n,c in wf_names.most_common())}")

    failure_rate = 100 * len(failed_wfs) / total_wfs
    log(f"  failed: {len(failed_wfs)}/{total_wfs} ({failure_rate:.1f}%)")
    if not failed_wfs:
        print(f"No failed workflows on `{args.branch}` in the last {args.days} days ({total_wfs} runs all green).")
        return 0

    failed_wfs.sort(key=lambda w: w["created_at"], reverse=True)
    if len(failed_wfs) > args.max:
        log(f"  capping deep analysis at {args.max} (most recent)")
        failed_wfs = failed_wfs[: args.max]

    # ---- 3. failed jobs ----
    t0 = time.time()
    log("fetching failed jobs...")
    def fetch_failed_jobs(w):
        jobs = http_get(f"{API}/workflow/{w['wf_id']}/job", token=used_token).get("items", [])
        return w["wf_id"], [j for j in jobs if j.get("status") in ("failed", "timedout")]
    with ThreadPoolExecutor(max_workers=16) as ex:
        jobs_per_wf = dict(ex.map(fetch_failed_jobs, failed_wfs))
    log(f"  done ({time.time()-t0:.1f}s)")

    wf_by_id = {w["wf_id"]: w for w in failed_wfs}
    failed_jobs = []
    for wfid, jobs in jobs_per_wf.items():
        for j in jobs:
            failed_jobs.append({
                **wf_by_id[wfid],
                "job_number": j["job_number"],
                "job_name": j["name"],
            })
    log(f"  {len(failed_jobs)} failed jobs")

    # ---- 4. v1.1 job details (failed step output URLs) ----
    t0 = time.time()
    log("fetching job step details...")
    def fetch_detail(j):
        try:
            d = http_get(f"{API_V1}/project/{args.vcs}/{args.org}/{args.repo}/{j['job_number']}", token=used_token)
        except Exception:
            return j["job_number"], {"steps": [], "timed_out": False}
        out = {"steps": [], "timed_out": False}
        for s in d.get("steps", []):
            for a in s.get("actions", []):
                if a.get("status") == "timedout":
                    out["timed_out"] = True
                if a.get("failed") or a.get("status") in ("failed", "timedout"):
                    if a.get("output_url"):
                        out["steps"].append(a["output_url"])
        return j["job_number"], out
    with ThreadPoolExecutor(max_workers=16) as ex:
        details = dict(ex.map(fetch_detail, failed_jobs))
    log(f"  done ({time.time()-t0:.1f}s)")

    # ---- 5. step logs ----
    t0 = time.time()
    log("downloading step logs...")
    log_tasks = []
    for j in failed_jobs:
        for i, url in enumerate(details[j["job_number"]]["steps"]):
            log_tasks.append((j["job_number"], i, url))

    def fetch_log(item):
        jobnum, idx, url = item
        cache_path = os.path.join(args.cache_dir, f"{jobnum}_{idx}.txt")
        if os.path.exists(cache_path):
            try:
                with open(cache_path) as f:
                    return (jobnum, idx), f.read()
            except OSError:
                pass
        try:
            data = http_get(url, raw=True, timeout=60)
            text = ANSI.sub("", "".join(m.get("message", "") for m in json.loads(data)))
            # cache only the tail to keep disk small
            try:
                with open(cache_path, "w") as f:
                    f.write(text[-200_000:])
            except OSError:
                pass
            return (jobnum, idx), text
        except Exception as e:
            return (jobnum, idx), ""

    log_map: dict[tuple[int, int], str] = {}
    with ThreadPoolExecutor(max_workers=24) as ex:
        for key, text in ex.map(fetch_log, log_tasks):
            log_map[key] = text
    log(f"  {len(log_tasks)} step logs ({time.time()-t0:.1f}s)")

    # ---- 6. classify ----
    log("classifying...")
    buckets: dict[str, list[dict]] = defaultdict(list)
    bucket_cat: dict[str, str] = {}
    for j in failed_jobs:
        d = details[j["job_number"]]
        text_parts = [log_map.get((j["job_number"], i), "") for i in range(len(d["steps"]))]
        text = "\n".join(text_parts)
        label, cat = classify(text, d["timed_out"])
        buckets[label].append(j)
        bucket_cat[label] = cat

    # ---- 7. emit markdown ----
    total = len(failed_jobs)
    flake_buckets = sorted(
        ((l, jobs) for l, jobs in buckets.items() if bucket_cat[l] == "flake"),
        key=lambda x: -len(x[1]),
    )
    unc_buckets = sorted(
        ((l, jobs) for l, jobs in buckets.items() if bucket_cat[l] == "unclassified"),
        key=lambda x: -len(x[1]),
    )
    real_count = sum(len(jobs) for l, jobs in buckets.items() if bucket_cat[l] == "real")

    print(f"# {args.org}/{args.repo} `{args.branch}` — last {args.days} days")
    print()
    print(
        f"**{len(failed_wfs)}/{total_wfs}** workflow runs failed "
        f"({failure_rate:.0f}% failure rate). **{total} failed jobs** classified."
    )
    print()

    def link_of(jobs: list[dict]) -> str:
        ex = max(jobs, key=lambda j: j["created_at"])
        return workflow_url(args.vcs, args.org, args.repo, ex["pipeline_number"], ex["wf_id"])

    for label, jobs in flake_buckets:
        pct = 100 * len(jobs) / total
        print(f"- {len(jobs)} times, {pct:.1f}%, {label}, [example]({link_of(jobs)})")
    for label, jobs in unc_buckets:
        pct = 100 * len(jobs) / total
        print(f"- {len(jobs)} times, {pct:.1f}%, unclassified (manual inspection needed), [example]({link_of(jobs)})")
    if real_count:
        print(f"- **{real_count} real issues (not flaky)** — code or config bugs, not bucketed individually")

    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        sys.exit(130)
    except urllib.error.HTTPError as e:
        log(f"HTTP error: {e.code} {e.reason}")
        sys.exit(1)
