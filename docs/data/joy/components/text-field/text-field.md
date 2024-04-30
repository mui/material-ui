---
productId: joy-ui
title: React Text Field component
githubLabel: 'component: text field'
---

# Text Field

<p class="description">Text fields let users enter and edit text.</p>

:::warning
**TextField** component has been removed in [`@mui/joy@5.0.0-alpha.63`](https://github.com/mui/material-ui/releases/tag/v5.11.5). We recommend using [`Input`](/joy-ui/react-input/), `FormControl` and `FormLabel` instead.

To learn more why it has been removed, visit the [RFC](https://github.com/mui/material-ui/issues/34176).
:::

## Migration

### Codemod

Run this [codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#joy-text-field-to-input) in your project's terminal:

```bash
npx @mui/codemod@latest v5.0.0/joy-text-field-to-input <path>
```

It will go through all files under `<path>` and replace `<TextField />` with the `<Input />` composition.

### Manual

Replace the `TextField` with composition:

```diff
-import TextField from '@mui/joy/TextField';
+import FormControl from '@mui/joy/FormControl';
+import FormLabel from '@mui/joy/FormLabel';
+import FormHelperText from '@mui/joy/FormHelperText';
+import Input from '@mui/joy/Input';

-<TextField
-  id="Id"
-  label="Label"
-  placeholder="Placeholder"
-  helperText="Help!"
-  name="Name"
-  type="tel"
-  autoComplete="on"
-  autoFocus
-  error
-  required
-  fullWidth
-  defaultValue="DefaultValue"
-  size="sm"
-  color="primary"
-  variant="outlined"
-/>
+<FormControl
+  id="Id"
+  required
+  size="sm"
+  color="primary">
+  <FormLabel>
+    Label
+  </FormLabel>
+  <Input
+    placeholder="Placeholder"
+    name="Name"
+    type="tel"
+    autoComplete="on"
+    autoFocus
+    error
+    fullWidth
+    defaultValue="DefaultValue"
+    variant="outlined" />
+  <FormHelperText>
+    Help!
+  </FormHelperText>
+</FormControl>
```
