import * as React from 'react';

interface StyledOptions {
  shouldForwardProp?: (prop: PropertyKey) => boolean;
}

interface StyledProps extends Record<string, unknown> {
  as?: React.ElementType;
  sx?: unknown;
}

const defaultShouldForwardProp = (prop: PropertyKey) =>
  prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';

export default function styled(Tag: React.ElementType, options: StyledOptions = {}) {
  const finalShouldForwardProp = options.shouldForwardProp || defaultShouldForwardProp;
  let warnedAboutSx = false;

  const Component = React.forwardRef<unknown, StyledProps>(
    function NoopStyledComponent(props, ref) {
      if (import.meta.env.DEV && !warnedAboutSx && props.sx !== undefined) {
        warnedAboutSx = true;
        const componentName =
          typeof Tag === 'string' ? `<${Tag}>` : Tag.displayName || Tag.name || 'a component';
        console.error(
          `MUI: The \`sx\` prop was used on ${componentName}, but the no-op styled engine is active. ` +
            'The `sx` prop will be ignored; use a className and external CSS instead.',
        );
      }

      const { as: asProp, ...restProps } = props;
      const FinalTag = (asProp || Tag) as React.ElementType;
      const forwardedProps = Object.fromEntries(
        Object.entries(restProps).filter(([prop]) => finalShouldForwardProp(prop)),
      );

      return React.createElement(FinalTag, { ...forwardedProps, ref });
    },
  );

  return function resolveNoopStyles(..._styles: unknown[]) {
    return Component;
  };
}

export function keyframes() {
  return 'animation-name';
}

export function css() {
  return '';
}

export const ThemeContext = React.createContext<null>(null);

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_mutateStyles(
  _tag: React.ElementType,
  _processor: (styles: unknown[]) => unknown[],
) {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_serializeStyles(_styles: unknown) {
  return '';
}

export function StyledEngineProvider({ children }: React.PropsWithChildren) {
  return children;
}

export function GlobalStyles() {
  return null;
}
