# Display

<p class="description">Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.</p>

## Exemples

```jsx
<Box component="div" display="inline">inline</Box>
<Box component="div" display="inline">inline</Box>
```

{{"demo": "pages/system/display/Inline.js"}}

```jsx
<Box component="span" display="block">block</Box>
<Box component="span" display="block">block</Box>
```

{{"demo": "pages/system/display/Block.js"}}

## Hiding elements

For faster mobile-friendly development, use responsive display classes for showing and hiding elements by device. Avoid creating entirely different versions of the same site, instead hide element responsively for each screen size.

| Screen Size        | Class                                                |
|:------------------ |:---------------------------------------------------- |
| Hidden on all      | `display="none"`                                     |
| Hidden only on xs  | `display={{ xs: 'none', sm: 'block' }}`              |
| Hidden only on sm  | `display={{ xs: 'block', sm: 'none', md: 'block' }}` |
| Hidden only on md  | `display={{ xs: 'block', md: 'none', lg: 'block' }}` |
| Hidden only on lg  | `display={{ xs: 'block', lg: 'none', xl: 'block' }}` |
| Hidden only on xl  | `display={{ xs: 'block', xl: 'none' }}`              |
| Visible only on xs | `display={{ xs: 'block', sm: 'none' }}`              |
| Visible only on sm | `display={{ xs: 'none', sm: 'block', md: 'none' }}`  |
| Visible only on md | `display={{ xs: 'none', md: 'block', lg: 'none' }}`  |
| Visible only on lg | `display={{ xs: 'none', lg: 'block', xl: 'none' }}`  |
| Visible only on xl | `display={{ xs: 'none', xl: 'block' }}`              |

```jsx
<Box display={{ xs: 'block', md: 'none' }}>
  hide on screens wider than md
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
  hide on screens smaller than md
</Box>
```

{{"demo": "pages/system/display/Hiding.js"}}

## Display in print

```jsx
<Box display="block" displayPrint="none">
  Screen Only (Hide on print only)
</Box>
<Box display="none" displayPrint="block">
  Print Only (Hide on screen only)
</Box>
```

{{"demo": "pages/system/display/Print.js"}}

## API

```js
import { display } from '@material-ui/system';
```

| Import name    | Prop           | CSS property | Theme key |
|:-------------- |:-------------- |:------------ |:--------- |
| `displayRaw`   | `display`      | `display`    | none      |
| `displayPrint` | `displayPrint` | `display`    | none      |