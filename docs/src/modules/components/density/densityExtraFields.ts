import type { DensityEmitRow } from './emitTable.generated';

/**
 * Override-only knobs: NOT emitted by any enhance*Density preset, so they have no
 * reflow default. Each produces a `styleOverride` only when the user fills the
 * input; `values` is left empty → blank placeholder. Kept OUT of the generated
 * table so `pnpm density:codegen` never rewrites or drops them.
 */

const radiusRow = (component: string, slot: string, label: string): DensityEmitRow => ({
  id: `${component}|${slot}|base||borderRadius`,
  label: `${label} · borderRadius`,
  isDensity: false,
  densityKey: null,
  target: { component, slot, props: null, nested: '', cssProp: 'borderRadius' },
  values: {},
});

// Per-size radius (Button splits by size like its padding/font-size do).
const radiusRowSized = (
  component: string,
  slot: string,
  label: string,
  size: 'small' | 'medium' | 'large',
): DensityEmitRow => ({
  id: `${component}|${slot}|size=${size}||borderRadius`,
  label: `${label} · borderRadius [size=${size}]`,
  isDensity: false,
  densityKey: null,
  target: { component, slot, props: { size }, nested: '', cssProp: 'borderRadius' },
  values: {},
});

// const edgeCorner = (nested: string, cssProp: string): DensityEmitRow => ({
//   id: `MuiAccordion|root|base|${nested}|${cssProp}`,
//   label: `Accordion · ${cssProp}`,
//   isDensity: false,
//   densityKey: null,
//   target: { component: 'MuiAccordion', slot: 'root', props: null, nested, cssProp },
//   values: {},
// });

// Un-varianted override-only row on a given slot (blank until the user fills it).
const slotRow = (
  component: string,
  slot: string,
  cssProp: string,
  label: string,
): DensityEmitRow => ({
  id: `${component}|${slot}|base||${cssProp}`,
  label,
  isDensity: false,
  densityKey: null,
  target: { component, slot, props: null, nested: '', cssProp },
  values: {},
});

export const densityExtraRows: DensityEmitRow[] = [
  radiusRowSized('MuiButton', 'root', 'Button', 'small'),
  radiusRowSized('MuiButton', 'root', 'Button', 'medium'),
  radiusRowSized('MuiButton', 'root', 'Button', 'large'),
  radiusRow('MuiTooltip', 'tooltip', 'Tooltip'),
  slotRow('MuiAlert', 'icon', 'fontSize', 'Alert · icon · fontSize'),
  slotRow('MuiAlert', 'message', 'paddingBlock', 'Alert · message · paddingBlock'),
  slotRow('MuiAlert', 'message', 'fontSize', 'Alert · message · fontSize'),
  slotRow('MuiAlert', 'action', 'paddingTop', 'Alert · action · paddingTop'),
  slotRow('MuiAlert', 'action', 'paddingLeft', 'Alert · action · paddingLeft'),
  slotRow('MuiAlert', 'action', 'marginRight', 'Alert · action · marginRight'),
  // Stepper flow gap — no master default (connectors span the space); one virtual
  // knob writes both containers (Stepper root + each Step root). columnGap, not
  // gap: it only spaces the horizontal (row-flex) layout — vertical steppers
  // stack on the row axis and stay untouched.
  slotRow('MuiStepper', 'root', 'columnGap', 'Stepper · columnGap'),
  slotRow('MuiStep', 'root', 'columnGap', 'Step · columnGap'),
  // alternativeLabel connector right edge — master: calc(50% + 20px); the Stepper
  // gap knob re-writes it (+ gap) via a linked write so the line clears the flow gap.
  {
    id: 'MuiStepConnector|root|alternativeLabel=true,orientation=horizontal||right',
    label: 'StepConnector · right [alternativeLabel, horizontal]',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiStepConnector',
      slot: 'root',
      props: { orientation: 'horizontal', alternativeLabel: true },
      nested: '',
      cssProp: 'right',
    },
    values: {},
  },
  // Control↔label gap (root is inline-flex). Shown in Checkbox/Radio/Switch families.
  slotRow('MuiFormControlLabel', 'root', 'gap', 'FormControlLabel · gap'),
  {
    id: 'MuiListItemIcon|root|base||minWidth',
    label: 'ListItemIcon · minWidth',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiListItemIcon',
      slot: 'root',
      props: null,
      nested: '',
      cssProp: 'minWidth',
    },
    values: {},
  },
  {
    id: 'MuiList|root|disablePadding=false||paddingInline',
    label: 'List · paddingInline',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiList',
      slot: 'root',
      props: { disablePadding: false },
      nested: '',
      cssProp: 'paddingInline',
    },
    values: {},
  },
  {
    id: 'MuiAccordion|root|base|&.Mui-expanded|margin',
    label: 'Accordion · expanded margin',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiAccordion',
      slot: 'root',
      props: null,
      nested: '&.Mui-expanded',
      cssProp: 'margin',
    },
    values: {},
  },
  // Select — placeholder field to keep the component visible in the selector
  {
    id: 'MuiSelect|select|base||paddingBlock',
    label: 'Select · select · paddingBlock',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiSelect',
      slot: 'select',
      props: null,
      nested: '',
      cssProp: 'paddingBlock',
    },
    values: {},
  },
  // Edge radius — 4 corner members hidden behind the virtual knob below.
  // edgeCorner('&:first-of-type', 'borderTopLeftRadius'),
  // edgeCorner('&:first-of-type', 'borderTopRightRadius'),
  // edgeCorner('&:last-of-type', 'borderBottomLeftRadius'),
  // edgeCorner('&:last-of-type', 'borderBottomRightRadius'),
];

