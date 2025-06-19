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

        $(".selectedSub select, .occDate input").on("change", function () {
            self.checkInputSub();
        });
    },	

    checkInputSub: function () {
      var title = "";
      var selected = $(".selectedSub select").val();
      var subRel = $(".subRel input").val();
      var subName = $(".subName input").val();
      var occDate = $(".occDate input").val();
  
      if (subRel || subName || occDate) {
          title = selected + "(" + subRel + " " + subName + ")" + occDate;
          $("#subject input").val(title);
          $("#tmp_title input").val(title);
      }
    },


    renderViewMode : function(){$('.viewModeHiddenPart').hide();},
    onEditDocument : function(){this.render();},
    beforeSave :function() {
        $('.viewModeHiddenPart').hide();

        var selected = $(".selectedSub select").val();
        var subRel = $(".subRel input").val();
        var subName = $(".subName input").val();
        var occDate = $(".occDate input").val();

        title = selected + "(" + subRel + " " + subName + ")" + occDate;

        $("#subject").val(title); // 최종 제목 세팅
    },
    afterSave :function() {$('.viewModeHiddenPart').hide();},
    validate :function() {return true;},getDocVariables : function(){}
});
return Integration;
