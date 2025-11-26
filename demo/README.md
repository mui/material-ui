# @mui/carousel Demo

A comprehensive demo application showcasing the Material UI Carousel component with all its features.

## Overview

This demo application demonstrates the full functionality of the `@mui/carousel` package, including:

- Interactive Playground with real-time prop configuration
- Feature Showcase demonstrating each capability
- Accessibility Guide with keyboard navigation
- Multiple example carousels (images, testimonials, auto-play, transitions)

## Live Demo

The demo is deployed at: **https://grays-material-carousel.vercel.app**

## Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

## Getting Started

### Installation

From the repository root:

```bash
# Install all dependencies
pnpm install

# Navigate to demo
cd demo
```

Or from the demo directory:

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

Preview the production build locally:

```bash
pnpm preview
```

## Deployment

### Deploy to Vercel

#### Option 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to the demo directory:
   ```bash
   cd demo
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

#### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import the repository
4. Set the following:
   - **Framework Preset**: Vite
   - **Root Directory**: `demo`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
5. Click "Deploy"

### Environment Configuration

The `vercel.json` file includes:
- SPA routing rewrites for client-side navigation
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Cache headers for static assets

## Project Structure

```
demo/
├── src/
│   ├── components/
│   │   ├── DemoSection.tsx         # Reusable section wrapper
│   │   ├── InteractivePlayground.tsx  # Prop control panel
│   │   ├── FeatureShowcase.tsx     # Feature demonstrations
│   │   ├── AccessibilityGuide.tsx  # Accessibility documentation
│   │   └── PropControl.tsx         # Reusable prop controls
│   ├── data/
│   │   └── sampleData.ts           # Sample images, testimonials, products
│   ├── utils/
│   │   └── codeGenerator.ts        # JSX code snippet generator
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # React entry point
│   └── theme.ts                    # Material UI theme configuration
├── index.html                      # HTML entry point
├── vite.config.ts                  # Vite configuration
├── vercel.json                     # Vercel deployment config
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Project dependencies
```

## Demo Sections

### 1. Interactive Playground
- Real-time prop manipulation
- Live carousel preview
- Generated code snippets
- All props configurable (autoPlay, enableLoop, transition, etc.)

### 2. Feature Showcase
- Touch/Swipe Gestures demo
- Auto-Play with pause-on-hover
- Slide and Fade transitions
- Loop mode demonstration
- Navigation controls showcase

### 3. Accessibility Guide
- Keyboard shortcuts reference
- ARIA attributes documentation
- Screen reader instructions
- Motion preferences handling

### 4. Examples
- **Image Carousel**: Toggle navigation, indicators, loop, auto-play
- **Testimonials**: Card-based design with elegant typography
- **Auto-Play**: Automatic advancement with overlay text
- **Fade Transition**: Smooth crossfade effect

## Features Implemented

### Core Features
- Navigation arrows and dot indicators
- Touch/swipe gesture support
- Mouse drag navigation
- Auto-play with configurable interval
- Pause on hover/focus
- Loop/infinite mode

### Transitions
- Slide transition (default)
- Fade/crossfade transition
- Configurable transition duration

### Accessibility
- Full keyboard navigation (Arrow keys, Home, End, Escape, 1-9)
- ARIA attributes (role, aria-label, aria-live, etc.)
- Screen reader announcements
- Focus management
- Respects prefers-reduced-motion

### Customization
- Theme integration with MUI
- Custom slots for navigation and indicators
- Responsive slidesPerView
- Configurable spacing

## Vite Configuration

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
- **React Transition Group** - Animation transitions

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## License

This demo is part of the Material UI project and follows the same license.
