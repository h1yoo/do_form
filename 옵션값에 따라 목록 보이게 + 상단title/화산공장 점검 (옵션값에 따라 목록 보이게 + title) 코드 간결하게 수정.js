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
    $('.viewModeHiddenPart').show();  // 렌더 시 viewModeHiddenPart 클래스 표시

    self.checkTable();  // 렌더 시 화산공장 및 원산공장 표시항목 모두 숨겨지도록 checkTable 함수 실행
    $('.HwaOrWoncheck input, .check1 input, .check2 input, .check3 input, .check4 input, .check5 input').on('change', function(){
        // 화산공장 / 원산공장 라디오버튼 클릭 시 혹은, 1, 2, 3, 4, 5 체크박스 선택 시
        // checkTable 함수 실행
        self.checkTable();
    });

  },

  checkTable : function(){
    // 모든 테이블 숨기기
    for (let i = 1; i <= 5; i++) {
        $(`.hwaCheck${i}Table, .wonCheck${i}Table`).hide();
    }

    // 선택된 옵션 텍스트
    var HwaOrWoncheck = $('.HwaOrWoncheck input:checked').val();
    $(".HwaOrWoncheckTxt").text(HwaOrWoncheck);

    // 공통 체크박스 값 수집
    let checks = [];
    for (let i = 1; i <= 5; i++) {
        checks.push($(`.check${i} input:checked`).val());
    }

    // 어떤 그룹인지에 따라 테이블 보여주기
    let prefix = HwaOrWoncheck.includes("화산") ? "hwaCheck" :
                 HwaOrWoncheck.includes("원산") ? "wonCheck" : null;

    if (prefix) {
      checks.forEach((val, idx) => {
          if (val !== undefined) {
              $(`.${prefix}${idx + 1}Table`).show();
          }
      });
    }
  },

  renderViewMode : function(){
    $('.viewModeHiddenPart').hide();  // 미리보기 시 viewModeHiddenPart 클래스 숨기기
  },
  onEditDocument : function(){this.render();},
  beforeSave :function() {
    $('.viewModeHiddenPart').hide();  // 결재요청 전 viewModeHiddenPart 클래스 숨기기
  },
  afterSave :function() {
    $('.viewModeHiddenPart').hide();  // 결재요청 후 viewModeHiddenPart 클래스 숨기기
  },
  validate :function() {return true;},
  getDocVariables : function(){}
});
return Integration;
