var React = require('react');
var mui = require('mui');
var Input = mui.Input;
var ComponentDoc = require('../../component-doc.jsx');

var InputsPage = React.createClass({

  render: function() {

    var code = 
      '// Default\n' +
      '<Input ref="firstname" type="text" name="firstname" placeholder="First Name" />\n' +
      '// With description\n' +
      '<Input ref="lastname" type="text" name="lastname" placeholder="Last Name" description="Your last name as it appears on your credit card." />\n' +
      '// Disabled\n' +
      '<Input ref="addressline1" type="text" name="addressline1" disabled={true} placeholder="Address Line 1" />\n' +
      '// Disabled with value\n' +
      '<Input ref="addressline2" type="text" name="addressline2" disabled={true} defaultValue="with value" placeholder="Address Line 2" />\n' +
      '// With error\n' +
      '<Input ref="city" type="text" name="city" defaultValue="Detroit" placeholder="City" description="Your city as it appears on your credit card." error="Can\'t process city name" />\n' +
      '// Inline placeholder\n' +
      '<Input ref="state" type="text" name="state" inlinePlaceholder={true} placeholder="State" description="Your state as it appears on your credit card." />\n' +
      '// Input style "float"\n' +
      '<Input ref="allegiance" inputStyle="floating" type="text" name="allegiance" placeholder="Allegiance" description="The house of which you served under." />\n' +
      '// Textarea\n' +
      '<Input ref="phones" multiline={true} rows={5} type="text" name="phones" placeholder="Phone numbers" description="Your phone numbers." />';

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'description',
            type: 'string',
            header: 'optional',
            desc: 'Input description.'
          },
          {
            name: 'error',
            type: 'string',
            header: 'optional',
            desc: 'Error message.'
          },
          {
            name: 'inlinePlaceholder',
            type: 'bool',
            header: 'default: false',
            desc: 'Placeholder will be inline.'
          },
          {
            name: 'multiline',
            type: 'bool',
            header: 'default: false',
            desc: 'Input becames multiline (textarea).'
          },
          {
            name: 'name',
            type: 'string',
            header: 'required',
            desc: 'Input name.'
          },
          {
            name: 'placeholder',
            type: 'string',
            header: 'optional',
            desc: 'Input placeholder.'
          },
          {
            name: 'required',
            type: 'bool',
            header: 'default: true',
            desc: 'Is required.'
          },
          {
            name: 'rows',
            type: 'bool',
            header: 'default: false',
            desc: 'Count of rows in textarea related to multiline: true.'
          },
          {
            name: 'type',
            type: 'string',
            header: 'default: "text"',
            desc: 'Input type, current supports only text and email.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'blur',
            header: 'Input.blur()',
            desc: 'Blur input.'
          },
          {
            name: 'clearValue',
            header: 'Input.clearValue()',
            desc: 'Clearing value.'
          },
          {
            name: 'focus',
            header: 'Input.focus()',
            desc: 'Focus input.'
          },
          {
            name: 'getValue',
            header: 'Input.getValue()',
            desc: 'Getting value.'
          },
          {
            name: 'setValue',
            header: 'Input.setValue("txt")',
            desc: 'Setting value.'
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onChange',
            header: 'function(e, value)',
            desc: 'Fired when the input is changed.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Inputs"
        code={code}
        componentInfo={componentInfo}>

        <Input ref="firstname" type="text" name="firstname" placeholder="First Name" />
        <Input ref="lastname" type="text" name="lastname" placeholder="Last Name" description="Your last name as it appears on your credit card." />
        <Input ref="addressline1" type="text" name="addressline1" disabled={true} placeholder="Address Line 1" />
        <Input ref="addressline2" type="text" name="addressline2" disabled={true} defaultValue="with value" placeholder="Address Line 2" />
        <Input ref="city" type="text" name="city" defaultValue="Detroit" placeholder="City" description="Your city as it appears on your credit card." error="Can't process city name" />
        <Input ref="state" type="text" name="state" inlinePlaceholder={true} placeholder="State" description="Your state as it appears on your credit card." />
        <Input ref="allegiance" inputStyle="floating" type="text" name="allegiance" placeholder="Allegiance" description="The house of which you served under." />
        <Input ref="phones" multiline={true} rows={5} type="text" name="phones" placeholder="Phone numbers" description="Your phone numbers." />

      </ComponentDoc>
    );
  }

});

module.exports = InputsPage;