/* eslint-disable react/forbid-foreign-prop-types */

import { parse as parseDoctrine } from 'doctrine';
import recast from 'recast';
import { pageToTitle } from './helpers';

const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/tree/master';
const PATH_REPLACE_REGEX = /\\/g;
const PATH_SEPARATOR = '/';

function normalizePath(path) {
  return path.replace(PATH_REPLACE_REGEX, PATH_SEPARATOR);
}

function generateHeader(reactAPI) {
  return [
    '---',
    `filename: ${normalizePath(reactAPI.filename)}`,
    `title: ${reactAPI.name} API`,
    '---',
  ].join('\n');
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

function escapeCell(value) {
  // As the pipe is use for the table structure
  return value.replace(/</g, '&lt;').replace(/\|/g, '\\|');
}

function generatePropDescription(description, type) {
  let deprecated = '';

  if (type.name === 'custom') {
    const deprecatedInfo = getDeprecatedInfo(type);

    if (deprecatedInfo) {
      deprecated = `*Deprecated*. ${deprecatedInfo.explanation}<br><br>`;
    }
  }

  const parsed = parseDoctrine(description, {
    sloppy: true,
  });

  // Two new lines result in a newline in the table.
  // All other new lines must be eliminated to prevent markdown mayhem.
  const jsDocText = escapeCell(parsed.description)
    .replace(/\n\n/g, '<br>')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');

  if (parsed.tags.some(tag => tag.title === 'ignore')) {
    return null;
  }

  let signature = '';

  if (type.name === 'func' && parsed.tags.length > 0) {
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
    signature += parsedArgs
      .map(tag => {
        if (tag.type.type === 'AllLiteral') {
          return `${tag.name}: any`;
        }

        if (tag.type.type === 'OptionalType') {
          return `${tag.name}?: ${tag.type.expression.name}`;
        }

        return `${tag.name}: ${tag.type.name}`;
      })
      .join(', ');
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
    case 'custom': {
      const deprecatedInfo = getDeprecatedInfo(type);

      if (deprecatedInfo !== false) {
        return generatePropType({
          name: deprecatedInfo.propTypes,
        });
      }

      return type.raw;
    }

    case 'shape':
      return `{ ${Object.keys(type.value)
        .map(subValue => {
          const subType = type.value[subValue];
          return `${subValue}${subType.required ? '' : '?'}: ${generatePropType(subType)}`;
        })
        .join(', ')} }`;

    case 'union':
    case 'enum': {
      let values = type.value.map(type2 => {
        if (type.name === 'enum') {
          return escapeCell(type2.value);
        }

        return generatePropType(type2);
      });

      // Display one value per line as it's better for visibility.
      if (values.length < 5) {
        values = values.join('&nbsp;&#124;<br>&nbsp;');
      } else {
        values = values.join(', ');
      }
      return `${type.name}:&nbsp;${values}<br>`;
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

function generateProps(reactAPI) {
  const header = '## Props';

  let text = `${header}

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|\n`;

  text = Object.keys(reactAPI.props).reduce((textProps, propRaw) => {
    const prop = getProp(reactAPI.props, propRaw);

    if (typeof prop.description === 'undefined') {
      throw new Error(`The "${propRaw}"" property is missing a description`);
    }

    const description = generatePropDescription(prop.description, prop.flowType || prop.type);

    if (description === null) {
      return textProps;
    }

    let defaultValue = '\u00a0';

    if (prop.defaultValue) {
      defaultValue = `<span class="prop-default">${escapeCell(
        prop.defaultValue.value.replace(/\n/g, ''),
      )}</span>`;
    }

    if (prop.required) {
      propRaw = `<span class="prop-name required">${propRaw}\u00a0*</span>`;
    } else {
      propRaw = `<span class="prop-name">${propRaw}</span>`;
    }

    if (prop.type.name === 'custom') {
      if (getDeprecatedInfo(prop.type)) {
        propRaw = `~~${propRaw}~~`;
      }
    }

    textProps += `| ${propRaw} | <span class="prop-type">${generatePropType(
      prop.type,
    )} | ${defaultValue} | ${description} |\n`;

    return textProps;
  }, text);

  text = `${text}
Any other properties supplied will be spread to the root element (${
    reactAPI.inheritance
      ? `[${reactAPI.inheritance.component}](${reactAPI.inheritance.pathname})`
      : 'native element'
  }).`;

  return text;
}

function generateClasses(reactAPI) {
  if (!reactAPI.styles.classes.length) {
    return '';
  }

  if (!reactAPI.styles.name) {
    throw new Error(`Missing styles name on ${reactAPI.name} component`);
  }

  let text = '';
  if (Object.keys(reactAPI.styles.descriptions).length) {
    text = `
| Name | Description |
|:-----|:------------|\n`;
    text += reactAPI.styles.classes
      .map(
        className =>
          `| <span class="prop-name">${className}</span> | ${
            reactAPI.styles.descriptions[className]
              ? escapeCell(reactAPI.styles.descriptions[className])
              : ''
          }`,
      )
      .join('\n');
  } else {
    text = reactAPI.styles.classes.map(className => `- \`${className}\``).join('\n');
  }

  return `## CSS API

You can override all the class names injected by Material-UI thanks to the \`classes\` property.
This property accepts the following keys:

${text}

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](${SOURCE_CODE_ROOT_URL}${normalizePath(
    reactAPI.filename,
  )})
for more detail.

If using the \`overrides\` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: \`${reactAPI.styles.name}\`.

`;
}

function generateInheritance(reactAPI) {
  const { inheritance } = reactAPI;

  if (!inheritance) {
    return '';
  }

  let suffix = '';

  switch (inheritance.component) {
    case 'Transition':
      suffix = ', from react-transition-group,';
      break;

    case 'EventListener':
      suffix = ', from react-event-listener,';
      break;

    default:
      break;
  }

  return `## Inheritance

The properties of the [${inheritance.component}](${
    inheritance.pathname
  }) component${suffix} are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

`;
}

function generateDemos(reactAPI) {
  const pagesMarkdown = reactAPI.pagesMarkdown.reduce((accumulator, page) => {
    if (page.components.includes(reactAPI.name)) {
      accumulator.push(page);
    }

    return accumulator;
  }, []);

  if (pagesMarkdown.length === 0) {
    return '';
  }

  return `## Demos

${pagesMarkdown.map(page => `- [${pageToTitle(page)}](${page.pathname})`).join('\n')}

`;
}

export default function generateMarkdown(reactAPI) {
  return [
    generateHeader(reactAPI),
    '',
    '<!--- This documentation is automatically generated, do not try to edit it. -->',
    '',
    `# ${reactAPI.name}`,
    '',
    `<p class="description">The API documentation of the ${reactAPI.name} React component.</p>`,
    '',
    reactAPI.description,
    '',
    generateProps(reactAPI),
    '',
    `${generateClasses(reactAPI)}${generateInheritance(reactAPI)}${generateDemos(reactAPI)}`,
  ].join('\n');
}
