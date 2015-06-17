var React = require('react');
var mui = require('mui');
var Colors = mui.Styles.Colors;
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
    var fontIconCode = `
<FontIcon className="muidocs-icon-action-home" />
<FontIcon className="muidocs-icon-action-home" color={Colors.red500} />
<FontIcon className="muidocs-icon-action-home" color={Colors.yellow500} />
<FontIcon className="muidocs-icon-action-home" color={Colors.blue500} />

<FontIcon className="muidocs-icon-action-home"
  hoverColor={Colors.greenA200} />
<FontIcon className="muidocs-icon-action-home" color={Colors.red500}
  hoverColor={Colors.greenA200} />
<FontIcon className="muidocs-icon-action-home" color={Colors.yellow500}
  hoverColor={Colors.greenA200} />
<FontIcon className="muidocs-icon-action-home" color={Colors.blue500}
  hoverColor={Colors.greenA200} />
    `;

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
            name: 'color',
            type: 'string',
            header: 'optional',
            desc: 'This is the font color of the font icon. If not specified, ' +
              'this component will default to muiTheme.palette.textColor.'
          },
          {
            name: 'hoverColor',
            type: 'string',
            header: 'optional',
            desc: 'This is the icon color when the mouse hovers over the icon.'
          }
        ]
      },
      {
        name: 'Properties',
        infoArray: [
          {
            name: 'color',
            type: 'string',
            header: 'optional',
            desc: 'This is the fill color of the svg icon. If not specified, ' +
              'this component will default to muiTheme.palette.textColor.'
          },
          {
            name: 'hoverColor',
            type: 'string',
            header: 'optional',
            desc: 'This is the icon color when the mouse hovers over the icon.'
          }
        ],
      }
    ];

    var iconStyles = {
      marginRight: 24
    };

    return (
      <div>
        <ComponentDoc
          name="Font Icons"
          code={fontIconCode}
          desc={fontIconDesc}
          componentInfo={componentInfo.slice(0,1)}>
          <FontIcon className="muidocs-icon-action-home" style={iconStyles} />
          <FontIcon className="muidocs-icon-action-home" style={iconStyles} color={Colors.red500} />
          <FontIcon className="muidocs-icon-action-home" style={iconStyles} color={Colors.yellow500} />
          <FontIcon className="muidocs-icon-action-home" style={iconStyles} color={Colors.blue500} />
          <br/><br/>
          <FontIcon className="muidocs-icon-action-home" style={iconStyles} hoverColor={Colors.greenA200} />
          <FontIcon className="muidocs-icon-action-home" style={iconStyles} color={Colors.red500} hoverColor={Colors.greenA200} />
          <FontIcon className="muidocs-icon-action-home" style={iconStyles} color={Colors.yellow500} hoverColor={Colors.greenA200} />
          <FontIcon className="muidocs-icon-action-home" style={iconStyles} color={Colors.blue500} hoverColor={Colors.greenA200} />
        </ComponentDoc>
        <ComponentDoc
          name="SVG Icons"
          code={svgIconCode}
          desc={svgIconDesc}
          componentInfo={componentInfo.slice(1,2)}>
          <ActionHome style={iconStyles} />
          <ActionHome style={iconStyles} color={Colors.red500} />
          <ActionHome style={iconStyles} color={Colors.yellow500} />
          <ActionHome style={iconStyles} color={Colors.blue500} />
          <br/><br/>
          <ActionHome style={iconStyles} hoverColor={Colors.greenA200} />
          <ActionHome style={iconStyles} color={Colors.red500} hoverColor={Colors.greenA200} />
          <ActionHome style={iconStyles} color={Colors.yellow500} hoverColor={Colors.greenA200} />
          <ActionHome style={iconStyles} color={Colors.blue500} hoverColor={Colors.greenA200} />
        </ComponentDoc>
      </div>
		);
	}

}

module.exports = FontIconPage;
