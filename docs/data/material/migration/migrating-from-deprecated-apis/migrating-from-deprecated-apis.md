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

## Accordion

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#accordion-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/accordion-props <path>
```

### TransitionComponent

The Accordion's `TransitionComponent` was deprecated in favor of `slots.transition`:

```diff
 <Accordion
-  TransitionComponent={CustomTransition}
+  slots={{ transition: CustomTransition }}
 />
```

### TransitionProps

The Accordion's `TransitionProps` was deprecated in favor of `slotProps.transition`:

```diff
 <Accordion
-  TransitionProps={{ unmountOnExit: true }}
+  slotProps={{ transition: { unmountOnExit: true } }}
 />
```

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
 />
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

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#alert-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/alert-props <path>
```

### components

The Alert's `components` was deprecated in favor of `slots`:

```diff
 <Alert
-  components={{ CloseButton: CustomButton }}
+  slots={{ closeButton: CustomButton }}
 />
```

### componentsProps

The Alert's `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Alert
-  componentsProps={{ closeButton: { testid: 'test-id' } }}
+  slotProps={{ closeButton: { testid: 'test-id' } }}
 />
```

## Avatar

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#avatar-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/avatar-props <path>
```

### imgProps

The Avatar's `imgProps` was deprecated in favor of `slotProps.img`:

```diff
 <Avatar
-  imgProps={{
-    onError: () => {},
-    onLoad: () => {},
+  slotProps={{
+    img: {
+      onError: () => {},
+      onLoad: () => {},
+    }
   }}
 />;
```

## Chip

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#chip-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/chip-classes <path>
```

### Composed CSS classes

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

## PaginationItem

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#pagination-item-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/pagination-item-classes <path>
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
