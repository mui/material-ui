// This is using the API from https://github.com/vesparny/brcast
interface MuiContext {
  getState();
  subscribe(callback: Function): Function;
}

export interface ThemeListener {
  contextTypes: {
    'material-ui': object;
  };
  initial(context);
  subscribe(context, callback: Function): Function;
}

export default ThemeListener;
