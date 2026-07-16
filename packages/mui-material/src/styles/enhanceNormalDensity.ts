import {
  addDefaultProps,
  addRootOverride,
  applyDensity,
  DensityScale,
  EnhanceableTheme,
} from './densityScale';
import tooltipClasses from '../Tooltip/tooltipClasses';
import switchClasses from '../Switch/switchClasses';
import tabClasses from '../Tab/tabClasses';
import accordionSummaryClasses from '../AccordionSummary/accordionSummaryClasses';
import buttonGroupClasses from '../ButtonGroup/buttonGroupClasses';
import autocompleteClasses from '../Autocomplete/autocompleteClasses';
import outlinedInputClasses from '../OutlinedInput/outlinedInputClasses';
import inputLabelClasses from '../InputLabel/inputLabelClasses';
import { listItemIconClasses } from '../ListItemIcon';
import { inputBaseClasses } from '../InputBase';
import type { TabProps } from '../Tab';
import type { AccordionSummaryOwnerState } from '../AccordionSummary';
import type { PaginationItemOwnerState } from '../PaginationItem';
import { formControlClasses } from '../FormControl';
import { formControlLabelClasses } from '../FormControlLabel';
import { inputAdornmentClasses } from '../InputAdornment';
import tablePaginationClasses from '../TablePagination/tablePaginationClasses';

// Explicit px (self-contained, not spacing-derived). Normal keeps today's Button
// typography — no reflow — so only the padding→step assignment below.
const scale: DensityScale = {
  xxs: '4px',
  xs: '6px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
};

