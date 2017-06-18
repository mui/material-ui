// @flow

import { assert } from 'chai';
import customPropTypes from './customPropTypes';

describe('customPropTypes', () => {
  describe('muiRequired', () => {
    describe('production', () => {
      let nodeEnv;

      before(() => {
        nodeEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';
      });

      after(() => {
        process.env.NODE_ENV = nodeEnv;
      });

      it('should do nothing in production', () => {
        assert.strictEqual(customPropTypes.muiRequired(), null);
      });
    });

    describe('error', () => {
      it('should notify if the property is missing', () => {
        const error = customPropTypes.muiRequired(
          {},
          'styleManager',
          'WithStyle',
          'context',
          null,
          'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED',
        );

        assert.match(error.message, /You need to provide a theme to Material-UI/);
      });
    });
  });
});
