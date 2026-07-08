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

const edgeCorner = (nested: string, cssProp: string): DensityEmitRow => ({
  id: `MuiAccordion|root|base|${nested}|${cssProp}`,
  label: `Accordion · ${cssProp}`,
  isDensity: false,
  densityKey: null,
  target: { component: 'MuiAccordion', slot: 'root', props: null, nested, cssProp },
  values: {},
});

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
  // Edge radius — 4 corner members hidden behind the virtual knob below.
  edgeCorner('&:first-of-type', 'borderTopLeftRadius'),
  edgeCorner('&:first-of-type', 'borderTopRightRadius'),
  edgeCorner('&:last-of-type', 'borderBottomLeftRadius'),
  edgeCorner('&:last-of-type', 'borderBottomRightRadius'),
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

export const densityVirtualKnobs: DensityVirtualKnob[] = [
  {
    id: 'virtual:MuiAvatar:size',
    label: 'Avatar · size',
    group: 'Avatar',
    members: ['MuiAvatar|root|base||width', 'MuiAvatar|root|base||height'],
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
  {
    id: 'virtual:MuiAccordion:edgeRadius',
    label: 'Accordion · edge radius',
    group: 'Accordion',
    members: [
      'MuiAccordion|root|base|&:first-of-type|borderTopLeftRadius',
      'MuiAccordion|root|base|&:first-of-type|borderTopRightRadius',
      'MuiAccordion|root|base|&:last-of-type|borderBottomLeftRadius',
      'MuiAccordion|root|base|&:last-of-type|borderBottomRightRadius',
    ],
  },
  // The four per-placement offset margins (non-touch) collapse to one knob — arrow
  // doesn't change them (see Tooltip.js base styles), so one value drives all sides.
  {
    id: 'virtual:MuiTooltip:offset',
    label: 'Tooltip · tooltip · Offset',
    group: 'Tooltip',
    members: [
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="left"] &|marginInlineEnd',
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="right"] &|marginInlineStart',
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="top"] &|marginBottom',
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="bottom"] &|marginTop',
    ],
  },
];
