import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import keycode from 'keycode'
import propTypes from '../utils/propTypes'
import Checkbox from '../Checkbox'
import Divider from '../Divider'
import Menu from '../Menu'
import MenuItem from '../MenuItem'
import Popover from '../Popover/Popover'
import TextField from '../TextField'

function getStyles (props, context, state) {
  const {anchorEl} = state
  const {fullWidth} = props

  const styles = {
    root: {
      display: 'inline-block',
      position: 'relative',
      width: fullWidth ? '100%' : 256
    },
    menu: { width: '100%' },
    list: {
      display: 'block',
      width: fullWidth ? '100%' : 256
    },
    innerDiv: { overflow: 'hidden' },
    checkbox: { padding: '10px 0' }
  }

  if (anchorEl && fullWidth) styles.popover = { width: anchorEl.clientWidth }

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
     * Provides preselected options.
     * /!\ Must have same format as dataSource
     */
    preSelectedOptions: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.node
      })
    ])),
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
    menuCloseDelay: 300,
    multiple: false,
    onUpdateInput: () => {},
    onNewRequest: () => {},
    open: false,
    openOnFocus: true,
    preSelectedOptions: [],
    searchText: '',
    targetOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    withCheckboxes: true
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  componentWillMount () {
    this.setState({
      anchorEl: null,
      focusTextField: false,
      open: this.props.open,
      searchText: this.props.searchText,
      selectedOptions: this.props.preSelectedOptions
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({ searchText: nextProps.searchText })
    }
  }

  close () {
    this.setState({
      open: false,
      focusTextField: false,
      anchorEl: null
    })
  }

  /**
   * When clicking on the popover, the TextField triggers an onBlur event.
   * the logic below checks to guess between an offscreen/clickaway (which should close)
   * and clicking on the popover (which should NOT close)
   */
  handleBlur = (event) => {
    const menuHTMLnode = ReactDOM.findDOMNode(this.refs.menu)
    const focusedElt = event.relatedTarget

    this.props.multiple && menuHTMLnode.contains(focusedElt)
      ? this.refs.searchTextField.focus()
      : this.close()

    if (this.props.onBlur) this.props.onBlur(event)
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

  handleFocus = (event) => {
    this.setState({
      open: true,
      focusTextField: true,
      anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField)
    })
    if (this.props.onFocus) this.props.onFocus(event)
  }

  handleEscKeyDown = () => this.close()

  handleItemTouchTap = (event, child) => {
    let { dataSource, dataSourceConfig, multiple, onNewRequest } = this.props

    const index = parseInt(child.key, 10)
    const chosenRequest = dataSource[index]
    const searchText = typeof chosenRequest === 'string'
      ? chosenRequest
      : chosenRequest[dataSourceConfig.text]

    if (!multiple) {
      this.setState({ searchText })
      this.close()
      onNewRequest(chosenRequest, index)
    } else {
      let selectedOptions = [...this.state.selectedOptions]
      const isSelected = typeof chosenRequest === 'string'
        ? selectedOptions.includes(chosenRequest)
        : selectedOptions.some(obj => obj[dataSourceConfig.text] === searchText)
      if (isSelected) {
        const idx = typeof chosenRequest === 'string'
          ? selectedOptions.indexOf(chosenRequest)
          : selectedOptions.findIndex(obj => obj[dataSourceConfig.text] === searchText)
        selectedOptions.splice(idx, 1)
      } else selectedOptions.push(chosenRequest)
      this.setState({ searchText: '', selectedOptions })
      onNewRequest(selectedOptions, index)
    }
  }

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
          anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField)
        })
        break

      default: break
    }
  }

  handleMouseDown = (event) => event.preventDefault() // Keep the TextField focused

  /**
   * Necessary when focusin the searchTextField, the popover's blur event triggers
   * so handleFocus() sets state.focusTextField to prevent popover from closing
   */
  handleRequestClose = () => {
    if (!this.state.focusTextField) this.close()
  }

  render () {
    const {
      anchorOrigin,
      animated,
      animation,
      dataSource,
      dataSourceConfig,
      disableFocusRipple,
      errorStyle,
      floatingLabelText,
      filter,
      fullWidth,
      hintText,
      listStyle,
      maxSearchResults,
      menuCloseDelay, // eslint-disable-line no-unused-vars
      menuStyle,
      menuProps,
      multiple,
      onNewRequest, // eslint-disable-line no-unused-vars
      onUpdateInput, // eslint-disable-line no-unused-vars
      openOnFocus, // eslint-disable-line no-unused-vars
      preSelectedOptions, // eslint-disable-line no-unused-vars
      searchText: searchTextProp, // eslint-disable-line no-unused-vars
      style,
      targetOrigin,
      textFieldStyle,
      withCheckboxes,
      ...other
    } = this.props

    const {
      anchorEl,
      open,
      searchText,
      selectedOptions
    } = this.state

    const {prepareStyles} = this.context.muiTheme
    const styles = getStyles(this.props, this.context, this.state)

    const requestsList = []

    dataSource.every((item, index) => {
      switch (typeof item) {
        case 'string':
          const preSelected = multiple && !withCheckboxes && selectedOptions.includes(item)
          if (filter(searchText, item, item) && !preSelected) {
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
                  {multiple && withCheckboxes &&
                    <Checkbox
                      label={item}
                      checked={selectedOptions.includes(item)}
                      style={styles.checkbox}
                    />}
                </MenuItem>)
            })
          }
          break

        case 'object':
          if (item && typeof item[dataSourceConfig.text] === 'string') {
            const itemText = item[dataSourceConfig.text]
            const preSelected = multiple && !withCheckboxes &&
              selectedOptions.some(obj => obj[dataSourceConfig.text] === itemText)
            if (filter(searchText, itemText, item) && !preSelected) {
              const itemValue = item[dataSourceConfig.value]
              if (itemValue.type && (itemValue.type.muiName === MenuItem.muiName ||
                itemValue.type.muiName === Divider.muiName)) {
                const clone = React.cloneElement(itemValue, {
                  key: index,
                  disableFocusRipple
                })
                requestsList.push({
                  text: itemText,
                  value: (multiple && withCheckboxes)
                    ? <Checkbox
                      label={clone}
                      checked={selectedOptions.some(obj => obj[dataSourceConfig.text] === itemText)}
                      style={styles.checkbox}
                    />
                    : clone
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
                      {multiple && withCheckboxes &&
                        <Checkbox
                          label={itemText}
                          checked={selectedOptions.some(obj => obj[dataSourceConfig.text] === itemText)}
                          style={styles.checkbox}
                        />}
                    </MenuItem>)
                })
              }
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
        disableAutoFocus
        onEscKeyDown={this.handleEscKeyDown}
        onItemTouchTap={this.handleItemTouchTap}
        onMouseDown={this.handleMouseDown}
        style={{...styles.menu, ...menuStyle}}
        listStyle={{...styles.list, ...listStyle}}
      >
        {requestsList.map(i => i.value)}
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
  let prev // TODO: should be initialized with what ?
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
