// @flow weak

import { parse as parseDoctrine } from 'doctrine';
import recast from 'recast';

function generateTitle(name) {
  return `# ${name}\n`;
}

function generateDescription(description) {
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

function generatePropDescription(description, type) {
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
  const jsDocText = parsed.description
    .replace(/\n\n/g, '<br>')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');

  if (parsed.tags.some(tag => tag.title === 'ignore')) {
    return null;
  }

  let signature = '';

  if (
    (type.name === 'func' ||
      type.name === 'Function' ||
      (type.name === 'signature' && type.type === 'function')) &&
    parsed.tags.length > 0
  ) {
    // Remove new lines from tag descriptions to avoid markdown errors.
    parsed.tags.forEach(tag => {
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
    signature += parsedArgs.map(tag => `${tag.name}: ${tag.type.name}`).join(', ');
    signature += `) => ${parsedReturns.type.name}\`<br>`;
    signature += parsedArgs.map(tag => `*${tag.name}:* ${tag.description}`).join('<br>');
    if (parsedReturns.description) {
      signature += `<br> *returns* (${parsedReturns.type.name}): ${parsedReturns.description}`;
    }
  }

  return `${deprecated}${jsDocText}${signature}`;
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

    case 'union':
    case 'enum': {
      let values;
      if (type.raw) {
        // flow union
        values = type.raw.split('|').map(v => v.trim());
      } else {
        values = type.value.map(v => v.value || v.name);
      }
      // Display one value per line as it's better for lisibility.
      if (values.length < 5) {
        values = values.join('<br>&nbsp;');
      } else {
        values = values.join(', ');
      }
      return `${type.name}:&nbsp;${values}<br>`;
    }
    case 'HiddenProps': {
      return `[${type.name}](/layout/hidden)`;
    }
    default:
      return type.name;
  }
}

function getProp(props, key) {
  switch (key) {
    case 'classes':
      return {
        ...props[key],
        required: false,
      };
    default:
      return props[key];
  }
}

function generateProps(props) {
  const header = '## Props';

  let text = `${header}
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|\n`;

  text = Object.keys(props).sort().reduce((textProps, propRaw) => {
    const prop = getProp(props, propRaw);
    const description = generatePropDescription(prop.description, prop.flowType || prop.type);

    if (description === null) {
      return textProps;
    }

    let defaultValue = '';

    if (prop.defaultValue) {
      defaultValue = prop.defaultValue.value.replace(/\n/g, '');
    }

    if (prop.required) {
      propRaw = `<span style="color: #31a148">${propRaw}\u2009*</span>`;
    }

    const type = prop.flowType || prop.type;
    if (type.name === 'custom') {
      if (getDeprecatedInfo(prop.type)) {
        propRaw = `~~${propRaw}~~`;
      }
    }

    textProps += `| ${propRaw} | ${generatePropType(type)} | ${defaultValue} | ${description} |\n`;

    return textProps;
  }, text);

  return text;
}

function generateClasses(styles) {
  return styles.classes.length
    ? `
## CSS API

You can overrides all the class names injected by Material-UI thanks to the \`classes\` property.
This property accepts the following keys:
${styles.classes.map(className => `- \`${className}\``).join('\n')}

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the \`overrides\` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: \`${styles.name}\`.`
    : '';
}

export default function generateMarkdown(name, reactAPI) {
  return (
    '<!--- This documentation is automatically generated, do not try to edit it. -->\n\n' +
    `${generateTitle(name)}\n` +
    `${generateDescription(reactAPI.description)}\n` +
    `${generateProps(reactAPI.props)}\n` +
    'Any other properties supplied will be spread to the root element.\n' +
    `${generateClasses(reactAPI.styles)}\n`
  );
}