export default function enhanceNormalDensity<T extends EnhanceableTheme>(theme: T) {
  const enhanced = applyDensity(theme, scale);
  // Density steps from the enhanced theme: `var(--mui-density-*)` refs in
  // cssVariables mode, raw px otherwise (dual-mode via `theme.vars || theme`).
  const d: DensityScale = (enhanced.vars || enhanced).density;
  addRootOverride(enhanced.components, 'MuiButton', {
    // Emit padding directly on the size variants Button already ships (no seam).
    variants: [
      { props: { size: 'small' }, style: { padding: `${d.xxs} ${d.sm}` } },
      { props: { size: 'medium' }, style: { padding: `${d.xs} ${d.lg}` } },
      { props: { size: 'large' }, style: { padding: `${d.sm} ${d.xl}` } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiIconButton', {
    // Uniform padding per size = density steps (master: 5/8/12 for
    // small/medium/large — same shape as Button's own per-size padding).
    // fontSize (the 1em-child sizing seam, 18/24/28) and the edge start/end
    // negative margins (flush-alignment offsets, not padding-derived) stay
    // frozen at master — icon visual size is owned by SvgIcon's own fontSize
    // prop knob elsewhere, and the edge offsets aren't a clean step ratio.
    variants: [
      { props: { size: 'small' }, style: { padding: d.xxs } },
      { props: { size: 'medium' }, style: { padding: d.sm } },
      { props: { size: 'large' }, style: { padding: d.lg } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiMenuItem', {
    // Height = raw px (density steps are spacing-only). Padding = density steps.
    // Density axis is the `dense` boolean; inline pad only when gutters are on.
    variants: [
      { props: { dense: false }, style: { minHeight: '44px', paddingBlock: d.xs } },
      { props: { dense: true }, style: { minHeight: '32px', paddingBlock: d.xxs } },
      { props: { dense: false, disableGutters: false }, style: { paddingInline: d.lg } },
      { props: { dense: true, disableGutters: false }, style: { paddingInline: d.md } },
    ],
    [`& .${listItemIconClasses.root}`]: {
      minWidth: 32,
    },
  });
  addRootOverride(enhanced.components, 'MuiList', {
    // Menu/list vertical breathing (spacing token); subheader keeps paddingTop 0.
    variants: [{ props: { disablePadding: false }, style: { paddingBlock: d.sm } }],
  });
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // Padding + per-placement offset = density steps on the base (mirrors
      // Tooltip.js base margins), so they apply to every tooltip; arrow doesn't
      // change them. Arrow size lives on the popper slot (see the block below).
      padding: `${d.xxs} ${d.sm}`,
      [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: { marginInlineEnd: d.lg },
      [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: { marginInlineStart: d.lg },
      [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: { marginBottom: d.lg },
      [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: { marginTop: d.lg },
    },
    'tooltip',
  );
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // Arrow size — ONE preset-local var; the geometry below derives from it via
      // calc. Master ships literal em values on these SAME selectors (component
      // untouched); these popper-slot overrides win by cascade order. 0.71 = the
      // master ratio (1/sqrt(2), the hypotenuse projection of the square arrow).
      '--_arrowSize': '11px',
      [`&[data-popper-placement*="bottom"] .${tooltipClasses.arrow}`]: {
        marginTop: 'calc(var(--_arrowSize) * -0.71)',
      },
      [`&[data-popper-placement*="top"] .${tooltipClasses.arrow}`]: {
        marginBottom: 'calc(var(--_arrowSize) * -0.71)',
      },
      [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
        // width/height re-asserted here: master's placement rules set them at the
        // same specificity, so the base arrow rule below would lose for left/right.
        height: 'var(--_arrowSize)',
        width: 'calc(var(--_arrowSize) * 0.71)',
        marginInlineStart: 'calc(var(--_arrowSize) * -0.71)',
      },
      [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
        height: 'var(--_arrowSize)',
        width: 'calc(var(--_arrowSize) * 0.71)',
        marginInlineEnd: 'calc(var(--_arrowSize) * -0.71)',
      },
    },
    'popper',
  );
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // Base arrow box on its own slot (inherits --_arrowSize from the popper
      // root); left/right placements above re-assert because master sets them
      // at popper level.
      width: 'var(--_arrowSize)',
      height: 'calc(var(--_arrowSize) * 0.71)',
    },
    'arrow',
  );
  addRootOverride(enhanced.components, 'MuiInputLabel', {
    // Floating-label Y — master ships literal translate Ys (component untouched).
    // Re-emit the transform per state so the Y can come from a preset-closed var:
    //   --_restY   — written for EVERY rest state by the input-side broadcasts
    //                below (OutlinedInput/FilledInput/Input `:has` selectors,
    //                per size) → consumed BARE, no fallback: a missing writer is
    //                a bug and must break visibly.
    //   --_shrinkY — written ONLY by the FilledInput broadcasts → consumed bare
    //                in the filled-shrink state; outlined/standard shrink have NO
    //                density writer, so they re-state master's literal directly.
    // Size-small variants collapse: size differentiation lives in the writers.
    // Variant ORDER mirrors master's (later wins at equal specificity). The
    // literal shrink rules are NOT redundant with master's: the rest rules here
    // (which must exist to consume the var) also match shrunk labels and land
    // AFTER master's shrink rules in the cascade — each shrink state must be
    // re-asserted in this layer or shrunk labels would show the rest transform.
    variants: [
      {
        props: ({ ownerState }: { ownerState: { formControl?: object | undefined } }) =>
          Boolean(ownerState.formControl),
        style: { transform: 'translate(0, var(--_restY)) scale(1)' },
      },
      {
        props: { shrink: true },
        style: { transform: 'translate(0, -1.5px) scale(0.75)' },
      },
      {
        props: { variant: 'filled' },
        style: { transform: 'translate(12px, var(--_restY)) scale(1)' },
      },
      {
        props: { variant: 'filled', shrink: true },
        style: { transform: 'translate(12px, var(--_shrinkY)) scale(0.75)' },
      },
      {
        props: { variant: 'outlined' },
        style: { transform: 'translate(14px, var(--_restY)) scale(1)' },
      },
      {
        props: { variant: 'outlined', shrink: true },
        style: { transform: 'translate(14px, -9px) scale(0.75)' },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiOutlinedInput', {
    // broadcast the variable to the formControl so the label can reach it via `:has(> &)` (the input is a child).
    [`.${formControlClasses.root}:has(> &)`]: { '--_outlinedInputPadBlock': d.md },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': `calc(var(--_outlinedInputPadBlock) - 0.5px)`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            '--_restY': `calc(var(--_outlinedInputPadBlock) + 0.5px)`,
          },
          [`.${formControlClasses.root}:has(> &)`]: { '--_outlinedInputPadBlock': d.sm },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, ${d.md})`,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, ${d.sm})`,
        },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiOutlinedInput',
    {
      // Only block padding reflows; inline stays master (fieldset-constrained).
      // Master already ships the adornment/multiline inline resets on this slot.
      paddingBlock: `var(--_outlinedInputPadBlock, ${d.md})`,
      variants: [
        {
          props: { size: 'small' },
          style: { paddingBlock: `var(--_outlinedInputPadBlock, ${d.sm})` },
        },
        {
          props: { multiline: true },
          style: { paddingBlock: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(enhanced.components, 'MuiInputAdornment', {
    // Adornment gap (start marginRight / end marginLeft) + filled positionStart
    // marginTop = density steps, per size (medium default / small).
    variants: [
      { props: { position: 'start' }, style: { marginRight: d.sm } },
      { props: { position: 'end' }, style: { marginLeft: d.sm } },
      {
        props: { position: 'start', size: 'small' },
        style: { marginRight: d.xxs },
      },
      {
        props: { position: 'end', size: 'small' },
        style: { marginLeft: d.xxs },
      },
      {
        props: { variant: 'filled' },
        style: {
          [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]:
            {
              marginTop:
                'calc(var(--_filledInputPadTop, 18px) - var(--_filledInputPadBottom, 2px))',
            },
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiFilledInput', {
    // Root padding (adornment/multiline) = density steps. The floating label is a
    // preceding sibling — reach it via `:has(~ &)` and set its rest/shrink Y as
    // tuned raw px (no clean formula from topPad). hiddenLabel block padding stays
    // at master literals (out of scope).
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_filledInputPadTop': d.xl,
      '--_filledInputPadBottom': d.sm,
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': `calc((var(--_filledInputPadTop) + var(--_filledInputPadBottom)) / 2)`,
      '--_shrinkY': '7px',
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_filledInputPadTop': '18px',
            '--_filledInputPadBottom': '2px',
          },
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            '--_restY': `calc((var(--_filledInputPadTop) + var(--_filledInputPadBottom)) / 2)`,
            '--_shrinkY': '4px',
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingTop: `var(--_filledInputPadTop, ${d.xl})`,
          paddingBottom: `var(--_filledInputPadBottom, ${d.sm})`,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingTop: `var(--_filledInputPadTop, ${d.lg})`,
          paddingBottom: `var(--_filledInputPadBottom, ${d.xs})`,
        },
      },
      // hidden label does not need to sync with label, so no need CSS variables.
      {
        props: { multiline: true, hiddenLabel: true },
        style: { paddingTop: 16, paddingBottom: 17 },
      },
      {
        props: { multiline: true, hiddenLabel: true, size: 'small' },
        style: { paddingTop: 8, paddingBottom: 9 },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiFilledInput',
    {
      // Only block padding reflows; inline stays master (keeps label alignment).
      // hiddenLabel block padding stays at master literals (out of scope).
      paddingTop: `var(--_filledInputPadTop, ${d.xl})`,
      paddingBottom: `var(--_filledInputPadBottom, ${d.sm})`,
      variants: [
        {
          props: { hiddenLabel: true },
          style: {
            paddingTop: `var(--_filledInputPadTop, 16px)`,
            paddingBottom: `var(--_filledInputPadBottom, 17px)`,
          },
        },
        {
          props: { hiddenLabel: true, size: 'small' },
          style: {
            paddingTop: `var(--_filledInputPadTop, 8px)`,
            paddingBottom: `var(--_filledInputPadBottom, 9px)`,
          },
        },
        {
          props: { multiline: true },
          style: { paddingBlock: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(enhanced.components, 'MuiInput', {
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_inputPadTop': d.xs,
      '--_inputPadBottom': `calc(${d.xs} - 1px)`,
      '--_inputMarginTop': '16px',
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': `calc(var(--_inputMarginTop, 16px) + (var(--_inputPadTop, ${d.xs}) + var(--_inputPadBottom, ${d.xs})) / 2)`,
    },
    [`label + &, .${inputLabelClasses.root} + &`]: {
      marginTop: `var(--_inputMarginTop, 16px)`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_inputPadTop': d.xxs,
            '--_inputPadBottom': `calc(${d.xxs} - 1px)`,
          },
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            '--_restY': `calc(var(--_inputMarginTop, 16px) + (var(--_inputPadTop, ${d.xxs}) + var(--_inputPadBottom, ${d.xxs})) / 2)`,
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingTop: `var(--_inputPadTop, ${d.xs})`,
          paddingBottom: `var(--_inputPadBottom, calc(${d.xs} - 1px))`,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingTop: `var(--_inputPadTop, ${d.xxs})`,
          paddingBottom: `var(--_inputPadBottom, calc(${d.xxs} - 1px))`,
        },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiInput',
    {
      paddingTop: `var(--_inputPadTop, ${d.xs})`,
      paddingBottom: `var(--_inputPadBottom, ${d.xs})`,
      variants: [
        {
          props: { size: 'small' },
          style: {
            paddingTop: `var(--_inputPadTop, ${d.xxs})`,
            paddingBottom: `var(--_inputPadBottom, ${d.xxs})`,
          },
        },
        {
          props: { multiline: true },
          style: { paddingBlock: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(
    enhanced.components,
    'MuiInputBase',
    {
      // Standard input box padding (block only; inline stays 0). Emitted on the
      // base key so standard Input inherits it via the cascade; Outlined/Filled
      // override on their own keys (win by injection order). Multiline box padding
      // lives on the InputBase root (left at master) — reset the input to 0 as
      // master does.
      paddingBlock: d.xs,
      variants: [
        { props: { size: 'small' }, style: { paddingTop: d.xxs } },
        {
          props: { multiline: true },
          style: { paddingBlock: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(enhanced.components, 'MuiTab', {
    // Min-heights = raw px (paired with MuiTabs base below); padding = steps.
    minHeight: '48px',
    paddingBlock: d.sm,
    paddingInline: d.lg,
    variants: [
      {
        props: ({ ownerState }: { ownerState: TabProps }) => ownerState.icon && ownerState.label,
        style: { minHeight: '72px', paddingBlock: d.xs },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'top',
        style: { [`& > .${tabClasses.icon}`]: { marginBottom: d.xs } },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'bottom',
        style: { [`& > .${tabClasses.icon}`]: { marginTop: d.xs } },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'start',
        style: { [`& > .${tabClasses.icon}`]: { marginRight: d.sm } },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'end',
        style: { [`& > .${tabClasses.icon}`]: { marginLeft: d.sm } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiTabs', {
    minHeight: '48px', // == MuiTab base minHeight (the pairing)
  });
  addRootOverride(enhanced.components, 'MuiTabScrollButton', {
    variants: [
      { props: { orientation: 'horizontal' }, style: { width: '40px' } },
      { props: { orientation: 'vertical' }, style: { height: '40px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiCheckbox', {
    // Touch-target padding per size (9px both sizes today) = density steps. Pull the
    // sibling label back by the same amount so the control↔label gap stays constant.
    variants: [
      {
        props: { size: 'medium' },
        style: {
          padding: d.sm,
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d.sm})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d.sm})`,
          },
        },
      },
      {
        props: { size: 'small' },
        style: {
          padding: d.xs,
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d.xs})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d.xs})`,
          },
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiRadio', {
    // Touch-target padding per size (9px both sizes today) = density steps. Pull the
    // sibling label back by the same amount so the control↔label gap stays constant.
    variants: [
      {
        props: { size: 'medium' },
        style: {
          padding: d.sm,
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d.sm})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d.sm})`,
          },
        },
      },
      {
        props: { size: 'small' },
        style: {
          padding: d.xs,
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d.xs})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d.xs})`,
          },
        },
      },
    ],
  });
  // Separator inline margins (spacing step) on the separator slot.
  addRootOverride(enhanced.components, 'MuiBreadcrumbs', { marginInline: d.sm }, 'separator');
  addRootOverride(enhanced.components, 'MuiToggleButton', {
    // Emit uniform padding directly on the size variants ToggleButton ships (no seam).
    variants: [
      { props: { size: 'small' }, style: { padding: d.sm } },
      { props: { size: 'medium' }, style: { padding: d.md } },
      { props: { size: 'large' }, style: { padding: d.lg } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiAvatar', {
    // Square size = raw px (sizing).
    width: '40px',
    height: '40px',
  });
  // Bar thickness = raw px (sizing); bars are absolute top/bottom-0, so the
  // root height drives every variant (determinate/indeterminate/buffer/query).
  addRootOverride(enhanced.components, 'MuiLinearProgress', { height: '4px' });
  addRootOverride(enhanced.components, 'MuiSlider', {
    // Track thickness = raw px (sizing; rail/track inherit the root box). Touch
    // padding = step on the logical axis (block for horizontal, inline for
    // vertical) so one knob drives both; the coarse-pointer 20px floor is
    // re-asserted frozen (42px a11y hit target, never densified). Marks and
    // markLabel geometry stay frozen (master-literal offsets the margins align to).
    variants: [
      {
        props: { orientation: 'horizontal' },
        style: {
          height: '4px',
          paddingBlock: d.md,
          '@media (pointer: coarse)': { paddingBlock: '20px' },
        },
      },
      { props: { orientation: 'horizontal', size: 'small' }, style: { height: '2px' } },
      {
        props: { orientation: 'vertical' },
        style: {
          width: '4px',
          paddingInline: d.md,
          '@media (pointer: coarse)': { paddingInline: '20px' },
        },
      },
      { props: { orientation: 'vertical', size: 'small' }, style: { width: '2px' } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiSlider',
    {
      // Thumb square = raw px (sizing); the 42px ::after hit target stays frozen.
      width: '20px',
      height: '20px',
      variants: [{ props: { size: 'small' }, style: { width: '12px', height: '12px' } }],
    },
    'thumb',
  );
  addRootOverride(
    enhanced.components,
    'MuiSlider',
    {
      // Bubble padding = steps (normal maps master's 0.25rem 0.75rem / 0.5rem
      // exactly); arrow box + placement offsets stay frozen.
      padding: `${d.xxs} ${d.md}`,
      variants: [{ props: { size: 'small' }, style: { padding: `${d.xxs} ${d.sm}` } }],
    },
    'valueLabel',
  );
  addRootOverride(
    enhanced.components,
    'MuiBadge',
    {
      // Bubble = raw px (sizing); standard inline pad = step. Dot resizes; dot pad
      // + borderRadius stay frozen at master.
      variants: [
        {
          props: { variant: 'standard' },
          style: { minWidth: '20px', height: '20px', paddingInline: d.xs },
        },
        { props: { variant: 'dot' }, style: { minWidth: '6px', height: '6px' } },
      ],
    },
    'badge',
  );
  // Switch: interlocked geometry off five preset-local vars (seam from PR
  // #48624 moved here; component stays master). SwitchBase pad, touch-target
  // centering, checked travel, and track radius all DERIVE from the vars, so the
  // thumb stays centered whatever the knobs say. All raw px — the gutter drives
  // track thickness (height - 2*pad), so it rides the dims, not a step.
  addRootOverride(enhanced.components, 'MuiSwitch', {
    // Consumers are base (they read whatever var is in scope); the var
    // DECLARATIONS live on explicit size variants so a knob edit rebuilds
    // size-scoped and never bleeds into the other size.
    width: 'var(--_width)',
    height: 'var(--_height)',
    padding: 'var(--_pad)',
    variants: [
      {
        props: { size: 'medium' },
        style: {
          '--_width': '58px',
          '--_height': '38px',
          '--_thumbSize': '20px',
          '--_touchSize': '38px',
          '--_pad': '12px',
          // Label pull mirrors the gutter (Checkbox pattern); the gutter knob
          // re-writes these via the playground's linked-write registry.
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: { marginLeft: '-12px' },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: { marginRight: '-12px' },
        },
      },
      {
        props: { size: 'small' },
        style: {
          '--_width': '40px',
          '--_height': '24px',
          '--_thumbSize': '16px',
          '--_touchSize': '24px',
          '--_pad': '7px',
          // Label pull mirrors the gutter (Checkbox pattern); the gutter knob
          // re-writes these via the playground's linked-write registry.
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: { marginLeft: '-7px' },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: { marginRight: '-7px' },
          // Master's small rules sit nested under the root variant at higher
          // specificity — re-assert the derivations there or they lose for small.
          [`& .${switchClasses.thumb}`]: {
            width: 'var(--_thumbSize)',
            height: 'var(--_thumbSize)',
          },
          [`& .${switchClasses.switchBase}`]: {
            padding: 'calc((var(--_touchSize) - var(--_thumbSize)) / 2)',
            [`&.${switchClasses.checked}`]: {
              transform: 'translateX(calc(var(--_width) - var(--_touchSize)))',
            },
          },
        },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiSwitch',
    {
      // Center the touch target in the root; travel keeps the thumb symmetric.
      top: 'calc((var(--_height) - var(--_touchSize)) / 2)',
      padding: 'calc((var(--_touchSize) - var(--_thumbSize)) / 2)',
      // When the touch target outgrows the root height, re-anchor the thumb on
      // the track's end caps: nudge left by the overflow half at rest, right by
      // the same amount when checked (0 when touch <= height).
      left: 'min(0px, calc((var(--_height) - var(--_touchSize)) / 2))',
      [`&.${switchClasses.checked}`]: {
        transform: 'translateX(calc(var(--_width) - var(--_touchSize)))',
        left: 'max(0px, calc((var(--_touchSize) - var(--_height)) / 2))',
      },
    },
    'switchBase',
  );
  addRootOverride(
    enhanced.components,
    'MuiSwitch',
    { width: 'var(--_thumbSize)', height: 'var(--_thumbSize)' },
    'thumb',
  );
  addRootOverride(
    enhanced.components,
    'MuiSwitch',
    {
      // Full pill: half the track thickness (height minus the two gutters).
      borderRadius: 'calc((var(--_height) - 2 * var(--_pad)) / 2)',
    },
    'track',
  );
  addRootOverride(enhanced.components, 'MuiButtonGroup', {
    // Grouped-button min-width floor = raw px (sizing).
    [`& .${buttonGroupClasses.grouped}`]: { minWidth: '40px' },
  });
  addRootOverride(enhanced.components, 'MuiTableCell', {
    // Block pad per size (steps); inline pad shared. Re-assert the frozen
    // checkbox/none affordances the size padding would otherwise clobber.
    variants: [
      { props: { size: 'medium' }, style: { padding: `${d.lg} ${d.lg}` } },
      { props: { size: 'small' }, style: { padding: `${d.xs} ${d.lg}` } },
      { props: { padding: 'checkbox' }, style: { padding: '0 0 0 4px' } },
      { props: { padding: 'none' }, style: { padding: 0 } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiTableSortLabel',
    {
      // Sort arrow = raw px (sizing); icon<->label gap = one marginInline leaf
      // (master sets both sides at 4px — the arrow flips sides in right-aligned
      // columns; normal xxs maps it exactly).
      fontSize: '18px',
      marginInline: d.xxs,
    },
    'icon',
  );
  addRootOverride(enhanced.components, 'MuiTablePagination', {
    // ALL pagination geometry rides the ROOT slot as descendant selectors: the
    // toolbar/select slots have custom overridesResolvers that SPREAD the theme
    // styleOverride ({...styles.toolbar}) — an array-form slot (addRootOverride,
    // playground layering) spreads to numeric keys and silently drops. Root's
    // default resolver is array-safe, and root-class nesting outranks the slot
    // rules (incl. master's duplicated minHeight media re-asserts).
    // Bar min-height = raw px (sizing); trailing pad + actions gap = steps.
    [`& .${tablePaginationClasses.toolbar}`]: {
      minHeight: '52px',
      paddingRight: d.xxs,
    },
    [`& .${tablePaginationClasses.toolbar} .${tablePaginationClasses.actions}`]: {
      marginLeft: d.lg,
    },
    // Rows-per-page select: outer gaps + inner pad (right side = the dropdown
    // icon lane); normal maps master (8/32, 8/24) exactly. Inner pad nests past
    // the toolbar so it outranks master's own 2-class `& .select` rule.
    [`& .${tablePaginationClasses.selectRoot}`]: {
      marginLeft: d.sm,
      marginRight: d.xxl,
    },
    [`& .${tablePaginationClasses.toolbar} .${tablePaginationClasses.select}`]: {
      paddingLeft: d.sm,
      paddingRight: d.xl,
    },
  });
  // Input wrapper block padding (around the value/tags) + tag (chip) margin = steps.
  addRootOverride(enhanced.components, 'MuiAutocomplete', {
    '--_autocompleteInputRootPadBlock': d.sm,
    '--_autocompleteInputPadBlock': d.xs,
    [`& .${outlinedInputClasses.root}`]: { paddingBlock: `var(--_autocompleteInputRootPadBlock)` },
    [`& .${outlinedInputClasses.root} .${autocompleteClasses.input}`]: {
      paddingBlock: `var(--_autocompleteInputPadBlock)`,
    },
    [`& .${formControlClasses.root}:has(> .${outlinedInputClasses.root})`]: {
      '--_outlinedInputPadBlock':
        'calc(var(--_autocompleteInputRootPadBlock) + var(--_autocompleteInputPadBlock))',
    },
    // small size
    [`&:has(.${inputBaseClasses.sizeSmall})`]: {
      '--_autocompleteInputRootPadBlock': d.xs,
      '--_autocompleteInputPadBlock': d.xxs,
    },
    [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
      paddingBlock: `var(--_autocompleteInputRootPadBlock)`,
    },
    [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall} .${autocompleteClasses.input}`]:
      {
        paddingBlock: `var(--_autocompleteInputPadBlock)`,
      },
  });
  addRootOverride(
    enhanced.components,
    'MuiAutocomplete',
    {
      // Option list (mirrors MenuItem) renders in a Popper → emit on the listbox
      // slot: minHeight raw px, block/inline pad steps.
      [`& .${autocompleteClasses.option}`]: {
        minHeight: '44px',
        paddingBlock: d.xs,
        paddingInline: d.lg,
      },
    },
    'listbox',
  );
  addRootOverride(enhanced.components, 'MuiAutocomplete', { margin: d.xxs }, 'tag');
  // Horizontal step gutter: paddingLeft (first) / paddingRight (last) = step.
  addRootOverride(enhanced.components, 'MuiStep', {
    variants: [
      {
        props: { orientation: 'horizontal', alternativeLabel: false, hasConnector: false },
        style: { paddingLeft: d.sm },
      },
      {
        props: { orientation: 'horizontal', alternativeLabel: false, last: true },
        style: { paddingRight: d.sm },
      },
    ],
  });
  // Icon→label gap on the iconContainer slot: paddingRight in row layouts;
  // vertical alternativeLabel flips the gap to paddingLeft (master 8px).
  // alternativeLabel paddingRight:0 stays frozen (higher-specificity class).
  addRootOverride(
    enhanced.components,
    'MuiStepLabel',
    {
      paddingRight: d.sm,
      variants: [
        {
          props: { orientation: 'vertical', alternativeLabel: true },
          style: { paddingLeft: d.sm },
        },
      ],
    },
    'iconContainer',
  );
  addRootOverride(enhanced.components, 'MuiToolbar', {
    // Gutter inline pad (steps, incl the sm-breakpoint bump); dense + regular bar
    // min-heights (raw px). Regular mirrors theme.mixins.toolbar's responsive
    // shape (portrait / landscape / sm-up) as styleOverrides — the mixin itself
    // stays untouched, so mixins.toolbar offset math keeps master.
    variants: [
      {
        props: { disableGutters: false },
        style: {
          paddingInline: d.lg,
          [(theme as unknown as { breakpoints: { up: (key: string) => string } }).breakpoints.up(
            'sm',
          )]: {
            paddingInline: d.xl,
          },
        },
      },
      { props: { variant: 'dense' }, style: { minHeight: '48px' } },
      {
        props: { variant: 'regular' },
        style: {
          minHeight: '56px',
          // Master nests this under breakpoints.up('xs') — a no-op (min-width:0)
          // wrapper; emitted flat so the emit-table readback can resolve it.
          '@media (orientation: landscape)': { minHeight: '48px' },
          [(theme as unknown as { breakpoints: { up: (key: string) => string } }).breakpoints.up(
            'sm',
          )]: {
            minHeight: '64px',
          },
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiFab', {
    // Circular size = raw px per size (button-like action). Scoped to circular so
    // the extended variant (auto width + literal height) stays frozen at master.
    variants: [
      { props: { variant: 'circular', size: 'small' }, style: { width: '40px', height: '40px' } },
      { props: { variant: 'circular', size: 'medium' }, style: { width: '48px', height: '48px' } },
      { props: { variant: 'circular', size: 'large' }, style: { width: '56px', height: '56px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiPaginationItem', {
    // Item box: min-width raw px + inline pad/inter-item gap steps per size on
    // every item (ellipsis shares master's values; small's 1px margin is
    // sub-step — frozen). Button items get height through one --_height var so
    // the pill radius derives as height/2 (master pins per-size radius literals
    // that would go stale as the heights move); ellipsis keeps auto height.
    variants: [
      { props: { size: 'small' }, style: { minWidth: '26px', paddingInline: d.xxs } },
      {
        props: { size: 'medium' },
        style: { minWidth: '32px', paddingInline: d.xs, marginInline: d.xxs },
      },
      {
        props: { size: 'large' },
        style: { minWidth: '40px', paddingInline: d.sm, marginInline: d.xxs },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'small',
        style: {
          '--_height': '26px',
          height: 'var(--_height)',
          borderRadius: 'calc(var(--_height) / 2)',
        },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'medium',
        style: {
          '--_height': '32px',
          height: 'var(--_height)',
          borderRadius: 'calc(var(--_height) / 2)',
        },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'large',
        style: {
          '--_height': '40px',
          height: 'var(--_height)',
          borderRadius: 'calc(var(--_height) / 2)',
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiSnackbarContent', {
    // No size axis: root padding (block/inline steps).
    padding: `${d.xs} ${d.lg}`,
  });
  addRootOverride(enhanced.components, 'MuiSnackbarContent', { paddingBlock: d.sm }, 'message');
  // Inline-start inset only; the -8px flush end pull is an edge offset (frozen).
  addRootOverride(enhanced.components, 'MuiSnackbarContent', { paddingLeft: d.lg }, 'action');
  addRootOverride(enhanced.components, 'MuiBottomNavigation', {
    height: '56px',
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigationAction', {
    // Inline pad = step; per-item width clamps = raw px (sizing). Icon-only
    // centering paddingTop = step, with master's no-label zero re-asserted
    // (this emission lands after it in the cascade and would clobber it).
    // Selected label type shift (12→14) stays frozen — state, not a size axis.
    paddingInline: d.md,
    minWidth: '80px',
    maxWidth: '168px',
    variants: [
      {
        // Net master condition (pT14 unless the no-label rule zeroes it) — one
        // matcher, so master's paddingTop:0 no-label state stays untouched.
        props: ({
          ownerState,
        }: {
          ownerState: {
            showLabel?: boolean | undefined;
            selected?: boolean | undefined;
            label?: unknown;
          };
        }) => !ownerState.showLabel && !ownerState.selected && Boolean(ownerState.label),
        style: { paddingTop: d.md },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiDialogTitle', {
    padding: `${d.lg} ${d.xl}`,
  });
  addRootOverride(enhanced.components, 'MuiDialogContent', {
    // Scoped to dividers:false so master's distinct dividers padding (16 24)
    // stays untouched — an unconditional root padding would clobber it (and a
    // knob edit would too).
    variants: [{ props: { dividers: false }, style: { padding: `${d.lg} ${d.xl}` } }],
  });
  addRootOverride(enhanced.components, 'MuiDialogActions', {
    // Root inset + inter-button gap (master 8/8 — CardActions' gap twin).
    padding: d.sm,
    variants: [
      {
        props: ({ ownerState }: { ownerState: { disableSpacing?: boolean | undefined } }) =>
          !ownerState.disableSpacing,
        style: { '& > :not(style) ~ :not(style)': { marginLeft: d.sm } },
      },
    ],
  });
  const bp = (
    enhanced as unknown as {
      breakpoints: {
        values: Record<string, number>;
        unit: string;
        down: (width: number) => string;
      };
    }
  ).breakpoints;
  addRootOverride(
    enhanced.components,
    'MuiDialog',
    {
      // Paper margin + every "100% minus margin" viewport calc derive from ONE
      // private var so the knob and the offset math can't desync. Media-query
      // GUARDS (down(width + 32*2)) stay at master's boundaries — media queries
      // can't read vars; only the applied maxWidth co-varies. Every emission is
      // scoped fullScreen:false — master's fullScreen state zeroes all of these
      // and must stay untouched (an unscoped rule lands later in the cascade
      // and would clobber it).
      '--_dialogMargin': d.xxl,
      variants: [
        { props: { fullScreen: false }, style: { margin: 'var(--_dialogMargin)' } },
        {
          props: { scroll: 'paper', fullScreen: false },
          style: { maxHeight: 'calc(100% - var(--_dialogMargin) * 2)' },
        },
        {
          props: ({
            ownerState,
          }: {
            ownerState: { maxWidth?: string | false | undefined; fullScreen?: boolean | undefined };
          }) => !ownerState.maxWidth && !ownerState.fullScreen,
          style: { maxWidth: 'calc(100% - var(--_dialogMargin) * 2)' },
        },
        {
          props: { maxWidth: 'xs', scroll: 'body', fullScreen: false },
          style: {
            [bp.down(Math.max(bp.values.xs, 444) + 32 * 2)]: {
              maxWidth: 'calc(100% - var(--_dialogMargin) * 2)',
            },
          },
        },
        ...Object.keys(bp.values)
          .filter((maxWidth) => maxWidth !== 'xs')
          .map((maxWidth) => ({
            props: { maxWidth, scroll: 'body', fullScreen: false },
            style: {
              [bp.down(bp.values[maxWidth] + 32 * 2)]: {
                maxWidth: 'calc(100% - var(--_dialogMargin) * 2)',
              },
            },
          })),
        {
          props: { fullWidth: true, fullScreen: false },
          style: { width: 'calc(100% - var(--_dialogMargin) * 2)' },
        },
      ],
    },
    'paper',
  );
  addRootOverride(enhanced.components, 'MuiListItemButton', {
    // Density axis is the `dense` boolean; inline pad only when gutters are on.
    variants: [
      { props: { dense: false }, style: { paddingBlock: d.sm } },
      { props: { dense: true }, style: { paddingBlock: d.xxs } },
      { props: { disableGutters: false }, style: { paddingInline: d.lg } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiCardContent', {
    // No size axis: base padding + larger last-child bottom padding.
    padding: d.lg,
    '&:last-child': { paddingBottom: d.xl },
  });
  addRootOverride(enhanced.components, 'MuiCardActions', {
    // No size axis: root padding + inter-child gap (spacing variant) = steps.
    padding: d.sm,
    variants: [
      {
        props: { disableSpacing: false },
        style: { '& > :not(style) ~ :not(style)': { marginLeft: d.sm } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiCardHeader', {
    // Root padding = step (no size axis).
    padding: d.lg,
  });
  // Avatar→content gap on the avatar slot.
  addRootOverride(enhanced.components, 'MuiCardHeader', { marginRight: d.lg }, 'avatar');
  // Action negative pulls counteract the control's own box; scale with density.
  addRootOverride(
    enhanced.components,
    'MuiCardHeader',
    {
      marginBlock: `calc(${d.xxs} * -1)`,
      marginRight: `calc(${d.sm} * -1)`,
    },
    'action',
  );
  addRootOverride(
    enhanced.components,
    'MuiSelect',
    {
      minHeight: 'auto',
    },
    'select',
  );
  addRootOverride(enhanced.components, 'MuiAlert', {
    // No size axis: root padding (block/inline steps).
    paddingBlock: d.xs,
    paddingInline: d.lg,
  });
  // Icon→message gap on the icon slot (child element).
  addRootOverride(enhanced.components, 'MuiAlert', { marginRight: d.md }, 'icon');
  // Chip: height + avatar/deleteIcon sizes are preset-local vars (raw px per
  // sizing policy) so the derived centering margins on the child slots track
  // knob edits live; icon/label stay plain. Rules land on the slot master
  // defines them on, winning by cascade order at equal specificity (master:
  // height 32/24, avatar 24/18, deleteIcon 22/16, icon 18 small-only).
  // --_height sits on the root so the child slots inherit it.
  addRootOverride(enhanced.components, 'MuiChip', {
    variants: [
      { props: { size: 'medium' }, style: { '--_height': '32px', height: 'var(--_height)' } },
      { props: { size: 'small' }, style: { '--_height': '24px', height: 'var(--_height)' } },
    ],
  });
  // Label inline padding = density steps, unified per size on the label slot.
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      variants: [
        { props: { size: 'medium' }, style: { paddingInline: d.md } },
        { props: { size: 'small' }, style: { paddingInline: d.sm } },
      ],
    },
    'label',
  );
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      variants: [
        {
          props: { size: 'medium' },
          style: {
            '--_avatarSize': '24px',
            width: 'var(--_avatarSize)',
            height: 'var(--_avatarSize)',
            // center within the chip: (height - avatar) / 2
            marginLeft: 'calc(var(--_height) / 2 - var(--_avatarSize) / 2)',
          },
        },
        {
          props: { size: 'small' },
          style: {
            '--_avatarSize': '18px',
            width: 'var(--_avatarSize)',
            height: 'var(--_avatarSize)',
            marginLeft: 'calc(var(--_height) / 2 - var(--_avatarSize) / 2)',
          },
        },
      ],
    },
    'avatar',
  );
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      variants: [
        { props: { size: 'medium' }, style: { fontSize: '24px' } },
        { props: { size: 'small' }, style: { fontSize: '18px' } },
      ],
    },
    'icon',
  );
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      variants: [
        {
          props: { size: 'medium' },
          style: {
            '--_deleteIconSize': '22px',
            fontSize: 'var(--_deleteIconSize)',
            // center within the chip: (height - delete icon) / 2
            marginRight: 'calc(var(--_height) / 2 - var(--_deleteIconSize) / 2)',
          },
        },
        {
          props: { size: 'small' },
          style: {
            '--_deleteIconSize': '16px',
            fontSize: 'var(--_deleteIconSize)',
            marginRight: 'calc(var(--_height) / 2 - var(--_deleteIconSize) / 2)',
          },
        },
      ],
    },
    'deleteIcon',
  );
  addRootOverride(enhanced.components, 'MuiAccordionSummary', {
    // Collapsed min-height raw px; inline padding = step.
    minHeight: '48px',
    padding: `0 ${d.lg}`,
    variants: [
      {
        props: ({
          ownerState,
        }: {
          ownerState: AccordionSummaryOwnerState & { disableGutters?: boolean | undefined };
        }) => !ownerState.disableGutters,
        // Re-assert expanded min-height (master literal wins by specificity else).
        style: { [`&.${accordionSummaryClasses.expanded}`]: { minHeight: '64px' } },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiAccordionSummary',
    {
      // Content block margin reduces with min-height (else it binds header height).
      marginBlock: d.md,
      variants: [
        {
          props: ({
            ownerState,
          }: {
            ownerState: AccordionSummaryOwnerState & { disableGutters?: boolean | undefined };
          }) => !ownerState.disableGutters,
          style: { [`&.${accordionSummaryClasses.expanded}`]: { marginBlock: d.lg } },
        },
      ],
    },
    'content',
  );
  addRootOverride(enhanced.components, 'MuiAccordionDetails', {
    // Split from shorthand so each edge is its own knob (top differs from bottom).
    paddingBlockStart: d.sm,
    paddingBlockEnd: d.lg,
    paddingInline: d.lg,
  });
  // MUI X DataGrid — rationale in enhanceCompactDensity; mirrored structure.
  addDefaultProps(enhanced.components, 'MuiDataGrid', {
    rowHeight: 40,
    columnHeaderHeight: 40,
  });
  // Cell/header inline inset (master 0 10px) + edit input aligned to the same
  // step (master 0 16px — upstream mismatch makes the value jump on edit entry).
  addRootOverride(enhanced.components, 'MuiDataGrid', { paddingInline: d.md }, 'cell');
  addRootOverride(enhanced.components, 'MuiDataGrid', { paddingInline: d.md }, 'columnHeader');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { '& input': { paddingInline: d.md } },
    'editInputCell',
  );
  // Header title↔sort/filter icon gap (master 2px = 0.25 spacing unit).
  addRootOverride(enhanced.components, 'MuiDataGrid', { gap: d.xxs }, 'columnHeaderTitleContainer');
  // Toolbar: min-height = raw px (sizing); inner padding + item gap = steps.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '52px', padding: d.sm, gap: d.xxs },
    'toolbar',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { marginInline: d.xs }, 'toolbarDivider');
  addRootOverride(enhanced.components, 'MuiDataGrid', { marginInline: d.xs }, 'toolbarLabel');
  // Footer: min-height = raw px (sizing); row/selection count gutters = steps.
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '52px' }, 'footerContainer');
  addRootOverride(enhanced.components, 'MuiDataGrid', { marginInline: d.lg }, 'rowCount');
  addRootOverride(enhanced.components, 'MuiDataGrid', { marginInline: d.lg }, 'selectedRowCount');
  // Gap between row action icon buttons (master 8px).
  addRootOverride(enhanced.components, 'MuiDataGrid', { gridGap: d.sm }, 'actionsCell');
  // Filter panel (portal). Content padding/gap nest under the `panel` slot —
  // upstream resolves the `panelContent` styleOverrides key on BOTH the filter
  // content wrapper and the panel popup shell (GridPanel's inner slot), so a
  // direct key emission would pad the shell too.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { '& .MuiDataGrid-panelContent': { padding: `${d.xl} ${d.md} ${d.lg} ${d.sm}`, gap: d.xl } },
    'panel',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { padding: d.sm }, 'panelFooter');
  // Gap between the filter form's column/operator/value inputs (master su(1.5)).
  addRootOverride(enhanced.components, 'MuiDataGrid', { gap: d.md }, 'filterForm');
  // Filter field widths (sizing → raw px; master 75/150/150/190).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minWidth: '75px' },
    'filterFormLogicOperatorInput',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '150px' }, 'filterFormColumnInput');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { width: '150px' },
    'filterFormOperatorInput',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '190px' }, 'filterFormValueInput');
  // Columns management panel paddings (master su(0.5,1.5) / su(1.5,2) /
  // su(1,1,1,1.5) / su(1,0)). The per-row checkbox↔label gap targets the
  // Material class — the grid's FormControlLabel wrapper is slot:'internal'
  // (no styleOverrides key of its own).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { padding: `${d.xs} ${d.md}`, '& .MuiFormControlLabel-root': { gap: d.xs } },
    'columnsManagement',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { padding: `${d.md} ${d.lg}` },
    'columnsManagementHeader',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { padding: `${d.sm} ${d.sm} ${d.sm} ${d.md}` },
    'columnsManagementFooter',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { paddingBlock: d.sm },
    'columnsManagementEmptyText',
  );
  // Column menu list min-width (sizing; master 248). Nested under `menu` — the
  // list is slot:'internal' and the menu portals outside the root, so the
  // root's child-class keys can't reach it.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { '& .MuiDataGrid-menuList': { minWidth: '248px' } },
    'menu',
  );
  // Toolbar quick filter expanded width (sizing; master 260). The expanded
  // state has no DOM hook — it's ownerState-only — so the width scopes via a
  // variants matcher; collapsed keeps upstream's var(--trigger-width).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { variants: [{ props: { expanded: true }, style: { width: '260px' } }] },
    'toolbarQuickFilterControl',
  );
  // Label↔action gap in the no-rows/no-columns overlays (master su(1)).
  addRootOverride(enhanced.components, 'MuiDataGrid', { gap: d.sm }, 'overlay');
  // Drag-ghost insets (master 0 12px; placeholder 0 6px — nested to outrank
  // upstream's `.row--dragging .rowReorderCellPlaceholder` rule).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { paddingInline: d.md },
    'columnHeader--dragging',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { paddingInline: d.md, '& .MuiDataGrid-rowReorderCellPlaceholder': { paddingInline: d.xs } },
    'row--dragging',
  );
  // Rowspan multi-select chip stack inset (master paddingTop 8; selector
  // mirrors upstream's aria-rowspan scoping to match its specificity).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    {
      '&[aria-rowspan]:not([aria-rowspan="1"]) .MuiDataGrid-multiSelectCell': { paddingTop: d.sm },
    },
    'cell',
  );
  // [Pro] Header-filter row insets (master 8/8/5; physical paddingRight matches
  // upstream so RTL flipping stays identical). The upstream densityCompact
  // conditional stays dormant — the grid's density prop is unset.
  addRootOverride(enhanced.components, 'MuiDataGrid', {
    '& .MuiDataGrid-columnHeader--filter': { paddingBlock: d.sm, paddingRight: d.xs },
  });
  // [Pro] Header-filter input margins (master su(0.5) / su(-0.25)).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { marginRight: d.xs, marginBottom: `calc(${d.xxs} * -1)` },
    'columnHeaderFilterInput',
  );
  // [Pro/Premium] Grouping indent: depth × multiplier × spacing unit (master 2).
  // Premium grouping cells read the var; Pro tree-data computes the same indent
  // in JS and bypasses it — upstream inconsistency, flagged as fix candidate.
  addRootOverride(enhanced.components, 'MuiDataGrid', {
    '--DataGrid-cellOffsetMultiplier': '2',
  });
  // [Pro/Premium] Group-toggle gutter: flex-basis = sizing raw px (master 28);
  // physical marginRight matches upstream (master su(2)).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { flexBasis: '28px', marginRight: d.lg },
    'treeDataGroupingCellToggle',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { flexBasis: '28px', marginRight: d.lg },
    'groupingCriteriaCellToggle',
  );
  // [Premium] Panel chrome sizing (raw px): sidebar/AI widths, the shared 52px
  // header rhythm (same trio as toolbar/footer), pivot/charts field rows and
  // drop zones (charts mirrors pivot — one decision, values never fork). Field
  // marginInlineStart (step) pulls the row off the sidebar edge so the hover
  // drag handle — absolutely pinned to the row's left edge — gets breathing room.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { width: '300px', minWidth: '260px', maxWidth: '400px' },
    'sidebar',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '52px' }, 'pivotPanelHeader');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { height: '32px', marginInlineStart: d.xs },
    'pivotPanelField',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '84px' },
    'pivotPanelAvailableFields',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '158px' }, 'pivotPanelSections');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '38px' },
    'pivotPanelPlaceholder',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '380px' }, 'aiAssistantPanel');
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '52px' }, 'aiAssistantPanelHeader');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { height: '32px', marginInlineStart: d.xs },
    'chartsPanelDataField',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '84px' },
    'chartsPanelDataAvailableFields',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '158px' },
    'chartsPanelDataSections',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '38px' },
    'chartsPanelDataPlaceholder',
  );
  // MUI X Tree View — indentation is an inline-style var on the tree root
  // (useTreeViewRootProps), unreachable from styleOverrides; the defaultProp is the
  // lever, and a string/number value passes through verbatim. `d.md` keeps it
  // dual-mode: a var ref under cssVariables (any prefix), raw px on static themes.
  addDefaultProps(enhanced.components, 'MuiRichTreeView', {
    itemChildrenIndentation: d.md,
  });
  addDefaultProps(enhanced.components, 'MuiSimpleTreeView', {
    itemChildrenIndentation: d.md,
  });
  // Row height rides upstream's own hook (content height: var(--TreeView-itemHeight,
  // unset)); sizing raw px. Master is unset (content-sized, about 32) — normal keeps it.
  addRootOverride(enhanced.components, 'MuiTreeItem', { '--TreeView-itemHeight': '32px' });
  // Longhands only — a padding shorthand would clobber upstream's paddingLeft depth
  // calc, so the calc is re-emitted with the step base instead.
  addRootOverride(
    enhanced.components,
    'MuiTreeItem',
    {
      paddingBlock: d.xxs,
      paddingRight: d.sm,
      paddingLeft: `calc(${d.sm} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
      gap: d.sm,
    },
    'content',
  );
  // MUI X Date/Time Pickers. Day geometry is JS constants (DAY_SIZE 36 / DAY_MARGIN 2)
  // baked into PickerDay's own vars AND raw into the weekday/week-number boxes and the
  // 6-week container math — one private var (on the DayCalendar root, which owns
  // every consumer; a DateCalendar copy would shadow it for descendants and break
  // the knob) drives them all (Dialog-margin pattern). Day margin (2px) stays
  // frozen — sub-step, and the scroll/positioning math reuses it.
  addRootOverride(enhanced.components, 'MuiDayCalendar', { '--_daySize': '36px' });
  addRootOverride(enhanced.components, 'MuiPickerDay', {
    '--PickerDay-size': 'var(--_daySize)',
  });
  // Weekday/week-number boxes: widths follow the day var; label heights raw.
  addRootOverride(
    enhanced.components,
    'MuiDayCalendar',
    { width: 'var(--_daySize)', height: '40px' },
    'weekDayLabel',
  );
  addRootOverride(
    enhanced.components,
    'MuiDayCalendar',
    { width: 'var(--_daySize)', height: 'var(--_daySize)' },
    'weekNumber',
  );
  addRootOverride(
    enhanced.components,
    'MuiDayCalendar',
    { width: 'var(--_daySize)', height: '40px' },
    'weekNumberLabel',
  );
  // 6-week container: master minHeight = (DAY_SIZE + 2*DAY_MARGIN) * 6 = 240.
  addRootOverride(
    enhanced.components,
    'MuiDayCalendar',
    { minHeight: 'calc((var(--_daySize) + 4px) * 6)' },
    'slideTransition',
  );
  addRootOverride(
    enhanced.components,
    'MuiDayCalendar',
    { minHeight: 'calc((var(--_daySize) + 4px) * 6)' },
    'loadingContainer',
  );
  // Calendar root: master 336×320 = header block + weekday row + 6 weeks / 7 day
  // columns + 40 slack. Raw per-preset (matches this preset's day/header math) — the
  // day var can't reach here (it lives on the DayCalendar DESCENDANT; an ancestor
  // copy would shadow the knob), so day-size knob edits don't reflow the root box.
  addRootOverride(enhanced.components, 'MuiDateCalendar', {
    height: '336px',
    // The PickerViewRoot base pins maxHeight at 336 — without moving it the comfort
    // height is clamped and the last weeks clip (overflow hidden).
    maxHeight: '336px',
    width: '320px',
  });
  // Calendar header: min/max pinned together (upstream pins both against a Safari
  // jump); spacing steps (master 12/4/24/12, label gap 6), height raw.
  addRootOverride(enhanced.components, 'MuiPickersCalendarHeader', {
    marginTop: d.md,
    marginBottom: d.xxs,
    paddingLeft: d.xl,
    paddingRight: d.md,
    minHeight: '40px',
    maxHeight: '40px',
  });
  addRootOverride(enhanced.components, 'MuiPickersCalendarHeader', { marginRight: d.xs }, 'label');
  // Year/month grid buttons (master 72×36) — sizing raw; the Year filler (last-row
  // spacer) mirrors the button box. Grid spacing: row gaps + block padding + the
  // 3-per-row columnGap ride steps (master 12/6/24 year, 16/8/24 month). Year's
  // paddingBlock and both columnGaps scope to the default 3-per-row variant — the
  // 4-per-row variant redefines those properties (padding '0 2px', columnGap 0) and
  // an unconditional emission would clobber it.
  addRootOverride(
    enhanced.components,
    'MuiYearCalendar',
    { width: '72px', height: '36px' },
    'button',
  );
  addRootOverride(
    enhanced.components,
    'MuiYearCalendar',
    { width: '72px', height: '36px' },
    'buttonFiller',
  );
  addRootOverride(enhanced.components, 'MuiYearCalendar', {
    rowGap: d.md,
    variants: [{ props: { yearsPerRow: 3 }, style: { paddingBlock: d.xs, columnGap: d.xl } }],
  });
  addRootOverride(
    enhanced.components,
    'MuiMonthCalendar',
    { width: '72px', height: '36px' },
    'button',
  );
  addRootOverride(enhanced.components, 'MuiMonthCalendar', {
    rowGap: d.lg,
    paddingBlock: d.sm,
    variants: [{ props: { monthsPerRow: 3 }, style: { columnGap: d.xl } }],
  });
  // Digital clocks: item padding steps (master 8 16 / 8); the 2px 4px item margin is
  // frozen — the scroll positioning math subtracts the first item's 4px in JS.
  addRootOverride(enhanced.components, 'MuiDigitalClock', { padding: `${d.sm} ${d.lg}` }, 'item');
  addRootOverride(enhanced.components, 'MuiMultiSectionDigitalClockSection', {
    width: '56px',
  });
  addRootOverride(
    enhanced.components,
    'MuiMultiSectionDigitalClockSection',
    { padding: d.sm, width: '48px' },
    'item',
  );
  // Pickers toolbar (master su(2,3)); scoped to portrait — landscape has its own
  // master padding (16) an unconditional emission would clobber.
  addRootOverride(enhanced.components, 'MuiPickersToolbar', {
    variants: [{ props: { pickerOrientation: 'portrait' }, style: { padding: `${d.lg} ${d.xl}` } }],
  });
  return enhanced;
}
