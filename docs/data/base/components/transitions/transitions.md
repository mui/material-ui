---
productId: base-ui
title: React Transitions components
components: CssAnimation, CssTransition
hooks: useTransitionTrigger, useTransitionStateManager
---

# Transitions

<p class="description">Utilities that let you add motion to components.</p>

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

Base UI offers higher-level components and low-level hooks that can be used to animate appearing and disappearing of certain components.

Currently, the [Popup](/base-ui/react-popup/) supports this API and we plan to use it in components such as [Select](/base-ui/react-select/) and [Menu](/base-ui/react-menu/) in the future.

## Components

We offer two components that should cover most of the cases using [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions) and [animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations).

### CssTransition

With a CSS transition, you can smoothly change CSS properties' values.
The CssTransition component works by adding specified class names when an element should be visible and hidden and it's up to you to define any transitions for these classes.

In the following example we define the `open` and `close` classes and set the CssTransition component to apply them accordingly.
Since the `close` class has multiple transitions with different duration (`transform` transitions for 400ms, while `opacity` and `filter` transition for 200ms), we must let the transition component know which property takes the longest to finish. The `lastTransitionedPropertyOnExit` serves exactly this purpose.

{{"demo": "CssTransitionComponent.js"}}

### CssAnimation

CSS animations offer greater flexibility than transitions.
Developers are free to define multiple keyframes and have better control over animation playback.

The CssAnimation component triggers an animation by applying a CSS class (either from the `enterClassName` or `exitClassName` prop).

{{"demo": "CssAnimationComponent.js"}}

:::warning

There is one important difference between CSS animations and transitions: how they are played initially.
An animation will play when there's a CSS `animation` rule applied on an element.
It doesn't matter if an element has just been added to the document or existed before and only got a new class name.

Transitions, on the other hand, change CSS properties' values from an old state to a new one.
This means that if we create a new element with a CSS class that has a transition applied, the transition won't initially be played.
Transitions are only executed when a CSS property changes on **an existing element**.

:::

## Hooks

If the built-in components don't cover your needs, or when you want to trigger transitions from your components, you can use the hooks: `useTransitionTrigger` and `useTransitionStateManager`.
The `useTransitionTrigger` is used in a component that controls transitions (for example, the Popup uses it internally to request appearance of its contents).

`useTransitionStateManager`, on the other hand, is used by components that need to be transitioned.
The CssAnimation and CssTransition call this hook when being rendered.

In a nutshell, calling `useTransitionTrigger` returns a context (among other properties), that is being read by `useTransitionStateManager`.

{{"demo": "TransitionHooks.js"}}

## Using third-party libraries

It's easy to create adapters for 3rd party animation libraries.
Such an adapter should use the `useTransitionStateManager` hook and convert its result into a format the library understands.

See the examples below.

### Material UI (React Transition Group)

You can use any of the [transitions from Material UI](http://localhost:3000/material-ui/transitions/) or custom ones build with React Transition Group using an adapter shown in the following demo.

{{"demo": "ReactTransitionGroup.js"}}

### React Spring

React Spring, another popular animation library, also can be used with the Base UI transitions API.

{{"demo": "ReactSpring.js"}}
