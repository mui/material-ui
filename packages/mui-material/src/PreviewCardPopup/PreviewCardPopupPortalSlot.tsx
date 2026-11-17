'use client';
import * as React from 'react';
import type { HTMLProps } from '@base-ui/react/types';
import type { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { mergeProps } from '@base-ui/react/merge-props';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import useSlot from '../utils/useSlot';
import RenderElement from './RenderElement';
import previewCardPopupClasses, {
  getPreviewCardPopupUtilityClass,
} from './previewCardPopupClasses';
import type { PreviewCardPopupProps } from './PreviewCardPopup.types';

const useUtilityClasses = (ownerState: PreviewCardPopupProps) => {
  const { classes } = ownerState;
  const slots = { portal: ['portal'] };
  return composeClasses(slots, getPreviewCardPopupUtilityClass, classes);
};

const PreviewCardPopupPortal = styled('div', {
  name: 'MuiPreviewCardPopup',
  slot: 'portal',
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: (theme.vars || theme).zIndex.tooltip,
    [`&:has(> .${previewCardPopupClasses.positioner}[hidden])`]: { display: 'none' },
  })),
);

export interface PreviewCardPopupPortalSlotProps {
  baseProps: HTMLProps;
  baseState: BasePreviewCard.Portal.State;
  ownerState: PreviewCardPopupProps;
  externalForwardedProps: Pick<PreviewCardPopupProps, 'slots' | 'slotProps'>;
}

/**
 * @ignore - internal component.
 */
function PreviewCardPopupPortalSlot(props: PreviewCardPopupPortalSlotProps) {
  const { baseProps, baseState, ownerState, externalForwardedProps } = props;
  const { render, ...slotPropsWithoutRender } =
    resolveComponentProps(externalForwardedProps.slotProps?.portal, ownerState) ?? {};
  const classes = useUtilityClasses(ownerState);

  const [PortalSlot, portalProps] = useSlot('portal', {
    elementType: PreviewCardPopupPortal,
    externalForwardedProps: {
      slots: externalForwardedProps.slots,
      slotProps: { portal: slotPropsWithoutRender },
    },
    ownerState,
    className: classes.portal,
    getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
    internalForwardedProps: render
      ? { as: RenderElement, render, renderState: baseState }
      : undefined,
  });

  return <PortalSlot {...portalProps} />;
}

export default PreviewCardPopupPortalSlot;
