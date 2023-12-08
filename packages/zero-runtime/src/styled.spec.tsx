/* eslint-disable material-ui/no-empty-box */
import * as React from 'react';
import { styled } from '@mui/zero-runtime';
import { expectType } from '@mui/types';
import Accordion from '@mui/material/Accordion';

declare module '@mui/zero-runtime/theme' {
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

const B = styled('a')<{ isRed?: boolean }>(({ theme }) => ({
  // @ts-expect-error isBlue is not a prop
  color: (props) => (props.isBlue ? 'red' : 'blue'),
  borderColor: (props) => (props.isRed ? 'red' : 'blue'),
  backgroundColor: [theme.palette.primary.main, theme.palette.primary.darkMain],
  '&:enabled': {
    color: 'beige',
  },
  '@layer utils': {},
  '@media (min-width:360px)': {
    '.globalClass': {
      color: [theme.palette.primary.main, theme.palette.primary.darkMain],
    },
  },
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
}));

// @TODO - Fix for case with multiple variants or multiple prop keys
// in the same styled definition
// @ts-expect-error isBlue is not a prop
const B1 = styled('a')<{ isRed?: boolean }>(({ theme }) => ({
  color: (props) => (props.isRed ? 'red' : 'blue'),
  variants: [
    {
      props: {
        isBlue: true,
      },
      style: {
        color: ({ isRed }) => (isRed ? 'red' : 'blue'),
      },
    },
  ],
}));

// @ts-expect-error Type argument should be a key:value object
const B2 = styled.a<number>({
  color: 'red',
});

const bElement = <B isRed />;

// @ts-expect-error isBlue is not a prop
const bElement2 = <B isBlue />;

const A = styled(B, {
  overridesResolver(props) {
    return false;
  },
})<{ isBlue?: boolean }>({
  color: 'red',
  backgroundColor: (props) => (props.isBlue ? 'red' : 'blue'),
});

const Box = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

function WorksWithNoTheme() {
  <Box />;
}

const StyledToolbar = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const StyledSpan = styled('span')(({ theme }) => ({
  ...theme.typography.body1,
}));

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

const InitialButton = styled('button')<{ isRed?: boolean }>({
  color: 'red',
});
InitialButton.defaultProps = {
  type: 'button',
  // @ts-expect-error href is not present in button
  href: '/about',
};

const InitialLink = styled.a<{ isActive?: boolean }>(({ theme }) => ({
  color: 'black',
  variants: [
    {
      props: {
        isActive: true,
      },
      style: {
        color: 'blue',
      },
    },
  ],
}));

const WrapperComponent = styled(Component)({
  variants: [
    {
      props: {
        variant: 'bar',
      },
      style: {
        boxSizing: 'border-box',
      },
    },
  ],
});

const LocalAccordion = styled(Accordion)({
  color: 'red',
});

function App() {
  const elementRef = React.useRef<HTMLAnchorElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <React.Fragment>
      {/* @ts-expect-error ref expects HTMLButtonElement */}
      <InitialButton ref={elementRef} type="submit" />
      <InitialButton
        type="submit"
        onClick={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement>, typeof e>(e);
        }}
      />
      <InitialButton
        ref={elementRef}
        as="a"
        sx={({ theme }) => ({
          color: 'red',
          backgroundColor: [theme.palette.primary.main],
        })}
        onClick={(e) => {
          expectType<React.MouseEvent<HTMLAnchorElement>, typeof e>(e);
        }}
      />
      {/* @ts-expect-error href is not present in button */}
      <InitialButton isRed href="/about" onClick={(ev) => {}} />
      {/* @ts-expect-error isBlue is not specified in additional props */}
      <InitialButton isBlue onClick={(ev) => {}} />
      <InitialButton
        as={ButtonRoot}
        ownerState={{
          color: 'primary',
        }}
        type="submit"
      />
      <WrapperComponent variant="bar" />
      <LocalAccordion ref={divRef} defaultExpanded>
        Hello
      </LocalAccordion>
    </React.Fragment>
  );
}
