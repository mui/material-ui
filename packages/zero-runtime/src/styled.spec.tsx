/* eslint-disable material-ui/no-empty-box */
import * as React from 'react';
import { styled } from '@mui/zero-runtime';

declare module '@mui/zero-runtime' {
  interface ThemeArgs {
    theme: {
      palette: {
        primary: Record<string, string>;
      };
      mixins: {
        toolbar: Record<string, string>;
      };
      typography: {
        body1: Record<string, string>;
      };
    };
  }
}

const B = styled.a<{ isRed?: boolean }>({
  color(props) {
    return props.isRed ? 'red' : 'blue';
  },
  backgroundColor: ['red', 'black', 'blue'],
  ':enabled': {
    color: 'beige',
  },
  '@media()': {},
  variants: [
    {
      props: {
        isRed: true,
      },
      style: {
        color: ({ isRed }) => (isRed ? 'red' : 'blue'),
      },
    },
  ],
});

const A = styled(B)<{ isBlue?: boolean }>({
  color: 'red',
  backgroundColor(props) {
    return props.isBlue ? 'red' : 'blue';
  },
});

const Box = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const SimpleBox = styled('div')``;

// @TODO - Shorthands typing
// function SxTestSimpleBox() {
//   <SimpleBox sx={{ p: [2, 3, 4] }} />;
// }

// function SxTest() {
//   <Box sx={{ p: [2, 3, 4] }} />;
// }

function WorksWithNoTheme() {
  <Box />;
}

const StyledToolbar = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const StyledSpan = styled('span')(({ theme }) => ({
  ...theme.typography.body1,
}));

// https://github.com/mui/material-ui/issues/28844
interface PropsFooVariant {
  variant: 'foo';
}
interface PropsBarVariant {
  variant: 'bar';
}
function Component(props: PropsFooVariant | PropsBarVariant) {
  return <div />;
}
const StyledComponent = styled(Component)(({ theme }) => ({}));
const rendered = (
  <React.Fragment>
    <StyledComponent variant="foo" />
    <StyledComponent variant="bar" />
  </React.Fragment>
);
/**
 * ===================================================================
 */

/**
 * Test styleOverrides callback types
 */
interface ButtonProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: 'primary';
  variant?: 'contained';
}

const ButtonRoot = styled('button', {
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ButtonProps }>({});

const ButtonIcon = styled('span', {
  name: 'MuiButton',
  slot: 'Icon',
  overridesResolver: (props, styles) => styles.icon,
})<{ ownerState: ButtonProps }>({});

function Button({
  children,
  startIcon,
  endIcon,
  color = 'primary',
  variant = 'contained',
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  const ownerState = { startIcon, endIcon, color, variant, ...props };
  return (
    <ButtonRoot ownerState={ownerState}>
      {startIcon && <ButtonIcon ownerState={ownerState}>{startIcon}</ButtonIcon>}
      {children}
      {endIcon && <ButtonIcon ownerState={ownerState}>{endIcon}</ButtonIcon>}
    </ButtonRoot>
  );
}

function variantsAPI() {
  const ObjectSyntax = styled('div')<{ foo?: string; bar?: number }>({
    variants: [
      {
        props: { foo: 'a' },
        style: { color: 'blue' },
      },
    ],
  });

  const FunctionSyntax = styled('div')<{ foo?: string; bar?: number }>(() => ({
    variants: [
      {
        props: { foo: 'a' },
        style: { color: 'blue' },
      },
    ],
  }));

  const WrongUsage = styled('div')<{ foo?: string; bar?: number }>({
    color: [
      {
        // @ts-expect-error the API is not valid for CSS properties
        props: { foo: 'a' },
        style: { color: 'blue' },
      },
    ],
  });
}
