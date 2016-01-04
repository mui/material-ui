import React from 'react';
import {parse} from 'react-docgen';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MarkdownElement from './MarkdownElement';
import recast from 'recast';

require('./prop-type-description.css');

function getDeprecatedInfo(type) {
  const deprecatedPropType = 'deprecated(React.PropTypes.';

  const indexStart = type.raw.indexOf(deprecatedPropType);

  if (indexStart !== -1) {
    return {
      propTypes: type.raw.substring(indexStart + deprecatedPropType.length, type.raw.indexOf(',')),
      explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value,
    };
  }

  return false;
}

function generatePropType(type) {
  switch (type.name) {
    case 'func':
      return 'function';

    case 'custom':
      const deprecatedInfo = getDeprecatedInfo(type);

      if (deprecatedInfo !== false) {
        return generatePropType({
          name: deprecatedInfo.propTypes,
        });
      }

      return type.raw;

    case 'enum':
      const values = type.value.map(v => v.value).join('<br>&nbsp;');
      return `enum:<br>&nbsp;${values}<br>`;

    default:
      return type.name;
  }
}

function generateDescription(required, description, type) {
  let deprecated = '';

  if (type.name === 'custom') {
    const deprecatedInfo = getDeprecatedInfo(type);

    if (deprecatedInfo !== false) {
      deprecated = `**DEPRECATED**. ${deprecatedInfo.explanation}<br><br>`;
    }
  }

  const requirement = `${required ? '**required**' : '*optional*'}.`;

  // two new lines result in a newline in the table. all other new lines
  // must be eliminated to prevent markdown mayhem.
  const jsDocText = description.replace(/\n\n/g, '<br>').replace(/\n/g, ' ');

  return `${deprecated} ${requirement} ${jsDocText}`;
}

const PropTypeDescription = React.createClass({
  propTypes: {
    code: React.PropTypes.string,
    header: React.PropTypes.string,
  },
  mixins: [
    PureRenderMixin,
  ],
  getDefaultProps() {
    return {
      header: '### Properties',
    };
  },
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

      const description = generateDescription(prop.required, prop.description, prop.type);

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
