// This is using the API from https://github.com/vesparny/brcast
interface MuiContext {
  getState(): object;
  subscribe(callback: Function): Function;
}

export interface ThemeListener {
  contextTypes: {
    'material-ui': object;
  };
  initial(context: object): object;
  subscribe(context: object, callback: Function): Function;
}

export default ThemeListener;
