import type { Theme } from '@mui/material/styles';
import {
  getBreakpointCustomMediaDefinitions,
  type GenerateBreakpointCustomMediaOptions,
} from '../generateBreakpointCustomMedia';

const customMediaDeclaration = /@custom-media\s+(--[\w-]+)/g;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface PrepareCustomMediaOptions extends GenerateBreakpointCustomMediaOptions {
  theme: Pick<Theme, 'breakpoints'>;
}

/**
 * Returns only the declarations needed by one independently compiled CSS file.
 *
 * For `theme.breakpoints.values.sm = 720` and CSS containing
 * `@media (--mui-breakpoint-up-sm)`, it returns
 * `@custom-media --mui-breakpoint-up-sm (min-width: 720px);`.
 */
export function prepareCustomMedia(css: string, options: PrepareCustomMediaOptions) {
  const definitions = getBreakpointCustomMediaDefinitions(options.theme, options);
  const definitionsByName = new Map(definitions.map((definition) => [definition.name, definition]));
  const prefix = options.prefix ?? '--mui-breakpoint';
  const customMediaReference = new RegExp(`\\((${escapeRegExp(prefix)}-[\\w-]+)\\)`, 'g');
  const references = new Set(Array.from(css.matchAll(customMediaReference), (match) => match[1]));

  if (references.size === 0) {
    return '';
  }

  const existingDeclarations = new Set(
    Array.from(css.matchAll(customMediaDeclaration), (match) => match[1]),
  );
  // Respect aliases already supplied by the consumer and fill in only the missing ones.
  const missingReferences = Array.from(references).filter(
    (name) => !definitionsByName.has(name) && !existingDeclarations.has(name),
  );

  if (missingReferences.length > 0) {
    throw /* minify-error */ new Error(
      `MUI: CSS references ${missingReferences.join(', ')}, but the theme does not define ` +
        'matching breakpoints. Add the breakpoint keys to the theme used by the CSS build.',
    );
  }

  return Array.from(references)
    .filter((name) => !existingDeclarations.has(name))
    .map((name) => {
      const definition = definitionsByName.get(name)!;
      return `@custom-media ${definition.name} ${definition.query};`;
    })
    .join('\n');
}
