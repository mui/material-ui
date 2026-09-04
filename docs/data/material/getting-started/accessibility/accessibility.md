# Accessibility conformance report

<p class="description">How Material UI components conform to WCAG 2.2 Level A and AA, reported in VPAT terms for procurement and accessibility review.</p>

:::warning
**Draft — partial coverage.** This report covers the 12 components assessed so far, not the whole library. It has not been reviewed by an external auditor, and no assistive-technology testing has been performed yet. See [Scope and limitations](#scope-and-limitations) before relying on it for a procurement decision.
:::

## About this report

This is a Voluntary Product Accessibility Template (VPAT®) style report: it states how far Material UI meets the [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/) at Levels A and AA, using the conformance vocabulary defined by the [Information Technology Industry Council](https://www.itic.org/policy/accessibility/vpat).

Each component is rated criterion by criterion in its own report, kept next to the source code at `packages/mui-material/src/<Component>/accessibility.md`. Those reports carry the reasoning, the responsibility split, and reproducible manual test steps for every criterion. **The table below summarizes them; follow a component link for the detail.**

| Field             | Value                                                                                          |
| :---------------- | :--------------------------------------------------------------------------------------------- |
| Product           | Material UI (`@mui/material`)                                                                  |
| Product type      | React component library (software)                                                             |
| Version assessed  | Results track the `master` branch; see [releases](https://github.com/mui/material-ui/releases) |
| Vendor            | MUI                                                                                            |
| Standards applied | WCAG 2.2 Level A and AA                                                                        |
| Report type       | Self-assessment, published as source-controlled documentation                                  |

## Conformance by component

Each row counts only the criteria that **apply** to that component; criteria that are Not Applicable are excluded. Levels are [cumulative](https://www.w3.org/WAI/WCAG2AA-Conformance) — AA includes all of A.

- **Rated** — applicable Level A and AA criteria.
- **Verified** — criteria confirmed by a test or a recorded review. The remainder are assessed from the source but not yet re-verified; they are flagged 🚩 in the component report. The flag concerns evidence, not conformance.
- **Automated** — criteria a deterministic test proves on its own, so they cannot silently regress.

<!-- scorecard:start -->

| Component                                                                                                                        | Level A | Level AA |   Rated | ✅ Supports | ⚠️ Partially Supports |    Verified | Automated |
| :------------------------------------------------------------------------------------------------------------------------------- | ------: | -------: | ------: | ----------: | --------------------: | ----------: | --------: |
| [Accordion](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Accordion/accessibility.md)                 |      11 |        8 |      19 |          19 |                     0 |       16/19 |         9 |
| [AccordionSummary](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/AccordionSummary/accessibility.md)   |      13 |       11 |      24 |          23 |                     1 |       21/24 |        11 |
| [Avatar](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Avatar/accessibility.md)                       |       5 |        6 |      11 |           9 |                     2 |        6/11 |         2 |
| [Button](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Button/accessibility.md)                       |      15 |       12 |      27 |          23 |                     4 |       20/27 |        11 |
| [Checkbox](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Checkbox/accessibility.md)                   |      14 |       11 |      25 |          22 |                     3 |       22/25 |        11 |
| [LinearProgress](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/LinearProgress/accessibility.md)       |       6 |        5 |      11 |           8 |                     3 |        6/11 |         1 |
| [Radio](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Radio/accessibility.md)                         |      14 |       11 |      25 |          23 |                     2 |       23/25 |        11 |
| [RadioGroup](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/RadioGroup/accessibility.md)               |       6 |        1 |       7 |           7 |                     0 |         4/7 |         2 |
| [Switch](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Switch/accessibility.md)                       |      14 |       11 |      25 |          23 |                     2 |       23/25 |        11 |
| [TextField](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/TextField/accessibility.md)                 |      14 |       14 |      28 |          25 |                     3 |       24/28 |        12 |
| [ToggleButton](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/ToggleButton/accessibility.md)           |      13 |       11 |      24 |          20 |                     4 |       22/24 |        11 |
| [ToggleButtonGroup](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/ToggleButtonGroup/accessibility.md) |       2 |        2 |       4 |           4 |                     0 |         3/4 |         1 |
| **12 components**                                                                                                                | **127** |  **103** | **230** |     **206** |                **24** | **190/230** |    **93** |

<!-- scorecard:end -->

**No component records a ❌ Does Not Support rating for any Level A or AA criterion.**

Rolled up to the library level, where each criterion takes the worst rating any assessed component receives, 32 success criteria are exercised: **25 Supports, 7 Partially Supports, 0 Does Not Support.**

The Level A and AA criteria absent from every row apply at the page or application level — [2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks), [3.1.1 Language of Page](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page), the [1.2.x Time-based Media](https://www.w3.org/TR/WCAG22/#time-based-media) set — and are the responsibility of the application.

## How to read the ratings

| Symbol | Term               | Meaning                                         |
| :----- | :----------------- | :---------------------------------------------- |
| ✅     | Supports           | Met, with no known defects.                     |
| ⚠️     | Partially Supports | Some functionality does not meet the criterion. |
| ❌     | Does Not Support   | Most functionality does not meet the criterion. |
| ➖     | Not Applicable     | The criterion does not apply to this component. |

Each criterion in a component report also records **who is responsible** for meeting it — ● the component, ◐ shared when used as documented, or ○ you, depending on your implementation and surrounding content. This distinction matters more for a component library than for an application, and the reports state it per criterion.

:::info
An application built with Material UI is not automatically accessible. Material UI supplies accessible building blocks; meeting WCAG for a finished product remains the responsibility of the team building it.
:::

## Known gaps

Four issues account for almost every ⚠️ rating. Three are properties of the **default theme** rather than of the components' structure, so a theme resolves them today.

| Gap                                                                                            | Criteria      | Affected                                              | Workaround                                          |
| :--------------------------------------------------------------------------------------------- | :------------ | :---------------------------------------------------- | :-------------------------------------------------- |
| The keyboard focus indicator is the ripple, so `disableRipple`/`disableFocusRipple` removes it | 1.4.11, 2.4.7 | Button, Checkbox, Radio, Switch, Toggle Button        | Style `.Mui-focusVisible` in your theme — see below |
| Some default palette colors fall short of contrast minimums                                    | 1.4.3, 1.4.11 | Avatar, Button, TextField, Toggle Button, and others  | Override the affected palette entries               |
| Dynamic state changes are not announced                                                        | 4.1.3         | Button (`loading`), LinearProgress, TextField (error) | Render your own `aria-live` region alongside        |
| Indefinite animation cannot be paused                                                          | 2.2.2         | LinearProgress (`indeterminate`, `query`, `buffer`)   | Show it only while an operation is in flight        |

If you disable the ripple, restore a focus indicator in your theme:

```js
const theme = createTheme({
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: '2px solid currentColor',
            outlineOffset: 2,
          },
        },
      },
    },
  },
});
```

One genuine defect sits outside those four: Checkbox's `indeterminate` state sets `aria-checked="mixed"` on a native checkbox whose `checked` property is `false` (4.1.2), which ARIA in HTML disallows. It is tracked for a fix.

## Scope and limitations

:::warning
Read this section before citing the report.
:::

- **Component coverage is partial.** 12 components are assessed. Widely used components including Select, Autocomplete, Dialog, Menu, Table, Tabs, Slider, Tooltip, Snackbar, and Drawer are **not yet assessed**, and this report says nothing about them.
- **No assistive-technology testing.** No screen-reader passes have been performed. Criteria that depend on how a specific assistive technology behaves are assessed from the exposed accessibility tree, not from observed behavior.
- **Level AAA is out of scope**, as it is for a standard VPAT.
- **Components are rated in isolation**, as rendered with default props and the default theme. Customization, composition, and your surrounding page can change the result.
- **Evidence strength varies.** See the Verified column above; the shortfall is assessed from the source but not yet re-verified.
- **This is a self-assessment**, not audited by an independent third party.
- **Section 508 and EN 301 549 chapters are not yet included.** The WCAG results above supply the substance those chapters incorporate by reference, but the chapter-by-chapter mapping has not been written.

## Feedback

Accessibility defects are treated as bugs. Report them on [GitHub](https://github.com/mui/material-ui/issues/new/choose) with the component, the success criterion, and steps to reproduce.
