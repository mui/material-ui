import { expect } from 'chai';
import deepmerge from './deepmerge';

describe('deepmerge', () => {
  // https://snyk.io/blog/after-three-years-of-silence-a-new-jquery-prototype-pollution-vulnerability-emerges-once-again/
  it('should not be subject to prototype pollution', () => {
    deepmerge({}, JSON.parse('{ "myProperty": "a", "__proto__" : { "isAdmin" : true } }'), {
      clone: false,
    });

    expect({}).not.to.have.property('isAdmin');
  });

  // https://github.com/mui/material-ui/issues/20095
  it('should not merge HTML elements', () => {
    const element = document.createElement('div');
    const element2 = document.createElement('div');

    const result = deepmerge({ element }, { element: element2 });

    expect(result.element).to.equal(element2);
  });

  // https://github.com/mui/material-ui/issues/25075
  it('should reset source when target is undefined', () => {
    const result = deepmerge(
      {
        '&.Mui-disabled': {
          color: 'red',
        },
      },
      {
        '&.Mui-disabled': undefined,
      },
    );
    expect(result).to.deep.equal({
      '&.Mui-disabled': undefined,
    });
  });

  it('should merge keys that do not exist in source', () => {
    const result = deepmerge({ foo: { baz: 'test' } }, { foo: { bar: 'test' }, bar: 'test' });
    expect(result).to.deep.equal({
      foo: { baz: 'test', bar: 'test' },
      bar: 'test',
    });
  });

  it('should deep clone source key object if target key does not exist', () => {
    const foo = { foo: { baz: 'test' } };
    const bar = {};

    const result = deepmerge(bar, foo);

    expect(result).to.deep.equal({ foo: { baz: 'test' } });

    // @ts-ignore
    result.foo.baz = 'new test';

    expect(result).to.deep.equal({ foo: { baz: 'new test' } });
    expect(foo).to.deep.equal({ foo: { baz: 'test' } });
  });
});
