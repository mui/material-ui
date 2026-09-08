import { Claim } from './densityAnnotations';

/**
 * What to measure on each family, and what the preset authored for it. Every
 * entry is cross-checked against the emit table, so a `token` is the expression
 * `enhanceDensity` actually writes — never a private `--_*` var, and left off
 * entirely when the authored value is a composite of them.
 *
 * A spec is a function of the toolbar's values, because some rows only exist
 * under one variant.
 */
export const DENSITY_ANNOTATIONS: Record<
  string,
  (values: Record<string, string | boolean>) => Claim[]
> = {
  Accordion: () => [
    {
      on: '.MuiAccordionSummary-root',
      aspect: 'touch-target',
      token: 'touch-target',
      label: 'Summary',
    },
    {
      on: '.MuiAccordionSummary-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'x-small',
      label: 'Summary',
    },
    {
      on: '.MuiAccordionSummary-content',
      aspect: 'gap',
      token: 'x-small',
      label: 'Summary content',
    },
    {
      on: '.MuiAccordionDetails-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      label: 'Details',
    },
    // `xx-small` on top, `small` underneath — one claim per side, each
    // carrying the expression the preset authored for that band.
    {
      on: '.MuiAccordionDetails-root',
      aspect: 'padding',
      side: 'top',
      token: 'xx-small',
      label: 'Details',
    },
    {
      on: '.MuiAccordionDetails-root',
      aspect: 'padding',
      side: 'bottom',
      token: 'small',
      label: 'Details',
    },
  ],
  Alert: () => [
    { on: '.MuiAlert-root', aspect: 'padding', axis: 'inline', token: 'small', label: 'Alert' },
    // The three block paddings all sit on the alert's one row: the root's comb
    // keeps the row's centre, and the slot paddings fan out as diagonals above
    // and below it — three labels, one connector shape each, no shared rail.
    {
      on: '.MuiAlert-root',
      aspect: 'padding',
      axis: 'block',
      token: 'x-small',
      label: 'Alert',
      route: { gutter: 'left' },
    },
    { on: '.MuiAlert-root', aspect: 'gap', token: 'x-small', label: 'Alert' },
    // `1.1lh` off the alert's own line-height, not a scale step — the icon box
    // reflows with it because the severity svg is `fontSize="inherit"`.
    {
      on: '.MuiAlert-icon',
      aspect: 'icon',
      token: '1.1lh',
      label: 'Icon',
      route: { gutter: 'left', shift: -32, line: 'diagonal' },
    },
    // The slot paddings report to the empty bottom gutter; `at` picks where
    // along each strip the spine drops — the message's slides right (0.85) so
    // the crossing falls in the blank space past the sentence.
    {
      on: '.MuiAlert-icon',
      aspect: 'padding',
      axis: 'block',
      token: '0.75 × spacing',
      label: 'Icon',
      route: { gutter: 'bottom' },
    },
    {
      on: '.MuiAlert-message',
      aspect: 'padding',
      axis: 'block',
      token: '0.875 × spacing',
      label: 'Message',
      route: { gutter: 'bottom', at: 0.85 },
    },
    // Only exists because of `onClose`; sized by a defaultProp, not a style override.
    {
      on: '.MuiAlert-action .MuiIconButton-root',
      aspect: 'touch-target',
      token: 'touch-target',
      outlined: true,
      label: 'Close button',
    },
  ],
  Autocomplete: (values) => {
    // Every option carries a beam — the point is that each row hits the
    // target. The space claims read off one sample row; they are identical on
    // every row, and three copies would pile onto the same labels.
    const sample = '.MuiAutocomplete-option:nth-of-type(2)';
    const annotations: Claim[] = [
      {
        on: sample,
        aspect: 'touch-target',
        token: 'touch-target',
        label: 'Option',
        route: { gutter: 'left' },
      },
      {
        on: sample,
        aspect: 'padding',
        axis: 'inline',
        token: 'x-small',
        label: 'Option',
        route: { gutter: 'bottom' },
      },
      {
        on: sample,
        aspect: 'padding',
        axis: 'block',
        token: 'xx-small',
        label: 'Option',
        route: { gutter: 'right' },
      },
      // The input's own interactive box. No token: the preset composes this
      // height from private vars.
      {
        on: '.MuiOutlinedInput-root',
        aspect: 'touch-target',
        text: 'OutlinedInput',
        label: 'Input root',
        route: { gutter: 'right' },
      },
      // A medium IconButton box (no size prop) — a width, read against the top.
      {
        on: '.MuiAutocomplete-popupIndicator',
        aspect: 'touch-target',
        token: 'touch-target',
        label: 'Popup indicator',
        route: { gutter: 'top' },
      },
    ];
    if (values.multiple === true) {
      annotations.push(
        {
          on: '.MuiAutocomplete-tag',
          aspect: 'touch-target',
          token: 'touch-target - x-small',
          text: "Chip size='small'",
          label: 'Tag',
        },
        // `margin: 1px` on every side — one ring, led from the top band.
        {
          on: '.MuiAutocomplete-tag',
          aspect: 'margin',
          axis: 'all',
          label: 'Tag',
          route: { gutter: 'top' },
        },
      );
    }
    return annotations;
  },
  // The only live row: `width`/`height` off one private var, which resolves to
  // the interactive box. The root `fontSize` is the letter's type size, not an icon.
  Avatar: () => [
    { on: '.MuiAvatar-root', aspect: 'touch-target', token: 'touch-target', label: 'Avatar' },
  ],
  Badge: (values) => [
    // The anchor. Outlining it is what makes the badge read as hanging off a
    // control rather than floating beside a stray glyph — and the 32px box is
    // the shared-density touch target, not decoration.
    {
      on: '.MuiIconButton-root',
      aspect: 'touch-target',
      token: 'touch-target',
      outlined: true,
      label: 'Button',
    },
    // Not `root`: the dashed outline is what makes a 20px chip floating over an
    // icon legible as the box being measured.
    {
      on: '.MuiBadge-badge',
      aspect: 'touch-target',
      token: values.variant === 'dot' ? 'spacing' : '2.5 × spacing',
      outlined: true,
      label: 'Badge',
    },
    // The dot has no padding at all — master zeroes it and the preset emits none.
    ...(values.variant === 'dot'
      ? []
      : [
          {
            on: '.MuiBadge-badge',
            aspect: 'padding' as const,
            axis: 'inline' as const,
            token: '0.75 × spacing',
            label: 'Badge',
          },
        ]),
  ],
  BottomNavigation: () => [
    // Not `root`: the bar paints nothing of its own, so the dashed outline is
    // the only thing showing which box the 48px belongs to.
    {
      on: '.MuiBottomNavigation-root',
      aspect: 'touch-target',
      token: 'xx-large',
      outlined: true,
      label: 'Bar',
      route: { gutter: 'left' },
    },
    // One sample action carries the space claims — three identical copies
    // would pile onto the same labels.
    {
      on: '.MuiBottomNavigationAction-root:nth-of-type(2)',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      label: 'Action',
    },
    // Icon over label — a row gap, not a column one.
    {
      on: '.MuiBottomNavigationAction-root:nth-of-type(2)',
      aspect: 'gap',
      token: 'xx-small',
      label: 'Action',
      route: { gutter: 'right' },
    },
  ],
  // The separator's own margin is zeroed, so the list's gap is the only thing
  // spacing the crumbs — and the same step pads each crumb from the inside.
  Breadcrumbs: () => [
    // The gap and the crumb padding are the same step — opposite gutters, so
    // two identical captions never sit side by side. Both boundaries of the
    // first separator are shown: crumb->separator and separator->crumb.
    {
      on: '.MuiBreadcrumbs-ol',
      aspect: 'gap',
      token: 'x-small',
      label: 'Ol',
      route: { gutter: 'top', shift: -40 },
    },
    {
      on: '.MuiBreadcrumbs-ol',
      aspect: 'gap',
      after: 1,
      token: 'x-small',
      label: 'Ol',
      route: { gutter: 'top', shift: 40 },
    },
    {
      on: '.MuiBreadcrumbs-ol li:first-child a',
      aspect: 'padding',
      axis: 'inline',
      token: 'x-small',
      label: 'Crumb link',
      route: { gutter: 'bottom', shift: -40 },
    },
    {
      on: '.MuiBreadcrumbs-ol li:nth-child(3) a',
      aspect: 'padding',
      axis: 'inline',
      token: 'x-small',
      label: 'Crumb link',
      route: { gutter: 'bottom', shift: 40 },
    },
  ],
  Button: (values) => {
    const height = {
      small: 'touch-target - x-small',
      medium: 'touch-target',
      large: 'touch-target + small',
    }[values.size as string];
    const inline = { small: 'small', medium: 'medium', large: 'large' }[values.size as string];
    return [
      {
        on: '.MuiButton-root',
        aspect: 'touch-target',
        token: height,
        label: 'Root',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiButton-root',
        aspect: 'padding',
        axis: 'inline',
        token: inline,
        label: 'Root',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiButton-root',
        aspect: 'gap',
        token: 'x-small',
        label: 'Root',
        route: { gutter: 'top' },
      },
      {
        on: '.MuiButton-startIcon',
        aspect: 'icon',
        token: '0.8lh',
        label: 'Start icon',
        route: { gutter: 'left', shift: 40, line: 'diagonal' },
      },
      // The icon-only box: same size ladder as the Button's own height.
      {
        on: '.MuiIconButton-root',
        aspect: 'touch-target',
        token: height,
        outlined: true,
        label: 'Icon button',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiIconButton-root svg',
        aspect: 'icon',
        token: 'icon-target',
        label: 'Icon button',
        route: { gutter: 'top' },
      },
    ];
  },
  Card: () => [
    // `padding: medium` on every side — one ring, one diagonal up.
    {
      on: '.MuiCardHeader-root',
      aspect: 'padding',
      axis: 'all',
      token: 'medium',
      label: 'Header',
      route: { gutter: 'top', shift: 40, line: 'diagonal' },
    },
    { on: '.MuiCardHeader-root', aspect: 'gap', token: 'small', label: 'Header' },
    // Negative: the action is pulled back out of the header's own padding.
    {
      on: '.MuiCardHeader-action',
      aspect: 'margin',
      axis: 'inline',
      token: '-x-small',
      label: 'Header action',
    },
    {
      on: '.MuiCardHeader-action',
      aspect: 'margin',
      axis: 'block',
      token: '-xx-small',
      label: 'Header action',
    },
    // The whole ring, one label: a single line leads from the right band.
    {
      on: '.MuiCardContent-root',
      aspect: 'padding',
      axis: 'all',
      token: 'medium',
      label: 'Content',
      route: { gutter: 'right', line: 'diagonal' },
    },
    // `padding: medium` with `paddingTop: 0` — only the bottom band is live.
    {
      on: '.MuiCardActions-root',
      aspect: 'padding',
      axis: 'block',
      token: 'medium',
      label: 'Actions',
    },
    {
      on: '.MuiCardActions-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      label: 'Actions',
      route: { gutter: 'bottom', shift: -175 },
    },
    { on: '.MuiCardActions-root', aspect: 'gap', token: 'x-small', label: 'Actions' },
  ],
  Checkbox: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiCheckbox-root',
        aspect: 'touch-target',
        token: small ? 'touch-target - x-small' : 'touch-target',
        label: 'Checkbox',
      },
      // The preset sizes the glyph `fontSize: iconTarget`, so `medium` names it.
      {
        on: '.MuiCheckbox-root',
        aspect: 'icon',
        token: small ? 'icon-target - 0.25 × spacing' : 'icon-target',
        label: 'Checkbox icon',
        route: { gutter: 'top' },
      },
    ];
  },
  Chip: (values) => {
    const small = values.size === 'small';
    return [
      // The two beams take opposite sides: the chip's own on the right, the
      // avatar's (nested, with ties) on the left.
      {
        on: '.MuiChip-root',
        aspect: 'touch-target',
        token: small ? 'touch-target - xx-small' : 'touch-target',
        label: 'Chip',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiChip-root',
        aspect: 'padding',
        axis: 'inline',
        token: small ? 'x-small' : 'small',
        label: 'Chip',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiChip-root',
        aspect: 'gap',
        token: small ? 'xx-small' : 'x-small',
        label: 'Chip',
        route: { gutter: 'top' },
      },
      // Two classes deep, so it beats the Avatar root's own 32px box.
      {
        on: '.MuiChip-avatar',
        aspect: 'touch-target',
        token: small ? 'touch-target - xx-small - x-small' : 'touch-target - x-small',
        label: 'Avatar',
        route: { gutter: 'left' },
      },
      // Same authored size as the avatar: the child box off the chip's height.
      {
        on: '.MuiChip-deleteIcon',
        aspect: 'icon',
        token: small ? 'touch-target - xx-small - x-small' : 'touch-target - x-small',
        label: 'Delete icon',
        route: { gutter: 'top', shift: 60 },
      },
    ];
  },
  Dialog: () => [
    // `medium` on the left, `small` on the right — one claim per side, each
    // carrying the expression the preset authored for that band.
    {
      on: '.MuiDialogTitle-root',
      aspect: 'padding',
      side: 'left',
      token: 'medium',
      label: 'Title',
    },
    {
      on: '.MuiDialogTitle-root',
      aspect: 'padding',
      side: 'right',
      token: 'small',
      label: 'Title',
    },
    {
      on: '.MuiDialogTitle-root',
      aspect: 'padding',
      axis: 'block',
      token: 'small',
      label: 'Title',
    },
    {
      on: '.MuiDialogTitle-root .MuiIconButton-root',
      aspect: 'touch-target',
      token: 'touch-target',
      label: 'Close button',
    },
    // Block padding is 0, so the inline pair is the only live one. The spine
    // crosses at 0.97 — under the text, through the content's blank bottom.
    {
      on: '.MuiDialogContent-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      label: 'Content',
      // The crossing stays under the text; the label rides up to the row's middle.
      route: { gutter: 'left', at: 0.97, shift: -44 },
    },
    // `padding: medium` on every side — one ring, one line to the left.
    {
      on: '.MuiDialogActions-root',
      aspect: 'padding',
      axis: 'all',
      token: 'medium',
      label: 'Actions',
      route: { gutter: 'left', line: 'diagonal' },
    },
    { on: '.MuiDialogActions-root', aspect: 'gap', token: 'small', label: 'Actions' },
  ],
  // Three sizes, three different expressions for one box — the only thing this
  // family emits beyond a `minHeight: 0` reset.
  Fab: (values) => [
    {
      on: '.MuiFab-root',
      aspect: 'touch-target',
      token: {
        small: 'large + small',
        medium: 'touch-target + x-small',
        large: 'xx-large + xx-small',
      }[values.size as string],
      label: 'Fab',
    },
  ],
  List: (values) => {
    const dense = values.dense === true;
    return [
      // `spacing(1)`, the base unit — not the `x-small` step that shares its
      // px. The spine drops at 0.85 — right of the gap label sharing the top.
      {
        on: '.MuiList-root',
        aspect: 'padding',
        axis: 'block',
        token: 'spacing',
        label: 'List',
        route: { gutter: 'top', at: 0.85 },
      },
      // Dense names the authored floor (`minHeight: touch-target - x-small`);
      // the box measures above it because the content outgrows 24px.
      {
        on: '.MuiListItem-root:nth-of-type(2) .MuiListItemButton-root',
        aspect: 'touch-target',
        token: dense ? 'touch-target - x-small' : 'touch-target',
        label: 'Item',
      },
      {
        on: '.MuiListItem-root:nth-of-type(2) .MuiListItemButton-root',
        aspect: 'padding',
        axis: 'block',
        token: 'xx-small',
        label: 'Item',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiListItem-root:nth-of-type(2) .MuiListItemButton-root',
        aspect: 'padding',
        axis: 'inline',
        token: dense ? 'x-small' : 'small',
        label: 'Item',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiListItem-root:nth-of-type(2) .MuiListItemButton-root',
        aspect: 'gap',
        token: 'x-small',
        label: 'Item',
        route: { gutter: 'top' },
      },
    ];
  },
  Menu: (values) => {
    const dense = values.dense === true;
    return [
      // `spacing(1)`, the base unit — not the `x-small` step that shares its
      // px. The spine drops at 0.85 — right of the gap label sharing the top.
      {
        on: '.MuiList-root',
        aspect: 'padding',
        axis: 'block',
        token: 'spacing',
        label: 'MenuList',
        route: { gutter: 'top', at: 0.85 },
      },
      // Dense replaces the floor with `auto`: the item is content-sized, so
      // there is no box to name.
      // Dense has no box to name at all — the preset sets `minHeight: auto`.
      ...(dense
        ? []
        : ([
            {
              on: '.MuiMenuItem-root:nth-of-type(2)',
              aspect: 'touch-target',
              token: 'touch-target',
              label: 'Item',
            },
          ] as Claim[])),
      {
        on: '.MuiMenuItem-root:nth-of-type(2)',
        aspect: 'padding',
        axis: 'block',
        token: 'xx-small',
        label: 'Item',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiMenuItem-root:nth-of-type(2)',
        aspect: 'padding',
        axis: 'inline',
        token: 'x-small',
        label: 'Item',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiMenuItem-root:nth-of-type(2)',
        aspect: 'gap',
        token: 'x-small',
        label: 'Item',
        route: { gutter: 'top' },
      },
      // Only dense sizes the glyph, and it rides the line box, not the scale.
      ...(dense
        ? ([
            {
              on: '.MuiMenuItem-root:nth-of-type(2) .MuiListItemIcon-root svg',
              aspect: 'icon',
              token: '0.8lh',
              label: 'Item icon',
            },
          ] as Claim[])
        : []),
    ];
  },
  Pagination: (values) => {
    const box = {
      small: 'touch-target - x-small',
      medium: 'touch-target',
      large: 'touch-target + small',
    }[values.size as string];
    return [
      // One sample box — a horizontal row's beams all share one y, so
      // multi-matching just piles identical bars and sprays ties through the
      // numbers. The selected page is the visually anchored pick.
      {
        on: '.MuiPaginationItem-page.Mui-selected',
        aspect: 'touch-target',
        token: box,
        label: 'Item',
        route: { gutter: 'left' },
      },
      // The items' own margin is zeroed, so the list's gap is the whole story.
      { on: '.MuiPagination-ul', aspect: 'gap', token: 'x-small', label: 'Ul' },
    ];
  },
  Progress: () => [
    // `spacing / 2` is a multiplier off the base unit, not a scale step — left
    // unnamed the caption would claim `xx-small`.
    {
      on: '.MuiLinearProgress-root',
      aspect: 'touch-target',
      token: 'spacing / 2',
      label: 'Linear bar',
    },
    {
      on: '.MuiCircularProgress-root',
      aspect: 'touch-target',
      token: 'touch-target',
      label: 'Circular',
    },
  ],
  // Radio and Checkbox share one preset object, so the rows are identical.
  Radio: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiRadio-root',
        aspect: 'touch-target',
        token: small ? 'touch-target - x-small' : 'touch-target',
        label: 'Radio',
      },
      {
        on: '.MuiRadio-root',
        aspect: 'icon',
        token: small ? 'icon-target - 0.25 × spacing' : 'icon-target',
        label: 'Radio icon',
        route: { gutter: 'top' },
      },
    ];
  },
  Select: (values) => {
    const small = values.size === 'small';
    return [
      // One beam per variant — no tokens: each height composes from that
      // input family's private vars.
      {
        on: '.MuiOutlinedInput-root',
        aspect: 'touch-target',
        text: 'Outlined',
        label: 'Outlined',
        route: { gutter: 'left' },
      },
      // The adornment only — the root's other svg is the select arrow.
      {
        on: '.MuiOutlinedInput-root .MuiInputAdornment-root svg',
        aspect: 'icon',
        token: 'icon-target',
        label: 'Outlined',
        route: { gutter: 'top' },
      },
      {
        on: '.MuiFilledInput-root',
        aspect: 'touch-target',
        text: 'Filled',
        label: 'Filled',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiInput-root',
        aspect: 'touch-target',
        text: 'Standard',
        label: 'Standard',
        route: { gutter: 'left' },
      },
      // Standard only: the one variant whose own rows are the computed value.
      // At `small` both bands come off different rows that agree on 4px, so the
      // reverse lookup names the step and an explicit token would only be able
      // to lie once they diverge.
      {
        on: '.MuiInput-root .MuiInputBase-input',
        aspect: 'padding',
        axis: 'block',
        token: small ? undefined : 'x-small',
        label: 'Select value',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiInput-root',
        aspect: 'gap',
        token: small ? 'xx-small' : 'x-small',
        label: 'Input root',
        route: { gutter: 'bottom' },
      },
    ];
  },
  Slider: (values) => {
    const small = values.size === 'small';
    // Three heights on one horizontal line: the root hugs the left, the thumb
    // stands off the right, the rail steps a rung further and slides down.
    return [
      {
        on: '.MuiSlider-root',
        aspect: 'touch-target',
        token: 'touch-target',
        label: 'Root',
        route: { gutter: 'left' },
      },
      // The thumb reads as a size, not a bracketed length: frame + pointer.
      {
        on: '.MuiSlider-thumb',
        aspect: 'touch-target',
        pointer: true,
        token: small ? 'small' : 'medium',
        label: 'Thumb',
        route: { gutter: 'top' },
      },
      // A thickness, told with a dimension line — the caption says so.
      {
        on: '.MuiSlider-rail',
        aspect: 'touch-target',
        token: small ? 'x-small / 4' : 'small / 4',
        label: 'Rail',
        route: { gutter: 'right' },
      },
    ];
  },
  SnackbarContent: () => [
    {
      on: '.MuiSnackbarContent-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      label: 'Snackbar',
    },
    // The base unit, not `x-small` — both are 8px today and diverge on a rescale.
    {
      on: '.MuiSnackbarContent-root',
      aspect: 'padding',
      axis: 'block',
      token: 'spacing',
      label: 'Snackbar',
      route: { gutter: 'left' },
    },
    { on: '.MuiSnackbarContent-root', aspect: 'gap', token: 'small', label: 'Snackbar' },
    // Down through the blank stretch past the sentence.
    {
      on: '.MuiSnackbarContent-message',
      aspect: 'padding',
      axis: 'block',
      token: 'x-small',
      label: 'Message',
      route: { gutter: 'bottom', at: 0.9 },
    },
    // Negative: the action is pulled back out of the root's own padding.
    {
      on: '.MuiSnackbarContent-action',
      aspect: 'margin',
      axis: 'inline',
      token: '-x-small',
      label: 'Action',
      route: { gutter: 'right', line: 'diagonal' },
    },
  ],
  Stepper: (values) => {
    const vertical = values.orientation === 'vertical';
    return [
      // The icon→label spacing falls out of centering the circle in this box.
      // First step only — the three steps share one row, so multi-matching
      // piles identical bars and labels on one y.
      {
        on: '.MuiStep-root:first-of-type .MuiStepLabel-iconContainer',
        aspect: 'touch-target',
        pointer: true,
        token: 'touch-target',
        label: 'Icon container',
        route: { gutter: 'left' },
      },
      // An SvgIcon sizes off its own font size, so the circle is set here.
      {
        on: '.MuiStep-root:first-of-type .MuiStepIcon-root',
        aspect: 'icon',
        token: 'touch-target - small + 2px',
        label: 'Step icon',
        route: vertical ? { gutter: 'top' } : { gutter: 'bottom' },
      },
      // Two gaps, both master's 8px, untouched by the preset — px only.
      // Horizontal only. The root's flex gap separates the steps; a step with
      // a connector is a grid whose gap separates connector from label. Their
      // bands sit ~30px apart, so the labels slide apart.
      ...(vertical
        ? []
        : [
            {
              on: '.MuiStepper-root',
              aspect: 'gap' as const,
              label: 'Stepper',
              route: { gutter: 'top' as const, shift: -45 },
            },
            {
              on: '.MuiStep-root:nth-of-type(2)',
              aspect: 'gap' as const,
              label: 'Step',
              route: { gutter: 'top' as const, shift: 45 },
            },
          ]),
      // Vertical only: half the box lands the rule on the icon's center, and
      // margin + padding lines the content up with the label. All three are
      // left-band stories — side claims, one connector as the sample.
      ...(vertical
        ? [
            // Both margins read left, each crossing at its band's middle.
            {
              on: '.MuiStep-root:nth-of-type(2) .MuiStepConnector-root',
              aspect: 'margin' as const,
              side: 'left' as const,
              token: 'touch-target / 2',
              label: 'Connector',
              route: { gutter: 'left' as const },
            },
            {
              on: '.MuiStep-root:first-of-type .MuiStepContent-root',
              aspect: 'margin' as const,
              side: 'left' as const,
              token: 'touch-target / 2',
              label: 'Content',
              route: { gutter: 'left' as const },
            },
            // Rightward across the content text — acceptable crossing.
            {
              on: '.MuiStep-root:first-of-type .MuiStepContent-root',
              aspect: 'padding' as const,
              side: 'left' as const,
              token: 'touch-target / 2 - 1px',
              label: 'Content',
              route: { gutter: 'right' as const, at: 0.5 },
            },
          ]
        : []),
    ];
  },
  // One prop, three variants: `fontSize` is the icon aspect here because the
  // slot is the `svg` itself, and `medium` lands on `icon-target` unaided.
  SvgIcon: (values) => [
    {
      on: '.MuiSvgIcon-root',
      aspect: 'icon',
      token: {
        small: 'icon-target - 0.25 × spacing',
        medium: 'icon-target',
        large: 'icon-target + 0.5 × spacing',
      }[values.fontSize as string],
      label: 'Icon',
    },
  ],
  Switch: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiSwitch-root',
        aspect: 'touch-target',
        token: small ? 'touch-target - x-small' : 'touch-target',
        label: 'Switch',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiSwitch-thumb',
        aspect: 'touch-target',
        token: small ? 'medium - 4px' : 'medium',
        label: 'Thumb',
        route: { gutter: 'right' },
      },
    ];
  },
  Table: (values) => {
    const small = values.size === 'small';
    // The checkbox column comes first, so the size rows have to skip it or they
    // would caption the wrong cell — `querySelector` takes the first match.
    const cell = '.MuiTableCell-root:not(.MuiTableCell-paddingCheckbox)';
    return [
      // The last column only: one beam per row makes the right gutter a ruler;
      // matching every cell doubles each row's bar and label.
      {
        on: `${cell}:last-child`,
        aspect: 'touch-target',
        // Clear of the checkbox column and of the checkbox's own dimension.
        token: small ? 'large + xx-small' : 'x-large + x-small',
        label: 'Cell',
        route: { gutter: 'right' },
      },
      // One body cell carries the padding story.
      {
        on: 'tbody .MuiTableCell-root:nth-child(2)',
        aspect: 'padding',
        axis: 'inline',
        token: small ? 'x-small' : 'small',
        label: 'Cell',
        route: { gutter: 'bottom' },
      },
      // `0 0 0 4px` — only the left band is live, so the token lands on it alone.
      {
        on: 'thead .MuiTableCell-paddingCheckbox',
        aspect: 'padding',
        axis: 'inline',
        token: 'spacing / 2',
        label: 'Checkbox cell',
        route: { gutter: 'top' },
      },
      {
        on: 'tbody .MuiCheckbox-root',
        aspect: 'touch-target',
        token: small ? 'touch-target - x-small' : 'touch-target',
        label: 'Checkbox',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiTableSortLabel-icon',
        aspect: 'icon',
        token: 'icon-target + spacing / 4',
        label: 'Sort icon',
        route: { gutter: 'top', line: 'diagonal', shift: 230 },
      },
      {
        on: '.MuiTableSortLabel-icon',
        aspect: 'margin',
        axis: 'inline',
        token: 'xx-small',
        label: 'Sort icon',
        route: { gutter: 'top', shift: 70 },
      },
    ];
  },
  Tabs: (values) => {
    const icon = values.icon === true;
    return [
      // With an icon on top the stack outgrows both floors, so the bar's own
      // box stops being the density number and the row is dropped.
      // The second tab is the sample — eight tabs' worth of identical beams
      // and paddings would pile on one row.
      {
        on: '.MuiTab-root:nth-of-type(2)',
        aspect: 'touch-target',
        token: icon ? undefined : 'touch-target',
        label: 'Tab',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiTab-root:nth-of-type(2)',
        aspect: 'padding',
        axis: 'inline',
        token: 'small',
        label: 'Tab',
        route: { gutter: 'bottom' },
      },
      // A `width`, not a height — the beam measures the inline axis, so it
      // reports to a top/bottom gutter.
      {
        on: '.MuiTabScrollButton-root',
        aspect: 'touch-target',
        token: 'touch-target',
        label: 'Scroll button',
        route: { gutter: 'top', out: 1 },
      },
      // Without an icon the block padding is `0` and there is nothing for the
      // gap to separate; both rows only exist under the icon+label variant,
      // where the tab stacks and the gap is a vertical one.
      ...(icon
        ? ([
            {
              on: '.MuiTab-root:nth-of-type(2)',
              aspect: 'padding',
              axis: 'block',
              token: 'xx-small',
              label: 'Tab',
              route: { gutter: 'bottom', shift: -170, line: 'diagonal' },
            },
            {
              on: '.MuiTab-root:nth-of-type(2)',
              aspect: 'gap',
              token: 'xx-small',
              label: 'Tab',
              route: { gutter: 'bottom', shift: 130, line: 'diagonal' },
            },
          ] as Claim[])
        : []),
    ];
  },
  TextField: (values) => {
    const small = values.size === 'small';
    // The bare InputBase is the only root carrying none of the variant classes.
    const base =
      '.MuiInputBase-root:not(.MuiInput-root):not(.MuiFilledInput-root):not(.MuiOutlinedInput-root)';
    const baseInput =
      '.MuiInputBase-input:not(.MuiInput-input):not(.MuiFilledInput-input):not(.MuiOutlinedInput-input)';
    return [
      // Measured, not emitted — four different inputs landing on one number is
      // the whole claim, so each row carries its own beam.
      { on: base, aspect: 'touch-target', label: 'InputBase' },
      {
        on: baseInput,
        aspect: 'padding',
        axis: 'block',
        token: small ? 'xx-small' : 'x-small',
        label: 'InputBase',
      },
      { on: '.MuiInput-root', aspect: 'touch-target', label: 'Standard' },
      // 8px top, 6px bottom — two values, so no single token can name them.
      { on: '.MuiInput-input', aspect: 'padding', axis: 'block', label: 'Standard' },
      { on: '.MuiFilledInput-root', aspect: 'touch-target', label: 'Filled' },
      // Asymmetric: `large` on top, `small` underneath — two captions.
      { on: '.MuiFilledInput-input', aspect: 'padding', axis: 'block', label: 'Filled' },
      { on: '.MuiOutlinedInput-root', aspect: 'touch-target', label: 'Outlined' },
      {
        on: '.MuiOutlinedInput-input',
        aspect: 'padding',
        axis: 'block',
        token: small ? 'xx-small' : '(touch-target - 1lh) / 2',
        label: 'Outlined',
      },
      {
        on: '.MuiOutlinedInput-root',
        aspect: 'gap',
        token: small ? 'xx-small' : 'x-small',
        label: 'Outlined',
      },
      // The small adornment icon, read below-left of the outlined input.
      {
        on: '.MuiOutlinedInput-root svg',
        aspect: 'icon',
        token: 'icon-target',
        label: 'Outlined',
        route: { gutter: 'left', shift: 60, line: 'diagonal' },
      },
      {
        on: '.MuiFormHelperText-root',
        aspect: 'margin',
        axis: 'block',
        token: 'x-small',
        label: 'Helper text',
      },
      // Contained helper text also carries an authored inline margin.
      {
        on: '.MuiFormHelperText-root',
        aspect: 'margin',
        axis: 'inline',
        token: 'x-small',
        label: 'Helper text',
        route: { gutter: 'right' },
      },
    ];
  },
  ToggleButton: (values) => {
    const box = {
      small: 'touch-target - x-small',
      medium: 'touch-target',
      large: 'touch-target + small',
    }[values.size as string];
    // The inner term IS the icon size now: the padding centres the glyph's
    // box inside the button, so each size pairs its box with its icon step.
    const inner = {
      small: '(icon-target - 0.25 × spacing)',
      medium: 'icon-target',
      large: '(icon-target + 0.5 × spacing)',
    }[values.size as string];
    // First button only — the group's two buttons double every label.
    return [
      {
        on: '.MuiToggleButton-root:first-of-type',
        aspect: 'touch-target',
        token: box,
        label: 'ToggleButton',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiToggleButton-root:first-of-type',
        aspect: 'padding',
        axis: 'inline',
        token: `(${box} - ${inner}) / 2 - 1px`,
        label: 'ToggleButton',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiToggleButton-root:first-of-type .MuiSvgIcon-root',
        aspect: 'icon',
        token: 'icon-target',
        label: 'Icon',
        route: { gutter: 'top' },
      },
    ];
  },
  // One ring, two captions: the bar has no floor left, so its height is the
  // block padding plus whatever it holds.
  Toolbar: (values) => [
    {
      on: '.MuiToolbar-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      label: 'Toolbar',
    },
    // The height story is a min-height composition, not block padding. The
    // expression is long, so the px lands on its own line.
    {
      on: '.MuiToolbar-root',
      aspect: 'touch-target',
      token: values.dense === true ? 'touch-target + 2 × x-small' : 'touch-target + 2 × small',
      wrap: true,
      label: 'Toolbar',
    },
  ],
  Tooltip: (values) => [
    {
      on: '.MuiTooltip-tooltip',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      label: 'Tooltip',
    },
    // At `right` placement the side gutters belong to the arrow's beam, so
    // the drop centres below; at `bottom` the right gutter is free and the
    // pair reads there plainly.
    {
      on: '.MuiTooltip-tooltip',
      aspect: 'padding',
      axis: 'block',
      token: 'x-small',
      label: 'Tooltip',
      route: values.placement === 'right' ? { gutter: 'bottom', at: 0.5 } : { gutter: 'right' },
    },
    // The offset is placement-shaped. At `bottom` it is one clean top band; at
    // `right` master's surviving 2px sits on the opposite side and would take a
    // second band under the same, wrong, token.
    ...(values.placement === 'bottom'
      ? [
          {
            on: '.MuiTooltip-tooltip',
            aspect: 'margin' as const,
            axis: 'block' as const,
            token: '0.5 × spacing',
            label: 'Tooltip',
          },
        ]
      : []),
    // Only at a side placement is the arrow's 11px its height.
    ...(values.placement === 'right'
      ? [
          // A pointer up to the button's top — a beam's ties here would run
          // across the bubble's text. The margin's authored band is the left
          // one; master's surviving 2px on the far side stays unclaimed.
          {
            on: '.MuiTooltip-arrow',
            aspect: 'touch-target' as const,
            pointer: true,
            // `block`: the 11px is the arrow's height even though the label
            // sits on the top gutter.
            axis: 'block' as const,
            token: '1.375 × spacing',
            label: 'Arrow',
            route: { gutter: 'top' as const, line: 'diagonal' as const, shift: -60 },
          },
          {
            on: '.MuiTooltip-tooltip',
            aspect: 'margin' as const,
            side: 'left' as const,
            token: '0.5 × spacing',
            label: 'Tooltip',
            route: { gutter: 'bottom' as const, shift: -70 },
          },
        ]
      : []),
  ],
};

/** What to draw for a family at the toolbar's current values. */
export function annotationsFor(family: string, values: Record<string, string | boolean>): Claim[] {
  return DENSITY_ANNOTATIONS[family]?.(values) ?? [];
}
