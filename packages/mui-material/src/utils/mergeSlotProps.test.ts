import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { SxProps } from '@mui/material/styles';

import mergeSlotProps from './mergeSlotProps';

type OwnerState = {
  className: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
};

describe('utils/index.js', () => {
  describe('mergeSlotProps', () => {
    it('external slot props is undefined', () => {
      expect(
        mergeSlotProps<OwnerState>(undefined, {
          className: 'default',
          'aria-label': 'foo',
        }),
      ).to.deep.equal({
        className: 'default',
        'aria-label': 'foo',
      });
    });

    it('merge styles', () => {
      expect(
        mergeSlotProps<{ style: React.CSSProperties }>(
          { style: { color: 'red' } },
          { style: { backgroundColor: 'blue' } },
        ),
      ).to.deep.equal({
        style: { color: 'red', backgroundColor: 'blue' },
      });

      // external styles should override
      expect(
        mergeSlotProps<{ style: React.CSSProperties }>(
          { style: { backgroundColor: 'red' } },
          { style: { backgroundColor: 'blue' } },
        ),
      ).to.deep.equal({
        style: { backgroundColor: 'red' },
      });
    });

    it('merge sx', () => {
      expect(
        mergeSlotProps<{ sx: SxProps }>(
          { sx: { color: 'red' } },
          { sx: { backgroundColor: 'blue' } },
        ),
      ).to.deep.equal({
        sx: [{ backgroundColor: 'blue' }, { color: 'red' }],
      });
    });

    it('merge sx array', () => {
      expect(
        mergeSlotProps<{ sx: SxProps }>(
          { sx: [{ color: 'red', '&.Mui-disabled': { opacity: 0 } }] },
          { sx: [{ backgroundColor: 'blue', '&.Mui-disabled': { opacity: 0.5 } }] },
        ),
      ).to.deep.equal({
        sx: [
          { backgroundColor: 'blue', '&.Mui-disabled': { opacity: 0.5 } },
          { color: 'red', '&.Mui-disabled': { opacity: 0 } },
        ],
      });
    });

    it('external slot props should override', () => {
      expect(
        mergeSlotProps<OwnerState>(
          { className: 'external', 'aria-label': 'bar' },
          { className: 'default', 'aria-label': 'foo' },
        ),
      ).to.deep.equal({
        className: 'default external',
        'aria-label': 'bar',
      });
    });

    it('merges refs', () => {
      const defaultRef = React.createRef<HTMLDivElement>();
      const externalRef = React.createRef<HTMLDivElement>();

      const merged = mergeSlotProps<{ ref?: React.Ref<HTMLDivElement> }>(
        { ref: externalRef },
        { ref: defaultRef },
      );

      expect(merged.ref).to.be.a('function');

      const instance = document.createElement('div');
      const cleanup = (merged.ref as React.RefCallback<HTMLDivElement>)(instance);

      expect(defaultRef.current).to.equal(instance);
      expect(externalRef.current).to.equal(instance);

      cleanup?.();

      expect(defaultRef.current).to.equal(null);
      expect(externalRef.current).to.equal(null);
    });

    it('external slot props is a function', () => {
      expect(
        mergeSlotProps<(ownerState: OwnerState) => OwnerState, OwnerState>(
          () => ({
            className: 'external',
          }),
          { className: 'default', 'aria-label': 'foo' },
        )({ className: '' }),
      ).to.deep.equal({
        className: 'default external',
        'aria-label': 'foo',
      });
    });

    it('default slot props is a function', () => {
      expect(
        mergeSlotProps<OwnerState, (ownerState: OwnerState) => OwnerState>(
          {
            className: 'external',
          },
          () => ({ className: 'default', 'aria-label': 'foo' }),
        )({ className: 'base' }),
      ).to.deep.equal({
        className: 'base default external',
        'aria-label': 'foo',
      });
    });

    it('merges callback refs for slot prop callbacks', () => {
      let defaultRefValue: HTMLDivElement | null = null;
      let externalRefValue: HTMLDivElement | null = null;

      const merged = mergeSlotProps<
        (ownerState: OwnerState) => { ref: React.Ref<HTMLDivElement> },
        (ownerState: OwnerState) => { ref: React.Ref<HTMLDivElement> }
      >(
        () => ({
          ref: (instance) => {
            externalRefValue = instance;

            return () => {
              externalRefValue = null;
            };
          },
        }),
        () => ({
          ref: (instance) => {
            defaultRefValue = instance;

            return () => {
              defaultRefValue = null;
            };
          },
        }),
      )({ className: '' });

      expect(merged.ref).to.be.a('function');

      const instance = document.createElement('div');
      const cleanup = (merged.ref as React.RefCallback<HTMLDivElement>)(instance);

      expect(defaultRefValue).to.equal(instance);
      expect(externalRefValue).to.equal(instance);

      cleanup?.();

      expect(defaultRefValue).to.equal(null);
      expect(externalRefValue).to.equal(null);
    });

    it('both slot props are functions', () => {
      expect(
        mergeSlotProps<(ownerState: OwnerState) => OwnerState>(
          () => ({
            className: 'external',
          }),
          () => ({
            className: 'default',
            'aria-label': 'foo',
          }),
        )({ className: 'base' }),
      ).to.deep.equal({
        className: 'base default external',
        'aria-label': 'foo',
      });
    });

    it('merge styles for callbacks', () => {
      expect(
        mergeSlotProps(
          () => ({
            style: { color: 'red' },
          }),
          () => ({
            style: { backgroundColor: 'blue' },
          }),
        )(),
      ).to.deep.equal({
        style: { color: 'red', backgroundColor: 'blue' },
      });

      // external styles should override
      expect(
        mergeSlotProps(
          () => ({
            style: { backgroundColor: 'red' },
          }),
          () => ({
            style: { backgroundColor: 'blue' },
          }),
        )(),
      ).to.deep.equal({
        style: { backgroundColor: 'red' },
      });
    });

    it('merge sx for callback', () => {
      expect(
        mergeSlotProps(
          () => ({
            sx: { color: 'red' },
          }),
          () => ({
            sx: { backgroundColor: 'blue' },
          }),
        )(),
      ).to.deep.equal({
        sx: [{ backgroundColor: 'blue' }, { color: 'red' }],
      });
    });

    it('merge sx array for callback', () => {
      expect(
        mergeSlotProps(
          () => ({ sx: [{ color: 'red', '&.Mui-disabled': { opacity: 0 } }] }),
          () => ({ sx: [{ backgroundColor: 'blue', '&.Mui-disabled': { opacity: 0.5 } }] }),
        )(),
      ).to.deep.equal({
        sx: [
          { backgroundColor: 'blue', '&.Mui-disabled': { opacity: 0.5 } },
          { color: 'red', '&.Mui-disabled': { opacity: 0 } },
        ],
      });
    });

    it('external callback should be called with default slot props', () => {
      expect(
        mergeSlotProps<(ownerState: OwnerState) => OwnerState>(
          ({ 'aria-label': ariaLabel }) => ({
            className: 'external',
            'aria-label': ariaLabel === 'foo' ? 'bar' : 'baz',
          }),
          () => ({
            className: 'default',
            'aria-label': 'foo',
          }),
        )({ className: 'base', 'aria-label': 'unknown' }),
      ).to.deep.equal({
        className: 'base default external',
        'aria-label': 'bar',
      });
    });

    it('automatically merge function based on the default slot props', () => {
      const slotPropsOnClick = spy();
      const defaultPropsOnClick = spy();

      const defaultPropsOnChange = spy();

      const slotPropsFoo = spy();
      const defaultPropsFoo = spy();

      const mergedSlotProps = mergeSlotProps<{
        onClick: (arg1: string, arg2: string) => string;
        onChange?: (arg1: string, arg2: string) => string;
        foo: (arg1: string, arg2: string) => string;
      }>(
        {
          onClick: slotPropsOnClick,
          foo: slotPropsFoo,
        },
        {
          onClick: defaultPropsOnClick,
          onChange: defaultPropsOnChange,
          foo: defaultPropsFoo,
        },
      );

      mergedSlotProps.onClick('arg1', 'arg2');
      expect(defaultPropsOnClick.callCount).to.equal(1);
      expect(defaultPropsOnClick.args[0]).to.deep.equal(['arg1', 'arg2']);
      expect(slotPropsOnClick.callCount).to.equal(1);
      expect(slotPropsOnClick.args[0]).to.deep.equal(['arg1', 'arg2']);

      mergedSlotProps.onChange?.('arg1', 'arg2');
      expect(defaultPropsOnChange.callCount).to.equal(1);
      expect(defaultPropsOnChange.args[0]).to.deep.equal(['arg1', 'arg2']);

      mergedSlotProps.foo('arg1', 'arg2');
      expect(defaultPropsFoo.callCount).to.equal(0);
      expect(slotPropsFoo.callCount).to.equal(1);
      expect(slotPropsFoo.args[0]).to.deep.equal(['arg1', 'arg2']);
    });
  });
});
