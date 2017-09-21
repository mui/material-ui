# Comparison with other libraries

This is definitely one of the most challenging pages in the guide to write, but we do feel it’s important.
Odds are, you’ve had problems you tried to solve and you’ve used another library to solve them.
You’re here because you want to know if Material-UI can solve your specific problems better.
That’s what we hope to answer for you.

We’d like your help keeping this document up-to-date because the JavaScript world moves fast! If you notice an inaccuracy or something that doesn’t seem quite right, please let us know by [opening an issue](https://github.com/callemall/material-ui/issues/new?title=Inaccuracy+in+comparisons+guide).

## Material-UI

![stars](https://img.shields.io/github/stars/callemall/material-ui.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/material-ui.svg)

We try very hard to avoid bias. As the core team, we obviously like Material-UI a lot ❤️.
There are some problems we think it solves better than anything else out there.
If we didn’t believe that, we wouldn’t be working on it.
We do want to be fair and accurate though.
Where other libraries offer significant advantages, such as Material Components Web’s support by Google, we try to list these as well.

## Material Design Lite (MDL)

![stars](https://img.shields.io/github/stars/google/material-design-lite.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/material-design-lite.svg)

Material Design Lite, while a very well-thought-out Material Design implementation, was primarily maintained by Developer Relations at Google.
Today, **the project is no longer maintained**. So what happened?

The Material Components Web team started out building MDC-web as "MDL v2", but after collaborating on it for a few months, both teams felt it best to bring the project under the Material Design team's purview.
This shift meant a re-orientation of goals away from simply "adding a Material Design look and feel" to websites, and towards the goal of a canonical Material Design implementation for the entire web platform.

## Material Components Web (MDC-web)

![stars](https://img.shields.io/github/stars/material-components/material-components-web.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/material-components-web.svg)

We are very happy to see this project supported by Google and his design team.
It sends a clear signal. The [material design specifiction](https://material.io/guidelines/) is
here to stay, they keep investing resources on it.

## Frameworks and libraries

Material-UI focuses exclusively on the React library.
Given Preact support the very same API, we hope supporting it too soon.
Supporting one framework is allowing us to do less but doing it better.
This comes in different flavors:
- Having fewer constraints, we can make tradeoff specific to out target framework.
We have fewer edge-cases to take into account.
- We can spend more time on nailing the React use case.

MDC-web was designed from the ground up to be fully compatible with 3rd party JS frameworks and libraries.
They provide a [react framework integration example](https://github.com/material-components/material-components-web/tree/master/framework-examples/react).
They used it as proof of concept to vet the viability of our architecture model.

### Styling solution

[Material-UI carries a heavy legacy with styles](https://github.com/oliviertassinari/a-journey-toward-better-style).
Our very first release was using LESS.
But seeing the limitation of this solution, we quickly started looking into alternatives.
Our first migration was toward using an inline-style solution.
It was promising:
- It allowed us to remove the dependency on the LESS toolchain for our users.
We removed one important friction of the installation process. (**simpler**)
- We were able to change the theme at runtime, nesting different theme and having dynamic styles. (**more powerful**)
- We reduce the loading time. We were able to break the big CSS file monolith in order to enable code splitting. (**faster**)
- The style override story had become more intuitive, we were free of CSS specificity issues. (**simpler**)

Eventually, we reached the limitations of the inline-style solution and moved toward a CSS-in-JS
solution. This transition was made without losing the enhancement of the first migration 💅.
**We strongly think that CSS-in-JS is the future of the web platform**.
You can learn more about our [new styling solution in the documentation](/customization/css-in-js).

MDC-web relies on SCSS as Bootstrap v4. SCSS architecture is pretty close to LESS.
A technology we replaced for his limitations.

### The vision

Material-UI vision is to provide an elegant implementation of the Material Design guidelines **and more**.

> The Material Design guidelines are an incredible starting point, but they do not provide guidance on all aspects or needs of an application. In addition to the guidelines-specific implementation, we want Material-UI to become whatever is generally useful for application development, all in the spirit of the Material Design guidelines.

> *[An extract taken from our vision section in the documentation.](/discover-more/vision/)*

We want to see business succeeding in taking advantage of Material-UI to ship an awesome UI to their users while having it match their brand.
That's why we have been investing a lot the customization capabilities of Material-UI.

The only goal of MDC-Web is to be a Material Design implementation for the web platform. **Nothing more, nothing less**. They will not consider making changes to the components - especially UX changes - that would facilitate additional flexibility at the cost of breaking with the core Material Design system, as that is a non-goal of the project. *[source](https://github.com/callemall/material-ui/issues/6799#issuecomment-299925174)*

## Materialize

![stars](https://img.shields.io/github/stars/Dogfalo/materialize.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/materialize-css.svg)

### Browser support

Materialize support a wider range of browsers then Material-UI.
For instance, they support IE 10 while [we only support IE 11](/getting-started/supported-platforms).
Only supporting IE 11 is allowing us to fully take advantage of the flexbox layout.
IE 10 has many issues with flexbox.

### Styling solution

Materialize use SCSS, a styling architecture Material-UI as been moving away 2 years ago.
[We explain why in the MDC-web section](#styling-solution).

## React Toolbox

![stars](https://img.shields.io/github/stars/react-toolbox/react-toolbox.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/react-toolbox.svg)

### Styling solution

While both React Toolbox and Material-UI are betting on CSS-in-JS, we have been taking a different tradeoff.
Material-UI has chosen **JSS** while React Toolbox started rewriting the library with **styled-components**. We have been picking JSS over styled-components for the following reason:

- JSS exposes a low-level API:
  - We are free to model it to our unique needs.
 It has allowed us to build one of the most advanced override and theming mechanism.
  - It's not coupled to React like `styled-components` is. It has the potential to reach any 3rd party JS frameworks and libraries. The parallels can be made with SCSS. SCSS is compatible with any JavaScript frameworks and libraries, helping it to get traction in the community.
- JSS is two times faster than style-components with [all the optimization turned on](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md) to mount components.

This is without to say that Material-UI is unoptiniated around how users are writing their styles.
You can use styled-component if you would like to do so.
