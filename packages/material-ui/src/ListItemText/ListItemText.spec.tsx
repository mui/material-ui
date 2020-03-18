import * as React from 'react';
import { ListItemText } from '@material-ui/core';

const CustomComponent: React.FC<{ prop1: string; prop2: number }> = () => <div />;

function typographyPropsTest() {
  // $ExpectError
  <ListItemText primaryTypographyProps={{ component: 'incorrectComponent' }} />;
  <ListItemText primaryTypographyProps={{ component: 'a', href: 'href' }} />;
  <ListItemText
    primaryTypographyProps={{
      component: 'a',
      // $ExpectError
      htmlFor: 'not-existance-attribute',
    }}
  />;
  <ListItemText
    primaryTypographyProps={{ component: CustomComponent, prop1: 'prop1', prop2: 2 }}
  />;
  // $ExpectError
  <ListItemText primaryTypographyProps={{ component: CustomComponent, prop2: 2 }} />;
  <ListItemText primaryTypographyProps={{ variant: 'h1' }} />;
  <ListItemText primaryTypographyProps={{ align: 'left' }} />;
  <ListItemText
    primaryTypographyProps={{
      color: 'primary',
      display: 'block',
      gutterBottom: true,
      noWrap: true,
      variantMapping: { h1: 'h1' },
    }}
  />;
}

function secondaryTypographyPropsTest() {
  // $ExpectError
  <ListItemText secondaryTypographyProps={{ component: 'incorrectComponent' }} />;
  <ListItemText secondaryTypographyProps={{ component: 'a', href: 'href' }} />;
  <ListItemText
    secondaryTypographyProps={{
      component: 'a',
      // $ExpectError
      htmlFor: 'not-existance-attribute',
    }}
  />;
  <ListItemText
    secondaryTypographyProps={{ component: CustomComponent, prop1: 'prop1', prop2: 2 }}
  />;
  // $ExpectError
  <ListItemText secondaryTypographyProps={{ component: CustomComponent, prop2: 2 }} />;
  <ListItemText secondaryTypographyProps={{ variant: 'h1' }} />;
  <ListItemText secondaryTypographyProps={{ align: 'left' }} />;
  <ListItemText
    secondaryTypographyProps={{
      color: 'primary',
      display: 'block',
      gutterBottom: true,
      noWrap: true,
      variantMapping: { h1: 'h1' },
    }}
  />;
}

function mixedTypographyPropsTest() {
  <ListItemText
    // $ExpectError
    primaryTypographyProps={{ component: 'incorrectComponent' }}
    // $ExpectError
    secondaryTypographyProps={{ component: 'incorrectComponent' }}
  />;
  <ListItemText
    primaryTypographyProps={{ component: 'a', href: 'href' }}
    secondaryTypographyProps={{ component: 'a', href: 'href' }}
  />;
  <ListItemText
    primaryTypographyProps={{
      component: 'a',
      // $ExpectError
      htmlFor: 'not-existance-attribute',
    }}
    secondaryTypographyProps={{
      component: 'a',
      // $ExpectError
      htmlFor: 'not-existance-attribute',
    }}
  />;
  <ListItemText
    primaryTypographyProps={{ component: CustomComponent, prop1: 'prop1', prop2: 2 }}
    secondaryTypographyProps={{ component: CustomComponent, prop1: 'prop1', prop2: 2 }}
  />;
  <ListItemText
    // $ExpectError
    primaryTypographyProps={{ component: CustomComponent, prop2: 2 }}
    // $ExpectError
    secondaryTypographyProps={{ component: CustomComponent, prop2: 2 }}
  />;
}
