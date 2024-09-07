import * as React from 'react';
import {
  IconButtonProps,
  svgIconClasses,
  Autocomplete,
  IconButton,
  TextField,
} from '@mui/material';

declare module '@mui/material/Autocomplete' {
  interface AutocompletePopupIndicatorSlotPropsOverrides {
    iconSize: 'small' | 'medium' | 'large';
  }
}

type CustomIconButtonProps = IconButtonProps<
  'button',
  {
    iconSize?: 'small' | 'medium' | 'large';
  }
>;

const CustomIconButton = ({ iconSize, ...other }: CustomIconButtonProps) => {
  return (
    <IconButton
      {...other}
      sx={{
        [`.${svgIconClasses.root}`]: {
          fontSize: iconSize === 'small' ? '1rem' : '1.5rem',
        },
      }}
    />
  );
};

<Autocomplete
  options={['Option 1', 'Option 2', 'Option 3']}
  renderInput={(params) => <TextField {...params} />}
  slots={{
    popupIndicator: CustomIconButton,
  }}
  slotProps={{
    popupIndicator: {
      iconSize: 'large',
    },
  }}
/>;
