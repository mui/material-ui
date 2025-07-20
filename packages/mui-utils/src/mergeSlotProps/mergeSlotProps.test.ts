import * as React from 'react';
import { expect } from 'chai';
import { EventHandlers } from '@mui/utils/types';
import mergeSlotProps from '@mui/utils/mergeSlotProps';

describe('mergeSlotProps', () => {
  it('overrides the internal props with the external ones', () => {
    const getSlotProps = () => ({
      prop1: 'internal',
      prop2: 'internal',
      prop3: 'internal',
      prop4: 'internal',
    });

    const additionalProps = {
      prop1: 'additional',
      prop2: 'additional',
      prop3: 'additional',
    };

    const externalForwardedProps = {
      prop1: 'externalForwarded',
      prop2: 'externalForwarded',
    };

    const externalSlotProps = {
      prop1: 'externalSlot',
    };

    const merged = mergeSlotProps({
      getSlotProps,
      additionalProps,
      externalForwardedProps,
      externalSlotProps,
    });

    expect(merged.props.prop1).to.equal('externalSlot');
    expect(merged.props.prop2).to.equal('externalForwarded');
    expect(merged.props.prop3).to.equal('additional');
    expect(merged.props.prop4).to.equal('internal');
  });

  describe('it joins all class names in order from least to most important', () => {
    it('when internal classNames from getSlotProps are included', () => {
      const getSlotProps = () => ({
        className: 'internal',
      });

      const additionalProps = {
        className: 'additional',
      };

      const externalForwardedProps = {
        className: 'externalForwarded',
      };

      const externalSlotProps = {
        className: 'externalSlot',
      };

      const className = ['class1', 'class2'];

      const merged = mergeSlotProps({
        getSlotProps,
        additionalProps,
        externalForwardedProps,
        externalSlotProps,
        className,
      });

      expect(merged.props.className).to.equal(
        'internal additional class1 class2 externalForwarded externalSlot',
      );
    });

    it('when getSlotProps is not present', () => {
      const additionalProps = {
        className: 'additional',
      };

      const externalForwardedProps = {
        className: 'externalForwarded',
      };

      const externalSlotProps = {
        className: 'externalSlot',
      };

      const className = ['class1', 'class2'];

      const merged = mergeSlotProps({
        additionalProps,
        externalForwardedProps,
        externalSlotProps,
        className,
      });

      expect(merged.props.className).to.equal(
        'additional class1 class2 externalForwarded externalSlot',
      );
    });
  });

  it('merges the style props', () => {
    const getSlotProps = () => ({
      style: {
        fontSize: '12px',
        textAlign: 'center' as const,
      },
    });

    const additionalProps = {
      style: {
        fontSize: '14px',
        color: 'red',
      },
    };

    const externalForwardedProps = {
      style: {
        fontWeight: 500,
      },
    };

    const externalSlotProps = {
      style: {
        textDecoration: 'underline',
      },
    };

    const merged = mergeSlotProps({
      getSlotProps,
      additionalProps,
      externalForwardedProps,
      externalSlotProps,
    });

    expect(merged.props.style).to.deep.equal({
      textAlign: 'center',
      color: 'red',
      fontSize: '14px',
      fontWeight: 500,
      textDecoration: 'underline',
    });
  });

  it('returns the ref returned from the getSlotProps function', () => {
    const ref = React.createRef();
    const getSlotProps = () => ({
      ref,
    });

    const merged = mergeSlotProps({
      getSlotProps,
    });

    expect(merged.internalRef).to.equal(ref);
  });

  it('does not require any parameters', () => {
    const merged = mergeSlotProps({});
    expect(merged.props).to.deep.equal({});
  });

  it('passes the external event handlers to the getSlotProps function (if defined)', () => {
    const externalClickHandler = () => {};
    const externalMouseOverHandler = () => {};

    const getSlotProps = (eventHandlers: EventHandlers) => {
      expect(eventHandlers.onClick).to.equal(externalClickHandler);
      expect(eventHandlers.onMouseOver).to.equal(externalMouseOverHandler);
      return {};
    };

    const externalForwardedProps = {
      onClick: externalClickHandler,
    };

    const externalSlotProps = {
      onMouseOver: externalMouseOverHandler,
    };

    const merged = mergeSlotProps({
      getSlotProps,
      externalForwardedProps,
      externalSlotProps,
    });

    expect(Object.keys(merged.props)).not.to.contain('onClick');
    expect(Object.keys(merged.props)).not.to.contain('onMouseOver');
  });
});
