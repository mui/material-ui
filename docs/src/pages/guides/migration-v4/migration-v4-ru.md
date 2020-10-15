# Переход с v4 на v5

<p class="description">Yeah, v5 has been released!</p>

Looking for the v4 docs? [Вы можете найти её здесь](https://material-ui.com/versions/).

> Этот документ пока находится в стадии разработки. Вы обновили свой сайт и столкнулись с чем-то, что здесь не рассматривается? [Добавьте ваши изменения на GitHub](https://github.com/mui-org/material-ui/blob/HEAD/docs/src/pages/guides/migration-v4/migration-v4.md).

## Вступление

This is a reference for upgrading your site from Material-UI v4 to v5. While there's a lot covered here, you probably won't need to do everything for your site. We'll do our best to keep things easy to follow, and as sequential as possible so you can quickly get rocking on v5!

## Why you should migrate

This documentation page covers the _how_ of migrating from v4 to v5. The *why* is covered in the [release blog post on Medium](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701).

## Updating your dependencies

The very first thing you will need to do is to update your dependencies.

### Update Material-UI version

You need to update your `package.json` to use the latest version of Material-UI.

```json
"dependencies": {
  "@material-ui/core": "^5.0.0-alpha.1"
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

The targets of the default bundle have changed. The exact versions will be pinned on release from the browserslist query `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`.

The default bundle now supports:

<!-- #stable-snapshot -->

- Node 10 (up from 8)
- Chrome 83 (up from 49)
- Edge 83 (up from 14)
- Firefox 68 (up from 52)
- Safari 13 (up from 10)
- and more (see [.browserslistrc (`stable` entry)](https://github.com/mui-org/material-ui/blob/HEAD/.browserslistrc#L11))

It no longer supports IE 11. If you need to support IE 11, check out our [legacy bundle](/guides/minimizing-bundle-size/#legacy-bundle).

### non-ref-forwarding class components

Support for non-ref-forwarding class components in the `component` prop or as an immediate `children` has been dropped. If you were using `unstable_createStrictModeTheme` or didn't see any warnings related to `findDOMNode` in `React.StrictMode` then you don't need to do anything. Otherwise check out the ["Caveat with refs" section in our composition guide](/guides/composition/#caveat-with-refs) to find out how to migrate. This change affects almost all components where you're using the `component` prop or passing `children` to components that require `children` to be elements (e.g. `<MenuList><CustomMenuItem /></MenuList>`)

### Темы

- Breakpoints are now treated as values instead of ranges. The behavior of `down(key)` was changed to define media query less than the value defined with the corresponding breakpoint (exclusive). The `between(start, end)` was also updated to define media query for the values between the actual values of start (inclusive) and end (exclusive). When using the `down()` breakpoints utility you need to update the breakpoint key by one step up. When using the `between(start, end)` the end breakpoint should also be updated by one step up. The same should be done when using the `Hidden` component. Find examples of the changes required defined below:

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

#### Upgrade helper

For a smoother transition, the `adaptV4Theme` helper allows you to iteratively upgrade to the new theme structure.

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

- `theme.spacing` now returns single values with px units by default. This change improves the integration with styled-components & emotion.

  Before:

  ```
  theme.spacing(2) => 16
  ```

  After:

  ```
  theme.spacing(2) => '16px'
  ```

- The `theme.palette.text.hint` key was unused in Material-UI components, and has been removed.

```diff
import { createMuiTheme } from '@material-ui/core/styles';

-const theme = createMuiTheme(),
+const theme = createMuiTheme({
+  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
+});
```

```diff
import { createMuiTheme } from '@material-ui/core/styles';

-const theme = createMuiTheme({palette: { type: 'dark' }}),
+const theme = createMuiTheme({
+  palette: { type: 'dark', text: { hint: 'rgba(0, 0, 0, 0.38)' } },
+});
```

- The components' definition inside the theme were restructure under the `components` key, to allow people easier discoverability about the definitions regarding one component.

- The `theme.palette.type` was renamed to `theme.palette.mode`, to better follow the "dark mode" term that is usually used for describing this feature.

```diff
import { createMuiTheme } from '@material-ui/core/styles';

-const theme = createMuiTheme({palette: { type: 'dark' }}),
+const theme = createMuiTheme({palette: { mode: 'dark' }}),
```

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

2. `переопределение`

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

### Стили

- Renamed `fade` to `alpha` to better describe its functionality. The previous name was leading to confusion when the input color already had an alpha value. The helper **overrides** the alpha value of the color.

```diff
- import { fade } from '@material-ui/core/styles';
+ import { alpha } from '@material-ui/core/styles';

const classes = makeStyles(theme => ({
-  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
+  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
}));
```

### Alert

- Перемещаем компонент из lab в core. Компонент теперь стабилен.

  ```diff
  -import Alert from '@material-ui/lab/Alert';
  -import AlertTitle from '@material-ui/lab/AlertTitle';
  +import Alert from '@material-ui/core/Alert';
  +import AlertTitle from '@material-ui/core/AlertTitle';
  ```

### Autocomplete (Автодополнение)

- Перемещаем компонент из lab в core. Компонент теперь стабилен.

  ```diff
  -import Autocomplete from '@material-ui/lab/Autocomplete';
  -import useAutocomplete  from '@material-ui/lab/useAutocomplete';
  +import Autocomplete from '@material-ui/core/Autocomplete';
  +import useAutoComplete from '@material-ui/core/useAutocomplete';
  ```

### Avatar

- Переименовываем `circle` в `circular` для единообразия. The possible values should be adjectives, not nouns:

  ```diff
  -<Avatar variant="circle">
  -<Avatar classes={{ circle: 'className' }}>
  +<Avatar variant="circular">
  +<Avatar classes={{ circular: 'className' }}>
  ```

### Badge

- Переименовываем `circle` в `circular` и `rectangle` в `rectangular` для единообразия. The possible values should be adjectives, not nouns:

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

- TypeScript: тип параметра `event` в `onChange` теперь не `React.ChangeEvent` а `React.SyntheticEvent`.

  ```diff
  -<BottomNavigation onChange={(event: React.ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React.SyntheticEvent) => {}} />
  ```

### Button

- Свойство `color` у кнопки теперь "primary" по умолчанию, а опция "default" удалена. За счет этого кнопка становится ближе к спецификации Material Design, а API становится проще.

  ```diff
  -<Button color="primary" />
  -<Button color="default" />
  +<Button />
  +<Button />
  ```

### Групповой прогресс

- Вариант `static` объединен с вариантом `determinate`, и последний подразумевает внешний вид первого. Удаленный вариант редко был полезен. Это было исключением из Material Design и удалено из спецификации.

  ```diff
  -<CircularProgress variant="determinate" />
  ```

  ```diff
  -<CircularProgress variant="static" classes={{ static: 'className' }} />
  +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  ```

> NB: If you had previously customized determinate, your customizations are probably no longer valid. Please remove them.

### Collapse

- Свойство `collapsedHeight` переименовано в `collapsedSize` для поддержки горизонтального направления.

  ```diff
  -<Collapse collapsedHeight={40}>
  +<Collapse collapsedSize={40}>
  ```

- Ключ `classes.container` был изменен для соответствия соглашениям других компонентов.

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

### Dialog

- Свойства onE\* transition были удалены. Используйте вместо них TransitionProps.

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

- Используем рамку вместо цвета фона. Это предотвращает колебания высоты на масштабированных экранах. Для тех кто настраивает цвет контура, данное изменение требует корректировки переопределения CSS свойства:

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### ExpansionPanel

- Переименовываем компоненты `ExpansionPanel` в `Accordion` для соответствия наиболее распространенным соглашениям:

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

- TypeScript: тип параметра `event` в `onChange` теперь не `React.ChangeEvent` а `React.SyntheticEvent`.

  ```diff
  -<Accordion onChange={(event: React.ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React.SyntheticEvent, expanded: boolean) => {}} />
  ```

- Переименовываем `focused` в `focusVisible` для единообразия:

  ```diff
  <Accordion
    classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
    }}
  />
  ```

- Удаляем `display: flex` из AccordionDetails, так как он навязывает определенный вид компоновки. Most developers expect a display block.
- Удаляем свойство `IconButtonProps` из AccordionSummary. При отрисовке этого компонента вместо IconButton используется элемент `<div>`. Данное свойство больше не требуется.

### Fab

- Переименовываем `round` в `circular` для единообразия. The possible values should be adjectives, not nouns:

  ```diff
  -<Fab variant="round">
  +<Fab variant="circular">
  ```

### Chip

- Переименовываем вариант `default` на `filled` для единообразия.
  ```diff
  -<Chip variant="default">
  +<Chip variant="filled">
  ```

### Grid

- Переименовываем свойство `justify` на `justifyContent` для согласованности с названием CSS свойства.

  ```diff
  -<Grid justify="center">
  +<Grid justifyContent="center">
  ```

### GridList

- Переименовываем компоненты `GridList` на `ImageList` для согласованности с текущими наименованиями  Material Design.
- Переименовываем GridList свойство `spacing` на `gap` для соответствия CSS атрибуту.
- Переименовываем GridList свойство `cellHeight` в `rowHieght`.
- Добавляем в GridList свойство `variant`.
- Переименовываем GridListItemBar свойство `actionPosition`  в `position`. (Обратите внимание, что соответствующее имя класса также изменяется.)
- Используем CSS object-fit. For IE11 support either use a polyfill such as https://www.npmjs.com/package/object-fit-images, or continue to use the v4 component.

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

- Свойства onE\* transition были удалены. Используйте вместо них TransitionProps.

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

- Удаляем свойство `onRendered`. В зависимости от варианта использования либо используйте [обратную ссылку](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) на дочерний элемент либо хук эффекта в дочернем компоненте.

### Pagination

- Перемещаем компонент из lab в core. Компонент теперь стабилен.

  ```diff
  -import Pagination from '@material-ui/lab/Pagination';
  -import PaginationItem from '@material-ui/lab/PaginationItem';
  -import { usePagination } from '@material-ui/lab/Pagination';
  +import Pagination from '@material-ui/core/Pagination';
  +import PaginationItem from '@material-ui/core/PaginationItem';
  +import usePagination from '@material-ui/core/usePagination';
  ```

- Переименовываем `round` в `circular` для единообразия. The possible values should be adjectives, not nouns:

  ```diff
  -<Pagination shape="round">
  -<PaginationItem shape="round">
  +<Pagination shape="circular">
  +<PaginationItem shape="circular">
  ```

### Popover

- Свойства onE\* transition были удалены. Используйте вместо них TransitionProps.

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

- Удаляем свойство `onRendered`. В зависимости от варианта использования либо используйте [обратную ссылку](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) на дочерний элемент либо хук эффекта в дочернем компоненте.

### Rating

- Перемещаем компонент из lab в core. Компонент теперь стабилен.

  ```diff
  -import Rating from '@material-ui/lab/Rating';
  +import Rating from '@material-ui/core/Rating';
  ```

- Чтобы улучшить доступность изменяем используемую по умолчанию пустую иконку. Если у вас есть свой значок (`icon`), но нет пустого значка (`emptyIcon`), вы можете восстановить прежнее поведение с помощью:

  ```diff
  <Rating
    icon={customIcon}
  + emptyIcon={null}
  />
  ```

- Переименовываем `visuallyhidden` в `visuallyHidden` для единообразия:

  ```diff
  <Rating
    classes={{
  -    visuallyhidden: 'custom-visually-hidden-classname',
  +    visuallyHidden: 'custom-visually-hidden-classname',
    }}
  />
  ```

### RootRef

- Этот компонент был удален. Ссылку на лежащий в основе наших компонентов DOM узел вы можете получить через `ref`. Компонент основывался на [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode), использование которого [порицается в `React.StrictMode`](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).

  ```diff
  -<RootRef rootRef={ref}>
  -  <Button />
  -</RootRef>
  +<Button ref={ref} />
  ```

### Skeleton

- Перемещаем компонент из lab в core. Компонент теперь стабилен.

  ```diff
  -import Skeleton from '@material-ui/lab/Skeleton';
  +import Skeleton from '@material-ui/core/Skeleton';
  ```

- Переименовываем `circle` в `circular` и `rect` в `rectangular` для единообразия. The possible values should be adjectives, not nouns:

  ```diff
  -<Skeleton variant="circle" />
  -<Skeleton variant="rect" />
  -<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
  +<Skeleton variant="circular" />
  +<Skeleton variant="rectangular" />
  +<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
  ```

### Slider

- TypeScript: тип параметра `event` в `onChange` теперь не `React.ChangeEvent` а `React.SyntheticEvent`.

  ```diff
  -<Slider onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

