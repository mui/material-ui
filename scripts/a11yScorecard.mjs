/* eslint-disable no-console */
/**
 * Aggregates the per-component conformance reports into a library-level scorecard.
 *
 * Each `packages/mui-material/src/<Component>/accessibility.md` opens with a
 * count table rating the component against WCAG 2.2 Level A and AA. This script
 * parses those reports and rewrites three generated outputs:
 *
 * - the `Reports` table in `packages/mui-material/src/accessibility.md`
 * - the summary table on the public conformance page
 * - `docs/data/material/getting-started/accessibility/scorecard.json`, the
 *   machine-readable rollup behind both.
 *
 * Run with `pnpm a11y:scorecard`; `--check` exits non-zero when either output is
 * stale, so CI can guard against a report landing without its rollup.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as prettier from 'prettier';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, '..');
const componentsDirectory = path.join(rootDirectory, 'packages/mui-material/src');
const indexPath = path.join(componentsDirectory, 'accessibility.md');
const scorecardPath = path.join(
  rootDirectory,
  'docs/data/material/getting-started/accessibility/scorecard.json',
);
const docsPagePath = path.join(
  rootDirectory,
  'docs/data/material/getting-started/accessibility/accessibility.md',
);
const checklistPath = path.join(componentsDirectory, 'manual-testing.md');

const START_MARKER = '<!-- scorecard:start -->';
const END_MARKER = '<!-- scorecard:end -->';

/**
 * Rows are `| <label> | <count> |`. The label carries the symbol, so match on
 * the symbol rather than the wording, which varies ("Inherited (see Radio)").
 */
const COUNT_ROW_REGEX = /^\|\s*(.+?)\s*\|\s*([\d]+(?:\/\d+)?)\s*\|$/;

const FIELDS = [
  ['✅', 'supports'],
  ['⚠️', 'partiallySupports'],
  ['❌', 'doesNotSupport'],
  ['➖', 'notApplicable'],
  ['↗', 'inherited'],
  ['🚩', 'flagged'],
];

/** `#### 1.4.3 Contrast (Minimum) · AA` */
const CRITERION_HEADING_REGEX = /^#### (\d+\.\d+\.\d+) (.+?) · (A|AA)\s*$/;

/** `### 🔁 Hybrid` — criteria are grouped by how they are tested. */
const TESTING_GROUP_REGEX = /^### (🔍|🔁|⚙️) (Manual|Hybrid|Automated)\s*$/;

const CONFORMANCE_BY_SYMBOL = {
  '✅': 'Supports',
  '⚠️': 'Partially Supports',
  '❌': 'Does Not Support',
  '➖': 'Not Applicable',
};

/** Worst-first: the library-level rating for a criterion is the worst any component scores. */
const CONFORMANCE_SEVERITY = [
  'Does Not Support',
  'Partially Supports',
  'Supports',
  'Not Applicable',
];

/**
 * Each criterion heading is followed by a status line of backticked tokens:
 * an optional `🚩` evidence flag, the conformance rating, then who is
 * responsible for meeting it.
 */
