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

Você precisa atualizar seu `package.json` para usar a versão mais recente do Material-UI e suas dependências de pares.

```json
"dependencies": {
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "@material-ui/core": "^5.0.0"
}
```

Ou execute

```sh
npm install @material-ui/core@next @emotion/react @emotion/styled

ou

yarn add @material-ui/core@next @emotion/react @emotion/styled
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

### Styled engine

The styled engine used in v5 by default is [`emotion`](https://github.com/emotion-js/emotion). While migration from JSS to emotion, if you are using JSS style overrides for your components (for example overrides created by `makeStyles`), you need to take care of the CSS injection order. In order to do this, you need to have on the top of your application the `StylesProvider` with the `injectFirst` option. Here is an example of it:

```jsx
Agora você pode sobrescrever os estilos do Material-UI. import * as React from 'react';
import { StylesProvider } from '@material-ui/core';

export default function GlobalCssPriority() {
  return (
    <StylesProvider injectFirst>
      {/* Your component tree. */}
    </StylesProvider>
  );
}
```

**Note:** If you are using emotion and have a custom cache in your app, that one will override the one coming from Material-UI. In order for the injection order to still be correct, you need to add the prepend option. Aqui está um exemplo:

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function PlainCssPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. import * as React from 'react';
import { StylesProvider } from '@material-ui/core';

export default function GlobalCssPriority() {
  return (
    <StylesProvider injectFirst>
      {/* Your component tree. */}
    </CacheProvider>
  );
}
```

**Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@material-ui/styled-engine-sc` package.

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

### Sistema

- The following system functions (and properties) were renamed, because they are considered deprecated CSS:

1. `gridGap` to `gap`
2. `gridColumnGap` to `columnGap`
3. `gridRowGap` to `rowGap`

### Componentes do core

As the core components use emotion as a styled engine, the props used by emotion are not intercepted. The prop `as` in the following codesnippet will not be propagated to the `SomeOtherComponent`.

`<MuiComponent component={SomeOtherComponent} as="button" />`

### Uma barra de aplicativos proeminente.

- [AppBar] Remova z-index quando a posição for estática e relativa

### Alerta

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Alert from '@material-ui/lab/Alert';
  -import AlertTitle from '@material-ui/lab/AlertTitle';
  +import Alert from '@material-ui/core/Alert';
  +import AlertTitle from '@material-ui/core/AlertTitle';
  ```

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

### Autocompletar

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Autocomplete from '@material-ui/lab/Autocomplete';
  -import useAutocomplete  from '@material-ui/lab/useAutocomplete';
  +import Autocomplete from '@material-ui/core/Autocomplete';
  +import useAutoComplete from '@material-ui/core/useAutocomplete';
  ```

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

- Remova a propriedade `debug`. Existem algumas alternativas mais simples: `open={true}`, Chrome devtools ["Emulate focused"](https://twitter.com/sulco/status/1305841873945272321), ou React devtools prop setter.
- `renderOption` deve agora retornar uma estrutura completa do DOM da opção. Isso torna as customizações mais fáceis. Você pode aplicar a alteração com:

  ```diff
  <Autocomplete
  - renderOption={(option, { selected }) => (
  -   <React. Fragment>
  + renderOption={(props, option, { selected }) => (
  +   <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option.title}
  -   </React.
  ```

- Renomeie a propriedade `closeIcon` com `clearIcon` para evitar confusão.

  ```diff
  -<Autocomplete closeIcon={defaultClearIcon} />
  +<Autocomplete clearIcon={defaultClearIcon} />
  ```

### Avatar

- Renomeie `circle` para `circular` por uma questão de consistência. Os valores possíveis devem ser adjetivos e não substantivos:

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

- Renomeie `circle` para `circular` e `rectangle` para `rectangular` por uma questão de consistência. Os valores possíveis devem ser adjetivos e não substantivos:

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

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

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

  [Este codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#box-sx-prop) atualizará automaticamente seu código para a nova sintaxe. You can [read this section](/system/basics/#api-tradeoff) for the why behind the change of API.

- O valor de transformação da propriedade de sistema `borderRadius` foi alterado. Se ele receber um número, ele multiplica esse valor pelo valor de `theme.shape.borderRadius`. Use uma string para fornecer um valor explícito, em `px`.

  ```diff
  -<Box sx={{ borderRadius: 'borderRadius' }}>
  +<Box sx={{ borderRadius: 1 }}>
  ```

  ```diff
  -<Box sx={{ borderRadius: 16 }}>
  +<Box sx={{ borderRadius: '16px' }}>
  ```

- The following properties were renamed, because they are considered deprecated CSS proeprties:

1. `gridGap` to `gap`
2. `gridColumnGap` to `columnGap`
3. `gridRowGap` to `rowGap`

```diff
-<Box gridGap="10px">
+<Box sx={{ gap: '10px' }}>
```

```diff
-<Box gridColumnGap="10px" gridRowGap="20px">
+<Box sx={{ columnGap: '10px', rowGap: '20px' }}>
```

### Button

- A propriedade  `color` do botão agora é "primary" por padrão, e "default" foi removido. Isto torna o botão mais próximo da especificação do Material Design e simplifica a API.

  ```diff
  -<Button color="primary" />
  -<Button color="default" />
  +<Button />
  +<Button />
  ```

### Chip

- Renomeie a variante `default` para `filled` por uma questão de consistência.
  ```diff
  -<Chip variant="default">
  +<Chip variant="filled">
  ```

### Conjunto de progressos

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

- A chave `classes.container` foi alterada para corresponder à convenção dos outros componentes.

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

###  CssBaseline

- The component was migrated to use the `@material-ui/styled-engine` (`emotion` or `styled-components`) instead of `jss`. You should remove the `@global` key when defining the style overrides for it.

  ```diff
  const theme = createMuiTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
  -       '@global': {
            html: {
              WebkitFontSmoothing: 'auto',
            },
  -       },
        },
      },
    },
  });
  ```

- The `body` font size has changed from `theme.typography.body2` (`0.875rem`) to `theme.typography.body1` (`1rem`). To return to the previous size, you can override it in the theme:

  ```js
  const theme = createMuiTheme({
    typography: {
      body1: {
        fontSize: '0.875rem',
      },
    },
  });
  ```

  (Note that this will also affect use of the Typography component with the default `body1` variant).

### Dialog

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

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

- Remova a propriedade `disableBackdropClick` devido a redundância. Em vez disso, ignore eventos de close em `onClose` quando `reason === 'backdropClick'`.

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

- [withMobileDialog] Remova este componente de ordem superior. A hook API permite uma solução mais simples e flexível:

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

- Use cor de borda em vez de cor de fundo. Ela impede a altura inconsistente em telas redimensionadas. Para pessoas personalizando a cor da borda, a alteração requer alterar a propriedade CSS com sobrescrita:

  ```diff
  . MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### Painel de expansão

