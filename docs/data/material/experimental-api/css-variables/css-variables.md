# CSS variables

<p class="description">This is a guide for the experimental API for using CSS variables with the Material-UI components.</p>

The CSS variables support is the most upvoted issue related to the `@mui/system` package.
Some time ago, we have added an experimental API in this package that will allow us using CSS variables in the styles of the components.
Now, we want to try and utilize this new feature in one of the Material UI components.

## Motivation

There are three main problem that would be solved by using CSS variables:

1. Dark theme flash on SSR
The light theme is being loaded fist by default, and only after that the dark mode is appearing, causing a flash when opening the page.
2. Bad debugging experience
If you open the dev tools and try to inpect the styles of some element, all you see is the calculated value it receives, without any information of where that value came from.
3. Performance
At this moment, the dark/light themes are considered as different input in the `ThemeProvider`, causing the whole tree to re-render when the theme is changed.

## Solution

At this moment, the API does not require any breaking changes for the Material UI components, however it depends on using a new experimental provider for the theme, called `Experimental_CssVarsProvider`.
Except for providing the theme in the inner React context, this new provider has as a responsibility to generate CSS variables out of all tokens in the theme that are not functions, and make them available in the context.
All these variables, are available under a key in the theme, named `vars`.
The structure of this object is identical to the theme structure, the only difference is that the values represent some css varaibles.

The best way to see this is by example:

