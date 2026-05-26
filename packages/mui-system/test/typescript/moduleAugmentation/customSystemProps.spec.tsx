import Box, { SystemProps } from '@mui/system/Box';

declare module '@mui/system/Box' {
  interface CustomSystemProps {
    customProp?: number;
  }
}

const props: SystemProps = {
  customProp: 2,
  m: [1, 2],
};

const themedProps: SystemProps<{ factor: number }> = {
  customProp: (theme) => theme.factor,
};

const invalidProps: SystemProps = {
  // @ts-expect-error customProp only accepts numbers.
  customProp: '2',
};

<Box customProp={2} />;

// @ts-expect-error Standard system aliases are not direct Box props.
<Box m={4} />;

// @ts-expect-error customProp only accepts numbers.
const invalidBox = <Box customProp="2" />;
