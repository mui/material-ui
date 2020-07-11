# Perguntas Frequentes

<p class="description">Preso em um determinado problema? Confira primeiro algumas dicas nas Perguntas Frequentes.</p>

Se mesmo assim você não encontrar o que você está procurando, você pode consultar a nossa [página de suporte](/getting-started/support/).

## Material-UI é incrível. Como posso apoiar o projeto?

Existem muitas maneiras de apoiar o Material-UI:

- **Espalhe a palavra**. Evangelize Material-UI [vinculando o material-ui.com](https://material-ui.com/) no seu site, todo backlink conta. Siga-nos no [Twitter](https://twitter.com/MaterialUI), curta e retuíte as notícias importantes. Ou apenas fale sobre nós com os seus amigos.
- **Dê-nos sua opinião**. Conte-nos o que estamos fazendo bem ou onde podemos melhorar. Por favor vote (👍) nos issues do GitHub que você está mais interessado em ver resolvidos.
- **Ajude novos usuários**. Você pode responder a perguntas no [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui).
- **Faça as alterações acontecerem**. 
  - Edite a documentação. Cada página da versão em inglês tem um link "EDIT THIS PAGE" no canto superior direito.
  - Reporte erros ou recursos faltantes [criando uma issue](https://github.com/mui-org/material-ui/issues/new).
  - Revise e comente em [pull requests](https://github.com/mui-org/material-ui/pulls) e [issues](https://github.com/mui-org/material-ui/issues) existentes.
  - Ajude a [traduzir](https://translate.material-ui.com) a documentação.
  - [Aprimore nossa documentação](https://github.com/mui-org/material-ui/tree/master/docs), corrija bugs, ou adicione recursos [enviando um pull request](https://github.com/mui-org/material-ui/pulls).
- **Apoie-nos financeiramente no [OpenCollective](https://opencollective.com/material-ui)**. Se você usa Material-UI em um projeto comercial e gostaria de apoiar seu desenvolvimento contínuo tornando-se um Patrocinador, ou em um projeto freelancer ou hobby e gostaria de se tornar um Apoiador, você pode se tornar através do OpenCollective. Todos os fundos doados são geridos de forma transparente e os Patrocinadores recebem reconhecimento no README e na página inicial do Material-UI.

## Por que meus componentes não estão renderizando corretamente em compilações de produção?

O motivo número #1 pelo qual isto provavelmente acontecerá é devido a conflitos de nome de classe quando seu código estiver em um pacote de produção. Para que o Material-UI funcione, os valores do `className` de todos os componentes de uma página, devem ser gerados por uma única instância do [gerador de nome de classes](/styles/advanced/#class-names).

Para corrigir este problema, todos os componentes da página precisam ser inicializados, de modo que haja somente **um gerador de nome de classe** entre eles.

Você pode acabar usando acidentalmente dois geradores de nome de classe em vários cenários:

- Você acidentalmente **empacota** duas versões do Material-UI. Você pode ter nesse caso, uma dependência que não esta configurando corretamente o Material-UI.
- Você esta usando `StylesProvider` para um **subconjunto** da sua árvore de componentes React.
- Você está usando um empacotador (bundler) e está dividindo o código de uma maneira que faz com que várias instâncias do gerador de nome de classe sejam criadas.

> Se você estiver usando webpack com [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/), tente configurar o [`runtimeChunk` disponível em `optimizations`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).

No geral, é simples livrar-se desse problema encapsulando cada aplicação Material-UI com componentes [`StylesProvider`](/styles/api/#stylesprovider), no topo de suas árvores de componentes** e usando um único gerador de nome de classe compartilhado entre eles**.

## Por que os elementos posicionados como fixos se movem quando um modal é aberto?

A rolagem é bloqueada assim que um modal é aberto. Isto impede a interação com o segundo plano, pois o modal deve ser o único conteúdo interativo. No entanto, removendo a barra de rolagem pode fazer com que seus **elementos fixos posicionados** se movam. Nesta situação, você pode aplicar um nome de classe global `.mui-fixed ` para informar ao Material-UI para manipular esses elementos.

## Como posso desativar o efeito cascata globalmente?

O efeito cascata é exclusivamente proveniente do componente `BaseButton`. Você pode desativar o efeito cascata globalmente aplicando as seguintes configurações no seu tema:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    // Nome do componente ⚛️
    MuiButtonBase: {
      // As propriedades para aplicar
      disableRipple: true, // Sem efeito cascata, em toda aplicação 💣!
    },
  },
});
```

## Como posso desativar as transições globalmente?

Material-UI usa o mesmo auxiliar de tema para criar todas as transições. Portanto, você pode desativar todas as transições substituindo o auxiliar no seu tema:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // Então temos `transition: none;` em todo lugar
    create: () => 'none',
  },
});
```

Pode ser útil desabilitar transições durante testes visuais ou para melhorar o desempenho em dispositivos de baixo custo.

Você pode ir além, desabilitando todas as transições e efeitos de animações:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    // Nome do componente ⚛️
    MuiCssBaseline: {
      // Nome da regra
      '@global': {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
});
```

Observe que o uso de `CssBaseline` é necessário para que a abordagem acima funcione. Se você optar por não usá-lo, você ainda pode desabilitar transições e animações incluindo estas regras CSS:

```css
*, *::before, *::after {
  transition: 'none !important';
  animation: 'none !important';
}
```

## Preciso usar o JSS para estilizar minha aplicação?

Não, não é obrigatório. Mas essa dependência vem embutida, portanto, não sobrecarrega o tamanho do pacote.

No entanto, talvez você esteja adicionando os componentes Material-UI para uma aplicação que já usa outra solução de estilos, ou, já esta familiarizado com uma API diferente e não quer aprender uma nova? Nesse caso, dirija-se à seção de [interoperabilidade da biblioteca de estilos](/guides/interoperability/), onde mostramos como é simples reestilizar os componentes do Material-UI com bibliotecas de estilos alternativas.

## Quando devo usar o estilo em linha vs CSS?

Como regra geral, use apenas o estilo em linha para propriedades de estilo dinâmicas. A alternativa de uso com CSS oferece mais vantagens, em:

- prefixação automática
- melhor depuração
- consultas de mídia
- keyframes

## Como usar react-router?

Detalhamos a [integração com bibliotecas de roteamento de terceiros](/guides/composition/#routing-libraries) como react-router, Gatsby ou Next.js em nosso guia.

## Como posso acessar o elemento DOM?

Todos os componentes do Material-UI que devem renderizar algo no DOM possuem referência para o componente DOM subjacente. Isso significa que você pode obter elementos DOM lendo o ref anexado aos componentes do Material-UI:

```jsx
// uma função setter ref
const ref = React.createRef();
// renderizando
<Button ref={ref} />;
// uso
const element = ref.current;
```

Se você não tem certeza se o componente do Material-UI em questão encaminha seu ref, você pode verificar a documentação da API em "Props" por exemplo, a API [Button API](/api/button/#props)

> O ref é encaminhado para o elemento raiz.

indicando que você pode acessar o elemento DOM como uma referência.

## Eu tenho várias instâncias de estilos na página

Se você está vendo uma mensagem de aviso no console como a abaixo, você provavelmente tem várias instâncias de `@material-ui/styles` inicializadas na página.

> It looks like there are several instances of `@material-ui/styles` initialized in this application. Isso pode causar problemas de propagação de temas, nomes de classes quebrados, problemas de especificidade e tornar sua aplicação maior sem um bom motivo.

### Possíveis razões

Existem várias razões comuns para isso acontecer:

- Você tem outra biblioteca `@material-ui/styles` em algum lugar das suas dependências.
- Você tem uma estrutura "monorepo" para seu projeto (por exemplo, lerna, yarn workspaces) e o módulo `@material-ui/styles` é uma dependência em mais de um pacote (este é mais ou menos o mesmo que o anterior).
- Você tem várias aplicações que estão usando `@material-ui/styles` executando na mesma página (por exemplo, vários pontos de entrada no webpack são carregados na mesma página).

### Módulo duplicado em node_modules

Se você acha que o problema pode estar na duplicação do módulo @material-ui/styles em algum lugar de suas dependências, há várias maneiras de verificar isto. Você pode usar os comandos `npm ls @material-ui/styles`, `yarn list @material-ui/styles` ou `find -L ./node_modules | grep /@material-ui/styles/package.json` na pasta da sua aplicação.

Se nenhum desses comandos identificou a duplicação, tente analisar seu pacote para encontrar instâncias duplicadas do @material-ui/styles. Você pode somente checar em fontes do seu pacote, ou usar uma ferramenta como [source-map-explorer](https://github.com/danvk/source-map-explorer) ou [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

Se você identificou que a duplicação é o problema que você esta enfrentando, há várias coisas que você pode tentar para resolvê-lo:

Se você está usando npm você pode tentar executar `npm dedupe`. Este comando pesquisa as dependências locais e tenta simplificar a estrutura movendo dependências comuns mais acima na árvore.

Se você estiver usando o webpack, você pode mudar a maneira como ele irá resolver ([resolve](https://webpack.js.org/configuration/resolve/#resolve-modules)) o módulo @material-ui/styles. Você pode sobrescrever a ordem padrão na qual o webpack irá procurar por suas dependências e tornar a pasta node_modules da sua aplicação, com maior prioridade do que a ordem de resolução de módulos padrão:

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Uso com Lerna

Uma possível correção para que o @material-ui/styles seja executado em um monorepo Lerna através de pacotes é fazer [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) das dependências compartilhadas para a raiz do seu arquivo monorepo. Tente executar a opção de auto inicialização com o parâmetro --hoist.

```sh
lerna bootstrap --hoist
```

Alternativamente, você pode remover a referência do @material-ui/styles do seu arquivo package.json e subir (hoist) ela manualmente para o arquivo package.json da pasta raiz do Lerna.

Exemplo de um arquivo package.json em uma pasta raiz do Lerna

```json
{
  "name": "my-monorepo",
  "devDependencies": {
    "lerna": "latest"
  },
  "dependencies": {
    "@material-ui/styles": "^4.0.0"
  },
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "start": "lerna run start",
    "build": "lerna run build"
  }
}
```

### Executando múltiplas aplicações em uma única página

Se você tiver várias aplicações em execução em uma página, considere o uso de um único módulo @material-ui/styles para todas elas. Se você esta usando webpack, você pode usar [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) para criar de forma explícita um [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), que conterá o módulo @material-ui/styles:

```diff
  module.exports = {
    entry: {
+     vendor: ["@material-ui/styles"],
      app1: "./src/app.1.js",
      app2: "./src/app.2.js",
    },
    plugins: [
+     new webpack.optimize.CommonsChunkPlugin({
+       name: "vendor",
+       minChunks: Infinity,
+     }),
    ]
  }
```

## Minha aplicação não é renderizada corretamente no servidor

Se isso não funcionar, em 99% dos casos é um problema de configuração. Uma propriedade ausente, uma ordem de chamada errada ou um componente ausente – a renderização do lado do servidor é rigorosa sobre configuração, e a melhor maneira de descobrir o que há de errado é comparar seu projeto com uma configuração já em funcionamento. Confira as [implementações de referência](/guides/server-rendering/#reference-implementations), pouco a pouco.

### O CSS funciona apenas no primeiro carregamento, em seguida, para de funcionar

O CSS é gerado apenas no primeiro carregamento da página. Em seguida, o CSS não retorna do servidor para solicitações consecutivas.

#### Ação a tomar

A solução de estilo depende de um cache, o *sheets manager*, para injetar apenas o CSS uma vez por tipo de componente (se você usar dois botões, você só precisa do CSS do botão uma vez). Você precisa criar **uma nova instância de `sheets` para cada requisição**.

*exemplo de correção:*

```diff
-// Crie uma instância de sheets.
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Crie uma instância de sheets.
+ const sheets = new ServerStyleSheets();

  //…

  // Renderize o componente para uma string.
  const html = ReactDOMServer.renderToString(
```

### React incompatibilidade de nome de classes na hidratação (React Hydrate)

Há uma incompatibilidade de nome de classe entre o cliente e o servidor. Pode funcionar para a primeira requisição. Outro sintoma é que o estilo muda entre o carregamento inicial da página e o download dos scripts do cliente.

#### Ação a tomar

O valor de nomes de classe depende da lógica empregada pelo [gerador de nome de classe](/styles/advanced/#class-names). A página inteira precisa ser renderizada com **um único gerador**. Este gerador precisa se comportar de forma idêntica no servidor e no cliente. Por exemplo:

- Você precisa fornecer um novo gerador de nome de classe para cada requisição. Mas você não deve compartilhar um `createGenerateClassName()` entre diferentes requisições:

*exemplo de correção:*

```diff
- // Crie um novo gerador de nome de classe.
-const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // Crie um novo gerador de nome de classe.
+ const generateClassName = createGenerateClassName();

  //…

  // Renderize o componente para uma string.
  const html = ReactDOMServer.renderToString(
```

- Você precisa verificar se seu cliente e servidor estão executando **exatamente a mesma versão** do Material-UI. É possível que uma incompatibilidade de versões menores possa causar problemas de estilo. Para verificar números de versão, execute `npm list @material-ui/core` no ambiente em que você cria sua aplicação e também em seu ambiente de implementação.
  
    Você também pode garantir a mesma versão em diferentes ambientes, definindo uma versão específica do MUI nas dependências do seu package.json.

*exemplo de correção (package.json):*

```diff
  "dependencies": {
    ...

-   "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
  },
```

- Você precisa ter certeza de que o servidor e o cliente compartilhem o mesmo valor de `process.env.NODE_ENV`.

## Por que as cores que estou vendo são diferentes das que vejo aqui?

O site de documentação está usando um tema customizado. Assim, a paleta de cores é diferente do tema padrão que é fornecido pelo Material-UI. Por favor, consulte [esta página](/customization/theming/) para aprender sobre customização de temas.

## Por que o componente X requer um nó DOM em uma propriedade em vez de um objeto ref?

Componentes como [Portal](/api/portal/#props) ou [Popper](/api/popper/#props) requerem um nó DOM na propriedade `container` ou `anchorEl` respectivamente. Parece conveniente simplesmente passar um objeto ref nessas propriedades e deixar o Material-UI acessar o valor atual. Isso funciona em um cenário simples:

```jsx
function App() {
  const container = React.useRef(null);

  return (
    <div className="App">
      <Portal container={container}>
        <span>Componente filho portado</span>
      </Portal>
      <div ref={container} />
    </div>
  );
}
```

onde `Portal` só montaria os filhos no container quando `container.current` estiver disponível. Aqui está uma implementação simplória do Portal:

```jsx
function Portal({ children, container }) {
  const [node, setNode] = React.useState(null);

  React.useEffect(() => {
    setNode(container.current);
  }, [container]);

  if (node === null) {
    return null;
  }
  return ReactDOM.createPortal(children, node);
}
```

Com esta simples heurística `Portal` pode renderizar novamente depois de montado porque os refs estão atualizados antes de qualquer efeito ser executado. No entanto, só porque um ref está atualizado não significa que ele aponta para uma instância definida. Se o ref estiver anexado a um componente de encaminhamento de ref não estará claro quando o nó DOM estará disponível. No exemplo acima, o `Portal` executaria o efeito uma vez, mas pode não renderizar novamente porque `ref.current` ainda é `null`. Isso é especialmente aparente para componentes React.lazy em Suspense. A implementação acima também não poderia explicar uma alteração no nó DOM.

É por isso que precisamos de uma propriedade com o nó DOM real para que o React possa tomar cuidado ao determinar quando o `Portal` deve renderizar novamente:

```jsx
function App() {
  const [container, setContainer] = React.useState(null);
  const handleRef = React.useCallback(instance => setContainer(instance), [setContainer])

  return (
    <div className="App">
      <Portal container={container}>
        <span>Portaled</span>
      </Portal>
      <div ref={handleRef} />
    </div>
  );
}
```

## Para que serve a dependência do clsx?

[clsx](https://github.com/lukeed/clsx) é um pequeno utilitário para construir sequências de strings de `className` condicionalmente, sendo um objeto onde as chaves são as strings de classe e valores sendo booleanos.

Em vez de escrever:

```jsx
// let disabled = false, selected = true;

return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${selected ? 'Mui-selected' : ''}`}
  />
);
```

você pode fazer:

```jsx
import clsx from 'clsx';

return (
  <div
    className={clsx('MuiButton-root', {
      'Mui-disabled': disabled,
      'Mui-selected': selected,
    })}
  />
);
```