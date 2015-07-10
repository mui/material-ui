let React = require('react');
let ComponentDoc = require('../../component-doc');
let mui = require('material-ui');
let ToggleStar = require('svg-icons/toggle/star');

let {
  ClearFix,
  Styles,
  UploadButton,
  Utils
} = mui;
let extend = Utils.Extend;
let { Colors, Typography } = Styles;


class UploadPage extends React.Component {

  constructor(props) {
    super(props);


    this.codeRaisedButton =
      '//Upload Buttons\n' +
      '<UploadButton label="Default" />\n' +
      '<UploadButton label="Primary" primary={true} />\n' +
      '<UploadButton label="Secondary" secondary={true} />\n' +
      '<UploadButton label="Disabled" disabled={true} />';


    this.desc = 'This component generates a upload button, with material design ' +
                'it offers you an onChange method that acts like a callback to the ' +
                'actual input.';

    this.componentInfo = [
      {
        name: 'Upload Button',
        infoArray: [
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
            name: 'label',
            type: 'string',
            header: 'required',
            desc: 'This is what will be displayed inside the button.'+
            ' If you are not using valueLink, the label will change to the file name after the input changes.'
          },
          {
            name: 'labelStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the button\'s label element.'
          },
          {
            name: 'name',
            type: 'string',
            header: 'optional',
            desc: 'Set the input name.'
          },
          {
            name: 'ref',
            type: 'string',
            header: 'optional',
            desc: 'Set the input ref.'
          },
          {
            name: 'onChange',
            type: 'function',
            header: 'optional',
            desc: 'Acts like a callback function, that is triggered after the input update.'
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
        <h2 style={styles.headline}>Upload Button</h2>
            <ComponentDoc
              name=""
              code={this.codeRaisedButton}
              desc={this.desc}
              componentInfo={this.componentInfo}>
              <div style={styles.group}>
                <div style={styles.container}>
                  <UploadButton label="Default" />
                </div>
                <div style={styles.container}>
                  <UploadButton label="Primary" primary={true} />
                </div>
                <div style={styles.container}>
                  <UploadButton label="Secondary" secondary={true} />
                </div>
              </div>
              <div style={styles.group}>
                <div style={styles.container}>
                  <UploadButton label="Disabled" disabled={true} />
                </div>
              </div>
            </ComponentDoc>
      </div>
    );
  }

}

module.exports = UploadPage;
