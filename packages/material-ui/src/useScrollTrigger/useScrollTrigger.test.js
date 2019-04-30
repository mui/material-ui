import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { assert } from 'chai';
import { spy } from 'sinon';
import useScrollTrigger from './useScrollTrigger';

describe('useScrollTrigger', () => {
  let mount;
  let values;  

  before(() => {
    mount = createMount({ strict: true });
  });

  beforeEach(() => {
    values = spy();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('defaultTrigger', () => {
    it('should be false by default', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const Test = () => {
        const [trigger] = useScrollTrigger();
        React.useEffect(() => values(trigger));
        return <span ref={ref}>{`${trigger}`}</span>;
      };

      mount(<Test />);      
      assert.strictEqual(text(), 'false');
      assert.strictEqual(values.callCount, 1);
    });
  });
});
