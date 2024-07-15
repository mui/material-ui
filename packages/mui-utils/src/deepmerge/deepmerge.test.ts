import { expect } from 'chai';
import { runInNewContext } from 'vm';
import deepmerge from './deepmerge';

describe('deepmerge', () => {
  // https://snyk.io/blog/after-three-years-of-silence-a-new-jquery-prototype-pollution-vulnerability-emerges-once-again/
  it('should not be subject to prototype pollution via __proto__', () => {
    const result = deepmerge(
      {},
      JSON.parse('{ "myProperty": "a", "__proto__" : { "isAdmin" : true } }'),
      {
        clone: false,
      },
    );

    // @ts-expect-error __proto__ is not on this object type
    // eslint-disable-next-line no-proto
    expect(result.__proto__).to.have.property('isAdmin');
    expect({}).not.to.have.property('isAdmin');
  });

  // https://cwe.mitre.org/data/definitions/915.html
  it('should not be subject to prototype pollution via constructor', () => {
    const result = deepmerge(
      {},
      JSON.parse('{ "myProperty": "a", "constructor" : { "prototype": { "isAdmin" : true } } }'),
      {
        clone: true,
      },
    );

    expect(result.constructor.prototype).to.have.property('isAdmin');
    expect({}).not.to.have.property('isAdmin');
  });

  // https://cwe.mitre.org/data/definitions/915.html
  it('should not be subject to prototype pollution via prototype', () => {
    const result = deepmerge(
      {},
      JSON.parse('{ "myProperty": "a", "prototype": { "isAdmin" : true } }'),
      {
        clone: false,
      },
    );

    // @ts-expect-error prototype is not on this object type
    expect(result.prototype).to.have.property('isAdmin');
    expect({}).not.to.have.property('isAdmin');
  });

  it('should appropriately copy the fields without prototype pollution', () => {
    const result = deepmerge(
      {},
      JSON.parse('{ "myProperty": "a", "__proto__" : { "isAdmin" : true } }'),
    );

    // @ts-expect-error __proto__ is not on this object type
    // eslint-disable-next-line no-proto
    expect(result.__proto__).to.have.property('isAdmin');
    expect({}).not.to.have.property('isAdmin');
  });

  it('should merge objects across realms', function test() {
    if (!/jsdom/.test(window.navigator.userAgent)) {
      // vm is only available in Node.js.
      // We could use https://github.com/browserify/vm-browserify to run the test in an iframe when
      // in Karma but it doesn't seem we need to go as far.
      this.skip();
    }

    const vmObject = runInNewContext('({hello: "realm"})');
    const result = deepmerge({ hello: 'original' }, vmObject);
    expect(result.hello).to.equal('realm');
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
