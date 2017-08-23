// flow-typed signature: 86993bd000012d3e1ef10d757d16952d
// flow-typed version: a165222d28/redux_v3.x.x/flow_>=v0.33.x

declare module 'redux' {

  /*

    S = State
    A = Action
    D = Dispatch

  */

  declare type DispatchAPI<A> = (action: A) => A;
  declare type Dispatch<A: { type: $Subtype<string> }> = DispatchAPI<A>;

  declare type MiddlewareAPI<S, A, D = Dispatch<A>> = {
    dispatch: D;
    getState(): S;
  };

  declare type Store<S, A, D = Dispatch<A>> = {
    // rewrite MiddlewareAPI members in order to get nicer error messages (intersections produce long messages)
    dispatch: D;
    getState(): S;
    subscribe(listener: () => void): () => void;
    replaceReducer(nextReducer: Reducer<S, A>): void
  };

  declare type Reducer<S, A> = (state: S, action: A) => S;

  declare type CombinedReducer<S, A> = (state: $Shape<S> & {} | void, action: A) => S;

  declare type Middleware<S, A, D = Dispatch<A>> =
    (api: MiddlewareAPI<S, A, D>) =>
      (next: D) => D;

  declare type StoreCreator<S, A, D = Dispatch<A>> = {
    (reducer: Reducer<S, A>, enhancer?: StoreEnhancer<S, A, D>): Store<S, A, D>;
    (reducer: Reducer<S, A>, preloadedState: S, enhancer?: StoreEnhancer<S, A, D>): Store<S, A, D>;
  };

  declare type StoreEnhancer<S, A, D = Dispatch<A>> = (next: StoreCreator<S, A, D>) => StoreCreator<S, A, D>;

  declare function createStore<S, A, D>(reducer: Reducer<S, A>, enhancer?: StoreEnhancer<S, A, D>): Store<S, A, D>;
  declare function createStore<S, A, D>(reducer: Reducer<S, A>, preloadedState: S, enhancer?: StoreEnhancer<S, A, D>): Store<S, A, D>;

  declare function applyMiddleware<S, A, D>(...middlewares: Array<Middleware<S, A, D>>): StoreEnhancer<S, A, D>;

  declare type ActionCreator<A, B> = (...args: Array<B>) => A;
  declare type ActionCreators<K, A> = { [key: K]: ActionCreator<A, any> };

  declare function bindActionCreators<A, C: ActionCreator<A, any>, D: DispatchAPI<A>>(actionCreator: C, dispatch: D): C;
  declare function bindActionCreators<A, K, C: ActionCreators<K, A>, D: DispatchAPI<A>>(actionCreators: C, dispatch: D): C;

  declare function combineReducers<O: Object, A>(reducers: O): CombinedReducer<$ObjMap<O, <S>(r: Reducer<S, any>) => S>, A>;

  declare function compose<A, B>(ab: (a: A) => B): (a: A) => B
  declare function compose<A, B, C>(
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => C
  declare function compose<A, B, C, D>(
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => D
  declare function compose<A, B, C, D, E>(
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => E
  declare function compose<A, B, C, D, E, F>(
    ef: (e: E) => F,
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => F
  declare function compose<A, B, C, D, E, F, G>(
    fg: (f: F) => G,
    ef: (e: E) => F,
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => G
  declare function compose<A, B, C, D, E, F, G, H>(
    gh: (g: G) => H,
    fg: (f: F) => G,
    ef: (e: E) => F,
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (a: A) => B
  ): (a: A) => H
  declare function compose<A, B, C, D, E, F, G, H, I>(
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
