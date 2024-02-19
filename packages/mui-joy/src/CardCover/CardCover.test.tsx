import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import CardCover, { cardCoverClasses as classes } from '@mui/joy/CardCover';
import describeConformance from '../../test/describeConformance';

describe('<CardCover />', () => {
  const { render } = createRenderer();

  describeConformance(<CardCover />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyCardCover',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['classesRoot', 'componentsProp', 'themeVariants'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('add data-attribute to the first child', () => {
    const { container } = render(
      <CardCover>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </CardCover>,
    );
    expect(container.querySelector('[data-first-child]')).to.have.text('First');
  });
});
