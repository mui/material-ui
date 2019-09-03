# Plataformas Suportadas

<p class="description">Aprenda sobre as plataformas, do moderno ao antigo, que são suportadas pelo Material-UI.</p>

## Navegador

O Material-UI suporta as versões mais recentes e estáveis de todos os principais navegadores e plataformas. It also supports Internet Explorer 11. You don't need to provide any JavaScript polyfill as it manages unsupported browser features internally and in isolation.

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |


Como o Googlebot usa um serviço de renderização da Web (WRS) para indexar o conteúdo da página, é essencial que o Material-UI o suporte. [O WRS atualiza regularmente o mecanismo de renderização usado por ele](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). Você pode esperar que os componentes do Material-UI sejam renderizados sem grandes problemas.

## Servidor

Because Material-UI supports server-side rendering, it needs to support the latest, stable releases of [Node.js](https://github.com/nodejs/node). Também tentamos suportar as versões do [ LTS que estão em manutenção ](https://github.com/nodejs/Release#lts-schedule1). Right now, it supports **node v8.x** and newer versions.

### Prefixos CSS

Esteja ciente de que alguns recursos CSS [ exigem ](https://github.com/cssinjs/jss/issues/279) uma etapa adicional de pós-processamento que adiciona prefixos específicos do fornecedor. Estes prefixos são adicionados automaticamente no cliente graças ao [` jss-plugin-vendor-prefixer `](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

O CSS exibido nesta documentação é processado com [`autoprefixer`](https://www.npmjs.com/package/autoprefixer). Você pode usar [ a implementação encontrada na documentação ](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) como inspiração. Esteja ciente de que isso tem uma implicação no desempenho da página. Deve ser feito para páginas estáticas, mas precisa ser equilibrado com não fazer nada ao renderizar páginas dinâmicas.

## React

Material-UI supports the most recent versions of React, starting with ^16.8.0 (the one with the hooks). Have a look at our older [versions](/versions/) for backward compatibility.