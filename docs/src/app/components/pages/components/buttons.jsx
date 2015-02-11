var React = require('react');
var mui = require('mui');
var FlatButton = mui.FlatButton;
var FloatingActionButton = mui.FloatingActionButton;
var RaisedButton = mui.RaisedButton;
var FontIcon = mui.FontIcon;
var ComponentDoc = require('../../component-doc.jsx');

var ButtonPage = React.createClass({

  render: function() {

    var code = 
      '//Flat Buttons\n' +
      '<FlatButton label="Default" />\n' +
      '<FlatButton label="Primary" primary={true} />\n' +
      '<FlatButton label="Secondary" secondary={true} />\n' +
      '<FlatButton secondary={true}>\n' +
      '  <span className="mui-flat-button-label example-image-button">Choose an Image</span>\n' +
      '  <input type="file" id="imageButton" className="example-image-input"></input>\n' +
      '</FlatButton>\n' +
      '<div className="button-example-container">\n' +
      '  <FlatButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true}>\n' +
      '    <FontIcon className="muidocs-icon-custom-github example-flat-button-icon"/>\n' +
      '    <span className="mui-flat-button-label">Github</span>\n' +
      '  </FlatButton>\n' +
      '</div>\n' +
      '<FlatButton label="Disabled" disabled={true} />\n\n' +
      '//Raised Buttons\n' + 
      '<RaisedButton label="Default" />\n' +
      '<RaisedButton label="Primary" primary={true} />\n' +
      '<RaisedButton label="Secondary" secondary={true} />\n' +
      '<RaisedButton secondary={true}>\n' +
      '  <span className="mui-raised-button-label example-image-button">Choose an Image</span>\n' +
      '  <input type="file" id="imageButton" className="example-image-input"></input>\n' +
      '</RaisedButton>\n' +
      '<div className="button-example-container">\n' +
      '  <RaisedButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true}>\n' +
      '    <FontIcon className="muidocs-icon-custom-github example-button-icon"/>\n' +
      '    <span className="mui-raised-button-label example-icon-button-label">Github</span>\n' +
      '  </RaisedButton>\n' +
      '</div>\n' +
      '<RaisedButton label="Disabled" disabled={true} />\n\n' +
      '//Floating Action Buttons\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" />\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} />\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" disabled={true} />\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} disabled={true} />\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={true} />\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} secondary={true} />';

    var desc = 'This component generates a button element and all props except for ' +
      'the custom props below will be passed down to the button element. Also, ' +
      'focus styles will happen on tab but not on click.';

    var componentInfo = [
      {
        name: 'Flat Button',
        infoArray: [
          {
            name: 'label or children',
            type: 'string (label) or HTML/React elements (children)',
            header: 'required',
            desc: 'This is what will be displayed inside the button. If a label is specified, the text within the label prop will be displayed.'+
            ' Otherwise, the component will expect children which will then be displayed (in our example, we are nesting an <input type="file" />'+
            'and a span that acts as our label to be displayed.) '+
            'This only applies to flat and raised buttons.'
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
        ]
      },
      {
        name: 'Raised Button',
        infoArray: [
          {
            name: 'label or children',
            type: 'string (label) or HTML/React elements (children)',
            header: 'required',
            desc: 'This is what will be displayed inside the button. If a label is specified, the text within the label prop will be displayed.'+
            ' Otherwise, the component will expect children which will then be displayed (in our example, we are nesting an <input type="file" />'+
            'and a span that acts as our label to be displayed.) '+
            'This only applies to flat and raised buttons.'
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
        ]
      },
      {
        name: 'Floating Action Button',
        infoArray: [
          {
            name: 'iconClassName',
            type: 'string',
            header: 'optional',
            desc: 'This is the classname of the icon to display inside the button. This only applies to ' +
              'floating action buttons. An alternative to adding an icon would be to insert a custom svg ' + 
              'component or FontIcon as a child.'
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
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Buttons"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

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
              <FlatButton secondary={true}>
                <span className="mui-flat-button-label example-image-button">Choose an Image</span>
                <input type="file" id="imageButton" className="example-image-input"></input>
              </FlatButton>
            </div>
            <div className="button-example-container">
              <FlatButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true}>
                <FontIcon className="muidocs-icon-custom-github example-flat-button-icon"/>
                <span className="mui-flat-button-label">Github</span>
              </FlatButton>
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
              <RaisedButton secondary={true}>
                <span className="mui-raised-button-label example-image-button">Choose an Image</span>
                <input type="file" className="example-image-input"></input>
              </RaisedButton>
            </div>
            <div className="button-example-container">
              <RaisedButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true}>
                <FontIcon className="muidocs-icon-custom-github example-button-icon"/>
                <span className="mui-raised-button-label example-icon-button-label">Github</span>
              </RaisedButton>
            </div>
            <div className="button-example-container">
              <RaisedButton label="Disabled" disabled={true} />
            </div>
          </div>

          <div className="button-example-group">
            <div className="button-example-container">
              <FloatingActionButton iconClassName="muidocs-icon-action-grade" />
            </div>
            <div className="button-example-container">
              <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} />
            </div>
            <div className="button-example-container">
              <FloatingActionButton iconClassName="muidocs-icon-action-grade" disabled={true} />
            </div>
            <div className="button-example-container">
              <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} disabled={true} />
            </div>
          </div>

          <div className="button-example-group">
            <div className="button-example-container">
              <FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={true} />
            </div>
            <div className="button-example-container">
              <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} secondary={true} />
            </div>
          </div>

        </div>

      </ComponentDoc>
    );
  }

});

module.exports = ButtonPage;