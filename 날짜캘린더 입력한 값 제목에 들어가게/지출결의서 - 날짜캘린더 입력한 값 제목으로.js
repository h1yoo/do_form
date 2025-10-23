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

    $("#editorForm_8").on("change",function(){
      self.autoSubject();
    });
	},
  
  autoSubject: function() {
    var deadline = $('#editorForm_8').val();  // 결제기한 값 가져오기
    var today = new Date(deadline);   // 기안일 = 오늘날짜
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    // let day = today.getDay();  // 요일

    // var days = ['일', '월', '화', '수', '목', '금', '토'];

    // $('#subject').val(year + "-" + month + "-" + date + "(" + days[day] + ")");
    $('#subject').val(year + "-" + month + "-" + date);
  },

	renderViewMode : function(){$('.viewModeHiddenPart').hide();},
	onEditDocument : function(){this.render();},
	beforeSave :function() {$('.viewModeHiddenPart').hide();},
	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;