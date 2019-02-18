# @material-ui/css-utils

The `@material-ui/css-utils` package provides helper functions that you can use to manipulate CSS-in-JS values.

## Installation

Install the package in your project directory with:

```sh
// with npm
npm install @material-ui/css-utils

// with yarn
yarn add @material-ui/css-utils
```

## API

<a name="responsiveProperty"></a>

## responsiveProperty(params) ⇒ <code>Object</code>
generate a responsive version of a given CSS property

**Kind**: global function  
**Returns**: <code>Object</code> - responsive styles for {params.cssProperty}  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.cssProperty | <code>string</code> | The CSS property to be made responsive |
| params.min | <code>number</code> | The smallest value of the CSS property |
| params.max | <code>number</code> | The largest value of the CSS property |
| [params.unit] | <code>number</code> | The unit to be used for the CSS property |
| [params.breakpoints] | <code>Array.number</code> | An array of breakpoints |
| [params.alignStep] | <code>number</code> | Round scaled value to fall under this grid |

**Example**  
```js
responsiveProperty({
  cssProperty: 'fontSize',
  min: 15,
  max: 20,
  unit: 'px',
  breakpoints: [300, 600],
})

// this returns

{
  fontSize: '15px',
  '@media (min-width:300px)': {
    fontSize: '17.5px',
  },
  '@media (min-width:600px)': {
    fontSize: '20px',
  },
}
```
