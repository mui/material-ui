// flow-typed signature: 33b83b6284653250e74578cf4dbe6124
// flow-typed version: e282e4128f/redux_v3.x.x/flow_>=v0.33.x

declare module 'redux' {

  /*

    S = State
    A = Action
    D = Dispatch

  */

  declare export type DispatchAPI<A> = (action: A) => A;
  declare export type Dispatch<A: { type: $Subtype<string> }> = DispatchAPI<A>;

  declare export type MiddlewareAPI<S, A, D = Dispatch<A>> = {
    dispatch: D;
    getState(): S;
  };

  declare export type Store<S, A, D = Dispatch<A>> = {
    // rewrite MiddlewareAPI members in order to get nicer error messages (intersections produce long messages)
    dispatch: D;
    getState(): S;
    subscribe(listener: () => void): () => void;
    replaceReducer(nextReducer: Reducer<S, A>): void
  };

  declare export type Reducer<S, A> = (state: S, action: A) => S;

  declare export type CombinedReducer<S, A> = (state: $Shape<S> & {} | void, action: A) => S;

  declare export type Middleware<S, A, D = Dispatch<A>> =
    (api: MiddlewareAPI<S, A, D>) =>
      (next: D) => D;

  declare export type StoreCreator<S, A, D = Dispatch<A>> = {
    (reducer: Reducer<S, A>, enhancer?: StoreEnhancer<S, A, D>): Store<S, A, D>;
    (reducer: Reducer<S, A>, preloadedState: S, enhancer?: StoreEnhancer<S, A, D>): Store<S, A, D>;
  };

  declare export type StoreEnhancer<S, A, D = Dispatch<A>> = (next: StoreCreator<S, A, D>) => StoreCreator<S, A, D>;

  declare export function createStore<S, A, D>(reducer: Reducer<S, A>, enhancer?: StoreEnhancer<S, A, D>): Store<S, A, D>;
  declare export function createStore<S, A, D>(reducer: Reducer<S, A>, preloadedState: S, enhancer?: StoreEnhancer<S, A, D>): Store<S, A, D>;

  declare export function applyMiddleware<S, A, D>(...middlewares: Array<Middleware<S, A, D>>): StoreEnhancer<S, A, D>;

  declare export type ActionCreator<A, B> = (...args: Array<B>) => A;
  declare export type ActionCreators<K, A> = { [key: K]: ActionCreator<A, any> };

  declare export function bindActionCreators<A, C: ActionCreator<A, any>, D: DispatchAPI<A>>(actionCreator: C, dispatch: D): C;
  declare export function bindActionCreators<A, K, C: ActionCreators<K, A>, D: DispatchAPI<A>>(actionCreators: C, dispatch: D): C;

  declare export function combineReducers<O: Object, A>(reducers: O): CombinedReducer<$ObjMap<O, <S>(r: Reducer<S, any>) => S>, A>;

  declare export function compose<A, B>(ab: (a: A) => B): (a: A) => B
  declare export function compose<A, B, C>(
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => C
  declare export function compose<A, B, C, D>(
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => D
  declare export function compose<A, B, C, D, E>(
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => E
  declare export function compose<A, B, C, D, E, F>(
    ef: (e: E) => F,
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => F
  declare export function compose<A, B, C, D, E, F, G>(
    fg: (f: F) => G,
    ef: (e: E) => F,
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => G
  declare export function compose<A, B, C, D, E, F, G, H>(
    gh: (g: G) => H,
    fg: (f: F) => G,
    ef: (e: E) => F,
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => H
  declare export function compose<A, B, C, D, E, F, G, H, I>(
    hi: (h: H) => I,
    gh: (g: G) => H,
    fg: (f: F) => G,
    ef: (e: E) => F,
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => I

}
