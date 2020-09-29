# Migración de v4 a v5

<p class="description">¡Sí, v5 ha sido lanzada!</p>

¿Buscando la documentación v4? [Encuéntralos aquí](https://material-ui.com/versions/).

> Este documento es un trabajo en curso. ¿Ha actualizado su sitio y se ha topado con algo que no está cubierto aquí? Have you upgraded your site and run into something that's not covered here? [Add your changes on GitHub](https://github.com/mui-org/material-ui/blob/next/docs/src/pages/guides/migration-v4/migration-v4.md).

## Introducción

Esta es una referencia para actualizar su sitio de Material-UI v4 a v5. Aunque hay mucho cubierto aquí, probablemente no tendrá que hacer todo por su sitio. Haremos todo lo posible para mantener las cosas fáciles de seguir, y tan secuencial como sea posible para que pueda rápidamente ponerse usando la v5!

## Por qué debería migrar

Esta página de documentación cubre _cómo_ migrar de v4 a v5. The *why* is covered in the [release blog post on Medium](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701).

## Actualizando tus dependencias

Lo primero que necesitará hacer es actualizar sus dependencias.

### Actualizar versión de Material-UI

Necesitas actualizar tu `package.json` para usar la última versión de Material-UI.

```json
"dependencies": {
  "@material-ui/core": "^5.0.0-alpha.1"
}
```

Or run

```sh
npm install @material-ui/core@next

o

yarn add @material-ui/core@next
```

## Handling breaking changes

### non-ref-forwarding class components

Support for non-ref-forwarding class components in the `component` prop or as an immediate `children` has been dropped. If you were using `unstable_createStrictModeTheme` or didn't see any warnings related to `findDOMNode` in `React.StrictMode` then you don't need to do anything. Otherwise check out the ["Caveat with refs" section in our composition guide](/guides/composition/#caveat-with-refs) to find out how to migrate. This change affects almost all components where you're using the `component` prop or passing `children` to components that require `children` to be elements (e.g. `<MenuList><CustomMenuItem /></MenuList>`)

### Tema

- Los puntos de interrupción ahora son tratados como valores en lugar de rangos. The behavior of `down(key)` was changed to define media query less than the value defined with the corresponding breakpoint (exclusive). The `between(start, end)` was also updated to define media query for the values between the actual values of start (inclusive) and end (exclusive). When using the `down()` breakpoints utility you need to update the breakpoint key by one step up. When using the `between(start, end)` the end breakpoint should also be updated by one step up. The same should be done when using the `Hidden` component. Find examples of the changes required defined below:

```diff
-theme.breakpoints.down('sm') // '@media (max-width:959.95px)' - [0, sm + 1) => [0, md)
+theme.breakpoints.down('md') // '@media (max-width:959.95px)' - [0, md)
```

```diff
-theme.breakpoints.between('sm', 'md') // '@media (min-width:600px) y (max-width:1279.95px)' - [sm, md + 1) => [0, lg)
+theme. reakpoints.between('sm', 'lg') // '@media (min-width:600px) y (max-width:1279.95px)' - [0, lg)
```

```diff
-theme.breakpoints.between('sm', 'xl') // '@media (min-width:600px)'
+theme.breakpoints.up('sm') // '@media (min-width:600px)'
```

```diff
-<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
+<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
```

#### Mejorar ayudante

Para una transición más suave, el ayudante `adaptV4Theme` te permite actualizar iterativamente algunos de los cambios del tema a la nueva estructura del tema.

```diff
-import { createMuiTheme } from '@material-ui/core/styles';
+import { createMuiTheme, adaptV4Theme } from '@material-ui/core/styles';

-const theme = createMuitheme({
+const theme = createMuitheme(adaptV4Theme({
  // tema v4
-});
+}));
```

El adaptador soporta los siguientes cambios.

#### Cambios

- La abstracción "gutters" no ha demostrado ser usada con suficiente frecuencia como para ser valiosa.

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]: {
  +  paddingLeft: theme.spacing(3),
  +  paddingRight: theme.spacing(3),
  +},
  ```

- `theme.spacing` ahora devuelve valores únicos con unidades px por defecto. This change improves the integration with styled-components & emotion.

  Antes:

  ```
  theme.spacing(2) => 16
  ```

  Después:

  ```
  theme.spacing(2) => '16px'
  ```

- La clave `theme.palette.text.hint` no fue usada en componentes de Material-UI y ha sido eliminada.

```diff
import { createMuiTheme } from '@material-ui/core/styles'

-const theme = createMuitheme(),
+const theme = createMuitheme({
+  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
+});
```

```diff
import { createMuiTheme } from '@material-ui/core/styles'

-const theme = createMuitheme({palette: { type: 'dark' }}),
+const theme = createMuitheme({
+  palette: { type: 'dark', text: { hint: 'rgba(0, 0, 0, 0. 8)' } },
+});
```

- The components' definition inside the theme were restructure under the `components` key, to allow people easier discoverability about the definitions regarding one component.

- The `theme.palette.type` was renamed to `theme.palette.mode`, to better follow the "dark mode" term that is usually used for describing this feature.

```diff
import { createMuiTheme } from '@material-ui/core/styles';

-const theme = createMuitheme({palette: { type: 'dark' }}),
+const theme = createMuitheme({palette: { mode: 'dark' }}),
```

1. `props`

```diff
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuitheme({
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

const theme = createMuitheme({
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

### Alerta

- Mueve el componente del laboratorio al core. El componente ahora es estable.

  ```diff
  -import Alert from '@material-ui/lab/Alert';
  -import AlertTitle from '@material-ui/lab/AlertTitle';
  +import Alert from '@material-ui/core/Alert';
  +import AlertTitle from '@material-ui/core/AlertTitle';
  ```

### Avatar

- Renombrar `circle` a `circular` por consistencia. Los valores posibles deben ser adjetivos, no sustantivos:

  ```diff
  -<Avatar variant="circle">
  -<Avatar classes={{ circle: 'className' }}>
  +<Avatar variant="circular">
  +<Avatar classes={{ circular: 'className' }}>
  ```

### Badge

- Renombrar `circle` a `circular` y `rectangle` a `rectangular` para consistencia. Los valores posibles deben ser adjetivos, no sustantivos:

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
  -<BottomNavigation onChange={(event: React. ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React. SyntheticEvent) => {}} />
  ```

### Button (Botón)

- El prop `color` del botón ahora es "primary" por defecto, y "default" ha sido eliminado. Esto hace que el botón se acerque a la especificación de Material Design y simplifica la API.

  ```diff
  -<Button color="primary" />
  -<Button color="default" />
  +<Button />
  +<Button />
  ```

### Progreso circular

- The `static` variant has been merged into the `determinate` variant, with the latter assuming the appearance of the former. The removed variant was rarely useful. It was an exception to Material Design, and was removed from the specification.

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

### Divider

- Use border instead of background color. It prevents inconsistent height on scaled screens. For people customizing the color of the border, the change requires changing the override CSS property:

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### ExpansionPanel

- Renombrar los componentes de `ExpansionPanel` a `Accordion` para usar una convención de nomenclatura más común:

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
  -<Accordion onChange={(event: React. ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React. SyntheticEvent, expanded: boolean) => {}} />
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

### Fab

- Rename `round` to `circular` for consistency. Los valores posibles deben ser adjetivos, no sustantivos:

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

- Renombrar prop `justify` con `justifyContent` para estar alineado con el nombre de propiedad CSS.

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
- Use CSS object-fit. For IE11 support either use a polyfill such as https://www.npmjs.com/package/object-fit-images, or continue to use the v4 component.

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

- Remove `onRendered` prop. Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### Pagination

- Rename `round` to `circular` for consistency. Los valores posibles deben ser adjetivos, no sustantivos:

  ```diff
  -<Pagination shape="round">
  +<Pagination shape="circular">
  ```

### PaginationItem

- Rename `round` to `circular` for consistency. Los valores posibles deben ser adjetivos, no sustantivos:

  ```diff
  -<PaginationItem shape="round">
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

### Portal

- Remove `onRendered` prop. Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### Rating

- Mueve el componente del laboratorio al core. El componente ahora es estable.

  ```diff
  -import Rating from '@material-ui/lab/Rating';
  +import Rating from '@material-ui/core/Rating';
  ```

- Change the default empty icon to improve accessibility. If you have a custom `icon` prop but no `emptyIcon` prop, you can restore the previous behavior with:

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

- This component was removed. You can get a reference to the underlying DOM node of our components via `ref` prop. The component relied on [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) which is [deprecated in `React.StrictMode`](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).

  ```diff
  -<RootRef rootRef={ref}>
  -  <Button />
  -</RootRef>
  +<Button ref={ref} />
  ```

### Skeleton

- Mueve el componente del laboratorio al core. El componente ahora es estable.

  ```diff
  -import Skeleton from '@material-ui/lab/Skeleton';
  +import Skeleton from '@material-ui/core/Skeleton';
  ```

- Rename `circle` to `circular` and `rect` to `rectangular` for consistency. Los valores posibles deben ser adjetivos, no sustantivos:

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
  -<Slider onChange={(event: React. ChangeEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
  ```

### Snackbar

- The notification now displays at the bottom left on large screens. This better matches the behavior of Gmail, Google Keep, material.io, etc. You can restore the previous behavior with:

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

### Stepper (Pasos a pasos)

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

- Retire el relleno integrado de 24px.

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

### TablePagination

- The customization of the table pagination's actions labels must be done with the `getItemAriaLabel` prop. This increases consistency with the `Pagination` component.

  ```diff
  <TablePagination
  - backIconButtonText="Avant"
  - nextIconButtonText="Après
  + getItemAriaLabel={…}
  ```

### Pestañas

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Tabs onChange={(event: React. ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
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

- Better isolate the fixed textarea height behavior to the dynamic one. You need to use the `minRows` prop in the following case:

  ```diff
  -<TextField rows={2} maxRows={5} />
  +<TextField minRows={2} maxRows={5} />
  ```

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

  ```diff
  -<TextField rowsMax={6}>
  +<TextField maxRows={6}>
  ```

### TextareaAutosize

- Remove the `rows` prop, use the `minRows` prop instead. This change aims to clarify the behavior of the prop.

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

### Tipografía

- Replace the `srOnly` prop so as to not duplicate the capabilities of [System](https://material-ui.com/system/basics/):

  ```diff
  -import Typography from '@material-ui/core/Typography';
  +import { visuallyHidden } from '@material-ui/system';
  +import styled from 'styled-component';

  +const Span = styled('span')(visuallyHidden);

  -<Typography variant="srOnly">Create a user</Typography>
  +<Span>Create a user</Span>
  ```
