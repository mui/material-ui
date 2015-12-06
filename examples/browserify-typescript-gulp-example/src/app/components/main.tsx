/** In this file, we create a React component which incorporates components provided by material-ui */

import * as React from 'react';
import * as Mui from 'material-ui';
import pureRender from "pure-render-decorator";

const containerStyle = {
  textAlign: 'center',
  paddingTop: 200,
};

const standardActions = [
  {
    text: 'Okay',
  },
];

interface MainProps {
  // define 'Main' component's properties here
}

interface MainState {
  // define 'Main' component's state here
}

@pureRender // apply pure render mixin
class Main extends React.Component<MainProps, MainState>
                                  implements React.ChildContextProvider<any> {

  static childContextTypes: React.ValidationMap<any> = {
      muiTheme: React.PropTypes.object
  };

  getChildContext(): any {
      return {
          muiTheme: Mui.Styles.ThemeManager.getMuiTheme(Mui.Styles.LightRawTheme)
      };
  };

  constructor(props: MainProps) {
      super(props);
  }

  private handleTouchTap() {
    (this.refs["dlg1"] as Mui.Dialog).show();
  }

  render() {
    return (
      <div style={containerStyle}>
        <Mui.Dialog
          key={0}
          ref="dlg1"
          openImmediately={false}
          title="Super Secret Password"
          actions={standardActions}
        >
          1-2-3-4-5
        </Mui.Dialog>
        <h1>material-ui</h1>
        <h2>example project</h2>
        <Mui.RaisedButton
          key={1}
          ref="btn1"
          label="Super Secret Password"
          primary={true}
          onTouchTap={() => this.handleTouchTap()} />
      </div>
    );
  }
}

export default Main;