/**
 * Virtual knob: one sidebar input that writes the SAME value to several member
 * field ids (which are hidden individually). Lets one control drive multiple CSS
 * targets without any change to `buildOverrides` — the members flow through the
 * normal edit loop. Members may be generated rows (Tab icon gap) or extra rows
 * (Accordion edge radius).
 */
export interface DensityVirtualKnob {
  id: string;
  label: string;
  /** family group key (matches a `densityGroups` key). */
  group: string;
  /** field ids this input writes to; all get the same value. */
  members: string[];
}

/**
 * Linked writes: committing the KEY row's knob ALSO writes a derived value to
 * the linked rows (hidden plumbing). `wrap` receives the RESOLVED CSS value
 * (density keys already expanded); the result lands as an ordinary mapping
 * entry, so canvas and export pick it up through the normal edit path. Clearing
 * the key row clears the linked rows.
 */
export interface DensityLinkedWrite {
  id: string;
  wrap: (resolvedValue: string) => string;
}

const negate = (v: string) => `calc(-1 * ${v})`;

export const densityLinkedWrites: Record<string, DensityLinkedWrite[]> = {
  // Stepper flow gap -> alternativeLabel connector right edge clears the gap.
  'MuiStepper|root|base||columnGap': [
    {
      id: 'MuiStepConnector|root|alternativeLabel=true,orientation=horizontal||right',
      wrap: (v) => `calc(50% + 20px + ${v})`,
    },
  ],
  // Switch gutter -> FormControlLabel pull (marginLeft/right = -gutter).
  'MuiSwitch|root|size=medium||--_pad': [
    {
      id: 'MuiSwitch|root|size=medium|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft',
      wrap: negate,
    },
    {
      id: 'MuiSwitch|root|size=medium|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight',
      wrap: negate,
    },
  ],
  'MuiSwitch|root|size=small||--_pad': [
    {
      id: 'MuiSwitch|root|size=small|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft',
      wrap: negate,
    },
    {
      id: 'MuiSwitch|root|size=small|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight',
      wrap: negate,
    },
  ],
};

export const densityVirtualKnobs: DensityVirtualKnob[] = [
  {
    id: 'virtual:MuiAvatar:size',
    label: 'Avatar · size',
    group: 'Avatar',
    members: ['MuiAvatar|root|base||width', 'MuiAvatar|root|base||height'],
  },
  {
    id: 'virtual:MuiStepper:gap',
    label: 'Stepper · column gap',
    group: 'Stepper',
    members: ['MuiStepper|root|base||columnGap', 'MuiStep|root|base||columnGap'],
  },
  // Icon→label gap: paddingRight in row layouts, paddingLeft when vertical
  // alternativeLabel flips the icon to the label's right — one knob, one gap.
  {
    id: 'virtual:MuiStepLabel:labelSpacing',
    label: 'StepLabel · iconContainer · row label spacing',
    group: 'Stepper',
    members: [
      'MuiStepLabel|iconContainer|base||paddingRight',
      'MuiStepLabel|iconContainer|alternativeLabel=true,orientation=vertical||paddingLeft',
    ],
  },
  {
    id: 'virtual:MuiBadge:standardSize',
    label: 'Badge · badge · size [variant=standard]',
    group: 'Badge',
    members: [
      'MuiBadge|badge|variant=standard||minWidth',
      'MuiBadge|badge|variant=standard||height',
    ],
  },
  {
    id: 'virtual:MuiBadge:dotSize',
    label: 'Badge · badge · size [variant=dot]',
    group: 'Badge',
    members: ['MuiBadge|badge|variant=dot||minWidth', 'MuiBadge|badge|variant=dot||height'],
  },
  {
    id: 'virtual:MuiTab:iconGapBlock',
    label: 'Tab · icon gap (block)',
    group: 'Tabs',
    members: [
      'MuiTab|root|fn:8b76di|& > .MuiTab-icon|marginBottom', // icon-top layout
      'MuiTab|root|fn:ekzzmq|& > .MuiTab-icon|marginTop', // icon-bottom layout
    ],
  },
  {
    id: 'virtual:MuiTab:iconGapInline',
    label: 'Tab · icon gap (inline)',
    group: 'Tabs',
    members: [
      'MuiTab|root|fn:s0l8zx|& > .MuiTab-icon|marginRight', // icon-start layout
      'MuiTab|root|fn:8au602|& > .MuiTab-icon|marginLeft', // icon-end layout
    ],
  },
  // {
  //   id: 'virtual:MuiAccordion:edgeRadius',
  //   label: 'Accordion · edge radius',
  //   group: 'Accordion',
  //   members: [
  //     'MuiAccordion|root|base|&:first-of-type|borderTopLeftRadius',
  //     'MuiAccordion|root|base|&:first-of-type|borderTopRightRadius',
  //     'MuiAccordion|root|base|&:last-of-type|borderBottomLeftRadius',
  //     'MuiAccordion|root|base|&:last-of-type|borderBottomRightRadius',
  //   ],
  // },
  // The four per-placement offset margins (non-touch) collapse to one knob — arrow
  // doesn't change them (see Tooltip.js base styles), so one value drives all sides.
  {
    id: 'virtual:MuiTooltip:offset',
    label: 'Tooltip · tooltip · margin offset',
    group: 'Tooltip',
    members: [
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="left"] &|marginInlineEnd',
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="right"] &|marginInlineStart',
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="top"] &|marginBottom',
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="bottom"] &|marginTop',
    ],
  },
];
