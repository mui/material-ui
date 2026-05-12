---
title: Material UI Accessibility Gaps
type: concept
sources:
  - '[[Weave Accessibility Coverage]]'
  - '[[MUI Accessibility Gaps & Weave Priorities]]'
tags:
  - accessibility
  - mui
  - material-ui
  - weave
  - wcag
  - wai-aria
last_updated: 2026-05-06
---

# Material UI Accessibility Gaps

Response to the original `@mui/material` accessibility coverage report. Every gap is placed in one of five buckets, ordered by what Weave does about each:

1. **Verified gaps** — present in source.
2. **Needs further discussion** — repro requested, AT testing required, or scope still open.
3. **Userland** — component-level patterns to handle on consumer side.
4. **Not a gap** — original claim corrected.
5. **Already addressed** — fixed in source or by recent PR; for reference.

**At a glance:** 11 verified · 4 to discuss · 9 userland · 3 not-a-gap · 8 already addressed.

---

## 1. Verified gaps

Real issues in source.

| Component    | Gap                                                                  | Evidence                                                                                                                                                                                                                                             | Tracking                                                                                                                             | Note                                                                                             |
| ------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Button       | Disabled buttons unfocusable by default                              | `ButtonBase/ButtonBase.js:256-259` — disabled link gets `tabIndex=-1`; native button uses `disabled` attr. `focusableWhenDisabled` exists at `ButtonBase.js:92` but is private (no propTypes, no public d.ts entry; only used internally by `Chip`). | [#32917](https://github.com/mui/material-ui/issues/32917) (open)                                                                     | —                                                                                                |
| TextField    | Input border contrast ~1.2:1 (WCAG 1.4.11)                           | `OutlinedInput/OutlinedInput.js:47-48` — default border `rgba(0,0,0,0.23)` / `rgba(255,255,255,0.23)`.                                                                                                                                               | no GH issue                                                                                                                          | Token-level — Weave overrides via tokens (cross-ref §3 system-level).                            |
| Select       | Border contrast ~1.2:1 (WCAG 1.4.11)                                 | Shares OutlinedInput tokens above.                                                                                                                                                                                                                   | no GH issue                                                                                                                          | Same token — Weave overrides via tokens.                                                         |
| Autocomplete | Selected items not announced                                         | Listbox/options have ARIA wiring; selected announcement is the open piece.                                                                                                                                                                           | no GH issue                                                                                                                          | "this we can improve on"                                                                         |
| Tabs         | `role="tabpanel"` and `aria-labelledby` not auto-wired on panels     | `Tabs/Tabs.js:850`, `Tab/Tab.js:274-275` — list/tab roles set; no `TabPanel` in `@mui/material` core (it's in `@mui/lab`). User wires panels manually.                                                                                               | [#23628](https://github.com/mui/material-ui/issues/23628) (open)                                                                     | "Solved by the planned overhaul of the Tabs component (and removal of the lab version of Tabs)." |
| Table        | `component="div"` loses cell semantics                               | `Table/Table.js:86`, `TableRow/TableRow.js:87`, `TableHead.js:51`, `TableBody.js:51`, `TableFooter.js:51` auto-set `role="table"` / `row` / `rowgroup` when component is overridden. **`TableCell` does NOT** propagate `role="cell"`.               | [#20431](https://github.com/mui/material-ui/issues/20431) (closed, completed) — root + row + groups landed; cell still missing       | —                                                                                                |
| Table        | `aria-sort` not auto-set on sortable headers                         | `TableCell/TableCell.js:224-227` — sets `aria-sort` only if user passes `sortDirection` to `TableCell`. `TableSortLabel` cannot reach the parent cell.                                                                                               | no GH issue                                                                                                                          | —                                                                                                |
| List         | No dedicated a11y documentation                                      | `docs/data/material/components/lists/lists.md` — no Accessibility section.                                                                                                                                                                           | [#20600](https://github.com/mui/material-ui/issues/20600) (open) — umbrella: add Accessibility sections to all component pages       | —                                                                                                |
| Avatar       | Limited a11y guidance beyond alt                                     | `docs/data/material/components/avatars/avatars.md` — no Accessibility section; source has no `aria-label` for initial-only fallback (`Avatar/Avatar.js:226`).                                                                                        | [#33993](https://github.com/mui/material-ui/issues/33993) (closed) — closest related; initial-only labeling not specifically tracked | —                                                                                                |
| Chip         | Delete button has no accessible name; no descriptive-naming guidance | `Chip/Chip.js:373, 378` — `deleteIcon`/`onDelete` wire up the close affordance with no default accessible name. Docs lack guidance on labelling chips or the delete action.                                                                          | [PR #48015](https://github.com/mui/material-ui/pull/48015) (open)                                                                    | Fix in flight, not yet merged.                                                                   |
| Badge        | Content not announced; bare unsemantic text in DOM                   | `Badge/Badge.js:174, 207` — `badgeContent` is rendered as plain text in the badge span without AT-only context relative to the anchored element.                                                                                                     | [PR #48471](https://github.com/mui/material-ui/pull/48471) (open)                                                                    | Fix in flight, not yet merged.                                                                   |

---

## 2. Needs further discussion

Items requiring repro, AT testing, or scoping before classification.

| Component    | Gap                                              | Status                                                                                                             | What unblocks it                          |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| Slider       | Non-functional on touch + AT (WCAG 2.5.1)        | `Slider/useSlider.ts:73-98, 566-686` has touch/pointer handling; dragging-with-AT compliance needs device testing. | Weave to share AT/device testing results. |
| Autocomplete | "Enter deletes instead of closes" (multi-select) | Not reproducible from current source.                                                                              | Weave to provide repro steps.             |
| Stepper      | Current-step indication for non-tab variant      | Open to adding a "current step" indication on non-tab steppers.                                                    | Scope + design TBD.                       |
| Stepper      | Completion / error state via non-color signal    | Open to providing indication beyond color/icons/classes.                                                           | Scope + design TBD.                       |

---

## 3. Userland

Component-level patterns that aren't (and shouldn't be) auto-wired — handle on the consumer side.

| Component    | Gap                                                 | Rationale                                                                                                                       | Pointer                                                                                                                                                                                                                                  |
| ------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Autocomplete | Clear button + multi-select chips not Tab-focusable | Auxiliary controls; KB-equivalent already exists (Esc clears via `clearOnEscape`; Backspace/Delete removes focused chip).       | `useAutocomplete/useAutocomplete.js:1390-1391, 1064-1071, 1074-1077`                                                                                                                                                                     |
| Autocomplete | Missing `aria-setsize` / `aria-posinset` on options | Only applicable when full dataset may not be available — set in userland per use-case.                                          | `Autocomplete/Autocomplete.js:721-744`                                                                                                                                                                                                   |
| Radio        | No automatic legend for groups                      | Compose with `FormControl` + `FormLabel`; current API can't build it in. Docs improvement possible.                             | `RadioGroup/RadioGroup.js:86`                                                                                                                                                                                                            |
| Switch       | Not keyboard accessible inside `MenuItem`           | Expected: `role="menu"` cannot contain interactive elements outside `menuitem*`.                                                | [Userland pattern (StackBlitz)](https://stackblitz.com/edit/afd7skdt?file=src%2FDemo.tsx)                                                                                                                                                |
| Dialog       | No auto-labeling                                    | Label depends on UI context; can't auto-derive — docs improvement is the limit.                                                 | `Dialog/Dialog.js:284`, `DialogTitle.js:40, 49`                                                                                                                                                                                          |
| Modal        | No auto-labeling                                    | Same — context-dependent. More explicit guidance + improved demos planned.                                                      | `Modal/Modal.js:76-204`                                                                                                                                                                                                                  |
| Accordion    | Default `<h3>` heading hardcoded                    | Override per page hierarchy.                                                                                                    | [Changing heading level (docs)](https://mui.com/material-ui/react-accordion/#changing-heading-level) · `Accordion/Accordion.js:129`                                                                                                      |
| Breadcrumbs  | No `aria-current="page"` on active item             | APG: `aria-current` is optional when item isn't a link → not a 1.3.1 failure on its own. Use the "Active last breadcrumb" demo. | `Breadcrumbs/Breadcrumbs.js:174-177` · [#37083](https://github.com/mui/material-ui/issues/37083) (closed, NOT_PLANNED)                                                                                                                   |
| Stepper      | No `aria-current` on active step                    | Can't be globally enforced by the component.                                                                                    | `Stepper.js:84`, `Step.js:111`, `StepButton.js:105-108` · [#43689](https://github.com/mui/material-ui/issues/43689) (broader Stepper a11y umbrella; closed-completed via semantic markup + docs, `aria-current` itself remains userland) |

---

## 4. Not a gap

| Component | Original claim                                     | Why it's not a gap                                                                                                                                                                                              |
| --------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TextField | Multiline adds hidden `<textarea>` with no label   | Sizing textarea is `aria-hidden` + `tabIndex=-1` — never reaches SR/AT. `TextareaAutosize/TextareaAutosize.tsx:239`. — [#35580](https://github.com/mui/material-ui/issues/35580) (closed, completed).           |
| Select    | Alphanumeric key-jump broken when nothing selected | Spec allows it but doesn't require it. — [#48467](https://github.com/mui/material-ui/issues/48467). Underlying type-ahead tracking [#8191](https://github.com/mui/material-ui/issues/8191) (closed, completed). |
| Alert     | Severity icon has no accessible text (WCAG 1.4.1)  | Icon is visual only. Component already sets `role="alert"` and requires children — children carries the announced text.                                                                                         |

---

## 5. Already addressed

Source already handles these, or a recent PR resolves them.

| Component | Was claimed as                                | How it's addressed                                                                                                                                                                                                                                                                   |
| --------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TextField | Helper text not always announced              | `TextField/TextField.js:134, 215, 270` — `helperTextId` derived from input id, passed as `aria-describedby`, applied to `FormHelperText`. — [PR #14266](https://github.com/mui/material-ui/pull/14266).                                                                              |
| Checkbox  | Indeterminate not announced as "mixed"        | `Checkbox/Checkbox.js:174` — sets `aria-checked="mixed"` conditionally. Reinforced by [PR #48147](https://github.com/mui/material-ui/pull/48147).                                                                                                                                    |
| Switch    | Renders `role="checkbox"` not `role="switch"` | `Switch/Switch.js:306` — input slot sets `role: 'switch'`. Reinforced by [PR #48469](https://github.com/mui/material-ui/pull/48469).                                                                                                                                                 |
| Slider    | Chrome <124 vertical orientation ARIA bug     | `Slider/useSlider.ts:885` — MUI sets `aria-orientation` correctly; bug is upstream Chrome. No MUI-side fix PR — `aria-orientation` has been correct since the modern Slider landed in [PR #16416](https://github.com/mui/material-ui/pull/16416).                                    |
| Tooltip   | Not accessible on touch (WCAG 2.5.1)          | `Tooltip/Tooltip.js:244, 443-457, 553-556` — `enterTouchDelay=700`, `leaveTouchDelay=1500`; long-press shows tooltip. — [PR #10577](https://github.com/mui/material-ui/pull/10577) (touch-delay props), [PR #23466](https://github.com/mui/material-ui/pull/23466) (iOS long-press). |
| Tooltip   | Cursor-onto-tooltip dismisses (WCAG 1.4.13)   | `Tooltip/Tooltip.js:60-66, 562-565` — when `open && !disableInteractive` (default), `pointerEvents:'auto'` + `onMouseOver` keep it open. — [PR #22382](https://github.com/mui/material-ui/pull/22382) (made interactive the default).                                                |
| Snackbar  | `role="presentation"` suppresses AT           | `SnackbarContent/SnackbarContent.js:73` — defaults to `role="alert"`. (Caveat: applies when default `SnackbarContent` is used.) — [PR #17897](https://github.com/mui/material-ui/pull/17897); discussion at [#30097](https://github.com/mui/material-ui/issues/30097).               |
| Alert     | No built-in live region                       | `Alert/Alert.js:160, 194` — defaults to `role="alert"` (implicit ARIA live region: `aria-live="assertive"` + `aria-atomic="true"`).                                                                                                                                                  |
