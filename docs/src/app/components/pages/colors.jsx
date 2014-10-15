/**
 * @jsx React.DOM
 */

var React = require('react');

var ColorsPage = React.createClass({

  render: function() {
  
    return (
    	<div>
	    	<h2 className="mui-font-style-headline">UI Color Palette</h2>
	    	<p>We've created <a href="http://lesscss.org/">&#123;less&#125;</a> variables for every color used in the <a href="https://www.google.com/design/spec/style/color.html#color-ui-color-palette">UI Color Palette</a>.</p>

	    	<div className="color-palette">
		    	<ul className="color-group">
						<li className="color red-500"><span className="name">Red</span>@red-500</li>
						<li className="color red-50">@red-50</li>
						<li className="color red-100">@red-100</li>
						<li className="color red-200">@red-200</li>
						<li className="color red-300">@red-300</li>
						<li className="color red-400">@red-400</li>
						<li className="color red-500">@red-500</li>
						<li className="color red-600">@red-600</li>
						<li className="color red-700">@red-700</li>
						<li className="color red-800">@red-800</li>
						<li className="color red-900">@red-900</li>
						<li className="color red-A100">@red-A100</li>
						<li className="color red-A200">@red-A200</li>
						<li className="color red-A400">@red-A400</li>
						<li className="color red-A700">@red-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color pink-500"><span className="name">Pink</span>@pink-500</li>
						<li className="color pink-50">@pink-50</li>
						<li className="color pink-100">@pink-100</li>
						<li className="color pink-200">@pink-200</li>
						<li className="color pink-300">@pink-300</li>
						<li className="color pink-400">@pink-400</li>
						<li className="color pink-500">@pink-500</li>
						<li className="color pink-600">@pink-600</li>
						<li className="color pink-700">@pink-700</li>
						<li className="color pink-800">@pink-800</li>
						<li className="color pink-900">@pink-900</li>
						<li className="color pink-A100">@pink-A100</li>
						<li className="color pink-A200">@pink-A200</li>
						<li className="color pink-A400">@pink-A400</li>
						<li className="color pink-A700">@pink-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color purple-500"><span className="name">Purple</span>@purple-500</li>
						<li className="color purple-50">@purple-50</li>
						<li className="color purple-100">@purple-100</li>
						<li className="color purple-200">@purple-200</li>
						<li className="color purple-300">@purple-300</li>
						<li className="color purple-400">@purple-400</li>
						<li className="color purple-500">@purple-500</li>
						<li className="color purple-600">@purple-600</li>
						<li className="color purple-700">@purple-700</li>
						<li className="color purple-800">@purple-800</li>
						<li className="color purple-900">@purple-900</li>
						<li className="color purple-A100">@purple-A100</li>
						<li className="color purple-A200">@purple-A200</li>
						<li className="color purple-A400">@purple-A400</li>
						<li className="color purple-A700">@purple-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color deep-purple-500"><span className="name">Deep Purple</span>@deep-purple-500</li>
						<li className="color deep-purple-50">@deep-purple-50</li>
						<li className="color deep-purple-100">@deep-purple-100</li>
						<li className="color deep-purple-200">@deep-purple-200</li>
						<li className="color deep-purple-300">@deep-purple-300</li>
						<li className="color deep-purple-400">@deep-purple-400</li>
						<li className="color deep-purple-500">@deep-purple-500</li>
						<li className="color deep-purple-600">@deep-purple-600</li>
						<li className="color deep-purple-700">@deep-purple-700</li>
						<li className="color deep-purple-800">@deep-purple-800</li>
						<li className="color deep-purple-900">@deep-purple-900</li>
						<li className="color deep-purple-A100">@deep-purple-A100</li>
						<li className="color deep-purple-A200">@deep-purple-A200</li>
						<li className="color deep-purple-A400">@deep-purple-A400</li>
						<li className="color deep-purple-A700">@deep-purple-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color indigo-500"><span className="name">Indigo</span>@indigo-500</li>
						<li className="color indigo-50">@indigo-50</li>
						<li className="color indigo-100">@indigo-100</li>
						<li className="color indigo-200">@indigo-200</li>
						<li className="color indigo-300">@indigo-300</li>
						<li className="color indigo-400">@indigo-400</li>
						<li className="color indigo-500">@indigo-500</li>
						<li className="color indigo-600">@indigo-600</li>
						<li className="color indigo-700">@indigo-700</li>
						<li className="color indigo-800">@indigo-800</li>
						<li className="color indigo-900">@indigo-900</li>
						<li className="color indigo-A100">@indigo-A100</li>
						<li className="color indigo-A200">@indigo-A200</li>
						<li className="color indigo-A400">@indigo-A400</li>
						<li className="color indigo-A700">@indigo-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color blue-500"><span className="name">Blue</span>@blue-500</li>
						<li className="color blue-50">@blue-50</li>
						<li className="color blue-100">@blue-100</li>
						<li className="color blue-200">@blue-200</li>
						<li className="color blue-300">@blue-300</li>
						<li className="color blue-400">@blue-400</li>
						<li className="color blue-500">@blue-500</li>
						<li className="color blue-600">@blue-600</li>
						<li className="color blue-700">@blue-700</li>
						<li className="color blue-800">@blue-800</li>
						<li className="color blue-900">@blue-900</li>
						<li className="color blue-A100">@blue-A100</li>
						<li className="color blue-A200">@blue-A200</li>
						<li className="color blue-A400">@blue-A400</li>
						<li className="color blue-A700">@blue-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color light-blue-500"><span className="name">Light Blue</span>@light-blue-500</li>
						<li className="color light-blue-50">@light-blue-50</li>
						<li className="color light-blue-100">@light-blue-100</li>
						<li className="color light-blue-200">@light-blue-200</li>
						<li className="color light-blue-300">@light-blue-300</li>
						<li className="color light-blue-400">@light-blue-400</li>
						<li className="color light-blue-500">@light-blue-500</li>
						<li className="color light-blue-600">@light-blue-600</li>
						<li className="color light-blue-700">@light-blue-700</li>
						<li className="color light-blue-800">@light-blue-800</li>
						<li className="color light-blue-900">@light-blue-900</li>
						<li className="color light-blue-A100">@light-blue-A100</li>
						<li className="color light-blue-A200">@light-blue-A200</li>
						<li className="color light-blue-A400">@light-blue-A400</li>
						<li className="color light-blue-A700">@light-blue-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color cyan-500"><span className="name">Cyan</span>@cyan-500</li>
						<li className="color cyan-50">@cyan-50</li>
						<li className="color cyan-100">@cyan-100</li>
						<li className="color cyan-200">@cyan-200</li>
						<li className="color cyan-300">@cyan-300</li>
						<li className="color cyan-400">@cyan-400</li>
						<li className="color cyan-500">@cyan-500</li>
						<li className="color cyan-600">@cyan-600</li>
						<li className="color cyan-700">@cyan-700</li>
						<li className="color cyan-800">@cyan-800</li>
						<li className="color cyan-900">@cyan-900</li>
						<li className="color cyan-A100">@cyan-A100</li>
						<li className="color cyan-A200">@cyan-A200</li>
						<li className="color cyan-A400">@cyan-A400</li>
						<li className="color cyan-A700">@cyan-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color teal-500"><span className="name">Teal</span>@teal-500</li>
						<li className="color teal-50">@teal-50</li>
						<li className="color teal-100">@teal-100</li>
						<li className="color teal-200">@teal-200</li>
						<li className="color teal-300">@teal-300</li>
						<li className="color teal-400">@teal-400</li>
						<li className="color teal-500">@teal-500</li>
						<li className="color teal-600">@teal-600</li>
						<li className="color teal-700">@teal-700</li>
						<li className="color teal-800">@teal-800</li>
						<li className="color teal-900">@teal-900</li>
						<li className="color teal-A100">@teal-A100</li>
						<li className="color teal-A200">@teal-A200</li>
						<li className="color teal-A400">@teal-A400</li>
						<li className="color teal-A700">@teal-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color green-500"><span className="name">Green</span>@green-500</li>
						<li className="color green-50">@green-50</li>
						<li className="color green-100">@green-100</li>
						<li className="color green-200">@green-200</li>
						<li className="color green-300">@green-300</li>
						<li className="color green-400">@green-400</li>
						<li className="color green-500">@green-500</li>
						<li className="color green-600">@green-600</li>
						<li className="color green-700">@green-700</li>
						<li className="color green-800">@green-800</li>
						<li className="color green-900">@green-900</li>
						<li className="color green-A100">@green-A100</li>
						<li className="color green-A200">@green-A200</li>
						<li className="color green-A400">@green-A400</li>
						<li className="color green-A700">@green-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color light-green-500"><span className="name">Light Green</span>@light-green-500</li>
						<li className="color light-green-50">@light-green-50</li>
						<li className="color light-green-100">@light-green-100</li>
						<li className="color light-green-200">@light-green-200</li>
						<li className="color light-green-300">@light-green-300</li>
						<li className="color light-green-400">@light-green-400</li>
						<li className="color light-green-500">@light-green-500</li>
						<li className="color light-green-600">@light-green-600</li>
						<li className="color light-green-700">@light-green-700</li>
						<li className="color light-green-800">@light-green-800</li>
						<li className="color light-green-900">@light-green-900</li>
						<li className="color light-green-A100">@light-green-A100</li>
						<li className="color light-green-A200">@light-green-A200</li>
						<li className="color light-green-A400">@light-green-A400</li>
						<li className="color light-green-A700">@light-green-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color lime-500"><span className="name">Lime</span>@lime-500</li>
						<li className="color lime-50">@lime-50</li>
						<li className="color lime-100">@lime-100</li>
						<li className="color lime-200">@lime-200</li>
						<li className="color lime-300">@lime-300</li>
						<li className="color lime-400">@lime-400</li>
						<li className="color lime-500">@lime-500</li>
						<li className="color lime-600">@lime-600</li>
						<li className="color lime-700">@lime-700</li>
						<li className="color lime-800">@lime-800</li>
						<li className="color lime-900">@lime-900</li>
						<li className="color lime-A100">@lime-A100</li>
						<li className="color lime-A200">@lime-A200</li>
						<li className="color lime-A400">@lime-A400</li>
						<li className="color lime-A700">@lime-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color yellow-500"><span className="name">Yellow</span>@yellow-500</li>
						<li className="color yellow-50">@yellow-50</li>
						<li className="color yellow-100">@yellow-100</li>
						<li className="color yellow-200">@yellow-200</li>
						<li className="color yellow-300">@yellow-300</li>
						<li className="color yellow-400">@yellow-400</li>
						<li className="color yellow-500">@yellow-500</li>
						<li className="color yellow-600">@yellow-600</li>
						<li className="color yellow-700">@yellow-700</li>
						<li className="color yellow-800">@yellow-800</li>
						<li className="color yellow-900">@yellow-900</li>
						<li className="color yellow-A100">@yellow-A100</li>
						<li className="color yellow-A200">@yellow-A200</li>
						<li className="color yellow-A400">@yellow-A400</li>
						<li className="color yellow-A700">@yellow-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color amber-500"><span className="name">Amber</span>@amber-500</li>
						<li className="color amber-50">@amber-50</li>
						<li className="color amber-100">@amber-100</li>
						<li className="color amber-200">@amber-200</li>
						<li className="color amber-300">@amber-300</li>
						<li className="color amber-400">@amber-400</li>
						<li className="color amber-500">@amber-500</li>
						<li className="color amber-600">@amber-600</li>
						<li className="color amber-700">@amber-700</li>
						<li className="color amber-800">@amber-800</li>
						<li className="color amber-900">@amber-900</li>
						<li className="color amber-A100">@amber-A100</li>
						<li className="color amber-A200">@amber-A200</li>
						<li className="color amber-A400">@amber-A400</li>
						<li className="color amber-A700">@amber-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color orange-500"><span className="name">Orange</span>@orange-500</li>
						<li className="color orange-50">@orange-50</li>
						<li className="color orange-100">@orange-100</li>
						<li className="color orange-200">@orange-200</li>
						<li className="color orange-300">@orange-300</li>
						<li className="color orange-400">@orange-400</li>
						<li className="color orange-500">@orange-500</li>
						<li className="color orange-600">@orange-600</li>
						<li className="color orange-700">@orange-700</li>
						<li className="color orange-800">@orange-800</li>
						<li className="color orange-900">@orange-900</li>
						<li className="color orange-A100">@orange-A100</li>
						<li className="color orange-A200">@orange-A200</li>
						<li className="color orange-A400">@orange-A400</li>
						<li className="color orange-A700">@orange-A700</li>
					</ul>

					<ul className="color-group">
						<li className="color deep-orange-500"><span className="name">Deep Orange</span>@deep-orange-500</li>
						<li className="color deep-orange-50">@deep-orange-50</li>
						<li className="color deep-orange-100">@deep-orange-100</li>
						<li className="color deep-orange-200">@deep-orange-200</li>
						<li className="color deep-orange-300">@deep-orange-300</li>
						<li className="color deep-orange-400">@deep-orange-400</li>
						<li className="color deep-orange-500">@deep-orange-500</li>
						<li className="color deep-orange-600">@deep-orange-600</li>
						<li className="color deep-orange-700">@deep-orange-700</li>
						<li className="color deep-orange-800">@deep-orange-800</li>
						<li className="color deep-orange-900">@deep-orange-900</li>
						<li className="color deep-orange-A100">@deep-orange-A100</li>
						<li className="color deep-orange-A200">@deep-orange-A200</li>
						<li className="color deep-orange-A400">@deep-orange-A400</li>
						<li className="color deep-orange-A700">@deep-orange-A700</li>
					</ul>

					<div className="neutral">
						<ul className="color-group">
							<li className="color brown-500"><span className="name">Brown</span>@brown-500</li>
							<li className="color brown-50">@brown-50</li>
							<li className="color brown-100">@brown-100</li>
							<li className="color brown-200">@brown-200</li>
							<li className="color brown-300">@brown-300</li>
							<li className="color brown-400">@brown-400</li>
							<li className="color brown-500">@brown-500</li>
							<li className="color brown-600">@brown-600</li>
							<li className="color brown-700">@brown-700</li>
							<li className="color brown-800">@brown-800</li>
							<li className="color brown-900">@brown-900</li>
						</ul>

						<ul className="color-group">
							<li className="color blue-grey-500"><span className="name">Blue Grey</span>@blue-grey-500</li>
							<li className="color blue-grey-50">@blue-grey-50</li>
							<li className="color blue-grey-100">@blue-grey-100</li>
							<li className="color blue-grey-200">@blue-grey-200</li>
							<li className="color blue-grey-300">@blue-grey-300</li>
							<li className="color blue-grey-400">@blue-grey-400</li>
							<li className="color blue-grey-500">@blue-grey-500</li>
							<li className="color blue-grey-600">@blue-grey-600</li>
							<li className="color blue-grey-700">@blue-grey-700</li>
							<li className="color blue-grey-800">@blue-grey-800</li>
							<li className="color blue-grey-900">@blue-grey-900</li>
						</ul>

						<ul className="color-group">
							<li className="color grey-500"><span className="name">Grey</span>@grey-500</li>
							<li className="color grey-50">@grey-50</li>
							<li className="color grey-100">@grey-100</li>
							<li className="color grey-200">@grey-200</li>
							<li className="color grey-300">@grey-300</li>
							<li className="color grey-400">@grey-400</li>
							<li className="color grey-500">@grey-500</li>
							<li className="color grey-600">@grey-600</li>
							<li className="color grey-700">@grey-700</li>
							<li className="color grey-800">@grey-800</li>
							<li className="color grey-900">@grey-900</li>
						</ul>
					</div>
	    	</div>
	    </div>
    );
  }

});

module.exports = ColorsPage;
