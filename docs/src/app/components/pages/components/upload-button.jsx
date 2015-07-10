let React = require('react');
let ComponentDoc = require('../../component-doc');
let mui = require('material-ui');

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
            name: 'backgroundColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the background color. Always takes precedence unless the button is disabled.'
          },
          {
            name: 'disabledBackgroundColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the background color if the button is disabled.'
          },
          {
            name: 'disabled',
            type: 'bool',
            header: 'optional',
            desc: 'Disables the button if set to true.'
          },
          {
            name: 'disabledLabelColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the label color if the button is disabled.'
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
            name: 'labelColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the label color. Always takes precedence unless the button is disabled.'
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
            name: 'ref',
            type: 'string',
            header: 'optional',
            desc: 'Set the input ref.'
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
