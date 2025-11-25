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
cold_state: new
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
    description: demo app dependencies and scripts
  - path: demo/src/App.tsx
    action: create
    description: main demo application with carousel
  - path: demo/src/index.tsx
    action: create
    description: demo app entry point
  - path: demo/src/data/sampleData.ts
    action: create
    description: sample content for carousel slides
  - path: demo/public/index.html
    action: create
    description: demo app HTML template
  - path: demo/README.md
    action: create
    description: instructions for running the demo
---

**Description:**
Create a standalone demo application showcasing the basic carousel functionality. This demo is critical for submission requirements and will be used in the video presentation.

**Acceptance Criteria:**
- [ ] Demo runs independently with npm start
- [ ] Shows carousel with multiple content types (images, text, mixed)
- [ ] Demonstrates basic navigation features
- [ ] Works on both desktop and mobile browsers
- [ ] Can be easily deployed to Vercel/Netlify for live demo
- [ ] Includes sample content that looks professional

**Notes:**
This demo will be enhanced as more features are added. Keep it simple initially but ensure it looks polished for submission. Use Create React App or Vite for quick setup.

### PR-004: Add Navigation Controls and Indicators

---
pr_id: PR-004
title: Add Navigation Controls and Indicators
cold_state: new
priority: high
complexity:
  score: 5
  estimated_minutes: 75
  suggested_model: sonnet
  rationale: Multiple UI elements with interaction logic and styling
dependencies: [PR-003]
estimated_files:
  - path: packages/mui-carousel/src/Carousel/CarouselNavigation.tsx
    action: create
    description: arrow navigation buttons component
  - path: packages/mui-carousel/src/Carousel/CarouselIndicators.tsx
    action: create
    description: dot indicators component
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: integrate navigation components
  - path: packages/mui-carousel/src/styles/navigation.ts
    action: create
    description: styled components for navigation elements
---

**Description:**
Add navigation arrow buttons and dot indicators to the carousel. Implement click handlers, visual feedback, and proper positioning of navigation elements.

**Acceptance Criteria:**
- [ ] Arrow buttons navigate correctly
- [ ] Indicators show current slide position
- [ ] Clicking indicators navigates to specific slides
- [ ] Navigation elements are properly styled
- [ ] Hide/disable controls at boundaries (when not looping)
- [ ] Controls are customizable via props

**Notes:**
Navigation elements should be composable and replaceable. Follow MUI patterns for IconButton usage.

### PR-005: Implement Touch and Swipe Gestures

---
pr_id: PR-005
title: Implement Touch and Swipe Gestures
cold_state: new
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
    description: swipe gesture detection hook
  - path: packages/mui-carousel/src/hooks/useTouch.ts
    action: create
    description: touch event handling utilities
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: integrate touch handling
  - path: packages/mui-carousel/src/utils/gestureHelpers.ts
    action: create
    description: gesture calculation utilities
---

**Description:**
Implement native touch event handling for swipe gestures following Material UI's patterns. Include velocity-based recognition, thresholds, and conflict resolution with nested scrollable content.

**Acceptance Criteria:**
- [ ] Swipe left/right navigates slides
- [ ] Velocity-based fling detection works
- [ ] Threshold prevents accidental navigation
- [ ] Works on all touch devices
- [ ] Handles multi-touch correctly
- [ ] Conflicts with nested scrollables resolved
- [ ] Uses MUI's defaultMuiPrevented pattern

**Notes:**
Follow patterns from SwipeableDrawer and Slider components. No external gesture libraries - use native touch events only.

## Block 2: Animation & Polish (Depends on Block 1)

### PR-006: Add React Transition Group Animations

---
pr_id: PR-006
title: Add React Transition Group Animations
cold_state: new
priority: high
complexity:
  score: 5
  estimated_minutes: 75
  suggested_model: sonnet
  rationale: Integration with React Transition Group following MUI patterns
dependencies: [PR-003]
estimated_files:
  - path: packages/mui-carousel/src/Carousel/CarouselSlide.tsx
    action: create
    description: slide wrapper with transition support
  - path: packages/mui-carousel/src/Carousel/transitions/SlideTransition.tsx
    action: create
    description: slide transition implementation
  - path: packages/mui-carousel/src/Carousel/transitions/FadeTransition.tsx
    action: create
    description: fade transition implementation
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: integrate transition components
  - path: packages/mui-carousel/package.json
    action: modify
    description: add react-transition-group dependency
---

