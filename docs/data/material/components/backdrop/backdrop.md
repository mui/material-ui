---
product: material-ui
title: Backdrop React Component
components: Backdrop, BackdropUnstyled
githubLabel: 'component: backdrop'
---

# Backdrop

<p class="description">The backdrop component is used to provide emphasis on a particular element or parts of it.</p>

The backdrop signals to the user of a state change within the application and can be used for creating loaders, dialogs, and more.
In its simplest form, the backdrop component will add a dimmed layer over your application.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Example

{{"demo": "SimpleBackdrop.js"}}

## Unstyled

The backdrop also comes with the Base package.
It's ideal for doing heavy customizations and minimizing bundle size.

```js
import BackdropUnstyled from '@mui/base/BackdropUnstyled';
```
