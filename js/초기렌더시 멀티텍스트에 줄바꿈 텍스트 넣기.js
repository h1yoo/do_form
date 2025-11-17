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

    var recomReason = document.querySelector('.recomReason textarea');
    recomReason.value = '피추천자가 가진 업무적 강점을 포함하여 추천 사유를 구체적으로 서술해주시기 바랍니다. (무성의 추천은 반려됩니다)\n(ex. 리더십/팔로우십, 커뮤니케이션 능력, 업무 퍼포먼스 등)';
	},

	renderViewMode : function(){$('.viewModeHiddenPart').hide();},
	onEditDocument : function(){this.render();},
	beforeSave :function() {$('.viewModeHiddenPart').hide();},
	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;