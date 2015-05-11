var AutoPrefix = require('./auto-prefix');

var createdAnimations = {};

function createSheet(){

	var styleElement = document.createElement("style");
	document.head.appendChild(styleElement);
	var sheet = styleElement.sheet;

	return sheet;
}

function addRule(sheet, selector){
	var size = (sheet.cssRules || sheet.rules).length;
	if("insertRule" in sheet) {
		sheet.insertRule(selector + " { }", size);
	}
	else if("appendRule" in sheet){
		sheet.appendRule(selector + " { }");
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, " {} ", size);
	}
}
 
function setStyles(rule, obj){
	for(var prop in obj){
		rule.style[prop] = obj[prop];
	}
}

module.exports = {

	 create: function (name, frames){

	 	if(name in createdAnimations){
	 		return name;
	 	}
	 	
	 	createdAnimations[name] = true;

		var sheet = createSheet();
		 
		var keyframeTags = [ "@keyframes ", "@-webkit-keyframes "];

		for(var i = 0; i < keyframeTags.length; i++){
			try{
				addRule(sheet, keyframeTags[i] + name);
				break;
			}catch(e){}
		}

		var rule = (sheet.cssRules || sheet.rules)[0];
		var frameRule = null;

		for(var frame in frames){
			var size = rule.cssRules.length;
			addRule(rule, frame);
			frameRule = rule.cssRules[size];
			setStyles(frameRule, frames[frame]);
		}

		return rule.name || name;

	}


};