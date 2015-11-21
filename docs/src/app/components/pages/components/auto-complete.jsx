const React = require('react');

const { AutoComplete } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const CodeExample = require('../../code-example/code-example');

const Code = require('auto-complete-code');

class AutoCompletePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input1: [],
      input2: [],
      input3: [],
    }
  }

  render() {

    return (
      <ComponentDoc
        name="Auto Complete"
        componentInfo={[{
          name: 'Auto Complete',
          infoArray: [],
        }]}>

        <br/>

        <CodeExample code={Code}>
          <AutoComplete
            dataSource= {this.state.input1}
            onUpdateInput={(t) => {console.log(t); this.setState({input1: [t, t+t, t+t+t]});}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

          <AutoComplete
            fullWidth = {true}
            hintText = "hint"
            dataSource= {this.state.input2}
            onUpdateInput={(t) => {console.log(t); this.setState({input2: [t, t+t, t+t+t]});}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

          <AutoComplete
            fullWidth={true}
            searchText= "***************"
            errorText= "error message"
            dataSource= {this.state.input3}
            onUpdateInput={(t) => {console.log(t); this.setState({input3: [t, t+t, t+t+t]});}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

          <AutoComplete
            fullWidth={true}
            hintText = "type here"
            onUpdateInput={(t) => {
              console.log(t);
            }}
            showAllItems = {true}
            dataSource={{
                 a:(<AutoComplete.Item primaryText={'a'} secondaryText="&#9786;" />),
                 divider:(<AutoComplete.Divider/>),
                 b:(<AutoComplete.Item primaryText={'b'} secondaryText="&#9885;" />),
            }}
            onNewRequest={(t, index) => {console.log('request:'+index);}} />


          <AutoComplete
            floatingLabelText = "floating Label"
            dataSource = {["12345", "23456", "34567"]} />

          <AutoComplete
            fullWidth={true}
            floatingLabelText = "showAllItems"
            showAllItems = {true}
            animated = {false}
            dataSource = {["12345", "23456", "34567"]} />

        </CodeExample>

      </ComponentDoc>
    );

  }


}

module.exports = AutoCompletePage;
