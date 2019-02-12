# Comparação com outras bibliotecas

<p class="description">Você está aqui porque quer saber se o Material-UI pode resolver seus problemas específicos da melhor forma. Isso é o que esperamos responder para você aqui.</p>

Esta é definitivamente uma das páginas mais difíceis no guia para se escrever, mas sentimos que é importante. É provável que você já teve problemas que tentou resolver e usou outra biblioteca para resolvê-los.

Gostaríamos da sua ajuda para manter este documento atualizado porque o mundo do JavaScript se move rapidamente! Se você notar uma imprecisão ou algo que não parece certo, por favor nos avise [abrindo uma questão](https://github.com/mui-org/material-ui/issues/new?title=[docs]+Inaccuracy+in+comparison+guide).

Nós cobrimos as seguintes bibliotecas:

- [Material-UI](#material-ui)
- [Material Design Lite (MDL)](#material-design-lite-mdl)
- [Material Components Web (MDC-web)](#material-components-web-mdc-web)
- [Materialize](#materialize)
- [React Toolbox](#react-toolbox)

## Material-UI

![estrelas](https://img.shields.io/github/stars/mui-org/material-ui.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/core.svg)

Vamos nos esforçar muito para evitar preconceitos, embora como equipe principal, nós obviamente gostamos muito de Material-UI ❤️. There are some problems we think it solves better than anything else out there; if we didn’t believe that, we wouldn’t be working on it 

Nós queremos ser justos e precisos, então onde outras bibliotecas oferecem vantagens significativas, tentamos listá-las também.

## Material Design Lite (MDL)

![estrelas](https://img.shields.io/github/stars/google/material-design-lite.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-design-lite.svg)

Material Design Lite, sendo uma implementação do Material Design muito bem pensada, foi mantida principalmente pelos Desenvolvedores de Relações do Google. Hoje, **o projeto não é mais mantido**. Então, o que aconteceu?

A equipe de Material Components Web começou a criar o MDC-web como "MDL v2", porém, após colaborarem nele por alguns meses, ambos os times sentiram que era melhor colocar o projeto sob supervisão da equipe de Material Design. Essa mudança significou uma re-orientação das metas longe de simplesmente "acrescentando uma aparência e comportamento Material Design" para websites, e com o objetivo de uma implementação canônica Material Design para toda a plataforma web.

## Material Components Web (MDC-web)

![estrelas](https://img.shields.io/github/stars/material-components/material-components-web.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-components-web.svg)

Nós estamos muito felizes em ver este projeto recebendo apoio do Google, e sua equipe de design. Isso é um sinal claro de que a [Especificação Material Design](https://material.io/design/) veio para ficar, porque eles continuam a investir nela.

### Frameworks and libraries

Material-UI focuses exclusively on the React library, although, given that Preact supports the very same API, we hope to soon support it too. Supporting one framework allows us to do less but do it better.

This comes in different flavors:

- Having fewer constraints, we can make trade-offs specific to our target framework. We have fewer edge-cases to take into account.
- We can spend more time on nailing the React use case.

MDC-web was designed from the ground up to be fully compatible with 3rd party JS frameworks and libraries. They list 3rd-party framework integration projects in the github [README](https://github.com/material-components/material-components-web/#material-components-for-the-web)

### Styling solution

[Material-UI carries a heavy legacy with styles](https://github.com/oliviertassinari/a-journey-toward-better-style). Our very first release was using LESS, but seeing the limitation of this solution, we quickly started looking into alternatives. Our first migration was towards using an inline-style solution. This was promising:

- It allowed us to remove the dependency on the LESS toolchain for our users. We removed one important friction in the installation process. (**simpler**)
- We were able to change the theme at runtime, nest different themes, and have dynamic styles. (**more powerful**)
- We reduced the loading time by breaking the big monolithic CSS file in order to enable code splitting. (**faster**)
- The style override story became more intuitive, as we were free of CSS specificity issues. (**simpler**)

Eventually, we reached the limitations of inline-styles and moved toward a CSS-in-JS solution. This transition was made without losing the enhancements the first migration introduced **We strongly think that CSS-in-JS is the future of the web platform**. You can [learn more about our new styling solution](/customization/css-in-js/) in the documentation.

MDC-web relies on SCSS as Bootstrap v4. The SCSS architecture is pretty close to LESS - a technology we replaced for its limitations.

### The vision

Our vision is to provide an elegant implementation of the Material Design guidelines **and more**.

> The Material Design guidelines are an incredible starting point, but they do not provide guidance on all aspects or needs of an application. In addition to the guideline-specific implementation, we want Material-UI to become whatever is generally useful for application development, all in the spirit of the Material Design guidelines.
> 
> *[An extract taken from the [vision section](/discover-more/vision/) of the documentation.]*

We want to see businesses succeeding in taking advantage of Material-UI to ship an awesome UI to their users while having it match their brand, so we have invested a lot in the customization capabilities of Material-UI.

The only goal of MDC-Web is to be a Material Design implementation for the web platform. **Nothing more, nothing less**. They will not consider making changes to the components - especially UX changes - that would facilitate additional flexibility at the cost of breaking with the core Material Design system, as that is a non-goal of the project. *[source](https://github.com/mui-org/material-ui/issues/6799#issuecomment-299925174)*

### Tests

Both projects invest a lot in tests. At the time of writing, both projects have over 99% test coverage:

- Material-UI has 1200+ unit tests running on Chrome 49, Firefox 45, Safari 10 and Edge 14.
- MDC-web has 1200+ unit tests running on all the major browsers.

Still, there is one thing that sets Material-UI apart and it's key: We have [hundreds of visual regression tests](https://www.argos-ci.com/mui-org/material-ui) when MDC-web doesn't have any. With visual regression tests, you don't have to make any trade-off:

- You can spend less time making sure every contribution doesn't introduce unexpected regressions. The **less** time you spend on a single contribution, the **more** contributions you can accept.
- You can merge new contributions without digging much. Effectively, you are not waiting for users to report regressions. It's **efficient** and **improves the library quality**.

## Materialize

![estrelas](https://img.shields.io/github/stars/Dogfalo/materialize.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/materialize-css.svg)

### Browser support

Materialize supports a wider range of browsers than Material-UI does, for instance, they support IE 10 while [we only support IE 11](/getting-started/supported-platforms/). Only supporting IE 11 allows us to take full advantage of the flexbox layout. IE 10 has many issues with flexbox.

### Styling solution

Materialize uses SCSS, a styling architecture Material-UI moved away from 2 years ago. We explain why in the [MDC-web section](#styling-solution) above.

## React Toolbox

![estrelas](https://img.shields.io/github/stars/react-toolbox/react-toolbox.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-toolbox.svg)

### Styling solution

While both React Toolbox and Material-UI are betting on CSS-in-JS, we have taken a different trade-off. Material-UI has chosen **JSS** while React Toolbox started rewriting their library with **styled-components**. We picked JSS over styled-components for the following reason:

- JSS exposes a low-level API: 
  - We are free to model it to our unique needs, which has allowed us to build one of the most advanced override and theming mechanism.
  - It's not coupled to React like `styled-components` is. It has the potential to reach any 3rd party JS frameworks and libraries. The parallels can be made with SCSS. SCSS is compatible with any JavaScript frameworks and libraries, helping it to get traction in the community.
- JSS is [two times faster](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md) to mount components than styled-components is, with all the optimization turned on.

This is not to say that Material-UI is opinionated about how users write their styles. You can use styled-components if you would like to do so.