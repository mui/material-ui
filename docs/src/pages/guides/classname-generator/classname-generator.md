# ClassName Generator

<p class="description">Configure classname generation at build time.</p>

This API is introduced in `@mui/material` (v5.1) as a replacement of [`createGenerateClassName`](/styles/api/#creategenerateclassname-options-class-name-generator) which is deprecated.

By default, MUI generate global className for each component slot. For example:

```js
import Button from '@mui/material/Button';

function App() {
  return <Button>Button</Button>;
}
```

Gives the html result:

```html
<button
  class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-1ujsas3"
>
  Button
</button>
```

However, in some cases you want to add prefix to all generated class name. This is where `ClassNameGenerator` comes in:

> ⚠️ Note: this API is in unstable stage which might be changed in the future.

```js
import { unstable_ClassNameGenerator } from '@mui/material/utils';

// call this function at the root of the application
unstable_ClassNameGenerator.configure((componentName) => `foo-bar-${componentName}`);

function App() {
  return <Button>Button</Button>;
}
```

Now, the html result is changed to:

```html
<button
  class="foo-bar-MuiButton-root foo-bar-MuiButton-text foo-bar-MuiButton-textPrimary foo-bar-MuiButton-sizeMedium foo-bar-MuiButton-textSizeMedium foo-bar-MuiButtonBase-root css-1ujsas3"
>
  Button
</button>
```

If your application use this API to generate class name prefix, be aware that you can't use hard-coded `.Mui*` for theming or style overriding anymore. Instead, you should import `[component]Classes` and use it to get the generated class name.

```diff
+import { outlinedInputClasses } from '@mui/material/OutlinedInput';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
-         '& .MuiOutlinedInput-notchedOutline': {
+         [`& .${outlinedInputClasses.notchedOutline}`]: { // the result will contain the prefix.
            borderWidth: 1,
          }
        }
      }
    }
  }
});
```

> ⚠️ This API should only be used at build-time.
