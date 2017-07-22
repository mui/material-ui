<!--- This documentation is automatically generated, do not try to edit it. -->

# MobileStepper



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| activeStep | number | 0 | Set the active step (zero based index). Defines which dot is highlighted when the type is 'dots'. |
| backButtonText | node | 'Back' | Set the text that appears for the back button. |
| classes | object |  | Useful to extend the style applied to components. |
| disableBack | bool | false | Set to true to disable the back button. |
| disableNext | bool | false | Set to true to disable the next button. |
| nextButtonText | node | 'Next' | Set the text that appears for the next button. |
| <span style="color: #31a148">onBack *</span> | function |  | Passed into the onClick prop of the Back button. |
| <span style="color: #31a148">onNext *</span> | function |  | Passed into the onClick prop of the Next button. |
| position | enum:&nbsp;'bottom'<br>&nbsp;'top'<br>&nbsp;'static'<br> | 'bottom' | Set the positioning type. |
| <span style="color: #31a148">steps *</span> | number |  | The total steps. |
| type | enum:&nbsp;'text'<br>&nbsp;'dots'<br>&nbsp;'progress'<br> | 'dots' | The type of mobile stepper to use. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `positionBottom`
- `positionTop`
- `positionStatic`
- `button`
- `dots`
- `dot`
- `dotActive`
- `progress`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiMobileStepper`.
