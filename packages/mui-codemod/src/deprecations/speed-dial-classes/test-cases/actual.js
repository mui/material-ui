import { speedDialClasses, speedDialActionClasses, speedDialIconClasses } from '@mui/material/SpeedDial';

const theme = {
  components: {
    MuiSpeedDial: {
      styleOverrides: {
        root: {
          [`& .${speedDialClasses.actionsClosed}`]: {
            color: 'red',
          },
        },
      },
    },
    MuiSpeedDialAction: {
      styleOverrides: {
        root: {
          [`& .${speedDialActionClasses.fabClosed}`]: {
            color: 'red',
          },
          [`& .${speedDialActionClasses.staticTooltipClosed}`]: {
            color: 'red',
          },
        },
      },
    },
    MuiSpeedDialIcon: {
      styleOverrides: {
        root: {
          [`& .${speedDialIconClasses.iconWithOpenIconOpen}`]: {
            color: 'red',
          },
          [`& .${speedDialIconClasses.openIconOpen}`]: {
            color: 'red',
          },
        },
      },
    },
  },
};

export default theme;
