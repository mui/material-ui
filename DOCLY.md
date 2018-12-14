# Changes made to original files

## @material-ui/icons

```
packages/material-ui-icons/src/utils/createSvgIcons

- import SvgIcon from '@material-ui/core/SvgIcon';
+ import SvgIcon from '@docly/web/SvgIcon';
```

The built icon files uses the `SvgIcon` component on runtime, which needs to import SvgIcon from `@docly/web` rather than `@material-ui`.

We refer to our npm-package, which is necessary if we want to publish the icon library as a separate package like it's done in m-ui: `@material-ui/icons` could be `@docly/icons`. This would probably be a good idea in case we want to add custom icons and/or pictograms to our icon collection.

Another tried option was to refer to the `SvgIcon` using it's relative path; it works in the library but breaks the docs site in dev-mode:

```
+ import SvgIcon from '../../SvgIcon';
```
