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
      self.checkTable();
      $('.HwaOrWoncheck input, .check1 input, .check2 input, .check3 input, .check4 input, .check5 input').on('change', function(){
          // console.log("test");
          self.checkTable();
        })

        },

        checkTable : function(){
            $('.hwaCheck1Table').hide();
            $('.hwaCheck2Table').hide();
            $('.hwaCheck3Table').hide();
            $('.hwaCheck4Table').hide();
            $('.hwaCheck5Table').hide();
            $('.wonCheck1Table').hide();
            $('.wonCheck2Table').hide();
            $('.wonCheck3Table').hide();
            $('.wonCheck4Table').hide();
            $('.wonCheck5Table').hide();

            var HwaOrWoncheck = $('.HwaOrWoncheck input:checked').val();
            $(".HwaOrWoncheckTxt").text(HwaOrWoncheck);

            var check1 = $('.check1 input:checked').val();
            var check2 = $('.check2 input:checked').val();
            var check3 = $('.check3 input:checked').val();
            var check4 = $('.check4 input:checked').val();
            var check5 = $('.check5 input:checked').val();

            if ( HwaOrWoncheck.includes("화산")) {
              
              if(check1 == undefined){
                $('.hwaCheck1Table').hide();
              } else{
                $('.hwaCheck1Table').show();
              }
  
              if(check2 == undefined){
                $('.hwaCheck2Table').hide();
              } else{
                $('.hwaCheck2Table').show();
              }
  
              if(check3 == undefined){
                $('.hwaCheck3Table').hide();
              } else{
                $('.hwaCheck3Table').show();
              }
  
              if(check4 == undefined){
                $('.hwaCheck4Table').hide();
              } else{
                $('.hwaCheck4Table').show();
              }
  
              if(check5 == undefined){
                $('.hwaCheck5Table').hide();
              } else{
                $('.hwaCheck5Table').show();
              }

            }
            else if ( HwaOrWoncheck.includes("원산")) {
              
              if(check1 == undefined){
                $('.wonCheck1Table').hide();
              } else{
                $('.wonCheck1Table').show();
              }
  
              if(check2 == undefined){
                $('.wonCheck2Table').hide();
              } else{
                $('.wonCheck2Table').show();
              }
  
              if(check3 == undefined){
                $('.wonCheck3Table').hide();
              } else{
                $('.wonCheck3Table').show();
              }
  
              if(check4 == undefined){
                $('.wonCheck4Table').hide();
              } else{
                $('.wonCheck4Table').show();
              }
  
              if(check5 == undefined){
                $('.wonCheck5Table').hide();
              } else{
                $('.wonCheck5Table').show();
              }

            }
            
        },

		renderViewMode : function(){
      $('.viewModeHiddenPart').hide();

            $(".sign_name strong").each(function(i, e){

                var name = $(e).html().trim();
                name = name.replaceAll(" ", "<br>");
                name = $.trim(name);
                $(e).html(name);

            });

            $(".sign_name").each(function(i, e){
                $(e).css("white-space", "wrap !important");
                var name = $(e).html();
                name = $.trim(name);
                name = name.replaceAll(" ", "<br>");
                $(e).html(name);

            });

		var h = 0;
		$(".sign_wrap").each(function(i, e){

			var height = $(e).height();

			if(h <= height){
				h = height;
			}

		});
		$(".sign_wrap").each(function(i, e){

			$(e).css("height", h);

		});
		},
		onEditDocument : function(){this.render();},
		beforeSave :function() {
			$('.viewModeHiddenPart').hide();
		},
		afterSave :function() {
			$('.viewModeHiddenPart').hide();
		},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;
