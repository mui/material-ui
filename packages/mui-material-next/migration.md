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