### Snackbar

- Уведомление теперь отображается в левом нижнем углу на больших экранах. Это лучше соответствует поведению Gmail, Google Keep, material.io и т.д. Вы можете восстановить прежнее поведение с помощью:

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- Свойства onE\* transition были удалены. Используйте вместо них TransitionProps.

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

- Перемещаем компонент из lab в core. Компонент теперь стабилен.

  ```diff
  -import SpeedDial from '@material-ui/lab/SpeedDial';
  -import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
  -import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
  +import SpeedDial from '@material-ui/core/SpeedDial';
  +import SpeedDialAction from '@material-ui/core/SpeedDialAction';
  +import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
  ```

### Stepper

- Корневой компонент (Paper) заменен на div. Свойство elevation удалено и Stepper больше не наследует свойста от Paper. Это изменение рассчитано на поощрение композиции.

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

- Удаляем встроенные отступы(padding) 24px.

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

### Table (tаблица)

- Настройка ярлыков кнопок постраничной разбивки должна осуществляться с помощью свойства `getItemAriaLabel`. За счет этого улучшается сопоставимость с компонентом `Pagination`.

  ```diff
  <TablePagination
  - backIconButtonText="Предыдущая"
  - nextIconButtonText="Следующая"
  + getItemAriaLabel={…}
  ```

