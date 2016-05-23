import React from 'react';
import Title from 'react-title-component';
import Checkbox from 'material-ui/Checkbox';
import CodeExample from '../../CodeExample';
import typography from 'material-ui/styles/typography';

class InlineStyles extends React.Component {
  getStyles() {
    return {
      headline: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
        letterSpacing: 0,
        fontWeight: typography.fontWeightNormal,
        color: typography.textDarkBlack,
      },
      title: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        fontWeight: typography.fontWeightMedium,
        color: typography.textDarkBlack,
      },
    };
  }

  render() {
    const codeOverrideStyles =
      '<Checkbox\n' +
      '  id="checkboxId1"\n' +
      '  name="checkboxName1"\n' +
      '  value="checkboxValue1"\n' +
      '  label="went for a run today"\n' +
      '  style={{\n' +
      '    width: \'50%\',\n' +
      '    margin: \'0 auto\'\n' +
      '  }}\n' +
      '  iconStyle={{\n' +
      '    fill: \'#FF4081\'\n' +
      '  }}/>';
    const codeMixStyles =
      '<Checkbox\n' +
      '  id="checkboxId1"\n' +
      '  name="checkboxName1"\n' +
      '  value="checkboxValue1"\n' +
      '  label="went for a run today"\n' +
      '  className="muidocs-checkbox-example"\n' +
      '  iconStyle={{\n' +
      '    fill: \'#FF9800\'\n' +
      '  }}/>\n\n' +
      '/* In our CSS file */\n' +
      '.muidocs-checkbox-example { \n' +
      '  border: 2px solid #0000FF;\n' +
      '  background-color: #FF9800;\n' +
      '}';

    const styles = this.getStyles();

    return (
      <div>
        <Title render={(previousTitle) => `Inline Styles - ${previousTitle}`} />
        <h2 style={styles.headline}>Inline Styles</h2>
        <p>
          All Material-UI components have their styles defined inline. You can read
          the <a href="https://github.com/callemall/material-ui/issues/30">
          discussion thread</a> regarding this decision as well
          as <a href="https://speakerdeck.com/vjeux/react-css-in-js">
          this presentation</a> discussing CSS in JS.
        </p>

        <h3 style={styles.title}>Overriding Inline Styles</h3>
        <CodeExample code={codeOverrideStyles} component={false}>
          <Checkbox
            id="checkboxId1"
            name="checkboxName1"
            value="checkboxValue1"
            label="Checked the mail"
            style={{
              width: '50%',
              margin: '0 auto',
            }}
            iconStyle={{
              fill: '#FF4081',
            }}
          />
        </CodeExample>
        <p>
          If you would like to override a style property that has been defined
          inline, define your override via the style prop as demonstrated in
          the example above. These overrides take precedence over the theme (if any) that is used
          to render the component. The style prop is an object that applies its
          properties to the <b>root/outermost element</b> of the component. Some
          components provide additional style properties for greater styling
          control. If you need to override the inline styles of an element
          nested deep within a component and there is not a style property
          available to do so, please <a href="https://github.com/callemall/material-ui/issues">
          submit an issue</a> requesting to have one added.
        </p>

        <h3 style={styles.title}>Mixing Inline and CSS Styles</h3>
        <CodeExample code={codeMixStyles} component={false}>
          <Checkbox
            id="checkboxId1"
            name="checkboxName1"
            value="checkboxValue1"
            label="Currently a UTD student"
            className="muidocs-checkbox-example"
            iconStyle={{
              fill: '#FF9800',
            }}
          />
        </CodeExample>
        <p>
          If you would like to add additional styling via CSS, pass in the
          class name via the className prop. The className prop is similar to
          the style prop in that it only applies to the root element. Note that
          CSS properties defined inline are given priority over those defined
          in a CSS class. Take a look at a component&#39;s <code>getStyles
          </code> function to see what properties are defined inline.
        </p>
      </div>
    );
  }
}

export default InlineStyles;
