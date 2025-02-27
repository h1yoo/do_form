var Integration = Backbone.View.extend({
	initialize : function(options){
		this.options = options || {};
		this.docModel = this.options.docModel;
		this.variables = this.options.variables;
		this.infoData = this.options.infoData;
	},
	render : function(){
		var self = this;
		$(".var1 select").on("change",function(){self.checkText();});
	},
	
	checkText : function () {
		var self = this;
		var var1 = $(".var1 select option:selected").val();
		if(var1=="연차"){
            $('.viewModeHiddenPartA').css('display', 'none');
            $('.viewModeHiddenPartB').css('display', 'none');
		}
		else if(var1=="연차(반차)"){
			$('.viewModeHiddenPartA').css('display', '');
            $('.viewModeHiddenPartB').css('display', 'none');
		}
		else if(var1=="연차(시간제)"){
			$('.viewModeHiddenPartA').css('display', 'none');
            $('.viewModeHiddenPartB').css('display', '');
		}
	},

	renderViewMode : function(){},
	onEditDocument : function(){this.render();},
	beforeSave :function() {},
	afterSave :function() {},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;