- Переименовываем `onChangeRowsPerPage` на `onRowsPerPageChange` и `onChangePage` на `onPageChange` для сопоставимоти с API.

  ```diff
  <TablePagination
  - onChangeRowsPerPage={()=>{}}
  - onChangePage={()=>{}}
  + onRowsPerPageChange={()=>{}}
  + onPageChange={()=>{}}
  ```

### Вкладки

- TypeScript: тип параметра `event` в `onChange` теперь не `React.ChangeEvent` а `React.SyntheticEvent`.

  ```diff
  -<Tabs onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

- Управляющее кнопками прокрутки API разделено на два параметра.

  - Параметр `scrollButtons` управляет видимостью кнопок в зависимоти от доступного пространства.
  - Параметр `allowScrollButtonsMobile` удаляет медиа-запрос CSS, который систематически скрывает кнопки прокрутки на мобильных устройствах.

  ```diff
  -<Tabs scrollButtons="on" />
  -<Tabs scrollButtons="desktop" />
  -<Tabs scrollButtons="off" />
  +<Tabs scrollButtons allowScrollButtonsMobile />
  +<Tabs scrollButtons />
  +<Tabs scrollButtons={false} />
  ```

### TextField

- Улучшаем определение поведения - когда используется textarea фиксированной высоты, а когда textarea c динамической высотой. Вам нужно использовать параметр `minRows` в следующем случае:

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

- Удаляем свойство `rows` и используем вместо него `minRows`. Цель этого изменения - сделать поведение свойства более понятным.

  ```diff
  -<TextareaAutosize rows={2} />
  +<TextareaAutosize minRows={2} />
  ```

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

  ```diff
  -<TextareAutosize rowsMax={6}>
  +<TextareAutosize maxRows={6}>
  ```

- Переименовываем свойство `rowsMin` на `minRows` для соответствия HTML атрибутам.

  ```diff
  -<TextareAutosize rowsMin={1}>
  +<TextareAutosize minRows={1}>
  ```

### ToggleButton

- Перемещаем компонент из lab в core. Компонент теперь стабилен.

  ```diff
  -import ToggleButton from '@material-ui/lab/ToggleButton';
  -import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
  +import ToggleButton from '@material-ui/core/ToggleButton';
  +import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
  ```

### Tooltip

- Подсказки теперь интерактивны по умолчанию.

  Прежнее подразумеваемое по умолчанию поведение не удовлетворяет требованию [success criterion 1.4.3 ("hoverable") в WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus). Чтобы отразить новое значение по умолчанию, прежнее свойство переименовано на `disableInteractive`. Если вы хотите восстановить прежнее поведение (лишившись при этом уровня АА), вы можете применить следующие изменения:

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>

  # Интерактивные подсказки больше не нуждаются в свойстве `interactive`.
  -<Tooltip interactive>
  +<Tooltip>
  ```

### Оформление текста

- Заменяем свойство `srOnly`, чтобы не дублировать возможности [System](https://material-ui.com/system/basics/):

  ```diff
  -import Typography from '@material-ui/core/Typography';
  +import { visuallyHidden } from '@material-ui/system';
  +import styled from 'styled-component';

  +const Span = styled('span')(visuallyHidden);

  -<Typography variant="srOnly">Create a user</Typography>
  +<Span>Create a user</Span>
  ```
