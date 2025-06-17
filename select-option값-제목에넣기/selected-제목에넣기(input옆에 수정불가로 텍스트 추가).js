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

        $(".selectedSub select").on("change", function () {
            self.checkInputSub();
        });
    },	

    checkInputSub: function () {
        var selected = $(".selectedSub select").val();
        var inputVal = $("#tmp_title input").val();
        var prefixes = $(".selectedSub select option").map(function () {
            return $(this).text();
        }).get();

        // 모든 prefix 후보들 중 실제로 앞에 붙어 있는 prefix만 제거
        prefixes.forEach(function (prefix) {
            if (inputVal.startsWith(prefix + "_")) {
                inputVal = inputVal.slice(prefix.length + 1); // prefix 제거
            }
        });
    
        // prefix 텍스트 표시
        if (selected && selected !== "--선택--") {
            $("#prefixText").text(selected + "_");
        } else {
            $("#prefixText").text("");
        }

        $("#tmp_title input").val(inputVal);
    },


    renderViewMode : function(){$('.viewModeHiddenPart').hide();},
    onEditDocument : function(){this.render();},
    beforeSave :function() {
        $('.viewModeHiddenPart').hide();

        var prefix = $("#prefixText").text(); // UI에 표시된 prefix
        var titleInput = $("#tmp_title input").val(); // 사용자가 입력한 제목
        var fullTitle = prefix + titleInput;

        $("#prefixText").text(""); // prefix 초기화

        $("#subject").val(fullTitle); // 최종 제목 세팅
    },
    afterSave :function() {$('.viewModeHiddenPart').hide();},
    validate :function() {return true;},getDocVariables : function(){}
});
return Integration;
