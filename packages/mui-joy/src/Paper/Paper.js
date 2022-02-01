/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '../styles';

const PaperRoot = styled('div')(({ theme, ownerState }) => [
  {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0.75),
    backgroundColor: theme.vars.palette.background.body,
    ...(ownerState.elevation && {
      boxShadow: theme.shadow[ownerState.elevation],
    }),
    ...(ownerState.radius && {
      borderRadius: theme.radius[ownerState.radius],
    }),
  },
  ownerState.variant && theme.variants[ownerState.variant][ownerState.color],
]);

export default function Paper({ variant, color = 'neutral', radius = 'xs', elevation, ...props }) {
  const ownerState = { variant, color, radius, elevation, ...props };
  return <PaperRoot ownerState={ownerState} {...props} />;
}
