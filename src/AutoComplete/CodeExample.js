import React from 'react'
import { Paper, Chip, MenuItem } from 'material-ui'
import AutoComplete from './common/MultiSelectAutoComplete'

const styles = {
  paper: { padding: '0 30px 30px' },
  section: { display: 'flex' },
  autocomplete: { marginRight: 30 },
  chipsContainer: {
    border: '1px solid LightGrey',
    borderRadius: 5,
    padding: 12,
    display: 'flex',
    flexWrap: 'wrap'
  },
  legend: {
    color: 'LightGrey',
    margin: '30px 0 5px',
    fontWeight: 'normal'
  },
  chip: { margin: 3 }
}

const arrayStrings = [ 'Orange', 'Watermelon', 'Apple', 'Pear', 'Lemon', 'Strawberry', 'Kiwi', 'Apricot', 'Pineapple', 'Litchi' ]

const arrayObjects = [
  {text: 'Crimson', value: '#DC143C'},
  {text: 'CornFlowerBlue', value: '#6495ED'},
  {text: 'LightSteelBlue ', value: '#B0C4DE'},
  {text: 'Aquamarine ', value: '#7FFFD4'},
  {text: 'Khaki', value: '#F0E68C'},
  {text: 'LightSeaGreen ', value: '#20B2AA'},
  {text: 'DarkOrchid', value: '#9932CC'},
  {text: 'Coral', value: '#FF7F50'}
]

const arrayNodes = [
  {text: 'Crimson', value: (<MenuItem primaryText='Crimson' style={{color: '#DC143C'}} />)},
  {text: 'CornFlowerBlue', value: (<MenuItem primaryText='CornFlowerBlue' style={{color: '#6495ED'}} />)},
  {text: 'LightSteelBlue ', value: (<MenuItem primaryText='LightSteelBlue' style={{color: '#B0C4DE'}} />)},
  {text: 'Aquamarine ', value: (<MenuItem primaryText='Aquamarine' style={{color: '#7FFFD4'}} />)},
  {text: 'Khaki', value: (<MenuItem primaryText='Khaki' style={{color: '#F0E68C'}} />)},
  {text: 'LightSeaGreen ', value: (<MenuItem primaryText='LightSeaGreen' style={{color: '#20B2AA'}} />)},
  {text: 'DarkOrchid', value: (<MenuItem primaryText='DarkOrchid' style={{color: '#9932CC'}} />)},
  {text: 'Coral', value: (<MenuItem primaryText='Coral' style={{color: '#FF7F50'}} />)}
]

export default class CodeExample extends React.Component {
  componentWillMount () {
    this.setState({
      preSelectedOptionsMultiCompleteWithCheckboxes: [
        {text: 'CornFlowerBlue', value: '#6495ED', ref: 'MultiCompleteWithCheckboxes'},
        {text: 'Coral', value: '#FF7F50', ref: 'MultiCompleteWithCheckboxes'}
      ],
      preSelectedOptionsMultiCompleteWithoutCheckboxes: [],
      selectedOptions: []
    })
  }

  componentDidMount () {
    this.setState({ selectedOptions: [...this.state.preSelectedOptionsMultiCompleteWithCheckboxes, ...this.state.preSelectedOptionsMultiCompleteWithoutCheckboxes] })
  }

  _handleSingleValue = (result, index) => {
    let selectedOptions = [...this.state.selectedOptions]
    const ref = 'SingleComplete'
    const idx = selectedOptions.findIndex(obj => obj.text === result)
    if (idx !== -1) selectedOptions.splice(idx, 1)
    else selectedOptions.push({text: result, ref})
    this.setState({ selectedOptions })
  }

  _handleMultiSelect = (results, index) => {
    const selectedObject = arrayObjects[index] // don't forget to change with component's props.dataSource
    let selectedOptions = [...this.state.selectedOptions]
    const ref = 'MultiCompleteWithCheckboxes'
    const idx = selectedOptions.findIndex(obj => obj.text === selectedObject.text)
    if (idx !== -1) selectedOptions.splice(idx, 1)
    else selectedOptions.push({...selectedObject, ref})
    this.setState({ selectedOptions })
  }

  _handleMultiSelectWithoutCheckboxes = (results, index) => {
  }

  _handleRemoveSelection = (value, index) => (event) => {
    let selectedOptions = [...this.state.selectedOptions]
    selectedOptions.splice(index, 1)
    this.setState({
      selectedOptions,
      [`preSelectedOptions${value.ref}`]: selectedOptions.filter(obj => obj.ref === value.ref)
    })
  }

  render () {
    return (
      <Paper style={styles.paper}>
        <section style={styles.section}>
          <AutoComplete
            ref='SingleComplete'
            style={styles.autocomplete}
            hintText='Type some letters'
            floatingLabelText='Single Value AutoComplete'
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={arrayStrings}
            onNewRequest={this._handleSingleValue}
          />

          <AutoComplete
            ref='MultiCompleteWithCheckboxes'
            style={styles.autocomplete}
            multiple
            hintText='Type some letters'
            floatingLabelText='MultiSelect AutoComplete (with checkboxes)'
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={arrayObjects}
            selectedOptions={this.state.preSelectedOptionsMultiCompleteWithCheckboxes}
            onNewRequest={this._handleMultiSelect}
          />

          <AutoComplete
            ref='MultiCompleteWithoutCheckboxes'
            multiple
            withCheckboxes={false}
            hintText='Type some letters'
            floatingLabelText='MultiSelect AutoComplete (without checkboxes)'
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={arrayNodes}
            selectedOptions={this.state.preSelectedOptionsMultiCompleteWithoutCheckboxes}
            onNewRequest={this._handleMultiSelectWithoutCheckboxes}
          />
        </section>

        <h4 style={styles.legend}>Selected options</h4>
        <div style={styles.chipsContainer}>
          {this.state.selectedOptions.map((v, i) => (
            <Chip
              key={i}
              style={styles.chip}
              onRequestDelete={this._handleRemoveSelection(v, i)}
            >
              <span style={{color: v.value}}>{v.text}</span>
            </Chip>
          ))}
        </div>
      </Paper>
    )
  }
}
