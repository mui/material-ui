var React = require('react'),
  mui = require('mui');

var InputsPage = React.createClass({


  componentDidMount: function() {
    //console.log(this.refs.firstname.getValue());
  },

  render: function() {
    return (
    	<div>
    		<h2 className="mui-font-style-headline">Inputs</h2>
        <br />
        <mui.Input ref="firstname" onChange={this._onChange} type="text" name="firstname" placeholder="First Name" description="Your first name as it appears on your credit card." />
        <mui.Input ref="lastname" type="text" name="lastname" placeholder="Last Name" description="Your last name as it appears on your credit card.." />
        <mui.Input ref="disabled" type="text" name="disabled" disabled={true} placeholder="Disabled input" />
        <mui.Input ref="disabled_v" type="text" name="disabled_v" disabled={true} defaultValue="with value" placeholder="Disabled input" />
        <mui.Input ref="addressline1" type="text" name="addressline1" placeholder="Address Line 1" description="Your address as it appears on your credit card." />
        <mui.Input ref="addressline2" type="text" name="zipcode" placeholder="Zip Code" description="Your zip code as it appears on your credit card." />
        <mui.Input ref="city" type="text" name="city" placeholder="City" description="Your city as it appears on your credit card." />
        <mui.Input ref="state" type="text" name="state" placeholder="State" description="Your state as it appears on your credit card." />
        <h2 className="mui-font-style-headline">Error Validation</h2>
        <br />
        <mui.Input ref="allegiance" type="text" name="allegiance" placeholder="Allegiance" description="The house of which you served under." />
    	  <br />
        <h2 className="mui-font-style-headline">Floating</h2>
        <br />
        <mui.Input ref="username" type="text" inputStyle="floating" name="Username" description="The username associated with your account." />
        
        {/* TODO: Needs to be completed}
        <h2 className="mui-font-style-headline">Multi-Line</h2>
        <br />
        <mui.Input multiline={true} ref="textmessage" type="text" name="textmessage" placeholder="Text Message" description="Your text message." />
        {*/}
      </div>
    );
  },

  _onChange: function(e, value) {
    //console.log(value);
  }

});

module.exports = InputsPage;
