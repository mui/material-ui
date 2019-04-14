import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import PropTypes from 'prop-types';
import { isMuiElement, setRef, useForkRef } from './reactHelpers';
import { Input, ListItemAvatar, ListItemSecondaryAction, SvgIcon } from '..';
import { mount } from 'enzyme';

describe('utils/reactHelpers.js', () => {
  describe('isMuiElement', () => {
    it('should match static muiName property', () => {
      const Component = () => null;
      Component.muiName = 'Component';

      assert.strictEqual(isMuiElement(<Component />, ['Component']), true);
      assert.strictEqual(isMuiElement(<div />, ['Input']), false);
      assert.strictEqual(isMuiElement(null, ['SvgIcon']), false);
      assert.strictEqual(isMuiElement('TextNode', ['SvgIcon']), false);
    });

    it('should be truthy for matching components', () => {
      [
        [Input, 'Input'],
        [ListItemAvatar, 'ListItemAvatar'],
        [ListItemSecondaryAction, 'ListItemSecondaryAction'],
        [SvgIcon, 'SvgIcon'],
      ].forEach(([Component, muiName]) => {
        assert.strictEqual(isMuiElement(<Component />, [muiName]), true);
      });
    });
  });

  describe('setRef', () => {
    it('can handle callback refs', () => {
      const ref = spy();
      const instance = 'proxy';

      setRef(ref, instance);

      assert.strictEqual(ref.called, true);
      assert.strictEqual(ref.firstCall.args[0], instance);
    });

    it('can handle ref objects', () => {
      const ref = React.createRef();
      const instance = 'proxy';

      setRef(ref, instance);

      assert.strictEqual(ref.current, instance);
    });

    it('ignores falsy refs without errors', () => {
      const instance = 'proxy';

      // all no-ops
      setRef(undefined, instance);
      setRef(null, instance);
    });

    it('throws on legacy string refs', () => {
      assert.throws(() => setRef('stringRef1', 'proxy'));
    });
  });

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
});
