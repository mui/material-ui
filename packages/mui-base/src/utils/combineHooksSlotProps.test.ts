import { expect } from 'chai';
import { combineHooksSlotProps } from './combineHooksSlotProps';
import { EventHandlers } from './types';

describe('combineHooksSlotProps', () => {
  let log: string[];

  beforeEach(() => {
    log = [];
  });

  function getFirstSlotProps<Other extends EventHandlers>(other: Other = {} as Other) {
    return {
      ...other,
      'data-testid': 'first',
      onClick: (event: React.MouseEvent) => {
        other?.onClick?.(event);
        log.push('first onClick');
      },
      onMouseDown: (event: React.MouseEvent) => {
        other?.onMouseDown?.(event);
        log.push('first onMouseDown');
      },
    };
  }

  function getSecondSlotProps<Other extends EventHandlers>(other: Other = {} as Other) {
    return {
      ...other,
      'data-testid': 'second',
      onClick: (event: React.MouseEvent) => {
        other?.onClick?.(event);
        log.push('second onClick');
      },
      onBlur: (event: React.FocusEvent) => {
        other?.onBlur?.(event);
        log.push('second onBlur');
      },
    };
  }

  function getThirdSlotProps<Other extends EventHandlers>(other: Other = {} as Other) {
    return {
      ...other,
      'data-testid': 'third',
      onClick: (event: React.MouseEvent) => {
        other?.onClick?.(event);
        log.push('third onClick');
      },
    };
  }

  it('combines two prop getters', () => {
    const externalEventHandlers = {
      onClick: () => {
        log.push('external onClick');
      },
      onBlur: () => {
        log.push('external onBlur');
      },
      onFocus: () => {
        log.push('external onFocus');
      },
    };

    const createCombinedSlotProps = combineHooksSlotProps(getFirstSlotProps, getSecondSlotProps);

    const slotProps = createCombinedSlotProps(externalEventHandlers);

    expect(Object.keys(slotProps)).to.deep.equal([
      'onClick',
      'onBlur',
      'onFocus',
      'data-testid',
      'onMouseDown',
    ]);

    expect(slotProps['data-testid']).to.equal('second');

    slotProps.onClick({} as React.MouseEvent);
    expect(log).to.deep.equal(['external onClick', 'first onClick', 'second onClick']);

    log = [];
    slotProps.onMouseDown({} as React.MouseEvent);
    expect(log).to.deep.equal(['first onMouseDown']);

    log = [];
    slotProps.onBlur({} as React.FocusEvent);
    expect(log).to.deep.equal(['external onBlur', 'second onBlur']);

    log = [];
    slotProps.onFocus();
    expect(log).to.deep.equal(['external onFocus']);
  });

  it('can be composed', () => {
    const externalEventHandlers = {
      onClick: () => {
        log.push('external onClick');
      },
    };

    const createCombinedSlotProps = combineHooksSlotProps(
      getFirstSlotProps,
      combineHooksSlotProps(getSecondSlotProps, getThirdSlotProps),
    );

    const slotProps = createCombinedSlotProps(externalEventHandlers);
    expect(slotProps['data-testid']).to.equal('third');

    slotProps.onClick({} as React.MouseEvent);
    expect(log).to.deep.equal([
      'external onClick',
      'first onClick',
      'second onClick',
      'third onClick',
    ]);
  });

  it('can be composed in another way', () => {
    const externalEventHandlers = {
      onClick: () => {
        log.push('external onClick');
      },
    };

    const createCombinedSlotProps = combineHooksSlotProps(
      combineHooksSlotProps(getFirstSlotProps, getSecondSlotProps),
      getThirdSlotProps,
    );

    const slotProps = createCombinedSlotProps(externalEventHandlers);
    expect(slotProps['data-testid']).to.equal('third');

    slotProps.onClick({} as React.MouseEvent);
    expect(log).to.deep.equal([
      'external onClick',
      'first onClick',
      'second onClick',
      'third onClick',
    ]);
  });
});
