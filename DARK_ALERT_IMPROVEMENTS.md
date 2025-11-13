# Dark Mode Alert Styling Improvements

## Summary of Changes

This update improves the dark mode styling for the Alert component across all three variants: `standard`, `outlined`, and `filled`.

## Key Improvements

### 1. Standard Variant - Better Background Contrast

- **Before**: Used `safeDarken(light, 0.9)` which created backgrounds that were too dark, making text difficult to read in dark mode.
- **After**: Uses `getBackgroundColor(main, 0.75)` for dark mode, providing better contrast while maintaining visual hierarchy.
- **Benefit**: Text is now readable without sacrificing the dark aesthetic.

### 2. Outlined Variant - Visible Borders

- **Before**: Borders used the `light` palette color which was nearly invisible on dark backgrounds.
- **After**: Uses `getColor(main, 0.5)` (which is `lighten` in dark mode) to create visible, appropriately-tinted borders.
- **Benefit**: Borders are now clearly visible and semantically appropriate for the alert severity.

### 3. Filled Variant - Improved Color Balance

- **Before**: Filled variant used `palette[color].dark` which could be overly saturated or dark.
- **After**: Uses `theme.lighten(dark, 0.2)` to provide a balanced, readable background while maintaining prominence.
- **Benefit**: Better visual separation with improved contrast text color.

### 4. Theme Variables (createThemeWithVars.js)

- **Before**: Dark mode standard backgrounds used `colorMix(safeDarken, light, 0.9)`.
- **After**: Updated to `colorMix(safeLighten, main, 0.25)` for better readability in dark mode.
- **Benefit**: CSS variable-based themes now provide consistent, high-contrast Alert styling.

## Files Modified

1. **`packages/mui-material/src/Alert/Alert.js`**
   - Refactored nested ternary expressions to clean helper functions
   - Improved dark mode color calculations for all three variants
   - Maintained backward compatibility with CSS variable themes

2. **`packages/mui-material/src/styles/createThemeWithVars.js`**
   - Updated dark mode standard background values for better contrast
   - Ensures CSS variable themes align with direct color calculations

## Testing Recommendations

- [ ] Test all Alert variants (`standard`, `outlined`, `filled`) in dark mode
- [ ] Test all severity levels (`success`, `warning`, `error`, `info`)
- [ ] Verify text contrast ratios meet WCAG AA standards (4.5:1 for normal text)
- [ ] Check that custom color props still work correctly
- [ ] Verify theme variables are applied correctly when using CSS variables

## Example Usage

```jsx
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Alert severity="error">Error alert - now with better contrast!</Alert>
      <Alert severity="warning" variant="outlined">
        Outlined warning
      </Alert>
      <Alert severity="success" variant="filled">
        Filled success
      </Alert>
    </ThemeProvider>
  );
}
```

## Breaking Changes

None. All changes are backward compatible.

## Accessibility Impact

✅ **Improved** - Better contrast ratios in dark mode for all Alert variants.
