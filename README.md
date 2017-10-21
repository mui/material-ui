# Material-UI picker
> Components, that implements material design date and time pickers for material-ui v1

## [Click here for demo](https://dmtrkovalenko.github.io/material-ui-pickers/)

### Installation
Available as npm package 
```sh
npm install material-ui-pickers -S
```

### Usage 
Here is a quick example of how to use this package

```jsx
class App extends Component {
  state = {
    selectedDate: new Date(),
    selectedTime: new Date()
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date })
  }

  handleTimeChange = time => {
    this.setState({ selectedTime: time })
  }

  render() {
    const { selectedDate, selectedTime } = this.state

    return (
      <div>
        <DatePicker 
          value={selectedDate}
          onChange={this.handleDateChange}
        />  

        <TimePicker 
          value={selectedTime}
          onChange={this.handleDateChange}
        />  
      </div>
    )
  }
}
```

### Props documentation
Here is a list of available props 

#### Datepicker
Prop | Type | Default | Definition
------------ | -------------
value | string, number, Date object, Moment object | null | Datepicker value
format | string | 'MMMM Do' | Moment format string for input
autoOk | boolean | false | Auto accept date on selection 
disableFuture | boolean | false | Disable future dates
animateYearScrolling | boolean | false | Will animate year selection (note that will work for browser supports scrollIntoView({ behavior: 'smooth' }))
openToYearSelection | boolean | Open datepicker from year selection

#### Timepicker
Prop | Type | Default | Definition
------------ | ------------- | ------------- | -------------
value | string, number, Date object, Moment object | null | Timepicker value
format | string | 'MMMM Do' | Moment format string for input
autoOk | boolean | false | Auto accept time on selection 

### Contributing
For information about how to contribute, see the [CONTRIBUTING](https://github.com/dmtrKovalenko/material-ui-pickers/blob/master/CONTRIBUTE.md) file.

### LICENSE
The project is licensed under the terms of [MIT license](https://github.com/dmtrKovalenko/material-ui-pickers/blob/master/LICENSE)