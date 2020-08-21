import * as doctrine from 'doctrine';
import * as recast from 'recast';
import {
  parse as docgenParse,
  PropDescriptor,
  PropTypeDescriptor,
  ReactDocgenApi,
} from 'react-docgen';
import { SOURCE_CODE_ROOT_URL, LANGUAGES_IN_PROGRESS } from 'docs/src/modules/constants';
import { pageToTitle } from './helpers';

export interface ReactApi extends ReactDocgenApi {
  EOL: string;
  filename: string;
  forwardsRefTo: string | undefined;
  inheritance: { component: string; pathname: string } | null;
  name: string;
  pagesMarkdown: Array<{ components: string[]; filename: string; pathname: string }>;
  spread: boolean;
  src: string;
  styles: {
    classes: string[];
    globalClasses: Record<string, string>;
    name: string | null;
    descriptions: Record<string, string>;
  };
}

const PATH_REPLACE_REGEX = /\\/g;
const PATH_SEPARATOR = '/';
const DEMO_IGNORE = LANGUAGES_IN_PROGRESS.map((language) => `-${language}.md`);

function normalizePath(path: string): string {
  return path.replace(PATH_REPLACE_REGEX, PATH_SEPARATOR);
}

function generateHeader(reactAPI: ReactApi) {
  return ['---', `filename: ${normalizePath(reactAPI.filename)}`, '---'].join('\n');
}

