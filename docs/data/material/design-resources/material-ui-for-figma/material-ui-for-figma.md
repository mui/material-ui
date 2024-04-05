# Material UI for Figma

<p class="description">Enhance designer-developer collaboration between Material UI and Figma.</p>

## Getting started

Material UI for Figma consists of representations of the library's React components in Figma so designers and developers can communicate and iterate more efficiently.

### Community vs. full version

The Material UI design kit is available in [community (free)](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x) and [full (paid)](https://mui.com/store/items/figma-react/) versions.
Here's what you can expect from each:

|                                   | Community | Full version |
| :-------------------------------- | --------: | -----------: |
| Components without customizations |       All |          All |
| Components with customizations    |         4 |          All |
| Figma variables                   |         - |           ✅ |

### How to install the full version?

Start by extracting the `.zip` archive which contains the `.fig` files.
Then you can either follow [Figma's import guide](https://help.figma.com/hc/en-us/articles/360041003114-Import-files-into-Figma) or [add it to your team library](https://help.figma.com/hc/en-us/articles/360041051154-Getting-Started-with-Team-Library).

## Theme

### Values in the local variables panel

When opening the local variables panel for the first time, you will see this:

<!-- ![Screenshot 2023-08-08 at 01.09.47.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f2dd392-50f8-4b25-99ef-c52815fbc803/Screenshot_2023-08-08_at_01.09.47.png) -->

To access the rest of the props, navigate to the variable collections, similar to the code's `theme` structure.
Then, follow the steps shown in the video below:

<iframe width="100%" height="490" src="https://www.youtube.com/embed/u3zR6p-OjKQ?si=DDVEsedwmJQeik3T" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

### Customizing colors

The design kit uses variables, meaning colors can only be modified from the variables panel.
To access it, make sure you don't have any layers or frames selected so you can view the global right-hand panel.

<iframe width="100%" height="490" src="https://www.youtube.com/embed/YuzkWFm0-bA?si=XvgPR0vNGtiBPqKY" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

## Customizing typography

Unfortunately typography variables are not currently supported, but this feature is planned.
Until then, changing global styles such as the font family requires a few minutes of extra effort.
We have already defined everything as a style, so your only point of command is the right-hand panel.

<iframe width="100%" height="490" src="https://www.youtube.com/embed/HepVDfrLmak?si=gklG_3ZZyxDWzlPM" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

### Switching between light and dark modes

<iframe width="100%" height="490" src="https://www.youtube.com/embed/ydTF1HhLnJM?si=1Fj4CFLgVavfg4Fz" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

## Code sync

You can export theme tokens and component customizations to code if paired with [the Connect Figma plugin](/material-ui/design-resources/connect/).
Material UI for Figma has been built to be as close to the React components as possible, making it for a fluid integration with code.

### Transitioning from design to React code

The Material UI for Figma design kit components are as close as possible to the actual React components.
Both use the same names, design tokens, and default values.
We recommend using design tokens as much as possible to perform component customizations, because it's easier to share the values from Figma to React.

:::info
A _design token_ is any variable that can be shared with the React implementation—for example, the font size pixels of the `body2` variant.
:::

Learn more about the Material UI theme structure by visiting the [Theming](https://mui.com/material-ui/customization/theming/) and [Default theme viewer](https://mui.com/material-ui/customization/theming/) pages.

## FAQ

### How can I edit the master components?

Master components were difficult to maintain, and it required sticking to the elements available in that master instance only, so we decided to move away from master components in favor of a plugin called [Similayer](https://www.figma.com/community/plugin/735733267883397781/Similayer).

<iframe width="100%" height="490" src="https://www.youtube.com/embed/eHBk0FbS0P8?si=QbOiMU2F1yvGB6s8" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

### Why build "Material UI for Figma" instead of using Google's Material Design Figma file?

Material UI is an independent React implementation of Material Design.
It fills the gaps in Google's design system with the MUI team's expertise in web development best practices.

Anyone interested in Material Design can benefit from the Material UI for Figma library, but it is particularly great for designers who work with developers using the Material UI React library.
The way the components (as well as properties and variables) are structured in Figma is meant to closely mirror what you'd experience in the code.

In Figma, you will see:

- extra components and features that aren't covered in Material Design
- the same UI output as Material UI
- shared terminology for props, design tokens, and other values

### Table component

#### How do I add a new column in the table?

<iframe src="https://www.loom.com/embed/6dd71cc374bc4d84af35ebb75d107d38?sid=1d3a4790-4c28-433e-94ce-97dd969601dd" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width: 100%; height: 500px;"></iframe>

#### How do I add new columns in the main component?

<iframe width="100%" height="490" src="https://www.youtube.com/embed/s_n3LHm1daI?si=_QbXvtYPkc8EBd5d" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

## Updates

### I've received an update; how can I replace one component with another?

We generally don't release breaking changes in the updates—we add new content instead.
If you need to replace a single component that's been updated, there are a couple of options:

1. Add the new version of the design kit as a library and use [the new Figma library swap feature](https://www.youtube.com/watch?v=GQ2jztKpxLk). The components must have the same names in both libraries.
2. Observe the new component and re-apply the changes to the existing projects. This is the recommended approach when you need to update multiple projects.
3. Copy and paste the new component into your existing project, give it a different temporary name, then re-link tokens to the new component. When using [Select Similar plugins](https://www.figma.com/community/plugin/792767780551514994/Select-Similar) this shouldn't take more than five minutes. Then you can remove the old component and update the new component name.
