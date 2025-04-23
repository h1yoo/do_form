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
         
		$(".period input").on("change",function(){
            self.calDay();

            // console.log("start:", $('.period input').eq(0).val());
            // console.log("end:", $('.period input').eq(1).val());
        });

    },

    calDay : function () {
        var self = this;
    
        var startDate = moment($('.period input').eq(0).val(), "YYYY-MM-DD");
        var endDate = moment($('.period input').eq(1).val(), "YYYY-MM-DD");
    
        if (!startDate.isValid() || !endDate.isValid() || startDate > endDate) {
            $(".calDay input").val("");
            // $(".dayWarning").html("※ 유효하지 않은 날짜입니다.<br><br>").css("color", "red");
            $(".dayWarning").html("<br>").css("color", "red");
            return;
        }
    
        var dayDiff = endDate.diff(startDate, 'days') + 1;
    
        // 결과 표기
        if (dayDiff > 0) {
            $(".calDay input").val(dayDiff);
        } else {
            $(".calDay input").val("");
        }
    
        // 5일 초과 체크
        if (dayDiff > 5) {
            $(".dayWarning").html("※ 최대 선택일수가 초과되었습니다.<br><br>").css("color", "red");
        } else {
            $(".dayWarning").text("");
        }
    },
    
    renderViewMode : function(){$('.viewModeHiddenPart').hide();},
    onEditDocument : function(){this.render();},
    beforeSave :function() {$('.viewModeHiddenPart').hide();},
    afterSave :function() {$('.viewModeHiddenPart').hide();},
    validate :function() {
        try {
            // 시작일과 종료일 비교 로직 추가
            var startDate = moment($('.period input').eq(0).val(), "YYYY-MM-DD"); // 시작일
            var endDate = moment($('.period input').eq(1).val(), "YYYY-MM-DD");   // 종료일
            var dayDiff = endDate.diff(startDate, 'days') + 1;

            // 날짜 형식이 잘못되었거나 비어 있는 경우 |또는| 시작일이 종료일보다 뒤에 있는 경우 |또는| dayDiff가 5보다 큰 경우
            // 셋 중 하나라도 참이면 Error를 던짐 
            if (startDate.isValid() || endDate.isValid() || startDate.isAfter(endDate) || dayDiff > 5) {
                throw new Error("경조휴가 날짜를 다시 선택해주세요");
            }

            // 날짜가 유효하고 순서도 올바르고 dayDiff도 5 이하이면 true 반환
            return true;
        }   catch (error) {
            // throw new Error(...)로 던져진 예외나, validateTypeCheck() 내부에서 발생한 오류를 잡아냄
            $.goMessage(error.message)

            // return false;를 통해 검증 실패를 알림
            return false;
        }        
    },
    getDocVariables : function(){}
});
return Integration;