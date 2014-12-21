var React = require('react');
var mui = require('mui');
var FlatButton = mui.FlatButton;
var FloatingActionButton = mui.FloatingActionButton;
var RaisedButton = mui.RaisedButton;
var CodeExample = require('../../code-example/code-example.jsx');
var ComponentInfo = require('../../component-info.jsx');

var ButtonPage = React.createClass({

  render: function() {
    var code = 
      '//Flat Buttons\n' +
      '<FlatButton label="Default" />\n' +
      '<FlatButton label="Primary" primary={true} />\n' +
      '<FlatButton label="Secondary" secondary={true} />\n' +
      '<FlatButton label="Disabled" disabled={true} />\n\n' +
      '//Raised Buttons\n' + 
      '<RaisedButton label="Default" />\n' +
      '<RaisedButton label="Primary" primary={true} />\n' +
      '<RaisedButton label="Secondary" secondary={true} />\n' +
      '<RaisedButton label="Disabled" disabled={true} />\n\n' +
      '//Floating Action Buttons\n' +
      '<FloatingActionButton icon="action-grade" />\n' +
      '<FloatingActionButton icon="action-grade" mini={true} />\n' +
      '<FloatingActionButton icon="action-grade" disabled={true} />\n' +
      '<FloatingActionButton icon="action-grade" mini={true} disabled={true} />\n' +
      '<FloatingActionButton icon="action-grade" secondary={true} />\n' +
      '<FloatingActionButton icon="action-grade" mini={true} secondary={true} />';
    return (
    	<div>

    		<h2 className="mui-font-style-headline">Buttons</h2>
        <CodeExample code={code}>

          <div className="button-examples">

            <div className="button-example-group">
              <div className="button-example-container">
                <FlatButton label="Default" />
              </div>
              <div className="button-example-container">
                <FlatButton label="Primary" primary={true} />
              </div>
              <div className="button-example-container">
                <FlatButton label="Secondary" secondary={true} />
              </div>
              <div className="button-example-container">
                <FlatButton label="Disabled" disabled={true} />
              </div>
            </div>

            <div className="button-example-group">
              <div className="button-example-container">
                <RaisedButton label="Default" />
              </div>
              <div className="button-example-container">
                <RaisedButton label="Primary" primary={true} />
              </div>
              <div className="button-example-container">
                <RaisedButton label="Secondary" secondary={true} />
              </div>
              <div className="button-example-container">
                <RaisedButton label="Disabled" disabled={true} />
              </div>
            </div>

            <div className="button-example-group">
              <div className="button-example-container">
                <FloatingActionButton icon="action-grade" />
              </div>
              <div className="button-example-container">
                <FloatingActionButton icon="action-grade" mini={true} />
              </div>
              <div className="button-example-container">
                <FloatingActionButton icon="action-grade" disabled={true} />
              </div>
              <div className="button-example-container">
                <FloatingActionButton icon="action-grade" mini={true} disabled={true} />
              </div>
            </div>

            <div className="button-example-group">
              <div className="button-example-container">
                <FloatingActionButton icon="action-grade" secondary={true} />
              </div>
              <div className="button-example-container">
                <FloatingActionButton icon="action-grade" mini={true} secondary={true} />
              </div>
            </div>
          </div>

        </CodeExample>

        <p className="mui-font-style-subhead-1">
          This component generates a button element and all props except for 
          the custom props below will be passed down to the button element. Also, 
          focus styles will happen on tab but not on click.
        </p>

        <br/><hr/><br/>

        <h3 className="mui-font-style-title">Flat Button</h3>
        {this._getFlatButtonInfo()}

        <br/><hr/><br/>

        <h3 className="mui-font-style-title">Raised Button</h3>
        {this._getRaisedButtonInfo()}

        <br/><hr/><br/>

        <h3 className="mui-font-style-title">Floating Action Button</h3>
        {this._getFloatingActionButtonInfo()}

    	</div>
    );
  },

  _getFlatButtonInfo: function() {
    var info = [
          {
            name: 'label',
            type: 'string',
            header: 'required',
            desc: 'This is the text to display inside the button. This only applies to flat and ' +
              'raised buttons.'
          },
          {
            name: 'linkButton',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, an anchor element will be generated instead of a button element.'
          },
          {
            name: 'primary',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the button will use the primary button colors.'
          },
          {
            name: 'secondary',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the button will use the secondary button colors.'
          }
        ];

    return <ComponentInfo infoArray={info} />;
  },

  _getRaisedButtonInfo: function() {
    var info = [
          {
            name: 'label',
            type: 'string',
            header: 'required',
            desc: 'This is the text to display inside the button. This only applies to flat and ' +
              'raised buttons.'
          },
          {
            name: 'linkButton',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, an anchor element will be generated instead of a button element.'
          },
          {
            name: 'primary',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the button will use the primary button colors.'
          },
          {
            name: 'secondary',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the button will use the secondary button colors.'
          }
        ];

    return <ComponentInfo infoArray={info} />;
  },

  _getFloatingActionButtonInfo: function() {
    var info = [
          {
            name: 'icon',
            type: 'string',
            header: 'required',
            desc: 'This is the name of the icon to display inside the button. This only applies to ' +
              'floating action buttons.'
          },
          {
            name: 'linkButton',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, an anchor element will be generated instead of a button element.'
          },
          {
            name: 'mini',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the button will be a small floating action button.'
          },
          {
            name: 'secondary',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the button will use the secondary button colors.'
          }
        ];

    return <ComponentInfo infoArray={info} />;
  }

});

module.exports = ButtonPage;