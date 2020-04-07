import * as React from 'react';
import CardHeader, { CardHeaderProps, CardHeaderTypeMap } from '@material-ui/core/CardHeader';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

type DefaultComponent = CardHeaderTypeMap['defaultComponent'];

interface ComponentProp {
  component?: React.ElementType;
}

function createElementBasePropMixedTest() {
  React.createElement<CardHeaderProps<DefaultComponent, ComponentProp>>(CardHeader);
  React.createElement<CardHeaderProps<DefaultComponent, ComponentProp>>(CardHeader, {
    component: 'div',
  });
  // ExpectError: type system should be demanding the required props of "CustomComponent"
  React.createElement<CardHeaderProps<DefaultComponent, ComponentProp>>(CardHeader, {
    component: CustomComponent,
  });
  // $ExpectError
  React.createElement<CardHeaderProps<DefaultComponent, ComponentProp>>(CardHeader, {
    // This test shouldn't fail but does; stringProp & numberProp are required props of CustomComponent
    component: CustomComponent,
    stringProp: '',
    numberProp: 0,
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    disableTypography: true,
  });
  // $ExpectError
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    unknownProp: 'shouldNotWork',
  });
  // $ExpectError
  React.createElement<CardHeaderProps>(CardHeader, {
    disableTypography: 'hello',
  });
  // $ExpectError
  React.createElement<CardHeaderProps>(CardHeader, {
    disableTypography: 1,
  });
  // $ExpectError
  React.createElement<CardHeaderProps<any, ComponentProp>>(CardHeader, {
    component: 'incorrectElement',
  });
}

function createElementTypographyTest() {
  React.createElement<CardHeaderProps>(CardHeader, {
    titleTypographyProps: {
      align: 'center',
    },
  });
  // $ExpectError
  React.createElement<CardHeaderProps>(CardHeader, {
    titleTypographyProps: {
      align: 'incorrectAlign',
    },
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    titleTypographyProps: {
      variant: 'body1',
    },
  });
  // $ExpectError
  React.createElement<CardHeaderProps>(CardHeader, {
    titleTypographyProps: {
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
  // $ExpectError
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    titleTypographyProps: {
      component: 'incorrectComponent',
    },
  });
  // $ExpectError
  React.createElement<CardHeaderProps>(CardHeader, {
    titleTypographyProps: true,
  });
}

function componentPropTest() {
  <CardHeader component="div" />;
  <CardHeader component={CustomComponent} stringProp="string" numberProp={1} />;
  // $ExpectError
  <CardHeader component="incorrectComponent" />;
  // $ExpectError
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
  // $ExpectError
  <CardHeader component="incorrectComponent" />;
  // $ExpectError
  <CardHeader component={CustomComponent} />;
  <CardHeader
    component={CustomComponent}
    stringProp="string"
    numberProp={1}
    // $ExpectError
    titleTypographyProps={{ component: CustomComponent, stringProp: 'stringProp' }}
    subheaderTypographyProps={{
      component: CustomComponent,
      stringProp: 'stringProp',
      numberProp: 2,
    }}
  />;
  // $ExpectError
  <CardHeader
    component={CustomComponent}
    stringProp="string"
    numberProp={1}
    titleTypographyProps={{ component: CustomComponent, stringProp: 'stringProp' }}
    subheaderTypographyProps={{ component: CustomComponent, stringProp: 'stringProp' }}
  />;
  <CardHeader
    // $ExpectError
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
  // $ExpectError
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
  // $ExpectError
  <CardHeader
    titleTypographyProps={{
      component: CustomComponent,
      stringProp: 'stringProp',
      numberProp: '',
    }}
  />;
  // $ExpectError
  <CardHeader titleTypographyProps={{ component: CustomComponent, numberProp: 2 }} />;
  <CardHeader
    titleTypographyProps={{
      component: 'a',
      // ExpectError: This is expected to err; the type system is welcoming unknown props.
      propThatDoesntExist: 'shouldNotWork',
    }}
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
  // $ExpectError
  <CardHeader subheaderTypographyProps={{ component: 'incorrectComponent' }} />;
  // $ExpectError
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
  // $ExpectError
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
  // $ExpectError
  <CardHeader
    titleTypographyProps={{ component: CustomComponent, numberProp: 2 }}
    subheaderTypographyProps={{ component: CustomComponent, numberProp: 2 }}
  />;
  <CardHeader
    // $ExpectError
    titleTypographyProps={{ component: CustomComponent, numberProp: 2 }}
    subheaderTypographyProps={{ component: CustomComponent, numberProp: 2, stringProp: 'yada' }}
  />;
  <CardHeader
    titleTypographyProps={{ component: CustomComponent, numberProp: 2, stringProp: 'yada' }}
    // $ExpectError
    subheaderTypographyProps={{ component: CustomComponent, numberProp: 2 }}
  />;
}
