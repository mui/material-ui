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

## Reports

| Component                                                 | ✅ Supports | ⚠️ Partially Supports | ❌ Does Not Support | ➖ Not Applicable |
| :-------------------------------------------------------- | :---------- | :-------------------- | :------------------ | :---------------- |
| [Accordion](./Accordion/accessibility.md)                 | 19          | 0                     | 0                   | 31                |
| [AccordionSummary](./AccordionSummary/accessibility.md)   | 23          | 1                     | 0                   | 31                |
| [Avatar](./Avatar/accessibility.md)                       | 9           | 2                     | 0                   | 44                |
| [Button](./Button/accessibility.md)                       | 23          | 4                     | 0                   | 28                |
| [Checkbox](./Checkbox/accessibility.md)                   | 23          | 2                     | 0                   | 30                |
| [LinearProgress](./LinearProgress/accessibility.md)       | 8           | 3                     | 0                   | 44                |
| [Radio](./Radio/accessibility.md)                         | 23          | 2                     | 0                   | 30                |
| [RadioGroup](./RadioGroup/accessibility.md)               | 7           | 0                     | 0                   | 30                |
| [Switch](./Switch/accessibility.md)                       | 23          | 2                     | 0                   | 30                |
| [TextField](./TextField/accessibility.md)                 | 25          | 3                     | 0                   | 27                |
| [ToggleButton](./ToggleButton/accessibility.md)           | 20          | 4                     | 0                   | 31                |
| [ToggleButtonGroup](./ToggleButtonGroup/accessibility.md) | 4           | 0                     | 0                   | 31                |