- Renomeie os componentes `ExpansionPanel` para `Accordion` para usar uma convenção de nome mais comum:

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

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  -<Accordion onChange={(event: React. ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React. SyntheticEvent, expanded: boolean) => {}} />
  ```

- Renomeie `focused` para `focusVisible` por uma questão de consistência:

  ```diff
  <Accordion
    classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
    }}
  />
  ```

- Remova `display: flex` de AccordionDetails, é muito opinativo. A maioria dos desenvolvedores espera uma exibição em bloco.
- Remova a propriedade `IconButtonProps` de AccordionSummary. O componente renderiza um elemento `<div>` em vez de um IconButton. A propriedade não é mais necessária.

### Fab

- Renomeie `round` para `circular` por uma questão de consistência. Os valores possíveis devem ser adjetivos e não substantivos:

  ```diff
  -<Fab variant="round">
  +<Fab variant="circular">
  ```

### Grid

- Renomeie a propriedade `justify` para `justifyContent` para ter conformidade com o nome da propriedade CSS.

  ```diff
  -<Grid justify="center">
  +<Grid justifyContent="center">
  ```

### GridList

- Renomeie os componentes `GridList` para `ImageList` para entrar em conformidade com o nome atual do componente no Material Design.
- Renomeie no GridList a propriedade  `spacing` para  `gap` para ter conformidade com o atributo CSS.
- Renomeie no GridList a propriedade `cellHeight` para `rowHieght`.
- Adicione a propriedade `variant` para o GridList.
- Renomeie no GridListItemBar a propriedade `actionPosition` para `position`. (Observe também as alterações de nome de classe relacionadas.)
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

### Icon

- The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikey event that you were using the value `default`, the prop can be removed:

  ```diff
  -<Icon fontSize="default">icon-name</Icon>
  +<Icon>icon-name</Icon>
  ```

### Menu

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

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

- Remova a propriedade `disableBackdropClick` devido a redundância. Em vez disso, ignore eventos de close em `onClose` quando `reason === 'backdropClick'`.

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

- Remova a propriedade `onEscapeKeyDown` devido a redundância. Em vez disso, use `onClose` com `reason === "escapeKeyDown"`.

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

- Remova a propriedade `onRendered`. Dependendo da sua situação de uso,  use um [ref com callback](https://pt-br.reactjs.org/docs/refs-and-the-dom.html#callback-refs) no elemento filho ou um hook de efeito no componente filho.

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

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

- Renomeie `round` para `circular` por uma questão de consistência. Os valores possíveis devem ser adjetivos e não substantivos:

  ```diff
  -<Pagination shape="round">
  -<PaginationItem shape="round">
  +<Pagination shape="circular">
  +<PaginationItem shape="circular">
  ```

### Popover

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

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

- Atualize [Popper.js](https://github.com/popperjs/popper-core) da v1 para v2. Esta biblioteca de terceiros introduziu muitas mudanças.<br /> Você pode ler [seu guia de migração](https://popper.js.org/docs/v2/migration-guide/) ou o seguinte resumo:

  - Os prefixos CSS mudaram:
    ```diff
    popper: {
      zIndex: 1,
    - '&[x-placement*="bottom"] $arrow': {
    + '&[data-popper-placement*="bottom"] $arrow': {
    ```
  - Nomes de métodos alterados.

    ```diff
    -popperRef.current.scheduleUpdate()
    +popperRef.current.update()
    ```

    ```diff
    -popperRef.current.update()
    +popperRef.current.forceUpdate()
    ```

  - A API dos modificadores mudou muito. Há demasiadas alterações para serem cobertas neste guia.

### Portal

- Remova a propriedade `onRendered`. Dependendo da sua situação de uso,  use um [ref com callback](https://pt-br.reactjs.org/docs/refs-and-the-dom.html#callback-refs) no elemento filho ou um hook de efeito no componente filho.

### Rating

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Rating from '@material-ui/lab/Rating';
  +import Rating from '@material-ui/core/Rating';
  ```

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

- Altere o ícone padrão de vazio para melhorar a acessibilidade. Se você tiver uma propriedade `icon` customizada e não a propriedade `emptyIcon`, você pode reproduzir o comportamento anterior com:

  ```diff
  <Rating
    icon={customIcon}
  + emptyIcon={null}
  />
  ```

- Renomeie `visuallyhidden` para `visuallyHidden` por uma questão de consistência:

  ```diff
  <Rating
    classes={{
  -    visuallyhidden: 'custom-visually-hidden-classname',
  +    visuallyHidden: 'custom-visually-hidden-classname',
    }}
  />
  ```

### RootRef

- Este componente foi removido. Você pode obter uma referência para o nó DOM subjacente dos nossos componentes através da propriedade  `ref`. The component relied on [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) which isdeprecated in `React.

  ```diff
  -<RootRef rootRef={ref}>
  -  <Button />
  -</RootRef>
  +<Button ref={ref} />
  ```

### Skeleton

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Skeleton from '@material-ui/lab/Skeleton';
  +import Skeleton from '@material-ui/core/Skeleton';
  ```

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

- Renomeie `circle` para `circular` e `rect` para `rectangular` por uma questão de consistência. Os valores possíveis devem ser adjetivos e não substantivos:

  ```diff
  -<Skeleton variant="circle" />
  -<Skeleton variant="rect" />
  -<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
  +<Skeleton variant="circular" />
  +<Skeleton variant="rectangular" />
  +<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
  ```

### Slider

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  -<Slider onChange={(event: React. ChangeEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
  ```

- A propriedade `ValueLabelComponent` agora faz parte da propriedade `components`.

  ```diff
  -<Slider ValueLabelComponent={CustomValueLabel} />
  +<Slider components={{ ValueLabel: CustomValueLabel }} />
  ```

- A propriedade `ThumbComponent` agora faz parte da propriedade `components`.

  ```diff
  -<Slider ThumbComponent={CustomThumb} />
  +<Slider components={{ Thumb: CustomThumb }} />
  ```

### Snackbar

- A notificação agora é exibida na parte inferior esquerda em telas grandes. This better matches the behavior of Gmail, Google Keep, material.io, etc. You can restore the previous behavior with: Você pode reproduzir o comportamento anterior com: Você pode reproduzir o comportamento anterior com:

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

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

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

### Assistente

- O componente raiz (Paper) foi substituído por um div. Stepper não tem mais elevação, nem herda as propriedades de Paper. Esta alteração destina-se a incentivar a composição.

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

- Remova o padding automático de 24px.

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

### SvgIcon

- The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikey event that you were using the value `default`, the prop can be removed:

  ```diff
  -<SvgIcon fontSize="default">
  +<SvgIcon>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
  ```

### Table

- A customização dos rótulos das ações da paginação da tabela deve ser feita com a propriedade `getItemAriaLabel`. Isso aumenta a consistência com o componente `Paginação`.

  ```diff
  <TablePagination
  - backIconButtonText="Avant"
  - nextIconButtonText="Après
  + getItemAriaLabel={…}
  ```

- Renomeie `onChangeRowsPerPage` para `onRowsPerPageChange` e `onChangePage` para `onPageChange` por questões de consistência da API.

  ```diff
  <TablePagination
  - onChangeRowsPerPage={()=>{}}
  - onChangePage={()=>{}}
  + onRowsPerPageChange={()=>{}}
  + onPageChange={()=>{}}
  ```

### Abas

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  -<Tabs onChange={(event: React. ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
  ```

- A API que controla os botões de rolagem foi dividida em duas propriedades.

  - A propriedade `scrollButtons` controla quando os botões de rolagem são exibidos dependendo do espaço disponível.
  - A propriedade `allowScrollButtonsMobile` remove a consulta de mídia CSS que oculta sistematicamente os botões de rolagem no celular.

  ```diff
  -<Tabs scrollButtons="on" />
  -<Tabs scrollButtons="desktop" />
  -<Tabs scrollButtons="off" />
  +<Tabs scrollButtons allowScrollButtonsMobile />
  +<Tabs scrollButtons />
  +<Tabs scrollButtons={false} />
  ```

### TextField

- Altere a variante padrão de `standard` para `outlined`. O padrão foi removido da Diretrizes do Material Design.

  ```diff
  -<TextField value="Standard" />
  -<TextField value="Outlined" variant="outlined" />
  +<TextField value="Standard" variant="standard" />
  +<TextField value="Outlined" />
  ```

Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

- Renomeie a propriedade `rowsMax` para `maxRows` por questão de consistência com atributos HTML.

  ```diff
  -<TextField rowsMax={6}>
  +<TextField maxRows={6}>
  ```

- Melhor isolar o comportamento fixo de altura do textarea para o dinâmico. Você precisa usar a propriedade `minRows` da seguinte forma:

  ```diff
  -<TextField rows={2} maxRows={5} />
  +<TextField minRows={2} maxRows={5} />
  ```

- Altere o que é esperado no encaminhamento de ref no componente customizado `inputComponent`. O componente deve encaminhar a propriedade `ref` em vez da propriedade `inputRef`.

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

- Renomeie as classes `marginDense` e `inputMarginDense` para `sizeSmall` e `inputSizeSmall` para corresponder com a propriedade.

  ```diff
  -<Input margin="dense" />
  +<Input size="small" />
  ```

### TextareaAutosize

- Remova a propriedade `rows`, use `minRows` em vez disso. Esta alteração visa esclarecer o comportamento da propriedade.

  ```diff
  -<TextareaAutosize rows={2} />
  +<TextareaAutosize minRows={2} />
  ```

- Renomeie a propriedade `rowsMax` para `maxRows` por questão de consistência com atributos HTML.

  ```diff
  -<TextareAutosize rowsMax={6}>
  +<TextareAutosize maxRows={6}>
  ```

- Renomeie a propriedade `rowsMin` para `minRows` por questão de consistência com atributos HTML.

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

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

### Tooltip

- Dicas agora estão interativas por padrão.

  O comportamento padrão anterior era falho, como mostra neste artigo, [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus). Para refletir o novo valor padrão, a propriedade foi renomeada para `disableInteractive`. Se você quiser reproduzir o comportamento antigo (portanto não chegando ao nível AA), você pode aplicar a seguinte alteração:

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>

  #Dicas interativas não precisam mais da propriedade `interactive`.
  -<Tooltip interactive>
  +<Tooltip>
  ```

### Tipografia

- Substitua a propriedade `srOnly` para não duplicar as capacidades do  [Sistema](https://material-ui.com/system/basics/):

  ```diff
  -import Typography from '@material-ui/core/Typography';
  +import { visuallyHidden } from '@material-ui/system';
  +import styled from 'styled-component';

  +const Span = styled('span')(visuallyHidden);

  -<Typography variant="srOnly">Create a user</Typography>
  +<Span>Create a user</Span>
  ```

### Sistema

- Substitua a propriedade `css` para `sx` para evitar a colisão com as propriedades CSS de styled-components & emotion.

```diff
-<Box css={{ color: 'primary.main' }} />
+<Box sx={{ color: 'primary.main' }} />
```
