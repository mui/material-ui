const plugin = require('tailwindcss/plugin');

/**
 * MUI state classes that components apply to themselves.
 * Maps the variant name to the Mui- class that triggers it.
 */
const MUI_STATES = {
  active: 'Mui-active',
  checked: 'Mui-checked',
  completed: 'Mui-completed',
  disabled: 'Mui-disabled',
  error: 'Mui-error',
  expanded: 'Mui-expanded',
  focused: 'Mui-focused',
  'focus-visible': 'Mui-focusVisible',
  readonly: 'Mui-readOnly',
  required: 'Mui-required',
  selected: 'Mui-selected',
};

/**
 * Tailwind plugin that adds `mui-{state}:` and `mui-not-{state}:` variants
 * for every MUI component state class.
 *
 * Usage (Tailwind v3 or v4 via `@plugin`):
 *   <Slider className="mui-disabled:opacity-50 mui-error:text-error" />
 *   <MenuItem className="mui-selected:bg-primary/10 mui-focused:bg-primary/5" />
 */
module.exports = plugin(({ addVariant }) => {
  Object.entries(MUI_STATES).forEach(([variant, muiClass]) => {
    addVariant(`mui-${variant}`, `&.${muiClass}`);
    addVariant(`mui-not-${variant}`, `&:not(.${muiClass})`);
  });
});
