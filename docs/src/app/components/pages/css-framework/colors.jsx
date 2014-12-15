var React = require('react');

var ColorsPage = React.createClass({

  render: function() {
  	var mainColors = [
  			'Red', 'Pink', 'Purple', 'Deep Purple', 'Indigo', 'Blue', 'Light Blue', 
  			'Cyan', 'Teal', 'Green', 'Light Green', 'Lime', 'Yellow', 'Amber', 'Orange', 'Deep Orange'
  		],
  		neutralColors = ['Brown', 'Blue Grey', 'Grey'],
  		colorGroups = [],
  		neutralGroups = [];

  	mainColors.forEach(function(color) {
  		colorGroups.push(this._getColorGroup(color, true));
  	}, this);

  	neutralColors.forEach(function(color) {
  		neutralGroups.push(this._getColorGroup(color, false));
  	}, this);

    return (
    	<div>
	    	<h2 className="mui-font-style-headline">UI Color Palette</h2>
	    	<p>We've created <a href="http://lesscss.org/">&#123;less&#125;</a> variables for every color used in the <a href="https://www.google.com/design/spec/style/color.html#color-ui-color-palette">UI Color Palette</a>.</p>

	    	<div className="color-palette">
	    		{colorGroups}

					<div className="neutral">
						{neutralGroups}
					</div>
	    	</div>
	    </div>
    );
  },

  _getColorGroup: function(color, showAltPalette) {
  	var mainPalette = [50,100,200,300,400,500,600,700,800,900],
  		altPalette = ['A100','A200','A400','A700'],
  		cssColor = color.toLowerCase().replace(' ', '-'),
  		colors = [];

  	mainPalette.forEach(function(mainValue) {
  		colors.push(this._getColorBlock(cssColor, mainValue));
  	}, this);

  	if (showAltPalette) {
	  	altPalette.forEach(function(altValue) {
	  		colors.push(this._getColorBlock(cssColor, altValue));
	  	}, this);
	  }

  	return (
			<ul className="color-group">
				{this._getColorBlock(cssColor, 500, color)}
				{colors}
			</ul>
  	);
  },

  _getColorBlock: function(colorName, colorValue, colorTitle) {
  	var colorClass = colorName + '-' + colorValue,
  		classes = 'color ' + colorClass,
  		colorText = '@' + colorClass,
  		blockTitle;

  	if (colorTitle) blockTitle = <span className="name">{colorTitle}</span>;

  	return (
  		<li className={classes}>{blockTitle}{colorText}</li>
  	);
  }

});

module.exports = ColorsPage;
