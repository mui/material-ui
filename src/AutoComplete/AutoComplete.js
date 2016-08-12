import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import keycode from 'keycode'
import warning from 'warning'
import TextField from 'material-ui/TextField'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import Popover from 'material-ui/Popover/Popover'
import propTypes from 'material-ui/utils/propTypes'
import deprecated from 'material-ui/utils/deprecatedPropType'

function getStyles (props, context, state) {
  const {anchorEl} = state
  const {fullWidth} = props

  const styles = {
    root: {
      display: 'inline-block',
      position: 'relative',
      width: fullWidth ? '100%' : 256
    },
    menu: {
      width: '100%'
    },
    list: {
      display: 'block',
      width: fullWidth ? '100%' : 256
    },
    innerDiv: {
      overflow: 'hidden'
    },
    checkbox: {
      padding: '10px 0'
    }
  }

  if (anchorEl && fullWidth) {
    styles.popover = {
      width: anchorEl.clientWidth
    }
  }

  return styles
}

class AutoComplete extends Component {
  static propTypes = {
    /**
     * Location of the anchor for the auto complete.
     */
    anchorOrigin: propTypes.origin,
    /**
     * If true, the auto complete is animated as it is toggled.
     */
    animated: PropTypes.bool,
    /**
     * Override the default animation component used.
     */
    animation: PropTypes.func,
    /**
     * Array of strings or nodes used to populate the list.
     */
    dataSource: PropTypes.array.isRequired,
    /**
     * Config for objects list dataSource.
     *
     * @typedef {Object} dataSourceConfig
     *
     * @property {string} text `dataSource` element key used to find a string to be matched for search
     * and shown as a `TextField` input value after choosing the result.
     * @property {string} value `dataSource` element key used to find a string to be shown in search results.
     */
    dataSourceConfig: PropTypes.object,
    /**
     * Disables focus ripple when true.
     */
    disableFocusRipple: PropTypes.bool,
    /**
     * Override style prop for error.
     */
    errorStyle: PropTypes.object,
    /**
     * The error content to display.
     */
    errorText: PropTypes.node,
    /**
     * Callback function used to filter the auto complete.
     *
     * @param {string} searchText The text to search for within `dataSource`.
     * @param {string} key `dataSource` element, or `text` property on that element if it's not a string.
     * @returns {boolean} `true` indicates the auto complete list will include `key` when the input is `searchText`.
     */
    filter: PropTypes.func,
    /**
     * The content to use for adding floating label element.
     */
    floatingLabelText: PropTypes.node,
    /**
     * If true, the field receives the property `width: 100%`.
     */
    fullWidth: PropTypes.bool,
    /**
     * The hint content to display.
     */
    hintText: PropTypes.node,
    /**
     * Override style for list.
     */
    listStyle: PropTypes.object,
    /**
     * The max number of search results to be shown.
     * By default it shows all the items which matches filter.
     */
    maxSearchResults: PropTypes.number,
    /**
     * Delay for closing time of the menu.
     */
    menuCloseDelay: PropTypes.number,
    /**
     * Props to be passed to menu.
     */
    menuProps: PropTypes.object,
    /**
     * Override style for menu.
     */
    menuStyle: PropTypes.object,
    /**
     * Allows for multiple selections.
     */
    multiple: PropTypes.bool,
    /** @ignore */
    onBlur: PropTypes.func,
    /** @ignore */
    onFocus: PropTypes.func,
    /** @ignore */
    onKeyDown: PropTypes.func,
    /**
     * Callback function that is fired when a list item is selected, or enter is pressed in the `TextField`.
     *
     * @param {string} chosenRequest Either the `TextField` input value, if enter is pressed in the `TextField`,
     * or the text value of the corresponding list item that was selected.
     * @param {number} index The index in `dataSource` of the list item selected, or `-1` if enter is pressed in the
     * `TextField`.
     */
    onNewRequest: PropTypes.func,
    /**
     * Callback function that is fired when the user updates the `TextField`.
     *
     * @param {string} searchText The auto-complete's `searchText` value.
     * @param {array} dataSource The auto-complete's `dataSource` array.
     */
    onUpdateInput: PropTypes.func,
    /**
     * Auto complete menu is open if true.
     */
    open: PropTypes.bool,
    /**
     * If true, the list item is showed when a focus event triggers.
     */
    openOnFocus: PropTypes.bool,
    /**
     * Text being input to auto complete.
     */
    searchText: PropTypes.string,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Origin for location of target.
     */
    targetOrigin: propTypes.origin,
    /**
     * Override the inline-styles of AutoComplete's TextField element.
     */
    textFieldStyle: PropTypes.object,
    /**
     * If true, will update when focus event triggers.
     */
    triggerUpdateOnFocus: deprecated(PropTypes.bool, 'Instead, use openOnFocus. It will be removed with v0.16.0.'),
    /**
     * when multiple is defined/true, the component return value changes from String to Array.
     */
    values: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.number})),
    /** @ignore (not implemented)
     * Default: true. If multiple is set to true, MenuItems will use checkboxes.
     * If this option is set to false, MenuItems will not display checkboxes,
     * but will disappear/appear depending on their selection status.
     */
    withCheckboxes: PropTypes.bool
  }

  static defaultProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    animated: true,
    dataSourceConfig: {
      text: 'text',
      value: 'value'
    },
    disableFocusRipple: true,
    filter: (searchText, key) => searchText !== '' && key.includes(searchText),
    fullWidth: false,
    multiple: false,
    open: false,
    openOnFocus: true,
    onUpdateInput: () => {},
    onNewRequest: () => {},
    searchText: '',
    menuCloseDelay: 300,
    targetOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    values: [],
    withCheckboxes: true
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  state = {
    anchorEl: null,
    focusTextField: true,
    open: false,
    searchText: undefined
  }

  componentWillMount () {
    this.requestsList = []
    this.setState({
      open: this.props.open,
      searchText: this.props.searchText
    })
    this.timerTouchTapCloseId = null
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({ searchText: nextProps.searchText })
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timerTouchTapCloseId)
  }

  close () {
    this.setState({
      open: false,
      anchorEl: null
    })
  }

  handleRequestClose = () => {
    // Only take into account the Popover clickAway when we are
    // not focusing the TextField.
    this.close()
  }

  setValue (textValue) {
    warning(false, `setValue() is deprecated, use the searchText property.
      It will be removed with v0.16.0.`)

    this.setState({ searchText: textValue })
  }

  getValue () {
    warning(false, 'getValue() is deprecated. It will be removed with v0.16.0.')
    return this.state.searchText
  }

  handleMouseDown = (event) => event.preventDefault() // Keep the TextField focused

  handleItemTouchTap = (event, child) => {
    console.log('calling handleItemTouchTap')
    const dataSource = this.props.dataSource

    const index = parseInt(child.key, 10)
    const chosenRequest = dataSource[index]
    const searchText = typeof chosenRequest === 'string'
      ? chosenRequest
      : chosenRequest[this.props.dataSourceConfig.text]

    this.timerTouchTapCloseId = setTimeout(() => {
      this.timerTouchTapCloseId = null

      if (!this.props.multiple) {
        console.log('not multiselect !')
        this.setState({ searchText })
        this.close()
        this.props.onNewRequest(chosenRequest, index)
      } else {
        console.log('multiselect !')
        if (this.props.values.includes(chosenRequest)) {
          console.log('removing selected option from values !')
          const idx = this.props.values.indexOf(chosenRequest)
          this.props.values.splice(idx, 1)
        } else this.props.values.push(chosenRequest)
        this.setState({ searchText: '' })
        this.props.onNewRequest(this.props.values)
      }
    }, this.props.menuCloseDelay)
  }

  handleEscKeyDown = () => this.close()

  handleKeyDown = (event) => {
    if (this.props.onKeyDown) this.props.onKeyDown(event)

    switch (keycode(event)) {
      case 'enter':
        this.close()
        const searchText = this.state.searchText
        if (searchText !== '') this.props.onNewRequest(searchText, -1)
        break

      case 'esc':
        this.close()
        break

      case 'down':
        event.preventDefault()
        this.setState({
          open: true,
          focusTextField: false,
          anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField)
        })
        break

      default: break
    }
  }

  handleChange = (event) => {
    const searchText = event.target.value

    // Make sure that we have a new searchText.
    // Fix an issue with a Cordova Webview
    if (searchText === this.state.searchText) return

    this.setState({
      searchText,
      open: true,
      anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField)
    }, () => this.props.onUpdateInput(searchText, this.props.dataSource))
  }

  handleBlur = (event) => {
    if (this.state.focusTextField && this.timerTouchTapCloseId === null) this.close()
    if (this.props.onBlur) this.props.onBlur(event)
  }

  handleFocus = (event) => {
    if (!this.state.open && (this.props.triggerUpdateOnFocus || this.props.openOnFocus)) {
      this.setState({
        open: true,
        anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField)
      })
    }
    this.setState({ focusTextField: true })
    if (this.props.onFocus) this.props.onFocus(event)
  }

  blur () {
    this.refs.searchTextField.blur()
  }

  focus () {
    this.refs.searchTextField.focus()
  }

  render () {
    const {
      anchorOrigin,
      animated,
      animation,
      dataSource,
      dataSourceConfig, // eslint-disable-line no-unused-vars
      disableFocusRipple,
      errorStyle,
      floatingLabelText,
      filter,
      fullWidth,
      style,
      hintText,
      maxSearchResults,
      menuCloseDelay, // eslint-disable-line no-unused-vars
      multiple,
      textFieldStyle,
      menuStyle,
      menuProps,
      listStyle,
      targetOrigin,
      triggerUpdateOnFocus, // eslint-disable-line no-unused-vars
      onNewRequest, // eslint-disable-line no-unused-vars
      onUpdateInput, // eslint-disable-line no-unused-vars
      openOnFocus, // eslint-disable-line no-unused-vars
      searchText: searchTextProp, // eslint-disable-line no-unused-vars
      values,
      withCheckboxes,
      ...other
    } = this.props

    const {
      open,
      anchorEl,
      searchText,
      focusTextField
    } = this.state

    const {prepareStyles} = this.context.muiTheme
    const styles = getStyles(this.props, this.context, this.state)

    const requestsList = []

    this.requestsList = requestsList

    dataSource.every((item, index) => {
      const checked = multiple && withCheckboxes && values.includes(item)
      switch (typeof item) {
        case 'string':
          if (filter(searchText, item, item)) {
            requestsList.push({
              text: item,
              value: (
                <MenuItem
                  innerDivStyle={styles.innerDiv}
                  value={item}
                  primaryText={(multiple && withCheckboxes) ? '' : item}
                  disableFocusRipple={disableFocusRipple}
                  key={index}
                >
                  {multiple && withCheckboxes && <Checkbox label={item} checked={checked} style={styles.checkbox} />}
                </MenuItem>)
            })
          }
          break

        case 'object':
          if (item && typeof item[this.props.dataSourceConfig.text] === 'string') {
            const itemText = item[this.props.dataSourceConfig.text]
            if (!this.props.filter(searchText, itemText, item)) break

            const itemValue = item[this.props.dataSourceConfig.value]
            if (itemValue.type && (itemValue.type.muiName === MenuItem.muiName ||
              itemValue.type.muiName === Divider.muiName)) {
              requestsList.push({
                text: itemText,
                value: React.cloneElement(itemValue, {
                  key: index,
                  disableFocusRipple
                })
              })
            } else {
              requestsList.push({
                text: itemText,
                value: (
                  <MenuItem
                    innerDivStyle={styles.innerDiv}
                    primaryText={(multiple && withCheckboxes) ? '' : itemText}
                    disableFocusRipple={disableFocusRipple}
                    key={index}
                  >
                    {multiple && withCheckboxes && <Checkbox label={itemText} checked={checked} style={styles.checkbox} />}
                  </MenuItem>)
              })
            }
          }
          break

        default: break // Do nothing
      }

      return !(maxSearchResults && maxSearchResults > 0 && requestsList.length === maxSearchResults)
    })

    const menu = open && requestsList.length > 0 && (
      <Menu
        {...menuProps}
        ref='menu'
        disableAutoFocus={focusTextField}
        onEscKeyDown={this.handleEscKeyDown}
        initiallyKeyboardFocused
        onItemTouchTap={this.handleItemTouchTap}
        onMouseDown={this.handleMouseDown}
        style={{...styles.menu, ...menuStyle}}
        listStyle={{...styles.list, ...listStyle}}
      >
        {requestsList.map((i) => i.value)}
      </Menu>
    )

    return (
      <div style={prepareStyles({...styles.root, ...style})} >
        <TextField
          {...other}
          ref='searchTextField'
          autoComplete='off'
          value={searchText}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          floatingLabelText={floatingLabelText}
          hintText={hintText}
          fullWidth={fullWidth}
          errorStyle={errorStyle}
          style={textFieldStyle}
        />
        <Popover
          style={styles.popover}
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={anchorEl}
          useLayerForClickAway={false}
          onRequestClose={this.handleRequestClose}
          animated={animated}
          animation={animation}
        >
          {menu}
        </Popover>
      </div>
    )
  }
}

