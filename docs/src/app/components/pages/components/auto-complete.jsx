const React = require('react');

const { AutoComplete } = require('material-ui');
const ComponentDoc = require('../../component-doc');

const Code = require('auto-complete-code');

class AutoCompletePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let desc = null;

    return (
      <ComponentDoc
        name="Auto Complete"
        code={Code}
        desc={desc}
        componentInfo={[{
          name: 'Auto Complete',
          infoArray: [],
        }]}>

        <br/>

        <div>
          <AutoComplete
            onUpdateRequests={(t) => {console.log(t); return [t, t+t, t+t+t];}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

          <AutoComplete
            fullWidth = {true}
            hintText = "hint"
            onUpdateRequests={(t) => {console.log(t); return [t, t+t, t+t+t];}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

          <AutoComplete
            fullWidth={true}
            searchText= "***************"
            errorText= "error message"
            onUpdateRequests={(t) => {console.log(t); return [t, t+t, t+t+t];}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

          <AutoComplete
            fullWidth={true}
            hintText = "type here"
            onUpdateRequests={(t) => {
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
            dataSource = {["12345", "23456", "34567"]} />

        </div>

      </ComponentDoc>
    );

  }


}

module.exports = AutoCompletePage;
