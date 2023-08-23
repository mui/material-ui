import { expect } from 'chai';
import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import Skeleton, { skeletonClasses as classes } from '@mui/material/Skeleton';

describe('<Skeleton />', () => {
  const { render } = createRenderer();

  describeConformance(<Skeleton />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    refInstanceof: window.HTMLSpanElement,
    muiName: 'MuiSkeleton',
    testVariantProps: { variant: 'circular', animation: 'wave' },
    skip: ['componentsProp'],
  }));

  it('should render', () => {
    const { container } = render(<Skeleton />);

    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should get withChildren class when passed children', () => {
    const { container } = render(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(container.firstChild).to.have.class(classes.withChildren);
  });

  it('should get fitContent class when passed children and no width', () => {
    const { container: containerWithoutWidth } = render(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(containerWithoutWidth.firstChild).to.have.class(classes.fitContent);

    const { container: containerWithWidth } = render(
      <Skeleton width="100">
        <span />
      </Skeleton>,
    );

    expect(containerWithWidth.firstChild).not.to.have.class(classes.fitContent);
  });

  it('should get heightAuto class when passed children and no height', () => {
    const { container: containerWithoutHeight } = render(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(containerWithoutHeight.firstChild).to.have.class(classes.heightAuto);

    const { container: containerWithHeight } = render(
      <Skeleton height="100">
        <span />
      </Skeleton>,
    );

    expect(containerWithHeight.firstChild).not.to.have.class(classes.heightAuto);
  });

  describe('Variant Prop', () => {
    it('should get `text` class when no variant is specified', () => {
      const { container } = render(
        <Skeleton>
          <span />
        </Skeleton>,
      );

      expect(container.firstChild).to.have.class(classes.text);
    });

    it('should get `circular` when variant is set to `circular`', () => {
      const { container } = render(
        <Skeleton variant="circular">
          <span />
        </Skeleton>,
      );

      expect(container.firstChild).to.have.class(classes.circular);
    });

    it('should get `rounded` when variant is set to `rounded`', () => {
      const { container } = render(
        <Skeleton variant="rounded">
          <span />
        </Skeleton>,
      );

      expect(container.firstChild).to.have.class(classes.rounded);
    });

    it('should get `rectangular` when variant is set to `rectangular`', () => {
      const { container } = render(
        <Skeleton variant="rectangular">
          <span />
        </Skeleton>,
      );

      expect(container.firstChild).to.have.class(classes.rectangular);
    });
  });

  describe('Size & Shape Prop', () => {
    it('should get `box` class when size is set to `box`', () => {
      const { container } = render(
        <Skeleton size="box">
          <span />
        </Skeleton>,
      );

      expect(container.firstChild).to.have.class(classes.box);
    });

    it('should set `size` prop over `variant` prop', () => {
      const { container } = render(
        <Skeleton size="box" variant="text">
          <span />
        </Skeleton>,
      );

      expect(container.firstChild).to.have.class(classes.box);
      expect(container.firstChild).not.to.have.class(classes.text);
    });

    it('should get `circular` when shape is set to `circular`', () => {
      const { container } = render(
        <Skeleton shape="circular">
          <span />
        </Skeleton>,
      );

      expect(container.firstChild).to.have.class(classes.circular);
    });

    it('should set `shape` prop over `variant` prop', () => {
      const { container } = render(
        <Skeleton variant="rounded" shape="rectangular">
          <span />
        </Skeleton>,
      );

      expect(container.firstChild).to.have.class(classes.rectangular);
      expect(container.firstChild).not.to.have.class(classes.rounded);
    });
  });
});
