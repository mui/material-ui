import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import type { Employee } from './data/employees';

export interface EmployeeFormState {
  values: Partial<Omit<Employee, 'id'>>;
  errors: Partial<Record<keyof EmployeeFormState['values'], string>>;
}

export type FormFieldValue = string | string[] | number | boolean | File | null;

export interface EmployeeFormProps {
  formState: EmployeeFormState;
  onFieldChange: (
    name: keyof EmployeeFormState['values'],
    value: FormFieldValue,
  ) => void;
  onSubmit: (formValues: Partial<EmployeeFormState['values']>) => Promise<void>;
  onReset?: (formValues: Partial<EmployeeFormState['values']>) => void;
  submitButtonLabel: string;
}

export default function EmployeeForm(props: EmployeeFormProps) {
  const { formState, onFieldChange, onSubmit, onReset, submitButtonLabel } = props;

  const formValues = formState.values;
  const formErrors = formState.errors;

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setIsSubmitting(true);
      try {
        await onSubmit(formValues);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formValues, onSubmit],
  );

  const handleTextFieldChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFieldChange(
        event.target.name as keyof EmployeeFormState['values'],
        event.target.value,
      );
    },
    [onFieldChange],
  );

  const handleNumberFieldChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFieldChange(
        event.target.name as keyof EmployeeFormState['values'],
        Number(event.target.value),
      );
    },
    [onFieldChange],
  );

  const handleDateFieldChange = React.useCallback(
    (fieldName: keyof EmployeeFormState['values']) => (value: Dayjs | null) => {
      if (value?.isValid()) {
        onFieldChange(fieldName, value.toISOString() ?? null);
      } else if (formValues[fieldName]) {
        onFieldChange(fieldName, null);
      }
    },
    [formValues, onFieldChange],
  );

  const handleSelectFieldChange = React.useCallback(
    (event: SelectChangeEvent) => {
      onFieldChange(
        event.target.name as keyof EmployeeFormState['values'],
        event.target.value,
      );
    },
    [onFieldChange],
  );

  const handleReset = React.useCallback(async () => {
    if (onReset) {
      await onReset(formValues);
    }
  }, [formValues, onReset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      onReset={handleReset}
      sx={{ width: '100%' }}
    >
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.name ?? ''}
              onChange={handleTextFieldChange}
              name="name"
              label="Name"
              error={!!formErrors.name}
              helperText={formErrors.name ?? ' '}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              type="number"
              value={formValues.age ?? ''}
              onChange={handleNumberFieldChange}
              name="age"
              label="Age"
              error={!!formErrors.age}
              helperText={formErrors.age ?? ' '}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formValues.joinDate ? dayjs(formValues.joinDate) : null}
                onChange={handleDateFieldChange('joinDate')}
                name="joinDate"
                label="Join date"
                slotProps={{
                  textField: {
                    error: !!formErrors.joinDate,
                    helperText: formErrors.joinDate ?? ' ',
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <FormControl error={!!formErrors.role} fullWidth>
              <InputLabel id="employee-role-label">Department</InputLabel>
              <Select
                value={formValues.role ?? ''}
                onChange={handleSelectFieldChange as SelectProps['onChange']}
                labelId="employee-role-label"
                name="role"
                label="Department"
                defaultValue=""
                fullWidth
              >
                <MenuItem value="Market">Market</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Development">Development</MenuItem>
              </Select>
              <FormHelperText>{formErrors.role ?? ' '}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </FormGroup>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {submitButtonLabel}
        </Button>
      </Box>
    </Box>
  );
}
