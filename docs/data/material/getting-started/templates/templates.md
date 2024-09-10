---
productId: material-ui
title: New Free React Templates
---

# React Templates

<p class="description">Browse our collection of free React templates to get started building your app with Material UI, including a React dashboard, React marketing page, and more.</p>

<!-- #default-branch-switch -->

## Free templates

Our curated collection of free Material UI templates includes dashboards, marketing pages, sign-in and sign-up pages, a blog, a checkout flow, and more.
They can be combined with one of the [example projects](/material-ui/getting-started/example-projects/) to form a complete starter.

Sections of each layout are clearly defined either by comments or use of separate files,
making it simple to extract parts of a page (such as a "hero unit", or footer, for example)
for reuse in other pages.
For multi-part examples, a table in the README at the linked source code location describes
the purpose of each file.

{{"component": "modules/components/MaterialFreeTemplatesCollection.js"}}

See any room for improvement?
Please feel free to open an [issue](https://github.com/mui/material-ui/issues/new/choose) or a [pull request](https://github.com/mui/material-ui/pulls) on GitHub, following the [contribution guide](/material-ui/getting-started/faq/#how-can-i-contribute-to-the-free-templates).

## Premium templates

Looking for something more? You can find complete templates and themes in the <a href="https://mui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=templates-store">premium template section</a>.

<a href="https://mui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=templates-store">
<span class="only-light-mode">
<img src="/static/images/themes-display-light.png" alt="The MUI Store includes several carefully curated React templates using Material UI" width="2280" height="1200" />
</span>
<span class="only-dark-mode">
<img src="/static/images/themes-display-dark.png" alt="The MUI Store includes several carefully curated React templates using Material UI" width="2280" height="1200" />
</span>
</a>

## Toolpad Core (beta)

[Toolpad Core](https://mui.com/toolpad/core/introduction/) is a framework designed to build dashboards and internal tools. It leverages the existing suite of components offered by Material UI and ties them together to help you create applications quickly.

{{"demo": "../../components/app-bar/DashboardLayoutBasic.js", "height": 400, "iframe": true, "hideToolbar": true}}

## Contributing

### Template page

Create a new page in the `docs/pages/material-ui/getting-started/templates/<name>.js` directory with the following code:

```js
import * as React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import Template from 'docs/data/material/getting-started/templates/<name>/<Template>';

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <Template />
      </TemplateFrame>
    </AppTheme>
  );
}
```

Then create a folder in the `docs/data/material/getting-started/templates/<name>` directory and add the template files.

### Shared theme

The template must use `AppTheme` from `../shared-theme/AppTheme` to ensure a consistent look and feel across all templates.

If the template contains custom themed components, for example the dashboard template has MUI X themed components, pass the themed components to the `AppTheme`'s `themedComponents` prop:

```js
import AppTheme from '../shared-theme/AppTheme';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>...</AppTheme>
  )
}
```

### Color mode toggle

The shared theme provides 2 appearance of the color mode toggle, `ColorModeSelect` and `ColorModeIconDropdown`.
You can use either of them in your template, it will be hidden within the `TemplateFrame` but will be visible in the Code Sandbox and Stackblitz.

### Template frame

If the template has a sidebar or a header that needs to stick to the top, refer to the CSS variable `--template-frame-height` to adjust.

For example, the dashboard template has a fixed header that needs to be accounted for the template frame height:

```js
<AppBar
  position="fixed"
  sx={{
    top: 'var(--template-frame-height, 0px)',
    // ...other styles
  }}
>
```

This will make the `AppBar` stay below the `TemplateFrame` in a preview mode but stick to the top in the Code Sandbox and Stackblitz.
