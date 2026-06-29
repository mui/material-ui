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

`🚩 Unverified` prefixes a rating that is assessed from the component's source but not yet confirmed by a test or recorded review. It not imply a defect.

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

| Component                           | ✅ Supports | ⚠️ Partially Supports | ❌ Does Not Support | ➖ Not Applicable |
| :---------------------------------- | :---------- | :-------------------- | :------------------ | :---------------- |
| Avatar                              |             |                       |                     |                   |
| [Button](./Button/accessibility.md) | 23          | 4                     | 0                   | 28                |
| Checkbox                            |             |                       |                     |                   |
| LinearProgress                      |             |                       |                     |                   |
| Radio                               |             |                       |                     |                   |
| RadioGroup                          |             |                       |                     |                   |
| Switch                              |             |                       |                     |                   |
| ToggleButton                        |             |                       |                     |                   |
| ToggleButtonGroup                   |             |                       |                     |                   |
