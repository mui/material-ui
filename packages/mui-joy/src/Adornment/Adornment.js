/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '../styles';

const AdornmentRoot = styled('span')(({ theme, ownerState }) => ({
  '--Adornment-offset': '0', // gutter is the padding-x
  '--Adornment-gap': '0.5rem', // gap between start/end icon and content (limit upper bound to 0.5rem)
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.vars.palette.text.tertiary,
  ...(ownerState.end
    ? {
        marginLeft: 'var(--Adornment-gap)',
        marginRight: 'calc(-1 * var(--Adornment-offset))',
      }
    : {
        marginLeft: 'calc(-1 * var(--Adornment-offset))',
        marginRight: 'var(--Adornment-gap)',
      }),
}));

export default function Adornment({ children, end = false, ...props }) {
  const ownerState = {
    end,
    ...props,
  };
  return (
    <AdornmentRoot ownerState={ownerState} {...props}>
      {children}
    </AdornmentRoot>
  );
}
