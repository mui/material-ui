import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, render } from 'test/utils';
import useSelectChangeNotifiers from './useSelectChangeNotifiers';

describe('useSelectChangeNotifiers', () => {
  it('should call the registered handler when the value changes', () => {
    const handler = spy();

    function TestComponent() {
      const { registrationFunctions, notifySelectionChanged } = useSelectChangeNotifiers();
      registrationFunctions.registerSelectionChangeHandler(handler);
      const [value, setValue] = React.useState(0);

      const handleClick = (event: React.MouseEvent) => {
        setValue((v) => v + 1);
        notifySelectionChanged(event, value + 1);
      };

      return <button onClick={handleClick}>Update selection</button>;
    }

    const { getByRole } = render(<TestComponent />);
    const button = getByRole('button');

    act(() => {
      button.click();
    });

    expect(handler.callCount).to.equal(1);
    expect(handler.args[0][0]).to.have.property('type', 'click');
    expect(handler.args[0][1]).to.equal(1);
  });

  it('should call the registered handler when the highlight changes', () => {
    const handler = spy();

    function TestComponent() {
      const { registrationFunctions, notifyHighlightChanged } = useSelectChangeNotifiers();
      registrationFunctions.registerHighlightChangeHandler(handler);
      const [value, setValue] = React.useState(0);

      const handleClick = (event: React.MouseEvent) => {
        setValue((v) => v + 1);
        notifyHighlightChanged(event, value + 1);
      };

      return <button onClick={handleClick}>Update highlight</button>;
    }

    const { getByRole } = render(<TestComponent />);
    const button = getByRole('button');

    act(() => {
      button.click();
    });

    expect(handler.callCount).to.equal(1);
    expect(handler.args[0][0]).to.have.property('type', 'click');
    expect(handler.args[0][1]).to.equal(1);
  });

  it('should not call the handlers after they are unregistered', () => {
    const changeHandler = spy();
    const highlightChangeHandler = spy();

    function TestComponent() {
      const { registrationFunctions, notifySelectionChanged, notifyHighlightChanged } =
        useSelectChangeNotifiers();
      registrationFunctions.registerSelectionChangeHandler(changeHandler);
      registrationFunctions.registerHighlightChangeHandler(highlightChangeHandler);

      const [value, setValue] = React.useState(0);

      const updateValue = (event: React.MouseEvent) => {
        setValue((v) => v + 1);
        notifySelectionChanged(event, value + 1);
        notifyHighlightChanged(event, value + 1);
      };

      const clearHandlers = () => {
        registrationFunctions.unregisterSelectionChangeHandler(changeHandler);
        registrationFunctions.unregisterHighlightChangeHandler(highlightChangeHandler);
      };

      return (
        <div>
          <button onClick={updateValue}>Update selection</button>
          <button onClick={clearHandlers}>Clear handlers</button>
        </div>
      );
    }

    const { getByText } = render(<TestComponent />);
    const updateButton = getByText('Update selection');
    const clearButton = getByText('Clear handlers');

    act(() => {
      updateButton.click();
    });

    expect(changeHandler.callCount).to.equal(1);
    expect(highlightChangeHandler.callCount).to.equal(1);

    act(() => {
      clearButton.click();
    });

    act(() => {
      updateButton.click();
    });

    expect(changeHandler.callCount).to.equal(1);
    expect(highlightChangeHandler.callCount).to.equal(1);
  });
});
