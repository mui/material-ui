# Accessibility conformance reports

Each component is rated against WCAG 2.2 Level A and AA and documented at `<Component>/accessibility.md`.

## The status line

For each SC this indicates:

1. Whether the rating has been verified
2. How well it conforms
3. Whether the library or user (the author) is responsible for conformance

```text
[🚩 Unverified ·] <conformance> · <responsibility>
```

For example this:

```text
🚩 Unverified · ⚠️ Partially Supports · ● Component
```

Means:

1. Not yet confirmed with test coverage or manual review
2. Partially conforms
3. The component is fully responsible for WCAG conformance

## Conformance

Whether the component meets the applicable Success Criterion. [VPAT](https://www.itic.org/policy/accessibility/vpat) terminology is used:

| Symbol | Term               | Description                                       |
| :----- | :----------------- | :------------------------------------------------ |
| ✅     | Supports           | Met, no known defects.                            |
| ⚠️     | Partially Supports | Some functionality fails.                         |
| ❌     | Does Not Support   | Most functionality fails.                         |
| ➖     | Not Applicable     | The criterion does not apply to this component.   |
| 🚩     | Unverified         | Criterion not yet verified by a documented audit. |

## Responsibility

Whether the responsibility for meeting conformance is on the library, the author (library user), or shared.

| Symbol | Term      | Description                                                 |
| :----- | :-------- | :---------------------------------------------------------- |
| ●      | Component | Satisfied on its own.                                       |
| ◐      | Shared    | Satisfied when the component is used as documented.         |
| ○      | Author    | Depends on your implementation and the surrounding content. |

## Verification

Verification records how the rating was checked, not whether the criterion is met.

| Marker          | Meaning                                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------------------- |
| no flag         | Confirmed by an automated test (axe-core or an interaction test), or by a recorded manual review.              |
| `🚩 Unverified` | Assessed from the component's source against the criterion, but not yet confirmed by tests or a manual review. |

`🚩 Unverified` does not necessarily mean non-conformance – it just means there is no existing test coverage, or it requires manual-review which hasn't been performed and recorded.

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

- Avatar
- [Button](./Button/accessibility.md)
- Checkbox
