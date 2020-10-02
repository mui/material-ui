import * as React from 'react';
import { useThemeProps, experimentalStyled } from '@material-ui/core/styles';
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

const ValueLabelRoot = experimentalStyled(
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
    transformOrigin: 'bottom left',
    transform: 'scale(0)',
    position: 'absolute',
  },
  '& .MuiSlider-valueLabelContainer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6e6e6e',
    borderRadius: 2,
    position: 'relative',
    left: '-50%',
  },
  '& .MuiSlider-valueLabelArrow': {
    position: 'absolute',
    width: '1em',
    height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
    boxSizing: 'border-box',
    color: '#6e6e6e',
    bottom: 0,
    left: 0,
    marginBottom: '-0.71em',
    marginLeft: 'calc(50% - 0.5em)',
    marginRight: 'calc(50% - 0.5em)',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: 'currentColor',
      transform: 'rotate(45deg)',
      transformOrigin: '100% 0',
    },
  },
  '& .MuiSlider-valueLabelLabel': {
    color: props.theme.palette.common.white,
    padding: '8px 12px',
    whiteSpace: 'nowrap',
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
