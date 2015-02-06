var React = require('react');
var mui = require('mui');
var Classable = mui.Mixins.Classable;
var CodeExample = require('./code-example/code-example.jsx');
var ComponentInfo = require('./component-info.jsx');

var ComponentDoc = React.createClass({

  mixins: [Classable],

  propTypes: {
    code: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    componentInfo: React.PropTypes.array.isRequired
  },

  render: function() {
    var classes = this.getClasses("component-doc");

    var componentInfo = this.props.componentInfo.map(function(info, i) {
      return (
        <ComponentInfo
          key={i}
          name={info.name}
          infoArray={info.infoArray} />
      );
    });

    var desc = null;

    if (this.props.desc) {
      if ((typeof this.props.desc) == "string") {
        desc = <p className="mui-font-style-subhead-1 component-doc-desc">{this.props.desc}</p>
      } else {
        desc = <div className="mui-font-style-subhead-1 component-doc-desc">{this.props.desc}</div>
      }
    }

    return (
      <div className={classes}>
      
        <h2 className="mui-font-style-headline">{this.props.name}</h2>

        <CodeExample code={this.props.code}>
          {this.props.children}
        </CodeExample>

        {desc}

        <div className="component-doc-info">
          {componentInfo}
        </div>

      </div>
    );
  }

});

module.exports = ComponentDoc;