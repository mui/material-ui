# MobileStepper



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| activeStep | number | `0` | Specifies the currently active step. |
| backButtonText | string | Back | Set the text that will appear within the back button. |
| disableBack | bool | `false` | Set to disable the back button. |
| disableNext | bool | `false` | Set to disable the next button. |
| kind | `text`, `dots` or `progress` | `dots` | Defines the kind of mobile stepper to use. |
| nextButtonText | string | Next | Set the text that will appear within the next button. |
| onBack | function |  | Supplied to the onClick attribute of the back button. |
| onNext | function |  | Supplied to the onClick attribute of the next button. |
| position | `bottom` or `top` |  | Set to fix to either the bottom or the top of the viewport. |
| steps | number |  | The total amount of steps. |
| buttonClassName | string |  | Specify an extra class to be put on back/next buttons |
| className | string |  | Specify an extra class to be put on the root element |
| dotClassName | string |  | Specify an extra class to be put on each dot element |
| dotsClassName | string |  | Specify an extra class to be put the container that holds the dots |
| progressClassname | string |  | Specify an extra class to be put the container that holds the <LinearProgress /> component. |

Any other properties supplied will be spread to the root element.

## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `button`
- `dots`
- `dot`
- `dotActive`
- `progress`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiAppBar`.
