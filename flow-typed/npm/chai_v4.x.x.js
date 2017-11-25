// flow-typed signature: 88d2313c965c71ea202a84ce638ce5b1
// flow-typed version: cfc9aef80e/chai_v4.x.x/flow_>=v0.15.0

declare module "chai" {
  declare type ExpectChain<T> = {
    and: ExpectChain<T>,
    at: ExpectChain<T>,
    be: ExpectChain<T>,
    been: ExpectChain<T>,
    have: ExpectChain<T>,
    has: ExpectChain<T>,
    is: ExpectChain<T>,
    of: ExpectChain<T>,
    same: ExpectChain<T>,
    that: ExpectChain<T>,
    to: ExpectChain<T>,
    which: ExpectChain<T>,
    with: ExpectChain<T>,

    not: ExpectChain<T>,
    deep: ExpectChain<T>,
    any: ExpectChain<T>,
    all: ExpectChain<T>,

    a: ExpectChain<T> & ((type: string) => ExpectChain<T>),
    an: ExpectChain<T> & ((type: string) => ExpectChain<T>),

    include: ExpectChain<T> & ((value: mixed) => ExpectChain<T>),
    includes: ExpectChain<T> & ((value: mixed) => ExpectChain<T>),
    contain: ExpectChain<T> & ((value: mixed) => ExpectChain<T>),
    contains: ExpectChain<T> & ((value: mixed) => ExpectChain<T>),

    eq: (value: T) => ExpectChain<T>,
    eql: (value: T) => ExpectChain<T>,
    equal: (value: T) => ExpectChain<T>,
    equals: (value: T) => ExpectChain<T>,

    above: (value: T & number) => ExpectChain<T>,
    least: (value: T & number) => ExpectChain<T>,
    below: (value: T & number) => ExpectChain<T>,
    most: (value: T & number) => ExpectChain<T>,
    within: (start: T & number, finish: T & number) => ExpectChain<T>,

    instanceof: (constructor: mixed) => ExpectChain<T>,
    nested: ExpectChain<T>,
    property: <P>(
      name: string,
      value?: P
    ) => ExpectChain<P> & ((name: string) => ExpectChain<mixed>),

    length: (value: number) => ExpectChain<T> | ExpectChain<number>,
    lengthOf: (value: number) => ExpectChain<T>,

    match: (regex: RegExp) => ExpectChain<T>,
    string: (string: string) => ExpectChain<T>,

    key: (key: string) => ExpectChain<T>,
    keys: (
      key: string | Array<string>,
      ...keys: Array<string>
    ) => ExpectChain<T>,

    throw: <E>(
      err?: Class<E> | Error | RegExp | string,
      errMsgMatcher?: RegExp | string,
      msg?: string
    ) => ExpectChain<T>,

    respondTo: (method: string) => ExpectChain<T>,
    itself: ExpectChain<T>,

    satisfy: (method: (value: T) => boolean) => ExpectChain<T>,

    closeTo: (expected: T & number, delta: number) => ExpectChain<T>,

    members: (set: mixed) => ExpectChain<T>,
    oneOf: (list: Array<T>) => ExpectChain<T>,

    change: (obj: mixed, key: string) => ExpectChain<T>,
    increase: (obj: mixed, key: string) => ExpectChain<T>,
    decrease: (obj: mixed, key: string) => ExpectChain<T>,

    // dirty-chai
    ok: () => ExpectChain<T>,
    true: () => ExpectChain<T>,
    false: () => ExpectChain<T>,
    null: () => ExpectChain<T>,
    undefined: () => ExpectChain<T>,
    exist: () => ExpectChain<T>,
    empty: () => ExpectChain<T>,

    extensible: () => ExpectChain<T>,
    sealed: () => ExpectChain<T>,
    frozen: () => ExpectChain<T>,
    NaN: () => ExpectChain<T>,

    // chai-immutable
    size: (n: number) => ExpectChain<T>,

    // sinon-chai
    called: () => ExpectChain<T>,
    callCount: (n: number) => ExpectChain<T>,
    calledOnce: () => ExpectChain<T>,
    calledTwice: () => ExpectChain<T>,
    calledThrice: () => ExpectChain<T>,
    calledBefore: (spy: mixed) => ExpectChain<T>,
    calledAfter: (spy: mixed) => ExpectChain<T>,
    calledWith: (...args: Array<mixed>) => ExpectChain<T>,
    calledWithMatch: (...args: Array<mixed>) => ExpectChain<T>,
    calledWithExactly: (...args: Array<mixed>) => ExpectChain<T>,

    // chai-as-promised
    eventually: ExpectChain<T>,
    resolvedWith: (value: mixed) => Promise<mixed> & ExpectChain<T>,
    resolved: () => Promise<mixed> & ExpectChain<T>,
    rejectedWith: (value: mixed) => Promise<mixed> & ExpectChain<T>,
    rejected: () => Promise<mixed> & ExpectChain<T>,
    notify: (callback: () => mixed) => ExpectChain<T>,
    fulfilled: () => Promise<mixed> & ExpectChain<T>,

    // chai-subset
    containSubset: (obj: Object | Object[]) => ExpectChain<T>,

    // chai-redux-mock-store
    dispatchedActions: (
      actions: Array<Object | ((action: Object) => any)>
    ) => ExpectChain<T>,
    dispatchedTypes: (actions: Array<string>) => ExpectChain<T>,

    // chai-enzyme
    attr: (key: string, val?: any) => ExpectChain<T>,
    data: (key: string, val?: any) => ExpectChain<T>,
    prop: (key: string, val?: any) => ExpectChain<T>,
    state: (key: string, val?: any) => ExpectChain<T>,
    value: (val: string) => ExpectChain<T>
  };

