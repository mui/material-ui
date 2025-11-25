# @mui/carousel Demo

An early demo application showcasing the Material UI Carousel component.

## Overview

This demo application demonstrates the core functionality of the `@mui/carousel` package, including:

- Image carousel with external navigation controls
- Testimonials carousel with card-based design
- Auto-play carousel with looping
- Controlled mode with external state management
- Custom navigation buttons and indicators

## Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

## Getting Started

### Installation

```bash
cd demo
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Build

Build the application for production:

```bash
pnpm build
```

### Preview

Preview the production build:

```bash
pnpm preview
```

## Project Structure

```
demo/
├── src/
│   ├── components/
│   │   └── DemoSection.tsx    # Reusable section wrapper
│   ├── data/
│   │   └── sampleData.ts      # Sample images and testimonials
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # React entry point
│   └── theme.ts               # Material UI theme configuration
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## Features Demonstrated

### Image Carousel
- Displays a collection of images with captions
- External navigation buttons (IconButtons with arrows)
- Slide position indicator
- Custom dot indicators for direct slide navigation

### Testimonials Carousel
- Card-based testimonial display
- External navigation with labeled buttons
- Elegant typography and spacing

### Auto-Play Carousel
- Automatically advances every 3 seconds
- Loop enabled for continuous playback
- Overlay text with image background

## Implementation Notes

### Controlled Mode

This demo uses controlled mode for carousel navigation since PR-004 (which adds built-in navigation buttons) is not yet complete. The carousel's `activeIndex` is managed externally with React state:

```tsx
const [imageIndex, setImageIndex] = useState(0);

<Carousel
  activeIndex={imageIndex}
  onChange={(newIndex) => setImageIndex(newIndex)}
>
  {slides}
</Carousel>
```

### External Navigation

Navigation buttons are implemented outside the Carousel component and update the state directly:

```tsx
const handleNext = () => {
  setImageIndex((prev) => (prev + 1) % slides.length);
};
```

### Vite Configuration

The demo uses a Vite alias to import the carousel component directly from the source:

```ts
resolve: {
  alias: {
    '@mui/carousel': path.resolve(__dirname, '../packages/mui-carousel/src'),
  },
}
```

This allows testing the component during development without publishing to npm.

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material UI** - Component library and design system
- **Emotion** - CSS-in-JS styling

## Known Limitations

- Navigation buttons are not yet built into the Carousel component (pending PR-004)
- Transitions are not yet animated (pending PR-006)
- Touch gestures are not yet implemented (pending PR-005)
- Only horizontal orientation is supported

## Next Steps

Future PRs will add:
- **PR-004**: Built-in navigation buttons and indicators
- **PR-005**: Touch/swipe gesture support
- **PR-006**: Smooth transitions and animations
- **PR-007**: Accessibility enhancements

## License

This demo is part of the Material UI project and follows the same license.
