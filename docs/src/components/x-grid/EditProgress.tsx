import * as React from 'react';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import { debounce } from '@mui/material/utils';
import { alpha } from '@mui/material/styles';
import Slider, { SliderValueLabelProps } from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';

function ValueLabelComponent(props: SliderValueLabelProps) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} arrow>
      {children}
    </Tooltip>
  );
}

export default function EditProgress(props: GridRenderEditCellParams) {
  const { id, value, api, field } = props;
  const [valueState, setValueState] = React.useState(Number(value));

  const updateCellEditProps = React.useCallback(
    (newValue: number | number[]) => {
      api.setEditCellValue({ id, field, value: newValue });
    },
    [api, field, id],
  );

  const debouncedUpdateCellEditProps = React.useMemo(
    () => debounce(updateCellEditProps, 60),
    [updateCellEditProps],
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValueState(newValue as number);
    debouncedUpdateCellEditProps(newValue);
  };

  React.useEffect(() => {
    setValueState(Number(value));
  }, [value]);

  const handleRef = (element: any) => {
    if (element) {
      const input = element.querySelector('input') as null | HTMLInputElement;
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <Slider
      ref={handleRef}
      sx={{
        p: 0,
        height: '100%',
        borderRadius: '0px',
        '& .MuiSlider-rail': {
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
        },
        '& .MuiSlider-track': {
          border: 0,
          ...(valueState < 0.3 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'error.800' : 'error.500'),
          }),
          ...(valueState >= 0.3 &&
            valueState <= 0.7 && {
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'warning.800' : 'warning.500'),
            }),
          ...(valueState > 0.7 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'success.800' : 'success.500'),
          }),
        },
        '& .MuiSlider-thumb': {
          cursor: 'col-resize',
          height: '100%',
          width: 5,
          borderRadius: '0px',
          marginTop: 0,
          backgroundColor: alpha('#000000', 0.2),
        },
      }}
      value={valueState}
      max={1}
      step={0.00001}
      onChange={handleChange}
      components={{
        ValueLabel: ValueLabelComponent,
      }}
      valueLabelDisplay="auto"
      valueLabelFormat={(newValue) => `${(newValue * 100).toLocaleString()} %`}
    />
  );
}
