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

    // 자동 계산 부분 초기화
    $tr.find(".price4").text("");  // 초기 텍스트 제거

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
        plusBtnId : "plus1", 
        minusBtnId : "minus1",
        copyRowClass : "copyRow1",
        copyRowNoClass : "copyRowNo1",
        rowspanClass : "rowspanTd1",
        minusRowCallback : function() {
          self.calSumPrice(".price1 input", ".sum_price1");
          self.calTotalPrice();
        },
        plusRowCallback : function() {}
    });
    PlusMinusRow({
            tableId : "dynamic_table2",
            plusBtnId : "plus2", 
            minusBtnId : "minus2",
            copyRowClass : "copyRow2",
            copyRowNoClass : "copyRowNo2",
            rowspanClass : "rowspanTd2",
            minusRowCallback : function() {
              self.calSumPrice(".price2 input", ".sum_price2");
              self.calTotalPrice();
            },
            plusRowCallback : function() {}
    });
    PlusMinusRow({
            tableId : "dynamic_table3",
            plusBtnId : "plus3", 
            minusBtnId : "minus3",
            copyRowClass : "copyRow3",
            copyRowNoClass : "copyRowNo3",
            rowspanClass : "rowspanTd3",
            minusRowCallback : function() {
              self.calSumPrice(".price3 input", ".sum_price3");
              self.calTotalPrice();
            },
            plusRowCallback : function() {}
    });
    PlusMinusRow({
            tableId : "dynamic_table4",
            plusBtnId : "plus4", 
            minusBtnId : "minus4",
            copyRowClass : "copyRow4",
            copyRowNoClass : "copyRowNo4",
            rowspanClass : "rowspanTd4",
            minusRowCallback : function() {
              self.calDayPrice();
              self.calTotalPrice();
            },
            plusRowCallback : function() {}
    });
    PlusMinusRow({
            tableId : "dynamic_table5",
            plusBtnId : "plus5", 
            minusBtnId : "minus5",
            copyRowClass : "copyRow5",
            copyRowNoClass : "copyRowNo5",
            rowspanClass : "rowspanTd5",
            minusRowCallback : function() {
              self.calSumPrice(".price5 input", ".sum_price5");
              self.calTotalPrice();
            },
            plusRowCallback : function() {}
    });

    $('.price1 input').on('change', function() {
      self.calSumPrice(".price1 input", ".sum_price1");
      self.calTotalPrice();
    });

    $('.price2 input').on('change', function() {
      self.calSumPrice(".price2 input", ".sum_price2");
      self.calTotalPrice();
    });

    $('.price3 input').on('change', function() {
      self.calSumPrice(".price3 input", ".sum_price3");
      self.calTotalPrice();
    });

    $('.price4 input, .copyRow4 select, .day_period input').on('change', function() {
      self.calDayPrice();
      self.calTotalPrice();
    });

    $('.price5 input').on('change', function() {
      self.calSumPrice(".price5 input", ".sum_price5");
      self.calTotalPrice();
    });
  },

  calDayPrice : function () {
    // 공휴일 리스트 >> 직접 작성 필요
    const holidays = [
      "2025-01-01",
      "2025-03-01",
      "2025-05-05",
      "2025-06-06",
      "2025-08-15",
      "2025-10-03",
      "2025-10-09",
      "2025-12-25"
    ];

    // 날짜 포맷 함수
    function formatDate(date) {
      const y = date.getFullYear();
      const m = ('0' + (date.getMonth() + 1)).slice(-2);
      const d = ('0' + date.getDate()).slice(-2);
      return `${y}-${m}-${d}`;
    }

    // 일비 정산금액 계산
    $("#dynamic_table4 tr").each(function (i, e) {
      var selectedUserRank = $(e).find(".userRank select option:selected").val();

      // 일비 기간 날짜
      var startDateStr = $(e).find('.day_period input').eq(0).val();
      var endDateStr = $(e).find('.day_period input').eq(1).val();
      
      var startDate = new Date(startDateStr);
      var endDate = new Date(endDateStr);

      // 기본 일수 차이 계산 (양 끝 포함)
      var dayDiff = 0;

      // 날짜 유효성 검사
      if (!isNaN(startDate) && !isNaN(endDate) && startDate <= endDate) {
        let current = new Date(startDate);

        while (current <= endDate) {
          const dayOfWeek = current.getDay(); // 0 = 일요일, 6 = 토요일
          const dateStr = formatDate(current);
          if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays.includes(dateStr)) {
            dayDiff++;
          }
          current.setDate(current.getDate() + 1); // 다음 날로 이동
        }
      }

      if (selectedUserRank) {
        let price = 0;

        if (["주임", "대리", "과장", "차장"].includes(selectedUserRank)) {
          price = 30000 * dayDiff;
        } else if (selectedUserRank === "팀장") {
          price = 35000 * dayDiff;
        } else if (["실장", "위원"].includes(selectedUserRank)) {
          price = 40000 * dayDiff;
        } else if (["대표", "소장", "본부장", "이사"].includes(selectedUserRank)) {
          price = 50000 * dayDiff;
        } else {
          price = 0;
        }

        $(e).find(".price4").text(price ? GO.util.numberWithCommas(price) : "");
      }
    });

    // 총 합계 계산
    var sum_price4 = 0;

    $(".price4").each(function () {
      var val = parseFloat($(this).text().replace(/,/g, ""));
      if (!isNaN(val)) {
        sum_price4 += val;
      }
    });

    $(".sum_price4").text(GO.util.numberWithCommas(sum_price4));
  },

  calSumPrice : function (priceEl, sumPriceEl) {
        var sum_prePrice = 0;

        $(priceEl).each(function () {
          var val = parseFloat($(this).val().replace(/,/g, ""));
          if (!isNaN(val)) {
              sum_prePrice += val;
          }
      });
  
      $(sumPriceEl).text(GO.util.numberWithCommas(sum_prePrice));
  },

  calTotalPrice : function () {
      var sum_price1 = parseFloat($(".sum_price1").text().replace(/,/g, "")) || 0;
      var sum_price2 = parseFloat($(".sum_price2").text().replace(/,/g, "")) || 0;
      var sum_price3 = parseFloat($(".sum_price3").text().replace(/,/g, "")) || 0;
      var sum_price4 = parseFloat($(".sum_price4").text().replace(/,/g, "")) || 0;
      var sum_price5 = parseFloat($(".sum_price5").text().replace(/,/g, "")) || 0;
      var totalPrice = sum_price1 + sum_price2 + sum_price3 + sum_price4 + sum_price5;
  
      $(".totalPrice").text(GO.util.numberWithCommas(totalPrice));
  },

    

  renderViewMode : function(){$('.viewModeHiddenPart').hide();},
  onEditDocument : function(){this.render();},
  beforeSave :function() {$('.viewModeHiddenPart').hide();},
  afterSave :function() {$('.viewModeHiddenPart').hide();},
  validate :function() {return true;},
  getDocVariables : function(){}
});
return Integration;
