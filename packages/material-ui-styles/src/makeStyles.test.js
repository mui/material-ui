import { assert } from 'chai';
import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import makeStyles from './makeStyles';

describe('makeStyles', () => {
  let mount;

  /**
   * returns a function that given the props for the styles object will return
   * the css classes
   * @param {object} styles argument for `makeStyles`
   */
  function createGetClasses(styles) {
    const useStyles = makeStyles(styles);
    let classes = {};

    function TestComponent(props) {
      classes = useStyles(props);
      return null;
    }

    return function getClasses(props) {
      mount(<TestComponent {...props} />);

      // clone
      return { ...classes };
    };
  }

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('appends classes', () => {
    const styles = { root: {} };
    const getClasses = createGetClasses(styles);

    const baseClasses = getClasses();

    const additionalClass = 'another-class';
    const extendedClasses = getClasses({ classes: { root: additionalClass } });

    assert.strictEqual(extendedClasses.root, `${baseClasses.root} ${additionalClass}`);
  });
});
