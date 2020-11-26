import deepmerge, {isPlainObject} from './deepmerge';
import { expect } from 'chai';

describe('deepmerge', () => {
  // https://snyk.io/blog/after-three-years-of-silence-a-new-jquery-prototype-pollution-vulnerability-emerges-once-again/
  it('should not be subject to prototype pollution', () => {
    deepmerge({}, JSON.parse('{ "myProperty": "a", "__proto__" : { "isAdmin" : true } }'), {
      clone: false,
    });
    expect({}.isAdmin).to.equal(undefined);
  });

  // https://github.com/mui-org/material-ui/issues/20095
  it('should not merge HTML elements', () => {
    const element = document.createElement('div');
    const element2 = document.createElement('div');

    const result = deepmerge({ element }, { element: element2 });

    expect(result.element).to.equal(element2);
  });

  describe('isPlainObject', () => {
    it('should detect plain objects', () => {
      // eslint-disable-next-line no-unused-vars
      function Foo(a) {
        this.a = 1;
      }

      expect(isPlainObject({})).to.equal(true);
      expect(isPlainObject({ 'a': 1 })).to.equal(true);
      expect(isPlainObject({ 'constructor': Foo })).to.equal(true);
      expect(isPlainObject([1, 2, 3])).to.equal(false);
      expect(isPlainObject(new Foo(1))).to.equal(false);
    });

    it('should return `true` for multi-frame objects', () => {
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      const iObject = window.frames[window.frames.length-1].Object;
      // eslint-disable-next-line new-cap
      expect(isPlainObject(new iObject())).to.equal(true);
    });
  });
});
