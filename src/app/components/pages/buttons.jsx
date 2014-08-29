/**
 * @jsx React.DOM
 */

var React = require('react'),
	PaperButton = require('../../../../dist/js/paper-button.jsx');

var ButtonPage = React.createClass({

  render: function() {
    return (
    	<div>
    		<h2>Flat Buttons</h2>
    		<PaperButton type="raised" label="Add Contacts" onClick={this._onPaperButtonClick}></PaperButton>
        <br />
        <PaperButton type="flat" label="Add Contacts" onClick={this._onPaperButtonClick}></PaperButton>
        <br />
        <PaperButton type="fab" size="mini" onClick={this._onPaperButtonClick}></PaperButton>
        <br />
        <PaperButton type="fab" onClick={this._onPaperButtonClick}></PaperButton>
    	</div>
    );
  },

  _onPaperButtonClick: function(e) {
  	console.log(e);
  }

});

module.exports = ButtonPage;