var React = require('react');

class ComponentInfo extends React.Component {

  render() {
    var propElements = [],
      typesSpan;

    this.props.infoArray.forEach(function(info, i) {

      if (info.type) typesSpan = <span className="component-info-type">{info.type}</span>;

      propElements.push(
        <tr key={i}>
          <td className="component-info-name">{info.name}</td>
          <td className="component-info-desc">
            <p className="component-info-header">{typesSpan}{info.header}</p>
            <p>{info.desc}</p>
          </td>
        </tr>
      );
    });

    return (
      <div className="component-info">
        <h3 className="mui-font-style-title">{this.props.name}</h3>
        <table>
          <tbody>
            {propElements}
          </tbody>
        </table>
      </div>
    );
  }

}

ComponentInfo.propTypes = {
  name: React.PropTypes.string.isRequired,
  infoArray: React.PropTypes.array.isRequired
};

module.exports = ComponentInfo;
