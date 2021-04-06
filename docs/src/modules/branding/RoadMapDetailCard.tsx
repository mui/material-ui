import * as React from 'react';
import { Box, BoxProps, Typography, Button } from '@material-ui/core';
import Link from 'docs/src/modules/components/Link';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Image from './MaterialUixImage';

interface RoadMapDetailCardProps {
  src: string;
  label: string;
  buttonLabel: string;
  startIcon: any;
  buttonSx?: BoxProps['sx'];
}
const CustomButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-containedPrimary': {
    borderRadius: theme.spacing(0.5),
    marginLeft: 'auto',
    width: 'auto',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1.8),
    paddingLeft: theme.spacing(1.8),
    lineHeight: 'normal',
    height: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      minWidth: theme.spacing(5),
      padding: '5px 9px',
    },
  },
  '& .MuiButton-label': {
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: 0,
    },
  },
  '& .MuiButton-startIcon': {
    margin: '0px 10px 0 0 !important',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 0 0 !important',
    },
  },
}));

export default function RoadMapDetailCard(props: RoadMapDetailCardProps) {
  const { src, label, buttonLabel, startIcon, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'white',
        mb: 1.3,
        display: 'flex',
        alignItems: 'center',
        padding: '20px 24px',
        borderRadius: '4px',
      }}
    >
      <Image
        src={src}
        sx={{
          position: 'relative',
          '& img': {
            m: 0,
          },
          p: 0,
          mr: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
      <CustomButton
        href="/company/jobs/"
        component={Link}
        noLinkStyle
        color="primary"
        variant="contained"
        startIcon={startIcon}
        sx={{ ...other.buttonSx }}
      >
        {buttonLabel}
      </CustomButton>
    </Box>
  );
}
