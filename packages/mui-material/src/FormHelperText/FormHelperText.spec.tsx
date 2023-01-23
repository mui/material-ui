import * as React from 'react';
import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';
import { expectType } from '@mui/types';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props: FormHelperTextProps<'div'> = {
  component: 'div',
  onChange: (event) => {
    expectType<React.FormEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props2: FormHelperTextProps = {
  onChange: (event) => {
    expectType<React.FormEvent<HTMLParagraphElement>, typeof event>(event);
  },
};

const props3: FormHelperTextProps<'span'> = {
  // @ts-expect-error
  component: 'div',
};

const TestComponent = () => {
  return (
    <React.Fragment>
      <FormHelperText />
      <FormHelperText component={'a'} href="/test" />

      <FormHelperText component={CustomComponent} stringProp="s" numberProp={1} />
      {
        // @ts-expect-error
        <FormHelperText component={CustomComponent} />
      }
      <FormHelperText
        component="span"
        onChange={(event) => {
          expectType<React.FormEvent<HTMLSpanElement>, typeof event>(event);
        }}
      />
    </React.Fragment>
  );
};
