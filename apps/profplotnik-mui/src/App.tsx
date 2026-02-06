import React from 'react';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Team from './components/Team';
import Calculator from './components/Calculator';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Team />
      <Calculator />
      <Reviews />
      <Contact />
      <Footer />
    </Box>
  );
}
