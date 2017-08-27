// flow-typed signature: a66d63ce84b8c546ae8bc484f7b4c4bc
// flow-typed version: 778b20e026/enzyme_v2.3.x/flow_>=v0.28.x

declare module 'enzyme' {
  declare type PredicateFunction<T: Wrapper> = (wrapper: T) => boolean;
  declare type NodeOrNodes = React$Element<any> | Array<React$Element<any>>;
  declare type EnzymeSelector = string | React$Element<*> | Object;

  // CheerioWrapper is a type alias for an actual cheerio instance
  // TODO: Reference correct type from cheerio's type declarations
  declare type CheerioWrapper = any;

  declare class Wrapper {
    find(selector: EnzymeSelector): this;
    findWhere(predicate: PredicateFunction<this>): this;
    filter(selector: EnzymeSelector): this;
    filterWhere(predicate: PredicateFunction<this>): this;
    contains(nodeOrNodes: NodeOrNodes): boolean;
    containsMatchingElement(node: React$Element<any>): boolean;
    containsAllMatchingElements(nodes: NodeOrNodes): boolean;
    containsAnyMatchingElements(nodes: NodeOrNodes): boolean;
    dive(option?: { context?: Object }): this;
    exists(): boolean;
    matchesElement(node: React$Element<any>): boolean;
    hasClass(className: string): boolean;
    is(selector: EnzymeSelector): boolean;
    isEmpty(): boolean;
    not(selector: EnzymeSelector): boolean;
    children(selector?: EnzymeSelector): this;
    childAt(index: number): this;
    parents(selector?: EnzymeSelector): this;
    parent(): this;
    closest(selector: EnzymeSelector): this;
    render(): CheerioWrapper;
    unmount(): this;
    text(): string;
    html(): string;
    get(index: number): React$Element<any>;
    getNode(): React$Element<any>;
    getNodes(): Array<React$Element<any>>;
    at(index: number): this;
    first(): this;
    last(): this;
    state(key?: string): any;
    context(key?: string): any;
    props(): Object;
    prop(key: string): any;
    key(): string;
    simulate(event: string, ...args: Array<any>): this;
    setState(state: Object, callback?: Function): this,
    setProps(props: Object): this;
    setContext(context: Object): this;
    instance(): React$Component<*, *, *>;
    update(): this;
    debug(): string;
    type(): string | Function | null;
    name(): string;
    forEach(fn: (node: this) => any): this;
    map<T>(fn: (node: this) => T): Array<T>;
    reduce<T>(fn: (value: T, node: this, index: number) => T, initialValue?: T): Array<T>;
    reduceRight<T>(fn: (value: T, node: this, index: number) => T, initialValue?: T): Array<T>;
    some(selector: EnzymeSelector): boolean;
    someWhere(predicate: PredicateFunction<this>): boolean;
    every(selector: EnzymeSelector): boolean;
    everyWhere(predicate: PredicateFunction<this>): boolean;
    length: number;
  }

  // rosskevin: fix submitted https://github.com/flowtype/flow-typed/pull/950
  declare export class ReactWrapper extends Wrapper {
    constructor(nodes: NodeOrNodes, root: any, options?: ?Object): ReactWrapper;
    mount(): this;
    ref(refName: string): this;
    detach(): void;
  }

  declare export class ShallowWrapper extends Wrapper {
    equals(node: React$Element<any>): boolean;
    shallow(options?: { context?: Object }): ShallowWrapper;
  }

  declare export function shallow(node: React$Element<any>, options?: { context?: Object }): ShallowWrapper;
  declare export function mount(node: React$Element<any>, options?: { context?: Object, attachTo?: HTMLElement, childContextTypes?: Object }): ReactWrapper;
  declare export function render(node: React$Element<any>, options?: { context?: Object }): CheerioWrapper;
}
