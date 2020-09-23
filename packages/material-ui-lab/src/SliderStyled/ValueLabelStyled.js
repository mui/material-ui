import * as React from 'react';
import { useThemeProps, muiStyled } from '@material-ui/core/styles';
import ValueLabelUnstyled from '../SliderUnstyled/ValueLabelUnstyled';

const overridesResolver = (_, styles) => {
  const componentName = 'MuiSlider-valueLabel';

  const styleOverrides = {
    ...styles.root,
    [`&.${componentName}Open`]: styles.open,
    [`&.${componentName}Offset`]: styles.offset,
    [`& .${componentName}Circle`]: styles.circle,
    [`& .${componentName}Label`]: styles.label,
  };

  return styleOverrides;
};

const ValueLabelRoot = muiStyled(
  'span',
  {},
  { muiName: 'PrivateValueLabel', overridesResolver },
)((props) => ({
  '&.MuiSlider-valueLabelOffset': {
    '&.MuiSlider-valueLabelOpen': {
      transform: 'scale(1) translateY(-10px)',
    },
    zIndex: 1,
    ...props.theme.typography.body2,
    fontSize: props.theme.typography.pxToRem(12),
    lineHeight: 1.2,
    transition: props.theme.transitions.create(['transform'], {
      duration: props.theme.transitions.duration.shortest,
    }),
    top: -34,
    transformOrigin: 'bottom center',
    transform: 'scale(0)',
    position: 'absolute',
  },
  '& .MuiSlider-valueLabelCircle': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: 'currentColor',
    transform: 'rotate(-45deg)',
  },
  '& .MuiSlider-valueLabelLabel': {
    color: props.theme.palette.primary.contrastText,
    transform: 'rotate(45deg)',
  },
}));

/**
 * @ignore - internal component.
 */
const ValueLabel = React.forwardRef(function ValueLabel(inputProps, ref) {
  const props = useThemeProps({ props: inputProps, name: 'PrivateValueLabel' });
  /* eslint-disable react/prop-types */
  const { components = {}, ...other } = props;

  return (
    <ValueLabelUnstyled
      {...other}
      components={{
        Root: ValueLabelRoot || components.Root,
      }}
      ref={ref}
    />
  );
});

export default ValueLabel;
