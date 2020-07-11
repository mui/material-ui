# Plataformas Suportadas

<p class="description">Aprenda sobre as plataformas, desde as modernas até antigas, quais delas são suportadas pelo Material-UI.</p>

## Navegador

O Material-UI suporta as versões mais recentes e estáveis de todos os principais navegadores e plataformas. Suporta também o Internet Explorer 11. Você não precisa fornecer nenhum poyfill JavaScript, pois ele gerencia recursos não suportados do navegador internamente e isoladamente.

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |


Como o Googlebot usa um serviço de renderização da Web (WRS) para indexar o conteúdo da página, é essencial que o Material-UI o suporte. [O WRS atualiza regularmente o mecanismo de renderização usado por ele](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). Você pode esperar que os componentes do Material-UI sejam renderizados sem grandes problemas.

## Servidor

Por suportar renderização no lado do servidor, o Material-UI precisa oferecer suporte as versões mais recentes e estáveis do Node.js. Sempre que possível, as versões [ LTS que estão em manutenção ](https://github.com/nodejs/Release#lts-schedule1) são suportados. Recomendamos usar o **node v10.x** ou mais recente. No entanto, ainda suportamos **node v8.x**. O suporte do **node v8.x** será interrompido na Versão 5 do Material-UI.

### Prefixos CSS

Esteja ciente de que alguns recursos do CSS [ exigem ](https://github.com/cssinjs/jss/issues/279) uma etapa adicional de pós-processamento que adiciona prefixos específicos do browser. Estes prefixos são adicionados automaticamente no cliente graças ao [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

O CSS exibido nesta documentação é processado com [`autoprefixer`](https://www.npmjs.com/package/autoprefixer). Você pode usar [a implementação encontrada na documentação](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) como inspiração. Esteja ciente de que isso tem uma implicação no desempenho da página. É algo essencial para páginas estáticas, mas precisa ser equilibrado com não fazer nada ao renderizar páginas dinâmicas.

## React

Material-UI suporta as versões mais recentes do React, começando com ^16.8.0 (o que possui os hooks). Dê uma olhada nas [versões](https://material-ui.com/versions/) mais antigas para compatibilidade.

## TypeScript

Material-UI requer como versão mínima o TypeScript 3.2.