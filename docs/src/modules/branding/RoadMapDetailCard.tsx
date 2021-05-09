import * as React from 'react';
import { Box, BoxProps, Typography, Button } from '@material-ui/core';
import Link from 'docs/src/modules/components/Link';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Image from './MaterialUixImage';

interface RoadMapDetailCardProps {
  src: string;
  imageWidth: number;
  imageHeight: number;
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
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    lineHeight: 'normal',
    height: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      minWidth: theme.spacing(5),
    },
  },
  '& .MuiButton-label': {
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: 0,
    },
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(0),
    },
  },
}));

export default function RoadMapDetailCard(props: RoadMapDetailCardProps) {
  const { src, imageWidth, imageHeight, label, buttonLabel, startIcon, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'white',
        mb: 1.5,
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 2.5,
        borderRadius: 4,
      }}
    >
      <Image
        src={src}
        width={imageWidth}
        height={imageHeight}
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
