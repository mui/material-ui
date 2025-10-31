# Density

How to apply density to Material UI components.

## Applying density

This section explains how to apply density.
It doesn't cover potential use cases, or considerations for using density in your application.
The Material Design guidelines have a [comprehensive guide](https://m2.material.io/design/layout/applying-density.html) covering these topics in more detail.

## Implementing density

Higher density can be applied to some components via props. The component pages
have at least one example using the respective component with higher density applied.

Depending on the component, density is applied either via lower spacing, or simply by
reducing the size.

The following components have props applying higher density:

- [Button](/material-ui/api/button/)
- [Fab](/material-ui/api/fab/)
- [FilledInput](/material-ui/api/filled-input/)
- [FormControl](/material-ui/api/form-control/)
- [FormHelperText](/material-ui/api/form-helper-text/)
- [IconButton](/material-ui/api/icon-button/)
- [InputBase](/material-ui/api/input-base/)
- [InputLabel](/material-ui/api/input-label/)
- [ListItem](/material-ui/api/list-item/)
- [OutlinedInput](/material-ui/api/outlined-input/)
- [Table](/material-ui/api/table/)
- [TextField](/material-ui/api/text-field/)
- [Toolbar](/material-ui/api/toolbar/)

## Explore theme density

This tool allows you to apply density via spacing and component props. You can browse
around and see how this applies to the overall feel of Material UI components.

If you enable high density a custom theme is applied to the docs. This theme is only
for demonstration purposes. You _should not_ apply this theme to your whole application
as this might negatively impact user experience. The [Material Design guidelines](https://m2.material.io/design/layout/applying-density.html) has examples
for when not to apply density.

The theme is configured with the following options:

```js
const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
      },
    },
  },
});
```

```jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IncreaseIcon from '@mui/icons-material/AddCircleOutline';
import DecreaseIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  DispatchContext,
  ThemeOptionsContext,
} from 'docs/src/modules/components/ThemeContext';
import { useTranslate } from '@mui/docs/i18n';
import { setDocsSpacing, resetDocsSpacing } from 'docs/src/BrandingCssVarsProvider';

const minSpacing = 0;
const maxSpacing = 20;

export default function DensityTool() {
  const [spacingUnit, setSpacingUnit] = React.useState(8);
  const dispatch = React.useContext(DispatchContext);
  const themeOptions = React.useContext(ThemeOptionsContext);
  const handleDensityChange = (event) => {
    dispatch({
      type: 'SET_DENSE',
      payload: event.target.checked,
    });
  };

  const handleSpacingChange = (event, value) => {
    let spacing = value || +event.target.value;

    //  If the entered value is greater than maxSpacing, setting up maxSpacing as value
    if (spacing > maxSpacing) {
      spacing = maxSpacing;
    }
    //  If the entered value is less than minSpacing, setting up minSpacing as value
    if (spacing < minSpacing) {
      spacing = minSpacing;
    }

    setSpacingUnit(spacing);
    setDocsSpacing(spacing);
  };

  const resetDensity = () => {
    setSpacingUnit(8);
    resetDocsSpacing();
    dispatch({ type: 'RESET_DENSITY' });
  };

  const t = useTranslate();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={themeOptions.dense}
            onChange={handleDensityChange}
            value="dense"
            color="secondary"
          />
        }
        label={t('useHighDensity')}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography id="input-slider" gutterBottom>
          {t('spacingUnit')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            aria-label={t('decreaseSpacing')}
            onClick={() => {
              setSpacingUnit(spacingUnit - 1);
              setDocsSpacing(spacingUnit - 1);
            }}
            disabled={spacingUnit === minSpacing}
          >
            <DecreaseIcon />
          </IconButton>
          <Input
            value={spacingUnit}
            margin="dense"
            onChange={handleSpacingChange}
            inputProps={{
              step: 1,
              min: minSpacing,
              max: maxSpacing,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          <IconButton
            aria-label={t('increaseSpacing')}
            onClick={() => {
              setSpacingUnit(spacingUnit + 1);
              setDocsSpacing(spacingUnit + 1);
            }}
            disabled={spacingUnit === maxSpacing}
          >
            <IncreaseIcon />
          </IconButton>
        </Box>
      </Box>
      <Button variant="contained" onClick={resetDensity}>
        {t('resetDensity')}
      </Button>
    </Box>
  );
}
```
