# Markdown

<p class="description">Markdown.</p>

## Inline code block

Use backticks to add `codeblocks` such as this one.

`Superlongwordwithoutspacessuperlongwordwithoutspacessuperlongwordwithoutspacessuperlongwordwithoutspacessuperlongwordwithoutspacessuperlongwordwithoutspaces`

## Nested lists

- First item
  - First item
  - Second item
- Second item
  - First item
  - Second item

## Tight lists

https://spec.commonmark.org/0.30/#tight

- First item
- Second item
- Third item

## Loose lists

https://spec.commonmark.org/0.30/#loose

- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id semper risus in hendrerit gravida rutrum quisque non tellus.

- Rhoncus dolor purus non enim praesent. Turpis egestas sed tempus urna et pharetra pharetra massa.

- Leo vel orci porta non pulvinar neque. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur.

## Link

https://spec.commonmark.org/0.30/#links

- Link [with a title](#link 'Stay on the same page').

## Disclosure element

<details>
<summary>Primary</summary>

```js
const primary = {
  50: '#F4FAFF',
  100: '#DDF1FF',
  200: '#ADDBFF',
};

extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          ...primary,
          plainColor: `var(--joy-palette-primary-600)`,
          plainHoverBg: `var(--joy-palette-primary-100)`,
          plainActiveBg: `var(--joy-palette-primary-200)`,
          plainDisabledColor: `var(--joy-palette-primary-200)`,
        },
      },
    },
  },
});
```

</details>

## kbd tag

Make sure to include the `class="key"` declaration in each individual `kbd` element.

That's because when referring to two keys that should be pressed together－for example, <kbd><kbd class="key">Ctrl</kbd>+<kbd class="key">N</kbd></kbd>－the `kbd` elements are wrapped by a parent `kbd`, and we don't add styles to just the tag.

## This item is here to test a long table of contents instance

### And here is another one right below it to see how it feels like one level down

### Wordwithoutspaceasitwouldhappenwithapropdeclaration

Table of contents word wrap test.
