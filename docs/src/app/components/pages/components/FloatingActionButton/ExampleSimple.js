import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AnimatedFAB from 'material-ui/AnimatedFAB';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  marginRight: 20,
};

class transitionDiv extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          boxSizing: 'border-box',
          height: 56,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

class FloatingActionButtonExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      showMainFAB: true,
      fab: (
        <AnimatedFAB
          key={1}
          style={style}
          onClick={this.handleFabClicked}
          onDidLeave={this.handleDidLeave}
        >
          <ContentAdd />
        </AnimatedFAB>
      ),
    };
  }

  handleFabClicked = () => {
    this.setState({
      showMainFAB: !this.state.showMainFAB,
      fab: '',
    });
  }

  handleDidLeave = () => {
    let fab;
    if (this.state.showMainFAB) {
      fab = (
        <AnimatedFAB
          key={1}
          style={style}
          onClick={this.handleFabClicked}
          onDidLeave={this.handleDidLeave}
        >
          <ContentAdd />
        </AnimatedFAB>
      );
    } else {
      fab = (
        <AnimatedFAB
          key={2}
          secondary={true}
          mini={true}
          style={Object.assign({}, style, {
            position: 'absolute',
            left: 76,
            top: 16,
          })}
          onClick={this.handleFabClicked}
          onDidLeave={this.handleDidLeave}
        >
          <ContentAdd />
        </AnimatedFAB>
      );
    }
    this.setState({
      fab: fab,
    });
  }

  render() {
    return (
      <div>
        <FloatingActionButton style={style}>
          <ContentAdd />
        </FloatingActionButton>

        <FloatingActionButton mini={true} style={style}>
          <ContentAdd />
        </FloatingActionButton>

        <FloatingActionButton secondary={true} style={style}>
          <ContentAdd />
        </FloatingActionButton>

        <FloatingActionButton mini={true} secondary={true} style={style}>
          <ContentAdd />
        </FloatingActionButton>

        <FloatingActionButton disabled={true} style={style}>
          <ContentAdd />
        </FloatingActionButton>

        <FloatingActionButton mini={true} disabled={true} style={style}>
          <ContentAdd />
        </FloatingActionButton>

        <ReactTransitionGroup component={transitionDiv}>
          {this.state.fab}
        </ReactTransitionGroup>
      </div>
    );
  }
}

export default FloatingActionButtonExampleSimple;
