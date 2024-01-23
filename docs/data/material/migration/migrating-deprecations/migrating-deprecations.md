# Migrating deprecations

<p class="description">This guide explains how to migrate current deprecated APIs.</p>

## Why you should migrate

Deprecations are added as APIs are improved.
Migrating to these improved APIs will result in a better developer experience.
The deprecated APIs will eventually be removed and become breaking changes.
The sooner you migrate, the smoother future major updates will become.

## Migrating

The easiest way to migrate is running the deprecations codemod:

```bash
npx @mui/codemod@latest deprecations/all <path>
```

This will run all the current deprecations codemods, automatically migrating to the updated API.
If you wish to run a particular codemod, search for the deprecation below for the specific command.

### Manual migration

If you need to manually migrate, examples are listed below for each deprecation.

## Accordion

### TransitionComponent

Deprecated in favor of `slots.transition`.
To migrate replace `TransitionComponent` with `slots.transition`:

```diff
 <Accordion
-    TransitionComponent={CustomTransition}
+    slots={{ transition: CustomTransition }}
 />
```

<details>
<summary>Codemod command</summary>

```bash
npx @mui/codemod@latest deprecations/accordion-props <path>
```

</details>

### TransitionProps

Deprecated in favor of `slotProps.transition`.
To migrate replace `TransitionProps` with `slotProps.transition`:

```diff
 <Accordion
-    TransitionProps={{ unmountOnExit: true }}
+    slotProps={{ transition: { unmountOnExit: true } }}
 />
```

<details>
<summary>Codemod command</summary>

```bash
npx @mui/codemod@latest deprecations/accordion-props <path>
```

</details>
