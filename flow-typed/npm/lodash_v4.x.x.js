// flow-typed signature: 5987de2b8b7cd774785cd3b8c488f96e
// flow-typed version: 8daeabda84/lodash_v4.x.x/flow_>=v0.47.x

declare module 'lodash' {
  declare type TemplateSettings = {
    escape?: RegExp,
    evaluate?: RegExp,
    imports?: Object,
    interpolate?: RegExp,
    variable?: string,
  };

  declare type TruncateOptions = {
    length?: number,
    omission?: string,
    separator?: RegExp|string,
  };

  declare type DebounceOptions = {
    leading?: bool,
    maxWait?: number,
    trailing?: bool,
  };

  declare type ThrottleOptions = {
    leading?: bool,
    trailing?: bool,
  };

  declare type NestedArray<T> = Array<Array<T>>;

  declare type matchesIterateeShorthand = Object;
  declare type matchesPropertyIterateeShorthand = [string, any];
  declare type propertyIterateeShorthand = string;

  declare type OPredicate<A, O> =
    | ((value: A, key: string, object: O) => any)
    | matchesIterateeShorthand
    | matchesPropertyIterateeShorthand
    | propertyIterateeShorthand;

  declare type OIterateeWithResult<V, O, R> = Object|string|((value: V, key: string, object: O) => R);
  declare type OIteratee<O> = OIterateeWithResult<any, O, any>;
  declare type OFlatMapIteratee<T, U> = OIterateeWithResult<any, T, Array<U>>;

  declare type Predicate<T> =
    | ((value: T, index: number, array: Array<T>) => any)
    | matchesIterateeShorthand
    | matchesPropertyIterateeShorthand
    | propertyIterateeShorthand;

  declare type _ValueOnlyIteratee<T> = (value: T) => mixed;
  declare type ValueOnlyIteratee<T> = _ValueOnlyIteratee<T>|string;
  declare type _Iteratee<T> = (item: T, index: number, array: ?Array<T>) => mixed;
  declare type Iteratee<T> = _Iteratee<T>|Object|string;
  declare type FlatMapIteratee<T, U> = ((item: T, index: number, array: ?Array<T>) => Array<U>)|Object|string;
  declare type Comparator<T> = (item: T, item2: T) => bool;

  declare type MapIterator<T,U> =
    | ((item: T, index: number, array: Array<T>) => U)
    | propertyIterateeShorthand;

  declare type OMapIterator<T,O,U> =
    | ((item: T, key: string, object: O) => U)
    | propertyIterateeShorthand;

