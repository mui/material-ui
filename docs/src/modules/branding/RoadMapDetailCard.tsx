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
    borderRadius: '4px',
    marginLeft: 'auto',
    width: 'auto',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingRight: '14px',
    paddingLeft: '14px',
    lineHeight: 'normal',
    height: '32px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '40px',
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
        padding: '20px',
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
          mr: 2.2,
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
