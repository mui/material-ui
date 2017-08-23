// flow-typed signature: 30ac0f0790b16588aed9852e737dc9ff
// flow-typed version: 6344f23a7f/recompose_v0.24.x/flow_>=v0.53.x

/**
 * 1) Types give additional constraint on a language, recompose was written on the untyped language
 * as a consequence of this fact
 * for some recompose HOCs is near impossible to add correct typings.
 * 2) flow sometimes does not work as expected.
 *
 *  So any help and suggestions will be very appreciated.
 *
 * -----------------------------------------------------------------------------------
 * Type definition of recompose HOCs are splitted into 2 parts,
 * "HOCs with good flow support" - in most cases you can use them without big issues,
 * see `test_${hocName}.js` for the idea.
 * Some known issues:
 * see test_mapProps.js - inference work but type errors are not detected in hocs
 *
 * SUPPORTED HOCs:
 * defaultProps, mapProps, withProps, withStateHandlers, withHandlers, pure,
 * onlyUpdateForKeys, shouldUpdate, renderNothing, renderComponent, branch, withPropsOnChange,
 * onlyUpdateForPropTypes, toClass, withContext, getContext,
 * setStatic, setPropTypes, setDisplayName,
 * -----------------------------------------------------------------------------------
 * "TODO (UNSUPPORTED) HOCs" - you need to provide type information
 * (no automatic type inference), voodoo dancing etc
 * see `test_voodoo.js` for the idea
 *
 * remember that:
 * flattenProp,renameProp, renameProps can easily be replaced with withProps
 * withReducer, withState -> use withStateHandlers instead
 * lifecycle -> you don't need recompose if you need a lifecycle, just use React class instead
 * mapPropsStream -> see test_mapPropsStream.js
 * -----------------------------------------------------------------------------------
 *
 * utils:
 * getDisplayName, wrapDisplayName, shallowEqual,
 * isClassComponent, createEagerElement, createEagerFactory, createSink, componentFromProp,
 * nest, hoistStatics,
 */

//-------------------

declare module "recompose" {
  // -----------------------------------------------------------------
  // Private declarations
  // -----------------------------------------------------------------

  declare type Void_<A, B, C, D, R, Fn: (A, B, C, D) => R> = (
    A,
    B,
    C,
    D
  ) => void;

  declare type Void<T> = Void_<*, *, *, *, *, T>;

  declare type ExtractStateHandlersCodomain = <State, Enhanced, V>(
    v: (state: State, props: Enhanced) => V
  ) => Void<V>;

  declare type ExtractHandlersCodomain = <Enhanced, V>(
    v: (props: Enhanced) => V
  ) => V;

  declare type UnaryFn<A, R> = (a: A) => R;

  declare type Compose = (<A, B, C, D, E, F, G, H, I>(
    hi: UnaryFn<H, I>,
    gh: UnaryFn<G, H>,
    fg: UnaryFn<F, G>,
    ef: UnaryFn<E, F>,
    de: UnaryFn<D, E>,
    cd: UnaryFn<C, D>,
    bc: UnaryFn<B, C>,
    ab: UnaryFn<A, B>,
    ...rest: Array<void>
  ) => UnaryFn<A, I>) &
    (<A, B, C, D, E, F, G, H>(
      gh: UnaryFn<G, H>,
      fg: UnaryFn<F, G>,
      ef: UnaryFn<E, F>,
      de: UnaryFn<D, E>,
      cd: UnaryFn<C, D>,
      bc: UnaryFn<B, C>,
      ab: UnaryFn<A, B>,
      ...rest: Array<void>
    ) => UnaryFn<A, H>) &
    (<A, B, C, D, E, F, G>(
      fg: UnaryFn<F, G>,
      ef: UnaryFn<E, F>,
      de: UnaryFn<D, E>,
      cd: UnaryFn<C, D>,
      bc: UnaryFn<B, C>,
      ab: UnaryFn<A, B>,
      ...rest: Array<void>
    ) => UnaryFn<A, G>) &
    (<A, B, C, D, E, F>(
      ef: UnaryFn<E, F>,
      de: UnaryFn<D, E>,
      cd: UnaryFn<C, D>,
      bc: UnaryFn<B, C>,
      ab: UnaryFn<A, B>,
      ...rest: Array<void>
    ) => UnaryFn<A, F>) &
    (<A, B, C, D, E>(
      de: UnaryFn<D, E>,
      cd: UnaryFn<C, D>,
      bc: UnaryFn<B, C>,
      ab: UnaryFn<A, B>,
      ...rest: Array<void>
    ) => UnaryFn<A, E>) &
    (<A, B, C, D>(
      cd: UnaryFn<C, D>,
      bc: UnaryFn<B, C>,
      ab: UnaryFn<A, B>,
      ...rest: Array<void>
    ) => UnaryFn<A, D>) &
    (<A, B, C>(
      bc: UnaryFn<B, C>,
      ab: UnaryFn<A, B>,
      ...rest: Array<void>
    ) => UnaryFn<A, C>) &
    (<A, B>(ab: UnaryFn<A, B>, ...rest: Array<void>) => UnaryFn<A, B>);

