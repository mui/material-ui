---
title: 'New documentation structure: better navigate MUI's products'
description: From now on, each MUI product will live in its own documentation. Find out how that is better for you.
date: 2022-04-04T00:00:00.000Z
authors: ['danilo-leal']
tags: ['News']
---

Last year, when we rebranded the company as the first step into consolidating a new phase where we expanded our identity to reflect a larger area of focus, we didn't really do any structural major changes to the documentation other than the design. As we plan on releasing new products that are outside of the Material UI scope, it starts to become confusing to have everything live under the same roof. That's why from now on, each product will have its own sort of documentation, meant to clarify the boundaries between them and to facilitate navigation if your interest lies in a specific one only.

## Wait... what MUI product are you talking about?

MUI now started as Material UI, an independent implementation of Google's Material Design. The company and its flagship product held the same name for a while. However, as already mentioned, last year we changed the company to MUI—very similar, purposefully, but different enough. Working on Material Design had become only a portion of what we have been developing, so we felt the need to grow from it.

Our main two products now are:

- **MUI Core:** a collection of libraries that offers you foundational components, which includes Material UI but very soon will include other libraries as well. We see it as a product line.
- **MUI X:** a collection of advanced components, meant primarily to support data-heavy applications. Each component lives under its own package.

## What has changed?

All MUI products are still inside the [mui.com](http://mui.com) domain but each one of them now lives in an isolated URL and, therefore, documentation. We added on the top left of the docs an identifier and menu for you to locate yourself:

[product identifier screenshot]

As far as the URLs go, this is how they're now:

- **Material UI**: https://mui.com/material-ui/*
- **MUI Base**: https://mui.com/base/*
- **MUI System**: https://mui.com/system/*
- **MUI X - Data grid**: https://mui.com/x/react-data-grid/*
- **MUI X - Date and time pickers**: https://mui.com/x/react-date-pickers/*

## What do I gain?

We believe separating the documentation will increase your navigation experience a whole bunch. This rings especially louder for MUI X contributors and customers, especially given that we reworked how the internal search feature works, and now looking for any Data Grid specific article is so much more responsive and faster overall.

## Next steps

As we mature each of our products, like adding more components to MUI X and Base, this separation will start to increasingly become more beneficial. We have also been studying ways to separate them from a design perspective—e.g Material UI docs actually use Material Design default look—so there's no confusion what's so ever about what you can expect from installing the libraries on your project.

If you have any feedback or suggestions, we definitely would want to hear them. Go over to Material UI's GitHub repository and open an issue starting with [docs].
