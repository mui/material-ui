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

      </div>
    );
  },

  _getExample: function() {
    var code =
      '<DatePicker />\n';

    return (
      <CodeExample code={code}>
        <DatePicker
          ref="datePicker"
          name="TallDialogDate"
          placeholder="Tall Dialog"
          defaultValue="12/1/2014"
          inlinePlaceholder={true} />
      </CodeExample>
    );
  },

  _getPropInfo: function() {
    var info = [
          {
            name: 'icon',
            type: 'string',
            header: 'required',
            desc: 'The name of the icon to use.'
          }
        ];

    return <ComponentInfo infoArray={info} />;
  }

});

module.exports = DatePickerPage;