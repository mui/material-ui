# Material UI for Figma

<p class="description">Enhance designer-developer collaboration between Material UI and Figma.</p>

## Getting started

Material UI for Figma consists of representations of the library's React components in Figma so designers and developers can communicate and iterate more efficiently.
In Figma, you will see:

- extra components and features that aren't covered in Material Design
- components with the same design as Material UI
- closely mirroed terminology for props, variables, design tokens, and other values

### Community vs. full version

The Material UI design kit is available in the [community (free) version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x) and the [full (paid) version](https://mui.com/store/items/figma-react/).

|                                   | Community | Full version |
| :-------------------------------- | --------: | -----------: |
| Components without customizations |       All |          All |
| Components with customizations    |         4 |          All |
| Figma variables                   |         - |           ✅ |

### Installing the full version

Start by extracting the `.zip` archive which contains the `.fig` files.
Then you can either follow [Figma's import guide](https://help.figma.com/hc/en-us/articles/360041003114-Import-files-into-Figma) or [add it to your team library](https://help.figma.com/hc/en-us/articles/360041051154-Getting-Started-with-Team-Library).

## Theme

### Local variables

The design kit uses Figma's local variables to create a collection of styles that is comparable to the theme structure of the Material UI code.
Follow the steps shown in the video to see all of the variables available:

<iframe width="100%" height="490" src="https://www.youtube.com/embed/u3zR6p-OjKQ?si=DDVEsedwmJQeik3T" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

### Customizing colors

Make sure you use the variables panel to customize colors, as shown in the video below:

<iframe width="100%" height="490" src="https://www.youtube.com/embed/YuzkWFm0-bA?si=XvgPR0vNGtiBPqKY" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

### Customizing typography

On the other hand, typography styles are not available as local variables but as local styles.
The customization experience is similar to modifying colors, though, as shown in the video below:

<iframe width="100%" height="490" src="https://www.youtube.com/embed/HepVDfrLmak?si=gklG_3ZZyxDWzlPM" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

### Switching between light and dark modes

The design kits leverage Figma's local variables to quickly offer you a way to toggle the variable mode to either light or dark, as shown in the video below:

<iframe width="100%" height="490" src="https://www.youtube.com/embed/ydTF1HhLnJM?si=1Fj4CFLgVavfg4Fz" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

## Components

### Editing the main components

The Material UI for Figma Design Kit uses a plugin called [Similayer](https://www.figma.com/community/plugin/735733267883397781/Similayer) to create multiple variants of a given component that essentially build up to the main component.

<iframe width="100%" height="490" src="https://www.youtube.com/embed/eHBk0FbS0P8?si=QbOiMU2F1yvGB6s8" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

### Table component

#### Adding new columns

<iframe src="https://www.loom.com/embed/6dd71cc374bc4d84af35ebb75d107d38?sid=1d3a4790-4c28-433e-94ce-97dd969601dd" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width: 100%; height: 500px;"></iframe>

#### Adding new columns in the main component

<iframe width="100%" height="490" src="https://www.youtube.com/embed/s_n3LHm1daI?si=_QbXvtYPkc8EBd5d" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

## Code sync

You can export theme tokens and component customizations to code if paired with [the Connect Figma plugin](/material-ui/design-resources/connect/).
Material UI for Figma has been built to be as close to the React components as possible, making it for a fluid integration with code.

Learn more about the Material UI theme structure by visiting the [Theming](https://mui.com/material-ui/customization/theming/) and [Default theme viewer](https://mui.com/material-ui/customization/theming/) pages.

## Using new design kit versions

We generally don't release breaking changes in the updates—we add new content instead.
If you need to replace a single component that's been updated, there are a couple of options:

1. Add the new version of the design kit as a library and use [the new Figma library swap feature](https://www.youtube.com/watch?v=GQ2jztKpxLk). The components must have the same names in both libraries.
2. Observe the new component and re-apply the changes to the existing projects. This is the recommended approach when you need to update multiple projects.
3. Copy and paste the new component into your existing project, give it a different temporary name, then re-link tokens to the new component. When using [Select Similar plugins](https://www.figma.com/community/plugin/792767780551514994/Select-Similar) this shouldn't take more than five minutes. Then you can remove the old component and update the new component name.
