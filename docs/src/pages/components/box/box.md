---
title: React Box component
githubLabel: 'component: Box'
---

# Box

<p class="description">The Box component serves as a wrapper component for most of the CSS utility needs.</p>

The Box component packages [all the style functions](/system/basics/#all-inclusive) that are exposed in `@material-ui/system`.
It's created using the `experimentalStyled()` function of `@material-ui/core/styles`.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Example

[The palette](/system/palette/) style function.

## The sx prop

All system properties are available via the `sx` prop. In addition, this prop allows you to specify any other CSS rules you may need. Here's an example of how you can use it:

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## Overriding Material-UI components

The Box component wraps your component.
It creates a new DOM element, a `<div>` by default that can be changed with the `component` prop.
Let's say you want to use a `<span>` instead:

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

This works great when the changes can be isolated to a new DOM element.
For instance, you can change the margin this way.

However, sometimes you have to target the underlying DOM element.
As an example, you may want to change the border of the Button.
The Button component defines its own styles. CSS inheritance doesn't help.
To workaround the problem, you have two options:

1. Use the [`sx`](/system/basics/#the-sx-prop) prop directly on the child if it is Material-UI component

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>Save</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Save</Button>
```

2. Use render props

The Box children accepts a render props function. You can pull out the `className`.

{{"demo": "pages/components/box/BoxRenderProps.js", "defaultCodeOpen": true }}

> ⚠️ The CSS specificity relies on the import order.
> If you want the guarantee that the wrapped component's style will be overridden, you need to import the Box last.

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Name                                                     | Type                                                                                                        | Default                                 | Description                                                                                |
| :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :----------------------------------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;\*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br>&nbsp;func<br></span>                               |                                         | Box render function or node.                                                               |
| <span class="prop-name">component</span>                 | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">sx</span>                        | <span class="prop-type">object</span>                                                                       | <span class="prop-default">{}</span>    | Accepts all system properties, as well as any valid CSS properties.                        |

## System props

As a CSS utility component, the `Box` also supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component.
For instance, a margin-top:

```jsx
<Box mt={2}>
```
