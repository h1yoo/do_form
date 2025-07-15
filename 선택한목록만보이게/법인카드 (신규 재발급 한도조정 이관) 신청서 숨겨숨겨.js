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
      $('.check1 input, .check2 input, .check3 input, .check4 input').on('change', function(){
          console.log("test")
          self.checkTable();
        })

        },

        checkTable : function(){
           $('.check1Table').hide();
            $('.check2Table').hide();
             $('.check3Table').hide();
              $('.check4Table').hide();
            var check1 = $('.check1 input:checked').val();
            var check2 = $('.check2 input:checked').val();
            var check3 = $('.check3 input:checked').val();
            var check4 = $('.check4 input:checked').val();

            if(check1 == undefined){
              $('.check1Table').hide();
            } else{
              $('.check1Table').show();
            }

                        if(check2 == undefined){
              $('.check2Table').hide();
            } else{
              $('.check2Table').show();
            }

                        if(check3 == undefined){
              $('.check3Table').hide();
            } else{
              $('.check3Table').show();
            }

            if(check4 == undefined){
              $('.check4Table').hide();
            } else{
              $('.check4Table').show();
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