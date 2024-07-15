---
productId: base-ui
title: React Transition components
components: CssAnimation, CssTransition
hooks: useTransitionTrigger, useTransitionStateManager
---

# Transitions

<p class="description">Transition components are utilities that let you add motion to components.</p>

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

Base UI offers higher-level components and low-level hooks that can be used to add animations to components as they enter and exit the screen.

:::info
The [Popup](/base-ui/react-popup/) is currently the only component that supports this API; [Select](/base-ui/react-select/) and [Menu](/base-ui/react-menu/) support will be added next.
:::

## Components

Base UI offers two components to cover the majority of use cases using [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions) and [animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations).

### CSS Transition

With a CSS transition, you can smoothly change CSS property values.
The CSS Transition component works by adding specified class names when an element should be visible and hidden; it's up to you to define any transitions for these classes.

The following example defines the `open` and `close` classes, and sets the CSS Transition component to apply them accordingly:
Since the `close` class has multiple transitions with different durations (`transform` transitions for 400ms, and `opacity` and `filter` transitions for 200ms), you must let the transition component know which property takes the longest to finish.
The `lastTransitionedPropertyOnExit` serves exactly this purpose.

{{"demo": "CssTransitionComponent.js"}}

Normally, if an element appears in the DOM and already has a CSS class with a transition, this transition is not fired (because there's no state to transition from).
The CSS Transition component works around this issue by mounting the component with the `exitClassName` and, after a brief moment, changing the class name to `enterClassName`.
This ensures the enter transition is applied even if the transitioned element is removed from the DOM when exited.

### CSS Animation

CSS animations offer more flexibility than transitions.
You can define multiple keyframes for better control over animation playback.

The CSS Animation component triggers an animation by applying a CSS class (either from the `enterClassName` or `exitClassName` prop).

{{"demo": "CssAnimationComponent.js"}}

## Hooks

If the built-in components don't cover your needs, or if you want to trigger transitions from your components, you can use the `useTransitionTrigger` and `useTransitionStateManager` hooks.
Use the `useTransitionTrigger` hook in the component that controls the transitions—for example, the Popup uses it internally to request the appearance of its contents.

Use the `useTransitionStateManager` with the components that need to be transitioned.
The CSS Animation and CSS Transition components call this hook when being rendered.

Calling `useTransitionTrigger` returns a context (along with other properties) that's read by `useTransitionStateManager`.

{{"demo": "TransitionHooks.js"}}

## Using third-party libraries

You can create a custom adapter to work with third-party animation libraries.
Such an adapter should use the `useTransitionStateManager` hook and convert its result into a format the library understands.

See the examples below.

### Material UI (React Transition Group)

You can use any of the [transitions from Material UI](https://mui.com/material-ui/transitions/), or custom transitions built with React Transition Group, using an adapter shown in the following demo.

{{"demo": "ReactTransitionGroup.js"}}

### React Spring

React Spring, another popular animation library, also can be used with the Base UI transitions API.

{{"demo": "ReactSpring.js"}}
