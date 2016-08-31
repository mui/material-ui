// @flow weak

import { parse as parseDoctrine } from 'doctrine';
import recast from 'recast';

function stringOfLength(string, stringLength) {
  let newString = '';
  for (let i = 0; i < stringLength.length; i += 1) {
    newString += string;
  }
  return newString;
}

function generateTitle(name) {
  const title = `${name}`;
  return `${title}\n${stringOfLength('=', title)}\n`;
}

function generateDesciption(description) {
  return `${description}\n`;
}

function getDeprecatedInfo(type) {
  const deprecatedPropType = 'deprecated(PropTypes.';

  const indexStart = type.raw.indexOf(deprecatedPropType);

  if (indexStart !== -1) {
    return {
      propTypes: type.raw.substring(indexStart + deprecatedPropType.length, type.raw.indexOf(',')),
      explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value,
    };
  }

  return false;
}

function generatePropDescription(required, description, type) {
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
      parsedReturns = { type: { name: 'void' } };
    }

    signature += '<br><br>**Signature:**<br>`function(';
    signature += parsedArgs.map((tag) => `${tag.name}: ${tag.type.name}`).join(', ');
    signature += `) => ${parsedReturns.type.name}\`<br>`;
    signature += parsedArgs.map((tag) => `*${tag.name}:* ${tag.description}`).join('<br>');
    if (parsedReturns.description) {
      signature += `<br> *returns* (${parsedReturns.type.name}): ${parsedReturns.description}`;
    }
  }

  return `${deprecated} ${jsDocText}${signature}`;
}

function generatePropType(type) {
  switch (type.name) {
    case 'func':
      return 'function';

    case 'custom': {
      const deprecatedInfo = getDeprecatedInfo(type);

      if (deprecatedInfo !== false) {
        return generatePropType({
          name: deprecatedInfo.propTypes,
        });
      }

      return type.raw;
    }

    case 'enum': {
      const values = type.value.map((v) => v.value).join('<br>&nbsp;');
      return `enum:&nbsp;${values}<br>`;
    }

    default:
      return type.name;
  }
}

function generateProps(props) {
  const title = 'Props';
  const header = `${title}\n${
    stringOfLength('-', title)}\n\n`;

  let text = `${header}
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|\n`;

  text = Object
    .keys(props)
    .reduce((textProps, key) => {
      const prop = props[key];
      const description = generatePropDescription(prop.required, prop.description, prop.type);

      if (description === null) {
        return textProps;
      }

      let defaultValue = '';

      if (prop.defaultValue) {
        defaultValue = prop.defaultValue.value.replace(/\n/g, '');
      }

      if (prop.required) {
        key = `<span style="color: #31a148">${key}\u2009*</span>`;
      }

      if (prop.type.name === 'custom') {
        if (getDeprecatedInfo(prop.type)) {
          key = `~~${key}~~`;
        }
      }

      textProps += `| ${key} | ${generatePropType(prop.type)} | ${defaultValue} | ${description} |\n`;

      return textProps;
    }, text);

  return text;
}

function generateMarkdown(name, reactAPI) {
  return `${
    generateTitle(name)}\n${
    generateDesciption(reactAPI.description)}\n${
    generateProps(reactAPI.props)}\n${
    'Other properties (no documented) are applied to the root element.'}
`;
}

module.exports = generateMarkdown;
