# Plataformas Suportadas

<p class="description">Aprenda sobre as plataformas, desde as modernas até antigas, quais delas são suportadas pelo Material-UI.</p>

## Navegador

O Material-UI suporta as versões mais recentes e estáveis de todos os principais navegadores e plataformas. Você não precisa fornecer nenhum poyfill JavaScript, pois ele gerencia recursos não suportados do navegador internamente e isoladamente.

<!-- #stable-snapshot -->

| Edge  | Firefox | Chrome | Safari (macOS) | Safari (iOS) |
|:----- |:------- |:------ |:-------------- |:------------ |
| >= 85 | >= 78   | >= 84  | >= 13          | >= 12.1      |

<!-- #default-branch-switch -->

An extensive list can be found in our [.browserlistrc](https://github.com/mui-org/material-ui/blob/next/.browserslistrc#L12-L27) (check the `stable` entry). Se você precisar do suporte para o IE 11, confira nosso [pacote legado](/guides/minimizing-bundle-size/#legacy-bundle).

Como o Googlebot usa um serviço de renderização da Web (WRS) para indexar o conteúdo da página, é essencial que o Material-UI o suporte. [O WRS atualiza regularmente o mecanismo de renderização usado por ele](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). Você pode esperar que os componentes do Material-UI sejam renderizados sem grandes problemas.

## Servidor

<!-- #stable-snapshot -->

We support [Node.js](https://github.com/nodejs/node) starting with version 10 for server-side rendering. Sempre que possível, as versões [ LTS que estão em manutenção ](https://github.com/nodejs/Release#release-schedule) são suportados.

### Prefixos CSS

Esteja ciente de que alguns recursos do CSS [ exigem ](https://github.com/cssinjs/jss/issues/279) uma etapa adicional de pós-processamento que adiciona prefixos específicos do browser. Estes prefixos são adicionados automaticamente no cliente graças ao [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

O CSS exibido nesta documentação é processado com [`autoprefixer`](https://www.npmjs.com/package/autoprefixer). Você pode usar [a implementação encontrada na documentação](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) como inspiração. Esteja ciente de que isso tem uma implicação no desempenho da página. É algo essencial para páginas estáticas, mas precisa ser equilibrado com não fazer nada ao renderizar páginas dinâmicas.

## React

Material-UI suporta as versões mais recentes do React, começando com ^16.8.0 (o que possui os hooks). Dê uma olhada nas [versões](https://material-ui.com/versions/) mais antigas para compatibilidade.

## TypeScript

Material-UI requer como versão mínima o TypeScript 3.2.
