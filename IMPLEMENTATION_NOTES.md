# Implementation Notes: shouldForwardProp in Theme

## Overview
This PR adds support for `shouldForwardProp` in theme component configuration, allowing users to prevent custom variant props from being forwarded to the DOM.

## Problem Statement
When users define custom variants in the theme with custom props (e.g., `customVariant`), they need to pass these props to components for the variant system to work. However, these props end up being rendered to the DOM, causing React warnings:
```
React does not recognize the `customProp` prop on a DOM element...
```

## Solution Architecture

### 1. Type Definitions
**File**: `packages/mui-material/src/styles/components.ts`

Added `shouldForwardProp` field to all component configurations:
```typescript
MuiButton?: {
  defaultProps?: ComponentsProps['MuiButton'];
  styleOverrides?: ComponentsOverrides<Theme>['MuiButton'];
  variants?: ComponentsVariants<Theme>['MuiButton'];
  shouldForwardProp?: (propName: PropertyKey) => boolean;
};
```

### 2. Global Registry
**File**: `packages/mui-system/src/createStyled/createStyled.js`

Created a global registry to track theme-level `shouldForwardProp` configurations:
```javascript
const themeShouldForwardPropRegistry = new Map();

export function registerThemeShouldForwardProp(componentName, shouldForwardPropFn);
export function getThemeShouldForwardProps(componentName);
```

### 3. Styled Component Wrapper
**File**: `packages/mui-system/src/createStyled/createStyled.js`

Wrapped the styled component's `shouldForwardProp` to check both:
1. Component-level `shouldForwardProp` (existing behavior)
2. Theme-level `shouldForwardProp` (new feature)

```javascript
if (componentName && shouldForwardPropOption) {
  const baseShouldForwardProp = shouldForwardPropOption;
  const componentNameForClosure = componentName;
  shouldForwardPropOption = (prop) => {
    if (!baseShouldForwardProp(prop)) {
      return false;
    }
    const themeShouldForwardProps = getThemeShouldForwardProps(componentNameForClosure);
    if (themeShouldForwardProps && themeShouldForwardProps.size > 0) {
      for (const themeShouldForwardProp of themeShouldForwardProps) {
        if (!themeShouldForwardProp(prop)) {
          return false;
        }
      }
    }
    return true;
  };
}
```

### 4. Theme Provider Registration
**File**: `packages/mui-system/src/ThemeProvider/ThemeProvider.js`

Modified `ThemeProvider` to register theme `shouldForwardProp` configurations:
```javascript
React.useMemo(() => {
  const resolvedTheme = themeId ? engineTheme[themeId] : engineTheme;
  if (resolvedTheme?.components) {
    Object.keys(resolvedTheme.components).forEach((componentName) => {
      const componentConfig = resolvedTheme.components[componentName];
      if (componentConfig?.shouldForwardProp) {
        registerThemeShouldForwardProp(componentName, componentConfig.shouldForwardProp);
      }
    });
  }
}, [engineTheme, themeId]);
```

## Usage Example

```javascript
import { createTheme, ThemeProvider, OutlinedInput } from '@mui/material';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      shouldForwardProp: (prop) => prop !== 'customVariant',
      variants: [
        {
          props: { customVariant: 'special' },
          style: {
            borderColor: 'red',
            borderWidth: 2,
          },
        },
      ],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <OutlinedInput customVariant="special" />
      {/* customVariant won't be forwarded to DOM */}
    </ThemeProvider>
  );
}
```

## Testing

Added comprehensive tests in `packages/mui-system/src/styled/styled.test.js`:

1. Test with single custom prop
2. Test with multiple custom props
3. Verify variants still work
4. Verify standard props (like `data-testid`) still work

## Known Issues / TODO

1. **Debugging Needed**: Tests show that props are still being forwarded to DOM. Need to verify:
   - Timing of registration vs component creation
   - Whether Emotion caches the shouldForwardProp results
   - Whether the wrapped function is being called correctly

2. **Registry Cleanup**: Consider adding cleanup logic to prevent memory leaks when themes change

3. **Documentation**: Need to update official documentation with usage examples

4. **TypeScript**: Verify TypeScript definitions are complete and correct

## Technical Challenges

### Challenge 1: Timing
- Styled components are created at module load time
- ThemeProvider renders at runtime
- Solution: Use closure that checks registry at prop evaluation time

### Challenge 2: Emotion Integration
- Emotion's `shouldForwardProp` only receives prop name, not full props
- Can't access theme directly in `shouldForwardProp`
- Solution: Use global registry pattern

### Challenge 3: Multiple Themes
- Different themes may have different `shouldForwardProp` configs
- Need to handle theme switching
- Solution: Registry uses Set to accumulate all registered functions

## Alternative Approaches Considered

1. **Wrapper Component**: Create HOC to filter props
   - Pro: Simple, no global state
   - Con: Invasive, changes component structure

2. **Modify useThemeProps**: Filter props in theme props resolution
   - Pro: Centralized location
   - Con: Doesn't help with direct styled component usage

3. **Static Analysis**: Extract prop names from variants at theme creation
   - Pro: No runtime overhead
   - Con: Doesn't work with dynamic/function-based variant props

## Files Modified

1. `packages/mui-material/src/styles/components.ts`
2. `packages/mui-system/src/createStyled/createStyled.js`
3. `packages/mui-system/src/ThemeProvider/ThemeProvider.js`
4. `packages/mui-system/src/styled/styled.test.js`

## Next Steps

1. Debug why props are still being forwarded
2. Run full test suite to check for regressions
3. Add documentation
4. Consider performance implications of registry lookups
5. Add cleanup mechanism for theme changes
