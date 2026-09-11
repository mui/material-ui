import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import StepButton from '@mui/material/StepButton';
import Tab from '@mui/material/Tab';
import ToggleButton from '@mui/material/ToggleButton';

<Button disabled focusableWhenDisabled />;
<IconButton disabled focusableWhenDisabled />;

// @ts-expect-error focusableWhenDisabled is only exposed by Button and IconButton
<ButtonBase focusableWhenDisabled />;
// @ts-expect-error focusableWhenDisabled is only exposed by Button and IconButton
<MenuItem focusableWhenDisabled />;
// @ts-expect-error focusableWhenDisabled is only exposed by Button and IconButton
<StepButton focusableWhenDisabled />;
// @ts-expect-error focusableWhenDisabled is only exposed by Button and IconButton
<ToggleButton focusableWhenDisabled value="value" />;
// @ts-expect-error focusableWhenDisabled is only exposed by Button and IconButton
<Tab focusableWhenDisabled />;

createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        focusableWhenDisabled: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        focusableWhenDisabled: true,
      },
    },
  },
});

createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        // @ts-expect-error focusableWhenDisabled is only exposed by Button and IconButton
        focusableWhenDisabled: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        // @ts-expect-error focusableWhenDisabled is only exposed by Button and IconButton
        focusableWhenDisabled: true,
      },
    },
    MuiStepButton: {
      defaultProps: {
        // @ts-expect-error focusableWhenDisabled is only exposed by Button and IconButton
        focusableWhenDisabled: true,
      },
    },
    MuiToggleButton: {
      defaultProps: {
        // @ts-expect-error focusableWhenDisabled is only exposed by Button and IconButton
        focusableWhenDisabled: true,
      },
    },
    MuiTab: {
      defaultProps: {
        // @ts-expect-error focusableWhenDisabled is only exposed by Button and IconButton
        focusableWhenDisabled: true,
      },
    },
  },
});
