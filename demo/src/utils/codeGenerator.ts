/**
 * Generates a JSX code snippet string from carousel prop values.
 * Omits props that are set to their default values for cleaner output.
 */

export interface CarouselPlaygroundProps {
  autoPlay: boolean;
  autoPlayInterval: number;
  enableLoop: boolean;
  hideNavigation: boolean;
  hideIndicators: boolean;
  disableGestures: boolean;
  disableKeyboard: boolean;
  transition: 'slide' | 'fade';
  transitionDuration: number;
  slidesPerView: number;
  spacing: number;
}

// Default values matching the Carousel component
const DEFAULTS: CarouselPlaygroundProps = {
  autoPlay: false,
  autoPlayInterval: 5000,
  enableLoop: false,
  hideNavigation: false,
  hideIndicators: false,
  disableGestures: false,
  disableKeyboard: false,
  transition: 'slide',
  transitionDuration: 450,
  slidesPerView: 1,
  spacing: 0,
};

function formatPropValue(key: string, value: unknown): string {
  if (typeof value === 'boolean') {
    // Boolean props can be written as just the prop name when true
    return value ? key : '';
  }
  if (typeof value === 'number') {
    return `${key}={${value}}`;
  }
  if (typeof value === 'string') {
    return `${key}="${value}"`;
  }
  if (typeof value === 'object') {
    return `${key}={${JSON.stringify(value)}}`;
  }
  return '';
}

export function generateCodeSnippet(props: CarouselPlaygroundProps): string {
  const nonDefaultProps: string[] = [];

  // Check each prop against its default value
  for (const [key, value] of Object.entries(props)) {
    const defaultValue = DEFAULTS[key as keyof CarouselPlaygroundProps];

    // Only include prop if it differs from default
    if (value !== defaultValue) {
      const formatted = formatPropValue(key, value);
      if (formatted) {
        nonDefaultProps.push(formatted);
      }
    }
  }

  // Build the JSX string
  const indent = '  ';
  const childrenPlaceholder = '{/* Your slides here */}';

  if (nonDefaultProps.length === 0) {
    return `<Carousel>\n${indent}${childrenPlaceholder}\n</Carousel>`;
  }

  // Format props on separate lines for readability
  const propsString = nonDefaultProps
    .map((prop) => `${indent}${prop}`)
    .join('\n');

  return `<Carousel\n${propsString}\n>\n${indent}${childrenPlaceholder}\n</Carousel>`;
}

export { DEFAULTS };