  declare class Lodash {
    // Array
    chunk<T>(array: ?Array<T>, size?: number): Array<Array<T>>;
    compact<T,N:?T>(array: Array<N>): Array<T>;
    concat<T>(base: Array<T>, ...elements: Array<any>): Array<T|any>;
    difference<T>(array: ?Array<T>, values?: Array<T>): Array<T>;
    differenceBy<T>(array: ?Array<T>, values: Array<T>, iteratee: ValueOnlyIteratee<T>): T[];
    differenceWith<T>(array: T[], values: T[], comparator?: Comparator<T>): T[];
    drop<T>(array: ?Array<T>, n?: number): Array<T>;
    dropRight<T>(array: ?Array<T>, n?: number): Array<T>;
    dropRightWhile<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    dropWhile<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    fill<T, U>(array: ?Array<T>, value: U, start?: number, end?: number): Array<T|U>;
    findIndex<T>(array: ?Array<T>, predicate?: Predicate<T>, fromIndex?: number): number;
    findLastIndex<T>(array: ?Array<T>, predicate?: Predicate<T>, fromIndex?: number): number;
    // alias of _.head
    first<T>(array: ?Array<T>): T;
    flatten<T,X>(array: Array<Array<T>|X>): Array<T|X>;
    flattenDeep<T>(array: any[]): Array<T>;
    flattenDepth(array: any[], depth?: number): any[];
    fromPairs<T>(pairs: Array<T>): Object;
    head<T>(array: ?Array<T>): T;
    indexOf<T>(array: ?Array<T>, value: T, fromIndex?: number): number;
    initial<T>(array: ?Array<T>): Array<T>;
    intersection<T>(...arrays: Array<Array<T>>): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    intersectionBy<T>(a1: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    intersectionBy<T>(a1: Array<T>, a2: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    intersectionBy<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    intersectionBy<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, a4: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    intersectionWith<T>(a1: Array<T>, comparator: Comparator<T>): Array<T>;
    intersectionWith<T>(a1: Array<T>, a2: Array<T>, comparator: Comparator<T>): Array<T>;
    intersectionWith<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, comparator: Comparator<T>): Array<T>;
    intersectionWith<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, a4: Array<T>, comparator: Comparator<T>): Array<T>;
    join<T>(array: ?Array<T>, separator?: string): string;
    last<T>(array: ?Array<T>): T;
    lastIndexOf<T>(array: ?Array<T>, value: T, fromIndex?: number): number;
    nth<T>(array: T[], n?: number): T;
    pull<T>(array: ?Array<T>, ...values?: Array<T>): Array<T>;
    pullAll<T>(array: ?Array<T>, values: Array<T>): Array<T>;
    pullAllBy<T>(array: ?Array<T>, values: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    pullAllWith<T>(array?: T[], values: T[], comparator?: Function): T[];
    pullAt<T>(array: ?Array<T>, ...indexed?: Array<number>): Array<T>;
    pullAt<T>(array: ?Array<T>, indexed?: Array<number>): Array<T>;
    remove<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    reverse<T>(array: ?Array<T>): Array<T>;
    slice<T>(array: ?Array<T>, start?: number, end?: number): Array<T>;
    sortedIndex<T>(array: ?Array<T>, value: T): number;
    sortedIndexBy<T>(array: ?Array<T>, value: T, iteratee?: ValueOnlyIteratee<T>): number;
    sortedIndexOf<T>(array: ?Array<T>, value: T): number;
    sortedLastIndex<T>(array: ?Array<T>, value: T): number;
    sortedLastIndexBy<T>(array: ?Array<T>, value: T, iteratee?: ValueOnlyIteratee<T>): number;
    sortedLastIndexOf<T>(array: ?Array<T>, value: T): number;
    sortedUniq<T>(array: ?Array<T>): Array<T>;
    sortedUniqBy<T>(array: ?Array<T>, iteratee?: (value: T) => mixed): Array<T>;
    tail<T>(array: ?Array<T>): Array<T>;
    take<T>(array: ?Array<T>, n?: number): Array<T>;
    takeRight<T>(array: ?Array<T>, n?: number): Array<T>;
    takeRightWhile<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    takeWhile<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    union<T>(...arrays?: Array<Array<T>>): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    unionBy<T>(a1: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    unionBy<T>(a1: Array<T>, a2: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    unionBy<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    unionBy<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, a4: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    unionWith<T>(a1: Array<T>, comparator?: Comparator<T>): Array<T>;
    unionWith<T>(a1: Array<T>, a2: Array<T>, comparator?: Comparator<T>): Array<T>;
    unionWith<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, comparator?: Comparator<T>): Array<T>;
    unionWith<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, a4: Array<T>, comparator?: Comparator<T>): Array<T>;
    uniq<T>(array: ?Array<T>): Array<T>;
    uniqBy<T>(array: ?Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    uniqWith<T>(array: ?Array<T>, comparator?: Comparator<T>): Array<T>;
    unzip<T>(array: ?Array<T>): Array<T>;
    unzipWith<T>(array: ?Array<T>, iteratee?: Iteratee<T>): Array<T>;
    without<T>(array: ?Array<T>, ...values?: Array<T>): Array<T>;
    xor<T>(...array: Array<Array<T>>): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    xorBy<T>(a1: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    xorBy<T>(a1: Array<T>, a2: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    xorBy<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    xorBy<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, a4: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    xorWith<T>(a1: Array<T>, comparator?: Comparator<T>): Array<T>;
    xorWith<T>(a1: Array<T>, a2: Array<T>, comparator?: Comparator<T>): Array<T>;
    xorWith<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, comparator?: Comparator<T>): Array<T>;
    xorWith<T>(a1: Array<T>, a2: Array<T>, a3: Array<T>, a4: Array<T>, comparator?: Comparator<T>): Array<T>;
    zip<A, B>(a1: A[], a2: B[]): Array<[A, B]>;
    zip<A, B, C>(a1: A[], a2: B[], a3: C[]): Array<[A, B, C]>;
    zip<A, B, C, D>(a1: A[], a2: B[], a3: C[], a4: D[]): Array<[A, B, C, D]>;
    zip<A, B, C, D, E>(a1: A[], a2: B[], a3: C[], a4: D[], a5: E[]): Array<[A, B, C, D, E]>;

    zipObject(props?: Array<any>, values?: Array<any>): Object;
    zipObjectDeep(props?: any[], values?: any): Object;
    //Workaround until (...parameter: T, parameter2: U) works
    zipWith<T>(a1: NestedArray<T>, iteratee?: Iteratee<T>): Array<T>;
    zipWith<T>(a1: NestedArray<T>, a2: NestedArray<T>, iteratee?: Iteratee<T>): Array<T>;
    zipWith<T>(a1: NestedArray<T>, a2: NestedArray<T>, a3: NestedArray<T>, iteratee?: Iteratee<T>): Array<T>;
    zipWith<T>(a1: NestedArray<T>, a2: NestedArray<T>, a3: NestedArray<T>, a4: NestedArray<T>, iteratee?: Iteratee<T>): Array<T>;

    // Collection
    countBy<T>(array: ?Array<T>, iteratee?: ValueOnlyIteratee<T>): Object;
    countBy<T: Object>(object: T, iteratee?: ValueOnlyIteratee<T>): Object;
    // alias of _.forEach
    each<T>(array: ?Array<T>, iteratee?: Iteratee<T>): Array<T>;
    each<T: Object>(object: T, iteratee?: OIteratee<T>): T;
    // alias of _.forEachRight
    eachRight<T>(array: ?Array<T>, iteratee?: Iteratee<T>): Array<T>;
    eachRight<T: Object>(object: T, iteratee?: OIteratee<T>): T;
    every<T>(array: ?Array<T>, iteratee?: Iteratee<T>): bool;
    every<T: Object>(object: T, iteratee?: OIteratee<T>): bool;
    filter<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    filter<A, T: {[id: string]: A}>(object: T, predicate?: OPredicate<A, T>): Array<A>;
    find<T>(array: ?Array<T>, predicate?: Predicate<T>, fromIndex?: number): T|void;
    find<V, A, T: {[id: string]: A}>(object: T, predicate?: OPredicate<A, T>, fromIndex?: number): V;
    findLast<T>(array: ?Array<T>, predicate?: Predicate<T>, fromIndex?: number): T|void;
    findLast<V, A, T: {[id: string]: A}>(object: T, predicate?: OPredicate<A, T>): V;
    flatMap<T, U>(array: ?Array<T>, iteratee?: FlatMapIteratee<T, U>): Array<U>;
    flatMap<T: Object, U>(object: T, iteratee?: OFlatMapIteratee<T, U>): Array<U>;
    flatMapDeep<T, U>(array: ?Array<T>, iteratee?: FlatMapIteratee<T, U>): Array<U>;
    flatMapDeep<T: Object, U>(object: T, iteratee?: OFlatMapIteratee<T, U>): Array<U>;
    flatMapDepth<T, U>(array: ?Array<T>, iteratee?: FlatMapIteratee<T, U>, depth?: number): Array<U>;
    flatMapDepth<T: Object, U>(object: T, iteratee?: OFlatMapIteratee<T, U>, depth?: number): Array<U>;
    forEach<T>(array: ?Array<T>, iteratee?: Iteratee<T>): Array<T>;
    forEach<T: Object>(object: T, iteratee?: OIteratee<T>): T;
    forEachRight<T>(array: ?Array<T>, iteratee?: Iteratee<T>): Array<T>;
    forEachRight<T: Object>(object: T, iteratee?: OIteratee<T>): T;
    groupBy<V, T>(array: ?Array<T>, iteratee?: ValueOnlyIteratee<T>): {[key: V]: Array<T>};
    groupBy<V, A, T: {[id: string]: A}>(object: T, iteratee?: ValueOnlyIteratee<A>): {[key: V]: Array<A>};
    includes<T>(array: ?Array<T>, value: T, fromIndex?: number): bool;
    includes<T: Object>(object: T, value: any, fromIndex?: number): bool;
    includes(str: string, value: string, fromIndex?: number): bool;
    invokeMap<T>(array: ?Array<T>, path: ((value: T) => Array<string>|string)|Array<string>|string, ...args?: Array<any>): Array<any>;
    invokeMap<T: Object>(object: T, path: ((value: any) => Array<string>|string)|Array<string>|string, ...args?: Array<any>): Array<any>;
    keyBy<T, V>(array: ?Array<T>, iteratee?: ValueOnlyIteratee<T>): {[key: V]: ?T};
    keyBy<V, A, I, T: {[id: I]: A}>(object: T, iteratee?: ValueOnlyIteratee<A>): {[key: V]: ?A};
    map<T, U>(array: ?Array<T>, iteratee?: MapIterator<T, U>): Array<U>;
    map<V, T: Object, U>(object: ?T, iteratee?: OMapIterator<V, T, U>): Array<U>;
    map(str: ?string, iteratee?: (char: string, index: number, str: string) => any): string;
    orderBy<T>(array: ?Array<T>, iteratees?: Array<Iteratee<T>>|string, orders?: Array<'asc'|'desc'>|string): Array<T>;
    orderBy<V, T: Object>(object: T, iteratees?: Array<OIteratee<*>>|string, orders?: Array<'asc'|'desc'>|string): Array<V>;
    partition<T>(array: ?Array<T>, predicate?: Predicate<T>): NestedArray<T>;
    partition<V, A, T: {[id: string]: A}>(object: T, predicate?: OPredicate<A, T>): NestedArray<V>;
    reduce<T, U>(array: ?Array<T>, iteratee?: (accumulator: U, value: T, index: number, array: ?Array<T>) => U, accumulator?: U): U;
    reduce<T: Object, U>(object: T, iteratee?: (accumulator: U, value: any, key: string, object: T) => U, accumulator?: U): U;
    reduceRight<T, U>(array: ?Array<T>, iteratee?: (accumulator: U, value: T, index: number, array: ?Array<T>) => U, accumulator?: U): U;
    reduceRight<T: Object, U>(object: T, iteratee?: (accumulator: U, value: any, key: string, object: T) => U, accumulator?: U): U;
    reject<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    reject<V: Object, A, T: {[id: string]: A}>(object: T, predicate?: OPredicate<A, T>): Array<V>;
    sample<T>(array: ?Array<T>): T;
    sample<V, T: Object>(object: T): V;
    sampleSize<T>(array: ?Array<T>, n?: number): Array<T>;
    sampleSize<V, T: Object>(object: T, n?: number): Array<V>;
    shuffle<T>(array: ?Array<T>): Array<T>;
    shuffle<V, T: Object>(object: T): Array<V>;
    size(collection: Array<any>|Object): number;
    some<T>(array: ?Array<T>, predicate?: Predicate<T>): bool;
    some<A, T: {[id: string]: A}>(object?: ?T, predicate?: OPredicate<A, T>): bool;
    sortBy<T>(array: ?Array<T>, ...iteratees?: Array<Iteratee<T>>): Array<T>;
    sortBy<T>(array: ?Array<T>, iteratees?: Array<Iteratee<T>>): Array<T>;
    sortBy<V, T: Object>(object: T, ...iteratees?: Array<OIteratee<T>>): Array<V>;
    sortBy<V, T: Object>(object: T, iteratees?: Array<OIteratee<T>>): Array<V>;

    // Date
    now(): number;

    // Function
    after(n: number, fn: Function): Function;
    ary(func: Function, n?: number): Function;
    before(n: number, fn: Function): Function;
    bind(func: Function, thisArg: any, ...partials: Array<any>): Function;
    bindKey(obj: Object, key: string, ...partials: Array<any>): Function;
    curry(func: Function, arity?: number): Function;
    curryRight(func: Function, arity?: number): Function;
    debounce(func: Function, wait?: number, options?: DebounceOptions): Function;
    defer(func: Function, ...args?: Array<any>): number;
    delay(func: Function, wait: number, ...args?: Array<any>): number;
    flip(func: Function): Function;
    memoize(func: Function, resolver?: Function): Function;
    negate(predicate: Function): Function;
    once(func: Function): Function;
    overArgs(func: Function, ...transforms: Array<Function>): Function;
    overArgs(func: Function, transforms: Array<Function>): Function;
    partial(func: Function, ...partials: any[]): Function;
    partialRight(func: Function, ...partials: Array<any>): Function;
    partialRight(func: Function, partials: Array<any>): Function;
    rearg(func: Function, ...indexes: Array<number>): Function;
    rearg(func: Function, indexes: Array<number>): Function;
    rest(func: Function, start?: number): Function;
    spread(func: Function): Function;
    throttle(func: Function, wait?: number, options?: ThrottleOptions): Function;
    unary(func: Function): Function;
    wrap(value: any, wrapper: Function): Function;

    // Lang
    castArray(value: *): any[];
    clone<T>(value: T): T;
    cloneDeep<T>(value: T): T;
    cloneDeepWith<T, U>(value: T, customizer?: ?(value: T, key: number|string, object: T, stack: any) => U): U;
    cloneWith<T, U>(value: T, customizer?: ?(value: T, key: number|string, object: T, stack: any) => U): U;
    conformsTo<T:{[key:string]:mixed}>(source: T, predicates: T&{[key:string]:(x:any)=>boolean}): boolean;
    eq(value: any, other: any): bool;
    gt(value: any, other: any): bool;
    gte(value: any, other: any): bool;
    isArguments(value: any): bool;
    isArray(value: any): bool;
    isArrayBuffer(value: any): bool;
    isArrayLike(value: any): bool;
    isArrayLikeObject(value: any): bool;
    isBoolean(value: any): bool;
    isBuffer(value: any): bool;
    isDate(value: any): bool;
    isElement(value: any): bool;
    isEmpty(value: any): bool;
    isEqual(value: any, other: any): bool;
    isEqualWith<T, U>(value: T, other: U, customizer?: (objValue: any, otherValue: any, key: number|string, object: T, other: U, stack: any) => bool|void): bool;
    isError(value: any): bool;
    isFinite(value: any): bool;
    isFunction(value: Function): true;
    isFunction(value: number|string|void|null|Object): false;
    isInteger(value: any): bool;
    isLength(value: any): bool;
    isMap(value: any): bool;
    isMatch(object?: ?Object, source: Object): bool;
    isMatchWith<T: Object, U: Object>(object: T, source: U, customizer?: (objValue: any, srcValue: any, key: number|string, object: T, source: U) => bool|void): bool;
    isNaN(value: any): bool;
    isNative(value: any): bool;
    isNil(value: any): bool;
    isNull(value: any): bool;
    isNumber(value: any): bool;
    isObject(value: any): bool;
    isObjectLike(value: any): bool;
    isPlainObject(value: any): bool;
    isRegExp(value: any): bool;
    isSafeInteger(value: any): bool;
    isSet(value: any): bool;
    isString(value: string): true;
    isString(value: number|bool|Function|void|null|Object|Array<any>): false;
    isSymbol(value: any): bool;
    isTypedArray(value: any): bool;
    isUndefined(value: any): bool;
    isWeakMap(value: any): bool;
    isWeakSet(value: any): bool;
    lt(value: any, other: any): bool;
    lte(value: any, other: any): bool;
    toArray(value: any): Array<any>;
    toFinite(value: any): number;
    toInteger(value: any): number;
    toLength(value: any): number;
    toNumber(value: any): number;
    toPlainObject(value: any): Object;
    toSafeInteger(value: any): number;
    toString(value: any): string;

    // Math
    add(augend: number, addend: number): number;
    ceil(number: number, precision?: number): number;
    divide(dividend: number, divisor: number): number;
    floor(number: number, precision?: number): number;
    max<T>(array: ?Array<T>): T;
    maxBy<T>(array: ?Array<T>, iteratee?: Iteratee<T>): T;
    mean(array: Array<*>): number;
    meanBy<T>(array: Array<T>, iteratee?: Iteratee<T>): number;
    min<T>(array: ?Array<T>): T;
    minBy<T>(array: ?Array<T>, iteratee?: Iteratee<T>): T;
    multiply(multiplier: number, multiplicand: number): number;
    round(number: number, precision?: number): number;
    subtract(minuend: number, subtrahend: number): number;
    sum(array: Array<*>): number;
    sumBy<T>(array: Array<T>, iteratee?: Iteratee<T>): number;

    // number
    clamp(number: number, lower?: number, upper: number): number;
    inRange(number: number, start?: number, end: number): bool;
    random(lower?: number, upper?: number, floating?: bool): number;

    // Object
    assign(object?: ?Object, ...sources?: Array<Object>): Object;
    assignIn<A, B>(a: A, b: B): A & B;
    assignIn<A, B, C>(a: A, b: B, c: C): A & B & C;
    assignIn<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
    assignIn<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
    assignInWith<T: Object, A: Object>(object: T, s1: A, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A) => any|void): Object;
    assignInWith<T: Object, A: Object, B: Object>(object: T, s1: A, s2: B, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B) => any|void): Object;
    assignInWith<T: Object, A: Object, B: Object, C: Object>(object: T, s1: A, s2: B, s3: C, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B|C) => any|void): Object;
    assignInWith<T: Object, A: Object, B: Object, C: Object, D: Object>(object: T, s1: A, s2: B, s3: C, s4: D, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B|C|D) => any|void): Object;
    assignWith<T: Object, A: Object>(object: T, s1: A, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A) => any|void): Object;
    assignWith<T: Object, A: Object, B: Object>(object: T, s1: A, s2: B, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B) => any|void): Object;
    assignWith<T: Object, A: Object, B: Object, C: Object>(object: T, s1: A, s2: B, s3: C, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B|C) => any|void): Object;
    assignWith<T: Object, A: Object, B: Object, C: Object, D: Object>(object: T, s1: A, s2: B, s3: C, s4: D, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B|C|D) => any|void): Object;
    at(object?: ?Object, ...paths: Array<string>): Array<any>;
    at(object?: ?Object, paths: Array<string>): Array<any>;
    create<T>(prototype: T, properties?: Object): $Supertype<T>;
    defaults(object?: ?Object, ...sources?: Array<Object>): Object;
    defaultsDeep(object?: ?Object, ...sources?: Array<Object>): Object;
    // alias for _.toPairs
    entries(object?: ?Object): NestedArray<any>;
    // alias for _.toPairsIn
    entriesIn(object?: ?Object): NestedArray<any>;
    // alias for _.assignIn
    extend<A, B>(a: A, b: B): A & B;
    extend<A, B, C>(a: A, b: B, c: C): A & B & C;
    extend<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
    extend<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
    // alias for _.assignInWith
    extendWith<T: Object, A: Object>(object: T, s1: A, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A) => any|void): Object;
    extendWith<T: Object, A: Object, B: Object>(object: T, s1: A, s2: B, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B) => any|void): Object;
    extendWith<T: Object, A: Object, B: Object, C: Object>(object: T, s1: A, s2: B, s3: C, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B|C) => any|void): Object;
    extendWith<T: Object, A: Object, B: Object, C: Object, D: Object>(object: T, s1: A, s2: B, s3: C, s4: D, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B|C|D) => any|void): Object;
    findKey<A, T: {[id: string]: A}>(object?: ?T, predicate?: OPredicate<A, T>): string|void;
    findLastKey<A, T: {[id: string]: A}>(object?: ?T, predicate?: OPredicate<A, T>): string|void;
    forIn(object?: ?Object, iteratee?: OIteratee<*>): Object;
    forInRight(object?: ?Object, iteratee?: OIteratee<*>): Object;
    forOwn(object?: ?Object, iteratee?: OIteratee<*>): Object;
    forOwnRight(object?: ?Object, iteratee?: OIteratee<*>): Object;
    functions(object?: ?Object): Array<string>;
    functionsIn(object?: ?Object): Array<string>;
    get(object?: ?Object|?Array<any>, path?: ?Array<string>|string, defaultValue?: any): any;
    has(object?: ?Object, path?: ?Array<string>|string): bool;
    hasIn(object?: ?Object, path?: ?Array<string>|string): bool;
    invert(object?: ?Object, multiVal?: bool): Object;
    invertBy(object: ?Object, iteratee?: Function): Object;
    invoke(object?: ?Object, path?: ?Array<string>|string, ...args?: Array<any>): any;
    keys(object?: ?Object): Array<string>;
    keysIn(object?: ?Object): Array<string>;
    mapKeys(object?: ?Object, iteratee?: OIteratee<*>): Object;
    mapValues(object?: ?Object, iteratee?: OIteratee<*>): Object;
    merge(object?: ?Object, ...sources?: Array<?Object>): Object;
    mergeWith<T: Object, A: Object>(object: T, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A) => any|void): Object;
    mergeWith<T: Object, A: Object, B: Object>(object: T, s1: A, s2: B, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B) => any|void): Object;
    mergeWith<T: Object, A: Object, B: Object, C: Object>(object: T, s1: A, s2: B, s3: C, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B|C) => any|void): Object;
    mergeWith<T: Object, A: Object, B: Object, C: Object, D: Object>(object: T, s1: A, s2: B, s3: C, s4: D, customizer?: (objValue: any, srcValue: any, key: string, object: T, source: A|B|C|D) => any|void): Object;
    omit(object?: ?Object, ...props: Array<string>): Object;
    omit(object?: ?Object, props: Array<string>): Object;
    omitBy<A, T: {[id: string]: A}>(object?: ?T, predicate?: OPredicate<A, T>): Object;
    pick(object?: ?Object, ...props: Array<string>): Object;
    pick(object?: ?Object, props: Array<string>): Object;
    pickBy<A, T: {[id: string]: A}>(object?: ?T, predicate?: OPredicate<A, T>): Object;
    result(object?: ?Object, path?: ?Array<string>|string, defaultValue?: any): any;
    set(object?: ?Object, path?: ?Array<string>|string, value: any): Object;
    setWith<T>(object: T, path?: ?Array<string>|string, value: any, customizer?: (nsValue: any, key: string, nsObject: T) => any): Object;
    toPairs(object?: ?Object|Array<*>): NestedArray<any>;
    toPairsIn(object?: ?Object): NestedArray<any>;
    transform(collection: Object|Array<any>, iteratee?: OIteratee<*>, accumulator?: any): any;
    unset(object?: ?Object, path?: ?Array<string>|string): bool;
    update(object: Object, path: string[]|string, updater: Function): Object;
    updateWith(object: Object, path: string[]|string, updater: Function, customizer?: Function): Object;
    values(object?: ?Object): Array<any>;
    valuesIn(object?: ?Object): Array<any>;

    // Seq
    // harder to read, but this is _()
    (value: any): any;
    chain<T>(value: T): any;
    tap<T>(value: T, interceptor: (value:T)=>any): T;
    thru<T1,T2>(value: T1, interceptor: (value:T1)=>T2): T2;
    // TODO: _.prototype.*

    // String
    camelCase(string?: ?string): string;
    capitalize(string?: string): string;
    deburr(string?: string): string;
    endsWith(string?: string, target?: string, position?: number): bool;
    escape(string?: string): string;
    escapeRegExp(string?: string): string;
    kebabCase(string?: string): string;
    lowerCase(string?: string): string;
    lowerFirst(string?: string): string;
    pad(string?: string, length?: number, chars?: string): string;
    padEnd(string?: string, length?: number, chars?: string): string;
    padStart(string?: string, length?: number, chars?: string): string;
    parseInt(string: string, radix?: number): number;
    repeat(string?: string, n?: number): string;
    replace(string?: string, pattern: RegExp|string, replacement: ((string: string) => string)|string): string;
    snakeCase(string?: string): string;
    split(string?: string, separator: RegExp|string, limit?: number): Array<string>;
    startCase(string?: string): string;
    startsWith(string?: string, target?: string, position?: number): bool;
    template(string?: string, options?: TemplateSettings): Function;
    toLower(string?: string): string;
    toUpper(string?: string): string;
    trim(string?: string, chars?: string): string;
    trimEnd(string?: string, chars?: string): string;
    trimStart(string?: string, chars?: string): string;
    truncate(string?: string, options?: TruncateOptions): string;
    unescape(string?: string): string;
    upperCase(string?: string): string;
    upperFirst(string?: string): string;
    words(string?: string, pattern?: RegExp|string): Array<string>;

    // Util
    attempt(func: Function, ...args: Array<any>): any;
    bindAll(object?: ?Object, methodNames: Array<string>): Object;
    bindAll(object?: ?Object, ...methodNames: Array<string>): Object;
    cond(pairs: NestedArray<Function>): Function;
    conforms(source: Object): Function;
    constant<T>(value: T): () => T;
    defaultTo<T1:string|boolean|Object,T2>(value: T1, default: T2): T1;
    // NaN is a number instead of its own type, otherwise it would behave like null/void
    defaultTo<T1:number,T2>(value: T1, default: T2): T1|T2;
    defaultTo<T1:void|null,T2>(value: T1, default: T2): T2;
    flow(...funcs?: Array<Function>): Function;
    flow(funcs?: Array<Function>): Function;
    flowRight(...funcs?: Array<Function>): Function;
    flowRight(funcs?: Array<Function>): Function;
    identity<T>(value: T): T;
    iteratee(func?: any): Function;
    matches(source: Object): Function;
    matchesProperty(path?: ?Array<string>|string, srcValue: any): Function;
    method(path?: ?Array<string>|string, ...args?: Array<any>): Function;
    methodOf(object?: ?Object, ...args?: Array<any>): Function;
    mixin<T: Function|Object>(object?: T, source: Object, options?: { chain: bool }): T;
    noConflict(): Lodash;
    noop(...args: Array<mixed>): void;
    nthArg(n?: number): Function;
    over(...iteratees: Array<Function>): Function;
    over(iteratees: Array<Function>): Function;
    overEvery(...predicates: Array<Function>): Function;
    overEvery(predicates: Array<Function>): Function;
    overSome(...predicates: Array<Function>): Function;
    overSome(predicates: Array<Function>): Function;
    property(path?: ?Array<string>|string): Function;
    propertyOf(object?: ?Object): Function;
    range(start: number, end: number, step?: number): Array<number>;
    range(end: number, step?: number): Array<number>;
    rangeRight(start: number, end: number, step?: number): Array<number>;
    rangeRight(end: number, step?: number): Array<number>;
    runInContext(context?: Object): Function;

    stubArray(): Array<*>;
    stubFalse(): false;
    stubObject(): {};
    stubString(): '';
    stubTrue(): true;
    times(n: number, ...rest: Array<void>): Array<number>;
    times<T>(n: number, iteratee: ((i: number) => T)): Array<T>;
    toPath(value: any): Array<string>;
    uniqueId(prefix?: string): string;

    // Properties
    VERSION: string;
    templateSettings: TemplateSettings;
  }

  declare var exports: Lodash;
}
