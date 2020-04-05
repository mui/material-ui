---
title: Detect click outside React component
components: ClickAwayListener
---

# Click away listener

<p class="description">Detect if a click event happened outside of an element. It listens for clicks that occur somewhere in the document.</p>

- 📦 [1.5 kB gzipped](/size-snapshot).

## Example

For instance, if you need to hide a menu dropdown when people click anywhere else on your page:

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Notice that the component only accepts one child element.
You can find a more advanced demo on the [Menu documentation section](/components/menus/#menulist-composition).

## Limitations

If a page contains an element/component that gets removed from DOM when clicked, the `ClickAwayListener` will not be able to raise the `onClickAway` event due to a check trying to prevent raising the event for already removed `ClickAwayListener` children.

The workaround for this is to either use css/style to hide the clicked element or delay the removal of the element.
Check the example below

```jsx
// Instead of removing from DOM
{showButton && (<Button onClick={handleClick}>
  Click to hide
</Button>)}

// Use styles prop
<Button style={showButton ? { display: 'block' } : { display: 'none' }}  onClick={handleClick}>
  Click to hide
</Button>)
```
