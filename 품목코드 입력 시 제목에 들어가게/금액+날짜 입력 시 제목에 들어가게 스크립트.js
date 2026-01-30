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

        $(".codeInput input, .codeInput2 input").on("change", function () {
            self.checkInputSub();
        });
    },	
 
    checkInputSub: function () {
        var title="";
        var codeInput = $(".codeInput input").val();
        var codeInput2 = $(".codeInput2 input").val();
        title = "선물환_" + codeInput + "_" + codeInput2;

        $("#subject").val(title);
    },


    renderViewMode : function(){$('.viewModeHiddenPart').hide();},
    onEditDocument : function(){this.render();},
    beforeSave :function() {
        $('.viewModeHiddenPart').hide();
    },
    afterSave :function() {$('.viewModeHiddenPart').hide();},
    validate :function() {return true;},getDocVariables : function(){}
});
return Integration;