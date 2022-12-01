# Extend the sx prop

<p class="description">Learn about the experimental API for extending or changing the behavior of the sx prop.</p>

## Extend the sx prop

You can add new keys to be processed by the `sx` prop by extending the `unstable_sxConfig` option inside the theme, as shown below:

{{"demo": "ExtendTheSxProp.js" }}

## Override existing behavior

There is also a possibility to change some of the existing behavior. You can simply provide a custom config in the for the specific key.

{{"demo": "ChangeTheBehaviorSxProp.js" }}

## API

Each key in the `unstable_sx` config can define the following properties:

- `cssProperty` (_string_ [optional]): Indicates the CSS property, if it is different than the key
- `themeKey` (_string_ [optional]): The path of the theme mapping
- `transform` (_(cssValue: unknown, userValue: unknown) => number | string | React.CSSProperties | CSSObject_ [optional]): Lets users define a function that can transform the value before it's returned
- `style` (_(props: any) => CSSObject_ [optional]): Offers maximum customizability. Note that you need to make sure that the breakpoint values can be processed
