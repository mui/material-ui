# Migrando da v0.x para v1

<p class="description">Sim, v1 foi lançada! Tire proveito de 2 anos de esforço.</p>

## Perguntas Frequentes

### Woah - a API é diferente! Does that mean 1.0 is completely different, I'll have to learn the basics all over again, and migrating will be practically impossible?

I'm glad you asked! A resposta é não. The core concepts haven't changed. Você vai notar que a API oferece mais flexibilidade, mas isso tem um custo – componentes de nível inferior que abstraem menos complexidade.

### O que motivou uma mudança tão grande?

MUI was started [4 years ago](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46). O ecossistema evoluiu muito desde então, também aprendemos muito. [@nathanmarks](https://github.com/nathanmarks/) started an ambitious task, rebuilding MUI from the **ground-up** taking advantage of this knowledge to address long-standing issues. Para citar algumas das principais mudanças:

- Nova solução de estilo usando CSS-in-JS (melhor poder de [customização](/customization/how-to-customize/), melhor desempenho)
- Novo tratamento de tema (aninhamento, auto-suporte, etc.)
- Blazing fast documentation thanks to [Next.js](https://github.com/vercel/next.js)
- Melhor [cobertura de teste](/guides/testing/) (99%+, executado em todos os principais navegadores, [testes de regressão visual](https://www.argos-ci.com/mui-org/material-ui))
- Suporte completo [a renderização do lado do servidor](/guides/server-rendering/)
- Vasta gama de [navegadores suportados](/getting-started/supported-platforms/)

### Onde devo começar a migração?

1. Start by installing the v1.x version of MUI along side the v0.x version.

utilizando o yarn:

```sh
yarn add material-ui
yarn add @mui/material
```

Ou utilizando npm:

```sh
npm install material-ui
npm install @mui/material
```

então

```js
import FlatButton from 'material-ui/FlatButton'; // v0.x
import Button from '@mui/material/Button'; // v1.x
```

2. Execute [o auxiliar de migração](https://github.com/mui-org/material-ui/tree/master/packages/mui-codemod) em seu projeto.
3. `MuiThemeProvider` é opcional para v1.x., mas se você tem um tema customizado, você é livre para usar as versões v0.x e v1.x do componente, ao mesmo tempo, como neste exemplo:

```jsx
import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@mui/material/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = createMuiTheme({
  /* theme for v1.x */
});
const themeV0 = getMuiTheme({
  /* theme for v0.x */
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <V0MuiThemeProvider muiTheme={themeV0}>{/*Components*/}</V0MuiThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
```

4. Depois disso, você está livre para migrar uma instância de componente por vez.

## Componentes

### Autocomplete

MUI doesn't provide a high-level API for solving this problem. Recomendamos que você explore [as soluções que a comunidade construiu](/components/autocomplete/).

Execute [o auxiliar de migração](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod) em seu projeto.

### Ícone Svg

Run [the migration helper](https://github.com/mui-org/material-ui/tree/master/packages/mui-codemod) on your project.

Caminho de atualização do RaisedButton:

```diff
-import AddIcon from 'material-ui/svg-icons/Add';
+import AddIcon from '@mui/icons-material/Add';

<AddIcon />
```

### Botão flat

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from '@mui/material/Button';

-<FlatButton />
+<Button />
```

### Botão elevado

Caminho de atualização do RaisedButton:

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from '@mui/material/Button';

-<RaisedButton />
+<Button variant="contained" />
```

### Subcabeçalho

```diff
-import Subheader from 'material-ui/Subheader';
+import ListSubheader from '@mui/material/ListSubheader';

-<Subheader>Sub Heading</Subheader>
+<ListSubheader>Sub Heading</ListSubheader>
```

### Alternar

```diff
-import Toggle from 'material-ui/Toggle';
+import Switch from '@mui/material/Switch';

-<Toggle
-  toggled={this.state.checkedA}
-  onToggle={this.handleToggle}
-/>
+<Switch
+  checked={this.state.checkedA}
+  onChange={this.handleSwitch}
+/>
```

### Item de menu

```diff
-import MenuItem from 'material-ui/MenuItem';
+import MenuItem from '@mui/material/MenuItem';

-<MenuItem primaryText="Profile" />
+<MenuItem>Profile</MenuItem>
```

### Ícone de fonte

```diff
-import FontIcon from 'material-ui/FontIcon';
+import Icon from '@mui/material/Icon';

-<FontIcon>home</FontIcon>
+<Icon>home</Icon>
```

### Progresso Circular

```diff
-import CircularProgress from 'material-ui/CircularProgress';
+import CircularProgress from '@mui/material/CircularProgress';

-<CircularProgress mode="indeterminate" />
+<CircularProgress variant="indeterminate" />
```

### Menu suspenso

```diff
-import DropDownMenu from 'material-ui/DropDownMenu';
+import Select from '@mui/material/Select';

-<DropDownMenu></DropDownMenu>
+<Select value={this.state.value}></Select>
```

### Continua…

Você migrou sua aplicação com sucesso, e que tal ajudar a comunidade? Existe um problema em aberto para concluir este guia de migração [#7195](https://github.com/mui-org/material-ui/issues/7195). Qualquer pull request é bem-vindo 😊.
