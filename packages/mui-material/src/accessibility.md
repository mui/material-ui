# Accessibility conformance reports

Each component is rated against WCAG 2.2 Level A and AA and documented at `<Component>/accessibility.md`.

## The status line

For each SC this indicates:

1. How well it conforms
2. Whether the library or user (the author) is responsible for conformance

```text
<conformance> · <responsibility>
```

For example this:

```text
⚠️ Partially Supports · ● Component
```

Means:

1. Partially conforms
2. The component is fully responsible for WCAG conformance

## Conformance

Whether the component meets the applicable Success Criterion. [VPAT](https://www.itic.org/policy/accessibility/vpat) terminology is used:

| Symbol | Term               | Description                                     |
| :----- | :----------------- | :---------------------------------------------- |
| ✅     | Supports           | Met, no known defects.                          |
| ⚠️     | Partially Supports | Some functionality fails.                       |
| ❌     | Does Not Support   | Most functionality fails.                       |
| ➖     | Not Applicable     | The criterion does not apply to this component. |

A criterion is **flagged** (`🚩`, shown first in its status line) when its rating is assessed from the component's source but not yet confirmed by a test or recorded review. The flag concerns evidence, not conformance, and does not imply a defect.

## Responsibility

Whether the responsibility for meeting conformance is on the library, the author (library user), or shared.

| Symbol | Term      | Description                                                 |
| :----- | :-------- | :---------------------------------------------------------- |
| ●      | Component | Satisfied on its own.                                       |
| ◐      | Shared    | Satisfied when the component is used as documented.         |
| ○      | Author    | Depends on your implementation and the surrounding content. |

## Testing-method groups

Criteria are grouped by testing method, and roughly sorted by descending order of "human judgement required".

| Symbol | Group     | What it takes                                                                           |
| :----- | :-------- | :-------------------------------------------------------------------------------------- |
| 🔍     | Manual    | Human, visual, or assistive-technology judgment.                                        |
| 🔁     | Hybrid    | Automation catches regressions; judgment still needed.                                  |
| ⚙️     | Automated | A deterministic test proves it. `🚩` means such a test is feasible but not yet written. |

## Scope

Components are rated in isolation against WCAG 2.2 A and AA. The levels are [cumulative](https://www.w3.org/WAI/WCAG2AA-Conformance), that is, AA includes all of A.

## How it works

A report is a **claim**; a test is the **proof**. The two are kept apart on purpose: the reports are what the public page is built from, and CI's job is to stop a claim standing without proof behind it.

### The claim

Each `<Component>/accessibility.md` rates every applicable success criterion, and records how it is tested and who is responsible. That file is written by hand — it cannot be generated, because most criteria need human judgment.

### The proof

Three kinds of test, none of which writes anything into a report:

| Kind                    | Where                                                    | Covers                                                                                     |
| :---------------------- | :------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| Unit tests              | `<Component>/<Component>.test.js`, named `it('2.1.1 …')` | Behavior: keyboard operation, focus order, pointer cancellation, accessible naming         |
| axe-core                | The docs demos, inside the Playwright loop               | The mechanical layer: ARIA, labels, text contrast, target size                             |
| Playwright layout suite | `test/regressions/index.test.js`                         | What axe has no rule for: reflow at 320px, 200% text size, the WCAG text-spacing overrides |

axe results are written to `docs/data/material/components/{slug}/{slug}.a11y.json` and committed, so a change that alters them fails CI. **Those files are a tripwire, not a data source** — nothing downstream reads them.

### The rollup

`pnpm a11y:scorecard` reads every `<Component>/accessibility.md` and regenerates three things:

- the [Reports](#reports) table below
- the summary table on the public [accessibility conformance page](../../../docs/data/material/getting-started/accessibility/accessibility.md), between its `scorecard` markers
- `docs/data/material/getting-started/accessibility/scorecard.json`, the machine-readable rollup

None of those numbers are typed by hand. Edit the reports and re-run the command.

### What CI enforces

| Job                | Check                                                                                                                                                                                  |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test_unit`        | The unit tests pass.                                                                                                                                                                   |
| `test_regressions` | axe and the layout suite pass, and the committed `*.a11y.json` still match.                                                                                                            |
| `test_static`      | `pnpm a11y:scorecard:check` — the generated tables are current, and no criterion is rated ⚙️ Automated while still flagged `🚩` or without citing the test or axe rule that proves it. |

That last check is the link between claim and proof. It is a **citation** check, not a mechanical trace: it verifies the entry names its evidence, not that the named test genuinely proves the criterion. That judgment stays with the reviewer.

## Reports

Generated by `pnpm a11y:scorecard` from the count table at the top of each
component report. Edit the reports, not this table.

<!-- scorecard:start -->

| Component                                                 | ✅ Supports | ⚠️ Partially Supports | ❌ Does Not Support | ➖ Not Applicable | 🚩 Flagged |
| :-------------------------------------------------------- | :---------- | :-------------------- | :------------------ | :---------------- | :--------- |
| [Accordion](./Accordion/accessibility.md)                 | 19          | 0                     | 0                   | 31                | 3/19       |
| [AccordionSummary](./AccordionSummary/accessibility.md)   | 23          | 1                     | 0                   | 31                | 3/24       |
| [Avatar](./Avatar/accessibility.md)                       | 9           | 2                     | 0                   | 44                | 5/11       |
| [Button](./Button/accessibility.md)                       | 23          | 4                     | 0                   | 28                | 7/27       |
| [Checkbox](./Checkbox/accessibility.md)                   | 22          | 3                     | 0                   | 30                | 3/25       |
| [LinearProgress](./LinearProgress/accessibility.md)       | 8           | 3                     | 0                   | 44                | 5/11       |
| [Radio](./Radio/accessibility.md)                         | 23          | 2                     | 0                   | 30                | 2/25       |
| [RadioGroup](./RadioGroup/accessibility.md)               | 7           | 0                     | 0                   | 30                | 3/7        |
| [Switch](./Switch/accessibility.md)                       | 23          | 2                     | 0                   | 30                | 2/25       |
| [TextField](./TextField/accessibility.md)                 | 25          | 3                     | 0                   | 27                | 4/28       |
| [ToggleButton](./ToggleButton/accessibility.md)           | 20          | 4                     | 0                   | 31                | 2/24       |
| [ToggleButtonGroup](./ToggleButtonGroup/accessibility.md) | 4           | 0                     | 0                   | 31                | 1/4        |
| **12 components**                                         | **206**     | **24**                | **0**               | **387**           | **40**     |

<!-- scorecard:end -->

The same rollup feeds the public [accessibility conformance page](../../../docs/data/material/getting-started/accessibility/accessibility.md), which restates these results for procurement in VPAT form.
