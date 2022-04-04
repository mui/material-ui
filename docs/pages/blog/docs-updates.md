---
title: 'New documentation structure: better navigate MUI's products'
description: From now on, each MUI product will live in its own documentation. Find out how that is better for you.
date: 2022-04-04T00:00:00.000Z
authors: ['danilo-leal']
tags: ['News']
---

Last year, we rebranded the company as the first step into consolidating a new phase.
However, we didn't make any major structural changes to the documentation other than the design.
As we plan to release new products that are outside of the scope of Material UI, it'd be confusing to keep everything under the same roof.
That's why, from now on, each product will have its own documentation, to clarify the boundaries between them and to facilitate navigation if your interest lies in one specific product.

## Wait... what MUI products are you talking about?

Implementing Material Design has become only a portion of what we offer today.
Currently, our main two products are:

- **MUI Core:** a collection of libraries that offers you foundational components, which includes Material UI, MUI Base (unstyled components), MUI System, and more. It really is a product line.
- **MUI X:** a collection of advanced components, meant primarily to support data-heavy applications. Differently from Core, each component lives under its own package.

## What has changed?

All MUI products are still under the [mui.com](http://mui.com) domain but each of them now has an isolated URL and, therefore, documentation.
We added an identifier and menu at the top left of the docs to ease navigation:

[product identifier]

As for the URLs, this is how they look now:

- Material UI: [https://mui.com/material-ui/_](https://mui.com/material-ui/getting-started/installation/)
- MUI Base: [https://mui.com/base/_](https://mui.com/base/getting-started/installation/)
- MUI System: [https://mui.com/system/_](https://mui.com/system/basics/)
- MUI X - Data grid: [https://mui.com/x/react-data-grid/_](https://mui.com/x/react-data-grid/)
- MUI X - Date and time pickers: [https://mui.com/x/react-date-pickers/_](https://mui.com/x/react-date-pickers/getting-started/)

## What do I gain?

We believe separating the documentation will significantly improve your navigation experience.
This rings especially true for MUI Base and MUI X contributors and customers, considering that we have reworked how search works.
Now searching for any Data Grid specific article, for example, is much faster.

## Moving forward

This separation will become increasingly beneficial as each product grows, such as additional components in MUI X and MUI Base.
With it, comes more content to share and an even greater need for better space to accommodate it.

It will also help with the slight confusion we caused by introducing a different design to our marketing website, especially considering that our only design system package so far is Material UI.
However, as we move forward working on [the second design system package](https://deploy-preview-31620--material-ui.netlify.app/experiments/), the separation will allow each to use their default styles, which will certainly help to avoid confusion about what the component looks like by installing the library, as it was when v4's docs used Material Design without any modification.

If you have any feedback or suggestions, we definitely want to hear them.
Go over to Material UI's GitHub repository and open an issue starting with [docs].
Happy developing!
