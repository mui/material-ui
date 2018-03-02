# Material-UI pickers
[![npm package](https://img.shields.io/npm/v/material-ui-pickers.svg)](https://www.npmjs.org/package/material-ui-pickers)
[![npm download](https://img.shields.io/npm/dm/material-ui-pickers.svg)](https://www.npmjs.org/package/material-ui-pickers)
[![Build Status](https://api.travis-ci.org/dmtrKovalenko/material-ui-pickers.svg?branch=master)](https://travis-ci.org/dmtrKovalenko/material-ui-pickers)
> Components, that implements material design date and time pickers for material-ui v1

## [Click here for demo](https://material-ui-pic.firebaseapp.com/)

### Recently updated?
Changelog available [here](https://github.com/dmtrKovalenko/material-ui-pickers/releases)

### Installation
Available as npm package.
```sh
npm install material-ui-pickers -S
```
Now choose the library that pickers will use to work with date. We are providing interfaces for [moment](https://momentjs.com/) and [date-fns](https://date-fns.org/). If you are not using moment in the project (or dont have it in the bundle already) we suggest using date-fns, because it much more lightweight and will be correctly tree-shaked from the bundle.

Teach pickers how to use one of that library using `MuiPickersUtilsProvider`. This component takes an utils property, and makes it available down the React tree thanks to React context. It should preferably be used at the root of your component tree.

```jsx
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DateFnsUtils from 'material-ui-picker/utils/date-fns-utils'

function App() {
  return ( 
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Root />
    </MuiPickersUtilsProvider>
  );
}

render(<App />, document.querySelector('#app'));
```

We are using material-ui-icons icon font to display icons. Just add this to your html 
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
If you dont want to use icon font, or you are already use `material-ui-icons` you can pass any icon to the components with [corresponding props](https://github.com/dmtrKovalenko/material-ui-pickers#props-documentation)
 
### Usage
Here is a quick example of how to use this package

```jsx
import { TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers'

class App extends Component {
  state = {
    selectedDate: new Date(),
    selectedTime: new Date(),
    selectedDateTime: new Date()
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date })
  }

  handleTimeChange = time => {
    this.setState({ selectedTime: time })
  }

  handleDateTimeChange = dateTime => {
    this.setState({ selectedDateTime: dateTime })
  }

  render() {
    const { selectedDate, selectedTime, selectedDateTime } = this.state

    return (
      <div>
        <DatePicker
          value={selectedDate}
          onChange={this.handleDateChange}
        />

        <TimePicker
          value={selectedTime}
          onChange={this.handleTimeChange}
        />

        <DateTimePicker
          value={selectedDateTime}
          onChange={this.handleDateTimeChange}
        />
      </div>
    )
  }
}
```

### Props documentation
Here is a list of available props

**Note:** Any prop not recognized by the pickers and their sub-components are passed down to material-ui [TextField](https://material-ui-next.com/api/text-field/#props) component.

#### Datepicker
* date - string, number, Date object or Moment object (if you are using moment utils)

Prop | Type | Default | Definition
------------ | ------------- | ------------- | -------------
value | date | new Date() | Datepicker value
format | string | 'MMMM Do' | Format string for input
autoOk | boolean | false | Auto accept date on selection
disablePast | boolean | false | Disable past dates
disableFuture | boolean | false | Disable future dates
animateYearScrolling | boolean | false | Will animate year selection (note that will work for browser supports scrollIntoView api)
openToYearSelection | boolean | false | Open datepicker from year selection
minDate | date | '1900-01-01' | Minimum selectable date
maxDate | date | '2100-01-01' | Maximum selectable date
onChange | func | required | Callback firing when date accepted
invalidLabel | string | 'Unknown' | Displayed string if date cant be parsed
emptyLabel | string | '' | Displayed string if date is `null` (e.g. after clear)
okLabel | string | 'OK' | The label for the ok button
cancelLabel | string | 'Cancel' | The label for the cancel button
clearLabel | string | 'Clear' | The label for the clear button
labelFunc | func | null | Allow to specify dynamic label for text field `labelFunc(date, invalidLabel)`. Note, that `date` equals `null` after picker is cleared.
renderDay | func | null | Allow to specify custom renderer for day `renderDay(date, selectedDate, dayInCurrentMonth)`
leftArrowIcon | react node | `<Icon>keyboard_arrow_left</Icon>`| Left arrow icon
rightArrowIcon | react node | `<Icon>keyboard_arrow_right</Icon>`| Right arrow icon
shouldDisableDate | (date: Moment) => boolean | () => false | Allow to disable custom date in calendar
keyboard | boolean | false | Allow to manual input date to the text field
keyboardIcon | react node | `<Icon>event</Icon>` | Keyboard adornment icon
maxDateMessage | string | 'Date should not be after maximal date' | Maximum date error message for keyboard input
minDateMessage | string | 'Date should not be before minimal date' | Minimum date error message for keyboard input
mask | text mask (read more [here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme)) | undefined | Text mask for keyboard-mode
clearable | boolean | false | If `true`, clear button will be displayed
TextFieldComponent | func, string | undefined | Component that should replace the default Material-UI TextField
InputAdornmentProps | object | {} | Props to pass to keyboard input adornment
inputAdornmentPosition | enum 'start', 'end' | 'end' | Specifies position of keyboard adornment


#### Timepicker
Prop | Type | Default | Definition
------------ | ------------- | ------------- | -------------
value | date | new Date() | Timepicker value
format | string | 'MMMM Do' | Moment format string for input
autoOk | boolean | false | Auto accept time on selection
onChange | func | required | Callback firing when date accepted
invalidLabel | string | 'Unknown' | Displayed string if date cant be parsed
emptyLabel | string | '' | Displayed string if date is `null` (e.g. after clear)
okLabel | string | 'OK' | The label for the ok button
cancelLabel | string | 'Cancel' | The label for the cancel button
clearLabel | string | 'Clear' | The label for the clear button
labelFunc | func | null | Allow to specify dynamic label for text field `labelFunc(date, invalidLabel)`. Note, that `date` equals `null` after picker is cleared.
ampm | boolean | true | 12h/24h view for hour selection clock
keyboard | boolean | false | Allow to manual input date to the text field
keyboardIcon | react node | `<Icon>event</Icon>` | Keyboard adornment icon
mask | text mask (read more [here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme)) | undefined | Text mask for keyboard-mode
clearable | boolean | false | If `true`, clear button will be displayed
TextFieldComponent | func, string | undefined | Component that should replace the default Material-UI TextField
InputAdornmentProps | object | {} | Props to pass to keyboard input adornment
inputAdornmentPosition | enum 'start', 'end' | 'end' | Specifies position of keyboard adornment

#### DateTimepicker
Prop | Type | Default | Definition
------------ | ------------- | ------------- | -------------
value | date | new Date() | Timepicker value
format | string | 'MMMM Do hh:mm a' | Moment format string for input
autoOk | boolean | false | Auto accept time on selection
autoSubmit | boolean | true | On change show next time input (year -> date -> hour -> minute)
disablePast | boolean | false | Disable past dates
disableFuture | boolean | false | Disable future dates
showTabs | boolean | false | Show date/time tabs
openTo | one of 'year', 'date', 'hour', 'minutes' | 'date' | Open to particular view
animateYearScrolling | boolean | false | Will animate year selection
minDate | date | '1900-01-01' | Minimum selectable date
maxDate | date | '2100-01-01' | Maximum selectable date
onChange | func | required | Callback firing when date accepted
invalidLabel | string | 'Unknown' | Displayed string if date cant be parsed
emptyLabel | string | '' | Displayed string if date is `null` (e.g. after clear)
okLabel | string | 'OK' | The label for the ok button
cancelLabel | string | 'Cancel' | The label for the cancel button
clearLabel | string | 'Clear' | The label for the clear button
labelFunc | func | null | Allow to specify dynamic label for text field `labelFunc(date, invalidLabel)`. Note, that `date` equals `null` after picker is cleared.
renderDay | func | null | Allow to specify custom renderer for day `renderDay(date, selectedDate, dayInCurrentMonth)`
leftArrowIcon | react node | `<Icon>keyboard_arrow_left</Icon>`| Left arrow icon
rightArrowIcon | react node | `<Icon>keyboard_arrow_right</Icon>`| Right arrow icon
dateRangeIcon | react node | `<Icon>date_range</Icon>`| Date tab icon 
timeIcon | react node | `<Icon>access_time</Icon>`| Time tab icon
ampm | boolean | true | 12h/24h view for hour selection clock
shouldDisableDate | (date: Moment | Date) => boolean | () => false | Allow to disable custom date in calendar
keyboard | boolean | false | Allow to manual input date to the text field
keyboardIcon | react node | `<Icon>event</Icon>` | Keyboard adornment icon
maxDateMessage | string | 'Date should not be after maximal date' | Maximum date error message for keyboard input
minDateMessage | string | 'Date should not be before minimal date' | Minimum date error message for keyboard input
invalidDateMessage | string | 'Invalid Date Format' | Message, appearing when date cannot be parsed
mask | text mask (read more [here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme)) | undefined | Text mask for keyboard-mode
clearable | boolean | false | If `true`, clear button will be displayed
TextFieldComponent | func, string | undefined | Component that should replace the default Material-UI TextField
InputAdornmentProps | object | {} | Props to pass to keyboard input adornment
inputAdornmentPosition | enum 'start', 'end' | 'end' | Specifies position of keyboard adornment


<!-- Delay support of material-ui-pickers probably to rc-2
### Jalali Calendar
We are fully supporting Jalali calendar system and [right-to-left](https://material-ui-next.com/guides/right-to-left/) material-ui api. Special thanks to @alitaheri.
Here is a little example of how to use it

Don't forget to install [material-ui-pickers-jalali-utils](https://github.com/alitaheri/material-ui-pickers-jalali-utils).

```sh
npm install material-ui-pickers-jalali-utils
```

```jsx
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import jalaliUtils from 'material-ui-pickers-jalali-utils';

function App() {
  return ( 
    <MuiPickersUtilsProvider utils={jalaliUtils}>
      <Root />
    </MuiPickersUtilsProvider>
  );
}
``` -->

### Contributing
For information about how to contribute, see the [CONTRIBUTING](https://github.com/dmtrKovalenko/material-ui-pickers/blob/master/CONTRIBUTING.md) file.

### LICENSE
The project is licensed under the terms of [MIT license](https://github.com/dmtrKovalenko/material-ui-pickers/blob/master/LICENSE)
