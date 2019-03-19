import React from 'react';
import { styled } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

const MyPaper = styled(Paper)({
  padding: 16,
  color: 'red',
  '& p': {
    color: 'green',
    '& span': {
      color: 'blue',
    },
  },
});

export default function NestedStylesStyledComponents() {
  return (
    <MyPaper>
      This is red since it is inside MyPaper.
      <p>
        This is green since it is inside the paragraph{' '}
        <span>and this is blue since it is inside the span</span>
      </p>
    </MyPaper>
  );
}
