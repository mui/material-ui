/**
 * @jsx React.DOM
 */

var React = require('react');

var ComponentInfo = React.createClass({

  propTypes: {
    infoArray: React.PropTypes.array.isRequired
  },

  render: function() {
    var propElements = [],
      typesSpan;

    this.props.infoArray.forEach(function(info) {

      if (info.type) typesSpan = <span className="component-info-type">{info.type}</span>;

      propElements.push(
        <tr>
          <td className="component-info-name">{info.name}</td>
          <td className="component-info-desc">
            <p className="component-info-header">{typesSpan}{info.header}</p>
            <p>{info.desc}</p>
          </td>
        </tr>
      );
    });

    return (
      <table className="component-info">
        <tbody>
          {propElements}
        </tbody>
      </table>
    );
  }

});

module.exports = ComponentInfo;
