var $ = require("jquery");
var app = require("app");
var Backbone = require("backbone");
var _ = require('underscore');


/* ------------------------------------------ PlusMinusRow.js Start ------------------------------------------ */

var PlusMinusRow = function (options) {
  // 사용자가 정의하지 않은 일부 옵션 변수의 기본값
  var defaults = {
    maxRow: 0,											// 행 추가 최대 개수 (0: 무제한)
    copyRowNoSize: 1									// 행 순번(No) 증가량
  };

  // 사용자가 정의할 수 있는 옵션 변수
  var options = {
    tableId: options.tableId,							// 행 추가/삭제 수행 테이블 id (*필수)
  
    plusBtnId: options.plusBtnId,						// 행 추가 버튼 id (*필수)
    minusBtnId: options.minusBtnId,						// 행 삭제 버튼 id (*필수)

    copyRowClass: options.copyRowClass,					// 복사할 행(tr)의 class (*필수)

    copyRowNoClass: options.copyRowNoClass,				// 순번(No) 열(td)의 class
    copyRowNoSize: options.copyRowNoSize,				// 순번(No) 증가량 :int

  rowNo: options.rowNo,								// 입력한 행 수만큼 추가
    maxRow: options.maxRow,								// 행 추가 최대 개수 :int
    maxNo: options.maxNo,								// 행 추가 최대 순번(No) :int

    rowspanClass: options.rowspanClass,					// 처리할 rowspan 속성이 있는 열(td)의 class

    plusRowCallback: options.plusRowCallback,			// 행 추가 콜백 함수명
    minusRowCallback: options.minusRowCallback			// 행 삭제 콜백 함수명
  };

  var settings = $.extend({}, defaults, options);


  // 행 추가 수행 횟수 계산 (순번 계산시 필요) - 문서 수정하는 경우 고려
  var plusCnt;

  if ($("#" + settings.tableId + " .copiedRow")[0] === undefined) {
    plusCnt = 1;
  }
  else {
    // 다중행일 경우 고려
    if (!$($("#" + settings.tableId + " ." + settings.copyRowClass + " td")[0]).attr("rowspan")) {
      plusCnt = $("#" + settings.tableId + " .copiedRow").length + 1;
    }
    else {
      var rowCnt = parseInt($($("#" + settings.tableId + " ." + settings.copyRowClass + " td")[0]).attr("rowspan"));
      plusCnt = ($("#" + settings.tableId + " .copiedRow").length + rowCnt) / rowCnt;
    }
  }

  //입력한 행 수만큼 추가
  $("." + settings.rowNo).on('change', function () {
  $("#" + settings.tableId + " .copiedRow").remove();
  plusCnt=1;

  var row_no = parseInt($("." + settings.rowNo+ " input").val());

  for(var i=0; i<row_no-1; i++){
    plusRow();
    plusCnt++;
  }
  });
  

  // 행 추가 수행
  $("#" + settings.plusBtnId).on('click', function () {
    // 행 추가 최대수까지 or 무제한으로
    if ($("#" + settings.tableId + " ." + settings.copyRowClass).length + $("#" + settings.tableId + " .copiedRow").length < settings.maxRow || settings.maxRow == 0) {
      // 행 추가 최대 순번까지
      if (settings.maxNo !== undefined) {
        if (parseInt($("#" + settings.tableId + " ." + settings.copyRowNoClass + ":last").text()) < settings.maxNo) {
          plusRow();
          plusCnt++;
        }
      }
      else {
        plusRow();
        plusCnt++;
      }
    }
  });

  // 행 삭제 수행
  $("#" + settings.minusBtnId).on('click', minusRow);



  function plusRow() {
    var $tr = $("#" + settings.tableId + " ." + settings.copyRowClass).clone(true); // 추가할 행 복사 (이벤트도)

    // ① rowspan 처리 (optional)
    if ($("#" + settings.tableId + " ." + settings.rowspanClass)[0] !== undefined) {
      $.each($("#" + settings.tableId + " ." + settings.rowspanClass), function (k, v) {
        $(v).attr("rowspan", parseInt($(v).attr("rowspan")) + $tr.length);
      });

      $.each($tr.find("td[rowspan]"), function (k, v) {
        if ($(v).hasClass(settings.rowspanClass)) {
          $(v).remove();		// rowspan을 가진 행(td) 삭제
        }
      });
    }

    // ② 순번(No) 처리 - 순번 클래스가 한 행에 두 개 이상 있을 경우 고려 (optional)
    //    ex) 1  ...     2  ...             ex) 1  ...     1  ...
    //        3  ...     4  ...     or          2  ...     2  ...
    if ($("#" + settings.tableId + " ." + settings.copyRowNoClass)[0] !== undefined) {
      var copyRowNoCnt = $tr.find("." + settings.copyRowNoClass).length; // 한 행에 존재하는 순번 클래스의 수

      for (var i = 0; i < copyRowNoCnt; i++) {
        if (!$tr.find("." + settings.copyRowNoClass).attr('rowspan')) {
          var newNo = parseInt($($tr.find("." + settings.copyRowNoClass)[i]).text()) + settings.copyRowNoSize * plusCnt * $tr.length;
        }
        else {
          var newNo = parseInt($($tr.find("." + settings.copyRowNoClass)[i]).text()) + settings.copyRowNoSize * plusCnt;
        }

        $($tr.find("." + settings.copyRowNoClass)[i]).text(newNo);
      }
    }

    // ③ 복사행 class 재설정 및 컴포넌트 초기화
    var i = 1;		// 다중행 복사일 때 컴포넌트 name/id 처리시 필요. copiedRow의 수
    $.each($tr, function (k, v) {
      $(v).removeClass(settings.copyRowClass);
      $(v).addClass('copiedRow');

      initComponent($(v), i++);
    });

    // ④ 처리 완료된 복사행을 테이블에 추가 (마지막 행으로)
    if ($("#" + settings.tableId + " .copiedRow")[0] === undefined) {
      $("#" + settings.tableId + " ." + settings.copyRowClass + ":last").after($tr);
    }
    else {
      $("#" + settings.tableId + " .copiedRow:last").after($tr);
    }

    // ⑤ 행 추가 콜백 함수 실행
    if (typeof settings.plusRowCallback == 'function') {
      settings.plusRowCallback(this);
    }
  }



  function initComponent($tr, i) {
    var editorFormCnt = 1;		// 각 tr에 존재하는 컴포넌트 name/id 처리시 필요
    var radioName = "";			// radio 컴포넌트 name/id 처리시 필요
    var checkName = "";			// radio 컴포넌트 name/id 처리시 필요

    $.each($tr.find("td input"), function (k, v) {
      var componentType = $(v).attr("data-dsl");
      var componentId = $(v).attr("id");

      if (!(componentType.search("check") > -1) && !(componentType.search("radio") > -1)) {
        var newId =  settings.tableId+"_"+($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt;

        $(v).attr({name: newId, id: newId});
        $(v).val("");

        // currency 초기화
        if (componentType.search("currency") > -1) {
          var parseKey;
          componentType.replace(/{{([^}}]*)}}/g, function (m, key) {
            parseKey = key;
          });
          var precision = parseKey.split('_');

          $(v).inputmask({
            'alias': 'decimal',
            'groupSeparator': ',',
            'autoGroup': true,
            'digits': parseInt(precision[1] ? precision[1] : '0'),	// 소수점 처리 (ex. {{currency_3}}일 때)
            'allowMinus': true
          });
        }

        // calendar 초기화
        else if (componentType.search("calendar") > -1) {
          $(v).datepicker("destroy").removeClass('hasDatepicker');
          $(v).datepicker({
            dateFormat: "yy-mm-dd(D)",
            changeMonth: true,
            changeYear: true,
            yearSuffix: "",
          });
        }
      }

      // radio 초기화 - 기본 형식 고려: {{radio_A_B ...}} → editorForm_0_A, editorForm_0_B, ...
      else if (componentType.search("radio") > -1) {
        if ($(v).attr('name') == radioName) {
          editorFormCnt--;
        }
        else {
          radioName = $(v).attr('name');
        }

        var newName = settings.tableId+"_"+($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt;
        var newId = settings.tableId+"_"+($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt + "_" + componentId.split("_")[2];

        $(v).attr({name: newName, id: newId, checked: false});
      }

      // check 초기화 - 기본 형식 고려: {{check_A_B ...}} → editorForm_1_A, editorForm_1_B, ...
      else if (componentType.search("check") > -1) {
        var curCheckName = $(v).attr('name').split("_")[0] + "_" + $(v).attr('name').split("_")[1];

        if (curCheckName == checkName) {
          editorFormCnt--;
        }
        else {
          checkName = curCheckName;
        }

        var newId = settings.tableId+"_"+($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt + "_" + componentId.split("_")[2];

        $(v).attr({name: newId, id: newId, checked: false});
      }

      editorFormCnt++;
    });

    // select 초기화
    $.each($tr.find("td select"), function (k, v) {
      var componentName = $(v).attr("name");		// 기본 형식에서 id 속성이 존재하지 않으므로 name 값을 가져옴
      var newName = settings.tableId+"_"+($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt;

      $(v).attr({name: newName, id: newName});

      editorFormCnt++;
    });

    // textarea 초기화
    $.each($tr.find("td textarea"), function (k, v) {
      var componentId = $(v).attr("id");
      var newId = settings.tableId+"_"+($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt;

      $(v).attr({name: newId, id: newId});
      $(v).val("");

      editorFormCnt++;
    });

    // TODO : cOrg 초기화
    // TODO : cSum, rSum 초기화

    return $tr;
  }



  function minusRow() {
    // 추가된 행(copiedRow)이 존재하면
    if ($("#" + settings.tableId + " .copiedRow")[0] !== undefined) {
      // ① rowspan 처리 후 (optional)
      if ($("#" + settings.tableId + " ." + settings.rowspanClass)[0] !== undefined) {
        $.each($("#" + settings.tableId + " ." + settings.rowspanClass), function (k, v) {
          $(v).attr("rowspan", parseInt($(v).attr("rowspan")) - $("#" + settings.tableId + " ." + settings.copyRowClass).length);
        });
      }

      // ① 마지막 행(copiedRow) 삭제
      for (var i = 0; i < $('.' + settings.copyRowClass).length; i++) {
        $("#" + settings.tableId + " .copiedRow:last").remove();
      }

      plusCnt--;
    }

    // ② 행 삭제 콜백 함수 실행
    if (typeof settings.minusRowCallback == 'function') {
      settings.minusRowCallback(this);
    }
  }
};


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
    
    //행 추가/삭제
    PlusMinusRow({
        tableId : "dynamic_table1",
        plusBtnId : "plusRow", 
        minusBtnId : "minusRow",
        copyRowClass : "copyRow",
        copyRowNoClass : "copyRowNo1",
        rowspanClass : "rowspanTd1",
        minusRowCallback : function() {self.calAmount();},
        plusRowCallback : function() {}
     });

     // 1. [각 행별 + 버튼] 클릭 이벤트
    $(document).off("click", "#plusRow");
    $(document).on("click", "#plusRow", function(e) {
        e.preventDefault();
        
        // 현재 클릭한 버튼이 속한 행(tr)을 잡습니다.
        var $currentRow = $(this).closest('tr');
        
        // 마스터 플러스 버튼의 ID를 가져와 강제로 클릭 이벤트를 발생시킵니다.
        // (이렇게 하면 기존 plusRow() 내부의 복사, 컴포넌트 초기화, ID 재생성 로직이 그대로 실행됩니다.)
        $("#" + options.plusBtnId).trigger('click'); 
        
        // 방금 기존 공용 함수에 의해 테이블 맨 밑에 추가된 따끈따끈한 새 행을 잡습니다.
        var $newRow = $("#" + options.tableId + " .copiedRow:last");
        
        // 맨 밑에 생성된 새 행을 내가 방금 클릭했던 행 바로 아래로 쏙 이동시킵니다!
        $currentRow.after($newRow);
        
        // 행이 추가되었으니 기존에 쓰시던 시간/금액 계산 함수들을 한 번씩 새로고침 해줍니다.
        if (typeof self.calTime === "function") {
            // 새로 추가된 행에서도 계산이 돌 수 있게 주입
            $(".copiedRow").each(function() { self.calTime($(this)); });
        }
        if (typeof self.calDayPrice === "function") self.calDayPrice();
    });


    // 2. [각 행별 - 버튼] 클릭 이벤트 (중복 트리거 차단 버전)
    $(document).off("click", ".btn_row_minus");
    $(document).on("click", ".btn_row_minus", function(e) {
        // [중요] 이벤트가 부모 태그나 마스터 버튼으로 전파되어 
        // 기존 minusRow()가 이중으로 실행되는 것을 원천 차단합니다.
        e.preventDefault();
        e.stopPropagation(); 
        
        var $currentRow = $(this).closest('tr');
        
        // 원본 행(기본 첫 줄) 보호 장치
        if ($currentRow.hasClass('copiedRow')) {
            
            // 1. 현재 행만 정밀 타격하여 삭제
            $currentRow.remove();
            
            // 2. 삭제 후 테이블 전체 순번(No) 재정렬 (꼬임 방지)
            if (options.copyRowNoClass) {
                var startNo = 1;
                $("#" + options.tableId + " tr").each(function() {
                    var $noTd = $(this).find("." + options.copyRowNoClass);
                    if ($noTd.length > 0) {
                        $noTd.text(startNo);
                        startNo += (options.copyRowNoSize || 1);
                    }
                });
            }
            
            // 3. 행이 유실되었으므로 전체 금액 및 시간 합계 즉시 리프레시
            if (typeof self.calSumTime === "function") self.calSumTime();
            if (typeof self.calDayPrice === "function") self.calDayPrice();
            
            // 4. 기존 공용 함수의 콜백 함수 연동 실행
            if (typeof options.minusRowCallback === 'function') {
                options.minusRowCallback(self);
            }
        } else {
            alert("기본 첫 번째 행은 삭제할 수 없습니다. 내용만 지워주세요.");
        }
    });
  },

  calAmount : function () {
    var self = this;
    var TotalAmount = 0;

    $("#dynamic_table1 tr").each(function(i, e){
       if ($(e).find('.Amount')[0]) {

        var amount = parseFloat($(e).find('.Amount input').val().replace(/\,/g,"")); if (isNaN(amount)) amount = 0; //수량

        TotalAmount += parseFloat((amount).toFixed(2));
        $(e).find(".TotalAmount input").val(GO.util.numberWithCommas(TotalAmount.toFixed(0)));  // 현재 행 합계
      }
    });
    // $(".TotalAmount input").val(GO.util.numberWithCommas(TotalAmount));
  
  },

  renderViewMode : function(){$('.viewModeHiddenPart').hide();},
  onEditDocument : function(){this.render();},
  beforeSave :function() {$('.viewModeHiddenPart').hide();},
  afterSave :function() {$('.viewModeHiddenPart').hide();},
  validate :function() {return true;},
  getDocVariables : function(){}
});
return Integration;