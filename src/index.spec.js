/* eslint-env mocha */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import {assert} from 'chai';
import * as MaterialUI from './index';

describe('Material UI', () => it('should have exports', () => assert.ok(MaterialUI)));
