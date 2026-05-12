---
productId: material-ui
title: React Avatar component
components: Avatar, AvatarGroup, Badge
githubLabel: 'scope: avatar'
githubSource: packages/mui-material/src/Avatar
---

# Avatar

<p class="description">Avatars are found throughout material design with uses in everything from tables to dialog menus.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Image avatars

Image avatars can be created by passing standard `img` props `src` or `srcSet` to the component.

{{"component": "../data/material/components/avatars/demos/image/index.ts"}}

## Letter avatars

Avatars containing simple characters can be created by passing a string as `children`.

{{"component": "../data/material/components/avatars/demos/letter/index.ts"}}

You can use different background colors for the avatar.
The following demo generates the color based on the name of the person.

{{"component": "../data/material/components/avatars/demos/background-letter/index.ts"}}

## Sizes

You can change the size of the avatar with the `height` and `width` CSS properties.

{{"component": "../data/material/components/avatars/demos/size/index.ts"}}

## Icon avatars

Icon avatars are created by passing an icon as `children`.

{{"component": "../data/material/components/avatars/demos/icon/index.ts"}}

## Variants

If you need square or rounded avatars, use the `variant` prop.

{{"component": "../data/material/components/avatars/demos/variant/index.ts"}}

## Fallbacks

If there is an error loading the avatar image, the component falls back to an alternative in the following order:

- the provided children
- the first letter of the `alt` text
- a generic avatar icon

{{"component": "../data/material/components/avatars/demos/fallback/index.ts"}}

## Grouped

`AvatarGroup` renders its children as a stack. Use the `max` prop to limit the number of avatars.

{{"component": "../data/material/components/avatars/demos/group/index.ts"}}

### Total avatars

If you need to control the total number of avatars not shown, you can use the `total` prop.

{{"component": "../data/material/components/avatars/demos/total/index.ts"}}

### Custom surplus

Set the `renderSurplus` prop as a callback to customize the surplus avatar. The callback will receive the surplus number as an argument based on the children and the `max` prop, and should return a `React.ReactNode`.

The `renderSurplus` prop is useful when you need to render the surplus based on the data sent from the server.

{{"component": "../data/material/components/avatars/demos/custom-surplus/index.ts"}}

### Spacing

You can change the spacing between avatars using the `spacing` prop. You can use one of the presets (`"medium"`, the default, or `"small"`) or set a custom numeric value.

{{"component": "../data/material/components/avatars/demos/spacing/index.ts"}}

## With badge

{{"component": "../data/material/components/avatars/demos/badge/index.ts"}}

## Avatar upload

{{"component": "../data/material/components/avatars/demos/upload/index.ts"}}
