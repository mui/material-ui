import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import LinearProgress from 'material-ui/lib/linear-progress';

export default class LinearProgressExampleDelayed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  toggleOperation() {
    this.setState({loading: !this.state.loading});
  }

  render() {
    return (
      <div>
        <div>
          <RaisedButton
            style={{marginBottom: 16}}
            primary
            label={this.state.loading ? 'Cancel' : 'Load'}
            onTouchTap={this.toggleOperation.bind(this)}
          />
        </div>
        <div>
          {this.state.loading ? <LinearProgress delay={2000} /> : ''}
        </div>
      </div>
    );
  }
}
