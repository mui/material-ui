var React = require('react');
var mui = require('mui');
var DatePicker = mui.DatePicker;
var TextField = mui.TextField;
var Toggle = mui.Toggle;
var ComponentDoc = require('../../component-doc.jsx');

class DatePickerPage extends React.Component {
  constructor() {
    var startDate = new Date();
    var endDate = new Date();
    startDate.setFullYear(startDate.getFullYear() -1);
    startDate.setHours(0,0,0,0);
    endDate.setFullYear(endDate.getFullYear() +1);
    endDate.setHours(0,0,0,0);
    
    this.state = {
      startDate: startDate,
      endDate: endDate,
      opensOnFocus: false
    };
  }

  render() {

    var code =
      '//Portrait Dialog\n' +
      '<DatePicker\n' +
      '  hintText="Portrait Dialog"\n\n' +
      '//Landscape Dialog\n' +
      '<DatePicker\n' +
      '  hintText="Landscape Dialog"\n' +
      '  mode="landscape"/>\n\n'+
      '// Ranged Date Picker\n' +
      '<DatePicker\n' +
      '  hintText="Ranged Date Picker"\n' +
      '  startDate={this.state.startDate}\n' +
      '  endDate={this.state.endDate}/>' +
      '  mode="landscape"/>';

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'defaultDate',
            type: 'date object',
            header: 'optional',
            desc: 'This is the initial date value of the component.'
          },
          {
            name: 'formatDate',
            type: 'function',
            header: 'default: formats to M/D/YYYY',
            desc: 'This function is called to format the date to display in ' +
              'the input box. By default, date objects are formatted to M/D/YYYY.'
          },
          {
            name: 'mode',
            type: 'one of: portrait, landscape',
            header: 'default: portrait',
            desc: 'Tells the component to display the picker in portrait or landscape mode.'
          },
          {
            name: 'startDate',
            type: 'date object',
            header: 'optional',
            desc: 'The beginning of a range of valid dates. The range includes the startDate. ' +
              'The default value is current date - 100 years.'
          },
          {
            name: 'endDate',
            type: 'date object',
            header: 'optional',
            desc: 'The ending of a range of valid dates. The range includes the endDate. ' +
              'The default value is current date + 100 years.'
          },
          {
            name: 'shouldDisableDate',
            type: 'function',
            header: 'optional',
            desc: 'Called during render time of a given day. If this method returns false ' +
              'the day is disabled otherwise it is displayed normally.'
          },
          {
            name: 'hideToolbarYearChange',
            type: 'boolean',
            header: 'optional',
            desc: 'Hide year change buttons on calendar; good for short time spans. Clicking ' +
              'the year will always result in selecting a year.'
          },
          {
            name: 'opensOnFocus',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, open the date picker when it has focus. Default value is false.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'getDate',
            header: 'DatePicker.getDate()',
            desc: 'Returns the current date value.'
          },
          {
            name: 'setDate',
            header: 'DatePicker.setDate(d)',
            desc: 'Sets the date value to d, where d is a date object.'
          }
        ]
      }
    ];
    
    var optionsStyle = {
      width: '300px',
      margin: '0 auto'
    };

    return (
      <ComponentDoc
        name="Date Picker"
        code={code}
        componentInfo={componentInfo}>

        <DatePicker
          hintText="Portrait Dialog"
          opensOnFocus={this.state.opensOnFocus} />

        <DatePicker
          hintText="Landscape Dialog"
          mode="landscape"
          opensOnFocus={this.state.opensOnFocus} />
          
        <DatePicker
          hintText="Ranged Date Picker"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          opensOnFocus={this.state.opensOnFocus} />
          
        <div style={optionsStyle}>
          <TextField
            floatingLabelText="Start Date"
            defaultValue={this.state.startDate.toDateString()}
            onChange={this._updateStartDate.bind(this)} />
        
          <TextField
            floatingLabelText="End Date"
            defaultValue={this.state.endDate.toDateString()}
            onChange={this._updateEndDate.bind(this)} />
          
          <Toggle
            name="opensOnFocus"
            value="opensOnFocus"
            label="Opens On Focus"
            defaultToggled={false}
            onToggle={this._handleToggle.bind(this)} />
        </div>
      </ComponentDoc>
    );
  }
  
  _updateStartDate(e) {
    this.setState({
      startDate: new Date(e.target.value)
    });
  }
  
  _updateEndDate(e) {
    this.setState({
      endDate: new Date(e.target.value)
    });
  }
  
  _handleToggle(e, toggled) {
    this.setState({
      opensOnFocus: toggled
    });
  }

}

module.exports = DatePickerPage;
