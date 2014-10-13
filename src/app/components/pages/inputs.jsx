/**
 * @jsx React.DOM
 */

var React = require('react'),
  Input = require('../../../../dist/js/input.jsx');

var InputsPage = React.createClass({

  render: function() {
    return (
    	<div>
    		<h2 className="mui-font-style-headline">Inputs</h2>
        <br />
        <Input ref="firstname" type="text" name="firstname" placeholder="First Name" description="Your first name as it appears on your credit card." />
        <Input ref="lastname" type="text" name="lastname" placeholder="Last Name" description="Your last name as it appears on your credit card.." />
        <Input ref="addressline1" type="text" name="addressline1" placeholder="Address Line 1" description="Your address as it appears on your credit card." />
        <Input ref="addressline2" type="text" name="zipcode" placeholder="Zip Code" description="Your zip code as it appears on your credit card." />
        <Input ref="city" type="text" name="city" placeholder="City" description="Your city as it appears on your credit card." />
        <Input ref="state" type="text" name="state" placeholder="State" description="Your state as it appears on your credit card." />
        <h2 className="mui-font-style-headline">Error Validation</h2>
        <br />
        <Input ref="allegiance" type="text" name="allegiance" placeholder="Allegiance" description="The house of which you served under." />
    	  <br />
        <h2 className="mui-font-style-headline">Floating</h2>
        <br />
        <Input ref="username" type="text" style="floating" name="Username" description="The username associated with your account." />
        <h2 className="mui-font-style-headline">Multi-Line</h2>
        <br />
        <Input multiline={true} ref="textmessage" type="text" name="textmessage" placeholder="Text Message" description="Your text message." />
        <br />
        <br />
        <br />
      </div>
    );
  },

});

module.exports = InputsPage;