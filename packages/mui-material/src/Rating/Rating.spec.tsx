import * as React from 'react';
import { expectType } from '@mui/types';
import Rating from '@mui/material/Rating';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

function RatingTest() {
  return (
    <div>
      <Rating />
      <Rating precision={0.5} />

      <Rating
        component="a"
        href="test"
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof event>(event);
        }}
      />
      <Rating component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error missing stringProp and numberProp */}
      <Rating component={CustomComponent} />
    </div>
  );
}
