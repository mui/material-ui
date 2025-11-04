import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui-components/react/number-field';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function NumberField() {
  const id = React.useId();
  return (
    <BaseNumberField.Root
      defaultValue={100}
      render={
        <FormControl
          sx={{
            '--h': '56px',
            '& .MuiButton-root': {
              borderColor: 'divider',
              minWidth: 0,
              bgcolor: 'action.hover',
              color: 'text.primary',
            },
          }}
        />
      }
    >
      <FormLabel
        htmlFor={id}
        sx={{
          width: 'fit-content',
          fontWeight: 500,
          fontSize: '0.875rem',
          lineHeight: 1.5,
          mb: 0.5,
          color: 'text.primary',
        }}
      >
        Amount
      </FormLabel>
      <BaseNumberField.Group
        render={
          <Box
            sx={{
              display: 'flex',
              borderRadius: 1,
              minHeight: 'var(--h)',
            }}
          />
        }
      >
        <BaseNumberField.Decrement
          render={
            <Button
              variant="outlined"
              aria-label="Decrease"
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
          }
        >
          <RemoveIcon />
        </BaseNumberField.Decrement>

        <BaseNumberField.Input
          render={
            <Box
              id={id}
              component="input"
              sx={(theme) => ({
                borderBlock: '1px solid',
                borderInline: 0,
                borderColor: 'divider',
                fontSize: '1rem',
                px: 1,
                minWidth: 0,
                width: '6rem',
                textAlign: 'center',
                '&:focus': {
                  outline: '2px solid',
                  outlineColor: (theme.vars || theme).palette.primary.main,
                  outlineOffset: '-2px',
                },
              })}
            />
          }
        />

        <BaseNumberField.Increment
          render={
            <Button
              variant="outlined"
              aria-label="Increase"
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            />
          }
        >
          <AddIcon />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
      <FormHelperText sx={{ ml: 0, '&:empty': { mt: 0 } }}>
        This number field is built with Base UI
      </FormHelperText>
    </BaseNumberField.Root>
  );
}
