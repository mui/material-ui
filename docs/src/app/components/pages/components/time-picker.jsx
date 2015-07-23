let React = require('react');
let { TimePicker } = require('material-ui');
let ComponentDoc = require('../../component-doc');


let TimePickerPage = React.createClass({

  render() {

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
          },
          {
            name: 'pedantic',
            type: 'boolean',
            header: 'default: false',
            desc: 'It\'s technically more correct to refer to "12 noon" and "12 midnight" rather than "12 a.m." and "12 p.m." and it avoids real confusion between different locales. By default (for compatibility reasons) TimePicker uses (12 a.m./12 p.m.) To use (noon/midnight) set pedantic={true}.'
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
  _changeTimePicker24(err, t){
    this.refs.picker24hr.setTime(t);
  },
  _changeTimePicker12(err, t){
    this.refs.picker12hr.setTime(t);
  }

});

module.exports = TimePickerPage;
