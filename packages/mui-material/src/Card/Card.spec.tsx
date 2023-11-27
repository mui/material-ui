import * as React from 'react';
import { expectType } from '@mui/types';
import Card from '@mui/material/Card';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

function CardTest() {
  return (
    <div>
      <Card />
      <Card elevation={4} />
      <Card
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLDivElement, MouseEvent>, typeof event>(event);
        }}
      />
      <Card
        component="a"
        href="test"
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof event>(event);
        }}
      />
      <Card component="a" href="test" />

      <Card component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error missing stringProp and numberProp */}
      <Card component={CustomComponent} />
    </div>
  );
}
