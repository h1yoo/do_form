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

    self.autoSubject();

    // $(".subject input").on("change",function(){
    //   var subj = $(".subject input").val();
    //   console.log(subj);
    // });
	},
  
  autoSubject: function() {
    // var draftDate = $('#draftDate').attr('data-value');  // 기안일 >> 안가져와짐
    var today = new Date();   // 기안일 = 오늘날짜
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let day = today.getDay();  // 요일

    var days = ['일', '월', '화', '수', '목', '금', '토'];

    $('#subject').val(year + "-" + month + "-" + date + "(" + days[day] + ")");
  },

	renderViewMode : function(){$('.viewModeHiddenPart').hide();},
	onEditDocument : function(){this.render();},
	beforeSave :function() {$('.viewModeHiddenPart').hide();},
	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;