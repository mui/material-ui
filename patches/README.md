# Base UI menu patch

`@base-ui__react@1.8.0.patch` holds two fixes that Menu2 needs.
It changes the CommonJS and ES module builds of `MenuRoot` and `MenuStore`.

## Fix 1: menus that have no trigger (`MenuRoot`)

Without an active trigger, the root does not set its tree IDs.
The first submenu then has no parent ID.
Base UI treats the submenu as a sibling and requests a close with reason
`sibling-open`.

The patch uses the root's own IDs when there is no active trigger.
It reads the current store in the layout effect.
A real trigger can register after render but before that effect.
The patch must not replace the IDs that the real trigger supplies.

The tests in `Menu2Triggerless.test.tsx` cover nested menus, sibling closing,
Escape, RTL, controlled anchors, reopening, and trigger registration.
The original regression in `Menu2Transitions.test.tsx` is no longer an expected failure.

## Fix 2: transition state of a retained popup (`MenuStore`)

`open` reaches the popup store at once.
`mounted` and `transitionStatus` change later, in a layout effect.
A popup that stays in the DOM while it is closed (`keepMounted`) therefore
renders one commit as open, but not yet as `starting`.

`menu2PopupShared.tsx` drives Grow with `open && transitionStatus !== 'starting'`.
Without the patch, Grow enters twice on a reopen, and `onOpenChangeComplete`
can fire before the enter animation ends.

The patch makes the `transitionStatus` selector return `starting` while the
popup is open and not mounted.
`Menu2Transitions.test.tsx` closes and reopens a retained popup two times and
expects one `onEnter` call for each open.

## Release requirement

- Fix 1 was merged in [Base UI PR #5645](https://github.com/mui/base-ui/pull/5645).
  Base UI 1.8.0 does not include it.
- Fix 2 is open as [Base UI PR #5738](https://github.com/mui/base-ui/pull/5738).
  The upstream change is in the shared `popupStoreSelectors`, not in `MenuStore`.

Keep this patch until a Base UI release includes both fixes.

This pnpm patch applies only within this repository.
It does not apply to dependencies in an application that installs `@mui/material`.
Before publishing Menu2, release both fixes in Base UI and require that version
in `@mui/material`.
Then remove this patch and its pnpm configuration.
Keep the regression tests.
