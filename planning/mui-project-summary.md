# Material UI Million-Line Challenge: Project Summary

## Assignment Context
**Goal**: Complete the Million-Line Codebase Challenge by contributing two substantial, end-to-end features to a large open-source repository.

**Key Requirements**:
- Repository with ~1M+ lines of code (adjusted: "large enough to require brownfield methodology adaptation")
- Two end-to-end features that don't currently exist
- Features must touch multiple layers (backend logic, data structures, user-facing components)
- Follow project patterns, write tests, create documentation
- Submit two PRs + 7-10 min video + technical documentation

## Chosen Repository
**Material UI (MUI)** - React component library implementing Google's Material Design
- GitHub: https://github.com/mui/material-ui
- 95.7k+ stars, active maintenance, clear contribution guidelines
- Modern React/TypeScript codebase with comprehensive test infrastructure
- Large enough to require selective context loading and AI methodology adaptation

## Selected Feature Pair

### Feature 1: Native Carousel Component (Greenfield)
**Problem**: Material UI lacks a native carousel component, forcing developers to use third-party libraries

**Scope**: Build a complete, production-ready Carousel component from scratch
- Touch/swipe gesture support
- Auto-play with configurable intervals
- Customizable navigation buttons and indicators
- Accessibility (ARIA labels, keyboard navigation)
- Responsive design with breakpoint support
- Performance optimizations (lazy loading, memoization)
- Full TypeScript definitions
- Comprehensive test coverage

**Why This Works**:
- Demonstrates ability to design new APIs matching existing library patterns
- Shows understanding of Material UI's theming system and styling architecture
- Tests greenfield thinking within brownfield constraints
- Relatively independent implementation (minimal existing code dependencies)

**Key Technical Areas**:
- Animation system (studying existing Collapse, Fade, Slide patterns)
- Touch/gesture event handling
- Component composition and customization
- Theme integration
- Accessibility standards

### Feature 2: Native Drag-and-Drop System (Brownfield Extension)
**Problem**: Material UI components lack native drag-and-drop functionality, requiring third-party libraries like react-beautiful-dnd or react-dnd that often conflict with Material UI's styling

**Scope**: Add native drag-and-drop capabilities to existing components
- Draggable Table rows and columns (reordering)
- Draggable List items with sortable functionality
- Draggable Grid items for dashboard layouts
- Draggable Chips for tag management
- Built-in utilities/hooks for custom implementations
- Smooth animations and visual feedback
- Touch device support
- Accessibility considerations

**Why This Works**:
- Forces deep engagement with existing component implementations
- Requires navigating complex interdependencies without breaking changes
- Shows ability to extend legacy code while maintaining backward compatibility
- Demonstrates careful API design for multiple integration points
- Tests brownfield development skills directly

**Key Technical Areas**:
- Event propagation and handling in existing components
- State management patterns used throughout MUI
- Component composition and HOC patterns
- Backward compatibility strategies
- Multiple component integration (Table, List, Grid, Chip)

## Feature Pairing Rationale

**Strategic Fit**:
1. **Carousel** = Greenfield within brownfield: Build something new while respecting existing conventions
2. **Drag-and-Drop** = Pure brownfield: Extend and enhance what's already there

**AI-First Methodology Adaptation**:
- **Selective Context**: Learn to identify and load only relevant code sections
- **Pattern Recognition**: Extract and apply patterns from existing components
- **Dependency Mapping**: Trace component hierarchies without full codebase visibility
- **Incremental Development**: Build independently (carousel) vs. carefully extend (DnD)

**Evaluation Alignment**:
- **Technical Depth (40%)**: Both features are architecturally complex and multi-layered
- **Completeness (30%)**: Clear end-to-end deliverables with tests, docs, demos
- **Communication (20%)**: Compelling narrative: "learned patterns → applied to new → extended existing"
- **Learning (10%)**: Direct demonstration of adapting to large codebase constraints

## Deliverables Per Assignment Spec

### 1. Two Pull Requests
- PR #1: Carousel component with full implementation, tests, demos, documentation
- PR #2: Drag-and-drop system with component integrations, tests, demos, documentation
- Both following Material UI's PR template and contribution guidelines
- Professional responses to maintainer feedback (if any)

### 2. Video Presentation (7-10 minutes)
Structure:
1. Why Material UI + what we're building
2. How MUI codebase is structured (packages, component patterns, styling system)
3. Feature 1 deep dive: Carousel (problem, design, demo, code walkthrough, challenges)
4. Feature 2 deep dive: Drag-and-Drop (problem, design, demo, code walkthrough, challenges)
5. Links to PRs and maintainer discussions
6. Learnings and what we'd do differently

### 3. Technical Documentation
- Architecture diagrams showing component structure and integration points
- Setup instructions for testing both features locally
- Decision log explaining key design choices
- Test coverage reports
- Migration guide (especially for DnD if it affects existing APIs)

## Success Criteria
- Code quality matches Material UI's standards (passes linters, formatters, tests)
- Features are truly end-to-end (not just UI tweaks or bug fixes)
- Implementation follows existing patterns and conventions
- Demonstrates understanding of complex codebase navigation
- Shows ability to adapt AI-first methodology for brownfield work
- Quality matters more than PR acceptance

## Next Steps for Planning Agent
1. Deep dive into Material UI's codebase structure
2. Identify existing patterns for similar components
3. Map dependencies and integration points for both features
4. Create detailed technical specifications
5. Break down implementation into phases
6. Identify testing strategies
7. Plan documentation structure