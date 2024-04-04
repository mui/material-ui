# Material UI for Figma

<p class="description">Enhance the designer-developer working with Material UI collaboration.</p>

## Getting started

Material UI for Figma consists of a representation of the React component in Figma so that designers and developers can communicate and iterate more efficiently as they work with a set of seamlessly integrated tools.

### Community vs. full version

The Material UI design kits is available in [community (free)](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x) and [full (paid)](https://mui.com/store/items/figma-react/) versions.
Here's what you can expect from each one of them:

|                                   | Community | Full version |
| :-------------------------------- | --------: | -----------: |
| Components without customizations |       All |          All |
| Components with customizations    |         4 |          All |
| Figma variables                   |         - |           ✅ |

### How to install the full version?

Start by extracting the `.zip` archive containing a couple of `.fig` files.
Then, you can either follow [Figma's import guide](https://help.figma.com/hc/en-us/articles/360041003114-Import-files-into-Figma) or [add it to your team library](https://help.figma.com/hc/en-us/articles/360041051154-Getting-Started-with-Team-Library).

## Theme

### When I open the local variables panel, I see only 2 values; where are the rest?

When opening the local variables panel for the first time, you will see this:

<!-- ![Screenshot 2023-08-08 at 01.09.47.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f2dd392-50f8-4b25-99ef-c52815fbc803/Screenshot_2023-08-08_at_01.09.47.png) -->

To access the rest of the props, navigate to the variable collections, similar to the code's `theme` structure.
Then, follow the steps shown in the video below:

<iframe width="100%" height="490" src="https://www.youtube.com/embed/u3zR6p-OjKQ?si=DDVEsedwmJQeik3T" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

### How can I customize colors?

The design kit uses variables, meaning colors can only be modified from the variables panel.
To access it, ensure you do not have any layers or frames selected, allowing you to view the global right-hand panel.

<iframe width="100%" height="490" src="https://www.youtube.com/embed/YuzkWFm0-bA?si=XvgPR0vNGtiBPqKY" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

### How do I customize the typography?

Unfortunately, variables do not yet support typography variables, but this feature is planned for the future.
Until then, changing global styles, such as the font family, requires some effort (approximately 5 minutes).
We have already defined everything as a style, so your only point of command is the right-hand panel.

<iframe width="100%" height="490" src="https://www.youtube.com/embed/HepVDfrLmak?si=gklG_3ZZyxDWzlPM" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

### Switching modes (light/dark)

<iframe width="100%" height="490" src="https://www.youtube.com/embed/ydTF1HhLnJM?si=1Fj4CFLgVavfg4Fz" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

## Code sync

### Do the kits output React code?

You can export theme tokens and component customizations to code if paired with [the Connect Figma plugin](/material-ui/design-resources/connect/).
Material UI for Figma has been built to be as close to the React components as possible, making it for a fluid integration with code.

### How do I migrate from Design to React?

The Material UI for Figma design kit components are as close as possible to the React components.
In practice, you will find the same names, design tokens, default values, and anything contributing to reducing the gap between the two realms.
That said, we recommend using the design tokens as much as possible to perform component customizations, as it's easier to share the values between Figma and React.

:::info
A "design token" is simply a variable that can be shared with the React implementation—for example, the font size pixels of the `body2` variant.
:::

Learn more about the Material UI theme structure by visiting the [Theming](https://mui.com/material-ui/customization/theming/) and [Default theme viewer](https://mui.com/material-ui/customization/theming/) pages.

## FAQ

### How can I edit the master components?

Master components were difficult to maintain, and it required sticking to the elements available in that master instance only, so we decided to leave the master components in favor of using a plugin called [Similayer](https://www.figma.com/community/plugin/735733267883397781/Similayer).

<iframe width="100%" height="490" src="https://www.youtube.com/embed/eHBk0FbS0P8?si=QbOiMU2F1yvGB6s8" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

### Why build "Material UI for Figma" instead of using Google's Material Design Figma file?

Material UI is an _independent_ React implementation of Material Design.
It fills the gaps that Google's design have with the MUI's expertise around web development best practices.

Anyone generally interested in Material Design can benefit from the Material UI for Figma library, but it is particularly great for designers who work with developers using the actual Material UI React library.
The way the components have been structured in Figma (also considering properties and variables) is meant to closely mirror what you'd experience in the code.

You should expect to see:

- extra components and features that aren't covered in Material Design
- the same UI output
- the same terminology used between Figma and code for props, design tokens, etc.

### Table component

#### How do I add a new column in the table?

<iframe src="https://www.loom.com/embed/6dd71cc374bc4d84af35ebb75d107d38?sid=1d3a4790-4c28-433e-94ce-97dd969601dd" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width: 100%; height: 500px;"></iframe>

#### How do I add new columns in the main component?

<iframe width="100%" height="490" src="https://www.youtube.com/embed/s_n3LHm1daI?si=_QbXvtYPkc8EBd5d" title="YouTube video player" frameborder="0" allow="picture-in-picture; web-share" allowfullscreen></iframe>

## Updates

### I've received an update; how can I replace one component with another?

Unfortunately, Figma does not work like an npm package that we can update the dependencies of yet!
Most of the time, we don't release breaking changes in the updates.
We add new content. For a single component replacement, there are a couple of options:

1. Add the new version of the design kit as a library and use [the new Figma library swap feature](https://www.youtube.com/watch?v=GQ2jztKpxLk). Ensure the components have the same name in the old library and the new one for this to work properly.
2. Observe the new component and re-apply the changes to the existing projects. This is the recommended approach when having a high number of projects.
3. Copy-paste the new component in your existing project, temporarily rename it differently (for example, "New Button"), and re-link tokens to the New Button (using [Select Similar plugins](https://www.figma.com/community/plugin/792767780551514994/Select-Similar) shouldn't take more than 5 minutes). Having this done, you can replace the old Button with the New Button.
