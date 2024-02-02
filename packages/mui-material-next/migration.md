# Migration

This is a reference guide on how to migrate from @mui/material to @mui/material-next.

## Breaking changes: components

This section lists all breaking changes related to Material Design 3 (M3) components and how to address them.

## Overarching changes

These are the changes that apply to all components.

### Remove `components` and `componentsProps` props

The deprecated `components` and `componentsProps` props are removed in `@mui/material-next`.
If you were using these, then you can use `slots` and `slotProps` props instead, which have the same functionality and API.
Here's an example of the change using the Badge component:

```diff
 <Badge
     badgeContent={4}
-    components={{ badge: (props) => <span {...props}>slot test</span> }}
+    slots={{ badge: (props) => <span {...props}>slot test</span> }}
-    componentsProps={{ badge: { id: "test-id" } }}
+    slotProps={{ badge: { id: "test-id" } }}
 >
   <MailIcon color="action" />
 </Badge>
```

### Remove composed CSS classes and `styleOverrides` keys

Classes composed of two or more existing classes are removed in `@mui/material-next`.
For example, the `MuiChip-filledPrimary` class is removed in favor of the `MuiChip-filled` and `MuiChip-colorPrimary` classes.
Composed `styleOverrides` keys are also removed.
Following the example above, the chip component's `filledPrimary` `styleOverrides` key is removed.
The specific classes and keys removed are listed in each component's section, as well as instructions on how to replace them.

## Badge

### Changed default color

The default value for the color prop was changed to `"error"`.

### Removed the "default" color option

The `"default"` option is no longer accepted for the color prop.

### Removed combined anchor-overlap styleOverrides keys

The following `styleOverrides` `MuiBadge` keys were removed:

- `anchorOriginTopLeftCircular`
- `anchorOriginTopLeftRectangular`
- `anchorOriginTopRightCircular`
- `anchorOriginTopRightRectangular`
- `anchorOriginBottomLeftCircular`
- `anchorOriginBottomLeftRectangular`
- `anchorOriginBottomRightCircular`
- `anchorOriginBottomRightRectangular`

You can replace them by using a CSS selector inside the `MuiBadge` `styleOverrides` `badge` key.
The following example replaces the usage of `anchorOriginTopLeftCircular` with a CSS selector including the `MuiBadge-overlapCircular` class and the `MuiBadge-anchorOriginBottomLeft` class

```diff
 const theme = extendTheme({
   components: {
     MuiBadge: {
       styleOverrides: {
-       anchorOriginBottomLeftCircular: {
+       badge: {
+         "&.MuiBadge-anchorOriginBottomLeft.MuiBadge-overlapCircular": {
             background: "fuchsia"
           }
         }
       }
     }
   }
 });
```

### Removed combined anchor-overlap classes

The following classes were removed:

- `MuiBadge-anchorOriginTopLeftCircular`
- `MuiBadge-anchorOriginTopLeftRectangular`
- `MuiBadge-anchorOriginTopRightCircular`
- `MuiBadge-anchorOriginTopRightRectangular`
- `MuiBadge-anchorOriginBottomLeftCircular`
- `MuiBadge-anchorOriginBottomLeftRectangular`
- `MuiBadge-anchorOriginBottomRightCircular`
- `MuiBadge-anchorOriginBottomRightRectangular`

You can replace them with the `anchorOrigin` value and `overlap` value classes combined in a CSS selector.
The following example replaces the `MuiBadge-anchorOriginBottomLeftCircular` class using `MuiBadge-anchorOriginBottomLeft` and `MuiBadge-overlapCircular`:

```diff
- .MuiBadge-anchorOriginBottomLeftCircular
+ .MuiBadge-anchorOriginBottomLeft.MuiBadge-overlapCircular
```

## Button

