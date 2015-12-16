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
      const values = type.value.map(v => v.value).join('<br>&nbsp;');
      return `enum:<br>&nbsp;${values}<br>`;

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
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|\n`;

    const componentInfo = parse(code);

    for (let key in componentInfo.props) {
      const prop = componentInfo.props[key];

      let defaultValue = '';

      if (prop.defaultValue) {
        defaultValue = prop.defaultValue.value;
      }

      const requirement = `${prop.required ? '**required**' : '*optional*'}.`;

      // two new lines result in a newline in the table. all other new lines
      // must be eliminated to prevent markdown mayhem.
      const jsDocText = prop.description.replace(/\n\n/g, '<br>').replace(/\n/g, ' ');

      const description = `${requirement} ${jsDocText}`;

      text += `| ${key} | ${generatePropType(prop.type)} | ${defaultValue} | ${description} |\n`;
    }

    return (
      <div className="propTypeDescription">
        <MarkdownElement text={text} />
      </div>
    );
  },
});

export default PropTypeDescription;