AutoComplete.levenshteinDistance = (searchText, key) => {
  const current = []
  let prev
  let value

  for (let i = 0; i <= key.length; i++) {
    for (let j = 0; j <= searchText.length; j++) {
      if (i && j) {
        if (searchText.charAt(j - 1) === key.charAt(i - 1)) value = prev
        else value = Math.min(current[j], current[j - 1], prev) + 1
      } else value = i + j
      prev = current[j]
      current[j] = value
    }
  }
  return current.pop()
}

AutoComplete.noFilter = () => true

AutoComplete.defaultFilter = AutoComplete.caseSensitiveFilter = (searchText, key) => {
  return searchText !== '' && key.includes(searchText)
}

AutoComplete.caseInsensitiveFilter = (searchText, key) => {
  return key.toLowerCase().includes(searchText.toLowerCase())
}

AutoComplete.levenshteinDistanceFilter = (distanceLessThan) => {
  if (distanceLessThan === undefined) {
    return AutoComplete.levenshteinDistance
  } else if (typeof distanceLessThan !== 'number') {
    throw new Error('Error: AutoComplete.levenshteinDistanceFilter is a filter generator, not a filter!')
  }

  return (s, k) => AutoComplete.levenshteinDistance(s, k) < distanceLessThan
}

AutoComplete.fuzzyFilter = (searchText, key) => {
  const compareString = key.toLowerCase()
  searchText = searchText.toLowerCase()

  let searchTextIndex = 0
  for (let index = 0; index < key.length; index++) {
    if (compareString[index] === searchText[searchTextIndex]) searchTextIndex += 1
  }

  return searchTextIndex === searchText.length
}

AutoComplete.Item = MenuItem
AutoComplete.Divider = Divider

export default AutoComplete
