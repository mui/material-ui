import deepmerge from './deepmerge';
import { expect } from 'chai';

describe('deepmerge', () => {
  // https://snyk.io/blog/after-three-years-of-silence-a-new-jquery-prototype-pollution-vulnerability-emerges-once-again/
  it('should not be subject to prototype pollution', () => {
    deepmerge({}, JSON.parse('{ "myProperty": "a", "__proto__" : { "isAdmin" : true } }'), {
      clone: false,
    });
    expect({}.isAdmin).to.equal(undefined);
  });
});
