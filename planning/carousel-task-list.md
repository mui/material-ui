# Task List for Material UI Carousel Component

## Project Metadata
**Project:** Material UI Carousel Component Implementation
**Repository:** mui/material-ui fork
**Estimated Total Complexity:** 57 (sum of all PR complexities)
**Estimated Total Time:** 850 minutes (~14 hours)
**Development Approach:** Standard Material UI contribution workflow

## Submission Requirements
**PR Submission:** Must create actual pull request on mui/material-ui upstream repository
**Demo Requirement:** Must have working demo for video presentation and submission

## Block 0: Foundation & Setup (No dependencies)

### PR-001: Create @mui/carousel Package Structure

---
pr_id: PR-001
title: Create @mui/carousel Package Structure
cold_state: complete
priority: critical
complexity:
  score: 3
  estimated_minutes: 45
  suggested_model: haiku
  rationale: Standard package setup following MUI monorepo patterns
dependencies: []
estimated_files:
  - path: packages/mui-carousel/package.json
    action: create
    description: |
      Package configuration with dependencies. Must include:
      - name: "@mui/carousel"
      - scripts using "code-infra build" (MUI's internal build tool)
      - dependencies: @babel/runtime, @mui/system, @mui/types, @mui/utils, clsx, prop-types
      - devDependencies: @mui/internal-test-utils, @mui/material, testing libs
      - peerDependencies: @emotion/react, @emotion/styled, react, react-dom
      - sideEffects: false (for tree-shaking)
      - publishConfig.directory: "build"
      - exports with subpath pattern for component access
  - path: packages/mui-carousel/tsconfig.json
    action: create
    description: |
      TypeScript configuration extending root config:
      - extends: "../../tsconfig.json"
      - include: ["src/**/*", "test/**/*"]
      - compilerOptions.moduleResolution: "Bundler"
  - path: packages/mui-carousel/tsconfig.build.json
    action: create
    description: |
      Build-specific TypeScript config for declaration generation:
      - extends: "./tsconfig.json"
      - composite: true, declaration: true, noEmit: false
      - emitDeclarationOnly: true (Babel handles JS transpilation)
      - outDir: "build/esm", rootDir: "./src"
      - references to dependent package tsconfig.build.json files
  - path: packages/mui-carousel/README.md
    action: create
    description: Package documentation and usage guide following MUI README patterns
  - path: packages/mui-carousel/src/index.ts
    action: create
    description: |
      Main export file - initially empty placeholder with comment.
      Will export components as they are added in subsequent PRs.
  - path: tsconfig.json
    action: modify
    description: |
      Add path aliases for @mui/carousel to root tsconfig.json paths:
      - "@mui/carousel": ["./packages/mui-carousel/src"]
      - "@mui/carousel/package.json": ["./packages/mui-carousel/package.json"]
      - "@mui/carousel/*": ["./packages/mui-carousel/src/*"]
planning_notes: |
  ## Planning Analysis (2024)

  ### MUI Monorepo Build System
  - Uses `code-infra build` command (MUI's internal build tool from @mui/internal-code-infra)
  - Babel handles TypeScript transpilation (configured at root babel.config.mjs)
  - TypeScript only emits .d.ts declaration files during build
  - Lerna with PNPM workspaces and Nx for caching
  - Packages publish from `build/` directory, not `src/`

  ### Key Patterns Discovered
  1. **No rollup.config.js needed** - build is handled by code-infra
  2. **No .gitignore per package** - root .gitignore covers all packages
  3. **tsconfig.build.json is required** - separate from tsconfig.json for declaration generation
  4. **Workspace protocol** - dependencies use `workspace:^` for local monorepo packages
  5. **Test command** - runs from root: `cross-env NODE_ENV=test mocha 'packages/mui-carousel/**/*.test.?(c|m)[jt]s?(x)'`

  ### Files Removed from Original Estimate
  - `.gitignore` - Not needed per-package; root .gitignore handles all

  ### Files Added to Estimate
  - `tsconfig.build.json` - Required for TypeScript declaration generation
  - `tsconfig.json` (root modify) - Must add path aliases for new package

  ### Reference Packages Studied
  - packages/mui-material (157 components, main reference)
  - packages/mui-joy (92+ components)
  - packages/mui-lab (experimental components)
  - packages/mui-utils (utility functions)

  ### Implementation Order
  1. Create package directory structure
  2. Add package.json with correct dependencies and scripts
  3. Add tsconfig.json extending root
  4. Add tsconfig.build.json for declarations
  5. Add README.md with basic documentation
  6. Add src/index.ts as placeholder
  7. Modify root tsconfig.json to add path aliases
  8. Verify build works with `pnpm build` in package directory
---

**Description:**
Set up the new @mui/carousel package following Material UI's monorepo structure. Configure build tools, TypeScript, and establish the foundation for component development.

**Acceptance Criteria:**
- [x] Package structure matches other MUI packages
- [x] Build configuration works with monorepo setup
- [x] TypeScript configuration extends root config correctly
- [x] Package.json includes correct peer dependencies
- [x] Export structure follows MUI patterns
- [x] Root tsconfig.json updated with path aliases
- [ ] Package can be built with `pnpm build`

**Notes:**
This establishes the foundation for all subsequent carousel development. Must follow MUI's exact package structure for consistency.

### PR-002: Implement Core Carousel Types and Interfaces

---
pr_id: PR-002
title: Implement Core Carousel Types and Interfaces
cold_state: complete
priority: high
complexity:
  score: 4
  estimated_minutes: 60
  suggested_model: sonnet
  rationale: Complex TypeScript definitions requiring careful API design
dependencies: [PR-001]
estimated_files:
  - path: packages/mui-carousel/src/Carousel/Carousel.types.ts
    action: create
    description: |
      Main TypeScript types file following MUI patterns (similar to Slider.d.ts):
      - CarouselPropsColorOverrides, CarouselPropsSizeOverrides (empty extension interfaces)
      - CarouselOwnProps interface with all documented props:
        - activeIndex?: number (controlled mode)
        - autoPlay?: boolean (@default false)
        - autoPlayInterval?: number (@default 5000)
        - children: React.ReactNode
        - classes?: Partial<CarouselClasses>
        - defaultActiveIndex?: number (@default 0)
        - disableGestures?: boolean (@default false)
        - disableKeyboard?: boolean (@default false)
        - enableLoop?: boolean (@default false)
        - hideNavigation?: boolean (@default false)
        - hideIndicators?: boolean (@default false)
        - onChange?: (event: React.SyntheticEvent, newIndex: number, reason: SlideChangeReason) => void
        - slidesPerView?: number (@default 1)
        - spacing?: number | string (@default 0)
        - sx?: SxProps<Theme>
        - transition?: CarouselTransition (@default 'slide')
        - transitionDuration?: number (@default theme.transitions.duration.complex)
      - CarouselOwnerState interface (extends props with dragging, direction, etc.)
      - CarouselSlots interface (root, slides, slide, navigation, indicators)
      - CarouselSlotProps interface for slot customization
      - CarouselTypeMap following OverridableComponent pattern
      - CarouselProps generic type
  - path: packages/mui-carousel/src/Carousel/carouselClasses.ts
    action: create
    description: |
      CSS class definitions using MUI utilities (following buttonClasses.ts pattern):
      - CarouselClasses interface with JSDoc for each class:
        - root: Styles applied to the root element
        - slides: Styles applied to the slides container
        - slide: Styles applied to each slide
        - slideActive: Styles applied to the active slide
        - slideNext: Styles applied to the next slide (for transitions)
        - slidePrev: Styles applied to the previous slide (for transitions)
        - navigation: Styles applied to the navigation container
        - navigationButton: Base styles for navigation buttons
        - navigationPrev: Styles for previous button
        - navigationNext: Styles for next button
        - navigationDisabled: Styles when navigation is disabled
        - indicators: Styles for indicators container
        - indicator: Styles for each indicator
        - indicatorActive: Styles for active indicator
        - horizontal: Styles for horizontal orientation
        - autoPlaying: Styles when auto-play is active
      - CarouselClassKey type
      - getCarouselUtilityClass(slot: string) function
      - carouselClasses default export using generateUtilityClasses
  - path: packages/mui-carousel/src/types/index.ts
    action: create
    description: |
      Shared types used across carousel package components:
      - CarouselTransition = 'slide' | 'fade'
      - CarouselOrientation = 'horizontal' (v1 only, no union type)
      - SlideChangeReason = 'auto' | 'navigation' | 'swipe' | 'keyboard' | 'indicator'
      - CarouselDirection = 'forward' | 'backward'
      - CarouselContextValue interface for context provider
      - Re-export types from Carousel.types.ts for convenience
  - path: packages/mui-carousel/src/utils/constants.ts
    action: create
    description: |
      Carousel constants following MUI patterns:
      - CAROUSEL_PREFIX = 'MuiCarousel' (for class name generation)
      - DEFAULT_AUTO_PLAY_INTERVAL = 5000 (ms)
      - DEFAULT_TRANSITION_DURATION = 450 (ms, aligns with theme.transitions.duration.complex)
      - DEFAULT_SLIDES_PER_VIEW = 1
      - MIN_SWIPE_DISTANCE = 50 (px threshold for swipe recognition)
      - SWIPE_VELOCITY_THRESHOLD = 0.3 (px/ms for fling detection)
      - KEYBOARD_KEYS object mapping key codes to actions
planning_notes: |
  ## Planning Analysis (PR-002)

  ### MUI Type Patterns Studied
  - Slider.d.ts: Comprehensive example with slots, slotProps, controlled/uncontrolled, OwnerState
  - Button.d.ts: TypeMap pattern, override interfaces for extensibility
  - buttonClasses.ts: CSS class generation with generateUtilityClasses
  - useBadge.types.ts: Hook types pattern for useCarousel hook (PR-003)

  ### Key Design Decisions
  1. **Controlled/Uncontrolled Pattern**: Use activeIndex + defaultActiveIndex (like Slider's value/defaultValue)
  2. **Transition Types**: 'slide' | 'fade' only; zoom excluded from v1
  3. **Orientation**: 'horizontal' only in v1 (not a union type)
  4. **Override Interfaces**: Empty interfaces for color/size/variant allow theme extension
  5. **SlotProps Pattern**: Follow modern MUI slots/slotProps over deprecated components/componentsProps

  ### Files NOT Added (Considered but Deferred)
  - Carousel/index.ts: Will be created in PR-003 with component
  - Hook types (useCarousel.types.ts): Will be created in PR-003 with hook
  - Navigation/Indicator class files: Separate files in PR-004

  ### Implementation Order
  1. Create utils/constants.ts first (no dependencies)
  2. Create types/index.ts (shared types)
  3. Create carouselClasses.ts (depends on constants for prefix)
  4. Create Carousel.types.ts (depends on classes, types)

  ### Integration Notes
  - Types must align with PRD props: autoPlay, interval, loop, orientation, slidesPerView, spacing, transition, transitionDuration
  - PRD prop 'interval' renamed to 'autoPlayInterval' for clarity
  - PRD prop 'loop' renamed to 'enableLoop' to follow MUI boolean naming (disableX, enableX)
  - Use theme.transitions.duration.complex (450ms) as default transition duration

  ### Testing Considerations
  - Types are tested implicitly via TypeScript compilation
  - Export all types from package for consumer type checking
  - JSDoc @default annotations will appear in IDE tooltips
---

**Description:**
Define all TypeScript interfaces, props types, and class structures for the Carousel component. This establishes the API contract that all implementations will follow.

**Acceptance Criteria:**
- [ ] Props interface extends appropriate MUI base interfaces
- [ ] All props have proper TypeScript definitions
- [ ] CSS classes follow MUI naming conventions
- [ ] Types are properly exported for consumer use
- [ ] JSDoc comments for all public APIs

**Notes:**
Critical for TypeScript consumers. Must carefully design the API to be extensible but not overly complex. Review similar MUI components for patterns.

## Block 1: Core Implementation (Depends on Block 0)

### PR-003: Implement Basic Carousel Component Structure

---
pr_id: PR-003
title: Implement Basic Carousel Component Structure
cold_state: complete
priority: critical
complexity:
  score: 6
  estimated_minutes: 90
  suggested_model: sonnet
  rationale: Core component logic with state management and rendering
dependencies: [PR-002]
estimated_files:
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: create
    description: |
      Main carousel component following MUI patterns:
      - React.forwardRef wrapper with proper displayName
      - useDefaultProps for theme default props integration
      - Styled slot components (CarouselRoot, CarouselSlides, CarouselSlide)
      - useSlotProps for each slot with ownerState
      - useUtilityClasses for CSS class composition
      - Renders children as slides with proper clipping/overflow
      - Integrates useCarousel hook for state management
      - Provides CarouselContext for sub-components
      - No navigation buttons (deferred to PR-004)
      - No animations (deferred to PR-006)
  - path: packages/mui-carousel/src/Carousel/index.ts
    action: create
    description: |
      Carousel directory exports:
      - default export: Carousel component
      - named exports: CarouselRoot, CarouselSlides, CarouselSlide (styled slots)
      - re-export types from Carousel.types.ts
      - re-export carouselClasses
  - path: packages/mui-carousel/src/hooks/useCarousel.ts
    action: create
    description: |
      Core carousel state management hook:
      - Uses useControlled for activeIndex (controlled/uncontrolled pattern)
      - Computes slideCount from children via React.Children.count
      - Implements goToSlide(index, reason) with bounds checking
      - Implements goToNext(reason) and goToPrevious(reason)
      - Handles enableLoop logic for wraparound navigation
      - Tracks direction ('forward' | 'backward') for transitions
      - Returns ownerState object for styled components
      - Returns navigation methods for context/imperative use
      - Calls onChange callback with (event, newIndex, reason)
  - path: packages/mui-carousel/src/hooks/index.ts
    action: create
    description: Hooks directory exports (useCarousel)
  - path: packages/mui-carousel/src/utils/carouselHelpers.ts
    action: create
    description: |
      Utility functions:
      - clampIndex(index, min, max): Clamp index within bounds
      - wrapIndex(index, count): Wrap index for loop mode
      - normalizeSpacing(spacing): Convert spacing prop to CSS value
      - getValidChildren(children): Filter valid React children for slides
      - isInteractiveElement(element): Check if element is button/input/etc
  - path: packages/mui-carousel/src/CarouselContext/CarouselContext.ts
    action: create
    description: |
      React context for sub-component communication:
      - CarouselContext created with React.createContext
      - CarouselProvider component wrapping context provider
      - useCarouselContext hook with error if used outside provider
      - Provides: activeIndex, slideCount, goToSlide, goToNext, goToPrevious,
        enableLoop, direction, isAutoPlaying, pauseAutoPlay, resumeAutoPlay,
        transition, transitionDuration (matching CarouselContextValue interface)
  - path: packages/mui-carousel/src/CarouselContext/index.ts
    action: create
    description: Context exports (CarouselContext, CarouselProvider, useCarouselContext)
  - path: packages/mui-carousel/src/index.ts
    action: modify
    description: |
      Update package main exports:
      - export { default as Carousel } from './Carousel'
      - export * from './Carousel' (types, classes, styled slots)
      - export * from './CarouselContext' (context, provider, hook)
      - export * from './types' (shared types)
planning_notes: |
  ## Planning Analysis (PR-003)

  ### MUI Component Patterns to Follow
  Based on analysis of Slider.js and Tabs.js in mui-material:

  1. **Component Structure**
     - 'use client' directive at top
     - Import order: React, PropTypes, clsx, MUI utils, local imports
     - Styled components defined before main component
     - useUtilityClasses function for class composition
     - React.forwardRef with function name matching component
     - useDefaultProps for theme integration
     - PropTypes at bottom (though we use TypeScript)

  2. **Styled Components Pattern**
     ```typescript
     const CarouselRoot = styled('div', {
       name: 'MuiCarousel',
       slot: 'Root',
       overridesResolver: (props, styles) => [styles.root],
     })(({ theme }) => ({
       position: 'relative',
       overflow: 'hidden',
       width: '100%',
     }));
     ```

  3. **useSlotProps Pattern**
     ```typescript
     const rootProps = useSlotProps({
       elementType: RootSlot,
       externalSlotProps: slotProps?.root,
       externalForwardedProps: other,
       additionalProps: { ref },
       ownerState,
       className: classes.root,
     });
     ```

  4. **Controlled/Uncontrolled with useControlled**
     ```typescript
     const [activeIndex, setActiveIndex] = useControlled({
       controlled: activeIndexProp,
       default: defaultActiveIndex ?? 0,
       name: 'Carousel',
       state: 'activeIndex',
     });
     ```

  ### Implementation Order
  1. carouselHelpers.ts - No dependencies, pure utilities
  2. hooks/index.ts - Simple export file
  3. useCarousel.ts - Depends on helpers and existing types
  4. CarouselContext/CarouselContext.ts - Depends on types
  5. CarouselContext/index.ts - Export file
  6. Carousel/Carousel.tsx - Main component, depends on all above
  7. Carousel/index.ts - Export file
  8. src/index.ts - Update package exports

  ### Key Design Decisions

  1. **No Navigation Buttons in PR-003**
     Navigation methods (goToNext, goToPrevious, goToSlide) are exposed via:
     - CarouselContext for sub-components (PR-004 will use this)
     - Imperative handle via ref (optional, for external control)
     PR-004 will add CarouselNavigation and CarouselIndicators components.

  2. **Slide Container Layout**
     Use flexbox with translateX for slide positioning:
     - CarouselSlides: display flex, width 100%
     - CarouselSlide: flex-shrink 0, width based on slidesPerView
     - Active slide determined by transform: translateX(-activeIndex * 100%)
     This prepares for CSS transition animation in PR-006.

  3. **No Animation in PR-003**
     Slide changes will be instant (no transition).
     PR-006 adds react-transition-group integration.

  4. **Context vs Props**
     Context is provided but optional for basic usage.
     Direct children are wrapped automatically; context enables
     compound component patterns (CarouselNavigation, etc.)

  5. **ownerState Composition**
     ```typescript
     const ownerState = {
       ...props,
       activeIndex,
       slideCount,
       direction,
       dragging: false,  // PR-005 will make this dynamic
       isAutoPlaying: false,  // PR-007 will make this dynamic
     };
     ```

  ### Files NOT Included (Deferred)
  - CarouselNavigation.tsx → PR-004
  - CarouselIndicators.tsx → PR-004
  - useSwipe.ts → PR-005
  - useAutoPlay.ts → PR-007
  - useKeyboard.ts → PR-008
  - Transition components → PR-006

  ### Testing Considerations
  - Unit tests for useCarousel hook (controlled/uncontrolled, navigation)
  - Unit tests for carouselHelpers (pure functions)
  - Component tests for Carousel (render, slot props, class names)
  - Tests deferred to PR-011 but structure should support testing

  ### Integration with Existing Types
  All types from PR-002 are used:
  - CarouselProps, CarouselOwnProps, CarouselOwnerState
  - CarouselSlots, CarouselSlotProps
  - CarouselClasses, carouselClasses, getCarouselUtilityClass
  - CarouselContextValue, CarouselDirection, SlideChangeReason
  - Constants: DEFAULT_TRANSITION_DURATION, DEFAULT_SLIDES_PER_VIEW
---

**Description:**
Implement the core Carousel component with basic slide navigation, state management, and rendering logic. This includes the fundamental structure without animations or advanced features.

**Acceptance Criteria:**
- [ ] Component renders slides correctly
- [ ] Basic next/previous navigation works (via context/methods, no UI buttons)
- [ ] State management handles slide changes
- [ ] Component uses forwardRef pattern
- [ ] Supports controlled and uncontrolled modes
- [ ] Integrates with MUI theme system
- [ ] CarouselContext provides state to sub-components
- [ ] Package exports updated in src/index.ts

**Notes:**
Focus on getting the basic structure right. Animations and advanced features come in later PRs. Must follow MUI component patterns exactly. Navigation buttons deferred to PR-004.

### PR-003A: Create Early Demo Application

---
pr_id: PR-003A
title: Create Early Demo Application
cold_state: complete
priority: critical
complexity:
  score: 3
  estimated_minutes: 45
  suggested_model: haiku
  rationale: Simple standalone demo app for early testing and submission requirements
dependencies: [PR-003]
estimated_files:
  - path: demo/package.json
    action: create
    description: |
      Vite + React + TypeScript project configuration:
      - name: "@mui/carousel-demo"
      - dependencies: react, react-dom, @mui/material, @emotion/react, @emotion/styled
      - devDependencies: vite, @vitejs/plugin-react, typescript, @types/react
      - scripts: dev (vite), build (vite build), preview (vite preview)
      - Use workspace:^ reference to @mui/carousel for local development
  - path: demo/vite.config.ts
    action: create
    description: |
      Vite configuration with React plugin:
      - @vitejs/plugin-react for React support
      - resolve.alias for @mui/carousel pointing to ../packages/mui-carousel/src
      - server.port: 3000
  - path: demo/index.html
    action: create
    description: |
      HTML entry point with:
      - Viewport meta tag for mobile responsiveness
      - Root div for React mounting
      - Script tag pointing to /src/main.tsx
  - path: demo/src/main.tsx
    action: create
    description: |
      React entry point:
      - ReactDOM.createRoot rendering
      - StrictMode wrapper
      - CssBaseline for consistent styling
  - path: demo/src/App.tsx
    action: create
    description: |
      Main demo application featuring:
      - ThemeProvider with custom MUI theme
      - Header with title and description
      - BasicCarouselDemo section with image slides
      - TextCarouselDemo section with testimonials/quotes
      - ControlledCarouselDemo showing controlled mode with external buttons
      - Props display showing current activeIndex
  - path: demo/src/theme.ts
    action: create
    description: |
      MUI theme configuration:
      - Custom palette colors
      - Typography settings
      - Component style overrides for carousel
  - path: demo/src/data/sampleData.ts
    action: create
    description: |
      Sample content arrays:
      - imageSlides: Array of {src, alt, title} for image carousel
      - testimonials: Array of {quote, author, role} for text carousel
      - productCards: Array of {name, price, image} for e-commerce demo
      Use placeholder images from picsum.photos or unsplash source
  - path: demo/src/components/DemoSection.tsx
    action: create
    description: |
      Reusable section wrapper component:
      - Title prop for section heading
      - Description prop for explanation
      - children prop for demo content
      - Styled with consistent spacing
  - path: demo/tsconfig.json
    action: create
    description: TypeScript config extending recommended settings
  - path: demo/README.md
    action: create
    description: |
      Demo documentation:
      - Prerequisites (Node.js, pnpm)
      - Installation steps
      - Running locally (pnpm dev)
      - Building for production
      - Deployment instructions for Vercel/Netlify
planning_notes: |
  ## Planning Analysis (PR-003A)

  ### Technology Choice: Vite over CRA
  Vite is preferred because:
  1. Faster development server startup (native ESM)
  2. Hot Module Replacement is nearly instant
  3. Modern, actively maintained
  4. MUI examples use both, but Vite is trending
  5. Simpler configuration for workspace package linking

  ### Demo Structure Strategy
  The demo should be progressive - start simple and grow:
  1. **Phase 1 (PR-003A):** Basic carousel with navigation via context methods
     - No built-in navigation buttons yet (that's PR-004)
     - Use external buttons calling context methods to demonstrate functionality
  2. **Phase 2 (PR-015A):** Full feature showcase after all features implemented

  ### Workspace Integration
  Since @mui/carousel isn't published, the demo must:
  - Use Vite alias to resolve @mui/carousel to local source
  - Or use pnpm workspace linking
  - Recommend alias approach for simpler setup during development

  ### Sample Content Strategy
  - Use picsum.photos for placeholder images (free, no API key)
  - Include varied content types to show flexibility
  - Keep sample data in separate file for easy modification
  - Professional-looking content for video presentation

  ### Implementation Order
  1. Create demo/package.json with dependencies
  2. Create vite.config.ts with alias for @mui/carousel
  3. Create index.html entry point
  4. Create src/main.tsx React bootstrap
  5. Create src/theme.ts for consistent styling
  6. Create src/data/sampleData.ts with content
  7. Create src/components/DemoSection.tsx wrapper
  8. Create src/App.tsx main demo with multiple examples
  9. Create README.md with instructions
  10. Test with `pnpm dev`

  ### Deployment Preparation
  - **Use Vercel** for deployment (already have paid account)
  - Include vercel.json in PR-015A (not this PR)
  - For now, focus on local development workflow
  - Ensure build output works (`pnpm build && pnpm preview`)

  ### Questions Resolved
  - Q: Vite or CRA? A: Vite for speed and modern tooling
  - Q: Workspace link or alias? A: Vite alias for simplicity
  - Q: How to navigate without PR-004 buttons? A: External buttons using useCarouselContext
  - Q: Which hosting service? A: **Vercel** (paid account available)
---

**Description:**
Create a standalone demo application showcasing the basic carousel functionality. This demo is critical for submission requirements and will be used in the video presentation.

**Acceptance Criteria:**
- [ ] Demo runs independently with pnpm dev
- [ ] Shows carousel with multiple content types (images, text, mixed)
- [ ] Demonstrates basic navigation features (via external buttons using context)
- [ ] Works on both desktop and mobile browsers
- [ ] Can be easily deployed to Vercel/Netlify for live demo
- [ ] Includes sample content that looks professional
- [ ] Vite alias correctly resolves @mui/carousel to local source

**Notes:**
This demo will be enhanced as more features are added (PR-015A). Keep it simple initially but ensure it looks polished for submission. Uses Vite for fast development. Navigation demonstrated via external buttons calling useCarouselContext methods until PR-004 adds built-in controls.

### PR-004: Add Navigation Controls and Indicators

---
pr_id: PR-004
title: Add Navigation Controls and Indicators
cold_state: complete
priority: high
complexity:
  score: 5
  estimated_minutes: 75
  suggested_model: sonnet
  rationale: Multiple UI elements with interaction logic and styling
dependencies: [PR-003]
estimated_files:
  - path: packages/mui-carousel/src/CarouselNavigation/CarouselNavigation.tsx
    action: create
    description: |
      Navigation arrows component following MUI patterns (ref: TablePaginationActions):
      - Styled wrapper div positioned absolute over carousel
      - Previous and Next IconButton components
      - Uses KeyboardArrowLeft/KeyboardArrowRight icons from @mui/icons-material
      - RTL-aware icon swapping (check theme.direction)
      - Disabled state when at boundaries (respects enableLoop)
      - onClick handlers calling context goToPrevious/goToNext
      - Accepts slots/slotProps for customization (prevButton, nextButton, prevIcon, nextIcon)
      - Styled with ownerState for conditional styling
  - path: packages/mui-carousel/src/CarouselNavigation/CarouselNavigation.types.ts
    action: create
    description: |
      TypeScript definitions:
      - CarouselNavigationProps interface
      - CarouselNavigationSlots (prevButton, nextButton)
      - CarouselNavigationSlotProps
      - CarouselNavigationClasses
  - path: packages/mui-carousel/src/CarouselNavigation/carouselNavigationClasses.ts
    action: create
    description: |
      CSS classes using generateUtilityClasses:
      - root, prevButton, nextButton, disabled
  - path: packages/mui-carousel/src/CarouselNavigation/index.ts
    action: create
    description: Export CarouselNavigation and types
  - path: packages/mui-carousel/src/CarouselIndicators/CarouselIndicators.tsx
    action: create
    description: |
      Dot indicators component following MUI MobileStepper pattern:
      - Styled container div (flexbox, centered)
      - Map over slideCount to render indicator buttons
      - Active indicator highlighted via ownerState
      - onClick handlers calling context goToSlide with index
      - ARIA: role="tablist", indicators have role="tab", aria-selected
      - Accepts slots/slotProps for customization
  - path: packages/mui-carousel/src/CarouselIndicators/CarouselIndicators.types.ts
    action: create
    description: |
      TypeScript definitions:
      - CarouselIndicatorsProps interface
      - CarouselIndicatorsSlots (root, indicator)
      - CarouselIndicatorsSlotProps
      - CarouselIndicatorsClasses
  - path: packages/mui-carousel/src/CarouselIndicators/carouselIndicatorClasses.ts
    action: create
    description: |
      CSS classes using generateUtilityClasses:
      - root, indicator, indicatorActive
  - path: packages/mui-carousel/src/CarouselIndicators/index.ts
    action: create
    description: Export CarouselIndicators and types
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: |
      Integrate navigation and indicators:
      - Import CarouselNavigation and CarouselIndicators
      - Render CarouselNavigation when !hideNavigation
      - Render CarouselIndicators when !hideIndicators
      - Pass relevant props (prevIcon, nextIcon, prevButtonProps, nextButtonProps)
      - Add navigation/indicators slots to CarouselSlots
  - path: packages/mui-carousel/src/Carousel/Carousel.types.ts
    action: modify
    description: |
      Update types if needed for navigation integration
  - path: packages/mui-carousel/src/index.ts
    action: modify
    description: |
      Add exports:
      - export * from './CarouselNavigation'
      - export * from './CarouselIndicators'
planning_notes: |
  ## Planning Analysis (PR-004)

  ### MUI Reference Patterns Studied
  1. **TablePaginationActions** (packages/mui-material/src/TablePaginationActions/):
     - Uses slots pattern for button customization
     - RTL-aware icon swapping via theme.direction
     - Disabled state based on page position
     - Separate styled components for each button

  2. **MobileStepper** (packages/mui-material/src/MobileStepper/):
     - Dot variant shows position indicators
     - backButton/nextButton as props (we'll use slots instead)
     - Indicators are simple styled spans, not buttons (we'll make them clickable)

  3. **TabScrollButton** (packages/mui-material/src/TabScrollButton/):
     - Uses ButtonBase for scroll buttons
     - Orientation support (we're horizontal-only for v1)

  ### Component Architecture Decision
  **Separate Components vs Inline:** Create separate CarouselNavigation and CarouselIndicators
  components in their own directories. This provides:
  - Better code organization
  - Independent testing
  - Reusability (users can import just indicators without navigation)
  - Follows MUI pattern of small, focused components

  ### Styling Strategy
  Styled components defined within each component file (not separate styles/ directory).
  This matches MUI's pattern where styled slots are in the component file.

  ### RTL Support
  Navigation icons must swap in RTL:
  ```tsx
  const PrevIcon = theme.direction === 'rtl' ? KeyboardArrowRight : KeyboardArrowLeft;
  const NextIcon = theme.direction === 'rtl' ? KeyboardArrowLeft : KeyboardArrowRight;
  ```

  ### Accessibility Requirements
  - Navigation buttons: aria-label="Previous slide" / "Next slide"
  - Indicators container: role="tablist"
  - Each indicator: role="tab", aria-selected={isActive}, aria-label="Go to slide N"
  - Focus visible for keyboard users

  ### Implementation Order
  1. Create CarouselNavigation directory and files
  2. Create CarouselIndicators directory and files
  3. Update Carousel.tsx to integrate both components
  4. Update src/index.ts exports
  5. Test with demo app

  ### Files Removed from Original Estimate
  - `src/styles/navigation.ts` - Styled components belong in component files per MUI pattern

  ### Files Added to Estimate
  - Type files for each component
  - Class files for each component
  - Index files for each component directory

  ### Icons Dependency
  **@mui/icons-material is a peer dependency** - this package is meant to be merged
  into @mui/material, so icons-material will always be available. No need to bundle
  fallback SVG icons.

  ### Questions Resolved
  - Q: Separate components or inline? A: Separate for modularity
  - Q: Where do styled components go? A: In the component file, not separate styles/
  - Q: Make indicators clickable? A: Yes, for direct navigation
  - Q: Bundle icons or peer dependency? A: **Peer dependency** (@mui/icons-material)
---

**Description:**
Add navigation arrow buttons and dot indicators to the carousel. Implement click handlers, visual feedback, and proper positioning of navigation elements.

**Acceptance Criteria:**
- [ ] Arrow buttons navigate correctly
- [ ] Indicators show current slide position
- [ ] Clicking indicators navigates to specific slides
- [ ] Navigation elements are properly styled
- [ ] Hide/disable controls at boundaries (when not looping)
- [ ] Controls are customizable via slots/slotProps
- [ ] RTL support works correctly
- [ ] ARIA attributes for accessibility
- [ ] Components exported from package index

**Notes:**
Navigation elements should be composable and replaceable. Follow MUI patterns for IconButton usage. Create separate component directories for CarouselNavigation and CarouselIndicators.

### PR-005: Implement Touch and Swipe Gestures

---
pr_id: PR-005
title: Implement Touch and Swipe Gestures
cold_state: complete
priority: high
complexity:
  score: 7
  estimated_minutes: 100
  suggested_model: sonnet
  rationale: Complex touch handling with velocity calculations and conflict resolution
dependencies: [PR-003]
estimated_files:
  - path: packages/mui-carousel/src/hooks/useSwipe.ts
    action: create
    description: |
      Main swipe/drag gesture hook using Pointer Events for unified touch + mouse:
      - Parameters: { onSwipeLeft, onSwipeRight, disabled, threshold, velocityThreshold }
      - Returns: { handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel }, swiping, swipeDistance }
      - Pointer tracking state: startX, startY, startTime, currentX, currentY, pointerId
      - Uses setPointerCapture for reliable drag tracking across element boundaries
      - Calculates swipe distance and velocity
      - Determines direction (left/right) based on deltaX
      - Calls onSwipeLeft/onSwipeRight when threshold exceeded
      - Implements velocity-based fling (fast swipe triggers even if short distance)
      - Returns swiping boolean for visual feedback
      - Returns swipeDistance for drag preview (PR-006 can use for animation)
      - Works with both touch and mouse input
  - path: packages/mui-carousel/src/utils/gestureHelpers.ts
    action: create
    description: |
      Pure utility functions for gesture calculations:
      - calculateDistance(startX, endX): number
      - calculateVelocity(distance, duration): number (px/ms)
      - getSwipeDirection(deltaX, deltaY): 'horizontal' | 'vertical' | 'none'
      - shouldPreventScroll(deltaX, deltaY): boolean (horizontal > vertical)
      - isValidSwipe(distance, velocity, threshold, velocityThreshold): boolean
      - Constants re-exported: MIN_SWIPE_DISTANCE, SWIPE_VELOCITY_THRESHOLD
  - path: packages/mui-carousel/src/hooks/useCarousel.ts
    action: modify
    description: |
      Add swipe integration:
      - Accept disableGestures parameter
      - Update dragging state based on swipe hook
      - Connect swipe callbacks to goToNext/goToPrevious with 'swipe' reason
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: |
      Integrate swipe/drag handling:
      - Use useSwipe hook with goToNext/goToPrevious callbacks
      - Attach pointer handlers to CarouselSlides container
      - Pass disableGestures prop to control swipe/drag
      - Update ownerState.dragging for styling during swipe/drag
      - Add touch-action: pan-y CSS to prevent browser gestures on touch
      - Add cursor: grab / grabbing CSS for mouse drag affordance
      - Handle defaultMuiPrevented pattern for event interception
  - path: packages/mui-carousel/src/hooks/index.ts
    action: modify
    description: Export useSwipe hook
planning_notes: |
  ## Planning Analysis (PR-005)

  ### MUI Touch Handling Patterns Studied
  1. **SwipeableDrawer** (packages/mui-material/src/SwipeableDrawer/):
     - Uses native touch events (touchstart, touchmove, touchend)
     - Calculates velocity for fling detection
     - Has swipeAreaWidth for edge detection (not needed for carousel)
     - Uses setPosition for drag preview
     - Handles iOS Safari edge cases

  2. **Slider** (packages/mui-material/src/Slider/):
     - Uses pointer events (pointerdown, pointermove, pointerup)
     - Touch + mouse unified handling
     - Prevents default to stop scrolling during drag
     - Uses ownerState.dragging for styling

  ### Design Decisions

  **Single Hook vs Multiple Hooks:**
  Combine into single useSwipe hook (not separate useTouch.ts).
  - Simpler API for consumers
  - All touch logic encapsulated
  - Matches MUI's pattern of hooks returning handlers object

  **Pointer Events for Unified Input:**
  Use **Pointer Events** for unified touch + mouse handling:
  - Single event model for both touch and mouse drag
  - `pointerdown`, `pointermove`, `pointerup`, `pointercancel`
  - Use `setPointerCapture` for reliable drag tracking
  - Falls back gracefully on older browsers
  - Matches MUI Slider's approach for drag interactions

  **Velocity Calculation:**
  ```typescript
  const velocity = Math.abs(deltaX) / duration; // px/ms
  const isFlick = velocity > SWIPE_VELOCITY_THRESHOLD;
  const isSwipe = Math.abs(deltaX) > MIN_SWIPE_DISTANCE || isFlick;
  ```

  ### Conflict Resolution Strategy
  Handle nested scrollable content:
  1. On touchstart, record start position
  2. On first touchmove, determine direction (horizontal vs vertical)
  3. If horizontal movement > vertical, prevent default (capture for swipe)
  4. If vertical movement > horizontal, let event propagate (allow scroll)
  5. Use touch-action: pan-y CSS to hint browser

  ### defaultMuiPrevented Pattern
  Allow child components to prevent carousel swipe:
  ```typescript
  const handleTouchStart = (event) => {
    if (event.defaultMuiPrevented) return;
    // ... handle touch
  };
  ```

  ### Implementation Order
  1. Create gestureHelpers.ts with pure calculation functions
  2. Create useSwipe.ts hook
  3. Update hooks/index.ts to export useSwipe
  4. Update useCarousel.ts to integrate swipe
  5. Update Carousel.tsx to use swipe handlers
  6. Test on mobile devices

  ### Files Removed from Original Estimate
  - `hooks/useTouch.ts` - Combined into useSwipe.ts for simpler API

  ### Edge Cases to Handle
  - Multi-touch: Ignore if more than one finger
  - Touch cancel: Clean up state
  - Rapid successive swipes: Debounce or queue
  - Swipe during transition: Queue or ignore (decided in PR-006)
  - Interactive elements: Check isInteractiveElement before capturing

  ### Questions Resolved
  - Q: Separate useTouch hook? A: No, combine into useSwipe
  - Q: Touch or Pointer events? A: **Pointer Events** for unified touch + mouse
  - Q: Include mouse drag in v1? A: **Yes** - pointer events handle both
  - Q: How to handle nested scrollables? A: Direction detection + CSS touch-action
---

**Description:**
Implement Pointer Events handling for swipe/drag gestures following Material UI's patterns. Include velocity-based recognition, thresholds, and conflict resolution with nested scrollable content. Supports both touch and mouse input.

**Acceptance Criteria:**
- [ ] Swipe left/right navigates slides (touch)
- [ ] Mouse drag left/right navigates slides (mouse)
- [ ] Velocity-based fling detection works
- [ ] Threshold prevents accidental navigation
- [ ] Works on all touch devices
- [ ] Works with mouse on desktop
- [ ] Handles multi-touch correctly (ignores)
- [ ] Conflicts with nested scrollables resolved via direction detection
- [ ] Uses MUI's defaultMuiPrevented pattern
- [ ] dragging state updated during swipe/drag for styling
- [ ] touch-action CSS applied for browser hint
- [ ] cursor: grab/grabbing for mouse affordance

**Notes:**
Follow patterns from SwipeableDrawer and Slider components. No external gesture libraries - use native Pointer Events for unified touch + mouse handling. Single useSwipe hook instead of separate useTouch.

## Block 2: Animation & Polish (Depends on Block 1)

### PR-006: Add React Transition Group Animations

---
pr_id: PR-006
title: Add React Transition Group Animations
cold_state: complete
priority: high
complexity:
  score: 5
  estimated_minutes: 75
  suggested_model: sonnet
  rationale: Integration with React Transition Group following MUI patterns
dependencies: [PR-003]
estimated_files:
  - path: packages/mui-carousel/src/transitions/CarouselTransition.tsx
    action: create
    description: |
      Base transition wrapper component:
      - Wraps react-transition-group's Transition component
      - Props: in, timeout, direction, transition ('slide' | 'fade'), children
      - Provides common transition logic shared by slide/fade
      - Handles nodeRef pattern (React 18+ requirement)
      - Respects prefers-reduced-motion (skip animation if reduced motion preferred)
      - Uses theme.transitions for timing functions
  - path: packages/mui-carousel/src/transitions/SlideTransition.tsx
    action: create
    description: |
      Slide transition implementation (ref: packages/mui-material/src/Slide/Slide.js):
      - Uses CSS transform: translateX for horizontal sliding
      - Direction-aware: 'forward' slides left, 'backward' slides right
      - Enter: translateX(100%) -> translateX(0) (for forward)
      - Exit: translateX(0) -> translateX(-100%) (for forward)
      - Uses reflow() to trigger animation
      - Styled with GPU-accelerated transforms (will-change: transform)
      - Handles onEnter, onEntering, onEntered, onExit, onExiting, onExited callbacks
  - path: packages/mui-carousel/src/transitions/FadeTransition.tsx
    action: create
    description: |
      Fade transition implementation (ref: packages/mui-material/src/Fade/Fade.js):
      - Uses CSS opacity for crossfade effect
      - Enter: opacity 0 -> 1
      - Exit: opacity 1 -> 0
      - Simpler than slide, no direction awareness needed
      - Active slide fades in over previous slide
  - path: packages/mui-carousel/src/transitions/transitionUtils.ts
    action: create
    description: |
      Shared transition utilities (ref: packages/mui-material/src/transitions/utils.ts):
      - reflow(node): Force browser reflow for animation start
      - getTransitionProps({ timeout, style, easing }, { mode }): Extract transition props
      - createTransition(property, options): Build CSS transition string
      - shouldReduceMotion(): Check prefers-reduced-motion media query
  - path: packages/mui-carousel/src/transitions/index.ts
    action: create
    description: |
      Export all transition components and utilities:
      - CarouselTransition
      - SlideTransition
      - FadeTransition
      - transitionUtils
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: |
      Integrate transitions:
      - Import transition components
      - Wrap each slide with appropriate transition based on props.transition
      - Pass direction from useCarousel to transitions
      - Add CSS transition to CarouselSlides transform (for slide transition)
      - Or use TransitionGroup for fade transition (one at a time rendering)
      - Handle swipe drag offset in transform calculation
  - path: packages/mui-carousel/src/Carousel/Carousel.types.ts
    action: modify
    description: |
      Add transition-related props if not already present:
      - TransitionComponent?: React.ComponentType (for custom transitions)
      - TransitionProps?: object (pass through to transition)
  - path: packages/mui-carousel/src/index.ts
    action: modify
    description: |
      Add transition exports:
      - export * from './transitions'
planning_notes: |
  ## Planning Analysis (PR-006)

  ### MUI Transition Patterns Studied
  1. **Slide** (packages/mui-material/src/Slide/Slide.js):
     - Uses Transition from react-transition-group
     - Direction-based transforms (up, down, left, right)
     - getTranslateValue() calculates offset
     - Lifecycle: onEnter -> onEntering -> onEntered -> onExit -> onExiting -> onExited
     - Uses reflow() to trigger CSS transitions

  2. **Fade** (packages/mui-material/src/Fade/Fade.js):
     - Simpler opacity-based transition
     - Same lifecycle pattern
     - Uses theme.transitions.create() for CSS

  3. **Collapse** (packages/mui-material/src/Collapse/Collapse.js):
     - More complex, measures content height
     - Has 'auto' timeout option
     - Not directly applicable but shows pattern

  ### Design Decisions

  **Transition Architecture:**
  Two approaches considered:
  1. **CSS-only transitions** on the slides container (simpler)
  2. **React Transition Group** with individual slide wrapping (more control)

  Recommendation: **Hybrid approach**
  - For 'slide' transition: CSS transition on container transform (smoother, simpler)
  - For 'fade' transition: React Transition Group for crossfade (requires overlap)

  **Why Hybrid?**
  - Slide transition naturally works with translateX on container
  - Fade requires both slides visible during crossfade (TransitionGroup handles this)
  - PR-003 already has transform on CarouselSlides - just add CSS transition

  **Slide Transition Implementation:**
  Simply add CSS transition to existing CarouselSlides styled component:
  ```typescript
  const CarouselSlides = styled('div')({
    // existing styles...
    transition: `transform ${transitionDuration}ms ${theme.transitions.easing.easeInOut}`,
  });
  ```
  No wrapper component needed for basic slide!

  **Fade Transition Implementation:**
  Requires TransitionGroup because both slides need to render simultaneously:
  - Exiting slide: opacity 1 -> 0
  - Entering slide: opacity 0 -> 1
  - Position slides absolutely to overlap

  ### prefers-reduced-motion
  ```typescript
  const shouldReduceMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // If reduced motion, set transitionDuration to 0
  const effectiveDuration = shouldReduceMotion() ? 0 : transitionDuration;
  ```

  ### Implementation Order
  1. Create transitions/transitionUtils.ts with helper functions
  2. Create transitions/index.ts structure
  3. Update CarouselSlides in Carousel.tsx to add CSS transition (slide mode)
  4. Create FadeTransition.tsx for fade mode
  5. Update Carousel.tsx to conditionally use fade mode
  6. Update exports

  ### Files Changed from Original Estimate
  - `CarouselSlide.tsx` not needed - slide transition works with existing container
  - Added `CarouselTransition.tsx` as base component
  - Added `transitionUtils.ts` for shared helpers
  - package.json already has react-transition-group (added in PR-001)

  ### Considerations for Swipe Integration (from PR-005)
  When swiping, the transition CSS may interfere with drag feedback.
  Solution: Disable CSS transition during drag:
  ```typescript
  transition: dragging ? 'none' : `transform ${duration}ms ...`,
  ```

  ### Questions Resolved
  - Q: Separate CarouselSlide component? A: No, slide works with container transform
  - Q: RTG for both transitions? A: Only for fade; slide uses CSS on container
  - Q: How to handle swipe during transition? A: Disable transition CSS during drag
  - Q: True crossfade or simple switch? A: **True crossfade** - both slides visible during transition
---

**Description:**
Integrate React Transition Group for smooth slide animations. Implement slide and fade transitions following Material UI's animation patterns and timing functions.

**Acceptance Criteria:**
- [ ] Slide transition works smoothly at 60fps (CSS on container)
- [ ] Fade transition option available (React Transition Group)
- [ ] Animations respect prefers-reduced-motion
- [ ] Transition duration is configurable via prop
- [ ] No animation glitches or flickers
- [ ] Follows MUI's easing functions
- [ ] Transition disabled during swipe drag for smooth feedback
- [ ] Transition utilities exported for advanced usage

**Notes:**
Use hybrid approach: CSS transitions on container for 'slide', React Transition Group for 'fade'. The react-transition-group package is already in dependencies from PR-001.

### PR-007: Implement Auto-Play Functionality

---
pr_id: PR-007
title: Implement Auto-Play Functionality
cold_state: complete
priority: medium
complexity:
  score: 4
  estimated_minutes: 60
  suggested_model: haiku
  rationale: Timer-based logic with pause/resume handling
dependencies: [PR-003]
estimated_files:
  - path: packages/mui-carousel/src/hooks/useAutoPlay.ts
    action: create
    description: |
      Auto-play timer management hook:
      - Parameters: { enabled, interval, onTick, pauseOnHover, pauseOnFocus }
      - Returns: { isPlaying, pause, resume, toggle, handlers }
      - Uses setInterval for regular advancing
      - Tracks paused state separately from enabled prop
      - pause() / resume() methods for programmatic control
      - handlers object: { onMouseEnter, onMouseLeave, onFocus, onBlur }
      - Properly cleans up interval on unmount
      - Respects prefers-reduced-motion (auto-pause if motion reduced)
      - Handles visibility change (pause when tab hidden)
  - path: packages/mui-carousel/src/hooks/useCarousel.ts
    action: modify
    description: |
      Integrate auto-play hook:
      - Import and use useAutoPlay
      - Connect onTick callback to goToNext('auto')
      - Expose pause/resume through return value
      - Handle loop logic: stop at end if !enableLoop
      - Update isAutoPlaying state from hook
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: |
      Integrate auto-play:
      - Attach hover/focus handlers from useAutoPlay to root element
      - Pass pauseOnHover, pauseOnFocus props to hook (default true)
      - Update aria-live based on isAutoPlaying ('off' when playing, 'polite' when paused)
  - path: packages/mui-carousel/src/hooks/index.ts
    action: modify
    description: Export useAutoPlay hook
planning_notes: |
  ## Planning Analysis (PR-007)

  ### Current State (from PR-003)
  The useCarousel hook already has basic auto-play scaffolding:
  - `isAutoPlaying` state
  - `pauseAutoPlay()` and `resumeAutoPlay()` methods
  - Syncs `isAutoPlaying` with `autoPlay` prop

  PR-007 needs to add the actual timer logic and interaction handlers.

  ### Design Decisions

  **Separate Hook vs Integrated:**
  Create separate useAutoPlay hook that useCarousel consumes.
  Benefits:
  - Cleaner separation of concerns
  - Hook can be tested independently
  - Reusable for other auto-advancing scenarios

  **setInterval vs setTimeout:**
  Use setInterval for simplicity. setTimeout would require recursive scheduling.
  The interval is reset when manually navigating to avoid "double advance" feel.

  **Pause Triggers:**
  1. Mouse hover (onMouseEnter/Leave)
  2. Focus within (onFocus/onBlur with capture)
  3. Tab visibility (visibilitychange event)
  4. Manual pause/resume calls
  5. prefers-reduced-motion

  ### Implementation Details

  **useAutoPlay Hook Interface:**
  ```typescript
  interface UseAutoPlayParams {
    enabled: boolean;
    interval: number;
    onTick: () => void;
    pauseOnHover?: boolean;  // default: true
    pauseOnFocus?: boolean;  // default: true
  }

  interface UseAutoPlayReturn {
    isPlaying: boolean;
    pause: () => void;
    resume: () => void;
    toggle: () => void;
    handlers: {
      onMouseEnter: () => void;
      onMouseLeave: () => void;
      onFocus: () => void;
      onBlur: () => void;
    };
  }
  ```

  **Timer Management:**
  ```typescript
  useEffect(() => {
    if (!enabled || isPaused) return;

    const id = setInterval(onTick, interval);
    return () => clearInterval(id);
  }, [enabled, isPaused, interval, onTick]);
  ```

  **Visibility Change Handler:**
  ```typescript
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else if (enabled) {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [enabled]);
  ```

  ### Accessibility Considerations
  - aria-live="off" during auto-play (prevents announcing every slide)
  - aria-live="polite" when paused (announce on navigation)
  - Pause on focus ensures keyboard users can interact
  - prefers-reduced-motion disables auto-play entirely

  ### Implementation Order
  1. Create useAutoPlay.ts hook with timer logic
  2. Update hooks/index.ts exports
  3. Modify useCarousel.ts to use useAutoPlay
  4. Update Carousel.tsx to attach handlers
  5. Test auto-play behavior

  ### Files Removed from Original Estimate
  - `utils/timerHelpers.ts` - Not needed; timer logic is simple enough to inline

  ### Edge Cases to Handle
  - Component unmount during interval: cleanup in useEffect
  - Rapid prop changes: useEffect dependencies handle this
  - Manual navigation during auto-play: reset timer via useEffect dependency
  - Single slide: disable auto-play (nothing to advance to)
  - End of non-looping carousel: stop at last slide

  ### Questions Resolved
  - Q: setInterval or setTimeout? A: setInterval for simplicity
  - Q: Separate timerHelpers file? A: No, not complex enough to warrant
  - Q: Reset timer on manual nav? A: Yes, via interval useEffect dependency change
---

**Description:**
Add auto-play capability with configurable intervals, pause on hover/focus, and proper cleanup. Respect user preferences for reduced motion.

**Acceptance Criteria:**
- [ ] Auto-play advances slides at set intervals
- [ ] Pauses on hover (pauseOnHover prop, default true)
- [ ] Pauses on focus (pauseOnFocus prop, default true)
- [ ] Resumes after mouse leave / blur
- [ ] Stops at last slide if !enableLoop
- [ ] Respects prefers-reduced-motion
- [ ] Properly cleans up timers on unmount
- [ ] Pauses when tab is hidden (visibilitychange)
- [ ] aria-live attribute updates based on playing state
- [ ] useAutoPlay hook exported for advanced usage

**Notes:**
Build on existing auto-play scaffolding in useCarousel. Create dedicated useAutoPlay hook for clean separation. No external timer utilities needed.

### PR-008: Add Keyboard Navigation Support

---
pr_id: PR-008
title: Add Keyboard Navigation Support
cold_state: complete
priority: high
complexity:
  score: 4
  estimated_minutes: 60
  suggested_model: haiku
  rationale: Keyboard event handling with accessibility considerations
dependencies: [PR-003, PR-004]
estimated_files:
  - path: packages/mui-carousel/src/hooks/useKeyboard.ts
    action: create
    description: |
      Keyboard navigation hook following MUI patterns:
      - Parameters: { onNext, onPrevious, onFirst, onLast, onPause, disabled, enableLoop, slideCount }
      - Returns: { handlers: { onKeyDown } }
      - Uses existing KEYBOARD_KEYS constants from utils/constants.ts
      - Handles ArrowLeft/Right for prev/next navigation
      - Handles Home/End for first/last slide
      - Handles Escape to pause auto-play
      - Handles number keys 1-9 for direct slide access
      - RTL-aware: ArrowLeft goes forward in RTL mode (check theme.direction)
      - Uses useEventCallback for stable callback references
      - Respects disabled prop to conditionally enable/disable
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: |
      Integrate keyboard handling:
      - Import and use useKeyboard hook
      - Add tabIndex={0} to CarouselRoot for keyboard focusability
      - Attach onKeyDown handler from useKeyboard to root element
      - Pass disableKeyboard prop to conditionally disable
      - Connect keyboard callbacks to goToNext('keyboard'), goToPrevious('keyboard'), goToSlide(index, 'keyboard')
      - Connect Escape key to pauseAutoPlay
      - Ensure focus ring is visible (use MUI's focusVisible styling)
  - path: packages/mui-carousel/src/utils/keyboardHelpers.ts
    action: create
    description: |
      Keyboard utility functions:
      - getActionForKey(key: string, rtl: boolean): 'next' | 'previous' | 'first' | 'last' | 'pause' | number | null
      - isNavigationKey(key: string): boolean
      - getSlideIndexFromKey(key: string, slideCount: number): number | null (for 1-9 keys)
      - Note: KEYBOARD_KEYS constants already exist in utils/constants.ts
  - path: packages/mui-carousel/src/hooks/index.ts
    action: modify
    description: |
      Export useKeyboard hook:
      - export { default as useKeyboard } from './useKeyboard'
      - export * from './useKeyboard'
planning_notes: |
  ## Planning Analysis (PR-008)

  ### Current State Analysis
  After reviewing the implemented codebase:
  1. **KEYBOARD_KEYS already defined** in utils/constants.ts with ArrowLeft, ArrowRight, Home, End, Escape
  2. **disableKeyboard prop exists** in Carousel.types.ts but is NOT YET USED in Carousel.tsx
  3. **SlideChangeReason type** already includes 'keyboard' value
  4. **Focus management** not yet implemented - carousel root needs tabIndex

  ### MUI Keyboard Patterns Studied
  1. **Tabs** (packages/mui-material/src/Tabs/Tabs.js):
     - Uses onKeyDown on tablist role element
     - Arrow keys move focus between tabs
     - Home/End for first/last tab
     - Handles RTL with conditional direction

  2. **Slider** (packages/mui-material/src/Slider/Slider.js):
     - Keyboard navigation on thumb elements
     - Arrow keys adjust value
     - Home/End for min/max

  3. **Menu** (packages/mui-material/src/Menu/Menu.js):
     - Alphanumeric keys for quick selection
     - Arrow keys for navigation

  ### Implementation Strategy

  1. **Focus Management**
     ```tsx
     // CarouselRoot needs to be focusable
     <CarouselRoot
       tabIndex={disableKeyboard ? -1 : 0}
       onKeyDown={handleKeyDown}
       // MUI focus-visible styling
       sx={{
         '&:focus-visible': {
           outline: (theme) => `2px solid ${theme.palette.primary.main}`,
           outlineOffset: 2,
         },
       }}
     />
     ```

  2. **useKeyboard Hook Interface**
     ```typescript
     interface UseKeyboardParameters {
       onNext: () => void;
       onPrevious: () => void;
       onFirst: () => void;
       onLast: () => void;
       onPause: () => void;
       onGoToSlide: (index: number) => void;
       disabled?: boolean;
       slideCount: number;
       rtl?: boolean;
     }

     interface UseKeyboardReturn {
       handlers: {
         onKeyDown: (event: React.KeyboardEvent) => void;
       };
     }
     ```

  3. **RTL Support**
     - In RTL mode, ArrowLeft should go FORWARD (next), ArrowRight should go BACKWARD (previous)
     - Get RTL from theme.direction via useTheme() or pass as parameter
     - Pattern: `const isRtl = theme.direction === 'rtl'`

  4. **Number Key Navigation (1-9)**
     - Keys '1'-'9' map to slides 0-8 (index = parseInt(key) - 1)
     - Only navigate if index < slideCount
     - Call goToSlide(index, 'keyboard')

  ### Implementation Order
  1. Create utils/keyboardHelpers.ts with utility functions
  2. Create hooks/useKeyboard.ts hook
  3. Update hooks/index.ts to export useKeyboard
  4. Modify Carousel.tsx to integrate keyboard handling
  5. Test all keyboard interactions

  ### Edge Cases to Handle
  - Focus should not be trapped in carousel
  - Tab is NOT captured - let it flow naturally through focusable elements
  - Keyboard navigation works when ANY element in carousel has focus (use event bubbling)
  - Escape only pauses if auto-play is active
  - Number keys beyond slideCount should be ignored
  - Modifier keys (Ctrl+Arrow, etc.) should not trigger navigation
  - Prevent default for handled keys to avoid page scrolling

  ### Focus Scope Strategy
  Attach onKeyDown to CarouselRoot. Since events bubble, this will catch keyboard
  events from anywhere within the carousel (nav buttons, indicators, slide content).
  This matches user expectation: "if I'm focused somewhere in the carousel, arrow keys should work."

  ### Accessibility Considerations
  - visible focus indicator (focus-visible)
  - Announce slide changes via aria-live (already implemented in PR-007)
  - Support roving tabindex for indicators (already in CarouselIndicators)
  - Ensure screen readers can navigate without keyboard shortcuts
---

**Description:**
Implement comprehensive keyboard navigation including arrow keys, Home/End, Tab, and number keys for direct slide access.

**Acceptance Criteria:**
- [ ] Arrow keys navigate next/previous
- [ ] Home/End go to first/last slide
- [ ] Escape stops auto-play
- [ ] Number keys (1-9) for direct access
- [ ] Focus management works correctly
- [ ] Keyboard works when focus is anywhere in carousel (root, buttons, indicators, content)
- [ ] Tab flows naturally (not captured) to nav buttons, indicators, and beyond
- [ ] RTL support (arrow directions swap)
- [ ] Modifier keys don't trigger navigation
- [ ] Focus ring visible when focused via keyboard

**Notes:**
Must work with screen readers. Follow WAI-ARIA carousel patterns. KEYBOARD_KEYS constants already exist in utils/constants.ts. The disableKeyboard prop exists but isn't wired up yet. Tab is NOT captured - let it flow naturally through focusable elements.

## Block 3: Accessibility & Responsive (Depends on Block 2)

### PR-009: Implement ARIA Attributes and Screen Reader Support

---
pr_id: PR-009
title: Implement ARIA Attributes and Screen Reader Support
cold_state: complete
priority: critical
complexity:
  score: 5
  estimated_minutes: 75
  suggested_model: sonnet
  rationale: Comprehensive accessibility implementation requiring careful testing
dependencies: [PR-003, PR-004, PR-008]
estimated_files:
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: |
      Enhance accessibility in main carousel component:
      - Generate unique carousel ID using React 18's useId hook
      - Add id attribute to slides container for aria-controls relationships
      - Add id attribute to each slide (pattern: `${carouselId}-slide-${index}`)
      - Add visually hidden instructions element for screen readers
      - Add aria-describedby linking to instructions element
      - Add comment clarifying aria-hidden behavior (only active slide visible, intentional)
      - Add carouselId and slidesContainerId to context value
  - path: packages/mui-carousel/src/CarouselNavigation/CarouselNavigation.tsx
    action: modify
    description: |
      Add aria-controls to navigation buttons:
      - Get slidesContainerId from context
      - Add aria-controls={slidesContainerId} to prev button
      - Add aria-controls={slidesContainerId} to next button
      - Buttons already have aria-label (verified)
  - path: packages/mui-carousel/src/CarouselIndicators/CarouselIndicators.tsx
    action: modify
    description: |
      Implement roving tabindex and aria-controls:
      - Add aria-controls pointing to corresponding slide ID
      - Implement roving tabindex: active indicator has tabIndex=0, others -1
      - Add keyboard navigation within indicator group (left/right arrows)
      - Wrap behavior based on enableLoop: wrap when true, stop at ends when false
      - Add onKeyDown handler for arrow key navigation between indicators
      - Use refs array to programmatically focus indicators
  - path: packages/mui-carousel/src/types/index.ts
    action: modify
    description: |
      Extend CarouselContextValue interface:
      - Add carouselId: string
      - Add slidesContainerId: string
      - Add getSlideId: (index: number) => string
  - path: packages/mui-carousel/src/utils/a11yHelpers.ts
    action: create
    description: |
      Accessibility utility functions:
      - getSlideId(carouselId: string, index: number): string
      - getSlidesContainerId(carouselId: string): string
      - getIndicatorId(carouselId: string, index: number): string
      - getInstructionsId(carouselId: string): string
      - CAROUSEL_INSTRUCTIONS constant with keyboard usage text
      - VisuallyHidden component (styled span with screen-reader-only CSS)
planning_notes: |
  ## Planning Analysis (PR-009)

  ### Current Accessibility State (Already Implemented)
  After reviewing the codebase, significant accessibility work is ALREADY COMPLETE:

  **Carousel.tsx:**
  - ✓ role="region" on root
  - ✓ aria-roledescription="carousel" on root
  - ✓ aria-label / aria-labelledby support
  - ✓ tabIndex for keyboard focus
  - ✓ focus-visible styling
  - ✓ aria-live="off"/"polite" on slides container (toggles with autoPlay)

  **Slides:**
  - ✓ role="group" on each slide
  - ✓ aria-roledescription="slide"
  - ✓ aria-label="Slide X of Y"
  - ✓ aria-hidden on non-active slides (needs update for multi-slide)

  **CarouselNavigation.tsx:**
  - ✓ aria-label="Go to previous slide" / "Go to next slide"

  **CarouselIndicators.tsx:**
  - ✓ role="tablist" on container
  - ✓ role="tab" on each indicator
  - ✓ aria-selected={isActive}
  - ✓ aria-label="Go to slide X"

  ### What PR-009 Needs to ADD

  1. **ID Relationships (aria-controls):**
     - Generate unique carouselId using React.useId()
     - Each slide needs id={`${carouselId}-slide-${index}`}
     - Slides container needs id={`${carouselId}-slides`}
     - Navigation buttons: aria-controls={slidesContainerId}
     - Indicators: aria-controls={slideId} for corresponding slide

  2. **Roving Tabindex for Indicators:**
     - Active indicator: tabIndex={0}
     - Inactive indicators: tabIndex={-1}
     - Arrow key navigation moves focus within indicator group
     - This follows WAI-ARIA tab/tablist pattern properly

  3. **Screen Reader Instructions:**
     - Visually hidden element with usage instructions
     - Link via aria-describedby on carousel root
     - Text: "Use arrow keys to navigate. Home for first, End for last slide."

  4. **Multi-slide Visibility:**
     - When slidesPerView > 1, multiple slides are visible
     - Visible slides should have aria-hidden="false"
     - Calculate: slides from activeIndex to activeIndex + slidesPerView - 1

  5. **Context Enhancement:**
     - Add to CarouselContextValue: carouselId, slidesContainerId, getSlideId()
     - Navigation and Indicators access these via useCarouselContext()

  ### Implementation Strategy

  **ID Generation (in Carousel.tsx):**
  ```typescript
  const generatedId = React.useId();
  const carouselId = props.id || `carousel-${generatedId}`;
  const slidesContainerId = `${carouselId}-slides`;
  const instructionsId = `${carouselId}-instructions`;
  const getSlideId = (index: number) => `${carouselId}-slide-${index}`;
  ```

  **Roving Tabindex (in CarouselIndicators.tsx):**
  ```typescript
  // Get enableLoop from context to determine wrap behavior
  const { enableLoop } = useCarouselContext();

  const handleIndicatorKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (enableLoop) {
        const nextIndex = (index + 1) % slideCount;
        // Focus next indicator (wrap around)
      } else if (index < slideCount - 1) {
        // Focus next indicator (stop at end)
      }
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (enableLoop) {
        const prevIndex = (index - 1 + slideCount) % slideCount;
        // Focus prev indicator (wrap around)
      } else if (index > 0) {
        // Focus prev indicator (stop at start)
      }
    }
  };

  <Indicator
    tabIndex={isActive ? 0 : -1}
    onKeyDown={(e) => handleIndicatorKeyDown(e, index)}
    ...
  />
  ```

  **aria-hidden on Slides (in Carousel.tsx):**
  ```typescript
  // NOTE: Only the active slide has aria-hidden="false", even when slidesPerView > 1.
  // This is intentional - screen readers should focus on the semantically "active" slide,
  // not all visible slides. Users can still Tab into content on adjacent visible slides.
  const isActive = index === activeIndex;

  // In renderSlides():
  aria-hidden={!isActive}
  ```

  ### Files NOT Modified
  - CarouselContext.tsx: No changes to provider structure, just pass new values
  - useCarousel.ts: No changes needed, ID logic is in Carousel.tsx
  - carouselClasses.ts: No accessibility-related classes needed

  ### Testing Strategy
  - Test with VoiceOver (macOS) - primary screen reader for Safari
  - Test with NVDA (Windows) - most common screen reader
  - Verify focus management with Tab and arrow keys
  - Use aXe DevTools browser extension for automated checks
  - Verify aria-controls relationships are valid (IDs exist)

  ### Questions Resolved During Planning
  - Q: Should indicators navigate on focus change? A: No, focus moves independently of slide. User must click/press Enter to navigate.
  - Q: Should indicator keyboard navigation wrap? A: Key this based on enableLoop setting. If loop enabled, wrap; if not, stop at ends.
  - Q: Use aria-current or aria-selected for active indicator? A: aria-selected (already using, correct for tab pattern)
  - Q: Dedicated live region vs current approach? A: Current aria-live on slides is sufficient for v1
  - Q: Include instructions for all languages? A: English only for v1; i18n is future work
  - Q: Multi-slide aria-hidden behavior? A: Only the active slide has aria-hidden="false", even when slidesPerView > 1. Add comment explaining this is intentional.
---

**Description:**
Enhance accessibility with comprehensive ARIA attributes and screen reader support following WAI-ARIA authoring practices for carousels. Much of the foundation is already in place; this PR adds ID relationships (aria-controls), roving tabindex for indicators, screen reader instructions, and multi-slide visibility handling.

**Acceptance Criteria:**
- [x] role="region" with proper labels (already complete)
- [x] aria-live regions for announcements (already complete)
- [x] Navigation controls have descriptive aria-labels (already complete)
- [x] aria-hidden on slides (already complete - only active slide visible to screen readers)
- [x] aria-controls relationships between controls and slides
- [x] Roving tabindex on indicators (only active in tab order)
- [x] Keyboard navigation within indicator group (arrow keys, respects enableLoop)
- [x] Visually hidden instructions for screen readers
- [x] aria-describedby linking carousel to instructions
- [x] Unique IDs on carousel, slides container, and each slide
- [ ] Passes accessibility audit tools (aXe, Lighthouse)

**Notes:**
Test with NVDA, JAWS, and VoiceOver. Reference WAI-ARIA carousel pattern. Much of the basic accessibility is already implemented - this PR focuses on proper ID relationships, roving tabindex, and screen reader instructions. The tablist/tab pattern for indicators requires roving tabindex to be fully compliant.

### PR-010: Add Responsive Behavior and Breakpoints

---
pr_id: PR-010
title: Add Responsive Behavior and Breakpoints
cold_state: complete
priority: medium
complexity:
  score: 4
  estimated_minutes: 60
  suggested_model: haiku
  rationale: Responsive design with MUI breakpoint system integration
dependencies: [PR-003]
estimated_files:
  - path: packages/mui-carousel/src/hooks/useResponsive.ts
    action: create
    description: |
      Responsive behavior hook using MUI's useMediaQuery:
      - Parameters: { slidesPerView: ResponsiveSlidesPerView, theme: Theme }
      - Returns: { effectiveSlidesPerView: number }
      - Uses useMediaQuery to detect current breakpoint
      - Supports breakpoint object: { xs?: number, sm?: number, md?: number, lg?: number, xl?: number }
      - Falls back through breakpoints (md falls back to sm if md not specified)
      - Handles SSR gracefully (returns xs value or default during SSR)
      - Memoizes breakpoint queries to avoid re-renders
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: |
      Integrate responsive behavior:
      - Import and use useResponsive hook
      - Pass slidesPerView prop to useResponsive
      - Use effectiveSlidesPerView in useCarousel and styled components
      - Ensure smooth recalculation on window resize
      - No layout shift during breakpoint transitions
  - path: packages/mui-carousel/src/Carousel/Carousel.types.ts
    action: modify
    description: |
      Add responsive type definitions:
      - ResponsiveValue<T> generic type for breakpoint objects
      - Update slidesPerView prop type to: number | ResponsiveValue<number>
      - Export ResponsiveValue for consumer use
  - path: packages/mui-carousel/src/utils/responsiveHelpers.ts
    action: create
    description: |
      Responsive utility functions:
      - isResponsiveValue<T>(value): boolean type guard
      - getBreakpointValue<T>(value: T | ResponsiveValue<T>, breakpoint: Breakpoint, theme: Theme): T
      - normalizeResponsiveValue<T>(value: T | ResponsiveValue<T>): ResponsiveValue<T>
      - getActiveBreakpoint(theme: Theme): Breakpoint (using window.innerWidth)
  - path: packages/mui-carousel/src/hooks/index.ts
    action: modify
    description: |
      Export useResponsive hook:
      - export { default as useResponsive } from './useResponsive'
      - export * from './useResponsive'
  - path: packages/mui-carousel/src/types/index.ts
    action: modify
    description: |
      Add shared responsive types:
      - ResponsiveValue<T> = T | { xs?: T; sm?: T; md?: T; lg?: T; xl?: T }
      - Export for use in consumer code
planning_notes: |
  ## Planning Analysis (PR-010)

  ### Current State Analysis
  After reviewing the implemented codebase:
  1. **slidesPerView prop** is currently `number` type in Carousel.types.ts
  2. **MUI theme** is available via useThemeProps in Carousel.tsx
  3. **Spacing calculation** in carouselHelpers.ts already handles slidesPerView
  4. **Styled components** use slidesPerView via ownerState

  ### MUI Responsive Patterns Studied
  1. **Grid** (packages/mui-material/src/Grid/Grid.js):
     - Uses breakpoint props: xs, sm, md, lg, xl
     - Each prop can be number or 'auto'
     - Resolves via theme.breakpoints

  2. **useMediaQuery** (packages/mui-material/src/useMediaQuery/useMediaQuery.js):
     - SSR-safe media query hook
     - Returns boolean for query match
     - Options: { noSsr, ssrMatchMedia, matchMedia }

  3. **Stack** (packages/mui-material/src/Stack/Stack.js):
     - Uses responsive props for direction and spacing
     - resolveBreakpointValues utility function

  ### Implementation Strategy

  1. **ResponsiveValue Type**
     ```typescript
     export type ResponsiveValue<T> = T | {
       xs?: T;
       sm?: T;
       md?: T;
       lg?: T;
       xl?: T;
     };
     ```

  2. **useResponsive Hook**
     ```typescript
     function useResponsive<T>(
       value: ResponsiveValue<T>,
       defaultValue: T,
     ): T {
       const theme = useTheme();
       // Use multiple useMediaQuery calls for each breakpoint
       const isXs = useMediaQuery(theme.breakpoints.only('xs'));
       const isSm = useMediaQuery(theme.breakpoints.only('sm'));
       // ... etc

       // Return appropriate value based on matched breakpoint
       // Fall back through breakpoints if not specified
     }
     ```

  3. **Breakpoint Fallback Logic**
     If slidesPerView = { xs: 1, md: 3 }:
     - xs: 1 (specified)
     - sm: 1 (fallback to xs)
     - md: 3 (specified)
     - lg: 3 (fallback to md)
     - xl: 3 (fallback to md)

  4. **SSR Handling**
     During SSR, useMediaQuery returns false by default.
     Strategy: Default to xs breakpoint value during SSR.
     ```typescript
     // In useResponsive:
     const isClient = typeof window !== 'undefined';
     if (!isClient) {
       return getBreakpointValue(value, 'xs', theme) ?? defaultValue;
     }
     ```

  ### Implementation Order
  1. Add ResponsiveValue type to types/index.ts
  2. Create utils/responsiveHelpers.ts with utility functions
  3. Create hooks/useResponsive.ts hook
  4. Update hooks/index.ts to export useResponsive
  5. Update Carousel.types.ts slidesPerView type
  6. Modify Carousel.tsx to use useResponsive for slidesPerView
  7. Update demo to showcase responsive behavior

  ### Performance Considerations
  - useMediaQuery creates event listeners; minimize calls
  - Consider using a single breakpoint detection hook
  - Memoize computed values to prevent unnecessary re-renders
  - Use CSS where possible (e.g., responsive widths) vs JS breakpoints

  ### Alternative Approach: CSS-based
  Could use CSS Grid/Flexbox with responsive widths instead of JS:
  ```css
  .slide {
    width: 100%; /* xs: 1 slide */
  }
  @media (min-width: 600px) {
    .slide { width: 50%; } /* sm: 2 slides */
  }
  @media (min-width: 900px) {
    .slide { width: 33.33%; } /* md: 3 slides */
  }
  ```
  This is more performant but less flexible. Use JS approach for v1.

  ### Demo Enhancement
  Add a responsive demo section showing:
  - 1 slide on mobile (xs)
  - 2 slides on tablet (sm/md)
  - 3+ slides on desktop (lg/xl)

  ### Scope Decision: Only slidesPerView is Responsive
  For v1, only `slidesPerView` supports ResponsiveValue. Other props like `spacing`
  remain simple types. Rationale:
  - `slidesPerView` is the primary responsive use case (1 on mobile → 3 on desktop)
  - Users can use `sx` prop with breakpoint values for responsive spacing if needed
  - Adding ResponsiveValue to multiple props increases type complexity significantly
  - Better to ship focused v1 and add more responsive props in v2 if there's demand
---

**Description:**
Implement responsive behavior using Material UI's breakpoint system, including adaptive slide counts and touch/mouse detection.

**Acceptance Criteria:**
- [ ] Adapts to container width changes
- [ ] Breakpoint-based configuration works
- [ ] slidesPerView accepts responsive object { xs, sm, md, lg, xl }
- [ ] Falls back through breakpoints correctly
- [ ] Performance optimized for mobile
- [ ] useMediaQuery integration works
- [ ] SSR-safe (doesn't cause hydration mismatch)
- [ ] No layout shift during breakpoint transitions
- [ ] Demo updated to showcase responsive slidesPerView

**Notes:**
Use MUI's useMediaQuery and theme breakpoints. Handle SSR properly. The ResponsiveValue<T> type pattern follows MUI's Grid component approach.

## Block 4: Testing & Documentation (Depends on Block 3)

### PR-011: Implement Comprehensive Unit Tests

---
pr_id: PR-011
title: Implement Comprehensive Unit Tests
cold_state: new
priority: critical
complexity:
  score: 6
  estimated_minutes: 90
  suggested_model: sonnet
  rationale: Extensive test coverage for all component features
dependencies: [PR-003, PR-004, PR-005, PR-006, PR-007, PR-008, PR-009]
estimated_files:
  - path: packages/mui-carousel/src/Carousel/Carousel.test.tsx
    action: create
    description: main component test suite
  - path: packages/mui-carousel/src/hooks/useSwipe.test.ts
    action: create
    description: swipe hook tests
  - path: packages/mui-carousel/src/hooks/useAutoPlay.test.ts
    action: create
    description: auto-play hook tests
  - path: packages/mui-carousel/src/hooks/useKeyboard.test.ts
    action: create
    description: keyboard hook tests
  - path: packages/mui-carousel/src/test-utils/index.ts
    action: create
    description: test utilities and helpers
---

**Description:**
Write comprehensive unit tests using React Testing Library and Jest, achieving >95% code coverage and testing all user interactions.

**Acceptance Criteria:**
- [ ] >95% code coverage achieved
- [ ] All props tested
- [ ] All user interactions tested
- [ ] Edge cases covered
- [ ] Accessibility tests included
- [ ] Tests run quickly (<10 seconds)
- [ ] Follows MUI testing patterns

**Notes:**
Focus on user behavior testing rather than implementation details. Mock animations for test performance.

### PR-012: Add Integration and Visual Tests

---
pr_id: PR-012
title: Add Integration and Visual Tests
cold_state: new
priority: medium
complexity:
  score: 4
  estimated_minutes: 60
  suggested_model: haiku
  rationale: Integration testing with other MUI components and visual regression
dependencies: [PR-011]
estimated_files:
  - path: packages/mui-carousel/src/Carousel/Carousel.integration.test.tsx
    action: create
    description: integration test suite
  - path: packages/mui-carousel/src/Carousel/Carousel.visual.test.tsx
    action: create
    description: visual regression tests
  - path: test/regressions/tests/Carousel/SimpleCarousel.js
    action: create
    description: visual regression fixtures
---

**Description:**
Create integration tests verifying carousel works with other MUI components and visual regression tests for styling consistency.

**Acceptance Criteria:**
- [ ] Tests carousel in various MUI containers
- [ ] Tests with different themes
- [ ] Visual regression tests pass
- [ ] Tests SSR/hydration scenarios
- [ ] Performance benchmarks included
- [ ] Memory leak tests pass

**Notes:**
Use MUI's existing visual regression test infrastructure. Test theme customization thoroughly.

### PR-013: Create Documentation and Examples

---
pr_id: PR-013
title: Create Documentation and Examples
cold_state: new
priority: high
complexity:
  score: 5
  estimated_minutes: 75
  suggested_model: sonnet
  rationale: Comprehensive documentation with interactive examples
dependencies: [PR-003, PR-004, PR-005, PR-006, PR-007, PR-008, PR-009, PR-010]
estimated_files:
  - path: docs/data/material/components/carousel/carousel.md
    action: create
    description: main documentation page
  - path: docs/data/material/components/carousel/BasicCarousel.js
    action: create
    description: basic usage example
  - path: docs/data/material/components/carousel/ResponsiveCarousel.js
    action: create
    description: responsive carousel example
  - path: docs/data/material/components/carousel/CustomizedCarousel.js
    action: create
    description: customization example
  - path: docs/data/material/components/carousel/AccessibleCarousel.js
    action: create
    description: accessibility example
---

**Description:**
Create comprehensive documentation with live examples, API reference, and best practices following Material UI's documentation standards.

**Acceptance Criteria:**
- [ ] API documentation complete
- [ ] Multiple interactive examples
- [ ] Customization guide included
- [ ] Accessibility guide included
- [ ] Migration guide from popular libraries
- [ ] TypeScript examples included
- [ ] Follows MUI docs structure

**Notes:**
Examples should be runnable in documentation. Cover common use cases and edge cases.

### PR-014: Add Storybook Stories

---
pr_id: PR-014
title: Add Storybook Stories
cold_state: new
priority: medium
complexity:
  score: 3
  estimated_minutes: 45
  suggested_model: haiku
  rationale: Storybook configuration for component development and testing
dependencies: [PR-003, PR-013]
estimated_files:
  - path: packages/mui-carousel/src/Carousel/Carousel.stories.tsx
    action: create
    description: comprehensive Storybook stories
  - path: .storybook/stories/Carousel.stories.tsx
    action: create
    description: root Storybook integration
---

**Description:**
Create Storybook stories showcasing all carousel variants, props, and use cases for development and testing purposes.

**Acceptance Criteria:**
- [ ] Stories for all prop combinations
- [ ] Stories for edge cases
- [ ] Interactive controls configured
- [ ] Accessibility addon configured
- [ ] Performance monitoring included
- [ ] Mobile viewport stories

**Notes:**
Use Storybook's controls addon for interactive prop exploration.

## Block 5: Performance & Polish (Depends on Block 4)

### PR-015: Optimize Performance and Bundle Size

---
pr_id: PR-015
title: Optimize Performance and Bundle Size
cold_state: new
priority: high
complexity:
  score: 5
  estimated_minutes: 75
  suggested_model: sonnet
  rationale: Performance optimization requiring profiling and careful refactoring
dependencies: [PR-003, PR-011]
estimated_files:
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: performance optimizations
  - path: packages/mui-carousel/src/hooks/useCarousel.ts
    action: modify
    description: memoization improvements
  - path: packages/mui-carousel/rollup.config.js
    action: create
    description: build optimization configuration
  - path: packages/mui-carousel/src/utils/performance.ts
    action: create
    description: performance utilities
---

**Description:**
Optimize carousel performance through memoization, virtualization for large slide counts, and bundle size reduction to meet <30KB gzipped target.

**Acceptance Criteria:**
- [ ] Bundle size <30KB gzipped
- [ ] 60fps animations consistently
- [ ] <100ms touch response time
- [ ] Memory usage optimized
- [ ] Virtual scrolling for 100+ slides
- [ ] Lazy loading implemented
- [ ] No unnecessary re-renders

**Notes:**
Profile with React DevTools and Chrome Performance tab. Consider code splitting strategies.

## Final Block: Submission Preparation

### PR-015A: Complete Demo Application with All Features

---
pr_id: PR-015A
title: Complete Demo Application with All Features
cold_state: new
priority: high
complexity:
  score: 3
  estimated_minutes: 45
  suggested_model: haiku
  rationale: Final demo showcasing all carousel features for video presentation
dependencies: [PR-003A, PR-004, PR-005, PR-006, PR-007, PR-008, PR-009, PR-010]
estimated_files:
  - path: demo/src/App.tsx
    action: modify
    description: update demo with all features
  - path: demo/src/components/FeatureShowcase.tsx
    action: create
    description: component showcasing individual features
  - path: demo/src/components/InteractivePlayground.tsx
    action: create
    description: interactive controls for testing props
  - path: demo/src/data/sampleData.ts
    action: modify
    description: enhanced sample content
  - path: demo/vercel.json
    action: create
    description: deployment configuration
  - path: demo/netlify.toml
    action: create
    description: alternative deployment configuration
---

**Description:**
Enhance the demo application to showcase all implemented carousel features including touch gestures, auto-play, keyboard navigation, accessibility, and responsive behavior. This will be the primary demonstration for the video submission.

**Acceptance Criteria:**
- [ ] Demo showcases all carousel features
- [ ] Interactive controls to toggle features
- [ ] Multiple carousel examples with different configurations
- [ ] Mobile-responsive demonstration
- [ ] Accessibility features clearly demonstrated
- [ ] Performance metrics displayed
- [ ] Deployed to public URL for easy access

**Notes:**
This is the demo that will be shown in the video presentation. Make it impressive and comprehensive. Include clear labels and instructions for each feature demonstration.

### PR-016: Create and Submit Upstream Pull Request

---
pr_id: PR-016
title: Create and Submit Upstream Pull Request
cold_state: new
priority: critical
complexity:
  score: 3
  estimated_minutes: 45
  suggested_model: haiku
  rationale: Final preparation and submission to Material UI upstream repository
dependencies: [PR-001, PR-002, PR-003, PR-003A, PR-004, PR-005, PR-006, PR-007, PR-008, PR-009, PR-010, PR-011, PR-012, PR-013, PR-014, PR-015, PR-015A]
estimated_files:
  - path: CHANGELOG.md
    action: modify
    description: add carousel component entry
  - path: packages/mui-carousel/README.md
    action: modify
    description: finalize package documentation
  - path: .github/PULL_REQUEST_TEMPLATE.md
    action: use
    description: follow PR template
  - path: packages/mui-carousel/package.json
    action: modify
    description: finalize version and dependencies
---

**Description:**
Prepare and submit the final pull request to the Material UI upstream repository following their contribution guidelines. This includes creating the actual PR on GitHub, filling out their template completely, and ensuring all quality checks pass.

**Acceptance Criteria:**
- [ ] All CI checks pass (linting, tests, build)
- [ ] PR follows MUI template exactly
- [ ] Changeset entry created
- [ ] Documentation reviewed and complete
- [ ] Bundle size within limits (<30KB gzipped)
- [ ] No console errors or warnings
- [ ] **PR submitted to mui/material-ui repository**
- [ ] **PR link documented for submission**
- [ ] **Demo link included in PR description**
- [ ] Ready for maintainer review

**Notes:**
This is the actual submission to the upstream repository. Ensure the PR description clearly explains the value of the carousel component, references any existing issues, and includes links to the live demo. Be prepared to respond to maintainer feedback.

## Summary

**Total PRs:** 18 (including 2 demo-specific PRs)
**Critical Path:** PR-001 → PR-002 → PR-003 → PR-003A → PR-011 → PR-015A → PR-016
**Parallel Opportunities:**
- Block 1 features (PR-004, PR-005) can be developed in parallel after PR-003
- Block 2 features (PR-006, PR-007, PR-008) can be developed in parallel
- Documentation (PR-013, PR-014) can start early and evolve
- Demo updates (PR-003A, PR-015A) can be done incrementally

**Demo Milestones:**
- **Early Demo (PR-003A):** Basic carousel functionality for initial testing
- **Complete Demo (PR-015A):** Full feature showcase for video presentation
- **Live Demo URL:** Required for PR submission and video

**Risk Factors:**
- Touch gesture implementation complexity (PR-005)
- Performance optimization targets (PR-015)
- Accessibility compliance (PR-009)
- Bundle size constraints (PR-015)
- Upstream PR acceptance timeline

**Success Metrics:**
- **PR submitted to upstream mui/material-ui repository**
- **Working demo deployed and accessible**
- Component accepted by MUI maintainers
- >95% test coverage achieved
- <30KB bundle size gzipped
- 100% accessibility audit pass
- Positive community feedback