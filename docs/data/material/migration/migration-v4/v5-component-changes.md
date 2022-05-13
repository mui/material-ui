# Breaking changes in v5, part 2: Core components

<p class="description">This is a reference guide to all of the breaking changes introduced in Material v5, and how to handle them when migrating from v4.</p>

## Introduction

Material UI v5 introduces a number of breaking changes from v4.
Many of these changes can be resolved automatically using [the codemods](/material-ui/migration/migration-v4/#run-codemods) described in the [main migration guide](/material-ui/migration/migration-v4/).

The following document lists all breaking changes in v5 and how to address them.

:::warning
Breaking changes that are handled by codemods are denoted with a ✅ emoji in the table of contents on the right side of the screen.

If you have already followed the instructions in the main migration guide and run the codemods, then you should not need to take any further action on these items.

All other changes must be handled manually.
:::

## Core components

As the core components use emotion as their style engine, the props used by emotion are not intercepted. The prop `as` in the following code snippet will not be propagated to `SomeOtherComponent`.

```jsx
<MuiComponent component={SomeOtherComponent} as="button" />
```

### AppBar

- Remove z-index when position static and relative. This avoids the creation of a stacking context and rendering issues.
- The `color` prop has no longer any effect in dark mode. The app bar uses the background color required by the elevation to follow the [Material Design guidelines](https://material.io/design/color/dark-theme.html). Use `enableColorOnDark` to restore the behavior of v4.

  ```jsx
  <AppBar enableColorOnDark />
  ```

### Alert

- Move the component from the lab to the core. The component is now stable.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -import Alert from '@mui/lab/Alert';
  -import AlertTitle from '@mui/lab/AlertTitle';
  +import Alert from '@mui/material/Alert';
  +import AlertTitle from '@mui/material/AlertTitle';
  ```

### Autocomplete

- Move the component from the lab to the core. The component is now stable.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -import Autocomplete from '@mui/lab/Autocomplete';
  -import useAutocomplete  from '@mui/lab/useAutocomplete';
  +import Autocomplete from '@mui/material/Autocomplete';
  +import useAutoComplete from '@mui/material/useAutocomplete';
  ```

- Remove `debug` prop. There are a couple of simpler alternatives: `open={true}`, Chrome devtools ["Emulate focused"](https://twitter.com/sulco/status/1305841873945272321), or React devtools prop setter.
- `renderOption` should now return the full DOM structure of the option.
  It makes customizations easier. You can recover from the change with:

  ```diff
   <Autocomplete
  -  renderOption={(option, { selected }) => (
  -    <React.Fragment>
  +  renderOption={(props, option, { selected }) => (
  +    <li {...props}>
         <Checkbox
           icon={icon}
           checkedIcon={checkedIcon}
           style={{ marginRight: 8 }}
           checked={selected}
         />
         {option.title}
  -    </React.Fragment>
  +    </li>
     )}
   />
  ```

- Rename `closeIcon` prop to `clearIcon` to avoid confusion.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Autocomplete closeIcon={defaultClearIcon} />
  +<Autocomplete clearIcon={defaultClearIcon} />
  ```

- The following values of the reason argument in `onChange` and `onClose` were renamed for consistency:

  1. `create-option` to `createOption`
  2. `select-option` to `selectOption`
  3. `remove-option` to `removeOption`

- Change the CSS rules that use `[data-focus="true"]` to use `.Mui-focused`. The `data-focus` attribute is not set on the focused option anymore, instead, global class names are used.

  ```diff
  -'.MuiAutocomplete-option[data-focus="true"]': {
  +'.MuiAutocomplete-option.Mui-focused': {
  ```

- Rename `getOptionSelected` to `isOptionEqualToValue` to better describe its purpose.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
   <Autocomplete
  -  getOptionSelected={(option, value) => option.title === value.title}
  +  isOptionEqualToValue={(option, value) => option.title === value.title}
  ```

### Avatar

- Rename `circle` to `circular` for consistency:

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Avatar variant="circle">
  -<Avatar classes={{ circle: 'className' }}>
  +<Avatar variant="circular">
  +<Avatar classes={{ circular: 'className' }}>
  ```

  Since `circular` is the default value, the variant prop can be deleted:

  ```diff
  -<Avatar variant="circle">
  +<Avatar>
  ```

- Move the AvatarGroup from the lab to the core.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -import AvatarGroup from '@mui/lab/AvatarGroup';
  +import AvatarGroup from '@mui/material/AvatarGroup';
  ```

### Badge

- Rename `circle` to `circular` and `rectangle` to `rectangular` for consistency.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Badge overlap="circle">
  -<Badge overlap="rectangle">
  +<Badge overlap="circular">
  +<Badge overlap="rectangular">
  ```

  ```diff
   <Badge classes={{
  -  anchorOriginTopRightRectangle: 'className',
  -  anchorOriginBottomRightRectangle: 'className',
  -  anchorOriginTopLeftRectangle: 'className',
  -  anchorOriginBottomLeftRectangle: 'className',
  -  anchorOriginTopRightCircle: 'className',
  -  anchorOriginBottomRightCircle: 'className',
  -  anchorOriginTopLeftCircle: 'className',
  +  anchorOriginTopRightRectangular: 'className',
  +  anchorOriginBottomRightRectangular: 'className',
  +  anchorOriginTopLeftRectangular: 'className',
  +  anchorOriginBottomLeftRectangular: 'className',
  +  anchorOriginTopRightCircular: 'className',
  +  anchorOriginBottomRightCircular: 'className',
  +  anchorOriginTopLeftCircular: 'className',
   }}>
  ```

### BottomNavigation

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<BottomNavigation onChange={(event: React.ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React.SyntheticEvent) => {}} />
  ```

### BottomNavigationAction

- Remove the `span` element that wraps the children.
  Remove the `wrapper` classKey too.
  More details about [this change](https://github.com/mui/material-ui/pull/26923).

  ```diff
   <button class="MuiBottomNavigationAction-root">
  -  <span class="MuiBottomNavigationAction-wrapper">
       {icon}
       <span class="MuiBottomNavigationAction-label">
         {label}
       </span>
  -  </span>
   </button>
  ```

### Box

- The `borderRadius` system prop value transformation has been changed.
  If it receives a number, it multiplies this value with the `theme.shape.borderRadius` value.
  Use a string to provide an explicit `px` value.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Box borderRadius="borderRadius">
  +<Box borderRadius={1}>
  ```

  ```diff
  -<Box borderRadius={16}>
  +<Box borderRadius="16px">
  ```

- The Box system props have an optional alternative API in v5, using the `sx` prop. You can [read this section](/system/basics/#api-tradeoff) for the "why" behind this new API.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```jsx
  <Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
  <Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
  ```

- The following properties have been renamed because they are considered deprecated CSS properties by the CSS specification:

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  1. `gridGap` to `gap`
  2. `gridColumnGap` to `columnGap`
  3. `gridRowGap` to `rowGap`

  ```diff
  -<Box gridGap={1}>
  -<Box gridColumnGap={2}>
  -<Box gridRowGap={3}>
  +<Box gap={1}>
  +<Box columnGap={2}>
  +<Box rowGap={3}>
  ```

  (Note that the system grid function wasn't documented in v4.)

- The `clone` prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a MUI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }} clone>
  -  <Button>Save</Button>
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

- The ability to pass a render prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a MUI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <Button {...props}>Save</Button>}
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

  For non-MUI components, use the `component` prop.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <button {...props}>Save</button>}
  -</Box>
  +<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
  ```

### Button

- The button `color` prop is now "primary" by default, and "default" has been removed.
  This makes the button closer to the Material Design guidelines and simplifies the API.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Button color="default">
  +<Button>
  ```

  If you prefer to use the `default` color in v4, take a look at this [CodeSandbox](https://codesandbox.io/s/mimic-v4-button-default-color-bklx8?file=/src/Demo.tsx)

- The `span` element that wraps children has been removed.
  The `label` classKey is also removed.
  More details about [this change](https://github.com/mui/material-ui/pull/26666).

  ```diff
   <button class="MuiButton-root">
  -  <span class="MuiButton-label">
       children
  -  </span>
   </button>
  ```

### Chip

- Rename `default` variant to `filled` for consistency.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  Since `filled` is the default value, the variant prop can be deleted:

  ```diff
  -<Chip variant="default">
  +<Chip>
  ```

### Checkbox

- The checkbox color prop is now "primary" by default.
  To continue using the "secondary" color, you must explicitly indicate `secondary`.
  This brings the checkbox closer to the Material Design guidelines.

  ```diff
  -<Checkbox />
  +<Checkbox color="secondary" />
  ```

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
  -<span class="MuiIconButton-root MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  -  <span class="MuiIconButton-label">
  -    <input class="PrivateSwitchBase-input">
  +<span class="MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  +  <span class="PrivateSwitchBase-input">
  ```

### CircularProgress

- The `static` variant has been renamed to `determinate`, and the previous appearance of `determinate` has been replaced by that of `static`.
  It was an exception to Material Design, and was removed from the specification.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<CircularProgress variant="static" classes={{ static: 'className' }} />
  +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  ```

:::warning
NB: If you had previously customized determinate, your customizations are probably no longer valid. Please remove them.
:::

### Collapse

- The `collapsedHeight` prop was renamed `collapsedSize` to support the horizontal direction.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Collapse collapsedHeight={40}>
  +<Collapse collapsedSize={40}>
  ```

- The `classes.container` key was changed to match the convention of the other components.

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

### CssBaseline

- The component was migrated to use the `@mui/styled-engine` (`emotion` or `styled-components`) instead of `jss`.
  You should remove the `@global` key when defining the style overrides for it.
  You could also start using the CSS template syntax over the JavaScript object syntax.

  ```diff
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
  -     styleOverrides: {
  -       '@global': {
  -         html: {
  -           WebkitFontSmoothing: 'auto',
  -         },
  -       },
  -     },
  +     styleOverrides: `
  +       html {
  +         -webkit-font-smoothing: auto;
  +       }
  +     `
      },
    },
  });
  ```

- The `body` font size has changed from `theme.typography.body2` (`0.875rem`) to `theme.typography.body1` (`1rem`).
  To return to the previous size, you can override it in the theme:

  ```js
  const theme = createMuiTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: '0.01071em',
          },
        },
      },
    },
  });
  ```

### Dialog

- The onE\* transition props were removed.
  Use TransitionProps instead.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
   <Dialog
  -  onEnter={onEnter}
  -  onEntered={onEntered}
  -  onEntering={onEntering}
  -  onExit={onExit}
  -  onExited={onExited}
  -  onExiting={onExiting}
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

- Remove the `disableBackdropClick` prop because it is redundant.
  Ignore close events from `onClose` when `reason === 'backdropClick'` instead.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
   <Dialog
  -  disableBackdropClick
  -  onClose={handleClose}
  +  onClose={(event, reason) => {
  +    if (reason !== 'backdropClick') {
  +      handleClose(event, reason);
  +    }
  +  }}
   />
  ```

- Remove the `withMobileDialog` higher-order component.
  The hook API allows a simpler and more flexible solution:

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying hard-coded function to prevent application crash, further fixes are required.
  :::

  ```diff
  -import withMobileDialog from '@mui/material/withMobileDialog';
  +import { useTheme, useMediaQuery } from '@mui/material';

  function ResponsiveDialog(props) {
  - const { fullScreen } = props;
  + const theme = useTheme();
  + const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

  // ...

  -export default withMobileDialog()(ResponsiveDialog);
  +export default ResponsiveDialog;
  ```

- Flatten DialogTitle DOM structure, remove `disableTypography` prop

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<DialogTitle disableTypography>
  -  <Typography variant="h4" component="h2">
  +<DialogTitle>
  +  <Typography variant="h4" component="span">
       My header
     </Typography>
  ```

### Divider

- Use border instead of background color.
  It prevents inconsistent height on scaled screens.
  If you have customized the color of the border, you will need to update the CSS property override:

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### ExpansionPanel

- Rename the `ExpansionPanel` components to `Accordion` to use a more common naming convention:

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -import ExpansionPanel from '@mui/material/ExpansionPanel';
  -import ExpansionPanelSummary from '@mui/material/ExpansionPanelSummary';
  -import ExpansionPanelDetails from '@mui/material/ExpansionPanelDetails';
  -import ExpansionPanelActions from '@mui/material/ExpansionPanelActions';
  +import Accordion from '@mui/material/Accordion';
  +import AccordionSummary from '@mui/material/AccordionSummary';
  +import AccordionDetails from '@mui/material/AccordionDetails';
  +import AccordionActions from '@mui/material/AccordionActions';

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

### ExpansionPanelDetails

- Remove `display: flex` from `AccordionDetails` (formerly `ExpansionPanelDetails`) as its too opinionated.
  Most developers expect a display block.

### ExpansionPanelSummary

- Rename `focused` to `focusVisible` for consistency:

  ```diff
   <AccordionSummary
     classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
     }}
    />
  ```

- Remove `IconButtonProps` prop from `AccordionSummary` (formerly `ExpansionPanelSummary`).
  The component renders a `<div>` element instead of an `IconButton`.
  The prop is no longer necessary.

### Fab

- Rename `round` to `circular` for consistency:

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Fab variant="round">
  +<Fab variant="circular">
  ```

- The `span` element that wraps children has been removed.
  The `label` classKey is also removed.
  More details about [this change](https://github.com/mui/material-ui/pull/27112).

  ```diff
   <button class="MuiFab-root">
  -  <span class="MuiFab-label">
       {children}
  -  </span>
   </button>
  ```

### FormControl

- Change the default variant from `standard` to `outlined`.
  Standard has been removed from the Material Design guidelines.

  :::success
  ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod.
  :::

  ```diff
  -<FormControl value="Standard" />
  -<FormControl value="Outlined" variant="outlined" />
  +<FormControl value="Standard" variant="standard" />
  +<FormControl value="Outlined" />
  ```

### FormControlLabel

- The `label` prop is now required.
  If you were using a `FormControlLabel` without a `label`, you can replace it with just the value of the `control` prop.

```diff
-<FormControlLabel control={<Checkbox />} />
+<Checkbox />
```

### Grid

- Rename `justify` prop to `justifyContent` to align with the CSS property name.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Grid justify="center">
  +<Grid justifyContent="center">
  ```

- The props: `alignItems` `alignContent` and `justifyContent` and their `classes` and style overrides keys were removed: "align-items-xs-center", "align-items-xs-flex-start", "align-items-xs-flex-end", "align-items-xs-baseline", "align-content-xs-center", "align-content-xs-flex-start", "align-content-xs-flex-end", "align-content-xs-space-between", "align-content-xs-space-around", "justify-content-xs-center", "justify-content-xs-flex-end", "justify-content-xs-space-between", "justify-content-xs-space-around" and "justify-content-xs-space-evenly".
  These props are now considered part of the system, not on the `Grid` component itself.
  If you still wish to add overrides for them, you can use the [callback as a value in `styleOverrides`](/material-ui/customization/theme-components/#overrides-based-on-props).

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  const theme = createTheme({
    components: {
      MuiGrid: {
  -     styleOverrides: {
  -       "align-items-xs-flex-end": {
  -         marginTop: '20px',
  -       },
  -     },
  +     styleOverrides: ({ ownerState }) => ({
  +       ...ownerState.alignItems === 'flex-end' && {
  +         marginTop: '20px',
  +       },
  +     }),
      },
    },
  });
  ```

### GridList

- Rename the `GridList` components to `ImageList` to align with the current Material Design naming.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

- Rename the GridList `spacing` prop to `gap` to align with the CSS attribute.
- Rename the GridList `cellHeight` prop to `rowHeight`.
- Add the `variant` prop to GridList.
- Rename the GridListItemBar `actionPosition` prop to `position`. (Note also the related classname changes.)
- Use CSS object-fit. For IE11 support either use a polyfill such as
  https://www.npmjs.com/package/object-fit-images, or continue to use the v4 component.

  ```diff
  -import GridList from '@mui/material/GridList';
  -import GridListTile from '@mui/material/GridListTile';
  -import GridListTileBar from '@mui/material/GridListTileBar';
  +import ImageList from '@mui/material/ImageList';
  +import ImageListItem from '@mui/material/ImageListItem';
  +import ImageListItemBar from '@mui/material/ImageListItemBar';

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

### Hidden

- This component is deprecated because its functionality can be created with the [`sx`](/system/basics/#the-sx-prop) prop or the [`useMediaQuery`](/material-ui/react-use-media-query/) hook.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying fake `Hidden` component to prevent application crash, further fixes are required.
  :::

  Use the `sx` prop to replace `implementation="css"`:

  ```diff
  -<Hidden implementation="css" xlUp><Paper /></Hidden>
  -<Hidden implementation="css" xlUp><button /></Hidden>
  +<Paper sx={{ display: { xl: 'none', xs: 'block' } }} />
  +<Box component="button" sx={{ display: { xl: 'none', xs: 'block' } }} />
  ```

  ```diff
  -<Hidden implementation="css" mdDown><Paper /></Hidden>
  -<Hidden implementation="css" mdDown><button /></Hidden>
  +<Paper sx={{ display: { xs: 'none', md: 'block' } }} />
  +<Box component="button" sx={{ display: { xs: 'none', md: 'block' } }} />
  ```

  Use the `useMediaQuery` hook to replace `implementation="js"`:

  ```diff
  -<Hidden implementation="js" xlUp><Paper /></Hidden>
  +const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));
  +return hidden ? null : <Paper />;
  ```

### Icon

- The default value of `fontSize` was changed from `default` to `medium` for consistency.
  In the unlikely event that you were using the value `default`, the prop can be removed:

  ```diff
  -<Icon fontSize="default">icon-name</Icon>
  +<Icon>icon-name</Icon>
  ```

### IconButton

- The default size's padding is reduced to `8px` which makes the default IconButton size of `40px`.
  To get the old default size (`48px`), use `size="large"`.
  The change was done to better match Google's products when Material Design stopped documenting the icon button pattern.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  - <IconButton>
  + <IconButton size="large">
  ```

- The `span` element that wraps children has been removed.
  The `label` classKey is also removed.
  More details about [this change](https://github.com/mui/material-ui/pull/26666).

  ```diff
   <button class="MuiIconButton-root">
  -  <span class="MuiIconButton-label">
       <svg />
  -  </span>
   </button>
  ```

### Link

- The default `underline` prop is changed from `"hover"` to `"always"`.
  To get the same behavior as in v4, apply `defaultProps` in theme

  :::success
  ✅ This is handled in [link-underline-hover codemod](#link-underline-hover), read the details before running this codemod.
  :::

  ```js
  createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
  });
  ```

### Menu

- The onE\* transition props were removed.
  Use TransitionProps instead.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
   <Menu
  -  onEnter={onEnter}
  -  onEntered={onEntered}
  -  onEntering={onEntering}
  -  onExit={onExit}
  -  onExited={onExited}
  -  onExiting={onExiting}
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

  :::info
  Note: The `selectedMenu` variant will no longer vertically align the selected item with the anchor.
  :::

- Change the default value of `anchorOrigin.vertical` to follow the Material Design guidelines. The menu now displays below the anchor instead of on top of it.
  You can restore the previous behavior with:

  ```diff
   <Menu
  +  anchorOrigin={{
  +    vertical: 'top',
  +    horizontal: 'left',
  +  }}
  ```

### MenuItem

- The `MenuItem` component inherits the `ButtonBase` component instead of `ListItem`
  The class names related to "MuiListItem-\*" are removed and theming `ListItem` is no longer affecting `MenuItem`.

  ```diff
  -<li className="MuiButtonBase-root MuiMenuItem-root MuiListItem-root">
  +<li className="MuiButtonBase-root MuiMenuItem-root">
  ```

- prop `listItemClasses` is removed, use `classes` instead.

  ```diff
  -<MenuItem listItemClasses={{...}}>
  +<MenuItem classes={{...}}>
  ```

  Read more about [MenuItem CSS API](/material-ui/api/menu-item/#css)

### Modal

- Remove the `disableBackdropClick` prop because it is redundant.
  Use `onClose` with `reason === 'backdropClick'` instead.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
   <Modal
  -  disableBackdropClick
  -  onClose={handleClose}
  +  onClose={(event, reason) => {
  +    if (reason !== 'backdropClick') {
  +      handleClose(event, reason);
  +    }
  +  }}
   />
  ```

- Remove the `onEscapeKeyDown` prop because it is redundant.
  Use `onClose` with `reason === "escapeKeyDown"` instead.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
   <Modal
  -  onEscapeKeyDown={handleEscapeKeyDown}
  +  onClose={(event, reason) => {
  +    if (reason === 'escapeKeyDown') {
  +      handleEscapeKeyDown(event);
  +    }
  +  }}
   />
  ```

- Remove `onRendered` prop.
  Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### NativeSelect

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant.
  The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<NativeSelect classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<NativeSelect classes={{ select: 'class1 class2 class3' }} />
  ```

### OutlinedInput

- Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined.

  ```diff
  -<OutlinedInput labelWidth={20} />
  +<OutlinedInput label="First Name" />
  ```

### Paper

- Change the background opacity based on the elevation in dark mode.
  This change was done to follow the Material Design guidelines.
  You can revert it in the theme:

  ```diff
  const theme = createTheme({
    components: {
      MuiPaper: {
  +     styleOverrides: { root: { backgroundImage: 'unset' } },
      },
    },
  });
  ```

### Pagination

- Move the component from the lab to the core.
  The component is now stable.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -import Pagination from '@mui/lab/Pagination';
  -import PaginationItem from '@mui/lab/PaginationItem';
  -import { usePagination } from '@mui/lab/Pagination';
  +import Pagination from '@mui/material/Pagination';
  +import PaginationItem from '@mui/material/PaginationItem';
  +import usePagination from '@mui/material/usePagination';
  ```

- Rename `round` to `circular` for consistency:

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Pagination shape="round">
  -<PaginationItem shape="round">
  +<Pagination shape="circular">
  +<PaginationItem shape="circular">
  ```

### Popover

- The onE\* transition props were removed.
  Use TransitionProps instead.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
   <Popover
  -  onEnter={onEnter}
  -  onEntered={onEntered}
  -  onEntering={onEntering}
  -  onExit={onExit}
  -  onExited={onExited}
  -  onExiting={onExiting}
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

- The `getContentAnchorEl` prop was removed to simplify the positioning logic.

### Popper

- Upgrade [Popper.js](https://popper.js.org/) from v1 to v2.
  This third-party library has introduced a lot of changes.<br />
  You can read [their migration guide](https://popper.js.org/docs/v2/migration-guide/) or the following summary:

  - The CSS prefixes have changed:

    ```diff
     popper: {
       zIndex: 1,
    -  '&[x-placement*="bottom"] .arrow': {
    +  '&[data-popper-placement*="bottom"] .arrow': {
    ```

  - Method names have changed:

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

### Radio

- The radio color prop is now "primary" by default.
  To continue using the "secondary" color, you must explicitly indicate `secondary`.
  This brings the radio closer to the Material Design guidelines.

  ```diff
  -<Radio />
  +<Radio color="secondary" />
  ```

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### Rating

- Move the component from the lab to the core.
  The component is now stable.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -import Rating from '@mui/lab/Rating';
  +import Rating from '@mui/material/Rating';
  ```

- Change the default empty icon to improve accessibility.
  If you have a custom `icon` prop but no `emptyIcon` prop, you can restore the previous behavior with:

  ```diff
   <Rating
     icon={customIcon}
  +  emptyIcon={null}
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

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying fake `RootRef` component to prevent application crash, further fixes are required.
  :::

  ```diff
  -<RootRef rootRef={ref}>
  -  <Button />
  -</RootRef>
  +<Button ref={ref} />
  ```

### Select

- Change the default variant from `standard` to `outlined`.
  Standard has been removed from the Material Design guidelines.
  If you are composing the Select with a form control component, you only need to update `FormControl`, the select inherits the variant from its context.

  :::success
  ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod.
  :::

  ```diff
  -<Select value="Standard" />
  -<Select value="Outlined" variant="outlined" />
  +<Select value="Standard" variant="standard" />
  +<Select value="Outlined" />
  ```

- Remove the `labelWidth` prop.
  The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined.
  The TextField already handles it by default.

  ```diff
  -<Select variant="outlined" labelWidth={20} />
  +<Select variant="outlined" label="Gender" />
  ```

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant.
  The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<Select classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<Select classes={{ select: 'class1 class2 class3' }} />
  ```

- The `event` in `onChange` is now a synthetic, native `Event` not a React event.

  ```diff
  -<Select onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  +<Select onChange={(event: Event, value: unknown) => {}} />
  ```

  This was necessary to prevent overriding of `event.target` of the events that caused the change.

### Skeleton

- Move the component from the lab to the core.
  The component is now stable.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -import Skeleton from '@mui/lab/Skeleton';
  +import Skeleton from '@mui/material/Skeleton';
  ```

- Rename `circle` to `circular` and `rect` to `rectangular` for consistency:

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Skeleton variant="circle" />
  -<Skeleton variant="rect" />
  -<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
  +<Skeleton variant="circular" />
  +<Skeleton variant="rectangular" />
  +<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
  ```

### Slider

- The `event` in `onChange` is now a synthetic, native `Event`, not a React event.

  ```diff
  -<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  +<Slider onChange={(event: Event, value: unknown) => {}} />
  ```

  This was necessary to prevent overriding of `event.target` of the events that caused the change.

- The `ValueLabelComponent` and `ThumbComponent` prop is now part of the `components` prop.

  ```diff
   <Slider
  -  ValueLabelComponent={CustomValueLabel}
  -  ThumbComponent={CustomThumb}
  +  components={{
  +    ValueLabel: CustomValueLabel,
  +    Thumb: CustomThumb,
  +  }}
   />
  ```

- Rework the CSS to match the latest [Material Design guidelines](https://material.io/components/sliders) and make custom styles more intuitive.
  [See documentation](/material-ui/react-slider/).

  <a href="/material-ui/react-slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

  You can reduce the density of the slider, closer to v4 with the [`size="small"` prop](/material-ui/react-slider/#sizes).

### Snackbar

- The notification now displays at the bottom left on large screens.
  This better matches the behavior of Gmail, Google Keep, material.io, etc.
  You can restore the previous behavior with:

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- The onE\* transition props were removed.
  Use TransitionProps instead.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
   <Snackbar
  -  onEnter={onEnter}
  -  onEntered={onEntered}
  -  onEntering={onEntering}
  -  onExit={onExit}
  -  onExited={onExited}
  -  onExiting={onExiting}
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

### SpeedDial

- Move the component from the lab to the core.
  The component is now stable.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -import SpeedDial from '@mui/lab/SpeedDial';
  -import SpeedDialAction from '@mui/lab/SpeedDialAction';
  -import SpeedDialIcon from '@mui/lab/SpeedDialIcon';
  +import SpeedDial from '@mui/material/SpeedDial';
  +import SpeedDialAction from '@mui/material/SpeedDialAction';
  +import SpeedDialIcon from '@mui/material/SpeedDialIcon';
  ```

### Stepper

- The root component (Paper) was replaced with a div.
  Stepper no longer has elevation, nor inherits Paper's props.
  This change is meant to encourage composition.

  ```diff
  +<Paper square elevation={2}>
  -  <Stepper elevation={2}>
  +  <Stepper>
       <Step>
         <StepLabel>Hello world</StepLabel>
       </Step>
     </Stepper>
  +<Paper>
  ```

- Remove the built-in 24px padding.

  ```diff
  -<Stepper>
  +<Stepper style={{ padding: 24 }}>
     <Step>
       <StepLabel>Hello world</StepLabel>
     </Step>
   </Stepper>
  ```

### SvgIcon

- The default value of `fontSize` was changed from `default` to `medium` for consistency.
  In the unlikey event that you were using the value `default`, the prop can be removed:

  ```diff
  -<SvgIcon fontSize="default">
  +<SvgIcon>
     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
   </SvgIcon>
  ```

### Switch

- Deprecate the second argument from `onChange`.
  You can pull out the checked state by accessing `event.target.checked`.

  ```diff
  function MySwitch() {
  - const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
  + const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  +   const checked = event.target.checked;
    };

    return <Switch onChange={handleChange} />;
  }
  ```

- The switch color prop is now "primary" by default.
  To continue using the "secondary" color, you must explicitly indicate `secondary`.
  This brings the switch closer to the Material Design guidelines.

  ```diff
  -<Switch />
  +<Switch color="secondary" />
  ```

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
   <span class="MuiSwitch-root">
  -  <span class="MuiIconButton-root MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  -    <span class="MuiIconButton-label">
  -      <input class="MuiSwitch-input PrivateSwitchBase-input">
  +  <span class="MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  +    <span class="MuiSwitch-input PrivateSwitchBase-input">
  ```

### Table

- Rename the `default` value of the `padding` prop to `normal`.

  ```diff
  -<Table padding="default" />
  -<TableCell padding="default" />
  +<Table padding="normal" />
  +<TableCell padding="normal" />
  ```

### TablePagination

- The customization of the table pagination's actions labels must be done with the `getItemAriaLabel` prop.
  This increases consistency with the `Pagination` component.

  ```diff
   <TablePagination
  -  backIconButtonText="Avant"
  -  nextIconButtonText="Après"
  +  getItemAriaLabel={…}
  ```

- Rename `onChangeRowsPerPage` to `onRowsPerPageChange` and `onChangePage` to `onPageChange` due to API consistency.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
   <TablePagination
  -  onChangeRowsPerPage={()=>{}}
  -  onChangePage={()=>{}}
  +  onRowsPerPageChange={()=>{}}
  +  onPageChange={()=>{}}
  ```

- Separate classes for different table pagination labels.
  This allows simpler customizations.

  ```diff
   <TablePagination
  -  classes={{ caption: 'foo' }}
  +  classes={{ selectLabel: 'foo', displayedRows: 'foo' }}
   />
  ```

- Move the custom class on `input` to `select`.
  The `input` key is being applied on another element.

  ```diff
   <TablePagination
  -  classes={{ input: 'foo' }}
  +  classes={{ select: 'foo' }}
   />
  ```

### Tabs

- Change the default `indicatorColor` and `textColor` prop values to "primary".
  This is done to match the most common use cases with Material Design.

  ```diff
  -<Tabs />
  +<Tabs indicatorColor="primary" textColor="inherit" />
  ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Tabs onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

- The API that controls the scroll buttons has been split it in two props.

  - The `scrollButtons` prop controls when the scroll buttons are displayed depending on the space available.
  - The `allowScrollButtonsMobile` prop removes the CSS media query that systematically hide the scroll buttons on mobile.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<Tabs scrollButtons="on" />
  -<Tabs scrollButtons="desktop" />
  -<Tabs scrollButtons="off" />
  +<Tabs scrollButtons allowScrollButtonsMobile />
  +<Tabs scrollButtons />
  +<Tabs scrollButtons={false} />
  ```

### Tab

- Tab `minWidth` changed from `72px` => `90px` (without media-query) according to [material-design spec](https://material.io/components/tabs#specs)
- Tab `maxWidth` changed from `264px` => `360px` according to [material-design spec](https://material.io/components/tabs#specs)
- `span` element that wraps children has been removed. `wrapper` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/26926).

  ```diff
   <button class="MuiTab-root">
  -  <span class="MuiTab-wrapper">
       {icon}
       {label}
  -  </span>
   </button>
  ```

### TextField

- Change the default variant from `standard` to `outlined`.
  Standard has been removed from the Material Design guidelines.

  :::success
  ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod.
  :::

  ```diff
  -<TextField value="Standard" />
  -<TextField value="Outlined" variant="outlined" />
  +<TextField value="Standard" variant="standard" />
  +<TextField value="Outlined" />
  ```

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<TextField rowsMax={6}>
  +<TextField maxRows={6}>
  ```

- Better isolate the fixed textarea height behavior to the dynamic one.
  You need to use the `minRows` prop in the following case:

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<TextField rows={2} maxRows={5} />
  +<TextField minRows={2} maxRows={5} />
  ```

- Change ref forwarding expectations on custom `inputComponent`.
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

- Rename `marginDense` and `inputMarginDense` classes to `sizeSmall` and `inputSizeSmall` to match the prop.

  ```diff
  -<Input margin="dense" />
  +<Input size="small" />
  ```

- Set the InputAdornment `position` prop to `start` or `end`.
  Use `start` if used as the value of the `startAdornment` prop.
  Use `end` if used as the value of the `endAdornment` prop.

  ```diff
  -<TextField startAdornment={<InputAdornment>kg</InputAdornment>} />
  -<TextField endAdornment={<InputAdornment>kg</InputAdornment>} />
  +<TextField startAdornment={<InputAdornment position="start">kg</InputAdornment>} />
  +<TextField endAdornment={<InputAdornment position="end">kg</InputAdornment>} />
  ```

### TextareaAutosize

- Remove the `rows` prop, use the `minRows` prop instead.
  This change aims to clarify the behavior of the prop.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<TextareaAutosize rows={2} />
  +<TextareaAutosize minRows={2} />
  ```

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<TextareaAutosize rowsMax={6}>
  +<TextareaAutosize maxRows={6}>
  ```

- Rename `rowsMin` prop with `minRows` for consistency with HTML attributes.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -<TextareaAutosize rowsMin={1}>
  +<TextareaAutosize minRows={1}>
  ```

### ToggleButton

- Move the component from the lab to the core.
  The component is now stable.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -import ToggleButton from '@mui/lab/ToggleButton';
  -import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
  +import ToggleButton from '@mui/material/ToggleButton';
  +import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
  ```

- The `span` element that wraps children has been removed.
  The `label` classKey is also removed.
  More details about [this change](https://github.com/mui/material-ui/pull/27111).

  ```diff
   <button class="MuiToggleButton-root">
  -  <span class="MuiToggleButton-label">
       {children}
  -  </span>
   </button>
  ```

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

- Remove the `srOnly` variant.
  You can use the `visuallyHidden` utility in conjunction with the `sx` prop instead.

  ```diff
  +import { visuallyHidden } from '@mui/utils';

  -<Typography variant="srOnly">Create a user</Typography>
  +<span style={visuallyHidden}>Create a user</span>
  ```

- The following `classes` and style overrides keys were removed: "colorInherit", "colorPrimary", "colorSecondary", "colorTextPrimary", "colorTextSecondary", "colorError", "displayInline" and "displayBlock".
  These props are now considered part of the system, not on the `Typography` component itself.
  If you still wish to add overrides for them, you can use the [callback as a value in `styleOverrides`](/material-ui/customization/theme-components/#overrides-based-on-props).
  For example:

  ```diff
  const theme = createTheme({
    components: {
      MuiTypography: {
  -     styleOverrides: {
  -       colorSecondary: {
  -         marginTop: '20px',
  -       },
  -     },
  +     styleOverrides: ({ ownerState }) => ({
  +       ...ownerState.color === 'secondary' && {
  +         marginTop: '20px',
  +       },
  +     }),
      },
    },
  });
  ```

### Theme

- The default background color is now `#fff` in light mode and `#121212` in dark mode.
  This matches the Material Design guidelines.
- Breakpoints are now treated as values instead of [ranges](https://v4.mui.com/customization/breakpoints/#default-breakpoints).
  The behavior of `down(key)` was changed to define a media query below the value defined by the corresponding breakpoint (exclusive), rather than the breakpoint above.
  `between(start, end)` was also updated to define a media query for the values between the actual values of start (inclusive) and end (exclusive).
  When using the `down()` breakpoints utility you need to update the breakpoint key by one step up.
  When using the `between(start, end)` the end breakpoint should also be updated by one step up.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  Here are some examples of the changes required:

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

  The same should be done when using the `Hidden` component:

  ```diff
  -<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
  +<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
  ```

- The default breakpoints were changed to better match the common use cases.
  They also better match the Material Design guidelines.
  [Read more about the change](https://github.com/mui/material-ui/issues/21902)

  ```diff
  {
    xs: 0,
    sm: 600,
  - md: 960,
  + md: 900,
  - lg: 1280,
  + lg: 1200,
  - xl: 1920,
  + xl: 1536,
  }
  ```

  If you prefer the old breakpoint values, use the snippet below.

  ```js
  import { createTheme } from '@mui/material/styles';

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  ```

- The `theme.breakpoints.width` utility was removed because it's redundant.
  Use `theme.breakpoints.values` to get the same values.

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```diff
  -theme.breakpoints.width('md')
  +theme.breakpoints.values.md
  ```

- The signature of `theme.palette.augmentColor` helper has changed:

  ```diff
  -theme.palette.augmentColor(red);
  +theme.palette.augmentColor({ color: red, name: 'brand' });
  ```

- The `theme.typography.round` helper was removed because it was no longer used. If you need it, use the function below:

  :::success
  ✅ This is handled in the [preset-safe codemod](#preset-safe).
  :::

  ```js
  function round(value) {
    return Math.round(value * 1e5) / 1e5;
  }
  ```

### `@mui/types`

- Rename the exported `Omit` type in `@mui/types`.
  The module is now called `DistributiveOmit`.
  The change removes the confusion with the built-in `Omit` helper introduced in TypeScript v3.5.
  The built-in `Omit`, while similar, is non-distributive.
  This leads to differences when applied to union types.
  [See this StackOverflow answer for further details](https://stackoverflow.com/a/57103940/1009797).

  ```diff
  -import { Omit } from '@mui/types';
  +import { DistributiveOmit } from '@mui/types';
  ```
