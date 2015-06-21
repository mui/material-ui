let React = require('react');
let { TimePicker } = require('mui');
let ComponentDoc = require('../../component-doc.jsx');


let TimePickerPage = React.createClass({

  render: function() {

    let code =
      '//The 12hr format \n' +
      '<TimePicker\n' +
      '  format="ampm" \n' +
      '  hintText="12hr Format" />\n\n' +
      '//The 24hr format \n' +
      '<TimePicker\n' +
      '  format="24hr" \n' +
      '  hintText="24hr Format" /> ';

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'defaultTime',
            type: 'date object',
            header: 'optional',
            desc: 'This is the initial time value of the component.'
          },
          {
            name: 'format',
            type: 'one of: ampm, 24hr',
            header: 'default: ampm',
            desc: 'Tells the component to display the picker in ampm (12hr) format or 24hr format.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'getTime',
            header: 'DatePicker.getTime()',
            desc: 'Returns the current time value.'
          },
          {
            name: 'setTime',
            header: 'DatePicker.setTime(t)',
            desc: 'Sets the time value to t, where t is a date object.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Time Picker"
        code={code}
        componentInfo={componentInfo}>

        <TimePicker
          ref="picker12hr"
          format="ampm"
          hintText="12hr Format"
          onChange={this._changeTimePicker24} />

        <TimePicker
          ref="picker24hr"
          format="24hr"
          hintText="24hr Format"
          onChange={this._changeTimePicker12}  />

      </ComponentDoc>
    );
  },
  _changeTimePicker24: function(err, t){
    this.refs.picker24hr.setTime(t);
  },
  _changeTimePicker12: function(err, t){
    this.refs.picker12hr.setTime(t);
  }

});

module.exports = TimePickerPage;
