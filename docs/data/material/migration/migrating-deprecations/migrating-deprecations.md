# Migrating deprecations

<p class="description">This guide explains how to migrate current deprecated APIs.</p>

## Why you should migrate

Deprecations are added as APIs are improved.
Migrating to these improved APIs results in a better developer experience.
The sooner you migrate, the smoother future major updates become.

## Migrating

The easiest way to migrate is running the `deprecations/all` codemod:

```bash
npx @mui/codemod@latest deprecations/all <path>
```

This command runs all the current [deprecations codemods](#/), automatically migrating to the updated API.
This codemod can be run multiple times to keep up with new deprecations.

:::info

If you need to migrate a deprecation manually, examples on how to do so are listed below for each current deprecation.
If you need to run a specific codemod, those are also listed for each deprecation.

:::

## Accordion

### TransitionComponent

Deprecated in favor of `slots.transition`.

```diff
 <Accordion
-    TransitionComponent={CustomTransition}
+    slots={{ transition: CustomTransition }}
 />
```

<details>
<summary>Codemod</summary>
<br/>

Run the codemod for this deprecation with the following command ([source](#/))

```bash
npx @mui/codemod@latest deprecations/accordion-props <path>
```

</details>

### TransitionProps

Deprecated in favor of `slotProps.transition`.

```diff
 <Accordion
-    TransitionProps={{ unmountOnExit: true }}
+    slotProps={{ transition: { unmountOnExit: true } }}
 />
```

<details>
<summary>Codemod</summary>
<br/>

Run the codemod for this deprecation with the following command ([source](#/))

```bash
npx @mui/codemod@latest deprecations/accordion-props <path>
```

</details>
