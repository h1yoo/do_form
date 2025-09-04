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
         
        $(".workTime select").on("change",function(){
            self.calTime();
        });

    },
    
    calTime : function () {
        var startTime = parseInt($('.workTime select').eq(0).val()) || 0;
        var startMin = parseInt($('.workTime select').eq(1).val()) || 0;
        var endTime = parseInt($('.workTime select').eq(2).val()) || 0;
        var endMin = parseInt($('.workTime select').eq(3).val()) || 0;
        
        var startTotal = startTime * 60 + startMin;
        var endTotal = endTime * 60 + endMin;
        var minDiff = endTotal - startTotal;
        
        if(minDiff < 0) {
            minDiff += 24 * 60; // 다음날 근무 처리
        }
        var hour = Math.floor(minDiff / 60);
        var minute = minDiff % 60;

        // 결과 표기
        $(".sum_workTime").text(hour + "시간 " + minute + "분");
    },
    
    renderViewMode : function(){$('.viewModeHiddenPart').hide();},
    onEditDocument : function(){this.render();},
    beforeSave :function() {$('.viewModeHiddenPart').hide();},
    afterSave :function() {$('.viewModeHiddenPart').hide();},
    validate :function() {
        return true;
    },
    getDocVariables : function(){}
});
return Integration;
