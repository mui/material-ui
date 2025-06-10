import * as fs from 'fs';

interface ApiProp {
  type: {
    name: string;
    description?: string;
  };
  required?: boolean;
  default?: string;
  deprecated?: boolean;
  deprecationInfo?: string;
  signature?: {
    type: string;
    describedArgs?: string[];
  };
  additionalInfo?: {
    cssApi?: boolean;
    sx?: boolean;
  };
}

interface ApiSlot {
  name: string;
  description: string;
  default: string;
  class: string | null;
}

interface ApiClass {
  key: string;
  className: string;
  description: string;
  isGlobal: boolean;
}

interface ApiInheritance {
  component: string;
  pathname: string;
}

interface ApiJson {
  props: Record<string, ApiProp>;
  name: string;
  imports: string[];
  slots?: ApiSlot[];
  classes?: ApiClass[];
  spread?: boolean;
  themeDefaultProps?: boolean;
  muiName?: string;
  forwardsRefTo?: string | null;
  filename?: string;
  inheritance?: ApiInheritance;
  demos?: string;
  cssComponent?: boolean;
  deprecated?: boolean;
  deprecationInfo?: string;
}

/**
 * Convert HTML to markdown
 */
function htmlToMarkdown(html: string): string {
  // First pass: decode entities and handle inline elements
  let markdown = html
    // Decode HTML entities first
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#124;/g, '|')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    // Convert <code> to backticks
    .replace(/<code>([^<]+)<\/code>/gi, '`$1`')
    // Convert <a> to markdown links
    .replace(/<a\s+href="([^"]+)">([^<]+)<\/a>/gi, '[$2]($1)');

  // Handle lists - process them as complete units to avoid extra line breaks
  markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, listContent: string) => {
    // Process each list item
    const items = listContent
      .split(/<\/li>/)
      .map((item) => item.replace(/<li[^>]*>/, '').trim())
      .filter((item) => item.length > 0)
      .map((item) => `- ${item}`)
      .join('\n');

    return `\n${items}\n`;
  });

  // Handle other block elements
  markdown = markdown
    // Convert <br> to newline
    .replace(/<br\s*\/?>/gi, '\n')
    // Convert <p> to double newline
    .replace(/<p[^>]*>/gi, '\n\n')
    .replace(/<\/p>/gi, '')
    // Remove any remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up excessive whitespace (but preserve intentional line breaks)
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return markdown;
}

/**
 * Format prop type for markdown
 */
function formatPropType(prop: ApiProp): string {
  let type = prop.type.name;

  if (prop.type.description) {
    // Clean up the description
    type = htmlToMarkdown(prop.type.description);
  }

  if (prop.signature) {
    type = prop.signature.type;
  }

  // Escape pipes in union types for better markdown readability
  type = type.replace(/\s*\|\s*/g, ' \\| ');

  // Wrap all prop types in backticks to prevent markdown table issues with pipes
  return `\`${type}\``;
}

/**
 * Generate props table
 */
function generatePropsTable(props: Record<string, ApiProp>): string {
  const propEntries = Object.entries(props);
  if (propEntries.length === 0) {
    return '';
  }

  let table = '## Props\n\n';
  table += '| Name | Type | Default | Required | Description |\n';
  table += '|------|------|---------|----------|-------------|\n';

  for (const [propName, prop] of propEntries) {
    const name = prop.deprecated ? `${propName} (deprecated)` : propName;
    const type = formatPropType(prop);
    const defaultValue = prop.default || '-';
    const required = prop.required ? 'Yes' : 'No';

    let description = '';
    if (prop.deprecated && prop.deprecationInfo) {
      description = `⚠️ ${htmlToMarkdown(prop.deprecationInfo)}`;
    } else if (prop.additionalInfo?.cssApi) {
      description = 'Override or extend the styles applied to the component.';
    } else if (prop.additionalInfo?.sx) {
      description =
        'The system prop that allows defining system overrides as well as additional CSS styles.';
    }

    table += `| ${name} | ${type} | ${defaultValue} | ${required} | ${description} |\n`;
  }

  return table;
}

/**
 * Generate slots table
 */
function generateSlotsTable(slots: ApiSlot[]): string {
  if (!slots || slots.length === 0) {
    return '';
  }

  let table = '## Slots\n\n';
  table += '| Name | Default | Class | Description |\n';
  table += '|------|---------|-------|-------------|\n';

  for (const slot of slots) {
    const className = slot.class ? `\`.${slot.class}\`` : '-';
    const description = htmlToMarkdown(slot.description);
    table += `| ${slot.name} | \`${slot.default}\` | ${className} | ${description} |\n`;
  }

  return table;
}

