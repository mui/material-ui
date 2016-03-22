import injectTapEventPlugin from 'react-tap-event-plugin';
import * as MaterialUI from 'index';
import {assert} from 'chai';

injectTapEventPlugin();

describe('MaterialUI', () => {
  it('exists', () => {
    assert.ok(MaterialUI);
  });
});