  // -----------------------------------------------------------------
  // Public declarations
  // -----------------------------------------------------------------

  declare export type Component<A> = React$ComponentType<A>;

  declare export type HOC<Base, Enhanced> = UnaryFn<
    Component<Base>,
    Component<Enhanced>
  >;

  declare export var compose: Compose;

  // ---------------------------------------------------------------------------
  // ----------------===<<<HOCs with good flow support>>>===--------------------
  // ---------------------------------------------------------------------------

  declare export function defaultProps<Default, Enhanced>(
    defProps: Default
  ): HOC<{ ...$Exact<Enhanced>, ...Default }, Enhanced>;

  declare export function mapProps<Base, Enhanced>(
    propsMapper: (ownerProps: Enhanced) => Base
  ): HOC<Base, Enhanced>;

  declare export function withProps<BaseAdd, Enhanced>(
    propsMapper: ((ownerProps: Enhanced) => BaseAdd) | BaseAdd
  ): HOC<{ ...$Exact<Enhanced>, ...BaseAdd }, Enhanced>;

  declare export function withStateHandlers<
    State,
    Enhanced,
    StateHandlers: {
      [key: string]: (
        state: State,
        props: Enhanced
      ) => (...payload: any[]) => $Shape<State>
    }
  >(
    initialState: ((props: Enhanced) => State) | State,
    stateUpdaters: StateHandlers
  ): HOC<
    {
      ...$Exact<Enhanced>,
      ...State,
      ...$ObjMap<StateHandlers, ExtractStateHandlersCodomain>
    },
    Enhanced
  >;

  declare export function withHandlers<
    Enhanced,
    Handlers:
      | ((
          props: Enhanced
        ) => {
          [key: string]: (props: Enhanced) => Function
        })
      | {
          [key: string]: (props: Enhanced) => Function
        }
  >(
    handlers: ((props: Enhanced) => Handlers) | Handlers
  ): HOC<
    {
      ...$Exact<Enhanced>,
      ...$ObjMap<Handlers, ExtractHandlersCodomain>
    },
    Enhanced
  >;

  declare export function pure<A>(a: Component<A>): Component<A>;
  declare export function onlyUpdateForPropTypes<A>(
    a: Component<A>
  ): Component<A>;
  declare export function onlyUpdateForKeys<A>(Array<$Keys<A>>): HOC<A, A>;
  declare export function shouldUpdate<A>(
    (props: A, nextProps: A) => boolean
  ): HOC<A, A>;

  declare export function toClass<A>(a: Component<A>): Component<A>;

  declare export function withContext<A, ContextPropTypes, ContextObj>(
    childContextTypes: ContextPropTypes,
    getChildContext: (props: A) => ContextObj
  ): HOC<A, A>;

  declare export function getContext<CtxTypes, Enhanced>(
    contextTypes: CtxTypes
  ): HOC<{ ...$Exact<Enhanced>, ...CtxTypes }, Enhanced>;

  /**
   * It's wrong declaration but having that renderNothing and renderComponent are somehow useless
   * outside branch enhancer, we just give it an id type
   * so common way of using branch like
   * `branch(testFn, renderNothing | renderComponent(Comp))` will work as expected.
   * Tests are placed at test_branch.
   */
  declare export function renderNothing<A>(C: Component<A>): Component<A>;
  declare export function renderComponent<A>(a: Component<A>): HOC<A, A>;

