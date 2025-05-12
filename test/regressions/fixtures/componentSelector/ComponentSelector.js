import * as React from 'react';
import { styled } from '@mui/material/styles';

const Child = styled('div', {
  target: 'child', // simulate a class name from @emotion/babel-plugin
})({
  color: 'blue',
});

const Parent = styled('div')`
  ${Child} {
    color: red;
  }
`;

const Parent2 = styled('div')({
  [Child]: {
    color: 'red',
  },
});

export default function ComponentSelector() {
  return (
    <div>
      <Parent>
        <Child>I am red (literal).</Child>
      </Parent>
      <Parent2>
        <Child>I am red (object).</Child>
      </Parent2>
    </div>
  );
}
