import * as React from 'react';
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from '@material-ui/unstyled/ButtonUnstyled';
import { styled, alpha } from '@material-ui/system';

/* eslint-disable react/prop-types */
const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="150" height="50" {...other} ref={ref}>
      <polygon points="0,50 0,0 150,0 150,50" className="bg" />
      <polygon points="0,50 0,0 150,0 150,50" className="borderEffect" />
      <foreignObject x="0" y="0" width="150" height="50">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  overflow: visible;
  cursor: pointer;

  & polygon {
    fill: transparent;
    transition: all 700ms ease;
    pointer-events: none;
  }

  & .bg {
    stroke: ${theme.palette.primary.main};
    stroke-width: 0.5;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
  }

  & .borderEffect {
    stroke: ${theme.palette.primary.main};
    stroke-width: 2;
    stroke-dasharray: 150 600;
    stroke-dashoffset: 150;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
      fill: ${alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)};
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }

  &.${buttonUnstyledClasses.active} {
    & .bg {
      fill: ${alpha(
        theme.palette.primary.main,
        theme.palette.action.activatedOpacity,
      )};
      transition: fill 200ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-family: Helvetica, Inter, Arial, sans-serif;
      font-size: 14px;
      font-weight: 200;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.palette.primary.main};
      text-transform: uppercase;
    }

    & svg {
      margin: 0 5px;
    }
  }`,
);

const SvgButton = React.forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});

export default function UnstyledButtonCustom() {
  return <SvgButton>Button</SvgButton>;
}
