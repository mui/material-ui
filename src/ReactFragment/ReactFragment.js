/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Copied from react/lib/ReactFragment in React 15.5.4
 * because this file does not exist anymore in React 16.
 * Modified to match code style.
 */

import _prodInvariant from 'react/lib/reactProdInvariant';

import ReactChildren from 'react/lib/ReactChildren';
import ReactElement from 'react/lib/ReactElement';

import emptyFunction from 'fbjs/lib/emptyFunction';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';

/**
 * We used to allow keyed objects to serve as a collection of ReactElements,
 * or nested sets. This allowed us a way to explicitly key a set or fragment of
 * components. This is now being replaced with an opaque data structure.
 * The upgrade path is to call React.addons.createFragment({ key: value }) to
 * create a keyed fragment. The resulting data structure is an array.
 */

const numericPropertyRegex = /^\d+$/;

let warnedAboutNumeric = false;

const ReactFragment = {
  /**
   * Wrap a keyed object in an opaque proxy that warns you if you access any
   * of its properties.
   * See https://facebook.github.io/react/docs/create-fragment.html
   */
  create: function(object) {
    if (typeof object !== 'object' || !object || Array.isArray(object)) {
      if (process.env.NODE_ENV !== 'production') {
        warning(false, 'React.addons.createFragment only accepts a single object. Got: %s', object);
      }

      return object;
    }
    if (ReactElement.isValidElement(object)) {
      if (process.env.NODE_ENV !== 'production') {
        warning(false, 'React.addons.createFragment does not accept a ReactElement ' + 'without a wrapper object.');
      }
      return object;
    }

    if (!(object.nodeType !== 1)) {
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'React.addons.createFragment(...): Encountered an invalid child; ' +
          'DOM elements are not valid children of React components.');
      } else {
        _prodInvariant('0');
      }
    }

    const result = [];

    for (const key in object) {
      if (process.env.NODE_ENV !== 'production') {
        if (!warnedAboutNumeric && numericPropertyRegex.test(key)) {
          warning(false, 'React.addons.createFragment(...): ' +
            'Child objects should have ' +
            'non-numeric keys so ordering is preserved.');
          warnedAboutNumeric = true;
        }
      }
      ReactChildren.mapIntoWithKeyPrefixInternal(object[key], result, key, emptyFunction.thatReturnsArgument);
    }

    return result;
  },
};

export default ReactFragment.create;
