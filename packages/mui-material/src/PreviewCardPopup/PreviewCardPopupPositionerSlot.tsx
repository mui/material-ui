'use client';
import * as React from 'react';
import type { HTMLProps } from '@base-ui/react/types';
import type { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { mergeProps } from '@base-ui/react/merge-props';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import { useRtl } from '@mui/system/RtlProvider';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import useSlot from '../utils/useSlot';
import RenderElement from './RenderElement';
import { getPreviewCardPopupUtilityClass } from './previewCardPopupClasses';
import type { PreviewCardPopupOwnerState, PreviewCardPopupProps } from './PreviewCardPopup.types';

const useUtilityClasses = (ownerState: PreviewCardPopupOwnerState) => {
  const { classes } = ownerState;
  const slots = { positioner: ['positioner'] };
  return composeClasses(slots, getPreviewCardPopupUtilityClass, classes);
};

const PreviewCardPopupPositioner = styled('div', {
  name: 'MuiPreviewCardPopup',
  slot: 'positioner',
})({
  zIndex: 1,
});

export interface PreviewCardPopupPositionerSlotProps {
  baseProps: HTMLProps;
  baseState: BasePreviewCard.Positioner.State;
  ownerState: PreviewCardPopupOwnerState;
  externalForwardedProps: Pick<PreviewCardPopupProps, 'slots' | 'slotProps'>;
}

/**
 * @ignore - internal component.
 */
function PreviewCardPopupPositionerSlot(props: PreviewCardPopupPositionerSlotProps) {
  const { baseProps, baseState, ownerState, externalForwardedProps } = props;
  const { render, ...slotPropsWithoutRender } =
    resolveComponentProps(externalForwardedProps.slotProps?.positioner, ownerState) ?? {};
  const classes = useUtilityClasses(ownerState);
  const isRtl = useRtl();

  const [PositionerSlot, positionerProps] = useSlot('positioner', {
    elementType: PreviewCardPopupPositioner,
    externalForwardedProps: {
      slots: externalForwardedProps.slots,
      slotProps: { positioner: slotPropsWithoutRender },
    },
    ownerState,
    className: classes.positioner,
    getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
    internalForwardedProps: render
      ? { as: RenderElement, render, renderState: baseState }
      : undefined,
    additionalProps: { dir: isRtl ? 'rtl' : 'ltr' },
  });

  return <PositionerSlot {...positionerProps} />;
}

export default PreviewCardPopupPositionerSlot;
