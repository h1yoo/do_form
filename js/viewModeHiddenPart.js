var $ = require("jquery");
var app = require("app");
var Backbone = require("backbone");
var _ = require('underscore');


var Integration = Backbone.View.extend({
	initialize : function(options){
		this.options = options || {};
		this.docModel = this.options.docModel;
		this.variables = this.options.variables;
		this.infoData = this.options.infoData;
	},
	
	render : function() {
		var self = this;
		$('.viewModeHiddenPart').show();
	},

	renderViewMode : function(){$('.viewModeHiddenPart').hide();},
	onEditDocument : function(){this.render();},
	beforeSave :function() {$('.viewModeHiddenPart').hide();},
	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;