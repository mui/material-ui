import React from 'react';
import {parse} from 'react-docgen';
import {parse as parseDoctrine} from 'doctrine';
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
      const values = type.value.map((v) => v.value).join('<br>&nbsp;');
      return `enum:<br>&nbsp;${values}<br>`;

    default:
      return type.name;
  }
}

function generateDescription(required, description, type) {
  let deprecated = '';

  if (type.name === 'custom') {
    const deprecatedInfo = getDeprecatedInfo(type);

    if (deprecatedInfo) {
      deprecated = `*Deprecated*. ${deprecatedInfo.explanation}<br><br>`;
    }
  }

  const parsed = parseDoctrine(description);

  // two new lines result in a newline in the table. all other new lines
  // must be eliminated to prevent markdown mayhem.
  const jsDocText = parsed.description.replace(/\n\n/g, '<br>').replace(/\n/g, ' ');

  if (parsed.tags.some((tag) => tag.title === 'ignore')) return null;
  let signature = '';

  if (type.name === 'func' && parsed.tags.length > 0) {
    // Remove new lines from tag descriptions to avoid markdown errors.
    parsed.tags.forEach((tag) => {
      if (tag.description) {
        tag.description = tag.description.replace(/\n/g, ' ');
      }
    });

    // Split up the parsed tags into 'arguments' and 'returns' parsed objects. If there's no
    // 'returns' parsed object (i.e., one with title being 'returns'), make one of type 'void'.
    const parsedLength = parsed.tags.length;
    let parsedArgs = [];
    let parsedReturns;

    if (parsed.tags[parsedLength - 1].title === 'returns') {
      parsedArgs = parsed.tags.slice(0, parsedLength - 1);
      parsedReturns = parsed.tags[parsedLength - 1];
    } else {
      parsedArgs = parsed.tags;
      parsedReturns = {type: {name: 'void'}};
    }

    signature += '<br><br>**Signature:**<br>`function(';
    signature += parsedArgs.map((tag) => `${tag.name}: ${tag.type.name}`).join(', ');
    signature += `) => ${parsedReturns.type.name}` + '`<br>';
    signature += parsedArgs.map((tag) => `*${tag.name}:* ${tag.description}`).join('<br>');
    if (parsedReturns.description) {
      signature += `<br> *returns* (${parsedReturns.type.name}): ${parsedReturns.description}`;
    }
  }

  return `${deprecated} ${jsDocText}${signature}`;
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

    let requiredProps = 0;

    let text = `${header}
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|\n`;

    const componentInfo = parse(code);

    for (let key in componentInfo.props) {
      const prop = componentInfo.props[key];

      const description = generateDescription(prop.required, prop.description, prop.type);

      if (description === null) continue;

      let defaultValue = '';

      if (prop.defaultValue) {
        defaultValue = prop.defaultValue.value.replace(/\n/g, '');
      }

      if (prop.required) {
        key = `<span style="color: #31a148">${key} \*</span>`;
        requiredProps += 1;
      }

      if (prop.type.name === 'custom') {
        if (getDeprecatedInfo(prop.type)) {
          key = `~~${key}~~`;
        }
      }

      text += `| ${key} | ${generatePropType(prop.type)} | ${defaultValue} | ${description} |\n`;
    }

    const requiredPropFootnote = (requiredProps === 1) ? '* required property' :
      (requiredProps > 1) ? '* required properties' :
        '';

    return (
      <div className="propTypeDescription">
        <MarkdownElement text={text} />
        <div style={{fontSize: '90%', paddingLeft: '15px'}}>{requiredPropFootnote}</div>
      </div>
    );
  },
});

export default PropTypeDescription;
