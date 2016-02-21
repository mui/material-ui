import React from 'react';
import TestUtils from 'react-addons-test-utils';
import injectTheme from './fixtures/inject-theme';
import TimeWaster from './fixtures/perf/TimeWaster';
import RandomWords from 'random-words';
import TextField from 'TextField';
import each from 'lodash/fp/each';
import {assert} from 'chai';

describe('TextField', () => {
  let ThemedTextField;

  beforeEach(() => {
    ThemedTextField = injectTheme(TextField);
  });

  it('underline and label should not waste rendering time', () => {
    return new Promise((resolve) => {
      TestUtils.renderIntoDocument(
        <TimeWaster
          onComplete={(summary) => resolve(summary)}
          testFn={() => RandomWords(1)[0]}
          testProp="value"
        >
          <ThemedTextField floatingLabelText="Text Field Label" />
        </TimeWaster>
      );
    })
    .then((summary) => {
      each((component) => {
        assert.strictEqual(summary.hasWastedTime(component), false, 'should not waste time');
      }, ['TextFieldUnderline', 'TextFieldLabel']);
    });
  });
});
