# Migration

This is a reference guide on how to migrate from Material UI v5 to v6.

## Breaking changes: components

This section lists all breaking changes related to components in v6 and how to address them.

## Overarching changes

These are the changes that apply to all components

### Remove `components` and `componentsProps` props

The deprecated `components` and `componentsProps` props are removed in v6.
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

The `focusRipple` prop was removed as ripples are absent in Material You's focused states.

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

## InputBase

### Removed the `inputComponent` prop

The `inputComponent` is deprecated in favor of `slots.input`:

```diff
 <InputBase
-    inputComponent="textarea"
+    slots={{ input: 'textarea' }}
 />
```

### Removed `inputProps`

`inputProps` are deprecated in favor of `slotProps.input`:

```diff
 <InputBase
-    inputProps={{ className: 'my-input' }}
+    slotProps={{ input: { className: 'my-input' } }}
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

This is required in v6 as it's used to apply the overlap styles to these slots. For more info take a look into [Material You's Slider overlapping handles guidelines](https://m3.material.io/components/sliders/guidelines#ad5ceb95-a690-4ddd-8243-53a8e13bdab6).
