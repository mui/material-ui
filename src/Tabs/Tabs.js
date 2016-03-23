import React from 'react';
import ReactDOM from 'react-dom';
import TabTemplate from './TabTemplate';
import InkBar from './InkBar';
import TabPaginatorButton from './paginatorButton';
import getMuiTheme from '../styles/getMuiTheme';
import Events from '../utils/events';
import warning from 'warning';

const Constants = {
	TAB_ITEM_REF_NAME_PREFIX: 'tab-',
	TAB_WRAPPER_REF_NAME: 'tab-wrapper',
	TAB_SCROLL_WRAPPER_REF_NAME: 'tab-scroll-wrapper',
	TAB_CONTAINER_REF_NAME: 'tab-container',
	TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH: 32
};

function getStyles(props, state) {
	const {
		tabs,
	} = state.muiTheme;

	return {
		tabWrapper: {
			position: 'relative',
			minWidth: '100%',
			backgroundColor: tabs.backgroundColor
		},
		tabScrollWrapper: {
			position: 'relative',
			minWidth: '100%',
			overflowY: 'hidden',
			overflowX: 'hidden'
		},
		tabItemContainer: {
			margin: 0,
			padding: state.shouldPaginate ? `0 ${Constants.TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH}px` : 0,
			backgroundColor: tabs.backgroundColor,
			whiteSpace: 'nowrap',
			display: 'table',
			width: (props.fillWidth && !state.shouldPaginate) ? '100%' : 0
		}
	};
}


