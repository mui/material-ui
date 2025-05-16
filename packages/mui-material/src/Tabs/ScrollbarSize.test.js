import * as React from 'react';
import { expect } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import { createRenderer, act } from '@mui/internal-test-utils';
import ScrollbarSize from './ScrollbarSize';

describe('<ScrollbarSize />', () => {
  /** @type {import('sinon').SinonFakeTimers | null} */
  let timer = null;

  beforeEach(() => {
    timer = useFakeTimers({
      shouldClearNativeTimers: true,
      toFake: [
        'performance',
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
        'Date',
        'requestAnimationFrame',
        'cancelAnimationFrame',
      ],
    });
  });

  afterEach(() => {
    timer?.restore();
  });

  const { render } = createRenderer();

  describe('mount', () => {
    it('should call on initial load', () => {
      const onChange = spy();
      render(<ScrollbarSize onChange={onChange} />);

      expect(onChange.called).to.equal(true);
    });
  });

  describe('prop: onChange', () => {
    it('should call on first resize event', async () => {
      const onChange = spy();
      const { container } = render(<ScrollbarSize onChange={onChange} />);
      stub(container.firstChild, 'offsetHeight').get(() => 20);
      stub(container.firstChild, 'clientHeight').get(() => 0);

      onChange.resetHistory();

      window.dispatchEvent(new window.Event('resize', {}));
      await act(async () => {
        await timer?.tickAsync(166);
      });
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][0]).to.equal(20);
    });

    it('should not call if height has not changed from previous resize', async () => {
      const onChange = spy();
      const { container } = render(<ScrollbarSize onChange={onChange} />);
      stub(container.firstChild, 'offsetHeight').get(() => 20);
      stub(container.firstChild, 'clientHeight').get(() => 0);

      onChange.resetHistory();

      window.dispatchEvent(new window.Event('resize', {}));
      await act(async () => {
        await timer?.tickAsync(166);
      });
      window.dispatchEvent(new window.Event('resize', {}));
      await act(async () => {
        await timer?.tickAsync(166);
      });
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][0]).to.equal(20);
    });
  });
});
