import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import InfoCard from 'docs/src/components/action/InfoCard';
import HighlightAltRoundedIcon from '@mui/icons-material/HighlightAltRounded';
import CssRoundedIcon from '@mui/icons-material/CssRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PictureInPictureRoundedIcon from '@mui/icons-material/PictureInPictureRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import MoveUpRoundedIcon from '@mui/icons-material/MoveUpRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import FlipToFrontRoundedIcon from '@mui/icons-material/FlipToFrontRounded';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import DevicesOtherRoundedIcon from '@mui/icons-material/DevicesOtherRounded';

const utilComponents = [
  {
    title: 'Click-Away Listener',
    link: '/material-ui/react-click-away-listener/',
    icon: <HighlightAltRoundedIcon />,
  },
  {
    title: 'CSS Baseline',
    link: '/material-ui/react-css-baseline/',
    icon: <CssRoundedIcon />,
  },
  {
    title: 'Modal',
    link: '/material-ui/react-Modal/',
    icon: <PictureInPictureRoundedIcon />,
  },
  {
    title: 'No SSR',
    link: '/material-ui/react-no-ssr/',
    icon: <DnsRoundedIcon />,
  },
  {
    title: 'Popover',
    link: '/material-ui/react-popover/',
    icon: <MenuOpenRoundedIcon />,
  },
  {
    title: 'Popper',
    link: '/material-ui/react-popper/',
    icon: <FlipToFrontRoundedIcon />,
  },
  {
    title: 'Portal',
    link: '/material-ui/react-portal/',
    icon: <MoveUpRoundedIcon />,
  },
  {
    title: 'Textarea Autosize',
    link: '/material-ui/react-textarea-autosize/',
    icon: <TextFieldsRoundedIcon />,
  },
  {
    title: 'Transitions',
    link: '/material-ui/react-transitions/',
    icon: <ZoomOutMapRoundedIcon />,
  },
  {
    title: 'useMediaQuery',
    link: '/material-ui/react-use-media-query/',
    icon: <DevicesOtherRoundedIcon />,
  },
];

export default function MaterialUtilComponents() {
  return (
    <Grid container spacing={2}>
      {utilComponents.map(({ icon, title, link }) => (
        <Grid key={title} xs={12} sm={4}>
          <InfoCard dense link={link} title={title} icon={icon} />
        </Grid>
      ))}
    </Grid>
  );
}
