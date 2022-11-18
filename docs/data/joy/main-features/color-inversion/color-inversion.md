# Color inversion

<p class="description">Joy UI components can invert their colors to match with the parent's variant.</p>

## Motivation

In most design, a vivid background is used to emphasize the container to bring user's first attention on it. For example, the application's header can use the primary background to make the website more appealing.

<!-- some images -->

However, it usually requires a lot of customization effort because you have to add extra styles to all components within the container to have enough contrast with the background. Also, some components are interactive so you have to custom the styles for other states, including hover, active, disabled and focus. If you don't cover all of the possible states, it could lead to visual bugs.

We believe that if the components can adapt their colors to match the parent's background, it would save a lot of time.

## Overview

Color inversion is a special feature that inverts the components' styles to match their parent's background. The key factor that makes this feature possible is the Joy UI global variants because it allows the parent and children to communicate to each other via CSS variables.

The demo below demonstrate the result without the feature (left) and the result when color inversion is enabled (right):

<!-- demo that can changed between variants, colors -->

## Usage

To enable the feature, set `invertedColors` to true on the `Sheet` or `Card` component.

The children will adapt their colors when the parent's variant is `solid` or `soft`.

```js
<Card variant="solid" color="primary" invertedColors>
  ...Joy UI components
</Card>
<Sheet variant="soft" color="info" invertedColors>
  ...Joy UI components
</Sheet>
```

## Common examples

You will find

### Header

{{"demo": "ColorInversionHeader.js"}}

### Footer

{{"demo": "ColorInversionFooter.js"}}

### Side navigation

{{"demo": "ColorInversionNavigation.js"}}

### Marketing section

{{"demo": "ColorInversionMarketing.js"}}

## How it works

## Frequently ask questions