const Tabs = React.createClass({

	propTypes: {
		/**
		 * Should be used to pass `Tab` components.
		 */
		children: React.PropTypes.node,

		/**
		 * The css class name of the root element.
		 */
		className: React.PropTypes.string,

		/**
		 * The css class name of the content's container.
		 */
		contentContainerClassName: React.PropTypes.string,

		/**
		 * Override the inline-styles of the content's container.
		 */
		contentContainerStyle: React.PropTypes.object,

		/**
		 * Tab container fills the width of the window. Tabs will have equal width
		 * as long as the container width is less than the window width.
		 */
		fillWidth: React.PropTypes.bool,

		/**
		 * Specify initial visible tab index.
		 * Initial selected index is set by default to 0.
		 * If initialSelectedIndex is set but larger than the total amount of specified tabs,
		 * initialSelectedIndex will revert back to default.
		 */
		initialSelectedIndex: React.PropTypes.number,

		/**
		 * Override the inline-styles of the InkBar.
		 */
		inkBarStyle: React.PropTypes.object,

		/**
		 * Called when the selected value change.
		 */
		onChange: React.PropTypes.func,

		/**
		 * Override the inline-styles of the root element.
		 */
		style: React.PropTypes.object,

		/**
		 * Override the inline-styles of the tab-labels container.
		 */
		tabItemContainerStyle: React.PropTypes.object,

		/**
		 * Override the inline-styles of the tab paginator button icon.
		 */
		tabPaginatorButtonIconStyle: React.PropTypes.object,

		/**
		 * Override the inline-styles of the tab paginator buttons.
		 */
		tabPaginatorButtonStyle: React.PropTypes.object,

		/**
		 * Override the default tab template used to wrap the content of each tab element.
		 */
		tabTemplate: React.PropTypes.func,

		/**
		 * Override the inline-styles of the tab items container.
		 */
		tabWrapperStyle: React.PropTypes.object,

		/**
		 * Makes Tabs controllable and selects the tab whose value prop matches this prop.
		 */
		value: React.PropTypes.any,

		/**
		 * Icon for paginator button
		 */
		iconButtonLeft: React.PropTypes.string,
		iconButtonRight: React.PropTypes.string
	},

	contextTypes: {
		muiTheme: React.PropTypes.object
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	getDefaultProps() {
		return {
			initialSelectedIndex: 0,
			fillWidth: true,
			onChange: () => {
			}
		};
	},

	getInitialState() {
		const valueLink = this.getValueLink(this.props);
		const initialIndex = this.props.initialSelectedIndex;
		let selectedIndex = valueLink.value !== undefined ?
			this._getSelectedIndex(this.props) :
			initialIndex < this.getTabCount() ?
				initialIndex :
				0;

		return {
			selectedIndex: selectedIndex,
			previousIndex: selectedIndex,
			muiTheme: this.context.muiTheme || getMuiTheme(),
			disableLeftPaginatorButton: selectedIndex === 0,
			disableRightPaginatorButton: selectedIndex === this.getTabCount() - 1,
			tabInfo: [],
			shouldPaginate: false,
			tabContainerWidth: 0,
			tabWrapperWidth: 0
		};
	},

	getChildContext() {
		return {
			muiTheme: this.state.muiTheme,
		};
	},

	componentDidMount() {
		let self = this;
		window.requestAnimationFrame(function () {
			window.setTimeout(self.handleWindowWidthChange, 10);
		});
		Events.on(window, 'resize', this.handleWindowWidthChange);
	},

	componentWillReceiveProps(newProps, nextContext) {
		const valueLink = this.getValueLink(newProps);
		const newState = {
			muiTheme: nextContext.muiTheme || this.state.muiTheme,
		};

		if (valueLink.value !== undefined) {
			newState.selectedIndex = this._getSelectedIndex(newProps);
		}

		this.setState(newState);
	},

	componentDidUpdate() {
		this.updateTabWrapperScrollOffset(this.state.tabInfo);
	},

	componentWillUnmount() {
		Events.off(window, 'resize', this.handleWindowWidthChange);
	},

	getEvenWidth() {
		return (
			parseInt(window
				.getComputedStyle(ReactDOM.findDOMNode(this))
				.getPropertyValue('width'), 10)
		);
	},

	getTabCount() {
		return React.Children.count(this.props.children);
	},

	// Do not use outside of this component, it will be removed once valueLink is deprecated
	getValueLink(props) {
		return props.valueLink || {
				value: props.value,
				requestChange: props.onChange,
			};
	},

	_getSelectedIndex(props) {
		const valueLink = this.getValueLink(props);
		let selectedIndex = -1;

		React.Children.forEach(props.children, (tab, index) => {
			if (valueLink.value === tab.props.value) {
				selectedIndex = index;
			}
		});

		return selectedIndex;
	},

	_handleTabTouchTap(value, event, tab) {
		const valueLink = this.getValueLink(this.props);
		const tabIndex = tab.props.tabIndex;

		if ((valueLink.value && valueLink.value !== value) ||
			this.state.selectedIndex !== tabIndex) {
			valueLink.requestChange(value, event, tab);
		}

		this.setState({selectedIndex: tabIndex});

		if (tab.props.onActive) {
			tab.props.onActive(tab);
		}
	},

	_getSelected(tab, index) {
		const valueLink = this.getValueLink(this.props);
		return valueLink.value ? valueLink.value === tab.props.value :
		this.state.selectedIndex === index;
	},

	_getDOMNode(refName) {
		return ReactDOM.findDOMNode(this.refs[refName]);
	},

	_getDOMNodeWidth(refName) {
		return this._getDOMNode(refName).offsetWidth;
	},

	_getSelectedTabWidth(tabIndex) {
		return this._getDOMNode(Constants.TAB_ITEM_REF_NAME_PREFIX + tabIndex).offsetWidth;
	},

	_getSelectedTabLeftOffset(tabIndex) {
		let tabLeftOffset = 0;
		React.Children.forEach(this.props.children, (tab, index) => {
			let tempWidth = this._getDOMNodeWidth(Constants.TAB_ITEM_REF_NAME_PREFIX + index);
			if (index < tabIndex) {
				tabLeftOffset += tempWidth;
			}
		});
		return tabLeftOffset;
	},

	_handleLeftTabPaginatorTap() {
		let tabContainerWidth = this._getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
		this._getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft -=
			tabContainerWidth / this.getTabCount();
		// tabContainerWidth needed due to that element might not have proper width
		this.setState({
			disableLeftPaginatorButton: this._disableLeftPaginatorButton(),
			disableRightPaginatorButton: this._disableRightPaginatorButton(),
			tabContainerWidth: tabContainerWidth,
		});
	},

	_handleRightTabPaginatorTap() {
		let tabContainerWidth = this._getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
		this._getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft +=
			tabContainerWidth / this.getTabCount();
		// tabContainerWidth needed due to that element might not have proper width
		this.setState({
			disableLeftPaginatorButton: this._disableLeftPaginatorButton(),
			disableRightPaginatorButton: this._disableRightPaginatorButton(),
			tabContainerWidth: tabContainerWidth,
		});
	},

	_disableLeftPaginatorButton() {
		return this._getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft === 0;
	},


	_disableRightPaginatorButton() {
		let tabContainerWidth = this._getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
		let tabWrapperWidth = this._getDOMNodeWidth(Constants.TAB_WRAPPER_REF_NAME);
		return this._getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft === tabContainerWidth - tabWrapperWidth;
	},

	handleWindowWidthChange() {
		this.setState(this.getNewState());
	},

	getNewState() {
		let newState = {};
		let tabContainerWidth = this._getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
		let tabWrapperWidth = this._getDOMNodeWidth(Constants.TAB_WRAPPER_REF_NAME);
		let nextShouldPaginate = tabContainerWidth > tabWrapperWidth;
		let tabInfo = [];
		React.Children.forEach(this.props.children, (tab, index) => {
			let tabWidth = this._getDOMNodeWidth(Constants.TAB_ITEM_REF_NAME_PREFIX + index);
			let leftOffset = nextShouldPaginate ? Constants.TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH : 0;
			if (tabInfo.length > 0) {
				let lastAddedTab = tabInfo[tabInfo.length - 1];
				leftOffset = lastAddedTab.rightOffset;
			}
			tabInfo[index] = {
				width: tabWidth,
				leftOffset: leftOffset,
				rightOffset: leftOffset + tabWidth,
				right: tabWrapperWidth - leftOffset - tabWidth,
			};
		});
		this.updateTabWrapperScrollOffset(tabInfo);
		newState.tabContainerWidth = tabContainerWidth;
		newState.tabInfo = tabInfo;
		newState.tabWrapperWidth = tabWrapperWidth;
		newState.shouldPaginate = nextShouldPaginate;
		newState.muiTheme = this.state.muiTheme;
		newState.selectedIndex = this.state.selectedIndex;
		newState.previousIndex = this.state.previousIndex;
		newState.disableLeftPaginatorButton = this._disableLeftPaginatorButton();
		newState.disableRightPaginatorButton = this._disableRightPaginatorButton();
		return newState;
	},

	updateTabWrapperScrollOffset(tabInfo) {
		// make selected tab visible on either first entry or device orientation change
		let tabContainerWidth = this._getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
		let tabWrapperWidth = this._getDOMNodeWidth(Constants.TAB_WRAPPER_REF_NAME);
		let nextShouldPaginate = tabContainerWidth > tabWrapperWidth;
		let tabWrapperWidthChange = this.state.tabWrapperWidth !== tabWrapperWidth;
		let paginationChange = this.state.shouldPaginate !== nextShouldPaginate;
		if (paginationChange || tabContainerWidth !== this.state.tabContainerWidth || tabWrapperWidthChange) {
			let nextSelectedTab = tabInfo[this.state.selectedIndex];
			if (nextSelectedTab !== undefined) {
				let tabScrollWrapper = this._getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME);
				let tabScrollWrapperLeftScroll = tabScrollWrapper.scrollLeft;
				let tabScrollWrapperWidth = tabScrollWrapper.offsetWidth;
				let tabPaginationButtonMargin = nextShouldPaginate ? Constants.TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH : 0;
				let tabVisible = nextSelectedTab.leftOffset - tabPaginationButtonMargin >= tabScrollWrapperLeftScroll
					&& tabScrollWrapperLeftScroll + tabScrollWrapperWidth - nextSelectedTab.rightOffset
					- tabPaginationButtonMargin >= 0;
				if (!tabVisible) {
					let shouldScrollRight = tabScrollWrapperLeftScroll + tabScrollWrapperWidth
						- nextSelectedTab.rightOffset - tabPaginationButtonMargin < 0;
					// calculate how much to set tag scroll wrapper's scrollLeft to
					if (shouldScrollRight) {
						tabScrollWrapper.scrollLeft = nextSelectedTab.rightOffset + tabPaginationButtonMargin
							- tabScrollWrapperWidth;
					} else {
						tabScrollWrapper.scrollLeft = nextSelectedTab.leftOffset - tabPaginationButtonMargin;
					}
				}
			}
		}
	},

	render() {
		const {
			children,
			contentContainerClassName,
			contentContainerStyle,
			initialSelectedIndex,
			inkBarStyle,
			style,
			tabWrapperStyle,
			tabPaginatorButtonStyle,
			tabPaginatorButtonIconStyle,
			tabItemContainerStyle,
			tabTemplate,
			fillWidth,
			...other,
		} = this.props;

		let equalTabWidth = fillWidth && !this.state.shouldPaginate;

		const {prepareStyles} = this.state.muiTheme;

		const styles = getStyles(this.props, this.state);

		// calculate selected tab's width and offset, used to animate inl-bar
		let width = 0;
		let left = 0;
		let right = 0;
		if (equalTabWidth) {
			width = this.state.tabWrapperWidth / this.getTabCount();
			left = width * this.state.selectedIndex;
			right = this.state.tabWrapperWidth - width - left;
		} else if (this.state.tabInfo.length > 0) {
			width = this.state.tabInfo[this.state.selectedIndex].width;
			left = this.state.tabInfo[this.state.selectedIndex].leftOffset;
			right = this.state.tabInfo[this.state.selectedIndex].right;
		}

		const valueLink = this.getValueLink(this.props);
		const tabValue = valueLink.value;
		const tabContent = [];

		// const width = 100 / this.getTabCount();

		const tabs = React.Children.map(children, (tab, index) => {
			warning(tab.type && tab.type.displayName === 'Tab',
				`Tabs only accepts Tab Components as children.
        Found ${tab.type.displayName || tab.type} as child number ${index + 1} of Tabs`);

			warning(!tabValue || tab.props.value !== undefined,
				`Tabs value prop has been passed, but Tab ${index}
        does not have a value prop. Needs value if Tabs is going
        to be a controlled component.`);

			tabContent.push(tab.props.children ?
				React.createElement(tabTemplate || TabTemplate, {
					key: index,
					selected: this._getSelected(tab, index),
				}, tab.props.children) : undefined);

			return React.cloneElement(tab, {
				key: index,
				ref: Constants.TAB_ITEM_REF_NAME_PREFIX + index,
				selected: this._getSelected(tab, index),
				tabIndex: index,
				width: equalTabWidth ? width : 0,
				onTouchTap: this._handleTabTouchTap
			});
		});

		const inkBar = this.state.selectedIndex !== -1 ? (
			<InkBar
				left={left}
				right={right}
				moveBarLeft={this.state.selectedIndex < this.state.previousIndex}
				style={inkBarStyle}
			/>
		) : null;

		const inkBarContainerWidth = tabItemContainerStyle ?
			tabItemContainerStyle.width : '100%';

		const paginatorButtons = this.state.shouldPaginate ? [
			<TabPaginatorButton key={1}
			                    isLeftPaginatorButton={true}
			                    style={tabPaginatorButtonStyle}
			                    iconStyle={tabPaginatorButtonIconStyle}
			                    disabled={this.state.disableLeftPaginatorButton}
			                    onTouchTap={this._handleLeftTabPaginatorTap}
			                    iconClassName={this.props.iconButtonLeft}
			/>,
			<TabPaginatorButton key={2}
			                    isLeftPaginatorButton={false}
			                    style={tabPaginatorButtonStyle}
			                    iconStyle={tabPaginatorButtonIconStyle}
			                    disabled={this.state.disableRightPaginatorButton}
			                    onTouchTap={this._handleRightTabPaginatorTap}
			                    iconClassName={this.props.iconButtonRight}
			/>
		] : null;

		return (
			<div
				{...other}
				style={prepareStyles(Object.assign({},style))}
			>
				<div
					ref={Constants.TAB_WRAPPER_REF_NAME}
					style={prepareStyles(Object.assign(styles.tabWrapper, tabWrapperStyle))}
				>
					{paginatorButtons}
					<div
						ref={Constants.TAB_SCROLL_WRAPPER_REF_NAME}
						style={styles.tabScrollWrapper}
					>
						<div
							ref={Constants.TAB_CONTAINER_REF_NAME}
							style={prepareStyles(Object.assign(styles.tabItemContainer, tabItemContainerStyle))}
						>
							{tabs}
						</div>
						<div style={{width: inkBarContainerWidth}}>
							{inkBar}
						</div>
					</div>
				</div>
				<div
					style={prepareStyles(Object.assign({}, contentContainerStyle))}
					className={contentContainerClassName}
				>
					{tabContent}
				</div>
			</div>
		);
	}
});

export default Tabs;
