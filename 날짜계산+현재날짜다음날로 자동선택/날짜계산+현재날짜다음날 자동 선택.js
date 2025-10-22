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
            self.checkDate();
            self.calDay();
        });

    },

    // 현재날짜 다음날 자동 선택 함수
    checkDate : function () {
        var startDateStr = $('.period input').eq(0).val();
        var endDateStr = $('.period input').eq(1).val();
        
        var startDate = new Date(startDateStr);
        var endDate = new Date(endDateStr);

        // 날짜 유효성 검사
        if (isNaN(endDate) || endDate <= startDate) {   // endDate 값이 선택되지 않았다면
            let current = new Date(startDate);
            current.setDate(current.getDate() + 1); // 다음 날로 이동

            // // YYYY-MM-DD 형식으로 변환
            // let yyyy = current.getFullYear();
            // let mm = String(current.getMonth() + 1).padStart(2, '0');
            // let dd = String(current.getDate()).padStart(2, '0');
            // let formatted = `${yyyy}-${mm}-${dd}`;
            // $('.period input').eq(1).val(formatted);

            $(".period input").datepicker({
                dateFormat: "yyyy-mm-dd",   // input에 들어가는 포맷
                defaultDate: new Date()    // 오늘 날짜 자동 선택
            });
            $('.period input').eq(1).datepicker("setDate", current);
        }
    },
    
    // 날짜 계산 함수
    calDay : function () {
        var startDate = moment($('.period input').eq(0).val(), "YYYY-MM-DD");
        var endDate = moment($('.period input').eq(1).val(), "YYYY-MM-DD");
    
        var dayDiff = endDate.diff(startDate, 'days') + 1;
    
        // 결과 표기
        $(".calDay input").val(dayDiff);
        $(".dayWarning").html("<br>"); // 초기화
        // if (startDate.isValid() && endDate.isValid() && startDate <= endDate && dayDiff > 0) {
        // // if (dayDiff > 0) {
        //     $(".calDay input").val(dayDiff);
        //     $(".dayWarning").html("<br>");
        // } 
        
        // 유효하지 않은 날짜 표기
        // else {
        if (!startDate.isValid() || !endDate.isValid() || startDate > endDate || startDate.isAfter(endDate) || dayDiff <= 0) {
          $(".calDay input").val("");
          // $(".dayWarning").html("※ 유효하지 않은 날짜입니다.<br><br>").css("color", "red");	// css를 { color: "red" } 이렇게 작성할 수도 있고 "color", "red" 이렇게 작성할 수도 있음
          $(".dayWarning").html("※ 유효하지 않은 날짜입니다.<br><br>").css({ color: "red" });
        //   return;   // return 필요 !! >> 비동기처리 관련 문제 해결을 위해
        }

        // 5일 초과 체크
        if (dayDiff > 5 || $(".calDay input").val() > 5) {
            $(".dayWarning").html("※ 최대 선택일수가 초과되었습니다.<br><br>").css({ color: "red" });
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
            if (!startDate.isValid() || !endDate.isValid() || startDate.isAfter(endDate) || dayDiff > 5) {
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
