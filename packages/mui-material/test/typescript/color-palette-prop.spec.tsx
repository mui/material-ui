import * as React from 'react';
import {
  Badge,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormLabel,
  FilledInput,
  OutlinedInput,
  IconButton,
  Input,
  InputLabel,
  LinearProgress,
  Radio,
  TextField,
  SvgIcon,
  Switch,
} from '@mui/material';

function TestBaseColorPaletteProp() {
  const baseColorPalette = ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
  return (
    <div>
      {baseColorPalette.map((color) => (
        <div key={color}>
          <Badge color={color} />
          <Button color={color} />
          <Checkbox color={color} />
          <Chip color={color} />
          <CircularProgress color={color} />
          <FormControl color={color} />
          <FilledInput color={color} />
          <FormLabel color={color} />
          <OutlinedInput color={color} />
          <IconButton color={color} />
          <Input color={color} />
          <InputLabel color={color} />
          <LinearProgress color={color} />
          <TextField color={color} />
          <Radio color={color} />
          <SvgIcon color={color} />
          <Switch color={color} />
        </div>
      ))}
    </div>
  );
}