function getDeprecatedInfo(type: PropTypeDescriptor) {
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

function getChained(type: PropTypeDescriptor) {
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

function escapeCell(value: string): string {
  // As the pipe is use for the table structure
  return value.replace(/</g, '&lt;').replace(/`&lt;/g, '`<').replace(/\|/g, '\\|');
}

function isElementTypeAcceptingRefProp(type: PropTypeDescriptor): boolean {
  return type.raw === 'elementTypeAcceptingRef';
}

function isRefType(type: PropTypeDescriptor): boolean {
  return type.raw === 'refType';
}

function isElementAcceptingRefProp(type: PropTypeDescriptor): boolean {
  return /^elementAcceptingRef/.test(type.raw);
}

function resolveType(type: NonNullable<doctrine.Tag['type']>): string {
  if (type.type === 'AllLiteral') {
    return 'any';
  }

  if (type.type === 'TypeApplication') {
    const arrayTypeName = resolveType(type.applications[0]);
    return `${arrayTypeName}[]`;
  }

  if (type.type === 'UnionType') {
    return type.elements.map((t) => resolveType(t)).join(' \\| ');
  }

  if ('name' in type) {
    return type.name;
  }
  throw new TypeError(`resolveType for '${type.type}' not implemented`);
}

function generatePropDescription(prop: PropDescriptor) {
  const { description } = prop;
  const type = prop.type;
  let deprecated = '';

  if (type.name === 'custom') {
    const deprecatedInfo = getDeprecatedInfo(type);
    if (deprecatedInfo) {
      deprecated = `*Deprecated*. ${deprecatedInfo.explanation}<br><br>`;
    }
  }

  if (description === undefined) {
    throw new Error('wrong doctrine#parse type');
  }
  const parsed = doctrine.parse(description, {
    sloppy: true,
  });

  // Two new lines result in a newline in the table.
  // All other new lines must be eliminated to prevent markdown mayhem.
  const jsDocText = escapeCell(parsed.description)
    .replace(/(\r?\n){2}/g, '<br>')
    .replace(/\r?\n/g, ' ');

  if (parsed.tags.some((tag) => tag.title === 'ignore')) {
    return null;
  }

  let signature = '';

  if (type.name === 'func' && parsed.tags.length > 0) {
    // Remove new lines from tag descriptions to avoid markdown errors.
    parsed.tags.forEach((tag) => {
      if (tag.description) {
        tag.description = tag.description.replace(/\r*\n/g, ' ');
      }
    });

    // Split up the parsed tags into 'arguments' and 'returns' parsed objects. If there's no
    // 'returns' parsed object (i.e., one with title being 'returns'), make one of type 'void'.
    const parsedLength = parsed.tags.length;
    let parsedArgs: doctrine.Tag[] = [];
    let parsedReturns: doctrine.Tag;

    if (parsed.tags[parsedLength - 1].title === 'returns') {
      parsedArgs = parsed.tags.slice(0, parsedLength - 1);
      parsedReturns = parsed.tags[parsedLength - 1];
    } else {
      parsedArgs = parsed.tags;
      // @ts-expect-error
      parsedReturns = { type: { name: 'void' } };
    }

    signature += '<br><br>**Signature:**<br>`function(';
    signature += parsedArgs
      .map((tag) => {
        if (tag.type != null && tag.type.type === 'OptionalType') {
          return `${tag.name}?: ${(tag.type.expression as any).name}`;
        }

        if (tag.type === undefined) {
          throw new TypeError('Tag has no type');
        }
        return `${tag.name}: ${resolveType(tag.type!)}`;
      })
      .join(', ');
    // @ts-expect-error
    signature += `) => ${parsedReturns.type!.name}\`<br>`;
    signature += parsedArgs
      .filter((tag) => tag.description)
      .map((tag) => `*${tag.name}:* ${tag.description}`)
      .join('<br>');
    if (parsedReturns.description) {
      // @ts-expect-error
      signature += `<br> *returns* (${parsedReturns.type!.name}): ${parsedReturns.description}`;
    }
  }

  let notes = '';
  if (isElementAcceptingRefProp(type) || isElementTypeAcceptingRefProp(type)) {
    notes += '<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs).';
  }

  return `${deprecated}${jsDocText}${signature}${notes}`;
}

function generatePropType(type: PropTypeDescriptor): string | undefined {
  switch (type.name) {
    case 'custom': {
      if (isElementTypeAcceptingRefProp(type)) {
        return `element type`;
      }
      if (isElementAcceptingRefProp(type)) {
        return `element`;
      }
      if (isRefType(type)) {
        return `ref`;
      }
      if (type.raw === 'HTMLElementType') {
        return `HTML element`;
      }

      const deprecatedInfo = getDeprecatedInfo(type);
      if (deprecatedInfo !== false) {
        return generatePropType({
          // eslint-disable-next-line react/forbid-foreign-prop-types
          name: deprecatedInfo.propTypes,
        } as any);
      }

      const chained = getChained(type);
      if (chained !== false) {
        return generatePropType(chained.type);
      }

      return type.raw;
    }

    case 'shape':
      return `{ ${Object.keys(type.value)
        .map((subValue) => {
          const subType = type.value[subValue];
          return `${subValue}${subType.required ? '' : '?'}: ${generatePropType(subType)}`;
        })
        .join(', ')} }`;

    case 'union':
      return (
        type.value
          .map((type2) => {
            return generatePropType(type2);
          })
          // Display one value per line as it's better for visibility.
          .join('<br>&#124;&nbsp;')
      );
    case 'enum':
      return (
        type.value
          .map((type2) => {
            return escapeCell(type2.value);
          })
          // Display one value per line as it's better for visibility.
          .join('<br>&#124;&nbsp;')
      );

    case 'arrayOf': {
      return `Array&lt;${generatePropType(type.value)}&gt;`;
    }

    case 'instanceOf': {
      if (type.value.startsWith('typeof')) {
        return /typeof (.*) ===/.exec(type.value)![1];
      }
      return type.value;
    }

    default:
      return type.name;
  }
}

function generateName(reactAPI: ReactApi) {
  if (reactAPI.styles.classes.length && !reactAPI.styles.name) {
    throw new Error(`Missing styles name on ${reactAPI.name} component`);
  }

  if (!reactAPI.styles.name) {
    return '\n';
  }

  return `## Component name

The \`${reactAPI.styles.name}\` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.
`;
}

function generateProps(reactAPI: ReactApi) {
  const header = '## Props';

  let text = `${header}

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|\n`;

  Object.keys(reactAPI.props).forEach((propRaw) => {
    const prop = reactAPI.props[propRaw];

    if (typeof prop.description === 'undefined') {
      throw new Error(`The "${propRaw}" prop is missing a description`);
    }

    const description = generatePropDescription(prop);

    if (description === null) {
      return;
    }

    let defaultValue = '';

    if (prop.defaultValue) {
      defaultValue = `<span class="prop-default">${escapeCell(
        (prop.defaultValue as any).value.replace(/\r*\n/g, ''),
      )}</span>`;
    }

    // Give up
    if (defaultValue.length > 180) {
      defaultValue = '';
    }

    const chainedPropType = getChained(prop.type);

    if (
      prop.required ||
      /\.isRequired/.test(prop.type.raw) ||
      (chainedPropType !== false && chainedPropType.required)
    ) {
      propRaw = `<span class="prop-name required">${propRaw}<abbr title="required">*</abbr></span>`;
    } else {
      propRaw = `<span class="prop-name">${propRaw}</span>`;
    }

    if (prop.type.name === 'custom') {
      if (getDeprecatedInfo(prop.type)) {
        propRaw = `~~${propRaw}~~`;
      }
    }

    text += `| ${propRaw} | <span class="prop-type">${generatePropType(
      prop.type,
    )}</span> | ${defaultValue} | ${description} |\n`;
  });

  let refHint = 'The `ref` is forwarded to the root element.';
  if (reactAPI.forwardsRefTo == null) {
    refHint = 'The component cannot hold a ref.';
  } else if (reactAPI.forwardsRefTo === 'React.Component') {
    refHint = 'The `ref` is attached to a component class.';
  } else if (reactAPI.forwardsRefTo === 'Object') {
    refHint = `The \`ref\` is attached to an Imperative Handle. Have a look at the [implementation of the component](${SOURCE_CODE_ROOT_URL}${normalizePath(
      reactAPI.filename,
    )}) for more detail.`;
  }
  text = `${text}\n${refHint}\n`;

  if (reactAPI.spread) {
    text = `${text}
Any other props supplied will be provided to the root element (${
      reactAPI.inheritance
        ? `[${reactAPI.inheritance.component}](${reactAPI.inheritance.pathname})`
        : 'native element'
    }).`;
  }

  return text;
}

function generateClasses(reactAPI: ReactApi) {
  if (!reactAPI.styles.classes.length) {
    return '';
  }

  if (!reactAPI.styles.name) {
    throw new Error(`Missing styles name on ${reactAPI.name} component`);
  }

  let text = '';

  text = `| Rule name | Global class | Description |
|:-----|:-------------|:------------|\n`;
  text += reactAPI.styles.classes
    .map((styleRule) => {
      if (styleRule === '@global') {
        return '| <span class="prop-name">@global</span> | | Apply global styles.';
      }

      const description = reactAPI.styles.descriptions[styleRule];

      if (typeof description === 'undefined' && ['Grid', 'Paper'].indexOf(reactAPI.name) === -1) {
        throw new Error(`The "${styleRule}" style rule is missing a description`);
      }

      return `| <span class="prop-name">${styleRule}</span> | <span class="prop-name">.${
        reactAPI.styles.globalClasses[styleRule]
      }</span> | ${description ? escapeCell(description) : ''}`;
    })
    .join('\n');

  return `## CSS

${text}

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [\`classes\` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [\`overrides\` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](${SOURCE_CODE_ROOT_URL}${normalizePath(
    reactAPI.filename,
  )}) for more detail.

`;
}

function generateInheritance(reactAPI: ReactApi): string {
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

The props of the [${inheritance.component}](${inheritance.pathname}) component${suffix} are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

`;
}

function generateDemos(reactAPI: ReactApi): string {
  const pagesMarkdown = reactAPI.pagesMarkdown.filter((page) => {
    return (
      !DEMO_IGNORE.includes(page.filename.slice(-6)) && page.components.includes(reactAPI.name)
    );
  });

  if (pagesMarkdown.length === 0) {
    return '';
  }

  return `## Demos

${pagesMarkdown.map((page) => `- [${pageToTitle(page)}](${page.pathname}/)`).join('\n')}

`;
}

function generateImportStatement(reactAPI: ReactApi): string {
  const source = normalizePath(reactAPI.filename)
    // determine the published package name
    .replace(
      /\/packages\/material-ui(-(.+?))?\/src/,
      (match, dash, pkg) => `@material-ui/${pkg || 'core'}`,
    )
    // convert things like `/Table/Table.js` to ``
    .replace(/\/([^/]+)\/\1\.js$/, '');
  return `## Import

\`\`\`js
import ${reactAPI.name} from '${source}/${reactAPI.name}';
// or
import { ${reactAPI.name} } from '${source}';
\`\`\`

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).`;
}

export default function generateMarkdown(reactAPI: ReactApi) {
  return [
    generateHeader(reactAPI),
    '',
    '<!--- This documentation is automatically generated, do not try to edit it. -->',
    '',
    `# ${reactAPI.name} API`,
    '',
    `<p class="description">The API documentation of the ${reactAPI.name} React component. ` +
      'Learn more about the props and the CSS customization points.</p>',
    '',
    generateImportStatement(reactAPI),
    '',
    reactAPI.description,
    '',
    generateName(reactAPI),
    generateProps(reactAPI),
    '',
    `${generateClasses(reactAPI)}${generateInheritance(reactAPI)}${generateDemos(reactAPI)}`,
  ].join('\n');
}