**Description:**
Integrate React Transition Group for smooth slide animations. Implement slide and fade transitions following Material UI's animation patterns and timing functions.

**Acceptance Criteria:**
- [ ] Slide transition works smoothly at 60fps
- [ ] Fade transition option available
- [ ] Animations respect prefers-reduced-motion
- [ ] Transition duration is configurable
- [ ] No animation glitches or flickers
- [ ] Follows MUI's easing functions

**Notes:**
Study existing MUI components like Collapse, Fade, and Slide for patterns. Use CSS transforms for performance.

### PR-007: Implement Auto-Play Functionality

---
pr_id: PR-007
title: Implement Auto-Play Functionality
cold_state: new
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
    description: auto-play logic hook
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: integrate auto-play functionality
  - path: packages/mui-carousel/src/utils/timerHelpers.ts
    action: create
    description: timer utility functions
---

**Description:**
Add auto-play capability with configurable intervals, pause on hover/focus, and proper cleanup. Respect user preferences for reduced motion.

**Acceptance Criteria:**
- [ ] Auto-play advances slides at set intervals
- [ ] Pauses on hover and focus
- [ ] Resumes after interaction
- [ ] Stops at last slide or loops (configurable)
- [ ] Respects prefers-reduced-motion
- [ ] Properly cleans up timers

**Notes:**
Must handle edge cases like rapid mount/unmount. Consider using requestAnimationFrame for smooth timing.

### PR-008: Add Keyboard Navigation Support

---
pr_id: PR-008
title: Add Keyboard Navigation Support
cold_state: new
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
    description: keyboard navigation hook
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: integrate keyboard handling
  - path: packages/mui-carousel/src/utils/keyboardHelpers.ts
    action: create
    description: keyboard event utilities
---

**Description:**
Implement comprehensive keyboard navigation including arrow keys, Home/End, Tab, and number keys for direct slide access.

**Acceptance Criteria:**
- [ ] Arrow keys navigate next/previous
- [ ] Home/End go to first/last slide
- [ ] Tab navigates through interactive elements
- [ ] Escape stops auto-play
- [ ] Number keys (1-9) for direct access
- [ ] Focus management works correctly
- [ ] Keyboard traps prevented

**Notes:**
Must work with screen readers. Follow WAI-ARIA carousel patterns.

## Block 3: Accessibility & Responsive (Depends on Block 2)

### PR-009: Implement ARIA Attributes and Screen Reader Support

---
pr_id: PR-009
title: Implement ARIA Attributes and Screen Reader Support
cold_state: new
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
    description: add ARIA attributes
  - path: packages/mui-carousel/src/Carousel/CarouselNavigation.tsx
    action: modify
    description: add ARIA labels to controls
  - path: packages/mui-carousel/src/Carousel/CarouselIndicators.tsx
    action: modify
    description: add ARIA attributes to indicators
  - path: packages/mui-carousel/src/utils/a11yHelpers.ts
    action: create
    description: accessibility utility functions
---

**Description:**
Add comprehensive ARIA attributes and screen reader support following WAI-ARIA authoring practices for carousels.

**Acceptance Criteria:**
- [ ] role="region" with proper labels
- [ ] aria-live regions for announcements
- [ ] aria-current for active slide
- [ ] Navigation controls have descriptive labels
- [ ] Slide changes are announced
- [ ] Instructions available for screen readers
- [ ] Passes accessibility audit tools

**Notes:**
Test with NVDA, JAWS, and VoiceOver. Reference WAI-ARIA carousel pattern.

### PR-010: Add Responsive Behavior and Breakpoints

---
pr_id: PR-010
title: Add Responsive Behavior and Breakpoints
cold_state: new
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
    description: responsive behavior hook
  - path: packages/mui-carousel/src/Carousel/Carousel.tsx
    action: modify
    description: integrate responsive behavior
  - path: packages/mui-carousel/src/utils/responsiveHelpers.ts
    action: create
    description: breakpoint calculation utilities
---

**Description:**
Implement responsive behavior using Material UI's breakpoint system, including adaptive slide counts and touch/mouse detection.

**Acceptance Criteria:**
- [ ] Adapts to container width changes
- [ ] Breakpoint-based configuration works
- [ ] Touch enabled on mobile automatically
- [ ] Images handle srcSet properly
- [ ] Performance optimized for mobile
- [ ] useMediaQuery integration works

**Notes:**
Use MUI's useMediaQuery and theme breakpoints. Handle SSR properly.

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