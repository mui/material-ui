import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui-components/react/number-field';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function NumberSpin() {
  const id = React.useId();
  return (
    <BaseNumberField.Root
      defaultValue={20}
      min={10}
      max={40}
      render={
        <FormControl
          sx={{
            '--h': '56px',
            maxWidth: 'fit-content',
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
        Error Handling
      </FormLabel>
      <BaseNumberField.Group
        render={
          <Box
            sx={(theme) => ({
              display: 'flex',
              borderRadius: 1,
              minHeight: 'var(--h)',
              outlineOffset: '-2px',
              '&:focus-within': {
                outline: '2px solid',
                outlineColor: (theme.vars || theme).palette.primary.main,
              },
              '.Mui-error + &': {
                outline: '2px solid',
                outlineColor: (theme.vars || theme).palette.error.main,
              },
            })}
          />
        }
      >
        <BaseNumberField.Input
          render={
            <Box
              id={id}
              component="input"
              sx={(theme) => ({
                border: '1px solid',
                borderColor: 'divider',
                borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
                borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
                borderRight: '0px',
                fontSize: '1rem',
                px: 2,
                py: 1.5,
                pr: 6,
                minWidth: 0,
                width: '100%',
                '&:focus': {
                  outline: 'none',
                },
              })}
            />
          }
        />

        <Box
          sx={(theme) => ({
            flex: 'none',
            border: '1px solid',
            borderColor: 'divider',
            borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
            borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
            display: 'flex',
            flexDirection: 'column',
            width: '2.5rem',
            gap: 0,
            '& .MuiIconButton-root': {
              p: 0,
              flex: 1,
              borderRadius: 0.5,
            },
          })}
        >
          <BaseNumberField.Increment render={<IconButton aria-label="Increase" />}>
            <KeyboardArrowUpIcon />
          </BaseNumberField.Increment>

          <BaseNumberField.Decrement render={<IconButton aria-label="Decrease" />}>
            <KeyboardArrowDownIcon />
          </BaseNumberField.Decrement>
        </Box>
      </BaseNumberField.Group>
      <FormHelperText sx={{ ml: 0, '&:empty': { mt: 0 } }}>
        Enter value between 10 and 40
      </FormHelperText>
    </BaseNumberField.Root>
  );
}
