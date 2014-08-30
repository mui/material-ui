/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  PaperButton = mui.PaperButton;

var ButtonPage = React.createClass({

  render: function() {
    return (
    	<div>
    		<h2>Flat Buttons</h2>
    		<PaperButton type={PaperButton.Types.RAISED} label="Add Contacts" onClick={this._onPaperButtonClick}></PaperButton>
        <br />
        <PaperButton type={PaperButton.Types.FLAT} label="Add Contacts" onClick={this._onPaperButtonClick}></PaperButton>
        <br />
        <PaperButton type={PaperButton.Types.FAB} size={PaperButton.Sizes.MINI} onClick={this._onPaperButtonClick}></PaperButton>
        <br />
        <PaperButton type={PaperButton.Types.FAB} onClick={this._onPaperButtonClick}></PaperButton>
    	</div>
    );
  },

  _onPaperButtonClick: function(e) {
  	console.log(e);
  }

});

module.exports = ButtonPage;