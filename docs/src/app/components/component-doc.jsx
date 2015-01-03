var React = require('react');
var CodeExample = require('./code-example/code-example.jsx');
var ComponentInfo = require('./component-info.jsx');

var ComponentDoc = React.createClass({

  propTypes: {
    code: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    componentInfo: React.PropTypes.array.isRequired
  },

  render: function() {
    var componentInfo = this.props.componentInfo.map(function(info) {
      return (
        <ComponentInfo
          name={info.name}
          infoArray={info.infoArray} />
      );
    });

    var desc = this.props.desc ? (
      <p className="mui-font-style-subhead-1 component-doc-desc">{this.props.desc}</p>
    ) : null;

    return (
      <div className="component-doc">
      
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