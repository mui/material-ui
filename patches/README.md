# Base UI menu tree patch

`@base-ui__react@1.7.0.patch` fixes menus that have no trigger.
It changes the CommonJS and ES module builds of `MenuRoot`.

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

## Release requirement

This pnpm patch applies only within this repository.
It does not apply to dependencies in an application that installs `@mui/material`.
Before publishing Menu2, release the fix in Base UI and require that version in
`@mui/material`.
Then remove this patch and its pnpm configuration.
Keep the regression tests.
