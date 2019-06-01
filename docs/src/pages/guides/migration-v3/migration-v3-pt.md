# Migrando da v3 para v4

<p class="description">Sim, v4 foi lançada!</p>

Procurando pelos documentos da v3? [Encontre-os aqui](https://material-ui.com/versions/).

> Este documento é um trabalho em progresso. Você atualizou seu site e encontrou algo que não é abordado aqui? [Adicione suas alterações no GitHub](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/guides/migration-v3/migration-v3.md)

## Introdução

Esta é uma referência para atualizar seu site de Material-UI v3 para v4. Embora haja muita coisa coberta por aqui, você provavelmente não precisará fazer tudo no seu site. Faremos o nosso melhor para manter as coisas fáceis de seguir e tão sequenciais quanto possível, para que você possa rapidamente agitar na v4!

## Por que você deve migrar

Esta página de documentação cobre o *como* migrar da v3 para a v4. O *por que* é abordado na [postagem no blog do Medium](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701).

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
  
  ```diff
  typography: {
  - useNextVariants: true,
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
  
  Você pode usar esta ajuda `https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod/README.md#theme-spacing-api`, para tornar o processo de migração mais suave.
  
  *Dica: você pode fornecer mais de 1 argumento: theme.spacing (1, 2) // = '8px 16px'*
  
  Você pode usar [esta ajuda de migração](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod/README.md#theme-spacing-api) em seu projeto para tornar isso mais suave.

### Leiaute

- [Grid] Para suportar valores de espaçamento arbitrários e para remover a necessidade de contar mentalmente por 8, estamos mudando a API de espaçamento:
  
  ```diff
    / **
     * Define o espaço entre o componente do tipo `item`.
     * Só pode ser usado em um componente do tipo 'container'.
     */
  -  spacing: PropTypes.oneOf([0, 8, 16, 24, 32, 40]),
  +  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  ```
  
  Indo além, você pode usar o tema para implementar [uma função de transformação de espaçamento de grade customizada](https://material-ui.com/system/spacing/#transformation).

- [Container] Movido de `@material-ui/lab` para `@material-ui/core`
  
  ```diff
  -import Container from '@material-ui/lab/Container';
  +import Container from '@material-ui/core/Container';
  ```

### Botão

- [Button] Remova as variantes descontinuadas (flat, raised e fab):
  
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
  
  ```diff
  -import Button from '@material-ui/core/Button';
  -<Button variant="extendedFab" />
  +import Fab from '@material-ui/core/Fab';
  +<Fab variant="extended />
  ```

- [ButtonBase] O componente passado para a propriedade `component` precisa ser capaz de lidar com ref. O [guia de composição](/guides/composition/#caveat-with-refs) explica a estratégia de migração.
  
  Isso também se aplica a `BottomNavigationAction`, `Button`, `CardActionArea`, `Checkbox`, `ExpansionPanelSummary`, `Fab`, `IconButton`, `MenuItem`, `Radio`, `StepButton`, `Tab`, `TableSortLabel` bem como `ListItem` se a propriedade `button` for `true`

### Cartão

- [CardActions] Renomeie a propriedade `disableActionSpacing` para `disableSpacing`.
- [CardActions] Remova a classe CSS `disableActionSpacing`.
- [CardActions] Renomeie a classe CSS `action` para `spacing`.

### ClickAwayListener

- [ClickAwayListener] Esconda propriedades react-event-listener.

### Caixa de diálogo

- [DialogActions] Renomeie a propriedade `disableActionSpacing` para `disableSpacing`.
- [DialogActions] Renomeie a classe CSS `action` para `spacing`.
- [DialogContentText] Use a varante de tipografia `body1` em vez de `subtitle1`.
- [Dialog] O elemento filho precisa ser capaz de lidar com ref. O [guia de composição](/guides/composition/#caveat-with-refs) explica a estratégia de migração.

### Divisor

- [Divider] Remova a propriedade obsoleta inset.
  
  ```diff
  -<Divider inset />
  +<Divider variant="inset" />
  ```

### Painel de expansão

- [ExpansionPanelActions] Renomeie a classe CSS `action` para `spacing`.
- [ExpansionPanel] Aumente a especificidade CSS da regra de estilo `disabled`.

### Lista

- [List] Refaça a lista de componentes para coincidir com a especificação:
  
  - O uso componente `ListItemAvatar` é necessário quando usando um avatar
  - O uso do componente `ListItemIcon` é necessário quando usando uma caixa de seleção à esquerda
  - A propriedade `edge` deve ser definida para botões de ícone.

- [ListItem] Aumente a especificidade CSS das regras de estilo `disabled` e `focusVisible`.

### Menu

- [MenuItem] Remova a altura fixa do MenuItem. O preenchimento e a altura da linha são usados pelo navegador para calcular a altura.

### Modal

- [Modal] O elemento filho precisa ser capaz de lidar com ref. O [guia de composição](/guides/composition/#caveat-with-refs) explica a estratégia de migração.
  
  Isso também se aplica aos componentes `Dialog` e `Popover`.

- [Modal] Remova a customização da API classes para o componente Modal. (-74% de redução no tamanho do pacote quando usado de forma independente)

- [Modal] event.defaultPrevented é agora ignorado. A nova lógica fecha o Modal mesmo se `event.preventDefault()` é chamado no evento down da tecla escape (Esc). `event.preventDefault()` destina-se a impedir comportamentos padrão, como clicar em uma caixa de seleção para verificá-lo, apertar um botão para enviar um formulário e pressionar a seta para a esquerda para mover o cursor em uma entrada de texto, etc. Apenas elementos HTML especiais possuem esses comportamentos padrão. Você deve usar `event.stopPropagation()` se você não quer acionar o evento `onClose` no modal.

### Paper (Papel)

- [Paper] Reduza a elevação padrão. Altere a elevação padrão de Paper, para corresponder ao cartão e ao painel de expansão:
  
  ```diff
  -<Paper />
  +<Paper elevation={2} />
  ```
  
  Isso afeta o componente `ExpansionPanel` também.

### Portal

- [Portal] O elemento filho precisa ser capaz de lidar com ref, quando a propriedade `disablePortal` é usada. O [guia de composição](/guides/composition/#caveat-with-refs) explica a estratégia de migração.

### Slide

- [Slide] O elemento filho precisa ser capaz de lidar com ref. O [guia de composição](/guides/composition/#caveat-with-refs) explica a estratégia de migração.

### Interruptor (Switch)

- [Switch] Refatore a implementação para torná-la mais fácil de sobrescrever os estilos. Renomeie os nomes das classes para corresponder ao texto da especificação:
  
  ```diff
  -icon
  -bar
  +thumb
  +track
  ```

### Snackbar

- [Snackbar] Coincide a nova especificação.
  
  - Modificado as dimensões
  - Modificado a transição padrão de `Slide` para `Grow`.

### Ícones SVG

- [SvgIcon] Renomeie nativeColor -> htmlColor. React resolveu o mesmo problema com o atributo HTML `for`, eles decidiram chamar um propriedade `htmlFor`. Essa mudança segue o mesmo raciocínio.
  
  ```diff
  -<AddIcon nativeColor="#fff" />
  +<AddIcon htmlColor="#fff" />
  ```

### Guias

- [Tab] Remova as chaves de classe `labelContainer`, `label` e `labelWrapped` para simplificar. Isso nos permitiu remover 2 elementos DOM intermediários. Você deve conseguir mover os estilos customizados para chave de classe `root`.
  
  ![Uma estrutura DOM de item de guia mais simples](https://user-images.githubusercontent.com/3165635/53287870-53a35500-3782-11e9-9431-2d1a14a41be0.png)

- [Tabs] Remova as propriedades descontinuadas fullWidth e scrollable
  
  ```diff
  -<Tabs fullWidth scrollable />
  +<Tabs variant="scrollable" />
  ```

### Tabela

- [TableCell] Remova a propriedade descontinuada `numeric`.
  
  ```diff
  -<TableCell numeric>{row.calories}</TableCell>
  +<TableCell align="right">{row.calories}</TableCell>
  ```

- [TableRow] Remova a propriedade CSS de altura fixa. A altura da célula é calculada pelo navegador usando o preenchimento e a altura da linha.
- [TableCell] Movemos o modo `dense` para uma propriedade diferente:
  
  ```diff
  -<TableCell padding="dense" />
  +<TableCell size="small" />
  ```

- [TablePagination] O componente já não tenta corrigir as combinações de propriedades inválidas (`page`, `count`, `rowsPerPage`). Em vez disso, emite um aviso.

### Campo de texto

- [InputLabel] Você deve conseguir sobrescrever todos os estilos do componente FormLabel usando a API CSS do componente InputLabel. A propriedade `FormLabelClasses` foi removida.
  
  ```diff
  <InputLabel
  - FormLabelClasses={{ asterisk: 'bar' } }
  + classes={{ asterisk: 'bar' } }
  >
    Foo
  </InputLabel>
  ```

- [InputBase] Modificado o modelo padrão de box sizing. Ele usa o seguinte CSS agora:
  
  ```css
  box-sizing: border-box;
  ```
  
  Isso resolve problemas com a propriedade `fullWidth`.

- [InputBase] Remova a classe `inputType` do `InputBase`.

### Dica

- [Tooltip] O elemento filho precisa ser capaz de lidar com ref. O [guia de composição](/guides/composition/#caveat-with-refs) explica a estratégia de migração.
- [Tooltip] Aparece somente após o foco ser "focus-visible" em vez de qualquer foco.

### Tipografia

- [Typography] Remova as variantes de tipografia descontinuadas. Você pode atualizar executando as seguintes substituições: 
  - display4 => h1
  - display3 => h2
  - display2 => h3
  - display1 => h4
  - headline => h5
  - title => h6
  - subheading => subtitle1
  - body2 => body1
  - body1 (padrão) => body2 (padrão)
- [Typography] Remova o padrão opinativo do estilo da tipografia `display: block`. Você pode usar a nova propriedade `display?: 'initial' | 'inline' | 'block';`.
- [Typography] Renomeie a propriedade `headlineMapping` para `variantMapping`, se alinha melhor com a sua finalidade.
  
  ```diff
  -<Typography headlineMapping={headlineMapping}>
  +<Typography variantMapping={variantMapping}>
  ```

- [Typography] Modifique a variante padrão de `body2` para `body1`. Um tamanho de fonte de 16px é um padrão melhor que 14px. Bootstrap, material.io e até nossa documentação usam 16px como tamanho de fonte padrão. 14px como o Ant Design usa, é compreensível, já que os usuários chineses têm um alfabeto diferente. Recomendamos 12px como o tamanho de fonte padrão para japonês.
- [Typography] Remova a cor padrão das variantes de tipografia. A cor deve herdar a maior parte do tempo. É o comportamento padrão da web.
- [Typography] Renomeie `color="default"` para `color="initial"` seguindo a lógica de #13028. O uso de *default* deve ser evitado, isso perde semântica.

### Node

- [Removemos suporte ao node 6](https://github.com/nodejs/Release/blob/eb91c94681ea968a69bf4a4fe85c656ed44263b3/README.md#release-schedule), você deve atualizar para o node 8.

### UMD

- Essa alteração facilita o uso de Material-UI com uma CDN:
  
  ```diff
  const {
    Button,
    TextField,
  -} = window['material-ui'];
  +} = MaterialUI;
  ```
  
  É consistente com outros projetos do React:
  
  - material-ui => MaterialUI
  - react-dom => ReactDOM
  - prop-types => PropTypes