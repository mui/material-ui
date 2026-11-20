import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import ImportExportIcon from '../internal/svg-icons/ImportExport';
import OpenInFullIcon from '../internal/svg-icons/OpenInFull';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import useSlot from '../utils/useSlot';
import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import type { NumberFieldClasses } from './numberFieldClasses';
import NumberFieldAdornmentSlot from './NumberFieldAdornmentSlot';
import RenderElement from './RenderElement';
import { omitNullishEventHandlers } from './utils';

interface NumberFieldScrubAreaSlotProps {
  position: 'start' | 'end';
  baseState: BaseNumberField.Root.State;
  ownerState: NumberFieldOwnerState;
  classes: Pick<NumberFieldClasses, 'scrubArea' | 'scrubAreaCursor' | 'scrubAreaAdornment'>;
  externalForwardedProps: Pick<NumberFieldProps, 'slots' | 'slotProps'>;
}

const NumberFieldScrubArea = styled('span', {
  name: 'MuiNumberField',
  slot: 'scrubArea',
})<{ ownerState: NumberFieldOwnerState }>(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '--NumberField-scrubAreaPadding': '4px',
    padding: 'var(--NumberField-scrubAreaPadding)',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 0,
    color: (theme.vars || theme).palette.action.active,
    cursor: 'ew-resize',
    variants: [
      {
        props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
          ownerState.scrubAreaPosition === 'start' && ownerState.controlsPosition !== 'split',
        style: { marginInlineStart: 'calc(-1 * var(--NumberField-scrubAreaPadding))' },
      },
      {
        props: { scrubAreaPosition: 'end', controlsPosition: false },
        style: { marginInlineEnd: 'calc(-1 * var(--NumberField-scrubAreaPadding))' },
      },
      { props: { 'data-direction': 'vertical' }, style: { cursor: 'ns-resize' } },
      { props: { size: 'small' }, style: { fontSize: theme.typography.pxToRem(18) } },
      {
        props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
          ownerState.disabled || ownerState.readOnly,
        style: {
          color: (theme.vars || theme).palette.action.disabled,
          cursor: 'default',
        },
      },
    ],
  })),
);
const NumberFieldScrubAreaCursor = styled('span', {
  name: 'MuiNumberField',
  slot: 'scrubAreaCursor',
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 0,
    // Match Base UI's black/white SVG cursor and shadow at the larger size.
    color: (theme.vars || theme).palette.common.black,
    filter: 'drop-shadow(0 1px 1px #0008)',
    '& svg': {
      stroke: (theme.vars || theme).palette.common.white,
      strokeWidth: 1,
    },
    zIndex: theme.zIndex.tooltip + 1,
  })),
);

/**
 * @ignore - internal component.
 */
function NumberFieldScrubAreaSlot(props: NumberFieldScrubAreaSlotProps) {
  const { position, baseState, ownerState, classes, externalForwardedProps } = props;

  // Build direction-aware defaults without evaluating the consumer's slot callback twice.
  const { render: scrubAreaRender, ...resolvedScrubAreaSlotProps } =
    resolveComponentProps(externalForwardedProps.slotProps?.scrubArea, ownerState) ?? {};
  const scrubDirection = resolvedScrubAreaSlotProps.direction ?? 'horizontal';
  const [ScrubAreaSlot, scrubAreaSlotProps] = useSlot('scrubArea', {
    elementType: NumberFieldScrubArea,
    externalForwardedProps: {
      ...externalForwardedProps,
      slotProps: {
        ...externalForwardedProps.slotProps,
        scrubArea: resolvedScrubAreaSlotProps,
      },
    },
    ownerState,
    className: classes.scrubArea,
    internalForwardedProps: scrubAreaRender
      ? { as: RenderElement, render: scrubAreaRender, renderState: baseState }
      : undefined,
    additionalProps: {
      'data-direction': scrubDirection,
      children: (
        <ImportExportIcon
          fontSize="inherit"
          style={{ transform: scrubDirection === 'horizontal' ? 'rotate(90deg)' : undefined }}
        />
      ),
    },
  });
  const [ScrubAreaCursorSlot, scrubAreaCursorSlotProps] = useSlot('scrubAreaCursor', {
    elementType: NumberFieldScrubAreaCursor,
    externalForwardedProps,
    ownerState,
    className: classes.scrubAreaCursor,
    additionalProps: {
      // Rotate the SVG, since Base UI updates the cursor container's transform as it moves.
      // Inline transforms also preserve the drag axis when RTL styles are flipped.
      children: (
        <OpenInFullIcon
          fontSize="inherit"
          style={{
            transform: scrubDirection === 'horizontal' ? 'rotate(45deg)' : 'rotate(-45deg)',
          }}
        />
      ),
    },
  });
  const { render: scrubAreaCursorRender, ...scrubAreaCursorProps } = scrubAreaCursorSlotProps;

  const {
    direction,
    pixelSensitivity,
    teleportDistance,
    children: scrubAreaChildren,
    ...restScrubAreaProps
  } = scrubAreaSlotProps;
  const scrubAreaProps = omitNullishEventHandlers(restScrubAreaProps);

  return (
    <NumberFieldAdornmentSlot
      slotName="scrubAreaAdornment"
      position={position}
      className={classes.scrubAreaAdornment}
      baseState={baseState}
      materialProps={ownerState}
      externalForwardedProps={externalForwardedProps}
    >
      <BaseNumberField.ScrubArea
        direction={direction}
        pixelSensitivity={pixelSensitivity}
        teleportDistance={teleportDistance}
        render={<ScrubAreaSlot {...scrubAreaProps} />}
      >
        {scrubAreaChildren}
        <BaseNumberField.ScrubAreaCursor
          render={
            <ScrubAreaCursorSlot
              {...scrubAreaCursorProps}
              {...(!externalForwardedProps.slots?.scrubAreaCursor &&
                scrubAreaCursorRender && {
                  as: RenderElement,
                  render: scrubAreaCursorRender,
                  renderState: baseState,
                })}
            />
          }
        />
      </BaseNumberField.ScrubArea>
    </NumberFieldAdornmentSlot>
  );
}

export default NumberFieldScrubAreaSlot;
