import React from 'react';
import PropTypes from 'prop-types';
import RefreshIndicator from '@material-ui/lab/RefreshIndicator';
import RefreshableContainer from '@material-ui/lab/RefreshableContainer';

class LoadingIndicator extends React.Component {
  state = {
    loading: false,
  };

  handleRefresh = () => {
    this.setState({ loading: true });
    setTimeout(() => this.setState({ loading: false }), 1000);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <RefreshIndicator size={40} left={10} top={0} status="loading" />
        <RefreshIndicator size={50} left={70} top={0} status="loading" />
        and
        <RefreshableContainer
          style={{ height: 200 }}
          onRefresh={this.handleRefresh}
          loading={this.state.loading}
        >
          {[...Array(100).keys()].map(i => <div key={i}>Item #{i}</div>)}
        </RefreshableContainer>
      </div>
    );
  }
}

LoadingIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default LoadingIndicator;
