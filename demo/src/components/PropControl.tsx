import * as React from 'react';
import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Select,
  MenuItem,
  Slider,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';

interface ToggleControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleControl({ label, value, onChange }: ToggleControlProps) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          size="small"
        />
      }
      label={label}
      sx={{ minWidth: 160 }}
    />
  );
}

interface NumberControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberControl({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: NumberControlProps) {
  return (
    <TextField
      label={label}
      type="number"
      size="small"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      inputProps={{ min, max, step }}
      sx={{ width: 140 }}
    />
  );
}

interface SelectControlProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}

export function SelectControl<T extends string>({
  label,
  value,
  onChange,
  options,
}: SelectControlProps<T>) {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  valueLabelDisplay?: 'auto' | 'on' | 'off';
}

export function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  valueLabelDisplay = 'auto',
}: SliderControlProps) {
  return (
    <Box sx={{ width: 200 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {label}: {value}
      </Typography>
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(newValue as number)}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay={valueLabelDisplay}
        size="small"
      />
    </Box>
  );
}
