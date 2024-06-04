import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IncreaseIcon from '@mui/icons-material/AddCircleOutline';
import DecreaseIcon from '@mui/icons-material/RemoveCircleOutline';
import { DispatchContext } from 'docs/src/modules/components/ThemeContext';
import { useTranslate } from '@mui/docs/i18n';

const minSpacing = 0;
const maxSpacing = 20;

export default function DensityTool() {
  const dispatch = React.useContext(DispatchContext);
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

    dispatch({
      type: 'SET_SPACING',
      payload: spacing,
    });
  };

  const increaseSpacing = () => {
    dispatch({ type: 'INCREASE_SPACING' });
  };

  const decreaseSpacing = () => {
    dispatch({ type: 'DECREASE_SPACING' });
  };

  const resetDensity = () => {
    dispatch({ type: 'RESET_DENSITY' });
  };

  const theme = useTheme();
  // Use unstable_toUnitless in the future if need to handle custom themes
  const spacingUnit = parseFloat(theme.spacing(1));

  const t = useTranslate();

  return (
    <Grid container spacing={2}>
      <Grid container item>
        <FormControlLabel
          control={
            <Switch
              checked={theme.dense}
              onChange={handleDensityChange}
              value="dense"
              color="secondary"
            />
          }
          label={t('useHighDensity')}
        />
      </Grid>
      <Grid container item spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item>
          <Typography id="input-slider" gutterBottom>
            {t('spacingUnit')}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            aria-label={t('decreaseSpacing')}
            onClick={decreaseSpacing}
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
            onClick={increaseSpacing}
            disabled={spacingUnit === maxSpacing}
          >
            <IncreaseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={resetDensity}>
          {t('resetDensity')}
        </Button>
      </Grid>
    </Grid>
  );
}
