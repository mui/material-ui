var React = require('react');
var mui = require('mui');
var FontIcon = mui.FontIcon;
var ComponentDoc = require('../../component-doc.jsx');

var FontIconPage = React.createClass({

	render: function() {
    var code =
      '<FontIcon className="icon-action-home"/>';

    var desc = <p className="mui-font-style-subhead-1">
                v0.7.0 has replaced Icon with FontIcon. This component will render any icon defined in 
                your style sheet. We are using <a title="Google's Material Design Icons GitHub" 
                href="https://github.com/google/material-design-icons">Google&#39;s Material Design Icons
                </a> for our documentation site along with some custom icons. We recommend using <a 
                title="Icomoon website" href="https://icomoon.io/">IcoMoon</a> for generating custom 
                icons font files. To use FontIcons, add the icon&#39;s as defined in your stylesheet 
                to the "className" prop.
              </p>;
              
    var componentInfo = [
      {
        name: 'FontIcon',
        infoArray: [
          {
            name: 'className',
            type: 'string',
            header: 'optional',
            desc: 'The icon\'s className as defined in your stylesheet. If you would like to '
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Font Icons"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>
          <FontIcon className="icon-action-home"/>
      </ComponentDoc>
		);
	}

});

module.exports = FontIconPage;