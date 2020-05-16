import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers, stub } from 'sinon';
import ScrollbarSize from './ScrollbarSize';
import { createClientRender } from 'test/utils/createClientRender';

describe('<ScrollbarSize />', () => {
  const render = createClientRender();
  let clock;

  before(() => {
    clock = useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  describe('mount', () => {
    it('should call on initial load', () => {
      const onChange = spy();
      render(<ScrollbarSize onChange={onChange} />);

      expect(onChange.callCount).to.equal(1);
    });
  });

  describe('prop: onChange', () => {
    it('should call on first resize event', () => {
      const onChange = spy();
      const { container } = render(<ScrollbarSize onChange={onChange} />);
      stub(container.firstChild, 'offsetHeight').get(() => 20);
      stub(container.firstChild, 'clientHeight').get(() => 0);

      expect(onChange.callCount).to.equal(1);
      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      expect(onChange.callCount).to.equal(2);
      expect(onChange.args[1][0]).to.equal(20);
    });

    it('should not call if height has not changed from previous resize', () => {
      const onChange = spy();
      const { container } = render(<ScrollbarSize onChange={onChange} />);
      stub(container.firstChild, 'offsetHeight').get(() => 20);
      stub(container.firstChild, 'clientHeight').get(() => 0);

      expect(onChange.callCount).to.equal(1);
      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      expect(onChange.callCount).to.equal(2);
      expect(onChange.args[1][0]).to.equal(20);
    });
  });
});
