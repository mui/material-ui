import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

export default function AlertVariousStates() {
  const items = [
    { title: 'Success', color: 'success', icon: <CheckCircleIcon /> },
    { title: 'Warning', color: 'warning', icon: <WarningIcon /> },
    { title: 'Error', color: 'danger', icon: <ReportIcon /> },
    { title: 'Info', color: 'info', icon: <InfoIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      {items.map(({ title, color, icon }) => (
        <Alert
          key={title}
          sx={{ alignItems: 'flex-start', pt: 0.5 }}
          variant="soft"
          color={color}
          startDecorator={
            <IconButton variant="soft" size="sm" color={color}>
              {icon}
            </IconButton>
          }
          endDecorator={
            <IconButton variant="soft" size="sm" color={color}>
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', pt: 0.5, pb: 1 }}>
            <Typography fontWeight="lg">{title}</Typography>
            <Typography fontSize="sm">{`${title} message.`}</Typography>
          </Box>
        </Alert>
      ))}
    </Box>
  );
}
