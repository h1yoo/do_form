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

        $(".emergency select, .selectedSub select, .request select").on("change", function () {
            self.checkInputSub();
        });
    },	
    // checkInputSub: function () {
    //     var title = "";
    //     var title1 = "";
    //     var title2 = "";
    //     var title3 = "";
    //     var selected = $(".selectedSub select").val();  // 선택된 대상시스템 드롭박스 옵션값
    //     var request = $(".request select").val();  // 선택된 요청구분 드롭박스 옵션값
    //     var emergency = $(".emergency select").val();  // 선택된 긴급여부 드롭박스 옵션값
    //     // var selected = $(".selectedSub select").val();
    //     // var prefixes = $(".selectedSub select option").map(function () {   // 드롭박스 옵션값 모두 가져오기
    //     //     return $(this).text();
    //     // }).get();
    //     var inputVal = $("#tmp_title input").val();
    //     var prefixes1 = $(".selectedSub select option").map(function () {   // 대상시스템 드롭박스 옵션값 모두 가져오기
    //         return $(this).text();
    //     }).get(); 
    //     var prefixes2 = $(".request select option").map(function () {   // 요청구분 드롭박스 옵션값 모두 가져오기
    //         return $(this).text();
    //     }).get();
    //     var prefixes3 = $(".emergency select option").map(function () {   // 긴급여부 드롭박스 옵션값 모두 가져오기
    //         return $(this).text();
    //     }).get();

    //     // 모든 prefix 후보들 중 실제로 앞에 붙어 있는 prefix만 제거
    //     // prefixes.forEach(function (prefix) {
    //     //     if (inputVal.startsWith(prefix + "_")) {
    //     //         inputVal = inputVal.slice(prefix.length + 1); // prefix 제거
    //     //     }
    //     // });
    //     prefixes1.forEach(function (prefix) {
    //         if (inputVal.startsWith(prefix + "/")) {
    //             inputVal = inputVal.slice(prefix.length + 1); // prefix 제거
    //         }
    //     });
    //     prefixes2.forEach(function (prefix) {
    //         if (inputVal.startsWith(prefix + "/")) {
    //             inputVal = inputVal.slice(prefix.length + 1); // prefix 제거
    //         }
    //     });
    //     prefixes3.forEach(function (prefix) {
    //         if (inputVal.startsWith(prefix + "_")) {
    //             inputVal = inputVal.slice(prefix.length + 1); // prefix 제거
    //         }
    //     });
    
    //     // prefix 텍스트 표시
    //     // if (selected && selected !== "--선택--") {
    //     //     $("#prefixText").text(selected + "_");
    //     // }
    //     if (selected && selected !== "--선택--") {
    //         title1 = selected + "/";
    //         title = title1 + title2 + title3;
    //         $("#prefixText").text(title);
    //     }
    //     if (request && request !== "--선택--") {
    //         title2 = request + "/";
    //         title = title1 + title2 + title3;
    //         $("#prefixText").text(title);
    //     }
    //     if (emergency && emergency !== "--선택--") {
    //         title3 = emergency + "_";
    //         title = title1 + title2 + title3;
    //         $("#prefixText").text(title);
    //     }
    //     if (selected == "--선택--") {
    //         title1 = "";
    //         title = title1 + title2 + title3;
    //         $("#prefixText").text(title);
    //     }
    //     if (request == "--선택--") {
    //         title2 = "";
    //         title = title1 + title2 + title3;
    //         $("#prefixText").text(title);
    //     }

    //     $("#tmp_title input").val(inputVal);
    // },
    // 위 코드를 아래 코드로 정리 (중복 제거)
    checkInputSub: function () {
        const inputEl = $("#tmp_title input");
        let inputVal = inputEl.val();
    
        // 접두어 제거 함수
        function removePrefixes(val, selector, delimiter) {
            const prefixes = $(`${selector} option`).map(function () {
                return $(this).text();
            }).get();
    
            prefixes.forEach(function (prefix) {
                if (val.startsWith(prefix + delimiter)) {
                    val = val.slice(prefix.length + delimiter.length);
                }
            });
    
            return val;
        }
    
        // 접두사 제거
        inputVal = removePrefixes(inputVal, ".selectedSub select", "/");
        inputVal = removePrefixes(inputVal, ".request select", "/");
        inputVal = removePrefixes(inputVal, ".emergency select", "_");
    
        // 접두사 생성
        const selected = $(".selectedSub select").val();
        const request = $(".request select").val();
        const emergency = $(".emergency select").val();
    
        const titleParts = [];
    
        if (selected && selected !== "--선택--") {
            titleParts.push(selected + "/");
        }
        if (request && request !== "--선택--") {
            titleParts.push(request + "/");
        }
        if (emergency && emergency !== "--선택--") {
            titleParts.push(emergency + "_");
        }
    
        const title = titleParts.join("");
        $("#prefixText").text(title);
        inputEl.val(inputVal);
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