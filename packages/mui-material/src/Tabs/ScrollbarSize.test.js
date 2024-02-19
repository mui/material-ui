import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import ScrollbarSize from './ScrollbarSize';

describe('<ScrollbarSize />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  describe('mount', () => {
    it('should call on initial load', () => {
      const onChange = spy();
      render(<ScrollbarSize onChange={onChange} />);

      expect(onChange.called).to.equal(true);
    });
  });

  describe('prop: onChange', () => {
    it('should call on first resize event', () => {
      const onChange = spy();
      const { container } = render(<ScrollbarSize onChange={onChange} />);
      stub(container.firstChild, 'offsetHeight').get(() => 20);
      stub(container.firstChild, 'clientHeight').get(() => 0);

      onChange.resetHistory();

      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][0]).to.equal(20);
    });

    it('should not call if height has not changed from previous resize', () => {
      const onChange = spy();
      const { container } = render(<ScrollbarSize onChange={onChange} />);
      stub(container.firstChild, 'offsetHeight').get(() => 20);
      stub(container.firstChild, 'clientHeight').get(() => 0);

      onChange.resetHistory();

      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][0]).to.equal(20);
    });
  });
});
