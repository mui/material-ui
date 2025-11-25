<!-- markdownlint-disable-next-line -->
<p align="center">
  <a href="https://mui.com/material-ui/" rel="noopener" target="_blank"><img width="150" height="133" src="https://mui.com/static/logo.svg" alt="Material UI logo"></a>
</p>

<h1 align="center">MUI Carousel</h1>

A native, production-ready Carousel component for Material UI that provides smooth, accessible content rotation with support for touch gestures, keyboard navigation, and auto-play functionality.

## Installation

Install the package in your project directory with:

```bash
npm install @mui/carousel @emotion/react @emotion/styled
```

## Features

- Touch/swipe gesture support for mobile devices
- Keyboard navigation (arrow keys, Home/End, Tab)
- Auto-play with configurable intervals
- Customizable navigation buttons and indicators
- Full accessibility support (ARIA labels, screen reader announcements)
- Responsive design with breakpoint support
- Smooth animations using React Transition Group
- Complete TypeScript definitions
- Seamless integration with Material UI theming

## Documentation

Visit [https://mui.com/material-ui/react-carousel/](https://mui.com/material-ui/react-carousel/) to view the full documentation.

## Basic Usage

```jsx
import { Carousel, CarouselSlide } from '@mui/carousel';

function App() {
  return (
    <Carousel>
      <CarouselSlide>
        <img src="slide1.jpg" alt="Slide 1" />
      </CarouselSlide>
      <CarouselSlide>
        <img src="slide2.jpg" alt="Slide 2" />
      </CarouselSlide>
      <CarouselSlide>
        <img src="slide3.jpg" alt="Slide 3" />
      </CarouselSlide>
    </Carousel>
  );
}
```

## Questions

For how-to questions that don't involve making changes to the code base, please use [Stack Overflow](https://stackoverflow.com/questions/tagged/material-ui) instead of GitHub issues.
Use the "material-ui" tag on Stack Overflow to make it easier for the community to find your question.

## Contributing

Read the [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes.

## Changelog

The [changelog](https://github.com/mui/material-ui/releases) is regularly updated to reflect what's changed in each new release.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).

## Security

For details of supported versions and contact details for reporting security issues, please refer to the [security policy](https://github.com/mui/material-ui/security/policy).
