---
title: 'Improve your design workflow with the MUI for Figma v5.4 update'
description: A bunch of updates to boost speed and efficiency of designing with MUI for Figma.
date: 2022-03-15T00:00:00.000Z
authors: ['adrianmanea']
tags: ['News']
---

MUI for Figma has evolved a lot since its early days and that's because we are constantly iterating and searching for new techniques inspired by leading design teams to improve the experience of designing and we're also focusing on easing the process of developer handoff.

## What's new in MUI for Figma 4.5?

- Add dark mode as a variant to each component to avoid having two separate Figma files
- Add interactive states for many components
- Sync dark theme colors with the default React theme
- Group tokens into light and dark, and many more small iterations which improve the quality of designing. For the full changelog please check the [product page](https://mui.com/store/items/figma-react/).

## Getting Started

Since this is a getting started guide, in this post we will focus on how to make basic edits to the design system so it matches your brand. We also did a YouTube video on this exact topic if that’s easier for you to consume [here](https://youtu.be/ObVSC-kTR6g).

If you are already using the library and you are looking to update to version 5.4 I recommend watching the video [here](https://youtu.be/8vgHesaY3y8)

### Import the local file

Once you have the .figma file located on your machine, hop into Figma, click the “Import file” button inside the organization you wish to import in.

### Typography

Since typography has the most powerful impact on a brand (in my personal opinion) let’s start with that. All text styles inside components are linked to a token which can be changed from the design panel on the right. Simply click the edit button right next to the token you wish to change. Note that it will apply the changes to the entire document so if you are experiencing small lag issues just give it a few seconds.

### Colors

Colors are divided into two main groups, Light and Dark which stand for the light theme variables, and respectively dark theme. To edit a token simply click the edit button as we previously did for the typography tokens.

#### Shades group

Each main color (Primary, Secondary, etc) come with their own group of “shades” which are simply used for states like Hovered, Focused, etc and they are not part of the theme object of the react framework. The reason is quite simple since Figma does not allow us to create tokens using other defined tokens we need to create a new one for each opacity value hence a large number of shades. When you change the main color (e.g Primary/Main) make sure you change the shades group as well by simply replacing the color inside the style.

### Components

If you don’t fancy the default styles of the components you can also change these freely as you’d like. Some components come with an “Unstyled” component that acts as a master-style symbol which helps make changes faster to the rest of the instances.

Tip: Communicating the changes to the developers is essential, so make sure you note down every single change you make to a component. We use an Alert right next to the component that has been iterated with bullet-pointed overrides.

## What’s next

Pre-built components! We’re working on a comprehensive collection of pre-built components for faster prototyping. The goal is to create screens by using nothing more than the available components. Keep an eye on your mailbox if you are already a customer to know when we deploy. The expected date is by the end of April 2022!

## Final thoughts

If you are encounter any difficulties please do not hesitate to send us an email at figma@mui.com.
