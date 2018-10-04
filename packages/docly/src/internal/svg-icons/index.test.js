import fs from 'fs';
import path from 'path';
import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../../test-utils';

describe('svg-icons', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should be able to render all of them', done => {
    // This test can only be run on the node env
    if (!fs.readdir) {
      done();
      return;
    }

    fs.readdir(__dirname, (err, files) => {
      if (err) {
        throw err;
      }

      files.forEach(file => {
        // Ignore no js files and tests
        if (file.indexOf('.js') === -1 || file.indexOf('spec.js') > -1) {
          return;
        }

        // eslint-disable-next-line global-require, import/no-dynamic-require
        const fileLoaded = require(path.join(__dirname, file));

        if (!fileLoaded.default) {
          return;
        }

        const Icon = fileLoaded.default;
        const wrapper = shallow(<Icon className="foo" />);
        assert.strictEqual(wrapper.hasClass('foo'), true);
      });

      done();
    });
  });
});
