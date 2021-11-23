# Supported platforms

<p class="description">Learn about the platforms, from modern to old, that are supported by MUI.</p>

## Navegador

MUI supports the latest, stable releases of all major browsers and platforms. Você não precisa fornecer nenhum poyfill JavaScript, pois ele gerencia recursos não suportados do navegador internamente e isoladamente.

<!-- #stable-snapshot -->

| Edge  | Firefox | Chrome | Safari (macOS) | Safari (iOS) | IE                   |
|:----- |:------- |:------ |:-------------- |:------------ |:-------------------- |
| >= 91 | >= 78   | >= 90  | >= 14          | >= 12.5      | 11 (suporte parcial) |

<!-- #default-branch-switch -->

An extensive list can be found in our [.browserlistrc](https://github.com/mui-org/material-ui/blob/master/.browserslistrc#L12-L27) (check the `stable` entry).

Because Googlebot uses a web rendering service (WRS) to index the page content, it's critical that MUI supports it. [O WRS atualiza regularmente o mecanismo de renderização usado por ele](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). You can expect MUI's components to render without major issues.

### IE 11

MUI provides **partial** supports for IE 11. Be aware of the following:

- Some of the components have no support. For instance, the new components, the data grid, the date picker.
- Some of the components have degraded support. For instance, the outlined input border radius is missing, the combobox doesn't remove diacritics, the circular progress animation is wobbling.
- The documentaton itself might crash.
- You need install the [legacy bundle](/guides/minimizing-bundle-size/#legacy-bundle).
- You might need to install polyfills. For instance for the [popper.js transitive dependency](https://popper.js.org/docs/v2/browser-support/#ie11).

Overall, the library doesn't prioritize the support of IE 11 if it harms the most common use cases. For instance, we will close new issues opened about IE 11 and might not merge pull requests that improve IE 11 support.

v6 will completely remove the support of IE 11.

## Servidor

<!-- #stable-snapshot -->

MUI supports [Node.js](https://github.com/nodejs/node) starting with version 12.17 (or 12.0 with `--experimental-modules` enabled) for server-side rendering. This aims to match the [LTS versions that are in maintenance](https://github.com/nodejs/Release#release-schedule) mode.

### Prefixos CSS

Esteja ciente de que alguns recursos do CSS [ exigem ](https://github.com/cssinjs/jss/issues/279) uma etapa adicional de pós-processamento que adiciona prefixos específicos do browser. Estes prefixos são adicionados automaticamente no cliente graças ao [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

O CSS exibido nesta documentação é processado com [`autoprefixer`](https://www.npmjs.com/package/autoprefixer). Você pode usar [a implementação encontrada na documentação](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) como inspiração. Esteja ciente de que isso tem uma implicação no desempenho da página. É algo essencial para páginas estáticas, mas precisa ser equilibrado com não fazer nada ao renderizar páginas dinâmicas.

## React

<!-- #react-peer-version -->

MUI supports the most recent versions of React, starting with ^17.0.0 (the one with event delegation at the React root). Dê uma olhada nas [versões](https://mui.com/versions/) mais antigas para compatibilidade.

## TypeScript

MUI requires a minimum version of TypeScript 3.5. This aims to match the policy of [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), with the support of the versions of TypeScript that are less than two years old.
