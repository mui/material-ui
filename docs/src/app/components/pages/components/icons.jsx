var React = require('react');
var mui = require('mui');
var ComponentDoc = require('../../component-doc.jsx');
var ActionHome = require('../../svg-icons/action-home.jsx');

var Typography = mui.Styles.Typography;
var {ClearFix, FontIcon} = mui;

class FontIconPage extends React.Component {

  getStyles() {
    return {
      //mui-font-style-subhead-2
      fontSize: '15px',
      letterSpacing: '0',
      fontWeight: Typography.fontWeightNormal,
      color: Typography.textDarkBlack,
      lineHeight: '24px',
      paddingTop: '3px',
      marginBottom: '13px'
    };
  }

	render() {
    var fontIconCode =
      '<FontIcon className="muidocs-icon-action-home"/>';

    var svgIconCode =
      '/** action-home.jsx */\n' +
      'var React = require(\'react\');\n' +
      'var mui = require(\'mui\');\n' +
      'var SvgIcon = mui.SvgIcon;\n\n' +
      'var ActionHome = React.createClass({\n' +
      '  render: function() {\n' +
      '    return (\n' +
      '      <SvgIcon {...this.props}>\n' +
      '        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>\n' +
      '      </SvgIcon>\n' +
      '    );\n' +
      '  }\n' +
      '});\n\n' +
      'module.exports = ActionHome;\n\n\n' +
      '/** Some other component. */\n' +
      'var ActionHome = require(\'./path/to/action-home.jsx\');\n' +
      '...\n' +
      '<ActionHome/>\n' +
      '...';

    var fontIconDesc = (
      <p style={this.getStyles()}>
        This component will render any icon defined in any style sheets included in your
        project. We are using <a title="Google's Material Design Icons GitHub"
        href="https://github.com/google/material-design-icons">Google&#39;s Material Design
        Icons</a> for our documentation site along with some custom icons. You can use
        sites like <a title="Icomoon website" href="https://icomoon.io/">IcoMoon</a> for
        generating custom font files. To use FontIcons, add your stylesheet to your project
        and reference the icon&#39;s className in the "className" prop.
      </p>
    );

    var svgIconDesc = (
      <p style={this.getStyles()}>
        Alternatively, it is possible to include svg icons using mui.SvgIcon to
        create a custom svg component. Here we are creating the ActionHome
        SvgIcon for this docs site, and using it in some seperate component.
        Custom SvgIcon components can be included as children for other Material
        UI components that use icons such as <a title="Example of SvgIcon usage"
        href="#/components/icon-buttons">IconButtons</a>.
      </p>
    );

    var componentInfo = [
      {
        name: 'Properties',
        infoArray: [
          {
            name: 'className',
            type: 'string',
            header: 'optional',
            desc: 'If you are using a stylesheet for your icons, enter the ' +
                  'class name for the icon to be used here.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the icon\'s root element.'
          },
          {
            name: 'hoverColor',
            type: 'string',
            header: 'optional',
            desc: 'Override the inline hover color of the icons\'s root element.'
          }
        ]
      },
      {
        name: 'Properties',
        infoArray: [],
      }
    ];

    return (
      <div>
        <ComponentDoc
          name="Font Icons"
          code={fontIconCode}
          desc={fontIconDesc}
          componentInfo={componentInfo.slice(0,1)}>
            <FontIcon className="muidocs-icon-action-home"/>
        </ComponentDoc>
        <ComponentDoc
          name="SVG Icons"
          code={svgIconCode}
          desc={svgIconDesc}
          componentInfo={componentInfo.slice(1,2)}>
            <ActionHome/>
        </ComponentDoc>
      </div>
		);
	}

}

module.exports = FontIconPage;
