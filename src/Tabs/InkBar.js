import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
				const {
								inkBar,
				} = state.muiTheme;

				return {
								root: {
												left: props.left,
												right: props.right,
												bottom: 0,
												display: 'block',
												backgroundColor: props.color || inkBar.backgroundColor,
												height: 2,
												marginTop: -2,
												position: 'absolute',
												transition: `left ${props.moveBarLeft ? '0.125' : '0.25'}s cubic-bezier(.35,0,.25,1),
                   right ${props.moveBarLeft ? '0.25' : '0.125'}s cubic-bezier(.35,0,.25,1)`
								}
				};
}

const InkBar = React.createClass({

				propTypes: {
								color: React.PropTypes.string,
								left: React.PropTypes.number.isRequired,
								moveBarLeft: React.PropTypes.bool.isRequired,
								right: React.PropTypes.number.isRequired,

								/**
									* Override the inline-styles of the root element.
									*/
								style: React.PropTypes.object
				},

				contextTypes: {
								muiTheme: React.PropTypes.object
				},

				childContextTypes: {
								muiTheme: React.PropTypes.object
				},

				getInitialState() {
								return {
												muiTheme: this.context.muiTheme || getMuiTheme()
								};
				},

				getChildContext() {
								return {
												muiTheme: this.state.muiTheme
								};
				},

				componentWillReceiveProps(nextProps, nextContext) {
								this.setState({
												muiTheme: nextContext.muiTheme || this.state.muiTheme
								});
				},

				render() {
								const {
												style,
								} = this.props;

								const {
												prepareStyles,
								} = this.state.muiTheme;

								const styles = getStyles(this.props, this.state);

								return (
												<div style={prepareStyles(Object.assign(styles.root, style))}/>
								);
				}
});

export default InkBar;
