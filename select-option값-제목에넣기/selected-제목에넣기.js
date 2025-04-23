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

  
    checkInputSub : function () {
        var selected = $(".selectedSub select").val(); // 선택된 옵션값
        var inputVal = $('#tmp_title input').val(); // 기존 입력된 값

        // select option 값 + "_"
        var prefixes = ["--선택--_", "SAP-FCM_", "HR_", "사업소관리_", "SSO/계정_", "N/W 인프라_", "그룹웨어_", "기타_"];

        // 해당 접두어 중 일치하는 게 있다면 제거
        for (var i = 0; i < prefixes.length; i++) {
            if (inputVal.startsWith(prefixes[i])) {
                inputVal = inputVal.substring(prefixes[i].length);
                break;
            }
        }

        // 선택된 값이 있다면 새로 이어 붙이기
        if (selected && selected !== "--선택--") {
            $("#tmp_title input").val(selected + "_" + inputVal).prop("readonly", true);
        }

        // 선택된 값이 없다면 input에 옵션값 지우고 입력한 값만 남기기
        else if (selected === "--선택--") {
            $("#tmp_title input").val(inputVal).prop("readonly", false);
        } else {
            $("#tmp_title input").val(inputVal).prop("readonly", false);
        }
    },
  
    renderViewMode : function(){$('.viewModeHiddenPart').hide();},
    onEditDocument : function(){this.render();},
    beforeSave :function() {
        $('.viewModeHiddenPart').hide();

        // var title = $('#tmp_title input').val();
        // $("#subject").val(title);	
    },
    afterSave :function() {$('.viewModeHiddenPart').hide();},
    validate :function() {return true;},getDocVariables : function(){}
});
return Integration;