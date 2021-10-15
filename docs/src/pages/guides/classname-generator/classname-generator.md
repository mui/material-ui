# ClassName Generator

<p class="description">Configure classname generation at build time.</p>

This API is introduced in `@mui/material` (v5.1) as a replacement of deprecated [`createGenerateClassName`](/styles/api/#creategenerateclassname-options-class-name-generator).

> ⚠️ **Note**: this API is in unstable stage which might be changed in the future.

## Global classname prefix

By default, MUI generate global classname for each component slot. For example:

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

To add prefix to all MUI components, pass a callback to `ClassNameGenerator.configure(callback)`.

```js
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/utils';

// call this function at the root of the application
ClassNameGenerator.configure((componentName) => `foo-bar-${componentName}`);

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

## Component renaming

Every MUI components has `${componentName}-${slot}` classname format. For example, the component name of [`Chip`](/components/chips/) is `MuiChip`, which is used as a global class name for every `<Chip />` elements. Here is how to remove/change the `Mui` prefix:

```js
import { unstable_ClassNameGenerator } from '@mui/material/utils';

// call this function at the root of the application
unstable_ClassNameGenerator.configure((componentName) => componentName.replace('Mui', ''));

function App() {
  return <Button>Button</Button>;
}
```

Now, the `Mui` class is gone.

```html
<div class="Chip-root Chip-filled Chip-sizeMedium Chip-colorDefault Chip-filledDefault css-mttbc0">Chip</div>
```

> **Note**: [state classes](/customization/how-to-customize/#state-classes) are **NOT** component name, so they cannot be changed/removed.

## Caveat

- you should always use `[component]Classes` for theming/customization to get the correct generated class name.

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

- This API should only be used at build-time.
- The configuration is applied to all of the components across the application. You cannot target specific part of the application.
