import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { usePrioritySupport } from 'docs/src/components/pricing/PrioritySupportContext';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function PrioritySupportSwitch() {
  const { prioritySupport, setPrioritySupport } = usePrioritySupport();
  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPrioritySupport(event.target.checked);
  }, []);
  const prioritySupportDescription =
    'At $399/year/dev, get the highest level of support with a 24h SLA response time, pre-screening and issue escalation.';

  const tooltipProps = {
    enterDelay: 400,
    enterNextDelay: 50,
    enterTouchDelay: 500,
    placement: 'top' as 'top',
    describeChild: true,
    slotProps: {
      tooltip: {
        sx: {
          fontSize: 12,
        },
      },
    },
  };

  return (
    <Box
      sx={(theme) => ({
        border: '1px solid',
        borderColor: 'primary.100',
        borderRadius: 1,
        padding: 2,
        ...theme.applyDarkStyles({
          borderColor: `${alpha(theme.palette.primary[700], 0.4)}`,
        }),
      })}
    >
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={prioritySupport} onChange={handleChange} />}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                fontWeight="semiBold"
                color="text.primary"
                variant="body2"
                sx={{
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                }}
              >
                Priority support
              </Typography>
              <Tooltip title={prioritySupportDescription} {...tooltipProps}>
                <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              </Tooltip>
            </Box>
          }
          sx={{
            mb: 0.5,
            ml: 0,
            mr: 0,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            '& .MuiFormControlLabel-label': {
              marginRight: 'auto',
            },
          }}
          labelPlacement="start"
        />
      </FormGroup>
      <Typography variant="body2" color="text.secondary">
        24h SLA response time, support for MUI Core, and the highest priority on bug fixes.
      </Typography>
    </Box>
  );
}

export function PrioritySupportSwitchTable() {
  const { prioritySupport, setPrioritySupport } = usePrioritySupport();
  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPrioritySupport(event.target.checked);
  }, []);
  const prioritySupportDescription =
    'At $399/year/dev, get the highest level of support with a 24h SLA response time, pre-screening and issue escalation.';

  const tooltipProps = {
    enterDelay: 400,
    enterNextDelay: 50,
    enterTouchDelay: 500,
    placement: 'top' as 'top',
    describeChild: true,
    slotProps: {
      tooltip: {
        sx: {
          fontSize: 12,
        },
      },
    },
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={prioritySupport} onChange={handleChange} />}
        label={
          <Tooltip title={prioritySupportDescription} {...tooltipProps}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.875rem' }}
            >
              Priority support
            </Typography>
          </Tooltip>
        }
        sx={{
          mb: 0.5,
          gap: 1,
        }}
        labelPlacement="start"
      />
    </FormGroup>
  );
}
