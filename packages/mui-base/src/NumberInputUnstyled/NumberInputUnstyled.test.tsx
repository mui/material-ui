import * as React from 'react';
import { /* createMount, */ createRenderer /* , describeConformanceUnstyled */ } from 'test/utils';
import { expect } from 'chai';
import NumberInputUnstyled from '@mui/base/NumberInputUnstyled';

describe('<InputUnstyled />', () => {
  // const mount = createMount();
  const { render } = createRenderer();

  // TODO: wow this looks complicated
  // describeConformanceUnstyled(<NumberInputUnstyled />, () => ({
  //   inheritComponent: 'div',
  //   render,
  //   mount,
  //   refInstanceof: window.HTMLDivElement,
  //   testComponentPropWith: 'div',
  //   muiName: 'MuiInput',
  //   slots: {
  //     root: {
  //       expectedClassName: '',
  //     },
  //     input: {
  //       expectedClassName: '',
  //       testWithElement: 'input',
  //     },
  //   },
  // }));

  it('should be able to attach input ref passed through props', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const { getByRole } = render(<NumberInputUnstyled slotProps={{ input: { ref: inputRef } }} />);

    expect(inputRef.current).to.deep.equal(getByRole('spinbutton'));
  });
});
