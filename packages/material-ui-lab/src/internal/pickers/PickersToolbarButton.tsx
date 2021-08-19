import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { TypographyProps } from '@material-ui/core/Typography';
import PickersToolbarText from './PickersToolbarText';
import { ExtendMui } from './typings/helpers';

export interface PickersToolbarButtonProps extends ExtendMui<ButtonProps, 'value' | 'variant'> {
  align?: TypographyProps['align'];
  selected: boolean;
  typographyClassName?: string;
  value: React.ReactNode;
  variant: TypographyProps['variant'];
}

const PickersToolbarButtonRoot = styled(Button, { skipSx: true })({
  padding: 0,
  minWidth: 16,
  textTransform: 'none',
});

const PickersToolbarButton: React.FunctionComponent<PickersToolbarButtonProps> = React.forwardRef(
  function PickersToolbarButton(props, ref) {
    const { align, className, selected, typographyClassName, value, variant, ...other } = props;

    return (
      <PickersToolbarButtonRoot
        data-mui-test="toolbar-button"
        variant="text"
        ref={ref}
        className={className}
        {...other}
      >
        <PickersToolbarText
          align={align}
          className={typographyClassName}
          variant={variant}
          value={value}
          selected={selected}
        />
      </PickersToolbarButtonRoot>
    );
  },
);

export default PickersToolbarButton;
