let React = require('react');
let ComponentDoc = require('../../component-doc');
let mui = require('material-ui');
let ToggleStar = require('svg-icons/toggle/star');

let {
  ClearFix,
  FlatButton,
  FloatingActionButton,
  FontIcon,
  RaisedButton,
  Styles,
  Tab,
  Tabs,
  Utils
} = mui;
let extend = Utils.Extend;
let { Colors, Typography } = Styles;


class ButtonPage extends React.Component {

  constructor(props) {
    super(props);

    this.codeFlatButton =
      '//Flat Buttons\n' +
      '<FlatButton label="Default" />\n' +
      '<FlatButton label="Primary" primary={true} />\n' +
      '<FlatButton label="Secondary" secondary={true} />\n' +
      '<div style={styles.container}>\n' +
      '  <FlatButton primary={true} label="Choose an Image">\n' +
      '    <input type="file" id="imageButton" style={styles.exampleImageInput}></input>\n' +
      '  </FlatButton>\n' +
      '</div>\n' +
      '<div style={styles.container}>\n' +
      '  <FlatButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="GitHub">\n' +
      '    <FontIcon style={styles.exampleFlatButtonIcon} className="muidocs-icon-custom-github"/>\n' +
      '  </FlatButton>\n' +
      '</div>\n' +
      '<FlatButton label="Disabled" disabled={true} />';

    this.codeRaisedButton =
      '//Raised Buttons\n' +
      '<RaisedButton label="Default" />\n' +
      '<RaisedButton label="Primary" primary={true} />\n' +
      '<RaisedButton label="Secondary" secondary={true} />\n' +
      '<div style={styles.container}>\n' +
      '  <RaisedButton primary={true} label="Choose an Image">\n' +
      '    <input type="file" style={styles.exampleImageInput}></input>\n' +
      '  </RaisedButton>\n' +
      '</div>\n' +
      '<div style={styles.container}>\n' +
      '  <RaisedButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="Github">\n' +
      '    <FontIcon style={styles.exampleButtonIcon} className="muidocs-icon-custom-github"/>\n' +
      '  </RaisedButton>\n' +
      '</div>\n' +
      '<RaisedButton label="Disabled" disabled={true} />';

    this.codeFloatingActionButton =
      '//Floating Action Buttons\n' +
      '<FloatingActionButton>\n' +
      '  <ToggleStar />\n' +
      '</FloatingActionButton>\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} />\n' +
      '\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={true}>\n' +
      '<FloatingActionButton secondary={true} mini={true} linkButton={true}\n' +
      '  href="https://github.com/callemall/material-ui" />\n' +
      '  <ToggleStar />\n' +
      '</FloatingActionButton>\n' +
      '\n' +
      '<FloatingActionButton disabled={true}>\n' +
      '  <FontIcon className="muidocs-icon-action-grade" />\n' +
      '</FloatingActionButton>\n' +
      '<FloatingActionButton iconClassName="muidocs-icon-action-grade" disabled={true} mini={true} />\n';

    this.desc = 'This component generates a button element and all props except for ' +
                'the custom props below will be passed down to the button element. Also, ' +
                'focus styles will happen on tab but not on click.';

    this.componentInfo = [
      {
        name: 'Flat Button',
        infoArray: [
          {
            name: 'containerElement',
            type: 'oneOfType [string, element]',
            header: 'default: button',
            desc: 'This component will render a button element by default and an anchor element if linkButton is set to true. ' +
              'However, you can override this behavior by passing in a string or another react element into this prop. This is ' +
              'useful for generating link buttons with the react router link element.'
          },
          {
            name: 'disabled',
            type: 'bool',
            header: 'optional',
            desc: 'Disables the button if set to true.'
          },
          {
            name: 'hoverColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the inline hover color of the button\'s root element.'
          },
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
            name: 'rippleColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the inline color of the button\'s ripple element.'
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
            name: 'containerElement',
            type: 'oneOfType [string, element]',
            header: 'default: button',
            desc: 'This component will render a button element by default and an anchor element if linkButton is set to true. ' +
              'However, you can override this behavior by passing in a string or another react element into this prop. This is ' +
              'useful for generating link buttons with the react router link element.'
          },
          {
            name: 'disabled',
            type: 'bool',
            header: 'optional',
            desc: 'Disables the button if set to true.'
          },
          {
            name: 'fullWidth',
            type: 'bool',
            header: 'optional',
            desc: 'If true, will change the width of the button to span the full width of the parent.'
          },
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
            name: 'backgroundColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the background color. Always takes precedence unless the button is disabled.'
          },
          {
            name: 'labelColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the label color. Always takes precedence unless the button is disabled.'
          },
          {
            name: 'disabledBackgroundColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the background color if the button is disabled.'
          },
          {
            name: 'disabledLabelColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the label color if the button is disabled.'
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
            name: 'containerElement',
            type: 'oneOfType [string, element]',
            header: 'default: button',
            desc: 'This component will render a button element by default and an anchor element if linkButton is set to true. ' +
              'However, you can override this behavior by passing in a string or another react element into this prop. This is ' +
              'useful for generating link buttons with the react router link element.'
          },
          {
            name: 'disabled',
            type: 'bool',
            header: 'optional',
            desc: 'Disables the button if set to true.'
          },
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

  getStyles() {
    let styles = {
      container: {
        textAlign: 'center',
        marginBottom: '16px'
      },
      group: {
        float: 'left',
        width: '50%'
      },
      groupFloatingAction: {
        float: 'left',
        width: '33%'
      },
      buttonLabel: {
        padding: '0px 16px 0px 8px'
      },
      exampleIconButtonLabel: {
        padding: '0px 8px'
      },
      exampleImageButton: {
        whiteSpace: 'pre',
        cursor: 'pointer',
        position: 'relative',
        textAlign: 'center',
        lineHeight: '24px',
        width: '50%',
        top: '0px',
        left: '0px',
        marginTop: '24px',
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: '0px 8px'
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        width: '100%',
        opacity: '0'
      },
      exampleFlatButtonIcon: {
        height: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'left',
        paddingLeft: '12px',
        lineHeight: '36px',
        color: Colors.cyan500
      },
      exampleButtonIcon: {
        color: Typography.textFullWhite
      },
      headline: {
        //mui-font-style-headline
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack
      }
    };
    styles.exampleButtonIcon = extend(styles.exampleFlatButtonIcon, styles.exampleButtonIcon);
    return styles;
  }

  render() {
    let styles = this.getStyles();
    return (
      <div>
        <h2 style={styles.headline}>Buttons</h2>
        <Tabs>
          <Tab label="Flat Buttons">
            <ComponentDoc
              name=""
              code={this.codeFlatButton}
              desc={this.desc}
              componentInfo={this.componentInfo.slice(0,1)}>
              <div style={styles.group}>
                <div style={styles.container}>
                  <FlatButton label="Default" />
                </div>
                <div style={styles.container}>
                  <FlatButton label="Primary" primary={true} />
                </div>
                <div style={styles.container}>
                  <FlatButton label="Secondary" secondary={true} />
                </div>
              </div>
              <div style={styles.group}>
                <div style={styles.container}>
                  <FlatButton primary={true} label="Choose an Image">
                    <input type="file" id="imageButton" style={styles.exampleImageInput}></input>
                  </FlatButton>
                </div>
                <div style={styles.container}>
                  <FlatButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="GitHub" labelStyle={styles.buttonLabel}>
                    <FontIcon style={styles.exampleFlatButtonIcon} className="muidocs-icon-custom-github"/>
                  </FlatButton>
                </div>
                <div style={styles.container}>
                  <FlatButton label="Disabled" disabled={true} />
                </div>
              </div>
            </ComponentDoc>
          </Tab>
          <Tab label="Raised Buttons">
            <ComponentDoc
              name=""
              code={this.codeRaisedButton}
              desc={this.desc}
              componentInfo={this.componentInfo.slice(1,2)}>
              <div style={styles.group}>
                <div style={styles.container}>
                  <RaisedButton label="Default" />
                </div>
                <div style={styles.container}>
                  <RaisedButton label="Primary" primary={true} />
                </div>
                <div style={styles.container}>
                  <RaisedButton label="Secondary" secondary={true} />
                </div>
              </div>
              <div style={styles.group}>
                <div style={styles.container}>
                  <RaisedButton primary={true} label="Choose an Image">
                    <input type="file" style={styles.exampleImageInput}></input>
                  </RaisedButton>
                </div>
                <div style={styles.container}>
                  <RaisedButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="Github" labelStyle={styles.buttonLabel}>
                    <FontIcon style={styles.exampleButtonIcon} className="muidocs-icon-custom-github"/>
                  </RaisedButton>
                </div>
                <div style={styles.container}>
                  <RaisedButton label="Disabled" disabled={true} />
                </div>
              </div>
            </ComponentDoc>
          </Tab>
          <Tab label="Floating Action Buttons">
            <ComponentDoc
              name=""
              code={this.codeFloatingActionButton}
              desc={this.desc}
              componentInfo={this.componentInfo.slice(2)}>
              <div style={styles.groupFloatingAction}>
                <div style={styles.container}>
                  <FloatingActionButton>
                    <ToggleStar />
                  </FloatingActionButton>
                </div>
                <div style={styles.container}>
                  <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} />
                </div>
              </div>
              <div style={styles.groupFloatingAction}>
                <div style={styles.container}>
                  <FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={true} />
                </div>
                <div style={styles.container}>
                  <FloatingActionButton mini={true} secondary={true}>
                    <ToggleStar />
                  </FloatingActionButton>
                </div>
              </div>
              <div style={styles.groupFloatingAction}>
                <div style={styles.container}>
                  <FloatingActionButton disabled={true}>
                    <FontIcon className="muidocs-icon-action-grade" />
                  </FloatingActionButton>
                </div>
                <div style={styles.container}>
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
