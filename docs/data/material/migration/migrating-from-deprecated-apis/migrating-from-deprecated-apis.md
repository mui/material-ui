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

## Button

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#button-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/button-classes <path>
```

### .MuiButton-textPrimary

The Buttons's `.MuiButton-textPrimary` class was deprecated in favor of the `.MuiButton-text` and `.MuiButton-primary` classes.

```diff
-.MuiButton-textPrimary
+.MuiButton-text.MuiButton-primary
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.textPrimary}`]: {
+      [`& .${button.text}.${button.primary}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-textInherit

The Button's `.MuiButton-textInherit` class was deprecated in favor of the `.MuiButton-text` and `.MuiButton-inherit` classes.

```diff
-.MuiButton-textInherit
+.MuiButton-text.MuiButton-inherit
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.textInherit}`]: {
+      [`& .${button.text}.${button.inherit}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-textSecondary

The Buttons's `.MuiButton-textSecondary` class was deprecated in favor of the `.MuiButton-text` and `.MuiButton-secondary` classes.

```diff
-.MuiButton-textSecondary
+.MuiButton-text.MuiButton-secondary
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.textSecondary}`]: {
+      [`& .${button.text}.${button.secondary}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-textInfo

The Button's `.MuiButton-textInfo` class was deprecated in favor of the `.MuiButton-text` and `.MuiButton-info` classes.

```diff
-.MuiButton-textInfo
+.MuiButton-text.MuiButton-info
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.textInfo}`]: {
+      [`& .${button.text}.${button.info}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-textWarning

The Buttons's `.MuiButton-textWarning` class was deprecated in favor of the `.MuiButton-text` and `.MuiButton-warning` classes.

```diff
-.MuiButton-textWarning
+.MuiButton-text.MuiButton-warning
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.textWarning}`]: {
+      [`& .${button.text}.${button.warning}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-textSuccess

The Button's `.MuiButton-textSuccess` class was deprecated in favor of the `.MuiButton-text` and `.MuiButton-success` classes.

```diff
-.MuiButton-textSuccess
+.MuiButton-text.MuiButton-success
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.textSuccess}`]: {
+      [`& .${button.text}.${button.success}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-textError

The Button's `.MuiButton-textError` class was deprecated in favor of the `.MuiButton-text` and `.MuiButton-error` classes.

```diff
-.MuiButton-textError
+.MuiButton-text.MuiButton-error
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.textError}`]: {
+      [`& .${button.text}.${button.error}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-outlinedPrimary

The Buttons's `.MuiButton-outlinedPrimary` class was deprecated in favor of the `.MuiButton-outlined` and `.MuiButton-primary` classes.

```diff
-.MuiButton-outlinedPrimary
+.MuiButton-outlined.MuiButton-primary
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.outlinedPrimary}`]: {
+      [`& .${button.outlined}.${button.primary}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-outlinedInherit

The Button's `.MuiButton-outlinedInherit` class was deprecated in favor of the `.MuiButton-outlined` and `.MuiButton-inherit` classes.

```diff
-.MuiButton-outlinedInherit
+.MuiButton-outlined.MuiButton-inherit
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.outlinedInherit}`]: {
+      [`& .${button.outlined}.${button.inherit}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-outlinedSecondary

The Buttons's `.MuiButton-outlinedSecondary` class was deprecated in favor of the `.MuiButton-outlined` and `.MuiButton-secondary` classes.

```diff
-.MuiButton-outlinedSecondary
+.MuiButton-outlined.MuiButton-secondary
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.outlinedSecondary}`]: {
+      [`& .${button.outlined}.${button.secondary}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-outlinedInfo

The Button's `.MuiButton-outlinedInfo` class was deprecated in favor of the `.MuiButton-outlined` and `.MuiButton-info` classes.

```diff
-.MuiButton-outlinedInfo
+.MuiButton-outlined.MuiButton-info
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.outlinedInfo}`]: {
+      [`& .${button.outlined}.${button.info}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-outlinedWarning

The Buttons's `.MuiButton-outlinedWarning` class was deprecated in favor of the `.MuiButton-outlined` and `.MuiButton-warning` classes.

```diff
-.MuiButton-outlinedWarning
+.MuiButton-outlined.MuiButton-warning
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.outlinedWarning}`]: {
+      [`& .${button.outlined}.${button.warning}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-outlinedSuccess

The Button's `.MuiButton-outlinedSuccess` class was deprecated in favor of the `.MuiButton-outlined` and `.MuiButton-success` classes.

```diff
-.MuiButton-outlinedSuccess
+.MuiButton-outlined.MuiButton-success
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.outlinedSuccess}`]: {
+      [`& .${button.outlined}.${button.success}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-outlinedError

The Button's `.MuiButton-outlinedError` class was deprecated in favor of the `.MuiButton-outlined` and `.MuiButton-error` classes.

```diff
-.MuiButton-outlinedError
+.MuiButton-outlined.MuiButton-error
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.outlinedError}`]: {
+      [`& .${button.outlined}.${button.error}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-containedPrimary

The Buttons's `.MuiButton-containedPrimary` class was deprecated in favor of the `.MuiButton-contained` and `.MuiButton-primary` classes.

```diff
-.MuiButton-containedPrimary
+.MuiButton-contained.MuiButton-primary
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.containedPrimary}`]: {
+      [`& .${button.contained}.${button.primary}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-containedInherit

The Button's `.MuiButton-containedInherit` class was deprecated in favor of the `.MuiButton-contained` and `.MuiButton-inherit` classes.

```diff
-.MuiButton-containedInherit
+.MuiButton-contained.MuiButton-inherit
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.containedInherit}`]: {
+      [`& .${button.contained}.${button.inherit}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-containedSecondary

The Buttons's `.MuiButton-containedSecondary` class was deprecated in favor of the `.MuiButton-contained` and `.MuiButton-secondary` classes.

```diff
-.MuiButton-containedSecondary
+.MuiButton-contained.MuiButton-secondary
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.containedSecondary}`]: {
+      [`& .${button.contained}.${button.secondary}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-containedInfo

The Button's `.MuiButton-containedInfo` class was deprecated in favor of the `.MuiButton-contained` and `.MuiButton-info` classes.

```diff
-.MuiButton-containedInfo
+.MuiButton-contained.MuiButton-info
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.containedInfo}`]: {
+      [`& .${button.contained}.${button.info}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-containedWarning

The Buttons's `.MuiButton-containedWarning` class was deprecated in favor of the `.MuiButton-contained` and `.MuiButton-warning` classes.

```diff
-.MuiButton-containedWarning
+.MuiButton-contained.MuiButton-warning
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.containedWarning}`]: {
+      [`& .${button.contained}.${button.warning}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-containedSuccess

The Button's `.MuiButton-containedSuccess` class was deprecated in favor of the `.MuiButton-contained` and `.MuiButton-success` classes.

```diff
-.MuiButton-containedSuccess
+.MuiButton-contained.MuiButton-success
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.containedSuccess}`]: {
+      [`& .${button.contained}.${button.success}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-containedError

The Button's `.MuiButton-containedError` class was deprecated in favor of the `.MuiButton-contained` and `.MuiButton-error` classes.

```diff
-.MuiButton-containedError
+.MuiButton-contained.MuiButton-error
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.containedError}`]: {
+      [`& .${button.contained}.${button.error}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-textSizeSmall

The Button's `.MuiButton-textSizeSmall` class was deprecated in favor of the `.MuiButton-text` and `.MuiButton-sizeSmall` classes.

```diff
-.MuiButton-textSizeSmall
+.MuiButton-text.MuiButton-sizeSmall
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.textSizeSmall}`]: {
+      [`& .${button.text}.${button.sizeSmall}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-textSizeMedium

The Button's `.MuiButton-textSizeMedium` class was deprecated in favor of the `.MuiButton-text` and `.MuiButton-sizeMedium` classes.

```diff
-.MuiButton-textSizeMedium
+.MuiButton-text.MuiButton-sizeMedium
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.textSizeMedium}`]: {
+      [`& .${button.text}.${button.sizeMedium}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-textSizeLarge

The Button's `.MuiButton-textSizeLarge` class was deprecated in favor of the `.MuiButton-text` and `.MuiButton-sizeLarge` classes.

```diff
-.MuiButton-textSizeLarge
+.MuiButton-text.MuiButton-sizeLarge
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.textSizeLarge}`]: {
+      [`& .${button.text}.${button.sizeLarge}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-oulinedSizeSmall

The Button's `.MuiButton-oulinedSizeSmall` class was deprecated in favor of the `.MuiButton-oulined` and `.MuiButton-sizeSmall` classes.

```diff
-.MuiButton-oulinedSizeSmall
+.MuiButton-oulined.MuiButton-sizeSmall
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.oulinedSizeSmall}`]: {
+      [`& .${button.oulined}.${button.sizeSmall}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-oulinedSizeMedium

The Button's `.MuiButton-oulinedSizeMedium` class was deprecated in favor of the `.MuiButton-oulined` and `.MuiButton-sizeMedium` classes.

```diff
-.MuiButton-oulinedSizeMedium
+.MuiButton-oulined.MuiButton-sizeMedium
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.oulinedSizeMedium}`]: {
+      [`& .${button.oulined}.${button.sizeMedium}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-oulinedSizeLarge

The Button's `.MuiButton-oulinedSizeLarge` class was deprecated in favor of the `.MuiButton-oulined` and `.MuiButton-sizeLarge` classes.

```diff
-.MuiButton-oulinedSizeLarge
+.MuiButton-oulined.MuiButton-sizeLarge
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.oulinedSizeLarge}`]: {
+      [`& .${button.oulined}.${button.sizeLarge}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-containedSizeSmall

The Button's `.MuiButton-containedSizeSmall` class was deprecated in favor of the `.MuiButton-contained` and `.MuiButton-sizeSmall` classes.

```diff
-.MuiButton-containedSizeSmall
+.MuiButton-contained.MuiButton-sizeSmall
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.containedSizeSmall}`]: {
+      [`& .${button.contained}.${button.sizeSmall}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-containedSizeMedium

The Button's `.MuiButton-containedSizeMedium` class was deprecated in favor of the `.MuiButton-contained` and `.MuiButton-sizeMedium` classes.

```diff
-.MuiButton-containedSizeMedium
+.MuiButton-contained.MuiButton-sizeMedium
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.containedSizeMedium}`]: {
+      [`& .${button.contained}.${button.sizeMedium}`]: {
         color: 'red',
        },
     },
   },
 },
```

### .MuiButton-containedSizeLarge

The Button's `.MuiButton-containedSizeLarge` class was deprecated in favor of the `.MuiButton-contained` and `.MuiButton-sizeLarge` classes.

```diff
-.MuiButton-containedSizeLarge
+.MuiButton-contained.MuiButton-sizeLarge
 />
```

```diff
 import { button } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`& .${button.containedSizeLarge}`]: {
+      [`& .${button.contained}.${button.sizeLarge}`]: {
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