function parseCriteria(markdown) {
  const lines = markdown.split('\n');
  const criteria = [];
  let group = null;

  /** Everything between this heading and the next one — used to check citations. */
  const bodyAfter = (index) => {
    const rest = lines.slice(index + 1);
    const nextHeading = rest.findIndex((line) => /^#{2,4} /.test(line));
    return (nextHeading === -1 ? rest : rest.slice(0, nextHeading)).join('\n');
  };

  lines.forEach((line, index) => {
    const groupHeading = line.match(TESTING_GROUP_REGEX);
    if (groupHeading) {
      [, , group] = groupHeading;
      return;
    }
    const heading = line.match(CRITERION_HEADING_REGEX);
    if (!heading) {
      return;
    }
    const [, number, name, level] = heading;
    const statusLine =
      lines.slice(index + 1, index + 4).find((candidate) => candidate.trim()) ?? '';
    const tokens = [...statusLine.matchAll(/`([^`]+)`/g)].map((match) => match[1]);

    const flagged = tokens.some((token) => token.includes('🚩'));
    const conformanceToken = tokens.find((token) =>
      Object.keys(CONFORMANCE_BY_SYMBOL).some((symbol) => token.startsWith(symbol)),
    );
    const symbol = Object.keys(CONFORMANCE_BY_SYMBOL).find((candidate) =>
      conformanceToken?.startsWith(candidate),
    );
    const responsibilityToken = tokens.find((token) => /^[●◐○]/.test(token));

    criteria.push({
      number,
      name,
      level,
      conformance: symbol ? CONFORMANCE_BY_SYMBOL[symbol] : null,
      responsibility: responsibilityToken?.replace(/^[●◐○]\s*/, '') ?? null,
      group,
      flagged,
      body: bodyAfter(index),
      pass: bodyAfter(index).match(/^\*\*Pass:\*\* (.+)$/m)?.[1] ?? null,
    });
  });

  return criteria;
}

/** Collapses the per-component criteria into one row per success criterion. */
function rollUpCriteria(reports) {
  const byNumber = new Map();

  for (const report of reports) {
    for (const criterion of report.criteria) {
      const existing = byNumber.get(criterion.number);
      if (!existing) {
        byNumber.set(criterion.number, {
          number: criterion.number,
          name: criterion.name,
          level: criterion.level,
          conformance: criterion.conformance,
          flagged: criterion.flagged,
          affected: criterion.conformance === 'Partially Supports' ? [report.component] : [],
        });
        continue;
      }

      if (criterion.conformance === 'Partially Supports') {
        existing.affected.push(report.component);
      }
      existing.flagged = existing.flagged || criterion.flagged;

      const currentRank = CONFORMANCE_SEVERITY.indexOf(existing.conformance);
      const incomingRank = CONFORMANCE_SEVERITY.indexOf(criterion.conformance);
      if (incomingRank !== -1 && (currentRank === -1 || incomingRank < currentRank)) {
        existing.conformance = criterion.conformance;
      }
    }
  }

  return [...byNumber.values()].sort((a, b) =>
    a.number.localeCompare(b.number, undefined, { numeric: true }),
  );
}

function parseReport(markdown) {
  const counts = {};
  for (const line of markdown.split('\n')) {
    const match = line.match(COUNT_ROW_REGEX);
    if (!match) {
      continue;
    }
    const [, label, value] = match;
    const field = FIELDS.find(([symbol]) => label.startsWith(symbol));
    if (field) {
      counts[field[1]] = value;
    }
  }

  // "## Known gaps" runs until the next heading. Bullets that open with a
  // conformance symbol are the gaps; prose ("No group-level gaps.") is not.
  const gapsSection = markdown.match(/^## Known gaps\n([\s\S]*?)(?=\n## )/m);
  const gaps = (gapsSection?.[1] ?? '')
    .split('\n')
    .filter((line) => /^- (⚠️|❌|Inherits:)/.test(line.trim()))
    .map((line) => line.trim().replace(/^- /, ''));

  const criteria = parseCriteria(markdown);
  return { counts, gaps, criteria, summary: summarize(criteria) };
}

/**
 * The per-component row on the public page: how many criteria apply, how they
 * split by level, how they conform, and how strong the evidence is.
 *
 * `verified` counts criteria confirmed by a test or a recorded review — the
 * ones without a 🚩 flag. `automated` counts those a deterministic test proves
 * on its own, which is the subset that cannot silently regress.
 */
function summarize(criteria) {
  const rated = criteria.filter((criterion) => criterion.conformance !== 'Not Applicable');
  const count = (predicate) => rated.filter(predicate).length;

  return {
    rated: rated.length,
    levelA: count((criterion) => criterion.level === 'A'),
    levelAA: count((criterion) => criterion.level === 'AA'),
    supports: count((criterion) => criterion.conformance === 'Supports'),
    partiallySupports: count((criterion) => criterion.conformance === 'Partially Supports'),
    doesNotSupport: count((criterion) => criterion.conformance === 'Does Not Support'),
    verified: count((criterion) => !criterion.flagged),
    automated: count((criterion) => criterion.group === 'Automated'),
  };
}

function toNumber(value) {
  if (value === undefined) {
    return 0;
  }
  // Flagged is reported as "12/27"; only the numerator is a count.
  return Number.parseInt(String(value).split('/')[0], 10);
}

async function collectReports() {
  const entries = await fs.readdir(componentsDirectory, { withFileTypes: true });

  const reports = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const reportPath = path.join(componentsDirectory, entry.name, 'accessibility.md');
        try {
          const markdown = await fs.readFile(reportPath, 'utf8');
          return { component: entry.name, ...parseReport(markdown) };
        } catch (error) {
          if (error.code !== 'ENOENT') {
            throw error;
          }
          // A component without a report simply has not been assessed yet.
          return null;
        }
      }),
  );

  return reports.filter(Boolean).sort((a, b) => a.component.localeCompare(b.component));
}

function renderTable(reports) {
  const header = [
    '| Component | ✅ Supports | ⚠️ Partially Supports | ❌ Does Not Support | ➖ Not Applicable | 🚩 Flagged |',
    '| :-------- | :---------- | :-------------------- | :------------------ | :---------------- | :--------- |',
  ];

  const rows = reports.map((report) => {
    const link = `[${report.component}](./${report.component}/accessibility.md)`;
    const cell = (key) => report.counts[key] ?? '—';
    return `| ${link} | ${cell('supports')} | ${cell('partiallySupports')} | ${cell('doesNotSupport')} | ${cell('notApplicable')} | ${cell('flagged')} |`;
  });

  const totals = FIELDS.reduce((accumulator, [, field]) => {
    accumulator[field] = reports.reduce((sum, report) => sum + toNumber(report.counts[field]), 0);
    return accumulator;
  }, {});

  const totalRow = `| **${reports.length} components** | **${totals.supports}** | **${totals.partiallySupports}** | **${totals.doesNotSupport}** | **${totals.notApplicable}** | **${totals.flagged}** |`;

  return { table: [...header, ...rows, totalRow].join('\n'), totals };
}

/** Formats generated output the way Prettier would, so `test_static` stays green. */
async function format(source, filepath) {
  const config = await prettier.resolveConfig(filepath);
  return prettier.format(source, { ...config, filepath });
}

const REPORT_BASE = 'https://github.com/mui/material-ui/blob/master/packages/mui-material/src';

/**
 * Which kind of change puts a criterion at risk. The manual checklist is
 * grouped by this so a styling change does not send you through keyboard checks.
 */
const TRIGGERS = [
  ['Styling, theme, or palette', /^1\.4\./],
  ['DOM structure, roles, or ARIA', /^(1\.1\.|1\.3\.|4\.1\.)/],
  ['Keyboard, focus, or pointer handling', /^(2\.1\.|2\.4\.|2\.5\.|3\.2\.)/],
  ['Labels, errors, or validation', /^3\.3\./],
  ['Motion or timing', /^2\.2\./],
];

const triggerFor = (number) => TRIGGERS.find(([, pattern]) => pattern.test(number))?.[0] ?? 'Other';

/**
 * A criterion still needs a person when no deterministic test proves it, and
 * when it is the component's responsibility rather than the application's.
 */
const needsHuman = (criterion) =>
  criterion.conformance !== 'Not Applicable' &&
  criterion.group !== 'Automated' &&
  criterion.responsibility !== 'Author';

/**
 * The pre-change checklist: every criterion a person still has to judge, using
 * the pass condition already written in the component report.
 */
function renderManualChecklist(reports) {
  const lines = [
    '# Manual accessibility checks',
    '',
    'Generated by `pnpm a11y:scorecard`. Edit the component reports, not this file.',
    '',
    'The accessibility checks a person still has to make by eye when changing a component.',
    'Anything not listed here is covered by a test — see [How it works](./accessibility.md#how-it-works).',
    '',
    'Two things are deliberately left out: criteria a deterministic test already proves',
    '(⚙️ Automated in the reports), and criteria that depend on the application rather than',
    'the component (○ Author).',
    '',
    '| Marker | Meaning |',
    '| :----- | :------ |',
    '| 🔍 | No automation. Check it by hand. |',
    '| 🔁 | Automation catches regressions; confirm the judgment still holds. |',
    '',
    '## What to re-check, by kind of change',
    '',
    'Run the rows matching what you touched, for the component you touched.',
    '',
    '| If your change touches… | Re-check |',
    '| :---------------------- | :------- |',
  ];

  const byTrigger = new Map([...TRIGGERS.map(([name]) => [name, new Set()]), ['Other', new Set()]]);
  for (const report of reports) {
    for (const criterion of report.criteria.filter(needsHuman)) {
      byTrigger.get(triggerFor(criterion.number)).add(`${criterion.number} ${criterion.name}`);
    }
  }
  for (const [name, criteria] of byTrigger) {
    const sorted = [...criteria].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (sorted.length > 0) {
      lines.push(`| ${name} | ${sorted.join('; ')} |`);
    }
  }
  lines.push('');

  for (const report of reports) {
    const checks = report.criteria.filter(needsHuman);
    if (checks.length === 0) {
      continue;
    }
    lines.push(
      `## ${report.component}`,
      '',
      `${checks.length} check${checks.length === 1 ? '' : 's'} · full procedures in [\`${report.component}/accessibility.md\`](./${report.component}/accessibility.md)`,
      '',
    );
    for (const criterion of checks) {
      const marker = criterion.group === 'Manual' ? '🔍' : '🔁';
      const pass = criterion.pass ? ` — ${criterion.pass}` : '';
      lines.push(`- [ ] ${marker} **${criterion.number} ${criterion.name}**${pass}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * The summary table on the public conformance page. Detail lives in the
 * per-component reports, so this stays to counts plus a link.
 */
function renderDocsTable(reports) {
  const header = [
    '| Component | Level A | Level AA | Rated | ✅ Supports | ⚠️ Partially Supports | Verified | Automated |',
    '| :-------- | ------: | -------: | ----: | ----------: | --------------------: | -------: | --------: |',
  ];

  const rows = reports.map(({ component, summary }) => {
    const link = `[${component}](${REPORT_BASE}/${component}/accessibility.md)`;
    return `| ${link} | ${summary.levelA} | ${summary.levelAA} | ${summary.rated} | ${summary.supports} | ${summary.partiallySupports} | ${summary.verified}/${summary.rated} | ${summary.automated} |`;
  });

  const sum = (key) => reports.reduce((total, report) => total + report.summary[key], 0);
  const totalRow = `| **${reports.length} components** | **${sum('levelA')}** | **${sum('levelAA')}** | **${sum('rated')}** | **${sum('supports')}** | **${sum('partiallySupports')}** | **${sum('verified')}/${sum('rated')}** | **${sum('automated')}** |`;

  return [...header, ...rows, totalRow].join('\n');
}

/**
 * An ⚙️ Automated rating is a claim that something deterministic proves the
 * criterion, so the entry has to say what: an axe rule, a unit test, or a
 * Playwright test. Prose reasoning alone is a Hybrid or Manual rating.
 */
const EVIDENCE_CITATION = /Covered by|Confirmed by|axe-core|a11y\.json/;

/**
 * A report must not claim more evidence than exists. Two invariants: an
 * Automated criterion cannot also be flagged 🚩 (the flag means no test
 * confirms it), and it must cite the evidence behind the claim.
 */
function findEvidenceViolations(reports) {
  const violations = [];

  for (const report of reports) {
    for (const criterion of report.criteria) {
      if (criterion.group !== 'Automated' || criterion.conformance === 'Not Applicable') {
        continue;
      }
      if (criterion.flagged) {
        violations.push(
          `${report.component} ${criterion.number}: rated Automated but still flagged 🚩`,
        );
      } else if (!EVIDENCE_CITATION.test(criterion.body ?? '')) {
        violations.push(
          `${report.component} ${criterion.number}: rated Automated but cites no test or axe rule`,
        );
      }
    }
  }

  return violations;
}

function replaceBlock(source, replacement) {
  const start = source.indexOf(START_MARKER);
  const end = source.indexOf(END_MARKER);
  if (start === -1 || end === -1) {
    throw new Error(
      `Missing ${START_MARKER} / ${END_MARKER} markers in packages/mui-material/src/accessibility.md`,
    );
  }
  return `${source.slice(0, start + START_MARKER.length)}\n\n${replacement}\n\n${source.slice(end)}`;
}

async function run(argv) {
  const check = argv.includes('--check');
  const reports = await collectReports();

  if (reports.length === 0) {
    throw new Error('No accessibility.md reports found under packages/mui-material/src');
  }

  const { table, totals } = renderTable(reports);

  const currentIndex = await fs.readFile(indexPath, 'utf8');

  const scorecard = {
    // Regenerated by scripts/a11yScorecard.mjs — do not edit by hand.
    standard: 'WCAG 2.2 Level A and AA',
    componentCount: reports.length,
    totals,
    criteria: rollUpCriteria(reports),
    // `body` is only needed for the evidence check, not by consumers.
    components: reports.map((report) => ({
      ...report,
      criteria: report.criteria.map(({ body, pass, ...criterion }) => criterion),
    })),
  };

  // All three outputs are committed, so they have to match what Prettier would
  // produce — otherwise `test_static` fails on a file nobody edited by hand.
  const nextIndex = await format(replaceBlock(currentIndex, table), indexPath);
  const nextScorecard = await format(JSON.stringify(scorecard, null, 2), scorecardPath);

  // The public page is optional: the rollup tooling can land before it, and
  // anyone can regenerate the index and JSON without the docs page present.
  let currentDocsPage = null;
  try {
    currentDocsPage = await fs.readFile(docsPagePath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
  const nextDocsPage =
    currentDocsPage === null
      ? null
      : await format(replaceBlock(currentDocsPage, renderDocsTable(reports)), docsPagePath);

  const nextChecklist = await format(renderManualChecklist(reports), checklistPath);
  let currentChecklist = null;
  try {
    currentChecklist = await fs.readFile(checklistPath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  let currentScorecard = null;
  try {
    currentScorecard = await fs.readFile(scorecardPath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const stale =
    nextIndex !== currentIndex ||
    nextScorecard !== currentScorecard ||
    nextDocsPage !== currentDocsPage ||
    nextChecklist !== currentChecklist;

  const violations = findEvidenceViolations(reports);

  if (check) {
    if (violations.length > 0) {
      console.error('Reports claim automated evidence that does not exist:\n');
      violations.forEach((violation) => console.error(`  ${violation}`));
      console.error(
        '\nEither write the test, or move the criterion to 🔁 Hybrid / 🔍 Manual in the report.',
      );
      process.exit(1);
    }
    if (stale) {
      console.error(
        'Accessibility scorecard is out of date. Run `pnpm a11y:scorecard` and commit the result.',
      );
      process.exit(1);
    }
    console.log(`Accessibility scorecard is up to date (${reports.length} components).`);
    return;
  }

  if (violations.length > 0) {
    console.warn('Warning: reports claim automated evidence that does not exist:');
    violations.forEach((violation) => console.warn(`  ${violation}`));
  }

  await fs.writeFile(indexPath, nextIndex);
  await fs.mkdir(path.dirname(scorecardPath), { recursive: true });
  await fs.writeFile(scorecardPath, nextScorecard);
  await fs.writeFile(checklistPath, nextChecklist);
  if (nextDocsPage !== null) {
    await fs.writeFile(docsPagePath, nextDocsPage);
  }

  console.log(`Scorecard updated for ${reports.length} components:`);
  console.log(
    `  ✅ ${totals.supports}  ⚠️ ${totals.partiallySupports}  ❌ ${totals.doesNotSupport}  ➖ ${totals.notApplicable}  🚩 ${totals.flagged}`,
  );
}

run(process.argv.slice(2)).catch((error) => {
  console.error(error);
  process.exit(1);
});