  /**
   * We make an assumtion that left and right have the same type if exists
   */
  declare export function branch<Base, Enhanced>(
    testFn: (props: Enhanced) => boolean,
    // not a HOC because of inference problems, this works but HOC<Base, Enhanced> is not
    left: (Component<Base>) => Component<Enhanced>,
    // I never use right part and it can be a problem with inference as should be same type as left
    right?: (Component<Base>) => Component<Enhanced>
  ): HOC<Base, Enhanced>;

  // test_statics
  declare export function setStatic<A>(key: string, value: any): HOC<A, A>;
  declare export function setPropTypes<A>(propTypes: Object): HOC<A, A>;
  declare export function setDisplayName<A>(displayName: string): HOC<A, A>;

  declare export function withPropsOnChange<BaseAdd, Enhanced>(
    shouldMapOrKeys:
      | ((props: Enhanced, nextProps: Enhanced) => boolean)
      | Array<$Keys<Enhanced>>,
    propsMapper: (ownerProps: Enhanced) => BaseAdd
  ): HOC<{ ...$Exact<Enhanced>, ...BaseAdd }, Enhanced>;

  // ---------------------------------------------------------------------------
  // ----------------===<<<TODO (UNSUPPORTED) HOCs>>>===------------------------
  // ---------------------------------------------------------------------------

  // use withProps instead
  declare export function flattenProp<Base, Enhanced>(
    propName: $Keys<Enhanced>
  ): HOC<Base, Enhanced>;

  // use withProps instead
  declare export function renameProp<Base, Enhanced>(
    oldName: $Keys<Enhanced>,
    newName: $Keys<Base>
  ): HOC<Base, Enhanced>;

  // use withProps instead
  declare export function renameProps<Base, Enhanced>(nameMap: {
    [key: $Keys<Enhanced>]: $Keys<Base>
  }): HOC<Base, Enhanced>;

  // use withStateHandlers instead
  declare export function withState<Base, Enhanced, T>(
    stateName: string,
    stateUpdaterName: string,
    initialState: T | ((props: Enhanced) => T)
  ): HOC<Base, Enhanced>;

  // use withStateHandlers instead
  declare export function withReducer<A, B, Action, State>(
    stateName: string,
    dispatchName: string,
    reducer: (state: State, action: Action) => State,
    initialState: State
  ): HOC<A, B>;

  // lifecycle use React instead
  declare export function lifecycle<A, B>(spec: Object): HOC<A, B>;

  // Help needed, as explicitly providing the type
  // errors not detected, see TODO at test_mapPropsStream.js
  declare export function mapPropsStream<Base, Enhanced>(
    (props$: any) => any
  ): HOC<Base, Enhanced>;

  // ---------------------------------------------------------------------------
  // -----------------------------===<<<Utils>>>===-----------------------------
  // ---------------------------------------------------------------------------

  declare export function getDisplayName<A>(C: Component<A>): string;

  declare export function wrapDisplayName<A>(
    C: Component<A>,
    wrapperName: string
  ): string;

  declare export function shallowEqual(objA: mixed, objB: mixed): boolean;

  declare export function isClassComponent(value: any): boolean;

  declare export function createEagerElement<A>(
    type: Component<A> | string,
    props: ?A,
    children?: ?React$Node
  ): React$Element<any>;

  declare export function createEagerFactory<A>(
    type: Component<A> | string
  ): (props: ?A, children?: ?React$Node) => React$Element<any>;

  declare export function createSink<A>(
    callback: (props: A) => void
  ): Component<A>;

  declare export function componentFromProp<A>(propName: string): Component<A>;

  declare export function nest<A>(
    ...Components: Array<Component<any> | string>
  ): Component<A>;

  declare export function hoistStatics<A, B, H: HOC<A, B>>(hoc: H): H;

  declare export function componentFromStream<T>(
    (props$: any) => any
  ): T => React$Element<any>;

  declare export function createEventHandler(): {
    stream: any,
    handler: Function
  };
}
