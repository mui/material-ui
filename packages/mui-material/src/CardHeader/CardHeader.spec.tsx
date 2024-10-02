import * as React from 'react';
import CardHeader, { CardHeaderProps, CardHeaderTypeMap } from '@mui/material/CardHeader';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

type DefaultComponent = CardHeaderTypeMap['defaultComponent'];

interface ComponentProp {
  component?: React.ElementType;
}

<CardHeader component={CustomComponent} stringProp="s" numberProp={2} />;

function createElementBasePropMixedTest() {
  React.createElement<CardHeaderProps<DefaultComponent, ComponentProp>>(CardHeader);
  React.createElement<CardHeaderProps<DefaultComponent, ComponentProp>>(CardHeader, {
    component: 'div',
  });
  // @ts-expect-error required props are missing
  React.createElement<CardHeaderProps<typeof CustomComponent, ComponentProp>>(CardHeader, {
    component: CustomComponent,
  });
  React.createElement<CardHeaderProps<typeof CustomComponent, ComponentProp>>(CardHeader, {
    component: CustomComponent,
    stringProp: '',
    numberProp: 0,
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    disableTypography: true,
  });
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    // @ts-expect-error CardHeader does not accept unknownProp
    unknownProp: 'shouldNotWork',
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    // @ts-expect-error disableTypography does not accept strings
    disableTypography: 'hello',
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    // @ts-expect-error disableTypography does not accept numbers
    disableTypography: 1,
  });
  React.createElement<CardHeaderProps<any, ComponentProp>>(CardHeader, {
    // @ts-expect-error `component` is not a valid element
    component: 'incorrectElement',
  });
}

function createElementTypographyTest() {
  React.createElement<CardHeaderProps>(CardHeader, {
    titleTypographyProps: {
      align: 'center',
    },
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    titleTypographyProps: {
      // @ts-expect-error
      align: 'incorrectAlign',
    },
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    titleTypographyProps: {
      variant: 'body1',
    },
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    titleTypographyProps: {
      // @ts-expect-error
      variant: 123,
    },
  });
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    titleTypographyProps: {
      component: 'div',
    },
  });
  // ExpectError: This is expected to err; the type system should catch required props from "CustomComponent".
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    titleTypographyProps: {
      component: CustomComponent,
    },
  });
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    titleTypographyProps: {
      component: CustomComponent,
      stringProp: '',
      numberProp: 0,
    },
  });
  // ExpectError: This is expected to err; the type system should catch the props type mismatch
  // from "CustomComponent" props.
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    titleTypographyProps: {
      component: CustomComponent,
      stringProp: 0,
      numberProp: '',
    },
  });
  // ExpectError: This is expected to err; the type system is welcoming unknown props.
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    titleTypographyProps: {
      unknownProp: 'shouldNotWork',
    },
  });
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    titleTypographyProps: {
      // @ts-expect-error
      component: 'incorrectComponent',
    },
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    // @ts-expect-error
    titleTypographyProps: true,
  });
}

function componentPropTest() {
  <CardHeader component="div" />;
  <CardHeader component={CustomComponent} stringProp="string" numberProp={1} />;
  // @ts-expect-error
  <CardHeader component="incorrectComponent" />;
  // @ts-expect-error
  <CardHeader component={CustomComponent} />;
}

function mixedCardHeaderComponentAndTypographyTest() {
  <CardHeader component="div" titleTypographyProps={{ component: 'a', href: 'href' }} />;
  <CardHeader component="div" subheaderTypographyProps={{ component: 'a', href: 'href' }} />;
  <CardHeader
    component={CustomComponent}
    stringProp="string"
    numberProp={1}
    titleTypographyProps={{ component: CustomComponent, stringProp: 'stringProp', numberProp: 2 }}
  />;
  <CardHeader
    component={CustomComponent}
    stringProp="string"
    numberProp={1}
    titleTypographyProps={{ component: CustomComponent, stringProp: 'stringProp', numberProp: 2 }}
    subheaderTypographyProps={{
      component: CustomComponent,
      stringProp: 'stringProp',
      numberProp: 2,
    }}
  />;
  // @ts-expect-error
  <CardHeader component="incorrectComponent" />;
  // @ts-expect-error
  <CardHeader component={CustomComponent} />;
  <CardHeader
    component={CustomComponent}
    stringProp="string"
    numberProp={1}
    // @ts-expect-error
    titleTypographyProps={{ component: CustomComponent, stringProp: 'stringProp' }}
    subheaderTypographyProps={{
      component: CustomComponent,
      stringProp: 'stringProp',
      numberProp: 2,
    }}
  />;
  // @ts-expect-error
  <CardHeader
    component={CustomComponent}
    stringProp="string"
    numberProp={1}
    titleTypographyProps={{ component: CustomComponent, stringProp: 'stringProp' }}
    subheaderTypographyProps={{ component: CustomComponent, stringProp: 'stringProp' }}
  />;
  <CardHeader
    // @ts-expect-error
    component="incorrectComponent"
    stringProp="string"
    numberProp={1}
    titleTypographyProps={{ component: CustomComponent, stringProp: 'stringProp', numberProp: 2 }}
    subheaderTypographyProps={{
      component: CustomComponent,
      stringProp: 'stringProp',
      numberProp: 2,
    }}
  />;
}

