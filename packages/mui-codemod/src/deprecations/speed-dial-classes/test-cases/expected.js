import { speedDialClasses, speedDialActionClasses, speedDialIconClasses } from '@mui/material/SpeedDial';

const theme = {
  components: {
    MuiSpeedDial: {
      styleOverrides: {
        root: {
          [`&.${speedDialClasses.actions}.${speedDialClasses.closed}`]: {
            color: 'red',
          },
        },
      },
    },
    MuiSpeedDialAction: {
      styleOverrides: {
        root: {
          [`&.${speedDialActionClasses.fab}.${speedDialActionClasses.closed}`]: {
            color: 'red',
          },
          [`&.${speedDialActionClasses.staticTooltip}.${speedDialActionClasses.closed}`]: {
            color: 'red',
          },
        },
      },
    },
    MuiSpeedDialIcon: {
      styleOverrides: {
        root: {
          [`&.${speedDialIconClasses.iconWithOpenIcon}.${speedDialIconClasses.open}`]: {
            color: 'red',
          },
          [`&.${speedDialIconClasses.openIcon}.${speedDialIconClasses.open}`]: {
            color: 'red',
          },
        },
      },
    },
  },
};

export default theme;
