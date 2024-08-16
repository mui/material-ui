# Migrating from deprecated APIs

<p class="description">Learn how to migrate away from recently deprecated APIs before they become breaking changes.</p>

## Why you should migrate

Features become deprecated over time as maintainers make improvements to the APIs.
Migrating to these improved APIs results in a better developer experience, so it's in your best interest to stay up to date.
Deprecated APIs often become breaking changes in subsequent major versions, so the sooner you migrate, the smoother the next major update will be.

## Migrating

Material UI provides the `deprecations/all` codemod to help you stay up to date with minimal effort.

```bash
npx @mui/codemod@latest deprecations/all <path>
```

This command runs all the current [deprecations codemods](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#deprecations), automatically migrating to the updated API.
You can run this codemod as often as necessary to keep up with the latest changes.

:::info

If you need to manually migrate from a deprecated API, you can find examples below for all deprecations that have been added in Material UI v5.
If you need to run a specific codemod, those are also linked below.

:::

## Package-wide deprecated APIs

### Inner element overrides

The `slots` and `slotProps` APIs are in the process of being standardized.
The analogous APIs—`components`, `componentsProps`, `<SlotName>Component`, and `<SlotName>Props`—are going to be deprecated and eventually removed.
This improves the developer experience through consistency, predictability, and reduced cognitive load.

### Composed CSS classes

The composed CSS classes are going to be deprecated and eventually removed in favor of atomic class alternatives.
For example, the `.MuiAccordionSummary-contentGutters` class was deprecated in favor of the `.MuiAccordionSummary-gutters` and `.MuiAccordionSummary-content` classes.
This improves the developer experience by reducing bloat and cognitive load.

### System props

MUI System props (such as `mt={*}`, `bgcolor={*}`, and more) have been deprecated in the Box, Typography, Link, Grid, and Stack components.
Use the codemod below to move all System props to the `sx` prop:

```bash
npx @mui/codemod@next v6.0.0/system-props <path/to/folder>
```

You can also manually update your components as shown in the snippet below:

```diff
-<Button mr={2}>
+<Button sx={{ mr: 2 }}>
```

### Theme component variants

Custom component variants defined in the theme are now merged with the theme style overrides, defined within the `root` slot of the component.

Use this codemod to update your project's theme file:

```bash
npx @mui/codemod@next v6.0.0/theme-v6 <path/to/theme>
```

You can also manually update your theme as shown in the snippet below:

```diff
 createTheme({
   components: {
     MuiButton: {
-      variants: [ ... ],
+      styleOverrides: {
+        root: {
+          variants: [ ... ],
+        },
+      },
     },
   },
 });
```

This reduces the API surface and lets you define variants in other slots of the component.

## AccordionSummary

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#accordion-summary-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/accordion-summary-classes <path>
```

### .MuiAccordionSummary-contentGutters

The AccordionSummary's `.MuiAccordionSummary-contentGutters` class was deprecated in favor of the `.MuiAccordionSummary-gutters` and `.MuiAccordionSummary-content` classes.
Bear in mind that the `.MuiAccordionSummary-gutters` class is applied to the component's root, whereas the `.MuiAccordionSummary-contentGutters` and `.MuiAccordionSummary-content` classes are applied to the content element.

```diff
-.MuiAccordionSummary-root .MuiAccordionSummary-contentGutters
+.MuiAccordionSummary-root.MuiAccordionSummary-gutters .MuiAccordionSummary-content
```

```diff
 import { accordionSummaryClasses } from '@mui/material/AccordionSummary';

 MuiAccordionSummary: {
   styleOverrides: {
     root: {
-      [`& .${accordionSummaryClasses.contentGutters}`]: {
+      [`&.${accordionSummaryClasses.gutters} .${accordionSummaryClasses.content}`]: {
         color: 'red',
       },
     },
   },
 },
```

## Alert

Use the [alert-props](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#alert-props) and [alert-classes](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#alert-classes) codemods below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/alert-props <path>
npx @mui/codemod@latest deprecations/alert-classes <path>
```

### components

The Alert's `components` prop was deprecated in favor of `slots`:

```diff
 <Alert
-  components={{ CloseButton: CustomButton }}
+  slots={{ closeButton: CustomButton }}
 />
```

### componentsProps

The Alert's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Alert
-  componentsProps={{ closeButton: { testid: 'test-id' } }}
+  slotProps={{ closeButton: { testid: 'test-id' } }}
 />
```

### Composed CSS classes

The CSS classes that composed the `severity` (or `variant`) and `color` prop values were removed.

Here's how to migrate:

```diff
-.MuiAlert-standardSuccess
+.MuiAlert-standard.MuiAlert-colorSuccess
-.MuiAlert-standardInfo
+.MuiAlert-standard.MuiAlert-colorInfo
-.MuiAlert-standardWarning
+.MuiAlert-standard.MuiAlert-colorWarning
-.MuiAlert-standardError
+.MuiAlert-standard.MuiAlert-colorError
-.MuiAlert-outlinedSuccess
+.MuiAlert-outlined.MuiAlert-colorSuccess
-.MuiAlert-outlinedInfo
+.MuiAlert-outlined.MuiAlert-colorInfo
-.MuiAlert-outlinedWarning
+.MuiAlert-outlined.MuiAlert-colorWarning
-.MuiAlert-outlinedError
+.MuiAlert-outlined.MuiAlert-colorError
-.MuiAlert-filledSuccess
+.MuiAlert-filled.MuiAlert-colorSuccess
-.MuiAlert-filledInfo
+.MuiAlert-filled.MuiAlert-colorInfo
-.MuiAlert-filledWarning
+.MuiAlert-filled.MuiAlert-colorWarning
-.MuiAlert-filledError
+.MuiAlert-filled.MuiAlert-colorError
```

```diff
 import { alertClasses } from '@mui/material/Alert';

 MuiAlert: {
   styleOverrides: {
     root: {
-      [`&.${alertClasses.standardSuccess}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.standardInfo}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.standardWarning}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.standardError}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorError}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.outlinedSuccess}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.outlinedInfo}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.outlinedWarning}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.outlinedError}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorError}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.filledSuccess}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.filledInfo}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.filledWarning}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.filledError}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorError}`]: {
         color: 'red',
       },
     },
   },
 },
```

## Autocomplete

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#autocomplete-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/autocomplete-props <path>
```

### componentsProps

The Autocomplete's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Autocomplete
-  componentsProps={{
-    clearIndicator: { width: 10 },
-    paper: { width: 12 },
-    popper: { width: 14 },
-    popupIndicator: { width: 16 },
+  slotProps={{
+    clearIndicator: { width: 10 },
+    paper: { width: 12 },
+    popper: { width: 14 },
+    popupIndicator: { width: 16 },
   }}
 />
```

## AvatarGroup

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#avatar-group-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/avatar-group-props <path>
```

### slotProps.additionalAvatar

The AvatarGroup's `slotProps.additionalAvatar` was deprecated in favor of `slotProps.surplus`:

```diff
 <AvatarGroup
   slotProps={{
-    additionalAvatar: { color: 'red' },
+    surplus: { color: 'red' },
   }}
 >
```

```diff
 MuiAvatarGroup: {
   defaultProps: {
     slotProps: {
-      additionalAvatar: { color: 'red' },
+      surplus: { color: 'red' },
     },
   },
 },
```

### componentsProps

The AvatarGroup's `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <AvatarGroup
-  componentsProps={{
-    additionalAvatar: { color: 'red' },
+  slotProps={{
+    surplus: { color: 'red' },
   }}
 >
```

```diff
 MuiAvatarGroup: {
   defaultProps: {
-    componentsProps: {
-      additionalAvatar: { color: 'red' },
+    slotProps: {
+      surplus: { color: 'red' },
     },
   },
 },
```

## Backdrop

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#backdrop-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/backdrop-props <path>
```

### components

The Backdrop's `components` prop was deprecated in favor of `slots`:

```diff
 <Backdrop
-  components={{ root: CustomRoot }}
+  slots={{ root: CustomRoot }}
 />
```

### componentsProps

The Backdrop's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Backdrop
-  componentsProps={{ root: { testid: 'test-id' } }}
+  slotProps={{ root: { testid: 'test-id' } }}
 />
```

## Badge

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#badge-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/badge-props <path>
```

### components

The Badge's `components` prop was deprecated in favor of `slots`:

```diff
 <Badge
-  components={{ root: CustomRoot }}
+  slots={{ root: CustomRoot }}
 >
```

### componentsProps

The Badge's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Badge
-  componentsProps={{ root: { testid: 'test-id' } }}
+  slotProps={{ root: { testid: 'test-id' } }}
 >
```

## Button

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#button-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/button-classes <path>
```

### Composed CSS classes

The CSS classes composing the `variant` and `color` prop values, as well as those composing the `variant` and `size` prop values, along with the `icon` size CSS classes, have been removed.

Here's how to migrate:

```diff
-.MuiButton-textInherit
+.MuiButton-text.MuiButton-colorInherit
-.MuiButton-textPrimary
+.MuiButton-text.MuiButton-colorPrimary
-.MuiButton-textSecondary
+.MuiButton-text.MuiButton-colorSecondary
-.MuiButton-textSuccess
+.MuiButton-text.MuiButton-colorSuccess
-.MuiButton-textError
+.MuiButton-text.MuiButton-colorError
-.MuiButton-textInfo
+.MuiButton-text.MuiButton-colorInfo
-.MuiButton-textWarning
+.MuiButton-text.MuiButton-colorWarning
-.MuiButton-outlinedInherit
+.MuiButton-outlined.MuiButton-colorInherit
-.MuiButton-outlinedPrimary
+.MuiButton-outlined.MuiButton-colorPrimary
-.MuiButton-outlinedSecondary
+.MuiButton-outlined.MuiButton-colorSecondary
-.MuiButton-outlinedSuccess
+.MuiButton-outlined.MuiButton-colorSuccess
-.MuiButton-outlinedError
+.MuiButton-outlined.MuiButton-colorError
-.MuiButton-outlinedInfo
+.MuiButton-outlined.MuiButton-colorInfo
-.MuiButton-outlinedWarning
+.MuiButton-outlined.MuiButton-colorWarning
-.MuiButton-containedInherit
+.MuiButton-contained.MuiButton-colorInherit
-.MuiButton-containedPrimary
+.MuiButton-contained.MuiButton-colorPrimary
-.MuiButton-containedSecondary
+.MuiButton-contained.MuiButton-colorSecondary
-.MuiButton-containedSuccess
+.MuiButton-contained.MuiButton-colorSuccess
-.MuiButton-containedError
+.MuiButton-contained.MuiButton-colorError
-.MuiButton-containedInfo
+.MuiButton-contained.MuiButton-colorInfo
-.MuiButton-containedWarning
+.MuiButton-contained.MuiButton-colorWarning
-.MuiButton-textSizeSmall
+.MuiButton-text.MuiButton-sizeSmall
-.MuiButton-textSizeMedium
+.MuiButton-text.MuiButton-sizeMedium
-.MuiButton-textSizeLarge
+.MuiButton-text.MuiButton-sizeLarge
-.MuiButton-outlinedSizeSmall
+.MuiButton-outlined.MuiButton-sizeSmall
-.MuiButton-outlinedSizeMedium
+.MuiButton-outlined.MuiButton-sizeMedium
-.MuiButton-outlinedSizeLarge
+.MuiButton-outlined.MuiButton-sizeLarge
-.MuiButton-containedSizeSmall
+.MuiButton-contained.MuiButton-sizeSmall
-.MuiButton-containedSizeMedium
+.MuiButton-contained.MuiButton-sizeMedium
-.MuiButton-containedSizeLarge
+.MuiButton-contained.MuiButton-sizeLarge
-.MuiButton-root .MuiButton-iconSizeSmall
+.MuiButton-root.MuiButton-sizeSmall > .MuiButton-icon
-.MuiButton-root .MuiButton-iconSizeMedium
+.MuiButton-root.MuiButton-sizeMedium > .MuiButton-icon
-.MuiButton-root .MuiButton-iconSizeLarge
+.MuiButton-root.MuiButton-sizeLarge > .MuiButton-icon
```

```diff
 import { buttonClasses } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`&.${buttonClasses.textInherit}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorInherit}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textPrimary}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textSecondary}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textSuccess}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textError}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorError}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textInfo}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textWarning}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedInherit}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorInherit}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedPrimary}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedSecondary}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedSuccess}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedError}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorError}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedInfo}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedWarning}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedInherit}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorInherit}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedPrimary}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedSecondary}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedSuccess}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedError}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorError}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedInfo}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedWarning}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedSizeSmall}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.sizeSmall}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedSizeMedium}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.sizeMedium}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedSizeLarge}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.sizeLarge}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textSizeSmall}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.sizeSmall}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textSizeMedium}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.sizeMedium}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textSizeLarge}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.sizeLarge}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedSizeSmall}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.sizeSmall}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedSizeMedium}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.sizeMedium}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedSizeLarge}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.sizeLarge}`]: {
         color: 'red',
       },
-      [`& .${buttonClasses.iconSizeSmall}`]: {
+      [`&.${buttonClasses.sizeSmall} > .${buttonClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${buttonClasses.iconSizeMedium}`]: {
+      [`&.${buttonClasses.sizeMedium} > .${buttonClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${buttonClasses.iconSizeLarge}`]: {
+      [`&.${buttonClasses.sizeLarge} > .${buttonClasses.icon}`]: {
         color: 'red',
       },
     },
   },
 },
```

## ButtonGroup

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#button-group-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/button-group-classes <path>
```

### Composed CSS classes

The CSS classes that composed the following props were deprecated:

- `orientation` | `variant` and `grouped`
- `color`, `variant` and `grouped`

Here's how to migrate:

```diff
-.MuiButtonGroup-root .MuiButtonGroup-groupedHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedVertical
+.MuiButtonGroup-root.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedText
+.MuiButtonGroup-root.MuiButtonGroup-text > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextVertical
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextPrimary
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextSecondary
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlined
+.MuiButtonGroup-root.MuiButtonGroup-outlined > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedVertical
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedPrimary
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedSecondary
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContained
+.MuiButtonGroup-root.MuiButtonGroup-contained > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedVertical
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedPrimary
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedSecondary
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped
```

```diff
 import { buttonGroupClasses } from '@mui/material/ButtonGroup';

  MuiButtonGroup: {
   styleOverrides: {
     root: {
-      [`& .${buttonGroupClasses.groupedHorizontal}`]: {
+      [`&.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedVertical}`]: {
+      [`&.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedText}`]: {
+      [`&.${buttonGroupClasses.text} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedTextHorizontal}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedTextVertical}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedTextPrimary}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.colorPrimary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedTextSecondary}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.colorSecondary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedOutlined}`]: {
+      [`&.${buttonGroupClasses.outlined} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedOutlinedHorizontal}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedOutlinedVertical}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedOutlinedPrimary}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.colorPrimary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedOutlinedSecondary}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.colorSecondary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedContained}`]: {
+      [`&.${buttonGroupClasses.contained} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedContainedHorizontal}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedContainedVertical}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedContainedPrimary}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.colorPrimary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedContainedSecondary}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.colorSecondary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
      },
    },
  },
```

## Chip

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#chip-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/chip-classes <path>
```

### Composed CSS classes

The CSS classes that composed the following props were deprecated:

- `variant` | `clickable` | `deletable` and `color`
- `avatar` and `color` | `size`
- `icon` and `color` | `size`
- `deleteIcon` and `color` | `size`
- `label` and `size`

Here's how to migrate:

```diff
-.MuiChip-clickableColorPrimary
+.MuiChip-clickable.MuiChip-colorPrimary
-.MuiChip-clickableColorSecondary
+.MuiChip-clickable.MuiChip-colorSecondary
-.MuiChip-deletableColorPrimary
+.MuiChip-deletable.MuiChip-colorPrimary
-.MuiChip-deletableColorSecondary
+.MuiChip-deletable.MuiChip-colorSecondary
-.MuiChip-outlinedPrimary
+.MuiChip-outlined.MuiChip-colorPrimary
-.MuiChip-outlinedSecondary
+.MuiChip-outlined.MuiChip-colorSecondary
-.MuiChip-filledPrimary
+.MuiChip-filled.MuiChip-colorPrimary
-.MuiChip-filledSecondary
+.MuiChip-filled.MuiChip-colorSecondary
-.MuiChip-root .MuiChip-avatarSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-avatar
-.MuiChip-root .MuiChip-avatarMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-avatar
-.MuiChip-root .MuiChip-avatarColorPrimary
+.MuiChip-root.MuiChip-colorPrimary > .MuiChip-avatar
-.MuiChip-root .MuiChip-avatarColorSecondary
+.MuiChip-root.MuiChip-colorSecondary > .MuiChip-avatar
-.MuiChip-root .MuiChip-iconSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-icon
-.MuiChip-root .MuiChip-iconMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-icon
-.MuiChip-root .MuiChip-iconColorPrimary
+.MuiChip-root.MuiChip-colorPrimary > .MuiChip-icon
-.MuiChip-root .MuiChip-iconColorSecondary
+.MuiChip-root.MuiChip-colorSecondary > .MuiChip-icon
-.MuiChip-root .MuiChip-labelSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-label
-.MuiChip-root .MuiChip-labelMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-label
-.MuiChip-root .MuiChip-deleteIconSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconColorPrimary
+.MuiChip-root.MuiChip-colorPrimary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconColorSecondary
+.MuiChip-root.MuiChip-colorSecondary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconOutlinedColorPrimary
+.MuiChip-root.MuiChip-outlined.MuiChip-colorPrimary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconOutlinedColorSecondary
+.MuiChip-root.MuiChip-outlined.MuiChip-colorSecondary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconFilledColorPrimary
+.MuiChip-root.MuiChip-filled.MuiChip-colorPrimary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconFilledColorSecondary
+.MuiChip-root.MuiChip-filled.MuiChip-colorSecondary > .MuiChip-deleteIcon
```

```diff
 import { chipClasses } from '@mui/material/Chip';

 MuiChip: {
   styleOverrides: {
     root: {
-      [`&.${chipClasses.clickableColorPrimary}`]: {
+      [`&.${chipClasses.clickable}.${chipClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.clickableColorSecondary}`]: {
+      [`&.${chipClasses.clickable}.${chipClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.deletableColorPrimary}`]: {
+      [`&.${chipClasses.deletable}.${chipClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.deletableColorSecondary}`]: {
+      [`&.${chipClasses.deletable}.${chipClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.outlinedPrimary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.outlinedSecondary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.filledPrimary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.filledSecondary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.avatarSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.avatar}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.avatarMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.avatar}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.avatarColorPrimary}`]: {
+      [`&.${chipClasses.colorPrimary} > .${chipClasses.avatar}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.avatarColorSecondary}`]: {
+      [`&.${chipClasses.colorSecondary} > .${chipClasses.avatar}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.iconSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.iconMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.iconColorPrimary}`]: {
+      [`&.${chipClasses.colorPrimary} > .${chipClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.iconColorSecondary}`]: {
+      [`&.${chipClasses.colorSecondary} > .${chipClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.labelSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.label}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.labelMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.label}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconColorPrimary}`]: {
+      [`&.${chipClasses.colorPrimary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconColorSecondary}`]: {
+      [`&.${chipClasses.colorSecondary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconOutlinedColorPrimary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorPrimary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconOutlinedColorSecondary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorSecondary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconFilledColorPrimary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorPrimary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconFilledColorSecondary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorSecondary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
     },
   },
 },
```

## CircularProgress

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#circular-progress-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/circular-progress-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `circle` CSS class and `variant` prop values were removed.

Here's how to migrate:

```diff
-.MuiCircularProgress-circleDeterminate
-.MuiCircularProgress-circleIndeterminate
+.MuiCircularProgress-determinate > .MuiCircularProgress-circle
+.MuiCircularProgress-indeterminate > .MuiCircularProgress-circle
```

```diff
 import { circularProgressClasses } from '@mui/material/CircularProgress';

 MuiCircularProgress: {
   styleOverrides: {
     root: {
-      [`& .${circularProgressClasses.circleDeterminate}`]: {
+      [`&.${circularProgressClasses.determinate} > .${circularProgressClasses.circle}`]: {
         color: 'red',
       },
-      [`& .${circularProgressClasses.circleIndeterminate}`]: {
+      [`&.${circularProgressClasses.indeterminate} > .${circularProgressClasses.circle}`]: {
         color: 'red',
       },
     },
   },
 },
```

## Divider

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#divider-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/divider-props <path>
```

### light

The Divider's `light` prop was deprecated, Use `sx={{ opacity : "0.6" }}` (or any opacity):

```diff
 <Divider
-  light
+  sx={{ opacity : "0.6" }}
 />
```

## FilledInput

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#filled-input-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/filled-input-props <path>
```

### components

The FilledInput's prop `components` was deprecated in favor of `slots`:

```diff
 <FilledInput
-  components={{ Input: CustomInput, Root: CustomRoot }}
+  slots={{ input: CustomInput, root: CustomRoot }}
 />
```

### componentsProps

The FilledInput's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <FilledInput
-  componentsProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
+  slotProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
 />
```

## FormControlLabel

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#form-control-label-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/form-control-label-props <path>
```

### componentsProps

The FormControlLabel's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <FormControlLabel
-  componentsProps={{ typography: typographyProps }}
+  slotProps={{ typography: typographyProps }}
 />
```

## Input

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#input-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/input-props <path>
```

### components

The Input's prop `components` was deprecated in favor of `slots`:

```diff
 <Input
-  components={{ Input: CustomInput, Root: CustomRoot }}
+  slots={{ input: CustomInput, root: CustomRoot }}
 />
```

### componentsProps

The Input's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Input
-  componentsProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
+  slotProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
 />
```

## InputBase

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#input-base-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/input-base-props <path>
```

### components

The InputBase's prop `components` was deprecated in favor of `slots`:

```diff
 <InputBase
-  components={{ Input: CustomInput, Root: CustomRoot }}
+  slots={{ input: CustomInput, root: CustomRoot }}
 />
```

### componentsProps

The InputBase's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Input
-  componentsProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
+  slotProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
 />
```

## ListItem

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#list-item-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/list-item-props <path>
```

### components

The ListItem's `components` prop was deprecated in favor of `slots`:

```diff
 <ListItem
-  components={{ Root: CustomRoot }}
+  slots={{ root: CustomRoot }}
 />
```

### componentsProps

The ListItem's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <ListItem
-  componentsProps={{ root: { testid: 'test-id' } }}
+  slotProps={{ root: { testid: 'test-id' } }}
 />
```

### ContainerComponent

The ListItem's `ContainerComponent` prop was deprecated in favor of `slots.root` or `component` instead.

### ContainerProps

The ListItem's `ContainerProps` prop was deprecated in favor of `slotProps.root` instead.

## ListItemSecondaryAction

### Deprecated component

The ListItemSecondaryAction component was deprecated in favor of the `secondaryAction` prop in the ListItem component.

```diff
 <ListItem
+  secondaryAction={
+    <IconButton aria-label="Leave a comment">
+      <CommentIcon />
+    </IconButton>
+  }
   disablePadding
 >
   <ListItemText primary="John Doe" />
-  <ListItemSecondaryAction>
-    <IconButton aria-label="Leave a comment">
-      <CommentIcon />
-    </IconButton>
-  </ListItemSecondaryAction>
 </ListItem>
```

## Grid

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#grid-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/grid-props <path>
```

### wrap prop

The Grid's `wrap` prop was deprecated in favor of `flexWrap` MUI System prop:

```diff
 <Grid
-  wrap="nowrap"
+  flexWrap="nowrap"
 >
```

## ImageListItemBar

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#image-list-item-bar-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/image-list-item-bar-classes <path>
```

### Composed CSS classes

The CSS classes that composed the following props were deprecated:

- `position` prop and `titleWrap` class
- `actionPosition` prop and `titleWrap` class
- `actionPosition` prop and `actionIcon` class

Here's how to migrate:

```diff
-.MuiImageListItemBar-titleWrapBelow
+.MuiImageListItemBar-positionBelow > .MuiImageListItemBar-titleWrap
-.MuiImageListItemBar-titleWrapActionPosLeft
+.MuiImageListItemBar-actionPositionLeft > .MuiImageListItemBar-titleWrap
-.MuiImageListItemBar-titleWrapActionPosRight
+.MuiImageListItemBar-actionPositionRight > .MuiImageListItemBar-titleWrap
-.MuiImageListItemBar-actionIconActionPosLeft
+.MuiImageListItemBar-actionPositionLeft > .MuiImageListItemBar-actionIcon
```

```diff
 import { imageListItemBarClasses } from '@mui/material/ImageListItemBar';

 MuiImageListItemBar: {
   styleOverrides: {
     root: {
-      [`& .${imageListItemBarClasses.titleWrapBelow}`]: {
+      [`&.${imageListItemBarClasses.positionBelow} > .${imageListItemBarClasses.titleWrap}`]: {
         color: 'red',
       },
-      [`& .${imageListItemBarClasses.titleWrapActionPosLeft}`]: {
+      [`&.${imageListItemBarClasses.actionPositionLeft} > .${imageListItemBarClasses.titleWrap}`]: {
         color: 'red',
       },
-      [`& .${imageListItemBarClasses.titleWrapActionPosRight}`]: {
+      [`&.${imageListItemBarClasses.actionPositionRight} > .${imageListItemBarClasses.titleWrap}`]: {
         color: 'red',
       },
-      [`& .${imageListItemBarClasses.actionIconActionPosLeft}`]: {
+      [`&.${imageListItemBarClasses.actionPositionLeft} > .${imageListItemBarClasses.actionIcon}`]: {
         color: 'red',
       },
     },
   },
 },
```

## Modal

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#modal-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/modal-props <path>
```

### components

The Modal's `components` prop was deprecated in favor of `slots`:

```diff
 <Modal
-  components={{ Root: CustomRoot, Backdrop: CustomBackdrop }}
+  slots={{ root: CustomRoot, backdrop: CustomBackdrop }}
 >
```

### componentsProps

The Modal's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Modal
-  componentsProps={{ root: { testid: 'root-id' }, backdrop: { testid: 'backdrop-id' } }}
+  slotProps={{ root: { testid: 'root-id' }, backdrop: { testid: 'backdrop-id' } }}
 >
```

## OutlinedInput

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#outlined-input-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/outlined-input-props <path>
```

### components

The OutlinedInput's prop `components` was deprecated in favor of `slots`:

```diff
 <OutlinedInput
-  components={{ Input: CustomInput, Root: CustomRoot }}
+  slots={{ input: CustomInput, root: CustomRoot }}
 />
```

### componentsProps

The OutlinedInput's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <OutlinedInput
-  componentsProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
+  slotProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
 />
```

## PaginationItem

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#pagination-item-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/pagination-item-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `variant` and `color` prop values were removed.

Here's how to migrate:

```diff
-.MuiPaginationItem-textPrimary
+.MuiPaginationItem-text.MuiPaginationItem-colorPrimary
-.MuiPaginationItem-outlinedPrimary
+.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary
-.MuiPaginationItem-textSecondary
+.MuiPaginationItem-text.MuiPaginationItem-colorSecondary
-.MuiPaginationItem-outlinedSecondary
+.MuiPaginationItem-outlined.MuiPaginationItem-colorSecondary
```

```diff
 import { paginationItemClasses } from '@mui/material/PaginationItem';

 MuiPaginationItem: {
   styleOverrides: {
     root: {
-      [`&.${paginationItemClasses.textPrimary}`]: {
+      [`&.${paginationItemClasses.text}.${paginationItemClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${paginationItemClasses.outlinedPrimary}`]: {
+      [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${paginationItemClasses.textSecondary}`]: {
+      [`&.${paginationItemClasses.text}.${paginationItemClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${paginationItemClasses.outlinedSecondary}`]: {
+      [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorSecondary}`]: {
         color: 'red',
       },
     },
   },
 },
```

### components

The PaginationItems's `components` prop was deprecated in favor of `slots`:

```diff
 <PaginationItems
-  components={{ first: FirstIcon, last: LastIcon, previous: PreviousIcons, next: NextIcon }}
+  slots={{ first: FirstIcon, last: LastIcon, previous: PreviousIcons, next: NextIcon }}
 />
```

## Popper

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#popper-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/popper-props <path>
```

### components

The Popper's prop `components` was deprecated in favor of `slots`:

```diff
 <Popper
-  components={{ Root: CustomRoot }}
+  slots={{ root: CustomRoot }}
 />
```

### componentsProps

The Popper's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Popper
-  componentsProps={{ root: { testid: 'test-id' } }}
+  slotProps={{ root: { testid: 'test-id' } }}
 />
```

## Slider

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#slider-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/slider-props <path>
```

### components

The Slider's `components` prop was deprecated in favor of `slots`:

```diff
 <Slider
-  components={{ Track: CustomTrack }}
+  slots={{ track: CustomTrack }}
 />
```

### componentsProps

The Slider's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Slider
-  componentsProps={{ track: { testid: 'test-id' } }}
+  slotProps={{ track: { testid: 'test-id' } }}
 />
```

## ToggleButtonGroup

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#toggle-button-group-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/toggle-button-group-classes <path>
```

### Composed CSS classes

The CSS classes composing the `orientation` prop value and `grouped` CSS class have been removed.

Here's how to migrate:

```diff
-.MuiToggleButtonGroup-root .MuiToggleButtonGroup-groupedHorizontal
+.MuiToggleButtonGroup-root.MuiToggleButtonGroup-horizontal > .MuiToggleButtonGroup-grouped
-.MuiToggleButtonGroup-root .MuiToggleButtonGroup-groupedVertical
+.MuiToggleButtonGroup-root.MuiToggleButtonGroup-vertical > .MuiToggleButtonGroup-grouped
```

```diff
 import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';

 MuiButtonGroup: {
   styleOverrides: {
     root: {
-      [`& .${toggleButtonGroupClasses.groupedHorizontal}`]: {
+      [`&.${toggleButtonGroupClasses.horizontal} > .${toggleButtonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${toggleButtonGroupClasses.groupedVertical}`]: {
+      [`&.${toggleButtonGroupClasses.vertical} > .${toggleButtonGroupClasses.grouped}`]: {
          color: 'red',
       },
     },
   },
 },
```

## Tab

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#tab-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/tab-classes <path>
```

### Composed CSS classes

The `iconWrapper` class is removed.

Here's how to migrate:

```diff
- .MuiTab-iconWrapper
+ .MuiTab-icon
```

```diff
 import { tabClasses } from '@mui/material/Tab';

 MuiTab: {
   styleOverrides: {
     root: {
-      [`& .${tabClasses.iconWrapper}`]: {
+      [`& .${tabClasses.icon}`]: {
         color: 'red',
       },
     },
   },
 },
```

## TableSortLabel

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#table-sort-label-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/table-sort-label-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `direction` prop and `icon` prop were removed.

Here's how to migrate:

```diff
-.MuiTableSortLabel-iconDirectionDesc
+.MuiTableSortLabel-directionDesc > .MuiTableSortLabel-icon
-.MuiTableSortLabel-iconDirectionAsc
+.MuiTableSortLabel-directionAsc > .MuiTableSortLabel-icon
```

```diff
 import { tableSortLabelClasses } from '@mui/material/TableSortLabel';

 MuiTableSortLabel: {
   styleOverrides: {
     root: {
-      [`& .${tableSortLabelClasses.iconDirectionDesc}`]: {
+      [`&.${tableSortLabelClasses.directionDesc} > .${tableSortLabelClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${tableSortLabelClasses.iconDirectionAsc}`]: {
+      [`&.${tableSortLabelClasses.directionAsc} > .${tableSortLabelClasses.icon}`]: {
         color: 'red',
       },
     },
   },
 },
```

## TextField

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#text-field-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/text-field-props <path>
```

### \*Props props

All of the TextField's slot props (`*Props`) props were deprecated in favor of equivalent `slotProps` entries:

```diff
 <TextField
-  InputProps={CustomInputProps}
-  inputProps={CustomHtmlInputProps}
-  SelectProps={CustomSelectProps}
-  InputLabelProps={CustomInputLabelProps}
-  FormHelperTextProps={CustomFormHelperProps}
+  slotProps={{
+    input: CustomInputProps
+    htmlInput: CustomHtmlInputProps
+    select: CustomSelectProps
+    inputLabel: CustomInputLabelProps
+    formHelper: CustomFormHelperProps
+  }}
 />
```

## Tooltip

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#tooltip-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/tooltip-props <path>
```

### components

The Tooltip's prop `components` was deprecated in favor of `slots`:

```diff
 <Tooltip
-  components={{ Arrow: CustomArrow }}
+  slots={{ arrow: CustomArrow }}
 />
```

### componentsProps

The Tooltip's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Tooltip
-  componentsProps={{ arrow: { testid: 'test-id' } }}
+  slotProps={{ arrow: { testid: 'test-id' } }}
 />
```

## Typography

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#typography-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/typography-props <path>
```

### paragraph

The Typography's `paragraph` prop was deprecated. If you want to render `p` when using Typography, pass `component="p"`.

```diff
 <Typography
   variant="subtitle1"
-  paragraph
+  component="p"
 />
```

Note that Typography already renders a `p` by default, so there's no need to pass `component="p"` when not explicitly passing a variant.
This is because `body1` is the default variant in Typography, and `body1` and `body2` variants render `p`, so there's no need to pass `component="p"` when using one of these variants.

The `16px` of margin-bottom that was automatically added to the element when using `paragraph` must be manually handled now.
The codemod that removes the `paragraph` prop adds `sx={{ marginBottom: '16px' }}` to the Typography component.

## StepLabel

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#step-label-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/step-label-props <path>
```

### componentsProps

The StepLabel's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <StepLabel
-  componentsProps={{ label: labelProps }}
+  slotProps={{ label: labelProps }}
 />
```

## StepConnector

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#step-connector-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/step-connector-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `line` CSS class and `orientation` prop values were removed.

Here's how to migrate:

```diff
-.MuiStepConnector-lineHorizontal
+.MuiStepConnector-horizontal > .MuiStepConnector-line
-.MuiStepConnector-lineVertical
+.MuiStepConnector-vertical > .MuiStepConnector-line
```

```diff
 import { stepConnectorClasses } from '@mui/material/StepConnector';

 MuiStepConnector: {
   styleOverrides: {
     root: {
-      [`& .${stepConnectorClasses.lineHorizontal}`]: {
+      [`&.${stepConnectorClasses.horizontal} > .${stepConnectorClasses.line}`]: {
         color: 'red',
       },
-      [`& .${stepConnectorClasses.lineVertical}`]: {
+      [`&.${stepConnectorClasses.vertical} > .${stepConnectorClasses.line}`]: {
         color: 'red',
       },
     },
   },
 },
```
