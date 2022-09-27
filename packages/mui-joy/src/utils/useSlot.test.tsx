import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { styled } from '../styles';
import useSlot from './useSlot';

describe('useSlot', () => {
  const { render } = createRenderer();

  describe('single slot', () => {
    const ItemRoot = styled('button')({});
    const Item = React.forwardRef<
      HTMLButtonElement,
      { component?: React.ElementType; href?: string }
    >((props, ref) => {
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: props,
        ownerState: {},
      });
      return <SlotRoot {...rootProps} />;
    });

    it('should render correct tag', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('button')).toBeVisible();
    });

    it('should change leaf component and spread props', () => {
      const { getByRole } = render(<Item component="a" href="/" />);
      expect(getByRole('link')).toBeVisible();
    });
  });
});