/**
 * Generate classes table
 */
function generateClassesTable(classes: ApiClass[]): string {
  if (!classes || classes.length === 0) {
    return '';
  }

  let table = '## CSS\n\n';
  table += '### Rule name\n\n';
  table += '| Global class | Rule name | Description |\n';
  table += '|--------------|-----------|-------------|\n';

  for (const cls of classes) {
    const globalClass = cls.isGlobal ? `\`.${cls.className}\`` : '-';
    const ruleName = cls.isGlobal ? '-' : cls.key;
    const description = htmlToMarkdown(cls.description);
    table += `| ${globalClass} | ${ruleName} | ${description} |\n`;
  }

  return table;
}

/**
 * Process API JSON and convert to markdown
 */
export function processApiJson(apiJson: ApiJson | string): string {
  const api: ApiJson = typeof apiJson === 'string' ? JSON.parse(apiJson) : apiJson;

  let markdown = `# ${api.name} API\n\n`;

  // Add deprecation warning if applicable
  if (api.deprecated) {
    const warningText = api.deprecationInfo
      ? htmlToMarkdown(api.deprecationInfo)
      : 'This component is deprecated. Consider using an alternative component.';
    markdown += `> ⚠️ **Warning**: ${warningText}\n\n`;
  }

  // Add demos section
  if (api.demos) {
    markdown += '## Demos\n\n';
    markdown +=
      'For examples and details on the usage of this React component, visit the component demo pages:\n\n';
    markdown += `${htmlToMarkdown(api.demos)}\n\n`;
  }

  // Add import section
  markdown += '## Import\n\n';
  markdown += '```jsx\n';
  markdown += api.imports.join('\n// or\n');
  markdown += '\n```\n\n';

  // Add props section
  const propsTable = generatePropsTable(api.props);
  if (propsTable) {
    markdown += `${propsTable}\n`;
  }

  // Add ref information
  if (api.forwardsRefTo === null) {
    markdown += '> **Note**: This component cannot hold a ref.\n\n';
  } else {
    markdown += `> **Note**: The \`ref\` is forwarded to the root element${api.forwardsRefTo ? ` (${api.forwardsRefTo})` : ''}.\n\n`;
  }

  // Add spread information
  if (api.spread) {
    const spreadElement = api.inheritance
      ? `[${api.inheritance.component}](${api.inheritance.pathname})`
      : 'native element';
    markdown += `> Any other props supplied will be provided to the root element (${spreadElement}).\n\n`;
  }

  // Add inheritance section
  if (api.inheritance) {
    markdown += '## Inheritance\n\n';
    markdown += `While not explicitly documented above, the props of the [${api.inheritance.component}](${api.inheritance.pathname}) component are also available on ${api.name}.`;
    if (api.inheritance.component === 'Transition') {
      markdown +=
        ' A subset of components support [react-transition-group](https://reactcommunity.org/react-transition-group/transition/) out of the box.';
    }
    markdown += '\n\n';
  }

  // Add theme default props section
  if (api.themeDefaultProps && api.muiName) {
    markdown += '## Theme default props\n\n';
    markdown += `You can use \`${api.muiName}\` to change the default props of this component with the theme.\n\n`;
  }

  // Add slots section
  const slotsTable = generateSlotsTable(api.slots || []);
  if (slotsTable) {
    markdown += `${slotsTable}\n`;
  }

  // Add classes section
  const classesTable = generateClassesTable(api.classes || []);
  if (classesTable) {
    markdown += `${classesTable}\n`;
  }

  // Add CSS component note
  if (api.cssComponent) {
    markdown += `> **Note**: As a CSS utility, the \`${api.name}\` component also supports all system properties. You can use them as props directly on the component.\n\n`;
  }

  // Add source code section
  if (api.filename) {
    markdown += '## Source code\n\n';
    markdown += `If you did not find the information on this page, consider having a look at the implementation of the component for more detail.\n\n`;
    markdown += `- [${api.filename}](https://github.com/mui/material-ui/tree/HEAD${api.filename})\n\n`;
  }

  return markdown.trim();
}

/**
 * Process API JSON file and return markdown
 */
export function processApiFile(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf-8');
  return processApiJson(content);
}
