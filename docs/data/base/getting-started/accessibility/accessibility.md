# Accessibility

<p class="description">Learn how to make the most of Base UI's accessibility features and guidelines.</p>

Accessibility is our top priority for Base UI components.
However, the library cannot make your application fully accessible on its own.
This page highlights the most common actions that you as a developer must take to ensure that your app is accessible to users who require assistive technologies.

## Keyboard navigation

Base UI components follow the [WAI-ARIA 1.2 standard](https://www.w3.org/TR/wai-aria-1.2/), so they are accessible with a keyboard out of the box.
This is important for users who have trouble using a pointing device, but also comes in handy for users who find navigating with a keyboard faster, and who expect web components to behave the same way as native operating system controls.

Specifically, interactive components can be focused using the <kbd class="key">Tab</kbd> key.
List-like components (such as Select and Menu) can be browsed and activated using arrow keys, <kbd class="key">Home</kbd>, <kbd class="key">End</kbd>, <kbd class="key">Enter</kbd>/<kbd class="key">Return</kbd>, and <kbd class="key">Escape</kbd>.
The Select and Menu also let users navigate to options that begin with a provided string by pressing alphanumeric keys.

{{"demo": "KeyboardNavigation.js", "defaultCodeOpen": false}}

## Focus ring

While Base UI components handle keyboard navigation, it's the developer's responsibility to indicate when a component is focused and can receive keyboard input.
This is usually done by styling the [`:focus`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus) or [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) pseudoclasses.
Read the [WCAG guidelines on focus appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance) to learn more about requirements for focus indicators.

{{"demo": "FocusRing.js", "defaultCodeOpen": false}}

## Color contrast

Since Base UI components are unstyled, it's up to you to implement the appropriate amount of color contrast between text and background.
You can use [C. Liam Brown's Color Contrast Tool](https://cliambrown.com/contrast/) to measure contrast between colors in your design and ensure that they meet the minimum requirements
(note that this tool uses the [APCA algorithm](https://ruitina.com/apca-accessible-colour-contrast/), which is slated to become the new standard in WCAG 3).

{{"demo": "ColorContrast.js", "defaultCodeOpen": false}}

## Accessible labels

It's your responsibility to ensure that components have accessible names.

For form controls (such as the [Input](/base-ui/react-input/), [Number Input](/base-ui/react-number-input/), and [Select](/base-ui/react-select/)), this requires adding an associated `<label>` element, or placing an `aria-label` attribute on the component itself:

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
