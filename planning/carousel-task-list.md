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
cold_state: new
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
    description: comprehensive TypeScript interfaces and types
  - path: packages/mui-carousel/src/Carousel/carouselClasses.ts
    action: create
    description: CSS class definitions following MUI patterns
  - path: packages/mui-carousel/src/types/index.ts
    action: create
    description: shared types across carousel package
  - path: packages/mui-carousel/src/utils/constants.ts
    action: create
    description: carousel constants and configuration values
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
cold_state: new
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
    description: main carousel component with basic functionality
  - path: packages/mui-carousel/src/Carousel/index.ts
    action: create
    description: carousel exports
  - path: packages/mui-carousel/src/hooks/useCarousel.ts
    action: create
    description: custom hook for carousel state management
  - path: packages/mui-carousel/src/utils/carouselHelpers.ts
    action: create
    description: utility functions for carousel logic
---

**Description:**
Implement the core Carousel component with basic slide navigation, state management, and rendering logic. This includes the fundamental structure without animations or advanced features.

**Acceptance Criteria:**
- [ ] Component renders slides correctly
- [ ] Basic next/previous navigation works
- [ ] State management handles slide changes
- [ ] Component uses forwardRef pattern
- [ ] Supports controlled and uncontrolled modes
- [ ] Integrates with MUI theme system

**Notes:**
Focus on getting the basic structure right. Animations and advanced features come in later PRs. Must follow MUI component patterns exactly.

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