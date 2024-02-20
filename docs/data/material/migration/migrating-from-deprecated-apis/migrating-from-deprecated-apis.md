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
