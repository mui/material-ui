---
title: An exciting year ahead for Base UI
description: Base UI will see an exciting year in 2024, including a stable release, plenty of new components, and more. Here’s what to expect.
date: 2024-02-07T00:00:00.000Z
authors: ['michaldudak', 'danilo-leal']
tags: ['Base UI', 'Product']
card: true
---

It's been a while since we started work on Base UI, a library of unstyled React UI components and hooks.
It all started years ago, way before similar products were as widely known as today when we imagined a world where Material UI existed without Material Design.

We're super excited because this world is getting closer than ever.
This year will see a lot of investment in Base UI as we expand the team ([we're hiring!](/careers/staff-ui-engineer-base-ui/)) and focus hard on a [stable release](https://github.com/mui/material-ui/milestone/46) (tentatively planned for Q3), which will come full of new components, features, and improvements.

Let's walk through some of the things we're cooking up.

## A larger set of components

Base UI today offers a modest set of components and hooks, including some slightly more complex ones such as Autocomplete and Number Input.
However, we're conscious that many primitive components that would allow a real-world website or application to use Base UI as its foundation are missing.
Worry no more, as we're focused on shipping the first versions of all of the components listed below for the stable release:

| To-be-added components |                                                                                                |
| :--------------------- | ---------------------------------------------------------------------------------------------: |
| Accordion              | [View&nbsp;the&nbsp;GitHub&nbsp;issue&nbsp;→](https://github.com/mui/material-ui/issues/38037) |
| Alert Dialog           |                                                              [View the GitHub issue&nbsp;→](/) |
| Checkbox               |                [View the GitHub issue&nbsp;→](https://github.com/mui/material-ui/issues/38036) |
| Collapsible            |                                                                   View the GitHub issue&nbsp;→ |
| Drawer                 |                [View the GitHub issue&nbsp;→](https://github.com/mui/material-ui/issues/38181) |
| Radio Group            |                [View the GitHub issue&nbsp;→](https://github.com/mui/material-ui/issues/38038) |
| Tooltip                |                [View the GitHub issue&nbsp;→](https://github.com/mui/material-ui/issues/38045) |

## Improved customization API

Currently, Base UI can be customized to your heart's content using the `slots` and `slotProps` props.
This API, while powerful, has proven to be less than ideal in some instances.
Most notably, it's too lengthy and complicated to write and read when used with libraries such as Tailwind CSS.
Additionally, since the `slots` and the corresponding `slotProps` are not related to Typescript types, it's possible to introduce bugs or have the compiler complain about invalid valid code.

To address these issues, we're considering adopting another customization API.
We're still fleshing out the details and plan to release an RFC on GitHub in the upcoming days.
We are aware that a significant number of projects depend on the current API; therefore, we want to assure you that offering a smooth migration experience is very high on our priority list.
Once we know all the details about the new API, we'll figure out the best way to migrate existing projects (with either a codemod, wrapper components exposing the old API, or something else).

## More thorough animation support

Animation is a key element for adding delight to any application.
We've already kicked off work on animation support by releasing the [`CssTransition`](/base-ui/react-transitions/#css-transitions) and [`CssAnimation`](/base-ui/react-transitions/#css-animation) components, and the `useTransitionTrigger` and `useTransitionStateManager` hooks.
They're currently available for use with the Popup, Menu, and Select components, but the plan is to extend their coverage significantly while also adding more features.

{{"demo": "../../data/base/components/transitions/AllTransitionsDemo.js", "hideToolbar": true}}

## Independent component versioning

The biggest benefit of making each Base UI component available through its own npm package is speed.
All of the above-listed components and any future bug fix and/or feature addition that may be considered as a breaking change would get out of the door and into your project a lot faster, given we wouldn't need to coordinate and/or wait for a significant amount of them to pile up for a next package-wide major release.

Although installing each component individually can initially sound like a hurdle, it will enable you to experiment with each one at a time and only commit to those you're interested in using.

## A more independent product

Until now, all Base UI-related development happened within the Material UI GitHub repository.
That made a lot of sense, given that initially, we weren't shooting for Base UI to be a standalone product with its own audience.
As a natural consequence, we've seen developers hesitant to use it out of concern about dealing with anything related to Material Design. This is not the case, as no theme or style is attached to the components.

That has already changed, as we want developers to gain the benefits of Base UI way beyond the scope of Material UI.
We intend to move Base UI to a dedicated GitHub repo and potentially move the packages to a separate npm org for more focused communication and to make room for its independent growth.

## Getting many bugs out of the way

Full support for various accessibility-related features and an intuitive API for extensive customization are at the core of what Base UI strives to deliver out of the box.
We've earmarked several bugs we want to tackle before the stable release in areas such as keyboard navigation, better ARIA support, focus styles, and more.

If you want to see if the specific bug that was annoying you was solved, head over to [the Base UI stable release milestone](https://github.com/mui/material-ui/milestone/46) on GitHub. There, you can see every issue we have lined up for it.

## Join us on the ride

If you're passionate about the mission of extending the web platform with powerful, accessibility-focused, unstyled components, [we're hiring UI Engineers](/careers/staff-ui-engineer-base-ui/) to work on the Base UI team and help us accelerate this more and more!

Lastly, we'd love to know your thoughts or comments.
Please hop over to [the GitHub repo](https://github.com/mui/material-ui/issues?q=is:open+is:issue+label:%22package:+base-ui%22) and feel free to open or chime in on issues.

Happy development! 👋
