import React from 'react';
import {parse} from 'react-docgen';
import StylePropable from 'material-ui/mixins/style-propable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const styles = {
  prop: {
    padding: '5px 10px',
  },
  key: {
    fontWeight: 500,
    fontSize: 16,
    marginRight: 2,
  },
  title: {
    margin: '10px 0',
    fontWeight: 400,
    fontSize: 15,
  },
  description: {
    fontSize: 15,
    margin: '10px 0',
  },
  propOdd: {
    backgroundColor: '#F0FAFF',
  },
  propEven: {
    backgroundColor: '#E0F6FF',
  },
};

function generatePropType(type) {
  switch (type.name) {
    case 'func':
      return 'function';

    case 'custom':
      return type.raw;

    default:
      return type.name;
  }
}

const Description = React.createClass({
  propTypes: {
    source: React.PropTypes.string,
  },
  mixins: [
    PureRenderMixin,
  ],
  render() {
    const {
      source,
    } = this.props;

    const componentInfo = parse(source);
    const props = [];

    for (let key in componentInfo.props) {
      const prop = componentInfo.props[key];

      const style = props.length % 2 === 1 ? styles.propEven : styles.propOdd;

      props.push(
        <div key={key} style={StylePropable.mergeStyles(styles.prop, style)}>
          <h3 style={styles.title}>
            <span style={styles.key}>{key}</span>
            {' ' + generatePropType(prop.type)}
            {' - ' + (prop.required ? 'required' : 'optional')}
            {prop.defaultValue && ' - default value: ' + prop.defaultValue.value}
          </h3>
          <div style={styles.description}>
            {prop.description}
          </div>
        </div>
      );
    }

    return (
      <div>
        {props}
      </div>
    );
  },
});

export default Description;
