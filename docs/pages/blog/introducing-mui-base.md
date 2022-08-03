---
title: Introducing MUI Base
description: Introduction to a new library of unstyled components and hooks - MUI Base
date: 2022-08-29T00:00:00.000Z
authors: ['michaldudak']
tags: ['News', 'MUI Core']
card: true
---

<!-- hero image goes here -->

Throughout the years, Material UI has been used to build various types of applications.
Its speed of use helped create admin user interfaces, while its customizability made it a foundation of custom design systems.
Creating design systems that substantially diverge from Google's Material Design may, however, not be an easy task.
Developers do not start from a clean slate but have to override styles applied by the library's components.
While this approach may speed up the work when designing visuals close to Material Design, it's less intuitive for different design languages.

We were aware of this problem, so, [encouraged by the community](https://github.com/mui/material-ui/issues/6218), we decided to build a library aiming for the ultimate customizability.
Today, we're ready to announce it: **please welcome MUI Base!**

## Components and hooks

MUI Base offers two kinds of building blocks: unstyled components and hooks.

Components are more straightforward to use of the two.
Place a component on a page, add your own styles, and it's ready to go!
It's important to note that you are not limited to the styling options available in Material UI.
You can, of course, still use our MUI System, but if you prefer Emotion, Tailwind, plain CSS, or any other styling engine, they are available too!
Check out the [Working with Tailwind guide](http:///base/guides/working-with-tailwind-css/) for an example of using this library.

In contrast to Material UI, Base's components do not have any default styles.
They provide functionality and structure, while designers and developers are responsible for the visuals.

Each unstyled component lets developers modify or override its _slots_ - smaller subcomponents representing parts that work together.
For example, a SwitchUnstyled contains the root, thumb, input, and track slots.
You can control props passed to each of these slots (including, perhaps most importantly, `className`) based on the component's state or even replace the default slot components with your own.

<!-- example here -->

Hooks take this one step further.
They provide functionality, and developers are free to implement the structure to the DOM elements, their interactions, and look.
They offer maximum customizability at the cost of requiring more to implement by developers.

Upon calling, a hook returns an object describing the component's state (i.e., whether the switch is turned on) and with methods that apply accessibility props and event handlers.
You should spread these props on components you defined.

<!-- example here -->

## What's included

We are releasing the initial version of the library with 17 components.
We are going to work on creating more in the upcoming months.
You can track our progress (and comment to influence our priorities) on a [dedicated GitHub issue](https://github.com/mui/material-ui/issues/27170).

The @mui/base package is released as an alpha.
This means the API of the components can still change, especially when we receive feedback about its current state from the community.
However, we believe the library is solid enough to build design systems with it.
In fact, we're using MUI Base to create [Joy UI](/blog/first-look-at-joy/).
In the future, MUI Base will also be used as a foundation of Material UI components so that you can expect consistent quality across our entire suite of products.

## Feedback needed

So far, we've been mostly using MUI Base ourselves.
Now we need to hear what you think of the library, what you like about it, and what are the areas that could look or work differently.
Please help us create the best possible headless component library out there.

If you found any bugs, have trouble understanding some concepts, or have ideas for improvements, don't hesitate to open issues on GitHub.
Make sure to include "[base]" or a component/hook name in the issue title, so we recognize it.
Also, we're eager to know what you create with MUI Base.
Please share your creations on Twitter to let us (and others) know what our library can be used for.

**Happy creating!**
