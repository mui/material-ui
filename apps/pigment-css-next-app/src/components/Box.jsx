import { generateAtomics } from '@mui/material-pigment-css';

const atomics = generateAtomics(({ theme }) => ({
  conditions: Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${theme.breakpoints.values[breakpoint]}${
      theme.breakpoints.unit ?? 'px'
    })`;
    return acc;
  }, {}),
  defaultCondition: 'xs',
  properties: {
    display: [
      'block',
      'inline-flex',
      'contents',
      'none',
      'flex',
      'inline-flex',
      'grid',
      'inline-grid',
    ],
    flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
    justifyContent: [
      'center',
      'end',
      'flex-end',
      'flex-start',
      'left',
      'right',
      'space-around',
      'space-between',
      'space-evenly',
      'start',
    ],
    alignItems: [
      'baseline',
      'center',
      'end',
      'flex-end',
      'flex-start',
      'self-end',
      'self-start',
      'start',
      'stretch',
    ],
    position: ['relative', 'absolute', 'static', 'sticky', 'fixed'],
  },
  shorthands: {
    direction: ['flexDirection'],
  },
}));

// eslint-disable-next-line react/prop-types
export function Box({ children, as = 'div', className = '', style = undefined, ...other }) {
  const Component = as;
  const atomicsResult = atomics(other);
  const componentClass = `${atomicsResult.className} ${className ?? ''}`.trim();
  const finalStyles = {
    ...(atomicsResult.style ?? {}),
    ...style,
  };
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component className={componentClass} style={finalStyles}>
      {children}
    </Component>
  );
}
