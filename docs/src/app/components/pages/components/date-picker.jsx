var React = require('react');
var mui = require('mui');
var DatePicker = mui.DatePicker;
var CodeExample = require('../../code-example/code-example.jsx');
var ComponentInfo = require('../../component-info.jsx');

var DatePickerPage = React.createClass({

  render: function() {
    return (
      <div>

        <h2 className="mui-font-style-headline">Date Picker</h2>
        {this._getExample()}

        <br/><hr/><br/>

        <h3 className="mui-font-style-title">Props</h3>
        {this._getPropInfo()}

        <h3 className="mui-font-style-title">Methods</h3>
        {this._getMethodInfo()}

      </div>
    );
  },

  _getExample: function() {
    var code =
      '//Portrait Dialog\n' +
      '<DatePicker\n' +
      '  name="PortraitDialogDate"\n' +
      '  placeholder="Portrait Dialog"\n' +
      '  inlinePlaceholder={true} />\n\n' +
      '//Landscape Dialog\n' +
      '<DatePicker\n' +
      '  name="PortraitDialogDate"\n' +
      '  placeholder="Portrait Dialog"\n' +
      '  inlinePlaceholder={true}\n' +
      '  mode="landscape"/>';

    return (
      <CodeExample code={code}>

        <DatePicker
          name="PortraitDialogDate"
          placeholder="Portrait Dialog"
          inlinePlaceholder={true} />

        <DatePicker
          name="LandscapeDialogDate"
          placeholder="Landscape Dialog"
          inlinePlaceholder={true}
          mode="landscape"/>

      </CodeExample>
    );
  },

  _getPropInfo: function() {
    var info = [
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
      }
    ];

    return <ComponentInfo infoArray={info} />;
  },

  _getMethodInfo: function() {
    var info = [
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
    ];

    return <ComponentInfo infoArray={info} />;
  }

});

module.exports = DatePickerPage;