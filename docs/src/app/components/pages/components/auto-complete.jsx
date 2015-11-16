const React = require('react');

const { AutoComplete } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const CodeExample = require('../../code-example/code-example');

const Code = require('auto-complete-code');

class AutoCompletePage extends React.Component {

  constructor(props) {
    super(props);
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
            onUpdateInput={(t) => {console.log(t); return [t, t+t, t+t+t];}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

          <AutoComplete
            fullWidth = {true}
            hintText = "hint"
            onUpdateInput={(t) => {console.log(t); return [t, t+t, t+t+t];}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

          <AutoComplete
            fullWidth={true}
            searchText= "***************"
            errorText= "error message"
            onUpdateInput={(t) => {console.log(t); return [t, t+t, t+t+t];}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

          <AutoComplete
            fullWidth={true}
            hintText = "type here"
            onUpdateInput={(t) => {
              console.log(t);
              return [
                 (<AutoComplete.Item primaryText={t} secondaryText="&#9786;" />),
                 (<AutoComplete.Divider/>),
                 (<AutoComplete.Item primaryText={t.toUpperCase()} secondaryText="&#9885;" />),
                 ];
            }}
            onNewRequest={(t, index) => {console.log('request:'+index);}} />


          <AutoComplete
            floatingLabelText = "floating Label"
            dataSource = {["12345", "23456", "34567"]} />

          <AutoComplete
            fullWidth={true}
            floatingLabelText = "auto"
            auto = {true}
            animated = {false}
            dataSource = {["12345", "23456", "34567"]} />

        </CodeExample>

      </ComponentDoc>
    );

  }


}

module.exports = AutoCompletePage;
