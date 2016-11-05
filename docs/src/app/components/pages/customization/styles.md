## Styles

All Material-UI components have their styles defined **inline**.
You can read the [discussion thread](https://github.com/callemall/material-ui/issues/30)
regarding this decision as well as [this presentation](https://speakerdeck.com/vjeux/react-css-in-js)
discussing CSS in JS.

However, we have experienced important **limitations** with this approach.
We are migrating away from this approach.
You can follow this [discussion thread](https://github.com/callemall/material-ui/issues/4066) for more context or have a look at this [presentation](https://github.com/oliviertassinari/a-journey-toward-better-style).
Just to state few limitations:
 - Poor performance as recomputing all the styles at each render
 - Hustle debugging
 - Server-side media queries
 - Server-side pseudo element
 - Longer time to interaction with server-side rendering (E.g. `:hover`)
