import * as React from 'react';
import { styled } from '@mui/system';
import SwitchUnstyled, {
  switchUnstyledClasses,
  SwitchUnstyledThumbSlotProps,
} from '@mui/base/SwitchUnstyled';

const yellow = {
  500: '#f9a825',
};

const grey = {
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
};

const Root = styled('span')(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 36px;
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
    border-radius: 18px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 6px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} .${switchUnstyledClasses.track} {
    background: ${yellow[500]};
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
);

const Thumb = styled(
  function Thumb({ ownerState, ...other }: SwitchUnstyledThumbSlotProps) {
    // without the `provideOwnerStateToSlots` prop on the SwitchUnstyled, the `ownerState` prop will be undefined
    // and the whole props object can be forwarded to the DOM element.
    return <span {...other}>{ownerState.checked ? '🌞' : '🌜'}</span>;
  },
  {
    // Must configure the `styled` utility to forward the `ownerState` prop.
    // Potentially we can configure it in such way by default in the future.
    shouldForwardProp: () => true,
  },
)(`font-size: 16px;
    display: block;
    width: 24px;
    height: 24px;
    top: 6px;
    left: 6px;
    border-radius: 12px;
    background-color: #fff;
    position: relative;
    text-align: center;

    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
    
    .${switchUnstyledClasses.checked} & {
      left: 30px;
      top: 6px;
      background-color: #fff;
    }
  `);

export default function UnstyledSwitches() {
  const label = { slotProps: { input: { 'aria-label': 'Demo switch' } } };
  const slots = { root: Root, thumb: Thumb };

  return (
    <div>
      <SwitchUnstyled slots={slots} provideOwnerState={['thumb']} {...label} defaultChecked />
    </div>
  );
}
