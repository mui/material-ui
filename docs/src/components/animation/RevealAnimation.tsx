import * as React from 'react';
import { Container, Typography, ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import './App.css';

const theme = createTheme();

const useStyles = makeStyles(() => ({
  reveal: {
    opacity: 0,
    transition: 'opacity 0.5s ease-in',
  },
  active: {
    opacity: 1,
  },
  fadeBottom: {
    transform: 'translateY(20px)',
    animation: '$fadeBottomAnimation 0.7s ease-in',
  },
  fadeLeft: {
    transform: 'translateX(-20px)',
    animation: '$fadeLeftAnimation 0.7s ease-in',
  },
  fadeRight: {
    transform: 'translateX(20px)',
    animation: '$fadeRightAnimation 0.7s ease-in',
  },
  
  '@keyframes fadeBottomAnimation': {
    '0%': {
      transform: 'translateY(0px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
  '@keyframes fadeLeftAnimation': {
    '0%': {
      transform: 'translateX(-100px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  '@keyframes fadeRightAnimation': {
    '0%': {
      transform: 'translateX(100px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
}));

function RevealAnimation(): JSX.Element {
  const classes = useStyles();

  React.useEffect(() => {   
    function reveal() {
      const reveals = document.querySelectorAll<HTMLElement>('.reveal');

      for (let i = 0; i < reveals.length; i+=1) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        } else {
          reveals[i].classList.remove('active');
        }
      }
    }
    window.addEventListener('scroll', reveal);

    return () => {
      window.removeEventListener('scroll', reveal);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <div className={`${classes.reveal} ${classes.fadeBottom}`}>
          <Typography variant="h6">Reveal Animation - Fade Bottom</Typography>
        </div>
        <div className={`${classes.reveal} ${classes.fadeLeft}`}>
          <Typography variant="h6">Reveal Animation - Fade Left</Typography>
        </div>
        <div className={`${classes.reveal} ${classes.fadeRight}`}>
          <Typography variant="h6">Reveal Animation - Fade Right</Typography>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default RevealAnimation; 