function titleTypographyPropsTest() {
  // @ts-expect-error
  <CardHeader titleTypographyProps={{ component: 'incorrectComponent' }} />;
  <CardHeader titleTypographyProps={{ component: 'a', href: 'href' }} />;
  <CardHeader
    titleTypographyProps={{ component: CustomComponent, stringProp: 'stringProp', numberProp: 2 }}
  />;
  <CardHeader titleTypographyProps={{ variant: 'h1' }} />;
  <CardHeader titleTypographyProps={{ align: 'left' }} />;
  <CardHeader
    titleTypographyProps={{
      color: 'primary',
      display: 'block',
      gutterBottom: true,
      noWrap: true,
      variantMapping: { h1: 'h1' },
    }}
  />;
  // @ts-expect-error
  <CardHeader
    titleTypographyProps={{
      component: CustomComponent,
      stringProp: 'stringProp',
      numberProp: '',
    }}
  />;
  // @ts-expect-error
  <CardHeader titleTypographyProps={{ component: CustomComponent, numberProp: 2 }} />;
  <CardHeader
    titleTypographyProps={{
      component: 'a',
      // ExpectError: This is expected to err; the type system is welcoming unknown props.
      propThatDoesntExist: 'shouldNotWork',
    }}
  />;
  // Regression test for https://github.com/mui/material-ui/issues/21583
  // which was probably fixed in https://github.com/mui/material-ui/pull/21552.
  <CardHeader
    title={<strong>Contemplative Reptile</strong>}
    titleTypographyProps={{ component: 'h2' }}
  />;
}

function subheaderTypographyPropsTest() {
  <CardHeader subheaderTypographyProps={{ component: 'a', href: 'href' }} />;
  <CardHeader
    subheaderTypographyProps={{
      component: CustomComponent,
      stringProp: 'stringProp',
      numberProp: 2,
    }}
  />;
  <CardHeader subheaderTypographyProps={{ variant: 'h1' }} />;
  <CardHeader subheaderTypographyProps={{ align: 'left' }} />;
  <CardHeader
    subheaderTypographyProps={{
      color: 'primary',
      display: 'block',
      gutterBottom: true,
      noWrap: true,
      variantMapping: { h1: 'h1' },
    }}
  />;
  <CardHeader
    subheaderTypographyProps={{
      component: 'a',
      // ExpectError: This is expected to err; the type system is welcoming unknown props.
      propThatDoesntExist: 'shouldNotWork',
    }}
  />;
  // @ts-expect-error
  <CardHeader subheaderTypographyProps={{ component: 'incorrectComponent' }} />;
  // @ts-expect-error
  <CardHeader subheaderTypographyProps={{ component: CustomComponent, numberProp: 2 }} />;
}

function mixedTypographyPropsTest() {
  <CardHeader
    titleTypographyProps={{ component: 'a', href: 'href' }}
    subheaderTypographyProps={{ component: 'a', href: 'href' }}
  />;
  <CardHeader
    titleTypographyProps={{ component: CustomComponent, stringProp: 'stringProp', numberProp: 2 }}
    subheaderTypographyProps={{
      component: CustomComponent,
      stringProp: 'stringProp',
      numberProp: 2,
    }}
  />;
  // @ts-expect-error
  <CardHeader
    titleTypographyProps={{ component: 'incorrectComponent' }}
    subheaderTypographyProps={{ component: 'incorrectComponent' }}
  />;
  <CardHeader
    titleTypographyProps={{
      component: 'a',
      // ExpectError: This is expected to err; the type system is welcoming unknown props.
      propThatDoesntExist: 'shouldNotWork',
    }}
    subheaderTypographyProps={{
      component: 'a',
      // ExpectError: This is expected to err; the type system is welcoming unknown props.
      propThatDoesntExist: 'shouldNotWork',
    }}
  />;
  // @ts-expect-error
  <CardHeader
    titleTypographyProps={{ component: CustomComponent, numberProp: 2 }}
    subheaderTypographyProps={{ component: CustomComponent, numberProp: 2 }}
  />;
  <CardHeader
    // @ts-expect-error
    titleTypographyProps={{ component: CustomComponent, numberProp: 2 }}
    subheaderTypographyProps={{ component: CustomComponent, numberProp: 2, stringProp: 'yada' }}
  />;
  <CardHeader
    titleTypographyProps={{ component: CustomComponent, numberProp: 2, stringProp: 'yada' }}
    // @ts-expect-error
    subheaderTypographyProps={{ component: CustomComponent, numberProp: 2 }}
  />;
}
