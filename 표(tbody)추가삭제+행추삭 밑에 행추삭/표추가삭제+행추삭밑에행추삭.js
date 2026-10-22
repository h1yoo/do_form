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

    plusRowCallback: options.plusRowCallback,			  // 행 추가 콜백 함수명
    minusRowCallback: options.minusRowCallback,			// 행 삭제 콜백 함수명
    
    // 행 추가 삭제 안에 행 추가 삭제 넣기 위해 추가한 옵션 변수
    childPlusBtnClass: options.childPlusBtnClass,   // 예: 'btn_child_plus'
    childMinusBtnClass: options.childMinusBtnClass, // 예: 'btn_child_minus'
    childCopyRowClass: options.childCopyRowClass    // 예: 'childCopyRow2'
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
    $tr.find(".sub_total").text("");  // 초기 텍스트 제거

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
    // if ($("#" + settings.tableId + " ." + settings.copyRowNoClass)[0] !== undefined) {
    //   var copyRowNoCnt = $tr.find("." + settings.copyRowNoClass).length; // 한 행에 존재하는 순번 클래스의 수
      
    //   for (var i = 0; i < copyRowNoCnt; i++) {
    //     if (!$tr.find("." + settings.copyRowNoClass).attr('rowspan')) {
    //       var newNo = parseInt($($tr.find("." + settings.copyRowNoClass)[i]).text()) + settings.copyRowNoSize * plusCnt * $tr.length;
    //     }
    //     else {
    //       var newNo = parseInt($($tr.find("." + settings.copyRowNoClass)[i]).text()) + settings.copyRowNoSize * plusCnt;
    //     }

    //     $($tr.find("." + settings.copyRowNoClass)[i]).text("주요출장일정 " + newNo);
    //   }
    // }
    // // ////////////// 순번처리 코드 수정 > 텍스트 제거 후 추가
    if ($("#" + settings.tableId + " ." + settings.copyRowNoClass)[0] !== undefined) {
      var copyRowNoCnt = $tr.find("." + settings.copyRowNoClass).length; // 한 행에 존재하는 순번 클래스의 수
    
      for (var i = 0; i < copyRowNoCnt; i++) {
        var $cell = $($tr.find("." + settings.copyRowNoClass)[i]);
    
        // 텍스트에서 숫자만 추출
        var currentText = $cell.text().replace(/[^\d]/g, ""); // 숫자만 남기기
        var currentNo = parseInt(currentText) || 0;
    
        var newNo;
        if (!$cell.attr('rowspan')) {
          newNo = currentNo + settings.copyRowNoSize * plusCnt * $tr.length;
        } else {
          newNo = currentNo + settings.copyRowNoSize * plusCnt;
        }
    
        $cell.text("예산항목 " + newNo); // 새 텍스트로 설정
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

  ///////////////////////////////////////////////////
  ///////// 자식 행 추가 삭제 내용 추가 (START) /////////
  // 💡 [자식 행 추가 버튼 이벤트 - 독립 탐색 로직 적용]
  if (settings.childPlusBtnClass) {
    $(document).off("click", "." + settings.childPlusBtnClass).on("click", "." + settings.childPlusBtnClass, function (e) {
      e.preventDefault();
      e.stopPropagation();
      childPlusRow($(this));
    });
  }

  // 💡 [자식 행 삭제 버튼 이벤트]
  if (settings.childMinusBtnClass) {
    $(document).off("click", "." + settings.childMinusBtnClass).on("click", "." + settings.childMinusBtnClass, function (e) {
      e.preventDefault();
      e.stopPropagation();
      childMinusRow($(this));
    });
  }

  function childPlusRow($btn) {
    // 1. 클릭된 플러스 버튼이 있는 바로 그 자식 행(tr) 탐색
    var $tr = $btn.closest("tr");
    var $tbody = $btn.closest("tbody");
    var $allTrs = $tbody.find("tr");

    // 2. tbody의 두 번째 행(.childCopyRow2) 복사
    var $newTr = $allTrs.eq(1).clone(true);

    // 3. 복사된 행의 클래스 및 입력값 초기화
    $newTr.removeClass(settings.childCopyRowClass).addClass('childCopiedRow');
    $newTr.find("input").val("");
    $newTr.find("textarea").val("");
    $newTr.find(".price input, .unit_price input").val("");
    $newTr.find(".sub_total").text("");

    // 4. 컴포넌트(ID/Name) 재설정
    var i = $allTrs.length;
    initComponent($newTr, i);

    // 💡 5. [수정 완료] 클릭한 '그 단 하나의 행($tr)' 바로 뒤에만 복사본 추가!
    $tr.after($newTr); // 👈 $allTrs 대신 $tr 로 변경!

    // 6. 금액 계산 콜백 실행
    if (typeof settings.childPlusRowCallback == 'function') {
      settings.childPlusRowCallback($btn);
    } else if (typeof settings.plusRowCallback == 'function') {
      settings.plusRowCallback($btn);
    }
  }

  function childMinusRow($btn) {
    var $tbody = $btn.closest("tbody");
    var $allTrs = $tbody.find("tr");

    // 헤더(0), 두번째 행(1), 맨 마지막 소계 행을 제외한 '실제 데이터 입력 행들'만 추출
    // slice(2, -1) : 인덱스 2번(3번째 행)부터 ~ 맨 뒤에서 1번째 전까지 잘라냄
    var $targetRows = $allTrs.slice(2, -1);

    // 추출된 데이터 행이 1개 이상 존재할 때만, 그 중 '마지막 행' 삭제
    if ($targetRows.length > 0) {
      $targetRows.last().remove();

      if (typeof settings.childMinusRowCallback == 'function') {
        settings.childMinusRowCallback($btn);
      } else if (typeof settings.minusRowCallback == 'function') {
        settings.minusRowCallback($btn);
      }
    }
  }
  ///////// 자식 행 추가 삭제 내용 추가 (END) /////////
  /////////////////////////////////////////////////


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
      rowspanClass : "rowspanTd1",
      minusRowCallback : function() {
        self.calSumPrice();
        self.calSumTotal();
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
        // 자식 행추삭 옵션 추가
        childPlusBtnClass : "btn_child_plus",
        childMinusBtnClass : "btn_child_minus",
        childCopyRowClass : "childCopyRow2",
        minusRowCallback : function() {
          self.calDetail();
        },
        plusRowCallback : function() {}
    });
    
    // 수량, 단가 입력 시 공급가액, 부가세(10%) 및 합계금액 자동계산
    $("#dynamic_table1 .qty input, #dynamic_table1 .unitPrice input").on("change",function(){
      var $row = $(this).closest("tr");
      
      var qty = parseFloat($row.find('.qty input').val().replace(/,/g,""));
      if (isNaN(qty)) qty = 0;
    
      var unitPrice = parseFloat($row.find('.unitPrice input').val().replace(/,/g,""));
      if (isNaN(unitPrice)) unitPrice = 0;
    
      var supply = qty * unitPrice || 0;
      var tax = Math.round(supply * 0.1) || 0;

      $row.find(".supply input").val(GO.util.numberWithCommas(supply));
      $row.find(".tax input").val(GO.util.numberWithCommas(tax));

      self.calSum();

      // let value = $(this).val().replace(/,/g, "");
      // if (!isNaN(value) && value !== "") {
      //     $(this).val(Number(value).toLocaleString()); // 숫자로 변환 후 콤마 추가
      // }
    });

    // 공급가액 수동 변경 시 합계금액 재계산 (합계칸은 수정 불가능)
    $(document).on("change keyup", ".supply input", function() {
      self.calSum();
    });
    // 세액 수동 변경 시 합계금액 재계산 (합계칸은 수정 불가능)
    $(document).on("change keyup", ".tax input", function() {
      self.calSum();
    });

    $('#dynamic_table2 .price input').on('change', function() {
        self.calDetail();
    });

    // 부가가치세(VAT) 수동 변경 시 합계금액 재계산 (합계칸은 수정 불가능)
    $(document).on("change keyup", "#dynamic_table2 .sum_vat input", function() {
      // 1. 콤마 제거 후 숫자(Number) 타입으로 변환 (값이 없을 경우 0 처리)
      var sum_total = parseFloat($(".sum_total").text().replace(/,/g, "")) || 0;
      var sum_vat = parseFloat($(this).val().replace(/,/g, "")) || 0;
      
      // 2. 숫자로 변환되었으므로 덧셈 계산 정상 수행
      var sum_grand = sum_total + sum_vat;
      
      // 3. 합계(.sum_grand) 표시
      $(".sum_grand").text(GO.util.numberWithCommas(sum_grand.toFixed(0)));
    });
  },

  calSum : function () {
    var self = this;
    var sum_supply = 0;
    var sum_tax = 0;

    $(".supply input").each(function(i,e){
      sum_supply += Number($(e).val().replace(/,/g, ""));
    });

    $(".tax input").each(function(i,e){
      sum_tax += Number($(e).val().replace(/,/g, ""));
    });
    
    $(".sum_supply").text(GO.util.numberWithCommas(sum_supply));
    $('.sum_supply_kr').text(self._viewKorean(sum_supply.toString()));
    $(".sum_tax").text(GO.util.numberWithCommas(sum_tax));
  },

  calDetail : function () {
    var self = this;
    var sum_total = 0;  // 총계// 1. 각 예산항목 그룹(tbody) 단위로 반복
    $("#dynamic_table2 tbody").each(function(i, tbody){
      var sub_total = 0; // 각 예산항목(tbody)의 소계는 여기서 매번 0으로 초기화

      // 2. tbody 내부에 금액 입력 행(tr)들을 반복
      $(tbody).find("tr").each(function(j, tr){
        var $tr = $(tr);
        
        // 금액 input이 존재하는 행만 계산 (.price input 또는 .unit_price 기준)
        var $priceInput = $tr.find(".price input");
        
        if ($priceInput.length > 0) {
          var price = parseFloat($priceInput.val().replace(/,/g, "")) || 0;
          sub_total += price; // 행별 금액을 소계에 더함
        }
      });

      // 3. 해당 예산항목의 소계(.sub_total) 표시 (input이면 .val(), 일반 텍스트면 .text())
      var $subTotalElem = $(tbody).find(".sub_total");
      var formattedSubTotal = GO.util.numberWithCommas(sub_total.toFixed(0));

      if ($subTotalElem.is("input")) {
        $subTotalElem.val(formattedSubTotal);
      } else {
        $subTotalElem.text(formattedSubTotal);
      }

      // 4. 항목별 소계를 전체 총계에 누적
      sum_total += sub_total;
    });


    // 5. 전체 총계(.sum_total) 표시
    var $sumTotalElem = $(".sum_total");
    var formattedSumTotal = GO.util.numberWithCommas(sum_total.toFixed(0));

    if ($sumTotalElem.is("input")) {
      $sumTotalElem.val(formattedSumTotal);
    } else {
      $sumTotalElem.text(formattedSumTotal);
    }
    
    // 부가가치세(VAT) 표시
    var sum_vat = sum_total * 0.1;
    $(".sum_vat input").val(GO.util.numberWithCommas(sum_vat.toFixed(0)));
    // if ($(".sum_vat").is("input")) {
    //   $(".sum_vat input").val(GO.util.numberWithCommas(sum_vat.toFixed(0)));
    // } else {
    //   $(".sum_vat").text(GO.util.numberWithCommas(sum_vat.toFixed(0)));
    // }

    // 합계(.sum_grand) 표시
    var sum_grand = sum_total + sum_vat;
    $(".sum_grand").text(GO.util.numberWithCommas(sum_grand.toFixed(0)));
  },
    
	_viewKorean : function(num) {
		var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십");
		var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천");
		var result = "";
		for(i=0; i<num.length; i++) {
			str = "";
			var han = hanA[num.charAt(num.length-(i+1))];
			if(han != "") str += han+danA[i];
			if(i == 4) str += "만";
			if(i == 8) str += "억";
			if(i == 12) str += "조";
			result = str + result;
		}
		if(num != 0) result = result;
		return result;
	},

  _convertCurrencyFormat : function(value) {  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},

  renderViewMode : function(){$('.viewModeHiddenPart').hide();},
  onEditDocument : function(){this.render();},
  beforeSave :function() {$('.viewModeHiddenPart').hide();},
  afterSave :function() {$('.viewModeHiddenPart').hide();},
  validate :function() {return true;},
  getDocVariables : function(){}
});
return Integration;