  declare function expect<T>(actual: T, message?: string): ExpectChain<T>;

  declare function use(plugin: (chai: Object, utils: Object) => void): void;

  declare class assert {
    static (expression: mixed, message?: string): void;
    static fail(
      actual: mixed,
      expected: mixed,
      message?: string,
      operator?: string
    ): void;

    static isOk(object: mixed, message?: string): void;
    static isNotOk(object: mixed, message?: string): void;

    static equal(actual: mixed, expected: mixed, message?: string): void;
    static notEqual(actual: mixed, expected: mixed, message?: string): void;

    static strictEqual(act: mixed, exp: mixed, msg?: string): void;
    static notStrictEqual(act: mixed, exp: mixed, msg?: string): void;

    static deepEqual(act: mixed, exp: mixed, msg?: string): void;
    static notDeepEqual(act: mixed, exp: mixed, msg?: string): void;

    static ok(val: mixed, msg?: string): void;
    static isTrue(val: mixed, msg?: string): void;
    static isNotTrue(val: mixed, msg?: string): void;
    static isFalse(val: mixed, msg?: string): void;
    static isNotFalse(val: mixed, msg?: string): void;

    static isNull(val: mixed, msg?: string): void;
    static isNotNull(val: mixed, msg?: string): void;

    static isUndefined(val: mixed, msg?: string): void;
    static isDefined(val: mixed, msg?: string): void;

    static isNaN(val: mixed, msg?: string): void;
    static isNotNaN(val: mixed, msg?: string): void;

    static isAbove(val: number, abv: number, msg?: string): void;
    static isBelow(val: number, blw: number, msg?: string): void;

    static isAtMost(val: number, atmst: number, msg?: string): void;
    static isAtLeast(val: number, atlst: number, msg?: string): void;

    static isFunction(val: mixed, msg?: string): void;
    static isNotFunction(val: mixed, msg?: string): void;

    static isObject(val: mixed, msg?: string): void;
    static isNotObject(val: mixed, msg?: string): void;

    static isArray(val: mixed, msg?: string): void;
    static isNotArray(val: mixed, msg?: string): void;

    static isString(val: mixed, msg?: string): void;
    static isNotString(val: mixed, msg?: string): void;

    static isNumber(val: mixed, msg?: string): void;
    static isNotNumber(val: mixed, msg?: string): void;

    static isBoolean(val: mixed, msg?: string): void;
    static isNotBoolean(val: mixed, msg?: string): void;

    static typeOf(val: mixed, type: string, msg?: string): void;
    static notTypeOf(val: mixed, type: string, msg?: string): void;

    static instanceOf(val: mixed, constructor: Function, msg?: string): void;
    static notInstanceOf(val: mixed, constructor: Function, msg?: string): void;

    static include(exp: string, inc: mixed, msg?: string): void;
    static include<T>(exp: Array<T>, inc: T, msg?: string): void;

    static notInclude(exp: string, inc: mixed, msg?: string): void;
    static notInclude<T>(exp: Array<T>, inc: T, msg?: string): void;

    static match(exp: mixed, re: RegExp, msg?: string): void;
    static notMatch(exp: mixed, re: RegExp, msg?: string): void;

    static property(obj: Object, prop: string, msg?: string): void;
    static notProperty(obj: Object, prop: string, msg?: string): void;
    static deepProperty(obj: Object, prop: string, msg?: string): void;
    static notDeepProperty(obj: Object, prop: string, msg?: string): void;

    static propertyVal(
      obj: Object,
      prop: string,
      val: mixed,
      msg?: string
    ): void;
    static propertyNotVal(
      obj: Object,
      prop: string,
      val: mixed,
      msg?: string
    ): void;

    static deepPropertyVal(
      obj: Object,
      prop: string,
      val: mixed,
      msg?: string
    ): void;
    static deepPropertyNotVal(
      obj: Object,
      prop: string,
      val: mixed,
      msg?: string
    ): void;

    static lengthOf(exp: mixed, len: number, msg?: string): void;

    static throws<E>(
      func: () => any,
      err?: Class<E> | Error | RegExp | string,
      errorMsgMatcher?: string | RegExp,
      msg?: string
    ): void;
    static doesNotThrow<E>(
      func: () => any,
      err?: Class<E> | Error | RegExp | string,
      errorMsgMatcher?: string | RegExp,
      msg?: string
    ): void;

    static closeTo(
      actual: number,
      expected: number,
      delta: number,
      msg?: string
    ): void;
    static approximately(
      actual: number,
      expected: number,
      delta: number,
      msg?: string
    ): void;
    
    // chai-immutable
    static sizeOf(val: mixed, length: number): void;
  }

  declare var config: {
    includeStack: boolean,
    showDiff: boolean,
    truncateThreshold: number
  };
}
