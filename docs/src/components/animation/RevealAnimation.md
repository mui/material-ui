# Scroll Animation Component Documentation

The Scroll Animation component is a React module that showcases the use of CSS animations to reveal content on scroll. This component utilizes the Material-UI library for styling and theming.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
  - [Animation Classes](#animation-classes)
  - [Scroll Reveal](#scroll-reveal)
- [Customization](#customization)
- [Conclusion](#conclusion)

## Prerequisites

To use the Scroll Animation component, ensure that you have the following dependencies installed:

- React
- Material-UI (`@mui/material`)
- Material-UI Styles (`@mui/styles`)

## Installation

**Install Dependencies:**

Make sure you have the necessary dependencies installed in your project.

```bash
npm install react @mui/material @mui/styles
```

## Usage

The Scroll Animation component provides a visually appealing way to reveal content as users scroll down the page. It applies CSS animations to create a smooth transition effect.

To use the component, simply integrate it within your application, as shown below:

```tsx
import React from 'react';
import ScrollAnimation from './ScrollAnimation';

function App() {
  return (
    <div>
      <ScrollAnimation />
    </div>
  );
}
export default App;
```

## Features

### Scroll Animation

The Scroll Animation component employs a single animation class that handles various animations, including fading and sliding in from different directions. This animation class is defined using the Material-UI makeStyles function:

```tsx
const useStyles = makeStyles((theme) => ({
  reveal: {
    opacity: 0,
    transition: 'opacity 0.5s ease-in',
    transform: 'translateY(20px)',
    animation: '$fadeAnimation 0.7s ease-in',
  },
}));
```

#### Scroll Reveal

The core functionality of the component lies in its ability to detect when elements with the '.reveal' class enter the viewport.
The component applies the active class to these elements dynamically, revealing them smoothly as the user scrolls. This effect is achieved through a scroll event listener:

```tsx
useEffect(() => {
  function reveal() {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;

      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      } else {
        reveal.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', reveal);

  return () => {
    window.removeEventListener('scroll', reveal);
  };
}, []);
```

## Customization

You can further customize the animation behavior by modifying the animation classes and keyframes defined within the useStyles function. Feel free to adjust the animation duration, timing functions, and other properties to match your design requirements.

## Conclusion

The Scroll Animation component provides an elegant way to enhance your website's user experience by gradually revealing content as users scroll through the page. By utilizing CSS animations and the Material-UI framework, the component adds a touch of professionalism to your web application.