See the [ButtonBase](https://github.com/mui/material-ui/blob/master/packages/mui-material-next/migration.md#buttonbase) section for more breaking changes.

## ButtonBase

The breaking changes in this section apply to the following components:

- `Button`
- `ButtonBase`
<!-- Add other ButtonBase-based components when those are migrated -->

So the examples below are interchangeable for these components.

### Removed focusRipple

The `focusRipple` prop was removed as ripples are absent in Material Design 3's focused states.

### Prevent default on `key-up` and `key-down` events

If you need to prevent default on a `key-up` and/or `key-down` event, then besides calling `preventDefault` you'll need to set `event.defaultMuiPrevented` to `true` as follows:

```diff
 const onKeyDown = (event) => {
   event.preventDefault();
+  event.defaultMuiPrevented = true;
 };

 const onKeyUp = (event) => {
   event.preventDefault();
+  event.defaultMuiPrevented = true;
 };

 <Button onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
   Button
 </Button>
```

This is to ensure that default is prevented when the `ButtonBase` root is not a native button, for example, when the root element used is a `span`.

## FilledInput

### Removed `inputProps`

`inputProps` are removed in favor of `slotProps.input`:

```diff
 <FilledInput
-    inputProps={{ className: 'my-input' }}
+    slotProps={{ input: { className: 'my-input' } }}
 />
```

## FormControl

### Renamed `FormControlState`

The `FormControlState` interface was renamed to `FormControlContextValue`:

```diff
-import { FormControlState } from '@mui/material';
+import { FormControlContextValue } from '@mui/material-next';
```

### Removed the `standard` variant

The standard variant is no longer supported in M3, use the `filled` or `outlined` variants instead.

## FormLabel

### Removed the `standard` variant

The standard variant is no longer supported in M3, use the `filled` or `outlined` variants instead.

## InputBase

### Removed `inputProps`

`inputProps` are deprecated in favor of `slotProps.input`:

```diff
 <InputBase
-    inputProps={{ className: 'my-input' }}
+    slotProps={{ input: { className: 'my-input' } }}
 />
```

## InputLabel

### Removed the `standard` variant

The standard variant is no longer supported in M3, use the `filled` or `outlined` variants instead.

## Chip

### Removed the "default" color option

The `"default"` option is no longer accepted for the color prop.

### Removed combined styleOverrides keys

The following `styleOverrides` `MuiChip` keys were removed:

- `clickableColorPrimary`
- `clickableColorSecondary`
- `deletableColorPrimary`
- `deletableColorSecondary`
- `outlinedPrimary`
- `outlinedSecondary`
- `filledPrimary`
- `filledSecondary`
- `avatarSmall`
- `avatarMedium`
- `avatarColorPrimary`
- `avatarColorSecondary`
- `iconSmall`
- `iconMedium`
- `iconColorPrimary`
- `iconColorSecondary`
- `labelSmall`
- `labelMedium`
- `deleteIconSmall`
- `deleteIconMedium`
- `deleteIconColorPrimary`
- `deleteIconColorSecondary`
- `deleteIconOutlinedColorPrimary`
- `deleteIconOutlinedColorSecondary`
- `deleteIconFilledColorPrimary`
- `deleteIconFilledColorSecondary`

You can replace them by using the variants API and CSS Selectors.
The following example replaces the usage of `filledPrimary` with the variants API:

```diff
 const theme = extendTheme({
   components: {
     MuiBadge: {
-      styleOverrides: {
-       filledPrimary: {
-            background: "fuchsia"
-          }
-        }
+      variants: [
+        {
+          props: { variant: 'filled', color: 'primary' },
+          style: {
+            background: "fuchsia"
+          },
+        },
+      ],
     }
   }
 });
```

### Removed combined classes

The following classes were removed:

- `MuiChip-clickableColorPrimary`
- `MuiChip-clickableColorSecondary`
- `MuiChip-deletableColorPrimary`
- `MuiChip-deletableColorSecondary`
- `MuiChip-outlinedPrimary`
- `MuiChip-outlinedSecondary`
- `MuiChip-filledPrimary`
- `MuiChip-filledSecondary`
- `MuiChip-avatarSmall`
- `MuiChip-avatarMedium`
- `MuiChip-avatarColorPrimary`
- `MuiChip-avatarColorSecondary`
- `MuiChip-iconSmall`
- `MuiChip-iconMedium`
- `MuiChip-iconColorPrimary`
- `MuiChip-iconColorSecondary`
- `MuiChip-labelSmall`
- `MuiChip-labelMedium`
- `MuiChip-deleteIconSmall`
- `MuiChip-deleteIconMedium`
- `MuiChip-deleteIconColorPrimary`
- `MuiChip-deleteIconColorSecondary`
- `MuiChip-deleteIconOutlinedColorPrimary`
- `MuiChip-deleteIconOutlinedColorSecondary`
- `MuiChip-deleteIconFilledColorPrimary`
- `MuiChip-deleteIconFilledColorSecondary`

You can replace them by combining classes with a CSS selector.
The following example replaces the `MuiChip-filledPrimary` class using `MuiChip-filled` and `MuiChip-colorPrimary`:

```diff
- .MuiChip-filledPrimary
+ .MuiChip-filled.MuiChip-colorPrimary
```

### `skipFocusWhenDisabled` replaced with `focusableWhenDisabled`

The `skipFocusWhenDisabled` prop was replaced with `focusableWhenDisabled`, which is `false` by default.
Because of this, the default behavior changed:

- In `@mui/material`, disabled chips are focusable by default
- In `@mui/material-next`, disabled chips are _not_ focusable by default

If you were using the `skipFocusWhenDisabled` prop to make disabled chips not focusable (which is `@mui/material-next`'s default behavior), then you can remove the prop as follows:

```diff
 <Chip
   label="Clickable"
   onClick={handleClick}
-  skipFocusWhenDisabled={true}
 />
```

If you wish to maintain @mui/material's default behavior, then you can achieve that as follows:

```diff
 <Chip
   label="Clickable"
   onClick={handleClick}
+  focusableWhenDisabled={true}
 />
```

If you were using the `skipFocusWhenDisabled` prop to explicitly make disabled chips focusable, then you can replace it with `focusableWhenDisabled` as follows:

```diff
 <Chip
   label="Clickable"
   onClick={handleClick}
-  skipFocusWhenDisabled={false}
+  focusableWhenDisabled={true}
 />
```

## Slider

### Thumb and Value Label slots must accept refs

If you are using the `thumb` or `valueLabel` Slider slots, then make sure the components accept a `ref` and forward it to the outermost element:

```diff
-const ValueLabel = ({ value, ...props }) => {
+const ValueLabel = React.forwardRef(({ value, ...props }, ref) => {
     return (
-      <span {...props}>
+      <span {...props} ref={ref}>
         {value}
       </span>
    );
- };
+ });

-const Thumb = ({ style, ...props }) => {
+const Thumb = React.forwardRef(({ style, ...props }, ref) => {
-   return <span {...props} style={{ position: 'absolute', ...style }} />;
+   return <span {...props} style={{ position: 'absolute', ...style }} ref={ref} />;
-};
+});

 <Slider slots={{ thumb: Thumb, valueLabel: ValueLabel }}/>
```

This is required in `@mui/material-next` as it's used to apply the overlap styles to these slots. For more info take a look into [M3's Slider overlapping handles guidelines](https://m3.material.io/components/sliders/guidelines#ad5ceb95-a690-4ddd-8243-53a8e13bdab6).

## Divider

### Removed the "light" prop and class

The `"light"` prop is no longer accepted for the Divider component.

If you were using the `light` prop to create a lighter Divider (which is not supported in version 6), please remove the prop as shown below:

```diff
 <Divider
-  light={true}
+  sx={{ borderColor: '#eee' }}
 />
```

### Remove composed classes and `styleOverrides` keys

The following classes were removed:

- `MuiDivider-withChildrenVertical`

The `MuiDivider-withChildrenVertical` class has been removed. To replace it, you can use the `MuiDivider-withChildren` class along with the `MuiDivider-vertical` class. Here's an updated example:

```diff
- .MuiDivider-withChildrenVertical
+ .MuiDivider-withChildren.MuiDivider-vertical
```

## LinearProgress

### Removed combined styleOverrides keys

The following `styleOverrides` `MuiLinearProgress` keys were removed:

- `dashedColorPrimary`
- `dashedColorSecondary`
- `barColorPrimary`
- `barColorSecondary`
- `bar1Indeterminate`
- `bar1Determinate`
- `bar1Buffer`
- `bar2Indeterminate`
- `bar2Buffer`

The following `styleOverrides` `MuiLinearProgress` keys were added:

- `bar1`
- `bar2`

You can replace them by using the variants API and CSS Selectors.
The following example replaces the usage of `dashedPrimary` with the variants API:

```diff
 const theme = extendTheme({
   components: {
     MuiLinearProgress: {
       styleOverrides: {
-        dashedColorPrimary: {
-          background: "fuchsia"
-        }
+        root: {
+          "&.MuiLinearProgress-colorPrimary > .MuiLinearProgress-dashed": {
+            background: "fuchsia"
+          }
+        }
       }
     }
   }
 });
```

### Removed combined classes

The following classes were removed:

- `MuiLinearProgress-dashedColorPrimary`
- `MuiLinearProgress-dashedColorSecondary`
- `MuiLinearProgress-barColorPrimary`
- `MuiLinearProgress-barColorSecondary`
- `MuiLinearProgress-bar1Indeterminate`
- `MuiLinearProgress-bar1Determinate`
- `MuiLinearProgress-bar1Buffer`
- `MuiLinearProgress-bar2Indeterminate`
- `MuiLinearProgress-bar2Buffer`

The following classes were added:

- `MuiLinearProgress-bar1`
- `MuiLinearProgress-bar2`

You can replace them by combining classes with a CSS selector.
The following example replaces the `MuiLinearProgress-dashedColorPrimary` class using `MuiLinearProgress-dashed` and `MuiLinearProgress-colorPrimary`:

```diff
- .MuiLinearProgress-dashedColorPrimary
+ .MuiLinearProgress-colorPrimary .MuiLinearProgress-dashed
```

## CircularProgress

### Removed combined styleOverrides keys

The following `styleOverrides` `MuiCircularProgress` keys were removed:

- `circleDeterminate`
- `circleIndeterminate`
- `circleDisableShrink`

The following `styleOverrides` `MuiCircularProgress` keys were added:

- `disableShrink`

You can replace them by using the variants API and CSS Selectors.
The following example replaces the usage of `circleDeterminate` with the variants API:

```diff
 const theme = extendTheme({
   components: {
     MuiCircularProgress: {
       styleOverrides: {
-        circleDeterminate: {
-          background: "fuchsia"
-        }
+        root: {
+          "&.MuiCircularProgress-determinate .MuiCircularProgress-circle": {
+            background: "fuchsia"
+          }
+        }
       }
     }
   }
 });
```

### Removed combined classes

The following classes were removed:

- `MuiCircularProgress-circleDeterminate`
- `MuiCircularProgress-circleIndeterminate`
- `MuiCircularProgress-circleDisableShrink`

The following classes were added:

- `MuiCircularProgress-disableShrink`

You can replace them by combining classes with a CSS selector.
The following example replaces the `MuiCircularProgress-circleDeterminate` class using `MuiCircularProgress-circle` and `MuiCircularProgress-determinate`:

```diff
- .MuiCircularProgress-circleDeterminate
+ .MuiCircularProgress-determinate .MuiCircularProgress-circle
```

## ButtonGroup

### Removed combined styleOverrides keys

The following `styleOverrides` `MuiButtonGroup` keys were removed:

- `contained`
- `groupedHorizontal`
- `groupedVertical`
- `groupedContained`
- `groupedText`
- `groupedOutlined`
- `groupedContainedHorizontal`
- `groupedTextHorizontal`
- `groupedOutlinedHorizontal`
- `groupedContainedVertical`
- `groupedTextVertical`
- `groupedOutlinedVertical`
- `groupedContainedPrimary`
- `groupedTextPrimary`
- `groupedOutlinedPrimary`
- `groupedContainedSecondary`
- `groupedTextSecondary`
- `groupedOutlinedSecondary`

The following `styleOverrides` `MuiButtonGroup` keys were added:

- `primary`
- `secondary`
- `tertiary`
- `filled`
- `filledPartial`
- `elevated`

You can replace them by using the variants API and CSS Selectors.
The following example replaces the usage of `groupedOutlined` with the variants API:

```diff
 const theme = extendTheme({
   components: {
     MuiButtonGroup: {
       styleOverrides: {
-        groupedOutlined: {
-          background: "fuchsia"
-        }
+        outlined: {
+          ".MuiButtonGroup-grouped": {
+            background: "fuchsia"
+          }
+        }
       }
     }
   }
 });
```

### Removed combined classes

The following classes were removed:

- `MuiButtonGroup-contained`
- `MuiButtonGroup-groupedHorizontal`
- `MuiButtonGroup-groupedVertical`
- `MuiButtonGroup-groupedText`
- `MuiButtonGroup-groupedTextHorizontal`
- `MuiButtonGroup-groupedTextVertical`
- `MuiButtonGroup-groupedTextPrimary`
- `MuiButtonGroup-groupedTextSecondary`
- `MuiButtonGroup-groupedOutlined`
- `MuiButtonGroup-groupedOutlinedHorizontal`
- `MuiButtonGroup-groupedOutlinedVertical`
- `MuiButtonGroup-groupedOutlinedPrimary`
- `MuiButtonGroup-groupedOutlinedSecondary`
- `MuiButtonGroup-groupedContained`
- `MuiButtonGroup-groupedContainedHorizontal`
- `MuiButtonGroup-groupedContainedVertical`
- `MuiButtonGroup-groupedContainedPrimary`
- `MuiButtonGroup-groupedContainedSecondary`

The following classes were added:

- `MuiButtonGroup-filled`
- `MuiButtonGroup-filledTonal`
- `MuiButtonGroup-elevated`
- `MuiButtonGroup-primary`
- `MuiButtonGroup-secondary`
- `MuiButtonGroup-tertiary`

You can replace them by combining classes with a CSS selector.
The following example replaces the `MuiButtonGroup-groupedOutlined` class using `MuiButtonGroup-grouped` and `MuiButtonGroup-outline`:

```diff
- .MuiButtonGroup-groupedOutlined
+ .MuiButtonGroup-outlined .MuiButtonGroup-grouped
```
