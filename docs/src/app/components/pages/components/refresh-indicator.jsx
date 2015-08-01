let React = require('react');
let { RefreshIndicator } = require('material-ui');
let ComponentDoc = require('../../component-doc');


let RefreshIndicatorPage = React.createClass({

  render() {

    let code =
      '// Ready status \n' +
      '<RefreshIndicator percentage={30} size={40} left={10} top={5} status="ready" />\n' +
      '<RefreshIndicator percentage={60} size={40} left={10} top={5} status="ready" />\n' +
      '<RefreshIndicator percentage={80} size={40} left={10} top={5} status="ready" />\n' +
      '<RefreshIndicator percentage={100} size={40} left={10} top={5} status="ready" />\n' +
      '// Loading status \n' +
      '<RefreshIndicator size={40} left={80} top={5} status="loading" />\n';

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'size',
            type: 'number',
            header: 'default: 40',
            desc: 'Size in pixel.'
          },
          {
            name: 'percentage',
            type: 'number',
            header: 'default: 0',
            desc: 'The confirmation progress to fetch data. Max value is 100'
          },
          {
            name: 'left',
            type: 'number',
            header: 'required',
            desc: 'The left position of the indicator. Be care, the component is absolute positioned'
          },
          {
            name: 'top',
            type: 'number',
            header: 'required',
            desc: 'The top position of the indicator. Be care, the component is absolute positioned'
          },
          {
            name: 'statu',
            type: 'one of: ready, loading, hide',
            header: 'default: hide',
            desc: 'ready: means at the confirmation phase\nloading: means at data loading phase\nhide: means all done and hide the indicator'
          }
        ]
      },
    ];


    return (
      <ComponentDoc
        name="RefreshIndicator"
        code={code}
        componentInfo={componentInfo}>
        <div style={{ position: "relative" }}>
          <p>
            Ready status
          </p>
          <RefreshIndicator percentage={30} size={40} left={10} top={30} status="ready" />
          <RefreshIndicator percentage={60} size={40} left={65} top={30} status="ready" />
          <RefreshIndicator percentage={80} size={40} left={120} top={30} status="ready" />
          <RefreshIndicator percentage={100} size={40} left={175} top={30} status="ready" />
          <p style={{marginTop: 80, marginBottom: 80}}>
            Loading status
          </p>
          <RefreshIndicator size={40} left={10} top={130} status="loading" />
        </div>
      </ComponentDoc>
    );
  }

});

module.exports = RefreshIndicatorPage;
