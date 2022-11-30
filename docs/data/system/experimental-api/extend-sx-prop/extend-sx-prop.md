# Extend the `sx` prop

<p class="description">Learn about the experimental API for extending or changing the behavior of the `sx` prop.</p>

## Extend the `sx` prop

If you wish to add new keys that would be processed by the `sx` prop, you can do that by extending the `unstable_sxConfig` option inside the theme.

{{"demo": "ExtendTheSxProp.js" }}

## Override some of the existing behavior

There is also a possibility to change some of the existing behavior. You can simply provide a custom config in the for the specific key.

{{"demo": "ChangeTheBehaviorSxProp.js" }}

## API

Each key in the `unstable_sx` config can define the following properties:

- `cssProperty` (_string_ [optional]): Indicates the css property, if it is different than the key
- `themeKey` (_string_ [optional]): The path of the theme mapping.
- `transform` (_(cssValue: unknown, userValue: unknown) => number | string | React.CSSProperties | CSSObject_ [optional]): Allows users to define a function that can transform the value before it is returned
- `style` (_(props: any) => CSSObject_ [optional]): Offers maximum customizability. Note that you need to make sure that the breakpoints values can be processed
