import * as React from 'react';
import CardHeader from '@material-ui/core/CardHeader';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

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
  <CardHeader titleTypographyProps={{ component: CustomComponent, numberProp: 2 }} />;
  <CardHeader
    titleTypographyProps={{
      component: 'a',
      // $ExpectError
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
      // $ExpectError
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
      // $ExpectError
      propThatDoesntExist: 'shouldNotWork',
    }}
    subheaderTypographyProps={{
      component: 'a',
      // $ExpectError
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
