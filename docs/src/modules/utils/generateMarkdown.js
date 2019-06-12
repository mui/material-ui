/* eslint-disable react/forbid-foreign-prop-types, no-underscore-dangle */

import { parse as parseDoctrine } from 'doctrine';
import recast from 'recast';
import { parse as docgenParse } from 'react-docgen';
import { Router } from 'next/router';
import { pageToTitle } from './helpers';
import { LANGUAGES_IN_PROGRESS } from 'docs/src/modules/constants';

const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/blob/master';
const PATH_REPLACE_REGEX = /\\/g;
const PATH_SEPARATOR = '/';
const DEMO_IGNORE = LANGUAGES_IN_PROGRESS.map(language => `-${language}.md`);

function normalizePath(path) {
  return path.replace(PATH_REPLACE_REGEX, PATH_SEPARATOR);
}

function generateHeader(reactAPI) {
  return ['---', `filename: ${normalizePath(reactAPI.filename)}`, '---'].join('\n');
}

function getDeprecatedInfo(type) {
  const marker = /deprecatedPropType\((\r*\n)*\s*PropTypes\./g;
  const match = type.raw.match(marker);
  const startIndex = type.raw.search(marker);
  if (match) {
    const offset = match[0].length;

    return {
      propTypes: type.raw.substring(startIndex + offset, type.raw.indexOf(',')),
      explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value,
    };
  }

  return false;
}

function getChained(type) {
  if (type.raw) {
    const marker = 'chainPropTypes';
    const indexStart = type.raw.indexOf(marker);

    if (indexStart !== -1) {
      const parsed = docgenParse(
        `
        import PropTypes from 'prop-types';
        const Foo = () => <div />
        Foo.propTypes = {
          bar: ${recast.print(recast.parse(type.raw).program.body[0].expression.arguments[0]).code}
        }
        export default Foo
      `,
        null,
        null,
        // helps react-docgen pickup babel.config.js
        { filename: './' },
      );
      return {
        type: parsed.props.bar.type,
        required: parsed.props.bar.required,
      };
    }
  }

  return false;
}

function escapeCell(value) {
  // As the pipe is use for the table structure
  return value
    .replace(/</g, '&lt;')
    .replace(/`&lt;/g, '`<')
    .replace(/\|/g, '\\|');
}

function isElementTypeAcceptingRefProp(type) {
  return type.raw === 'elementTypeAcceptingRef';
}

function isElementAcceptingRefProp(type) {
  return /^elementAcceptingRef/.test(type.raw);
}

function generatePropDescription(prop) {
  const { description } = prop;
  const type = prop.flowType || prop.type;
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
    .replace(/(\r?\n){2}/g, '<br>')
    .replace(/\r?\n/g, ' ');

  if (parsed.tags.some(tag => tag.title === 'ignore')) {
    return null;
  }

  let signature = '';

  if (type.name === 'func' && parsed.tags.length > 0) {
    // Remove new lines from tag descriptions to avoid markdown errors.
    parsed.tags.forEach(tag => {
      if (tag.description) {
        tag.description = tag.description.replace(/\r*\n/g, ' ');
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

  let notes = '';
  if (isElementAcceptingRefProp(type) || isElementTypeAcceptingRefProp(type)) {
    notes += '<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs).';
  }

  return `${deprecated}${jsDocText}${signature}${notes}`;
}

function generatePropType(type) {
  switch (type.name) {
    case 'custom': {
      if (isElementTypeAcceptingRefProp(type)) {
        return `element type`;
      }
      if (isElementAcceptingRefProp(type)) {
        return `element`;
      }

      const deprecatedInfo = getDeprecatedInfo(type);
      if (deprecatedInfo !== false) {
        return generatePropType({
          name: deprecatedInfo.propTypes,
        });
      }

      const chained = getChained(type);
      if (chained !== false) {
        return generatePropType(chained.type);
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
      throw new Error(`The "${propRaw}" property is missing a description`);
    }

    const description = generatePropDescription(prop);

    if (description === null) {
      return textProps;
    }

    let defaultValue = '';

    if (prop.defaultValue) {
      defaultValue = `<span class="prop-default">${escapeCell(
        prop.defaultValue.value.replace(/\r*\n/g, ''),
      )}</span>`;
    }

    const chainedPropType = getChained(prop.type);

    if (
      prop.required ||
      /\.isRequired/.test(prop.type.raw) ||
      (chainedPropType !== false && chainedPropType.required)
    ) {
      propRaw = `<span class="prop-name required">${propRaw}&nbsp;*</span>`;
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
    )}</span> | ${defaultValue} | ${description} |\n`;

    return textProps;
  }, text);

  let refHint = 'The `ref` is forwarded to the root element.';
  if (reactAPI.forwardsRefTo == null) {
    refHint = 'The component cannot hold a ref.';
  } else if (reactAPI.forwardsRefTo === 'React.Component') {
    refHint = 'The `ref` is attached to a component class.';
  }
  text = `${text}\n${refHint}\n`;

  if (reactAPI.spread) {
    text = `${text}
Any other properties supplied will be provided to the root element (${
      reactAPI.inheritance
        ? `[${reactAPI.inheritance.component}](${Router._rewriteUrlForNextExport(
            reactAPI.inheritance.pathname,
          )})`
        : 'native element'
    }).`;
  }

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

  return `## CSS

You can override all the class names injected by Material-UI thanks to the \`classes\` property.
This property accepts the following keys:

${text}

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](${SOURCE_CODE_ROOT_URL}${normalizePath(
    reactAPI.filename,
  )})
for more detail.

If using the \`overrides\` [key of the theme](/customization/themes/#css),
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

    default:
      break;
  }

  return `## Inheritance

The properties of the [${inheritance.component}](${Router._rewriteUrlForNextExport(
    inheritance.pathname,
  )}) component${suffix} are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

`;
}

function generateDemos(reactAPI) {
  const pagesMarkdown = reactAPI.pagesMarkdown.reduce((accumulator, page) => {
    if (!DEMO_IGNORE.includes(page.filename.slice(-6)) && page.components.includes(reactAPI.name)) {
      accumulator.push(page);
    }

    return accumulator;
  }, []);

  if (pagesMarkdown.length === 0) {
    return '';
  }

  return `## Demos

${pagesMarkdown
  .map(page => `- [${pageToTitle(page)}](${Router._rewriteUrlForNextExport(page.pathname)})`)
  .join('\n')}

`;
}

function generateImportStatement(reactAPI) {
  const source = normalizePath(reactAPI.filename)
    // determine the published package name
    .replace(
      /\/packages\/material-ui(-(.+?))?\/src/,
      (match, dash, pkg) => `@material-ui/${pkg || 'core'}`,
    )
    // convert things like `Table/Table.js` to `Table`
    .replace(/([^/]+)\/\1\.js$/, '$1')
    // strip off trailing `.js` if any
    .replace(/\.js$/, '');
  return `\`\`\`js
import ${reactAPI.name} from '${source}';
\`\`\``;
}

function generateNotes(reactAPI) {
  const { strictModeReady } = reactAPI;
  const strictModeLinked = '[StrictMode](https://reactjs.org/docs/strict-mode.html)';
  return `## Notes

The component ${
    !strictModeReady
      ? `can cause issues in ${strictModeLinked}`
      : `is fully ${strictModeLinked} compatible`
  }.

`;
}

export default function generateMarkdown(reactAPI) {
  return [
    generateHeader(reactAPI),
    '',
    '<!--- This documentation is automatically generated, do not try to edit it. -->',
    '',
    `# ${reactAPI.name} API`,
    '',
    `<p class="description">The API documentation of the ${reactAPI.name} React component. ` +
      'Learn more about the properties and the CSS customization points.</p>',
    '',
    generateImportStatement(reactAPI),
    '',
    reactAPI.description,
    '',
    generateProps(reactAPI),
    '',
    `${generateClasses(reactAPI)}${generateInheritance(reactAPI)}${generateNotes(
      reactAPI,
    )}${generateDemos(reactAPI)}`,
  ].join('\n');
}
