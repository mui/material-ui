# Migration from v4 to v5

<p class="description">Yeah, v5 has been released!</p>

Looking for the v4 docs? [Find them here](https://material-ui.com/versions/).

> This document is a work in progress.
> Have you upgraded your site and run into something that's not covered here?
> [Add your changes on GitHub](https://github.com/mui-org/material-ui/blob/HEAD/docs/src/pages/guides/migration-v4/migration-v4.md).

## Introduction

This is a reference for upgrading your site from Material-UI v4 to v5.
While there's a lot covered here, you probably won't need to do everything for your site.
We'll do our best to keep things easy to follow, and as sequential as possible so you can quickly get rocking on v5!

## Why you should migrate

This documentation page covers the _how_ of migrating from v4 to v5.
The _why_ is covered in the [release blog post on Medium](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701).

## Updating your dependencies

The very first thing you will need to do is to update your dependencies.

### Update Material-UI version

You need to update your `package.json` to use the latest version of Material-UI.

```json
"dependencies": {
  "@material-ui/core": "^5.0.0"
}
```

Or run

```sh
npm install @material-ui/core@next

or

yarn add @material-ui/core@next
```

## Handling breaking changes

### Supported browsers and node versions

The targets of the default bundle have changed.
The exact versions will be pinned on release from the browserslist query `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`.

The default bundle now supports:

<!-- #stable-snapshot -->

- Node 10 (up from 8)
- Chrome 84 (up from 49)
- Edge 85 (up from 14)
- Firefox 78 (up from 52)
- Safari 13 (macOS) and 12.2 (iOS) (up from 10)
- and more (see [.browserslistrc (`stable` entry)](https://github.com/mui-org/material-ui/blob/HEAD/.browserslistrc#L11))

It no longer supports IE 11.
If you need to support IE 11, check out our [legacy bundle](/guides/minimizing-bundle-size/#legacy-bundle).

### non-ref-forwarding class components

Support for non-ref-forwarding class components in the `component` prop or as immediate `children` has been dropped. If you were using `unstable_createStrictModeTheme` or didn't see any warnings related to `findDOMNode` in `React.StrictMode` then you don't need to do anything.
Otherwise check out the ["Caveat with refs" section in our composition guide](/guides/composition/#caveat-with-refs) to find out how to migrate.
This change affects almost all components where you're using the `component` prop or passing `children` to components that require `children` to be elements (e.g. `<MenuList><CustomMenuItem /></MenuList>`)

### Theme

- Breakpoints are now treated as values instead of ranges. The behavior of `down(key)` was changed to define media query less than the value defined with the corresponding breakpoint (exclusive).
  The `between(start, end)` was also updated to define media query for the values between the actual values of start (inclusive) and end (exclusive).
  When using the `down()` breakpoints utility you need to update the breakpoint key by one step up. When using the `between(start, end)` the end breakpoint should also be updated by one step up. The same should be done when using the `Hidden` component. Find examples of the changes required defined below:

  ```diff
  -theme.breakpoints.down('sm') // '@media (max-width:959.95px)' - [0, sm + 1) => [0, md)
  +theme.breakpoints.down('md') // '@media (max-width:959.95px)' - [0, md)
  ```

  ```diff
  -theme.breakpoints.between('sm', 'md') // '@media (min-width:600px) and (max-width:1279.95px)' - [sm, md + 1) => [0, lg)
  +theme.breakpoints.between('sm', 'lg') // '@media (min-width:600px) and (max-width:1279.95px)' - [0, lg)
  ```

  ```diff
  -theme.breakpoints.between('sm', 'xl') // '@media (min-width:600px)'
  +theme.breakpoints.up('sm') // '@media (min-width:600px)'
  ```

  ```diff
  -<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
  +<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
  ```

- The signature of `theme.palette.augmentColor` helper has changed:

  ```diff
  -theme.palette.augmentColor(red);
  +theme.palette.augmentColor({ color: red, name: 'brand' });
  ```

#### Upgrade helper

For a smoother transition, the `adaptV4Theme` helper allows you to iteratively upgrade some of the theme changes to the new theme structure.

```diff
-import { createMuiTheme } from '@material-ui/core/styles';
+import { createMuiTheme, adaptV4Theme } from '@material-ui/core/styles';

-const theme = createMuiTheme({
+const theme = createMuiTheme(adaptV4Theme({
  // v4 theme
-});
+}));
```

The following changes are supported by the adapter.

#### Changes

- The "gutters" abstraction hasn't proven to be used frequently enough to be valuable.

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]: {
  +  paddingLeft: theme.spacing(3),
  +  paddingRight: theme.spacing(3),
  +},
  ```

- `theme.spacing` now returns single values with px units by default.
  This change improves the integration with styled-components & emotion.

  Before:

  ```js
  theme.spacing(2) => 16
  ```

  After:

  ```js
  theme.spacing(2) => '16px'
  ```

- The `theme.palette.type` was renamed to `theme.palette.mode`, to better follow the "dark mode" term that is usually used for describing this feature.

  ```diff
  import { createMuiTheme } from '@material-ui/core/styles';
  -const theme = createMuiTheme({palette: { type: 'dark' }}),
  +const theme = createMuiTheme({palette: { mode: 'dark' }}),
  ```

- The `theme.palette.text.hint` key was unused in Material-UI components, and has been removed.
  If you depend on it, you can add it back:

  ```diff
  import { createMuiTheme } from '@material-ui/core/styles';

  -const theme = createMuiTheme(),
  +const theme = createMuiTheme({
  +  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
  +});
  ```

- The components' definition inside the theme were restructure under the `components` key, to allow people easier discoverability about the definitions regarding one component.

1. `props`

```diff
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
-  props: {
-    MuiButton: {
-      disableRipple: true,
-    },
-  },
+  components: {
+    MuiButton: {
+      defaultProps: {
+        disableRipple: true,
+      },
+    },
+  },
});
```

2. `overrides`

```diff
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
-  overrides: {
-    MuiButton: {
-      root: { padding: 0 },
-    },
-  },
+  components: {
+    MuiButton: {
+      styleOverrides: {
+        root: { padding: 0 },
+      },
+    },
+  },
});
```

### Styles

- Renamed `fade` to `alpha` to better describe its functionality.
  The previous name was leading to confusion when the input color already had an alpha value. The helper **overrides** the alpha value of the color.

```diff
- import { fade } from '@material-ui/core/styles';
+ import { alpha } from '@material-ui/core/styles';

const classes = makeStyles(theme => ({
-  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
+  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
}));
```

### AppBar

- [AppBar] Remove z-index when position static and relative

### Alert

- Move the component from the lab to the core. The component is now stable.

  ```diff
  -import Alert from '@material-ui/lab/Alert';
  -import AlertTitle from '@material-ui/lab/AlertTitle';
  +import Alert from '@material-ui/core/Alert';
  +import AlertTitle from '@material-ui/core/AlertTitle';
  ```

  You can use the [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

### Autocomplete

- Move the component from the lab to the core. The component is now stable.

  ```diff
  -import Autocomplete from '@material-ui/lab/Autocomplete';
  -import useAutocomplete  from '@material-ui/lab/useAutocomplete';
  +import Autocomplete from '@material-ui/core/Autocomplete';
  +import useAutoComplete from '@material-ui/core/useAutocomplete';
  ```

  You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

- Remove `debug` prop. There are a couple of simpler alternatives: `open={true}`, Chrome devtools ["Emulate focused"](https://twitter.com/sulco/status/1305841873945272321), or React devtools prop setter.
- `renderOption` should now return the full DOM structure of the option.
  It makes customizations easier. You can recover from the change with:

  ```diff
  <Autocomplete
  - renderOption={(option, { selected }) => (
  -   <React.Fragment>
  + renderOption={(props, option, { selected }) => (
  +   <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option.title}
  -   </React.Fragment>
  +   </li>
    )}
  />
  ```

- Rename `closeIcon` prop with `clearIcon` to avoid confusion.

  ```diff
  -<Autocomplete closeIcon={defaultClearIcon} />
  +<Autocomplete clearIcon={defaultClearIcon} />
  ```

### Avatar

- Rename `circle` to `circular` for consistency. The possible values should be adjectives, not nouns:

  ```diff
  -<Avatar variant="circle">
  -<Avatar classes={{ circle: 'className' }}>
  +<Avatar variant="circular">
  +<Avatar classes={{ circular: 'className' }}>
  ```

- Move the AvatarGroup from the lab to the core.

  ```diff
  -import AvatarGroup from '@material-ui/lab/AvatarGroup';
  +import AvatarGroup from '@material-ui/core/AvatarGroup';
  ```

### Badge

- Rename `circle` to `circular` and `rectangle` to `rectangular` for consistency. The possible values should be adjectives, not nouns:

  ```diff
  -<Badge overlap="circle">
  -<Badge overlap="rectangle">
  +<Badge overlap="circular">
  +<Badge overlap="rectangular">
  <Badge classes={{
  - anchorOriginTopRightRectangle: 'className'
  - anchorOriginBottomRightRectangle: 'className'
  - anchorOriginTopLeftRectangle: 'className'
  - anchorOriginBottomLeftRectangle: 'className'
  - anchorOriginTopRightCircle: 'className'
  - anchorOriginBottomRightCircle: 'className'
  - anchorOriginTopLeftCircle: 'className'
  + anchorOriginTopRightRectangular: 'className'
  + anchorOriginBottomRightRectangular: 'className'
  + anchorOriginTopLeftRectangular: 'className'
  + anchorOriginBottomLeftRectangular: 'className'
  + anchorOriginTopRightCircular: 'className'
  + anchorOriginBottomRightCircular: 'className'
  + anchorOriginTopLeftCircular: 'className'
  }}>
  ```

### BottomNavigation

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<BottomNavigation onChange={(event: React.ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React.SyntheticEvent) => {}} />
  ```

### Box

- The system props have been deprecated in v5, and replaced with the `sx` prop.

```diff
-<Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
+<Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
```

[This codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#box-sx-prop) will automatically update your code to the new syntax.

### Button

- The button `color` prop is now "primary" by default, and "default" has been removed. This makes the button closer to the Material Design specification and simplifies the API.

  ```diff
  -<Button color="primary" />
  -<Button color="default" />
  +<Button />
  +<Button />
  ```

### CircularProgress

- The `static` variant has been merged into the `determinate` variant, with the latter assuming the appearance of the former.
  The removed variant was rarely useful. It was an exception to Material Design, and was removed from the specification.

  ```diff
  -<CircularProgress variant="determinate" />
  ```

  ```diff
  -<CircularProgress variant="static" classes={{ static: 'className' }} />
  +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  ```

> NB: If you had previously customized determinate, your customizations are probably no longer valid. Please remove them.

### Collapse

- The `collapsedHeight` prop was renamed `collapsedSize` to support the horizontal direction.

  ```diff
  -<Collapse collapsedHeight={40}>
  +<Collapse collapsedSize={40}>
  ```

- The `classes.container` key was changed to match the convention of the other components.

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

### Dialog

- The onE\* transition props were removed. Use TransitionProps instead.

  ```diff
  <Dialog
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

- Remove the `disableBackdropClick` prop because redundant.
  Ignore close events from `onClose` when `reason === 'backdropClick'` instead.

  ```diff
  <Dialog
  - disableBackdropClick
  - onClose={handleClose}
  + onClose={(event, reason) => {
  +   if (reason !== 'backdropClick') {
  +     onClose(event, reason);
  +   }
  + }}
  />
  ```

- [withMobileDialog] Remove this higher-order component. The hook API allows a simpler and more flexible solution:

  ```diff
  -import withMobileDialog from '@material-ui/core/withMobileDialog';
  +import { useTheme, useMediaQuery } from '@material-ui/core';

  function ResponsiveDialog(props) {
  - const { fullScreen } = props;
  + const theme = useTheme();
  + const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

  // ...

  -export default withMobileDialog()(ResponsiveDialog);
  +export default ResponsiveDialog;
  ```

### Divider

- Use border instead of background color. It prevents inconsistent height on scaled screens. For people customizing the color of the border, the change requires changing the override CSS property:

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### ExpansionPanel

- Rename the `ExpansionPanel` components to `Accordion` to use a more common naming convention:

  ```diff
  -import ExpansionPanel from '@material-ui/core/ExpansionPanel';
  -import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
  -import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
  -import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
  +import Accordion from '@material-ui/core/Accordion';
  +import AccordionSummary from '@material-ui/core/AccordionSummary';
  +import AccordionDetails from '@material-ui/core/AccordionDetails';
  +import AccordionActions from '@material-ui/core/AccordionActions';

  -<ExpansionPanel>
  +<Accordion>
  -  <ExpansionPanelSummary>
  +  <AccordionSummary>
       <Typography>Location</Typography>
       <Typography>Select trip destination</Typography>
  -  </ExpansionPanelSummary>
  +  </AccordionSummary>
  -  <ExpansionPanelDetails>
  +  <AccordionDetails>
       <Chip label="Barbados" onDelete={() => {}} />
       <Typography variant="caption">Select your destination of choice</Typography>
  -  </ExpansionPanelDetails>
  +  </AccordionDetails>
     <Divider />
  -  <ExpansionPanelActions>
  +  <AccordionActions>
       <Button size="small">Cancel</Button>
       <Button size="small">Save</Button>
  -  </ExpansionPanelActions>
  +  </AccordionActions>
  -</ExpansionPanel>
  +</Accordion>
  ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Accordion onChange={(event: React.ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React.SyntheticEvent, expanded: boolean) => {}} />
  ```

- Rename `focused` to `focusVisible` for consistency:

  ```diff
  <Accordion
    classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
    }}
  />
  ```

- Remove `display: flex` from AccordionDetails as its too opinionated.
  Most developers expect a display block.
- Remove `IconButtonProps` prop from AccordionSummary.
  The component renders a `<div>` element instead of an IconButton.
  The prop is no longer necessary.

### Fab

- Rename `round` to `circular` for consistency. The possible values should be adjectives, not nouns:

  ```diff
  -<Fab variant="round">
  +<Fab variant="circular">
  ```

### Chip

- Rename `default` variant to `filled` for consistency.
  ```diff
  -<Chip variant="default">
  +<Chip variant="filled">
  ```

### Grid

- Rename `justify` prop with `justifyContent` to be aligned with the CSS property name.

  ```diff
  -<Grid justify="center">
  +<Grid justifyContent="center">
  ```

### GridList

- Rename the `GridList` components to `ImageList` to align with the current Material Design naming.
- Rename the GridList `spacing` prop to `gap` to align with the CSS attribute.
- Rename the GridList `cellHeight` prop to `rowHieght`.
- Add the `variant` prop to GridList.
- Rename the GridListItemBar `actionPosition` prop to `position`. (Note also the related classname changes.)
- Use CSS object-fit. For IE11 support either use a polyfill such as
  https://www.npmjs.com/package/object-fit-images, or continue to use the v4 component.

```diff
-import GridList from '@material-ui/core/GridList';
-import GridListTile from '@material-ui/core/GridListTile';
-import GridListTileBar from '@material-ui/core/GridListTileBar';
+import ImageList from '@material-ui/core/ImageList';
+import ImageListItem from '@material-ui/core/ImageListItem';
+import ImageListItemBar from '@material-ui/core/ImageListItemBar';

-<GridList spacing={8} cellHeight={200}>
-  <GridListTile>
+<ImageList gap={8} rowHeight={200}>
+  <ImageListItem>
     <img src="file.jpg" alt="Image title" />
-    <GridListTileBar
+    <ImageListItemBar
       title="Title"
       subtitle="Subtitle"
     />
-  </GridListTile>
-</GridList>
+  </ImageListItem>
+</ImageList>
```

### Menu

- The onE\* transition props were removed. Use TransitionProps instead.

  ```diff
  <Menu
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  >
  ```

### Modal

- Remove the `disableBackdropClick` prop because redundant.
  Ignore close events from `onClose` when `reason === 'backdropClick'` instead.

  ```diff
  <Modal
  - disableBackdropClick
  - onClose={handleClose}
  + onClose={(event, reason) => {
  +   if (reason !== 'backdropClick') {
  +     onClose(event, reason);
  +   }
  + }}
  />
  ```

- Remove the `onEscapeKeyDown` prop because redundant.
  Use `onClose` with `reason === "escapeKeyDown"` instead.

  ```diff
  <Modal
  - onEscapeKeyDown={handleEscapeKeyDown}
  + onClose={(event, reason) => {
  +   if (reason === 'escapeKeyDown') {
  +     handleEscapeKeyDown(event);
  +   }
  + }}
  />
  ```

- Remove `onRendered` prop.
  Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### Pagination

- Move the component from the lab to the core. The component is now stable.

  ```diff
  -import Pagination from '@material-ui/lab/Pagination';
  -import PaginationItem from '@material-ui/lab/PaginationItem';
  -import { usePagination } from '@material-ui/lab/Pagination';
  +import Pagination from '@material-ui/core/Pagination';
  +import PaginationItem from '@material-ui/core/PaginationItem';
  +import usePagination from '@material-ui/core/usePagination';
  ```

  You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

- Rename `round` to `circular` for consistency. The possible values should be adjectives, not nouns:

  ```diff
  -<Pagination shape="round">
  -<PaginationItem shape="round">
  +<Pagination shape="circular">
  +<PaginationItem shape="circular">
  ```

### Popover

- The onE\* transition props were removed. Use TransitionProps instead.

  ```diff
  <Popover
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

### Popper

- Upgrade [Popper.js](https://github.com/popperjs/popper-core) from v1 to v2.
  This third-party library has introduced a lot of changes.<br />
  You can read [their migration guide](https://popper.js.org/docs/v2/migration-guide/) or the following summary:

  - The CSS prefixes have changed:
    ```diff
    popper: {
      zIndex: 1,
    - '&[x-placement*="bottom"] $arrow': {
    + '&[data-popper-placement*="bottom"] $arrow': {
    ```
  - Method names have changed.

    ```diff
    -popperRef.current.scheduleUpdate()
    +popperRef.current.update()
    ```

    ```diff
    -popperRef.current.update()
    +popperRef.current.forceUpdate()
    ```

  - Modifiers' API has changed a lot. There are too many changes to be covered here.

### Portal

- Remove `onRendered` prop.
  Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### Rating

- Move the component from the lab to the core. The component is now stable.

  ```diff
  -import Rating from '@material-ui/lab/Rating';
  +import Rating from '@material-ui/core/Rating';
  ```

  You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

- Change the default empty icon to improve accessibility.
  If you have a custom `icon` prop but no `emptyIcon` prop, you can restore the previous behavior with:

  ```diff
  <Rating
    icon={customIcon}
  + emptyIcon={null}
  />
  ```

- Rename `visuallyhidden` to `visuallyHidden` for consistency:

  ```diff
  <Rating
    classes={{
  -    visuallyhidden: 'custom-visually-hidden-classname',
  +    visuallyHidden: 'custom-visually-hidden-classname',
    }}
  />
  ```

### RootRef

- This component was removed.
  You can get a reference to the underlying DOM node of our components via `ref` prop.
  The component relied on [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) which is [deprecated in `React.StrictMode`](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).

  ```diff
  -<RootRef rootRef={ref}>
  -  <Button />
  -</RootRef>
  +<Button ref={ref} />
  ```

### Skeleton

- Move the component from the lab to the core. The component is now stable.

  ```diff
  -import Skeleton from '@material-ui/lab/Skeleton';
  +import Skeleton from '@material-ui/core/Skeleton';
  ```

  You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

- Rename `circle` to `circular` and `rect` to `rectangular` for consistency. The possible values should be adjectives, not nouns:

  ```diff
  -<Skeleton variant="circle" />
  -<Skeleton variant="rect" />
  -<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
  +<Skeleton variant="circular" />
  +<Skeleton variant="rectangular" />
  +<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
  ```

### Slider

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Slider onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

- The `ValueLabelComponent` prop is now part of the `components` prop.

  ```diff
  -<Slider ValueLabelComponent={CustomValueLabel} />
  +<Slider components={{ ValueLabel: CustomValueLabel }} />
  ```

- The `ThumbComponent` prop is not part of the `components` prop.

  ```diff
  -<Slider ThumbComponent={CustomThumb} />
  +<Slider components={{ Thumb: CustomThumb }} />
  ```

### Snackbar

- The notification now displays at the bottom left on large screens.
  This better matches the behavior of Gmail, Google Keep, material.io, etc.
  You can restore the previous behavior with:

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- The onE\* transition props were removed. Use TransitionProps instead.

  ```diff
  <Snackbar
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

### SpeedDial

- Move the component from the lab to the core. The component is now stable.

  ```diff
  -import SpeedDial from '@material-ui/lab/SpeedDial';
  -import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
  -import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
  +import SpeedDial from '@material-ui/core/SpeedDial';
  +import SpeedDialAction from '@material-ui/core/SpeedDialAction';
  +import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
  ```

  You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

### Stepper

- The root component (Paper) was replaced with a div. Stepper no longer has elevation, nor inherits Paper's props. This change is meant to encourage composition.

  ```diff
  -<Stepper elevation={2}>
  -  <Step>
  -    <StepLabel>Hello world</StepLabel>
  -  </Step>
  -</Stepper>
  +<Paper square elevation={2}>
  +  <Stepper>
  +    <Step>
  +      <StepLabel>Hello world</StepLabel>
  +    </Step>
  +  </Stepper>
  +<Paper>
  ```

- Remove the built-in 24px padding.

  ```diff
  -<Stepper>
  -  <Step>
  -    <StepLabel>Hello world</StepLabel>
  -  </Step>
  -</Stepper>
  +<Stepper style={{ padding: 24 }}>
  +  <Step>
  +    <StepLabel>Hello world</StepLabel>
  +  </Step>
  +</Stepper>
  ```

### Table

- The customization of the table pagination's actions labels must be done with the `getItemAriaLabel` prop. This increases consistency with the `Pagination` component.

  ```diff
  <TablePagination
  - backIconButtonText="Avant"
  - nextIconButtonText="Après
  + getItemAriaLabel={…}
  ```

- Rename `onChangeRowsPerPage` to `onRowsPerPageChange` and `onChangePage` to `onPageChange` due to API consistency.

  ```diff
  <TablePagination
  - onChangeRowsPerPage={()=>{}}
  - onChangePage={()=>{}}
  + onRowsPerPageChange={()=>{}}
  + onPageChange={()=>{}}
  ```

### Tabs

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Tabs onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

- The API that controls the scroll buttons has been split it in two props.

  - The `scrollButtons` prop controls when the scroll buttons are displayed depending on the space available.
  - The `allowScrollButtonsMobile` prop removes the CSS media query that systematically hide the scroll buttons on mobile.

  ```diff
  -<Tabs scrollButtons="on" />
  -<Tabs scrollButtons="desktop" />
  -<Tabs scrollButtons="off" />
  +<Tabs scrollButtons allowScrollButtonsMobile />
  +<Tabs scrollButtons />
  +<Tabs scrollButtons={false} />
  ```

### TextField

- Change the default variant from `standard` to `outlined`. Standard has been removed from the Material Design Guidelines.

  ```diff
  -<TextField value="Standard" />
  -<TextField value="Outlined" variant="outlined" />
  +<TextField value="Standard" variant="standard" />
  +<TextField value="Outlined" />
  ```

[This codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#textfield-variant-prop) will automatically update your code.

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

  ```diff
  -<TextField rowsMax={6}>
  +<TextField maxRows={6}>
  ```

- Better isolate the fixed textarea height behavior to the dynamic one.
  You need to use the `minRows` prop in the following case:

  ```diff
  -<TextField rows={2} maxRows={5} />
  +<TextField minRows={2} maxRows={5} />
  ```

- Change ref forwarding expections on custom `inputComponent`.
  The component should forward the `ref` prop instead of the `inputRef` prop.

  ```diff
  -function NumberFormatCustom(props) {
  -  const { inputRef, onChange, ...other } = props;
  +const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  +  props,
  +  ref,
  +) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
  -     getInputRef={inputRef}
  +     getInputRef={ref}
  ```

### TextareaAutosize

- Remove the `rows` prop, use the `minRows` prop instead.
  This change aims to clarify the behavior of the prop.

  ```diff
  -<TextareaAutosize rows={2} />
  +<TextareaAutosize minRows={2} />
  ```

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

  ```diff
  -<TextareAutosize rowsMax={6}>
  +<TextareAutosize maxRows={6}>
  ```

- Rename `rowsMin` prop with `minRows` for consistency with HTML attributes.

  ```diff
  -<TextareAutosize rowsMin={1}>
  +<TextareAutosize minRows={1}>
  ```

### ToggleButton

- Move the component from the lab to the core. The component is now stable.

  ```diff
  -import ToggleButton from '@material-ui/lab/ToggleButton';
  -import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
  +import ToggleButton from '@material-ui/core/ToggleButton';
  +import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
  ```

  You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

### Tooltip

- Tooltips are now interactive by default.

  The previous default behavior failed [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus).
  To reflect the new default value, the prop was renamed to `disableInteractive`.
  If you want to restore the old behavior (thus not reaching level AA), you can apply the following diff:

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>

  # Interactive tooltips no longer need the `interactive` prop.
  -<Tooltip interactive>
  +<Tooltip>
  ```

### Typography

- Replace the `srOnly` prop so as to not duplicate the capabilities of [System](https://material-ui.com/system/basics/):

  ```diff
  -import Typography from '@material-ui/core/Typography';
  +import { visuallyHidden } from '@material-ui/system';
  +import styled from 'styled-component';

  +const Span = styled('span')(visuallyHidden);

  -<Typography variant="srOnly">Create a user</Typography>
  +<Span>Create a user</Span>
  ```

### System

- Replace `css` prop with `sx` to avoid collision with styled-components & emotion CSS props.

```diff
-<Box css={{ color: 'primary.main' }} />
+<Box sx={{ color: 'primary.main' }} />
```
