import * as React from 'react';
import { ListItemText } from '@mui/material';

const CustomComponent: React.FC<{ prop1: string; prop2: number }> = function CustomComponent() {
  return <div />;
};

function typographyPropsTest() {
  // @ts-expect-error
  <ListItemText primaryTypographyProps={{ component: 'incorrectComponent' }} />;
  <ListItemText primaryTypographyProps={{ component: 'a', href: 'href' }} />;
  <ListItemText
    primaryTypographyProps={{
      component: 'a',
      // @ts-expect-error
      htmlFor: 'nonexistent-attribute',
    }}
  />;
  <ListItemText
    primaryTypographyProps={{ component: CustomComponent, prop1: 'prop1', prop2: 2 }}
  />;
  // @ts-expect-error
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
  // @ts-expect-error
  <ListItemText secondaryTypographyProps={{ component: 'incorrectComponent' }} />;
  <ListItemText secondaryTypographyProps={{ component: 'a', href: 'href' }} />;
  <ListItemText
    secondaryTypographyProps={{
      component: 'a',
      // @ts-expect-error
      htmlFor: 'nonexistent-attribute',
    }}
  />;
  <ListItemText
    secondaryTypographyProps={{ component: CustomComponent, prop1: 'prop1', prop2: 2 }}
  />;
  // @ts-expect-error
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
    // @ts-expect-error
    primaryTypographyProps={{ component: 'incorrectComponent' }}
    // @ts-expect-error
    secondaryTypographyProps={{ component: 'incorrectComponent' }}
  />;
  <ListItemText
    primaryTypographyProps={{ component: 'a', href: 'href' }}
    secondaryTypographyProps={{ component: 'a', href: 'href' }}
  />;
  <ListItemText
    primaryTypographyProps={{
      component: 'a',
      // @ts-expect-error
      htmlFor: 'nonexistent-attribute',
    }}
    secondaryTypographyProps={{
      component: 'a',
      // @ts-expect-error
      htmlFor: 'nonexistent-attribute',
    }}
  />;
  <ListItemText
    primaryTypographyProps={{ component: CustomComponent, prop1: 'prop1', prop2: 2 }}
    secondaryTypographyProps={{ component: CustomComponent, prop1: 'prop1', prop2: 2 }}
  />;
  <ListItemText
    // @ts-expect-error
    primaryTypographyProps={{ component: CustomComponent, prop2: 2 }}
    // @ts-expect-error
    secondaryTypographyProps={{ component: CustomComponent, prop2: 2 }}
  />;
}
