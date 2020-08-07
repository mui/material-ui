# Da direita para a esquerda

<p class="description">Idiomas da direita para esquerda como árabe, persa ou hebraico são suportados. Para alterar a direção dos componentes de Material-UI, você deve seguir as etapas a seguir.</p>

## Passos

### 1. HTML

Certifique-se de que o atributo `dir` é definido no corpo (body), caso contrário, os componentes nativos serão quebrados:

```html
<body dir="rtl">
```

### 2. Tema

Defina a direção no seu tema customizado:

```js
const theme = createMuiTheme({
  direction: 'rtl',
});
```

### 3. jss-rtl

Você precisa deste plugin JSS para inverter os estilos: [jss-rtl](https://github.com/alitaheri/jss-rtl).

```sh
npm install jss-rtl
```

Tendo instalado o plugin em seu projeto, os componentes de Material-UI ainda exigem que ele seja carregado pela instância do jss, conforme descrito abaixo. Internamente, withStyles está usando este plugin JSS quando `direção: 'rtl'` está definido no tema. Vá para o [README do plugin](https://github.com/alitaheri/jss-rtl) para aprender mais sobre isso.

Depois de criar uma nova instância do JSS com o plugin, você precisará disponibilizá-la para todos os componentes na árvore de componentes. O componente [`StylesProvider`](/styles/api/#stylesprovider) permite isso:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure o JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}
```

## Demonstração

*Use o botão de alternância de direção no canto superior direito para inverter toda a documentação*

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## Optando pela transformação do rtl

Se você quiser evitar que um conjunto de regras específico seja afetado pela transformação `rtl`, você pode adicionar `flip: false` no inicio.

*Use o botão de alternância de direção no canto superior direito para ver o efeito.*

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}