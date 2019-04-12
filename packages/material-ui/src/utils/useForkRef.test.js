import React from 'react';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import useForkRef from './useForkRef';

describe('useForkRef', () => {
  it('returns a single ref-setter function that forks the ref to its inputs', () => {
    function Component(props) {
      const { innerRef } = props;
      const ownRef = React.useRef();
      const [, forceUpdate] = React.useState(0);
      React.useEffect(() => forceUpdate(n => !n), []);

      const handleRef = useForkRef(innerRef, ownRef);

      return <div ref={handleRef}>{ownRef.current ? 'has a ref' : 'has no ref'}</div>;
    }

    Component.propTypes = {
      innerRef: PropTypes.any,
    };

    const outerRef = React.createRef();
    mount(<Component innerRef={outerRef} />);

    assert.strictEqual(outerRef.current.textContent, 'has a ref');
  });
});
