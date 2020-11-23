# Migrando da v4 para v5

<p class="description">Sim, v5 foi lançada!</p>

Procurando pelos documentos da v4? [Encontre-os aqui](https://material-ui.com/versions/).

> Este documento está em constante evolução. Você atualizou seu site e encontrou algo que não é abordado aqui? [Adicione suas alterações no GitHub](https://github.com/mui-org/material-ui/blob/HEAD/docs/src/pages/guides/migration-v4/migration-v4.md).

## Introdução

Esta é uma referência para atualizar seu site de Material-UI v4 para v5. Embora haja muita coisa coberta por aqui, você provavelmente não precisará fazer tudo no seu site. Faremos o nosso melhor para manter as coisas fáceis de seguir e tão sequenciais quanto possível, para que você possa rapidamente agitar na v5!

## Por que você deve migrar

Esta página de documentação cobre o _como_ migrar da v4 para a v5. O *por que* é abordado na [postagem no blog do Medium](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701).

## Atualizando suas dependências

A primeira coisa que você precisa fazer é atualizar suas dependências.

### Atualize a versão do Material-UI

Você precisa atualizar seu `package.json` para usar a versão mais recente do Material-UI.

```json
"dependencies": {
  "@material-ui/core": "^5.0.0"
}
```

Ou execute

```sh
npm install @material-ui/core@next

ou

yarn add @material-ui/core@next
```

## Tratamento de alterações recentes

### Suporte de navegadores e versões de node

Os indicativos de suporte do pacote padrão foram alterados. As versões exatas do suporte serão fixadas na consulta browserslist `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`.

O pacote padrão agora suporta:

<!-- #stable-snapshot -->

- Node 10 (antes era 8)
- Chrome 84 (antes era 49)
- Edge 85 (antes 14)
- Firefox 78 (antes era 52)
- Safari 13 (macOS) e 12.2 (iOS) (antes era 10)
- para maiores detalhes (veja [.browserslistrc (seção `stable`)](https://github.com/mui-org/material-ui/blob/HEAD/.browserslistrc#L11))

Não há mais o suporte para o IE 11. Se você precisar do suporte para o IE 11, confira nosso [pacote legado](/guides/minimizing-bundle-size/#legacy-bundle).

### Componentes de classe sem o encaminhamento de refs

O suporte para componentes de classe, sem o encaminhamento de refs, na propriedade `component` ou como um elemento `children` imediato foi removido. Se você estava usando `unstable_createStrictModeTheme` ou não recebeu quaisquer avisos relacionados a `findDOMNode` no `React. StrictMode`, então você não precisa fazer nada. Caso contrário, confira a seção ["Advertência com refs" em nosso guia de composição](/guides/composition/#caveat-with-refs) para descobrir como migrar. Esta alteração afeta quase todos os componentes no qual você está usando a propriedade `component` ou passando diretamente um  `children` para componentes que requerem `children` como elemento (ou seja, `<MenuList><CustomMenuItem /></MenuList>`)

### Tema

- Pontos de quebra agora são tratados como valores, em vez de intervalos. O comportamento de `down(key)` foi modificado para definir uma consulta de mídia menor do que o valor definido como ponto de quebra correspondente (de forma exclusiva). O `between(start, end)` também foi atualizado para definir uma consulta de mídia para os valores reais entre o início (de forma inclusiva) e fim (de forma exclusiva). Ao usar o utilitário de pontos de quebra `down()`, você precisa atualizar a chave de ponto de quebra em um passo. Ao usar o `between(start, end)`, o ponto de quebra de fim também deve ser atualizado em um passo. O mesmo deve ser feito ao usar o componente `Hidden`. Observe exemplos das definições de mudanças necessárias abaixo:

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

- A assinatura do utilitário `theme.palette.augmentColor` foi alterada:

  ```diff
  -theme.palette.augmentColor(red);
  +theme.palette.augmentColor({ color: red, name: 'brand' });
  ```

#### Utilitário para atualização

Para uma transição mais suave, o utilitário `adaptV4Theme` permite que você atualize de forma iterativa algumas das alterações do tema para a nova estrutura do tema.

```diff
-import { createMuiTheme } from '@material-ui/core/styles';
+import { createMuiTheme, adaptV4Theme } from '@material-ui/core/styles';

-const theme = createMuiTheme({
+const theme = createMuiTheme(adaptV4Theme({
  // v4 theme
-});
+}));
```

As seguintes alterações são aplicadas por este utilitário adaptador.

#### Alterações

- A abstração com a função "gutters" não provou ser utilizada com frequência suficiente para ser valiosa.

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]: {
  +  paddingLeft: theme.spacing(3),
  +  paddingRight: theme.spacing(3),
  +},
  ```

- `theme.spacing` agora retorna valores únicos com a unidade px por padrão. Esta alteração melhora a integração com styled-components & emotion.

  Antes:

  ```js
  theme.spacing(2) => 16
  ```

  Depois:

  ```js
  theme.spacing(2) => '16px'
  ```

- O `theme.palette.type` foi renomeado para `theme.palette.mode`, para melhor seguir o termo "modo escuro",  que é geralmente usado para descrever este recurso.

  ```diff
  import { createMuiTheme } from '@material-ui/core/styles';
  -const theme = createMuiTheme({palette: { type: 'dark' }}),
  +const theme = createMuiTheme({palette: { mode: 'dark' }}),
  ```

- A chave `theme.palette.text.hint` não era usada em componentes do Material-UI e foi removida. Se você depende dela, você pode adicioná-la de volta:

  ```diff
  import { createMuiTheme } from '@material-ui/core/styles';

  -const theme = createMuiTheme(),
  +const theme = createMuiTheme({
  +  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
  +});
  ```

- As definições dos componentes dentro do tema foi reestruturada sob a chave  `components`, para permitir que as pessoas possam descobrir de uma maneira facilitada as definições sobre um componente.

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

2. `sobrescrevendo`

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

### Estilos

- Renomeado `fade` para `alpha` para descrever melhor a sua funcionalidade. O nome anterior estava gerando confusão quando a cor de entrada já tinha um valor alfa. O utilitário **sobrescreve** o valor alfa da cor.

```diff
- import { fade } from '@material-ui/core/styles';
+ import { alpha } from '@material-ui/core/styles';

const classes = makeStyles(theme => ({
-  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
+  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
}));
```

### AppBar

- [AppBar] Remova z-index quando a posição for estática e relativa

### Alerta

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Alert from '@material-ui/lab/Alert';
  -import AlertTitle from '@material-ui/lab/AlertTitle';
  +import Alert from '@material-ui/core/Alert';
  +import AlertTitle from '@material-ui/core/AlertTitle';
  ```

  You can use the [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

### Autocompletar

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Autocomplete from '@material-ui/lab/Autocomplete';
  -import useAutocomplete  from '@material-ui/lab/useAutocomplete';
  +import Autocomplete from '@material-ui/core/Autocomplete';
  +import useAutoComplete from '@material-ui/core/useAutocomplete';
  ```

  You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

- Remova a propriedade `debug`. Existem algumas alternativas mais simples: `open={true}`, Chrome devtools ["Emulate focused"](https://twitter.com/sulco/status/1305841873945272321), ou React devtools prop setter.
- `renderOption` deve agora retornar uma estrutura completa do DOM da opção. Isso torna as customizações mais fáceis. Você pode aplicar a alteração com:

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

- Renomeie `circle` para `circular` para obter consistência. Os valores possíveis devem ser adjetivos e não substantivos:

  ```diff
  -<Avatar variant="circle">
  -<Avatar classes={{ circle: 'className' }}>
  +<Avatar variant="circular">
  +<Avatar classes={{ circular: 'className' }}>
  ```

- Mova o componente AvatarGroup do lab para o core.

  ```diff
  -import AvatarGroup from '@material-ui/lab/AvatarGroup';
  +import AvatarGroup from '@material-ui/core/AvatarGroup';
  ```

### Badge

- Renomeie `circle` para `circular` e `rectangle` para`rectangular` para obter consistência. Os valores possíveis devem ser adjetivos e não substantivos:

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

- TypeScript: O `event` em `onChange` não é mais tipado como `React.ChangeEvent`, mas sim em `React.SyntheticEvent`.

  ```diff
  -<BottomNavigation onChange={(event: React. ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React. SyntheticEvent) => {}} />
  ```

### Box

- As propriedades de sistema foram descontinuadas na v5, e substituídas pela propriedade `sx`.

```diff
-<Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
+<Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
```

[Este codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#box-sx-prop) atualizará automaticamente seu código para a nova sintaxe.

### Button

- A propriedade  `color` do botão agora é "primary" por padrão, e "default" foi removido. Isto torna o botão mais próximo da especificação do Material Design e simplifica a API.

  ```diff
  -<Button color="primary" />
  -<Button color="default" />
  +<Button />
  +<Button />
  ```

### CircularProgress

- A variante `static` foi mesclada na variante `determinate`, assumindo a última a aparência da primeira. A variante removida raramente foi útil. Era uma exceção para Material Design, e foi removida da especificação.

  ```diff
  -<CircularProgress variant="determinate" />
  ```

  ```diff
  -<CircularProgress variant="static" classes={{ static: 'className' }} />
  +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  ```

> NB: Se você já tinha customizado como "determinate", suas customizações provavelmente não são mais válidas. Por favor, remova-as.

### Collapse

- A propriedade `collapsedHeight` foi renomeada para `collapsedSize` para dar suporte para a direção horizontal.

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

- Remove the `disableBackdropClick` prop because redundant. Ignore close events from `onClose` when `reason === 'backdropClick'` instead.

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
  . MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### Painel de expansão

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

- TypeScript: O `event` em `onChange` não é mais tipado como `React.ChangeEvent`, mas sim em `React.SyntheticEvent`.

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

- Remove `display: flex` from AccordionDetails as its too opinionated. Most developers expect a display block.
- Remove `IconButtonProps` prop from AccordionSummary. The component renders a `<div>` element instead of an IconButton. The prop is no longer necessary.

### Fab

- Rename `round` to `circular` for consistency. Os valores possíveis devem ser adjetivos e não substantivos:

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

- Remove the `disableBackdropClick` prop because redundant. Ignore close events from `onClose` when `reason === 'backdropClick'` instead.

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

- Remove the `onEscapeKeyDown` prop because redundant. Use `onClose` with `reason === "escapeKeyDown"` instead.

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

- Remove `onRendered` prop. Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### Paginação

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Pagination from '@material-ui/lab/Pagination';
  -import PaginationItem from '@material-ui/lab/PaginationItem';
  -import { usePagination } from '@material-ui/lab/Pagination';
  +import Pagination from '@material-ui/core/Pagination';
  +import PaginationItem from '@material-ui/core/PaginationItem';
  +import usePagination from '@material-ui/core/usePagination';
  ```

  You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

- Rename `round` to `circular` for consistency. Os valores possíveis devem ser adjetivos e não substantivos:

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

- Upgrade [Popper.js](https://github.com/popperjs/popper-core) from v1 to v2. This third-party library has introduced a lot of changes.<br /> You can read [their migration guide](https://popper.js.org/docs/v2/migration-guide/) or the following summary:

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

- Remove `onRendered` prop. Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### Rating

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Rating from '@material-ui/lab/Rating';
  +import Rating from '@material-ui/core/Rating';
  ```

  You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

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

- This component was removed. You can get a reference to the underlying DOM node of our components via `ref` prop. The component relied on [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) which isdeprecated in `React.
<pre><code class="diff">  -<RootRef rootRef={ref}>
  -  <Button />
  -</RootRef>
  +<Button ref={ref} />
`</pre></li> </ul> 
  
  

### Skeleton

- Mova o componente do lab para o core. O componente agora é estável. 
  
  

  ```diff
  -import Skeleton from '@material-ui/lab/Skeleton';
  +import Skeleton from '@material-ui/core/Skeleton';
  ```


You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.

- Rename `circle` to `circular` and `rect` to `rectangular` for consistency. Os valores possíveis devem ser adjetivos e não substantivos: 
  
  

  ```diff
  -<Skeleton variant="circle" />
  -<Skeleton variant="rect" />
  -<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
  +<Skeleton variant="circular" />
  +<Skeleton variant="rectangular" />
  +<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
  ```




### Slider

- TypeScript: O `event` em `onChange` não é mais tipado como `React.ChangeEvent`, mas sim em `React.SyntheticEvent`. 
  
  

  ```diff
  -<Slider onChange={(event: React. ChangeEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
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

- The notification now displays at the bottom left on large screens. This better matches the behavior of Gmail, Google Keep, material.io, etc. You can restore the previous behavior with: You can restore the previous behavior with: 
  
  

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

- Mova o componente do lab para o core. O componente agora é estável. 
  
  

  ```diff
  -import SpeedDial from '@material-ui/lab/SpeedDial';
  -import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
  -import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
  +import SpeedDial from '@material-ui/core/SpeedDial';
  +import SpeedDialAction from '@material-ui/core/SpeedDialAction';
  +import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
  ```


You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.



### Assistente

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

- The customization of the table pagination's actions labels must be done with the `getItemAriaLabel` prop. Isso aumenta a consistência com o componente `Paginação`. 
  
  

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




### Abas

- TypeScript: O `event` em `onChange` não é mais tipado como `React.ChangeEvent`, mas sim em `React.SyntheticEvent`. 
  
  

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


- Better isolate the fixed textarea height behavior to the dynamic one. You need to use the `minRows` prop in the following case: 
  
  

  ```diff
  -<TextField rows={2} maxRows={5} />
  +<TextField minRows={2} maxRows={5} />
  ```


- Change ref forwarding expections on custom `inputComponent`. The component should forward the `ref` prop instead of the `inputRef` prop. 
  
  

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




### ToggleButton

- Mova o componente do lab para o core. O componente agora é estável. 
  
  

  ```diff
  -import ToggleButton from '@material-ui/lab/ToggleButton';
  -import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
  +import ToggleButton from '@material-ui/core/ToggleButton';
  +import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
  ```


You can use our [`moved-lab-modules` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) for automatic migration.



### Tooltip

- Tooltips are now interactive by default.
  
  The previous default behavior failed [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus). To reflect the new default value, the prop was renamed to `disableInteractive`. If you want to restore the old behavior (thus not reaching level AA), you can apply the following diff: 
  
  

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>

  # Interactive tooltips no longer need the `interactive` prop.
  -<Tooltip interactive>
  +<Tooltip>
  ```




### Tipografia

- Replace the `srOnly` prop so as to not duplicate the capabilities of [System](https://material-ui.com/system/basics/): 
  

  ```diff
  -import Typography from '@material-ui/core/Typography';
  +import { visuallyHidden } from '@material-ui/system';
  +import styled from 'styled-component';

  +const Span = styled('span')(visuallyHidden);

  -<Typography variant="srOnly">Create a user</Typography>
  +<Span>Create a user</Span>
  ```




### Sistema

- Replace `css` prop with `sx` to avoid collision with styled-components & emotion CSS props.



```diff
-<Box css={{ color: 'primary.main' }} />
+<Box sx={{ color: 'primary.main' }} />
```
