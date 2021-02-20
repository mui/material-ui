import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CheckIcon from 'docs/src/modules/branding/icons/Check';
import CloseIcon from 'docs/src/modules/branding/icons/Close';
import PendingIcon from 'docs/src/modules/branding/icons/Pending';
import Typography from '@material-ui/core/Typography';

interface PlanStatusProps {
  isCheckIcon: boolean;
  isCloseIcon: boolean;
  isPendingIcon: boolean;
  mainText: string;
  bottonText?: string;
}

function PlanStatus(props: PlanStatusProps) {
  const {
    isCheckIcon = false,
    isCloseIcon = false,
    isPendingIcon = false,
    mainText = '',
    bottonText = '',
  } = props;
  return (
    <Box>
      {isCheckIcon ? (
        <CheckIcon
          sx={{ backgroundColor: 'rgb(204, 229, 255)', color: 'primary.main', borderRadius: '50%' }}
        />
      ) : isCloseIcon ? (
        <CloseIcon />
      ) : isPendingIcon ? (
        <PendingIcon />
      ) : (
              <Typography
                variant="h5"
                sx={{ fontSize: { lg: '16px', sm: '16px', xs: '12px' }, lineHeight: { lg: '24px', sm: '24px', xs: '20px' }, fontWeight: 'normal' }}
              >
                {mainText}
              </Typography>
            )}
      <Typography
        variant="h5"
        sx={{ color: '#8796A5', fontSize: { lg: '14px', sm: '14px', xs: '12px' }, lineHeight: '20px', fontWeight: 'normal' }}
      >
        {bottonText}
      </Typography>
    </Box>
  );
}

export default PlanStatus;
