---
title: 'RFC draft: Menu successor with submenu support'
description: Living draft of the Menu2 RFC, tracked next to the Menu2 experiments until it is posted publicly.
---

# RFC draft: Menu successor with submenu support

<p class="description">Living draft tracked in this PR until the RFC is posted publicly; review comments welcome on this file.</p>

Suggested issue title: `[RFC] Menu: Base UI-based successor with submenu support`

Structured for `.github/ISSUE_TEMPLATE/3.rfc.yml` -- paste each section below into the matching form field. Companion experiments: [playground](/experiments/menu2-playground/), [recipes](/experiments/menu2-recipes/).

## What's the problem?

Material UI's `Menu` cannot express submenus (nested menus):

- It is one of the oldest and most-requested features: https://github.com/mui/material-ui/issues/11723 has been open since 2018 with 120+ reactions (plus duplicates such as https://github.com/mui/material-ui/issues/8152).
- Material UI v0.x supported nested menus (https://github.com/mui/material-ui/pull/2148); the capability was lost in the v1 rewrite and never recovered.
- Community workarounds (`material-ui-nested-menu-item`, `mui-nested-menu`, `material-ui-popup-state` recipes, many sandboxes) are consistently incomplete on keyboard navigation and ARIA, which maintainers have called out repeatedly in the issue threads.
- The Menubar docs page already ships Base UI-composed submenus as copy-paste code, and users immediately asked for a maintained, in-package component (https://github.com/mui/material-ui/issues/48336). Copy-paste code is not versioned, tested, or theme-integrated.

Desired outcome: first-class, accessible submenu support in `@mui/material` -- with Material visuals and full theming -- without destabilizing the existing `Menu`, and on a path to becoming the default `Menu` in the next major.

Beyond the Menu itself, this RFC pilots the standards for how future Material UI components are built on top of Base UI (customization contract, styling reuse, dependency shape, testing, tooling). Menu is the reference implementation; the cross-cutting decisions below are meant to apply to every Base UI-backed component that follows.

## What are the requirements?

1. Correct WAI-ARIA menu pattern behavior across nesting levels: trigger semantics (`aria-haspopup`/`aria-expanded`), RTL-aware ArrowRight/ArrowLeft submenu navigation, Escape close ordering, focus restored to the parent trigger item on close, typeahead scoped per level, arbitrary nesting depth.
2. Production-grade pointer UX: safe-polygon hover intent ("safe triangle") and hover-open with configurable delays -- explicitly the bar that past attempts failed to clear.
3. Collision-aware positioning with automatic anchor tracking: submenus flip at viewport edges instead of clipping.
4. Pixel parity with the existing `Menu`/`MenuItem` visuals, and full theming integration: `sx`, `classes`, `component`, `slots`/`slotProps`, theme `defaultProps`/`styleOverrides`/`variants`.
5. Zero cost and zero risk for existing users: the classic `Menu` keeps working unchanged, and apps that do not import the new component pay no bundle or behavior cost.
6. API continuity with the classic `Menu` where the underlying model allows (item-level props, `container`, `keepMounted`), with deliberate and documented divergence where it does not (open/close control, positioning, transitions).
7. Cover the adjacent long-requested menu capabilities in the same API so it does not need reshaping later: checkbox/radio items, groups, hover-open menus, context-menu (cursor) positioning.
8. A credible graduation path: the component becomes `Menu` in the next major with a migration guide and codemods where feasible, so preview adopters are not stranded.
9. Sustainable maintenance: reuse a maintained primitive rather than re-implementing focus, dismissal, and positioning machinery in this repo.
10. Cross-cutting indistinguishability: the component must look indistinguishable from a normal Material UI component in tooling, theming, imports, and tests. The only new thing is the Base UI behavior substrate underneath. Users should not need to know Base UI is involved, nor install anything extra.

## What are our options?

### Option A: Add submenus to the existing Menu stack

This has been attempted three times over eight years; each attempt got further than the last and hit the same walls:

- https://github.com/mui/material-ui/pull/14700 (2019, +267 lines): recursive Menu-in-Menu. Closed with "It's something we will want to solve at the core level. I'm pretty sure we need to change the menu implementation and to expose new objects to make it happen."
- https://github.com/mui/material-ui/pull/20591 (2020-2022, +1333 lines, ~22 months of review): `subMenu` prop on `MenuItem` implemented inside core via `cloneElement`. Stalled on a compound of blockers: a double-digit relative gzip increase to the core bundle, hard UX requirements (safe-triangle hover intent, collision-aware placement -- blocked on Popover internals), test-infrastructure churn, and the risk of destabilizing a core component right before v5. The closing review rejected the `cloneElement` approach and concluded the path forward was to rebuild on headless menu primitives.
- https://github.com/mui/material-ui/pull/37570 (2023-2024): docs-demo-only approach. Closed after an accessibility review found fundamental gaps (Escape handling, `aria-expanded`, screen reader announcements, close ordering), with the explicit direction: "I think it would make more sense to focus on bringing this to Base UI."

The failures are structural, not incidental. Every open `Menu` is a full `Modal` (`Menu -> Popover -> Modal -> FocusTrap/Backdrop/ModalManager`), and nesting two of them fights the stack in at least six places:

1. Dismissal model: each menu renders an invisible full-screen backdrop that captures clicks. A submenu's backdrop stacks above the parent's paper, making parent items non-interactive and closing the child on any parent click. Fixing this means replacing backdrop dismissal with a coordinated click-away model across the whole menu tree.
2. `ModalManager` sets `aria-hidden="true"` on all body children except the top-most modal -- opening a submenu removes the parent menu from the accessibility tree.
3. Keyboard: the roving tabindex handler treats ArrowRight/ArrowLeft as no-ops for vertical lists, and `MenuList`/`MenuItem` expose no hook point for "open submenu on ArrowRight" or trigger semantics.
4. Focus: each modal has its own focus trap and per-trap restore target; closing a submenu must restore focus to the parent trigger item, which the per-trap model does not coordinate.
5. Positioning: `Popover` has no collision flipping -- a right-opening submenu near the viewport edge clips instead of flipping to the other side.
6. Each `MenuList` owns an isolated keyboard/typeahead registry; nested lists share no active-item model.

Meeting requirements 1-3 this way means touching `Menu`, `MenuList`, `MenuItem`, `Popover`, `Modal`, `ModalManager`, and `FocusTrap`, and replacing two load-bearing models (backdrop dismissal, per-modal focus trapping) shared with `Dialog` and every `Popover` consumer. That is a re-implementation of exactly the machinery Base UI's `Menu` already ships, with disproportionate regression risk, as throwaway work ahead of the next major. Rejected.

### Option B: Keep it as copy-paste docs composition (like the Menubar page)

Rejected as the end state: unversioned and untested code with no theming contract cannot be the first-class answer to an 8-year-old feature request, and users have already asked for the packaged component (https://github.com/mui/material-ui/issues/48336).

### Option C: Wait for the next major rewrite

Rejected: demand has waited since 2018, and shipping a public unstable component now battle-tests the API so the next major's `Menu` lands already validated instead of freshly designed.

### Option D: Successor component built on Base UI, shipped as public unstable (proposed)

Base UI's `Menu` (`@base-ui/react`, stable 1.x since early 2026, maintained by the same organization) covers requirements 1-3 out of the box, verified against its source and test suites: safe-polygon hover intent on submenu triggers (`openOnHover` default `true`, `delay` 100ms, `safePolygon` close handler), RTL-aware submenu keyboard navigation (parametrized ltr/rtl open/close key tests), Escape closing the innermost submenu by default (`closeParentOnEsc`, default `false`), focus returned to the parent trigger item on close (asserted in tests), per-level typeahead, and collision avoidance defaulting to flip with automatic anchor tracking. Material UI's job reduces to styling, theming, and API surface -- detailed below.

## Proposed solution

Introduce a Base UI-based successor to `Menu`, positioned as "Menu v2" and following the Grid lifecycle precedent. A proof of concept validates feasibility: https://github.com/mui/material-ui/pull/48663 (live demo: https://deploy-preview-48663--material-ui.netlify.app/experiments/menu-preview/), and a companion playground exercises the open questions: https://github.com/mui/material-ui/pull/48823.

### Positioning and lifecycle (decided)

The new component is a successor, not an in-place reimplementation of the legacy internals and not a permanently parallel namespace:

| Phase           | Component name   | What happens                                                                                                            |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Now (v9 minors) | `Unstable_Menu2` | Public incubation -- a real release, not docs-only. Theme keys and classes are `MuiMenu2*` (see the naming note below). |
| Later in v9     | `Menu2`          | Stabilized under the interim name; users adopt. Legacy `Menu` untouched; theme keys unchanged.                          |
| Next major      | `Menu`           | `Menu2` promoted to the canonical name.                                                                                 |
| Next major      | `MenuLegacy`     | Old `Menu` renamed, deprecated; codemod provided.                                                                       |

Precedent: Grid (`Unstable_Grid2` -> `Grid2` -> `Grid`, with the old component renamed `GridLegacy`, see https://github.com/mui/material-ui/pull/45363). The rename at each step is a breaking change for early adopters, but it is codemoddable and Material UI has accepted this trade before. The `2`-suffixed interim name is what makes a stable pre-major phase possible at all: an unsuffixed name would collide with the still-shipping legacy `Menu` until the major.

Naming note: only directories, subpaths, and export names carry the `Unstable_` prefix. Internal identifiers use clean `Menu2*` names and theme keys/classes use `MuiMenu2*` -- both enforced by the repo's naming-convention and name-matches-component lint rules, and both matching the Grid2 precedent (`Unstable_Grid2` used `MuiGrid2` keys). A side benefit: theme keys and classes written against the unstable component survive the `Unstable_Menu2` -> `Menu2` stabilization unchanged; only the final `Menu2` -> `Menu` promotion renames them (codemod).

Import ergonomics follow the existing convention -- flat-named components, one component per subpath, no Base UI-style short aliases (`Root`/`Item`/`Trigger`):

```jsx
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
```

Since the subpaths use default exports, adopters can locally drop the `Unstable_` prefix, as above -- the JSX then already reads like the future stable API. Root barrel exports are added at graduation (the experiment is deliberately subpath-only).

Graduation is gated by a fixed checklist, not judgment calls: the legacy `describeConformance` suite passing minus a documented skip list, theme-registration parity, the pinned `data-*` conformance boundary (see dependency riders below), and design/API sign-off.

### Standards for Base UI-backed components (Menu is the pilot)

Meta-principle: a Base UI-backed component must be indistinguishable from a normal Material UI component in every cross-cutting concern. Decided:

- Customization contract: `slots`/`slotProps` is the user-facing mechanism, as in every existing component. Base UI's `render` prop is used internally by Material UI to inject its styled elements (for example the trigger rendering a Material `Button`), and remains a last-resort escape hatch -- not the documented contract.
- Slot plumbing: reuse the `@mui/utils` slot utilities (`useSlotProps`/`mergeSlotProps`/`appendOwnerState`); extend them in place if genuine Base UI `render`-bridging gaps appear. No bespoke per-component bridge layers.
- Styling reuse with the legacy component: share the actual styled element by passing it through Base UI's `render` internally (the model used by the Menubar docs components), falling back to a shared style function where element injection is impractical. The experiment already implements the fallback: classic `Menu`/`MenuItem` and the new parts consume the same extracted style modules, so there is a single source of visual truth. The remaining work is upgrading to element-level sharing where it fits; free-floating copies are not acceptable. Caution learned from two shipped regressions: extracted classic styles can embed DOM-context assumptions that silently change meaning under the Base UI structure -- a `maxHeight: calc(100% - 96px)` whose `100%` meant the viewport inside the classic full-screen Modal but resolved against the content-sized popup, and an `[item] + divider` adjacency margin that broke when Base UI mounted inline focus-guard nodes next to an open submenu trigger. Shared style functions need a per-consumer audit for positional values and structural selectors, and parts should own their own spacing instead of relying on sibling combinators.
- Material presentational props are preserved (`dense`, `disableGutters`, `divider`, `inset`, `selected`): Material UI owns presentation, Base UI owns behavior. The line is styling-vs-functionality, not old-vs-new; individual long-tail props can still be dropped case-by-case.
- Dependency shape: `@base-ui/react` becomes a direct dependency of `@mui/material` (caret range), like `@popperjs/core` -- an implementation detail users never install or import directly. Two riders: (a) Base UI version bumps are deliberate, reviewed events, never auto-merged; (b) conformance tests pin the `data-*` attribute surface we consume, so an upstream rename or removal fails CI instead of silently regressing styles.
- Docs and API tooling: existing infrastructure is a fixed constraint; the component conforms to it. If a component cannot be documented without tooling changes, that is a signal about the component.
- Theme registration: standard `defaultProps`/`styleOverrides`/`variants` registration per part, under standard keys (`MuiMenu2*`, see the naming note above) -- no special rule for Base UI parts.

Proposed, awaiting team reaction:

- Styling state source of truth (hybrid): `Mui-*` classes + `ownerState` remain the public contract that `styleOverrides`/`variants`/`sx` are written against; internal styles may read Base UI `data-*` attributes for positional or transient state (precedent: Tooltip's `[data-popper-placement]` selectors). Rule of thumb: state users theme or that appears in the documented API gets a class; purely positional/transient internal state stays `data-*`-only. The experiment already exercises the internal side of this rule: the popup surface consumes the positioner-provided `--available-height` variable for its collision-aware max-height.
- Prop surface typing: `extends` the Base UI prop types with `Omit` for curated or renamed props -- inheritance by default (no drift as Base UI evolves), curation as an explicit, documented list. Consequence: callback signatures follow Base UI by default, for example `onOpenChange(open, eventDetails)` rather than the legacy event-first `onClose(event, reason)`. Validated in the experiment (renderless roots, flattened popup): the pattern type-checks, the spec's negative assertions hold, and the flattened container inherits its hoisted positioner/portal surface via `Pick`. One confirmed limitation: the proptypes generator does not expand members declared in `node_modules`, so runtime PropTypes on inherited props degrade to the locally declared ones (types still carry the full contract; `remove-proptypes` strips them in production anyway). Teaching the generator to expand external heritage is a shared-infra follow-up; until then the trade is inherited types + reduced dev-mode runtime validation.
- Testing: reuse the existing harnesses on two fronts -- `describeConformance` for the Material UI contract (ref, className, `sx`, theme `styleOverrides`), and the legacy Menu behavior suite (keyboard navigation, open/close, focus) rerun against the successor. Every skip is annotated with why it is incompatible under the Base UI model. Parity is proven by the same tests passing, not by new bespoke tests.

### API shape (pending a dedicated design phase)

The agreed rules for the shape, replacing a global flat-vs-compound choice with a per-part split:

- Keep the public API as close to the legacy `Menu` as the substrate allows; users should not need to know Base UI is involved.
- Structural/plumbing parts (Portal, Positioner, Popup, Paper, List) are bundled into a flat container component and exposed via `slots`/`slotProps` -- they exist for wiring, not day-to-day composition.
- Customization-heavy parts stay standalone components (`MenuItem`-like parts, submenu triggers, checkbox/radio items) -- they need per-instance children and props and cannot be buried in a container.

Hard precondition before the design is finalized: a behavior benchmark diffing the Material UI Menu against the Base UI Menu from the user's perspective (open/close semantics, focus behavior, keyboard model, dismissal, positioning defaults). The benchmark gates the design -- how close to drop-in the successor API can be -- not the positioning, which is decided above.

Illustrative sketch only (the container boundaries and the submenu shape are exactly what the design phase must settle; the experiment's fully compound API is the reference input at the other end of the spectrum):

```jsx
<Menu2
  anchor={anchorEl}
  open={open}
  onOpenChange={handleOpenChange}
  slotProps={{ paper: { elevation: 4 } }}
>
  <Menu2Item onClick={handleCut}>Cut</Menu2Item>
  {/* strawman: submenu as a nested container owned by a standalone trigger item */}
  <Menu2SubmenuTrigger label="Share">
    <Menu2>
      <Menu2Item>Email</Menu2Item>
      <Menu2Item>Copy link</Menu2Item>
    </Menu2>
  </Menu2SubmenuTrigger>
</Menu2>
```

Behavior notes worth stating explicitly regardless of final shape:

- Submenus open on hover by default in Base UI (`openOnHover` default `true`, `delay` 100ms, safe-polygon close). This is new behavior the classic Menu never had; it matches native OS menus, and it is configurable.
- Escape closes the innermost submenu and returns focus to its trigger item (APG behavior); closing the whole tree is opt-in.
- While a submenu is open, inline focus-guard nodes sit next to its trigger inside the parent popup; see open question 7 for the styling-contract implications.
- The menu surface constrains itself to `min(calc(100vh - 96px), var(--available-height))` and scrolls internally -- the classic viewport-only clamp replaced by a collision-aware one.

### Compatibility posture

Continuity where it matters, honesty where it does not:

- Kept as-is: item-level presentational props (`dense`, `disableGutters`, `divider`, `inset`, `selected` -- visual-only, as today), `disabled`, visual design, theming entry points, `keepMounted`, portal `container`.
- Changed deliberately (Base UI model replaces the old one): open/close control (`open`/`defaultOpen` + `onOpenChange(open, eventDetails)` instead of controlled-only `open` + `onClose(event, reason)`), positioning (`anchor`/`side`/`align`/offsets instead of `anchorEl`/`anchorOrigin`/`transformOrigin`), transitions (CSS `data-starting-style`/`data-ending-style` + `onOpenChangeComplete` instead of `TransitionComponent`/`Grow`).
- Dropped intentionally:
  - `disableAutoFocus`, `disableEnforceFocus`, `disableRestoreFocus`, `disableEscapeKeyDown`: escape hatches that degrade accessibility; `modal` and `finalFocus` cover the legitimate cases.
  - `variant="selectedMenu"`, `autoFocus`, `disableAutoFocusItem`: listbox-style selection behavior on `role="menu"`; initial focus is handled internally per the WAI-ARIA menu pattern.
  - `anchorOrigin`/`transformOrigin`/`anchorReference`/`anchorPosition`, `PopoverClasses`, `transitionDuration`, `slots.transition`, `action.updatePosition`: superseded by Base UI's Floating-UI-based positioning with automatic anchor tracking and collision handling.
  - `disablePortal`: Base UI popups are always portalled.

A full old-to-new prop mapping is in the collapsible appendix at the end.

### New capabilities (vs classic Menu)

- Submenus with correct keyboard, hover-intent, and ARIA behavior.
- Checkbox and radio items (`role="menuitemcheckbox"`/`menuitemradio"` with `aria-checked` and indicators).
- Groups with automatically associated labels (`role="group"` + `aria-labelledby`).
- Trigger wiring for `aria-haspopup`/`aria-expanded`/`aria-controls` out of the box.
- Typeahead with per-item `label` override.
- Hover-open with configurable delays; reason-rich, cancelable `onOpenChange`.

### Reference implementation and known deltas

The PoC (https://github.com/mui/material-ui/pull/48663) proves feasibility end-to-end: submenus, checkbox/radio items, groups, pixel parity with classic `MenuItem`, full theme registration, and a comprehensive test suite -- at +77 B gzip on the `@mui/material` barrel (Base UI code is only paid when importing the component). The companion experiment (https://github.com/mui/material-ui/pull/48823) iterates on it toward the standards above.

Resolved in the experiment branch:

- `MenuPreview` naming -> `Unstable_Menu2` lifecycle naming, per-part subpaths, Base UI-style short aliases dropped.
- Docs tooling special-casing -> removed; the experiment is exercised via a non-public playground page instead of generated API docs.
- Style sharing: classic and successor consume the same extracted style modules (single source of visual truth).
- Prop surfaces on the renderless roots and the flattened popup inherit Base UI types via `Omit`/`Pick` (the item parts already followed the pattern); the roots gain `actionsRef` and future Base UI props for free (hover-open with delays lives on the trigger parts, already exposed).
- Top-level `elevation` convenience prop exists on the popup (default 8, forwards to the Paper slot).

Remaining:

- Fully compound API -> per-part flat/standalone split per the design phase.
- Style sharing is at the shared-style-function level (option 1) -> upgrade to shared styled elements via internal `render` where practical.
- Bespoke slot-bridging layer -> `@mui/utils` slot utilities.
- Bespoke test suite -> `describeConformance` + the legacy Menu behavior suite rerun with annotated skips (piloted on the item and popup; remaining parts and the legacy rerun pending).
- `inset` item prop not yet implemented (decided as preserved).
- No default open/close animation and no ripple -> open questions below.

### Open questions

1. Ripple. Items are Base UI divs, so there is no `TouchRipple`. Either add `TouchRipple` to the item root slot for Material fidelity (restoring `disableRipple` and friends) or formally drop ripple on menu items. No accessibility stake; this is a design-identity decision.
2. Default open/close animation. Classic Menu animates with `Grow` by default; the experiment ships none by default but demonstrates a CSS approximation of `Grow` via `data-starting-style`/`data-ending-style` behind a toggle. Proposal: ship a default CSS transition so the component does not feel like a visual regression, overridable via plain CSS.
3. Convenience `elevation` prop on the container: implemented in the experiment (default 8, forwards to the Paper slot) -- confirm we keep it.
4. Backdrop. Base UI has `Menu.Backdrop`; the experiment does not surface it. Expose a `backdrop` slot now or wait for demand?
5. Imperative actions. Under the typing standard, Base UI's `actionsRef` (`close()`, `unmount()`) is inherited by default -- the question is whether to curate it away, not whether to add it.
6. Context menu (right-click / cursor positioning). Classic `anchorPosition` use cases are covered by a virtual-element `anchor` recipe in the experiment. Base UI also has a dedicated `ContextMenu` component. Recipe now, dedicated component later? The recipe surfaced a focus-restore hole that sharpens this question: a detached menu has no trigger to restore focus to, and on close Base UI falls back to an internal previously-focused-element record -- which can be a stale, unrelated menu trigger from an earlier interaction on the same page. The recipe must pass `finalFocus` (the invoked surface, per the APG context-menu pattern) to behave correctly; a wrapped `ContextMenu` component would remove that footgun entirely, since its trigger is the right-click surface itself.
7. Sibling-structure styling contract around submenu triggers. While a submenu is open, Base UI keeps inline focus-guard and portal-anchor nodes next to the trigger inside the parent popup -- tab order into the portalled submenu depends on them. Any consumer CSS built on sibling combinators around a trigger (`+`/`~`, `:last-child`-style assumptions) silently breaks the moment a submenu opens: this is the first place a Base UI implementation detail reaches the consumer styling contract, and it is invisible until runtime (the experiment shipped exactly this bug -- the separator following a trigger lost its adjacency-based margins). The built-in parts now avoid it by owning their own spacing. Options: (a) accept and document the constraint as part of the styling contract ("do not style through sibling combinators around triggers"; the guard nodes are identifiable via `data-base-ui-focus-guard` for consumers who must), (b) raise upstream whether guard placement could avoid interleaving trigger siblings (for example positioning the guards at the popup boundary), (c) both. Proposal: (c) -- document now, pursue upstream hardening.
8. Bundle-size governance. Base UI adds real weight per component family; do we add a size-snapshot gate per Base UI-backed component?
9. Residual accessibility obligation. Base UI owns the interaction a11y; what does Material UI still verify on top (an axe pass in conformance, screen-reader smoke tests, contrast of the styled surfaces)?
10. Behavior defaults divergence: do we ratify Base UI's defaults where they differ from the classic Menu (hover-open submenus, non-modal scroll behavior), or re-tune them for continuity? To be fed by the behavior benchmark.
11. SSR, `'use client'` boundaries, and ref typing are expected to follow the existing patterns with no divergence -- to confirm during implementation, not expected to be contentious.

### Rollout plan

1. Behavior benchmark (hard precondition): diff Material UI Menu vs Base UI Menu from the user's perspective; publish the results in this RFC to set how close to drop-in the API can be. Include the structure-sensitive cases the experiment surfaced: parent-menu layout stability while submenus open and close, and height-constrained menus near the viewport edge.
2. Design phase for the API shape under the rules above (container boundaries, submenu shape), validated in the companion experiment -- each open question resolved against a deploy preview rather than in the abstract.
3. Land `Unstable_Menu2` in a v9 minor: conformance + legacy behavior suites with annotated skips, API reference docs, and a docs section on the Menu page (submenu, checkbox/radio, context-menu demos).
4. Iterate on feedback; stabilize as `Menu2` once the graduation checklist passes (conformance minus documented skips, theme-registration parity, pinned `data-*` boundary, design sign-off).
5. Next major: promote `Menu2` to `Menu`, rename legacy to `MenuLegacy` (deprecated), ship the migration guide and codemods for the renames and the mechanical parts of the mapping below (Grid precedent).

### Appendix: full prop mapping (classic Menu -> successor)

<details>
<summary>1. Open / close and control</summary>

| Classic Menu                       | New equivalent                     | Notes                                                                                                                                                                                                 |
| ---------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open` (required, controlled-only) | `open` + `defaultOpen`             | uncontrolled becomes possible                                                                                                                                                                         |
| `onClose(event, reason)`           | `onOpenChange(open, eventDetails)` | signature inherits Base UI types per the typing standard; reasons include `escape-key`, `outside-press`, `focus-out`, `trigger-press`, `item-press`; supports `cancel()` and exposes the native event |
| n/a                                | `onOpenChangeComplete(open)`       | replaces `onTransitionExited`-style hooks                                                                                                                                                             |

</details>

<details>
<summary>2. Positioning</summary>

| Classic Menu / Popover                                | New equivalent                                                                        | Notes                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------- |
| `anchorEl`                                            | `anchor`                                                                              | also accepts refs and virtual elements |
| `anchorOrigin` + `transformOrigin`                    | `side` + `align` + `sideOffset` + `alignOffset`                                       | finer control                          |
| `anchorReference="anchorPosition"` + `anchorPosition` | `anchor={virtualElement}`                                                             | see open question 6                    |
| `marginThreshold` (default 16)                        | `collisionPadding` (default 5)                                                        | equivalent concept                     |
| `anchorReference="none"`                              | omit `anchor`, position via CSS                                                       | equivalent                             |
| `action.updatePosition()`                             | automatic anchor tracking                                                             | `disableAnchorTracking` to opt out     |
| --                                                    | `collisionBoundary`, `sticky`, `collisionAvoidance`, `positionMethod`, `arrowPadding` | new capabilities                       |

</details>

<details>
<summary>3. Focus and modality</summary>

| Classic Menu                              | New equivalent        | Notes                                                         |
| ----------------------------------------- | --------------------- | ------------------------------------------------------------- |
| `autoFocus`, `disableAutoFocusItem`       | internal              | per WAI-ARIA menu pattern                                     |
| `variant` (`menu`/`selectedMenu`)         | dropped               | selection state is invalid on menu items                      |
| `disableAutoFocus`, `disableEnforceFocus` | dropped               | `modal` prop covers modality                                  |
| `disableRestoreFocus`                     | `finalFocus`          | explicit focus target on close                                |
| `disableEscapeKeyDown`                    | dropped               | contradicts the menu pattern; use `onKeyDown` if truly needed |
| `disableScrollLock`                       | `modal`               | non-modal menus do not lock scroll                            |
| `hideBackdrop`                            | partially via `modal` | see open question 4                                           |
| `disablePortal`                           | dropped               | always portalled                                              |
| `keepMounted`, `container`                | same                  | identical semantics                                           |

</details>

<details>
<summary>4. Transitions</summary>

| Classic Menu                                                        | New equivalent                                      |
| ------------------------------------------------------------------- | --------------------------------------------------- |
| `TransitionComponent` / `slots.transition` (default `Grow`)         | CSS via `data-starting-style` / `data-ending-style` |
| `transitionDuration`                                                | CSS `transition-duration` on the popup              |
| `onTransitionEnter` / `onTransitionExited` / `closeAfterTransition` | `onOpenChangeComplete` + `keepMounted`              |
| default `Grow` animation                                            | open question 2 (proposal: default CSS transition)  |

</details>

<details>
<summary>5. Styling / slots</summary>

| Classic Menu                                                        | New equivalent                                                       | Notes                            |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------- |
| `slots`: `root`, `paper`, `list`, `transition`, `backdrop`          | `portal`, `positioner`, `popup`, `paper`, `list`                     | no transition slot (CSS-based)   |
| `elevation` (default 8)                                             | `elevation` (default 8, forwards to the Paper slot)                  | implemented; see open question 3 |
| paper `maxHeight: calc(100% - 96px)` (viewport clamp via the Modal) | `min(calc(100vh - 96px), var(--available-height))` + internal scroll | collision-aware                  |
| `slots.backdrop` + `BackdropProps`                                  | not surfaced                                                         | see open question 4              |
| `PopoverClasses`                                                    | n/a                                                                  | no Popover underneath            |

</details>

<details>
<summary>6. Item-level props</summary>

| Classic MenuItem / MenuList                                        | New equivalent                              | Notes                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dense`, `disableGutters`, `divider`, `inset`                      | same                                        | preserved (decided): Material UI owns presentation; `inset` pending in the experiment                                                                                                                                                                                                                         |
| `<Divider />` between items                                        | `Separator` part                            | owns its 8px margins (stable while submenus are open); classic spacing relied on item-adjacency selectors                                                                                                                                                                                                     |
| `selected`                                                         | same (visual-only, as today)                | preserved (decided); checkbox/radio items cover real selection semantics. Note: classic `MenuItem` now derives `aria-checked` from `selected` for `menuitemcheckbox`/`menuitemradio` roles (https://github.com/mui/material-ui/pull/48651) -- the successor's dedicated checkbox/radio items own this instead |
| `disabled`                                                         | same                                        | `aria-disabled`, item stays focusable                                                                                                                                                                                                                                                                         |
| `href` / `LinkComponent`                                           | link item variant                           | real `<a role="menuitem">`                                                                                                                                                                                                                                                                                    |
| `autoFocus` (item)                                                 | dropped                                     | initial focus is internal                                                                                                                                                                                                                                                                                     |
| ripple props                                                       | none currently                              | see open question 1                                                                                                                                                                                                                                                                                           |
| `focusVisibleClassName`, `onFocusVisible`, `action.focusVisible()` | `highlighted` state class / data attributes | style via CSS                                                                                                                                                                                                                                                                                                 |
| `MenuList.disableListWrap`                                         | `loopFocus` (default true)                  | inverse                                                                                                                                                                                                                                                                                                       |
| `MenuList.autoFocus`/`autoFocusItem`/`variant`                     | dropped                                     | internal / legacy                                                                                                                                                                                                                                                                                             |
| `MenuList.disablePadding`, `subheader`                             | `slotProps.list`, group + group label parts | groups get proper ARIA association                                                                                                                                                                                                                                                                            |

</details>

## Resources and benchmarks

Proof of concept and experiment:

- PoC PR: https://github.com/mui/material-ui/pull/48663 (live demo: https://deploy-preview-48663--material-ui.netlify.app/experiments/menu-preview/)
- RFC companion playground (use case demos + knobs for the open questions): https://github.com/mui/material-ui/pull/48823
- Measured bundle impact of the PoC on `@mui/material`: +160 B parsed / +77 B gzip (~0.03%) -- the style-extraction refactor only; Base UI code is paid only when importing the new component.

Demand:

- https://github.com/mui/material-ui/issues/11723 (canonical request, open since 2018, 120+ reactions)
- https://github.com/mui/material-ui/issues/8152 (closed as duplicate)
- https://github.com/mui/material-ui/issues/48336 (packaged Menubar/submenu component request)
- https://github.com/mui/material-ui/issues/45790 (nested menu docs demo request)

Prior attempts on the legacy stack:

- https://github.com/mui/material-ui/pull/14700 (2019, closed)
- https://github.com/mui/material-ui/pull/20591 (2020-2022, closed)
- https://github.com/mui/material-ui/pull/37570 (2023-2024, closed)
- v0.x nested menu support: https://github.com/mui/material-ui/pull/2148, https://github.com/mui/material-ui/pull/3265

Direction and precedent:

- Maintainer statement (Dec 2024): https://github.com/mui/material-ui/issues/11723#issuecomment-2556390056 -- "Material UI will adopt (this new) Base UI component in its next major release."
- Grid lifecycle precedent (legacy rename): https://github.com/mui/material-ui/pull/45363
- Menubar docs page composed from Base UI with submenus: https://mui.com/material-ui/react-menubar/ (added in https://github.com/mui/material-ui/pull/47616)
- Base UI Menu (submenu anatomy, keyboard model): https://base-ui.com/react/components/menu
- Base UI releases (1.x stable): https://base-ui.com/react/overview/releases

Community workarounds discussed in the threads:

- https://github.com/azmenak/material-ui-nested-menu-item (and its successor `mui-nested-menu`)
- https://jcoreio.github.io/material-ui-popup-state/
- https://www.npmjs.com/package/better-mui-menu
