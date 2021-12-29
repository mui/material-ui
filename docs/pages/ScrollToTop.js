import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';

export default function ScrollToTop() {
  const scrollUpButton = {
    'z-index': '5',
    position: 'fixed',
    right: 20,
    bottom: 10,
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisibility);
    }
  }, []);

  return (
    <React.Fragment>
      {isVisible && (
        <Fab color="primary" onClick={scrollToTop} style={scrollUpButton}>
          <ArrowUpwardOutlinedIcon />
        </Fab>
      )}
    </React.Fragment>
  );
}
