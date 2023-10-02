# Accessibility

<p class="description">
Accessibility is our top priority for Base UI components.
</p>

The library, however cannot make your application fully accessible on its own.
This page highlights the most common actions you, as an application developer, need to take to ensure your product is available to use by people with disabilites.

## Keyboard navigation

As the Base UI components follow the [WAI-ARIA 1.2 standard](https://www.w3.org/TR/wai-aria-1.2/), they are accessible with a keyboard.
This is important for users who have trouble using a pointing device, but also comes in handy for users who find navigating with a keyboard faster and expect web components to behave the same way as native operating system controls.

Specifically, interactive components can be focused using the <kbd>Tab</kbd> key.
List-like components (such as Select, Menu, etc.) can be browsed and activated using arrow keys, <kbd>Home</kbd>, <kbd>End</kbd>, <kbd>Enter</kbd>/<kbd>Return</kbd> and <kbd>Escape</kbd>.
The Select and Menu also let users navigate to options that begin with a provided string by pressing alphanumeric keys.

## Focus ring

While Base UI components handle keyboard navigation, it's the developers' responsibility to indicate when a component is focused and can receive keyboard input.
This is usually done by styling the [`:focus`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus) or [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) pseudoclasses.
The [WCAG guidelines](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance-minimum) specify the required appearance of focused elements.

## Color contrast

As Base UI controls are unstyled, it's up to you to ensure appropriate contrast between text and background.
You can use online tools such as https://cliambrown.com/contrast/ to measure contrast between colors (note that it uses the [APCA algorithm](https://ruitina.com/apca-accessible-colour-contrast/) that's being considered for the WCAG 3 guidelines).

## Accessible labels

It is also your responsibility to ensure that components have accessible names.

For form controls (such as the [Input](/base-ui/react-input/), [Number Input](/base-ui/react-number-input/), [Select](/base-ui/react-select/), etc.), this requires adding an associated `<label>` element or placing an `aria-label` attribute on the component itself:

```jsx
<label>
  First name <Input />
</label>
```

or

```jsx
<label for="first-name">First name</label>
<Input id="first-name" />
```

or

```jsx
<Input aria-label="First name" />
```

For buttons, their inner text becomes the accessible label.
You only need to place an `aria-label` attribute if the button contains no text (like an icon button).
