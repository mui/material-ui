/**
 * @jsx React.DOM
 */

var React = require('react'),
  Input = require('../../../../dist/js/input.jsx');

var InputsPage = React.createClass({

  render: function() {
    return (
    	<div>
    		<h2>Inputs</h2>
        <br />
        <Input type="text" name="firstname" placeholder="First Name" description="Your first name as it appears on your credit card." />
        <Input type="text" name="lastname" placeholder="Last Name" description="Your last name as it appears on your credit card.." />
        <Input type="text" name="addressline1" placeholder="Address Line 1" description="Your address as it appears on your credit card." />
        <Input type="text" name="zipcode" placeholder="Zip Code" description="Your zip code as it appears on your credit card." />
        <Input type="text" name="city" placeholder="City" description="Your city as it appears on your credit card." />
        <Input type="text" name="state" placeholder="State" description="Your state as it appears on your credit card." />
        <h2>Error Validation</h2>
        <br />
        <Input type="text" name="allegiance" placeholder="Allegiance" description="The house of which you served under." error="Please enter an allegiance within Westeros." />
    	  <br />
        <h2>Floating</h2>
        <br />
        <Input type="text" style="floating" name="Username" description="The username associated with your account." />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }

});

module.exports = InputsPage;