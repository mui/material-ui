// This is using the API from https://github.com/vesparny/brcast
interface Broadcast<S> {
  setState(state: S): void;
  getState(): S;
  subscribe(callback: (state: S) => void): number;
  unsubscribe(subscriptionId: number): void;
}

interface MuiContext<S> {
  __THEMING__?: Broadcast<S>;
}

export interface ThemeListener<S = {}> {
  initial(context: MuiContext<S>): S | null;
  subscribe(context: MuiContext<S>, callback: (state: S) => void): number | null;
  unsubscribe(context: MuiContext<S>, subscriptionId: number): void;
}

declare const themeListener: ThemeListener;

export default themeListener;
