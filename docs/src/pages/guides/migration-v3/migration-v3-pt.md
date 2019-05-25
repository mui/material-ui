# Migrando da v3 para v4

<p class="description">Sim, v4 alpha foi liberada!</p>

Procurando pelos documentos da v3? [Encontre-os aqui](https://material-ui.com/versions/).

> Este documento é um trabalho em progresso. Você atualizou seu site e encontrou algo que não é abordado aqui? [Adicione suas alterações no GitHub](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/guides/migration-v3/migration-v3.md)

## Introdução

Esta é uma referência para atualizar seu site de Material-UI v3 para v4. Embora haja muita coisa coberta por aqui, você provavelmente não precisará fazer tudo no seu site. Faremos o nosso melhor para manter as coisas fáceis de seguir e tão sequenciais quanto possível, para que você possa rapidamente agitar na v4!

## Por que você deve migrar

Esta página de documentação cobre o *como* migrar da v3 para a v4. O *por que* é coberto na postagem do blog de lançamento: [*Trabalho em andamento, no Medium*](https://medium.com/material-ui).

## Atualizando suas Dependências

A primeira coisa que você precisa fazer é atualizar suas dependências.

### Atualize a versão do Material-UI

Você precisa atualizar seu `package.json` para usar a versão mais recente do Material-UI.

```json
"dependencies": {
  "@material-ui/core": "^4.0.0"
}
```

Ou execute

```sh
npm install @material-ui/core@next

ou

yarn add @material-ui/core@next
```

### Atualize a versão do React

A versão miníma necessária do React foi incrementada de `react@^16.3.0` para `react@^16.8.0`. Isso nos permite a utilizar [Hooks](https://reactjs.org/docs/hooks-intro.html) (não usamos mais a API class).

### Atualize a versão do Material-UI Styles

Se você estiver usando `@material-ui/styles` com a v3, você precisa atualizar seu `package.json` para usar a última versão de Material-UI Styles.

```json
"dependencies": {
  "@material-ui/styles": "^4.0.0"
}
```

Ou execute

```sh
npm install @material-ui/styles@next

ou

yarn add @material-ui/styles@next
```

## Tratamento de alterações recentes

### Núcleo

- Cada componente encaminha seu ref. Isso é implementado usando `React.forwardRef()`. Isso afeta a árvore interna do componente e o nome de exibição, portanto, pode quebrar testes superficiais ou instantâneos. `innerRef` não retornará mais um ref à instância (ou nada se o componente interno for um componente de função), mas uma referência ao seu componente raiz. Os documentos da API correspondentes listam o componente raiz.

### Estilos

- ⚠️ Material-UI depende do JSS v10. JSS v10 não é compatível com o v9. Certifique-se de que o JSS v9 não esteja instalado em seu ambiente. Remover `react-jss` do seu package.json pode ajudar.
- Remova a primeira opção de argumento do `withTheme()`. O primeiro argumento era um espaço reservado para uma eventual opção futura. Nós não encontramos uma necessidade para ele. É hora de remover esse argumento. Ele correspondia à API do emotion e styled-components.
  
  ```diff
  -const DeepChild = withTheme()(DeepChildRaw);
  +const DeepChild = withTheme(DeepChildRaw);
  ```

- Escopo da [API keyframes](https://cssinjs.org/jss-syntax/#keyframes-animation). Você deve aplicar as seguintes alterações na sua base de código. Isso ajuda a isolar a lógica da animação:
  
  ```diff
    rippleVisible: {
      opacity: 0.3,
  -   animation: 'mui-ripple-enter 100ms cubic-bezier(0.4, 0, 0.2, 1)',
  +   animation: '$mui-ripple-enter 100ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '@keyframes mui-ripple-enter': {
      '0%': {
        opacity: 0.1,
      },
      '100%': {
        opacity: 0.3,
      },
    },
  ```

### Tema

- O método `theme.palette.augmentColor()` não aplica mais o efeito por referência em sua cor de entrada. Para usá-lo corretamente, agora você precisa usar o valor retornado.
  
  ```diff
  -const background = { main: color };
  -theme.palette.augmentColor(background);
  +const background = theme.palette.augmentColor({ main: color });
  
  console.log({ background });
  ```

- Você pode remover com segurança a opção `useNextVariants` do tema:
  
  ```js
  typography: {
    useNextVariants: true,
  },
  ```

- O uso de `theme.spacing.unit` se tornou obsoleto, você pode usar a nova API:
  
  ```diff
  label: {
    [theme.breakpoints.up('sm')]: {
  -   paddingTop: theme.spacing.unit * 12,
  +   paddingTop: theme.spacing(12),
    },
  }
  ```
  
  *Dica: você pode fornecer mais de 1 argumento: theme.spacing (1, 2) // = '8px 16px'*

### Leiaute

- [Grid] In order to support arbitrary spacing values and to remove the need to mentally count by 8, we are changing the spacing API:
  
  ```diff
    /**
     * Defines the space between the type `item` component.
     * It can only be used on a type `container` component.
     */
  -  spacing: PropTypes.oneOf([0, 8, 16, 24, 32, 40]),
  +  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  ```
  
  Going forward, you can use the theme to implement [a custom Grid spacing transformation function](https://material-ui.com/system/spacing/#transformation).

- [Container] Moved from `@material-ui/lab` to `@material-ui/core`
  
  ```diff
  -import Container from '@material-ui/lab/Container';
  +import Container from '@material-ui/core/Container';
  ```

### Button

- [Button] Remove the deprecated button variants (flat, raised and fab):
  
  ```diff
  -<Button variant="raised" />
  +<Button variant="contained" />
  ```
  
  ```diff
  -<Button variant="flat" />
  +<Button variant="text" />
  ```
  
  ```diff
  -import Button from '@material-ui/core/Button';
  -<Button variant="fab" />
  +import Fab from '@material-ui/core/Fab';
  +<Fab />
  ```

- [ButtonBase] The component passed to the `component` prop needs to be able to hold a ref. The [composition guide](/guides/composition/#caveat-with-refs) explains the migration strategy.
  
  This also applies to `BottomNavigationAction`, `Button`, `CardActionArea`, `Checkbox`, `ExpansionPanelSummary`, `Fab`, `IconButton`, `MenuItem`, `Radio`, `StepButton`, `Tab`, `TableSortLabel` as well as `ListItem` if the `button` prop is true

### Card

- [CardActions] Rename the `disableActionSpacing` prop `disableSpacing`.
- [CardActions] Remove the `disableActionSpacing` CSS class.
- [CardActions] Rename the `action` CSS class `spacing`.

### ClickAwayListener

- [ClickAwayListener] Hide react-event-listener props.

### Dialog

- [DialogActions] Rename the `disableActionSpacing` prop `disableSpacing`.
- [DialogActions] Rename the `action` CSS class `spacing`.
- [DialogContentText] Use typography variant `body1` instead of `subtitle1`.
- [Dialog] The child needs to be able to hold a ref. The [composition guide](/guides/composition/#caveat-with-refs) explains the migration strategy.

### Divider

- [Divider] Remove the deprecated inset prop.
  
  ```diff
  -<Divider inset />
  +<Divider variant="inset" />
  ```

### ExpansionPanel

- [ExpansionPanelActions] Rename the `action` CSS class `spacing`.
- [ExpansionPanel] Increase the CSS specificity of the `disabled` style rule.

### List

- [List] Rework the list components to match the specification:
  
  - The usage of the `ListItemAvatar` component is required when using an avatar
  - The usage of the `ListItemIcon` component is required when using a left checkbox
  - The `edge` property should be set on the icon buttons.

- [ListItem] Increase the CSS specificity of the `disabled` and `focusVisible` style rules.

### Menu

- [MenuItem] Remove the fixed height of the MenuItem. The padding and line-height are used by the browser to compute the height.

### Modal

- [Modal] The child needs to be able to hold a ref. The [composition guide](/guides/composition/#caveat-with-refs) explains the migration strategy.
  
  This also applies to `Dialog` and `Popover`.

- [Modal] Remove the classes customization API for the Modal component. (-74% bundle size reduction when used standalone)

- [Modal] event.defaultPrevented is now ignored. The new logic closes the Modal even if `event.preventDefault()` is called on the key down escape event. `event.preventDefault()` is meant to stop default behaviors like clicking a checkbox to check it, hitting a button to submit a form, and hitting left arrow to move the cursor in a text input etc. Only special HTML elements have these default behaviors. You should use `event.stopPropagation()` if you don't want to trigger an `onClose` event on the modal.

### Paper

- [Paper] Reduce the default elevation. Change the default Paper elevation to match the Card and the Expansion Panel:
  
  ```diff
  -<Paper />
  +<Paper elevation={2} />
  ```
  
  This affects the `ExpansionPanel` as well.

### Portal

- [Portal] The child needs to be able to hold a ref when `disablePortal` is used. The [composition guide](/guides/composition/#caveat-with-refs) explains the migration strategy.

### Slide

- [Slide] The child needs to be able to hold a ref. The [composition guide](/guides/composition/#caveat-with-refs) explains the migration strategy.

### Seletor

- [Switch] Refactor the implementation to make it easier to override the styles. Rename the class names to match the specification wording:
  
  ```diff
  -icon
  -bar
  +thumb
  +track
  ```

### Snackbar

- [Snackbar] Match the new specification.
  
  - Change the dimensions
  - Change the default transition from `Slide` to `Grow`.

### SvgIcon

- [SvgIcon] Rename nativeColor -> htmlColor. React solved the same problem with the `for` HTML attribute, they have decided to call the prop `htmlFor`. This change follows the same reasoning.
  
  ```diff
  -<AddIcon nativeColor="#fff" />
  +<AddIcon htmlColor="#fff" />
  ```

### Tabs (Abas)

- [Tab] Remove the `labelContainer`, `label` and `labelWrapped` class keys for simplicity. This has allowed us to remove 2 intermediary DOM elements. You should be able to move the custom styles to the `root` class key.
  
  ![A simpler tab item DOM structure](https://user-images.githubusercontent.com/3165635/53287870-53a35500-3782-11e9-9431-2d1a14a41be0.png)

- [Tabs] Remove deprecated fullWidth and scrollable props
  
  ```diff
  -<Tabs fullWidth scrollable />
  +<Tabs variant="scrollable" />
  ```

### Table

- [TableCell] Remove the deprecated `numeric` property.
  
  ```diff
  -<TableCell numeric>{row.calories}</TableCell>
  +<TableCell align="right">{row.calories}</TableCell>
  ```

- [TableRow] Remove the fixed height CSS property. The cell height is computed by the browser using the padding and line-height.
- [TableCell] Move the `dense` mode to a different property:
  
  ```diff
  -<TableCell padding="dense" />
  +<TableCell size="small" />
  ```

- [TablePagination] The component no longer tries to fix invalid (`page`, `count`, `rowsPerPage`) property combinations. It raises a warning instead.

### TextField

- [InputLabel] You should be able to override all the styles of the FormLabel component using the CSS API of the InputLabel component. The `FormLabelClasses` property has been removed.
  
  ```diff
  <InputLabel
  - FormLabelClasses={{ asterisk: 'bar' } }
  + classes={{ asterisk: 'bar' } }
  >
    Foo
  </InputLabel>
  ```

- [InputBase] Change the default box sizing model. It uses the following CSS now:
  
  ```css
  box-sizing: border-box;
  ```
  
  This solves issues with the `fullWidth` prop.

- [InputBase] Remove the `inputType` class from `InputBase`.

### Tooltip

- [Tooltip] The child needs to be able to hold a ref. The [composition guide](/guides/composition/#caveat-with-refs) explains the migration strategy.
- [Tooltip] Appears only after focus-visible focus instead of any focus.

### Typography

- [Typography] Remove the deprecated typography variants. You can upgrade by performing the following replacements: 
  - display4 => h1
  - display3 => h2
  - display2 => h3
  - display1 => h4
  - headline => h5
  - title => h6
  - subheading => subtitle1
  - body2 => body1
  - body1 (default) => body2 (default)
- [Typography] Remove the opinionated `display: block` default typography style. You can use the new `display?: 'initial' | 'inline' | 'block';` property.
- [Typography] Rename the `headlineMapping` property to `variantMapping` to better align with its purpose.
  
  ```diff
  -<Typography headlineMapping={headlineMapping}>
  +<Typography variantMapping={variantMapping}>
  ```

- [Typography] Change the default variant from `body2` to `body1`. A font size of 16px is a better default than 14px. Bootstrap, material.io, and even our documentation use 16px as a default font size. 14px like Ant Design uses is understandable, as Chinese users have a different alphabet. We recommend 12px as the default font size for Japanese.
- [Typography] Remove the default color from the typography variants. The color should inherit most of the time. It's the default behavior of the web.
- [Typography] Rename `color="default"` to `color="initial"` following the logic of #13028. The usage of *default* should be avoided, it lakes semantic.

### Node

- [Drop node 6 support](https://github.com/nodejs/Release/blob/eb91c94681ea968a69bf4a4fe85c656ed44263b3/README.md#release-schedule), you should upgrade to node 8.

### UMD

- This change eases the use of Material-UI with a CDN:
  
  ```diff
  const {
    Button,
    TextField,
  -} = window['material-ui'];
  +} = MaterialUI;
  ```
  
  It's consistent with other React projects:
  
  - material-ui => MaterialUI
  - react-dom => ReactDOM
  - prop-types => PropTypes