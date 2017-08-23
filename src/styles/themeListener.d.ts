// This is using the API from https://github.com/vesparny/brcast
interface MuiContext {
  getState(): Object;
  subscribe(callback: Function): Function;
}

export interface ThemeListener {
  contextTypes: {
    'material-ui': object;
  };
  initial(context: Object): Object;
  subscribe(context: Object, callback: Function): Function;
}

export default ThemeListener;
