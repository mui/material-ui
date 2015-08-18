let React = require('react');

let { SearchField } = require('material-ui');
let ComponentDoc = require('../../component-doc');

let Code = require('search-field-code');

class SearchFields extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let desc = null;

    return (
      <ComponentDoc
        name="Search Field"
        code={Code}
        desc={desc}
        componentInfo={[{
          name: 'Search Field',
          infoArray: [],
        }]}>

        <br/>

        <div>
          <SearchField
            onUpdateRequests={(t) => {console.log(t); return [t,t+t,t+t+t];}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

          <SearchField
            fullWidth={true}
            onUpdateRequests={(t) => {console.log(t); return [t,t+t,t+t+t];}}
            onNewRequest={(t) => {console.log('request:'+t);}} />

        </div>

      </ComponentDoc>
    );

  }


}

module.exports = SearchFields;
