import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
    mode: 'light',
    primary: {
        light: '#4393E4',
        main: '#0B6BCB',
        dark: '#185EA5',
    },
    secondary: {
      light: '#00FF6F',
      main: '#00FF6F',
      dark: '#00FF6F',
    },
    warning: {
      main: '#F7B538',
      dark: '#F79F00',
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      light: '#00FF6F',
      main: '#00FF6F',
      dark: '#00FF6F',
    },
    background: {
      default: '#fff',
      paper: '#FBFCFE',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  
});

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        light: '#4393E4',
        main: '#0B6BCB',
        dark: '#185EA5',
      },
      background: {
        default: '#000',
        paper: '#171A1C',
      },
    },
  });

const fontHeader = {
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: "'Inter', sans-serif",
};

const albumTheme = {
  ...theme,
  ...darkTheme,
  palette: {
    ...theme.palette,
    background: {
      ...theme.palette.background,
      default: theme.palette.common.white,
      placeholder: grey[200],
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border:'1px solid rgba(0,0,0,0.1)',
          borderRadius: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: { variant: string } }) => ({
            boxShadow:'none',
            borderRadius:'8px',            

            ...(ownerState.variant === 'outlined' && {
                border:'1px solid',
                borderColor:'#C7DFF7',
              }),
              textTransform: 'none',
          }),
      },
    },
    MuiLink: {
        defaultProps: {
            underline: 'none',
        },
    },
    MuiAccordion: {
        defaultProps: {
            elevation: 0,            
          },
          styleOverrides: {
            root: {
                backgroundColor:'#fff',
            },
          },
    },
    MuiAccordionSummary: {
          styleOverrides: {
            root: {
                '& .MuiAccordionSummary-content': {
                    marginLeft: theme.spacing(2),
              },
            },
          },
    },
    MuiAccordionDetails: {
        styleOverrides: {
          root:{ 
              padding: theme.spacing(3),
              borderTop: '1px solid rgba(0, 0, 0, .125)',
          },
        },
  },
    MuiTextField: {
        styleOverrides: {
        root: {            
          '& label.Mui-focused': {
            color: 'white',
          },
          '& .MuiInputBase-input': {
            fontSize: '14px',
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius:'8px',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
            fontSize: '14px',
          },
          '& .MuiOutlinedInput-input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px rgba(255, 255, 255, 0.2) inset',
          },
        },
        },
      },
    }, 
  typography: {
    ...theme.typography,
    fontHeader,
    h1: {
      ...theme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...theme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...theme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...theme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...theme.typography.h5,
      fontSize: 20,
      fontWeight: theme.typography.fontWeightLight,
    },
    h6: {
      ...theme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...theme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...theme.typography.body1,
      fontSize: 14,
    },
  },
};

export default albumTheme;
