import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { usePrioritySupport } from 'docs/src/components/pricing/PrioritySupportContext';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export default function PrioritySupportSwitch() {
  const { prioritySupport, setPrioritySupport } = usePrioritySupport();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrioritySupport(event.target.checked);
  };
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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px dashed',
        borderColor: 'primary.dark',
        borderRadius: 1,
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'stretch',
          width: '100%',
          gap: 4,
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={prioritySupport} onChange={handleChange} />}
            label={
              <Tooltip title={prioritySupportDescription} {...tooltipProps}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Priority support
                </Typography>
              </Tooltip>
            }
            sx={{
              mb: 0.5,
              ml: 0,
              gap: 7,
            }}
            labelPlacement="start"
          />
        </FormGroup>
      </Box>
      <Typography variant="body2" color="text.secondary">
        24h SLA response time, support for MUI Core, and the highest priority on bug fixes.
      </Typography>
    </Box>
  );
}

export function PrioritySupportSwitch2() {
  const { prioritySupport, setPrioritySupport } = usePrioritySupport();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrioritySupport(event.target.checked);
  };
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
