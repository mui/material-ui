import React from 'react';
import {parse} from 'react-docgen';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MarkdownElement from './MarkdownElement';

require('./prop-type-description.css');

function generatePropType(type) {
  switch (type.name) {
    case 'func':
      return 'function';

    case 'custom':
      return type.raw;

    case 'enum':
      const values = type.value.map(v => v.value).join(', ');
      return `enum[${values}]`;

    default:
      return type.name;
  }
}

const PropTypeDescription = React.createClass({
  propTypes: {
    code: React.PropTypes.string,
    header: React.PropTypes.string,
  },
  getDefaultProps() {
    return {
      header: '### Properties',
    };
  },
  mixins: [
    PureRenderMixin,
  ],
  render() {
    const {
      code,
      header,
    } = this.props;

    let text = `${header}
| Name | Type | Default | Description|
|:-----|:-----|:-----|:-----|\n`;

    const componentInfo = parse(code);

    for (let key in componentInfo.props) {
      const prop = componentInfo.props[key];

      let defaultValue = '';

      if (prop.defaultValue) {
        defaultValue = prop.defaultValue.value;
      }

      const description = (prop.required ? '**required**' : '*optional*') +
        '. ' + prop.description.replace(/\n/g, '<br>');

      text += `| ${key} | ${generatePropType(prop.type)} |`;
      text += `${defaultValue} |${description} |\n`;
    }

    return (
      <div className="propTypeDescription">
        <MarkdownElement text={text} />
      </div>
    );
  },
});

export default PropTypeDescription;
