var React = require('react');
var mui = require('mui');
var ComponentDoc = require('../../component-doc.jsx');

var {FlatButton, FloatingActionButton, FontIcon, RaisedButton, Tab, Tabs} = mui;

class ButtonPage extends React.Component {

  constructor(props) {
    super(props);

    this.codeFlatButton = 
      '//Flat Buttons\n' +
      '<FlatButton label="Default" />\n' +
      '<FlatButton label="Primary" primary={true} />\n' +
      '<FlatButton label="Secondary" secondary={true} />\n' +
      '<div className="button-example-container">\n' +
      '  <FlatButton primary={true} label="Choose an Image">\n' +
      '    <input type="file" id="imageButton" className="example-image-input"></input>\n' +
      '  </FlatButton>\n' +
      '</div>\n' +
      '<div className="button-example-container">\n' +
      '  <FlatButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="GitHub">\n' +
      '    <FontIcon className="muidocs-icon-custom-github example-flat-button-icon"/>\n' +
      '  </FlatButton>\n' +
      '</div>\n' +
      '<FlatButton label="Disabled" disabled={true} />';

    this.codeRaisedButton =     
      '//Raised Buttons\n' +
      '<RaisedButton label="Default" />\n' +
      '<RaisedButton label="Primary" primary={true} />\n' +
      '<RaisedButton label="Secondary" secondary={true} />\n' +
      '<div className="button-example-container">\n' +
      '  <RaisedButton primary={true} label="Choose an Image">\n' +
      '    <input type="file" className="example-image-input"></input>\n' +
      '  </RaisedButton>\n' +
      '</div>\n' +
      '<div className="button-example-container">\n' +
      '  <RaisedButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="Github">\n' +
      '    <FontIcon className="muidocs-icon-custom-github example-button-icon"/>\n' +
      '  </RaisedButton>\n' +
      '</div>\n' +
      '<RaisedButton label="Disabled" disabled={true} />';

    this.codeFloatingActionButton = 
      '//Floating Action Buttons\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" />\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} />\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" disabled={true} />\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} disabled={true} />\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={true} />\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} secondary={true} />';          
  
    this.desc = 'This component generates a button element and all props except for ' +
                'the custom props below will be passed down to the button element. Also, ' +
                'focus styles will happen on tab but not on click.';

    this.componentInfo = [
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
            name: 'labelStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the button\'s label element.'
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
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the button\'s root element.'
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
            name: 'labelStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the button\'s label element.'
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
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the button\'s root element.'
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
            desc: 'The icon within the FloatingActionButton is a FontIcon component. This property ' +
                  'is the classname of the icon to be displayed inside the button. An alternative ' +
                  'to adding an iconClassName would be to manually insert a FontIcon component or ' +
                  'custom SvgIcon component or as a child of FloatingActionButton.'
          },
          {
            name: 'iconStyle',
            type: 'object',
            header: 'optional',
            desc: 'This is the equivalent to iconClassName except that it is used for overriding ' +
                  'the inline-styles of the FontIcon component.'
          },
          {
            name: 'innerStyle',
            type: 'object',
            header: 'optional',
            desc: 'Propagated down to the innerStyle prop of the component\'s Paper element.'
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
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the button\'s root element.'
          }
        ]
      }
    ];
  }

  /** Styles */
  _buttonLabel() {
    return {
      padding: '0px 16px 0px 8px',
    }
  }

  render() {
    return (
      <div>
        <h2 className="mui-font-style-headline">Buttons</h2>
        <Tabs>
          <Tab label="Flat Buttons">
            <ComponentDoc
              name=""
              code={this.codeFlatButton}
              desc={this.desc}
              componentInfo={this.componentInfo.slice(0,1)}
              className="button-examples">
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
              </div>
              <div className="button-example-group">
                <div className="button-example-container">
                  <FlatButton primary={true} label="Choose an Image">
                    <input type="file" id="imageButton" className="example-image-input"></input>
                  </FlatButton>
                </div>
                <div className="button-example-container">
                  <FlatButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="GitHub" labelStyle={this._buttonLabel()}>
                    <FontIcon className="muidocs-icon-custom-github example-flat-button-icon"/>
                  </FlatButton>
                </div>
                <div className="button-example-container">
                  <FlatButton label="Disabled" disabled={true} />
                </div>
              </div>
            </ComponentDoc>
          </Tab>
          <Tab label="Raised Buttons">
            <ComponentDoc
              name=""
              code={this.codeFlatButton}
              desc={this.desc}
              componentInfo={this.componentInfo.slice(1,2)}
              className="button-examples">
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
              </div>
              <div className="button-example-group">
                <div className="button-example-container">
                  <RaisedButton primary={true} label="Choose an Image">
                    <input type="file" className="example-image-input"></input>
                  </RaisedButton>
                </div>
                <div className="button-example-container">
                  <RaisedButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="Github" labelStyle={this._buttonLabel()}>
                    <FontIcon className="muidocs-icon-custom-github example-button-icon"/>
                  </RaisedButton>
                </div>
                <div className="button-example-container">
                  <RaisedButton label="Disabled" disabled={true} />
                </div>
              </div>
            </ComponentDoc>
          </Tab>
          <Tab label="Floating Action Buttons">
            <ComponentDoc
              name=""
              code={this.codeFlatButton}
              desc={this.desc}
              componentInfo={this.componentInfo.slice(2)}
              className="button-examples">
              <div className="button-example-group-floating-action">
                <div className="button-example-container">
                  <FloatingActionButton iconClassName="muidocs-icon-action-grade" />
                </div>
                <div className="button-example-container">
                  <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} />
                </div>
              </div>
              <div className="button-example-group-floating-action">
                <div className="button-example-container">
                  <FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={true} />
                </div>
                <div className="button-example-container">
                  <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} secondary={true} />
                </div>
              </div>
              <div className="button-example-group-floating-action">
                <div className="button-example-container">
                  <FloatingActionButton iconClassName="muidocs-icon-action-grade" disabled={true} />
                </div>
                <div className="button-example-container">
                  <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} disabled={true} />
                </div>
              </div>              
            </ComponentDoc>
          </Tab>
        </Tabs>
      </div>
    );
  }

}

module.exports = ButtonPage;
