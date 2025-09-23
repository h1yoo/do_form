//SheetJS open source
require.config({
  paths: {
    'xlsx': 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min'
  },
  shim: {
    'xlsx': {
      exports: 'XLSX'
    }
  }
});
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
    
		// textarea css 수정 (>> html로 수정이 안돼서)
		$('.txta_editor:first-child').css({
		  'height': '20px',
		  'max-width': '100%',
		  'box-sizing': 'border-box',
      'overflow-y': 'auto'
		});
		$('.txta_editor:last-child').css({
      'line-height': '1.5',
		  'height': '54px',
		  'max-width': '100%',
		  'box-sizing': 'border-box',
      'overflow-y': 'auto'
		});

$("input[type=text], textarea").on("change", function() {
  if ($("#buyerEdit").is(":checked")) {
    // 현재 입력한 칸 파란색
    $(this).closest("td").addClass("buyer-edited");

    // 확정 수량 칸이면 같은 행의 확정 금액 + 합계칸도 파란색
    if ($(this).closest("td").hasClass("confirm_amount")) {
      $(this).closest("tr").find(".confirm_price").addClass("buyer-edited");
      $(".sum_confirm_amount").addClass("buyer-edited");
      $(".sum_confirm_price").addClass("buyer-edited");
    }
  } else {
    // 체크 해제 시 클래스 제거
    $(this).closest("td").removeClass("buyer-edited");

    if ($(this).closest("td").hasClass("confirm_amount")) {
      $(this).closest("tr").find(".confirm_price").removeClass("buyer-edited");
      $(".sum_confirm_amount").removeClass("buyer-edited");
      $(".sum_confirm_price").removeClass("buyer-edited");
    }
  }
});
// ✅ 엑셀 업로드 이벤트 (공무보전 신청서용)
$("#excelUploadBtn").on("change", function(e){
  var file = e.target.files[0];
  if(!file) return;

  require(['xlsx'], function(XLSX){
    var reader = new FileReader();
    reader.onload = function(e){
      try {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type:'array'});
        var sheet = workbook.Sheets[workbook.SheetNames[0]];
        var rows = XLSX.utils.sheet_to_json(sheet, {header:1});

        console.log("📊 rows:", rows);

        // 엑셀 업로드 후 행 채우기
if(rows && rows.length > 1){
  for(var i=1; i<rows.length; i++){
    var r = rows[i];
    if (!r || r.every(cell => !cell || String(cell).trim() === "")) continue;

    let $targetRow;
    if(i === 1){
      // 첫 번째 데이터는 copyRow1(기존 행)에 채우기
      $targetRow = $("#dynamic_table1 .copyRow1");
    } else {
      // 두 번째부터는 새 행 추가
      $("#plus1").trigger("click");
      $targetRow = $("#dynamic_table1 .copiedRow:last");
    }

    // 품번 / 품명
    if(r[0]){
      var part = r[0].split("/");
      $targetRow.find(".part_no input").val(part[0]?.trim() || "");
      $targetRow.find(".part_name input").val(part[1]?.trim() || "");
    }

    // 모델명 / maker
    if(r[1]){
      var model = r[1].split("/");
      $targetRow.find(".model input").val(model[0]?.trim() || "");
      $targetRow.find(".maker input").val(model[1]?.trim() || "");
    }

    // 작업 사유
    $targetRow.find(".work_reason textarea").val(r[2] || ""); 

    // 재고
    $targetRow.find(".stock input").val(r[3] || ""); 

    if(r[4]){
      var amt = r[4].split("/");
      $targetRow.find(".plan_amount input").val(amt[0]?.trim() || "");
      $targetRow.find(".confirm_amount input").val(amt[1]?.trim() || "");
    }

    $targetRow.find(".unit_price input").val(r[5] || ""); 

    if(r[6]){
  var price = r[6].split("/");

  // 숫자만 들어왔을 때 콤마 붙이기
  var planVal = price[0]?.trim() || "";
  var confirmVal = price[1]?.trim() || "";

  if(planVal !== "" && !isNaN(planVal)){
    planVal = Number(planVal).toLocaleString();
  }
  if(confirmVal !== "" && !isNaN(confirmVal)){
    confirmVal = Number(confirmVal).toLocaleString();
  }

  $targetRow.find(".plan_price input").val(planVal);
  $targetRow.find(".confirm_price input").val(confirmVal);
}

    $targetRow.find(".unit_name input").val(r[7] || "");    
    $targetRow.find(".due_date input").val(r[8] || "");      
    $targetRow.find(".company input").val(r[9] || ""); 
    $targetRow.find(".content textarea").val(r[10] || "");    
    $targetRow.find(".opinion textarea").val(r[11] || "");   
  }
  // ✅ 모든 행 데이터 입력 끝난 후 합계 다시 계산
  self.calSumPrice(".plan_amount input", ".sum_plan_amount input");
  self.calSumPrice(".confirm_amount input", ".sum_confirm_amount input");
  self.calSumPrice(".plan_price input", ".sum_plan_price input");
  self.calSumPrice(".confirm_price input", ".sum_confirm_price input");
}


      } catch(err){
        console.error("❌ 엑셀 파싱 에러:", err);
      }
    };
    reader.readAsArrayBuffer(file);
  });
});

function updateAllSums() {
  self.calSumPrice(".plan_amount input", ".sum_plan_amount input");
  self.calSumPrice(".confirm_amount input", ".sum_confirm_amount input");
  self.calSumPrice(".plan_price input", ".sum_plan_price input");
  self.calSumPrice(".confirm_price input", ".sum_confirm_price input");
}
	
		//행 추가/삭제
		PlusMinusRow({
				tableId : "dynamic_table1",
				plusBtnId : "plus1", 
				minusBtnId : "minus1",
				copyRowClass : "copyRow1",
				copyRowNoClass : "copyRowNo1",
				rowspanClass : "rowspanTd1",
				minusRowCallback : function() {
          self.calSumPrice(".plan_amount input", ".sum_plan_amount input");
          self.calSumPrice(".confirm_amount input", ".sum_confirm_amount input");
          self.calSumPrice(".unit input", ".sum_unit input");
          self.calSumPrice(".plan_price input", ".sum_plan_price input");
          self.calSumPrice(".confirm_price input", ".sum_confirm_price input");
        },
				plusRowCallback : function() {}
    });

    $('.plan_amount input').on('change', function() {
        self.calPrice(".plan_amount", ".plan_amount input", ".unit input", ".plan_price input");
        self.calAutoConf(".plan_amount", ".plan_amount input", ".confirm_amount input");
        self.calAutoConf(".plan_price", ".plan_price input", ".confirm_price input");
        
        self.calSumPrice(".plan_amount input", ".sum_plan_amount input");
        self.calSumPrice(".confirm_amount input", ".sum_confirm_amount input");
        self.calSumPrice(".plan_price input", ".sum_plan_price input");
        
        let value = $(this).val().replace(/,/g, "");
        if (!isNaN(value) && value !== "") {
            $(this).val(Number(value).toLocaleString()); // 숫자로 변환 후 콤마 추가
        }
        console.log("현재 value : ", value);
    });
    $('.unit input').on('change', function() {
        self.calPrice(".plan_amount", ".plan_amount input", ".unit input", ".plan_price input");
        self.calPrice(".confirm_amount", ".confirm_amount input", ".unit input", ".confirm_price input");
        
        self.calSumPrice(".confirm_amount input", ".sum_confirm_amount input");
        self.calSumPrice(".unit input", ".sum_unit input");
        self.calSumPrice(".confirm_price input", ".sum_confirm_price input");
        self.calSumPrice(".plan_price input", ".sum_plan_price input");
        
        let value = $(this).val().replace(/,/g, "");
        if (!isNaN(value) && value !== "") {
            $(this).val(Number(value).toLocaleString()); // 숫자로 변환 후 콤마 추가
        }
    });
    $('.confirm_amount input').on('change', function() {
        self.calPrice(".confirm_amount", ".confirm_amount input", ".unit input", ".confirm_price input");
        
        self.calSumPrice(".confirm_amount input", ".sum_confirm_amount input");
        self.calSumPrice(".confirm_price input", ".sum_confirm_price input");
        console.log("confirm");
        
        let value = $(this).val().replace(/,/g, "");
        if (!isNaN(value) && value !== "") {
            $(this).val(Number(value).toLocaleString()); // 숫자로 변환 후 콤마 추가
        }
    });
    $('.plan_price input').on('change', function() {
        let value = $(this).val().replace(/,/g, "");
        if (!isNaN(value) && value !== "") {
            $(this).val(Number(value).toLocaleString());
        }
        self.calSumPrice(".plan_price input", ".sum_plan_price input");
    });

    $('.confirm_price input').on('change', function() {
        let value = $(this).val().replace(/,/g, "");
        if (!isNaN(value) && value !== "") {
            $(this).val(Number(value).toLocaleString());
        }
        self.calSumPrice(".confirm_price input", ".sum_confirm_price input");
    });
	},

  // 금액
	calPrice : function (amountEL, amountInputEL, unitInputEL, priceInputEL) {
		var self = this;
    var price = 0;
        
		$("#dynamic_table1 tbody").each(function(i, e){
      if ($(e).find(amountEL)[0]) {
        var amount = parseInt($(e).find(amountInputEL).val().replace(/\,/g,"")); if (isNaN(amount)) amount = 0;
        var unit = parseInt($(e).find(unitInputEL).val().replace(/\,/g,"")); if (isNaN(unit)) unit = 0;
        
        price = amount * unit;
        
        $(e).find(priceInputEL).val(GO.util.numberWithCommas(price));
			}
		});
	},

  // 계획 수량/금액 입력 시 자동으로 확정 수량/금액 입력
	calAutoConf : function (planEL, planInputEL, confInputEL) {
		var self = this;
    // var conf = 0;
        
		$("#dynamic_table1 tbody").each(function(i, e){
      if ($(e).find(planEL)[0]) {
        var amount = parseInt($(e).find(planInputEL).val().replace(/\,/g,"")); if (isNaN(amount)) amount = 0;
        
        $(e).find(confInputEL).val(GO.util.numberWithCommas(amount));
			}
		});
	},

  // 맨 마지막 행 총합계
  calSumPrice : function (priceEL, sumPriceEL) {
        var sum = 0;

        $(priceEL).each(function () {
          var val = parseInt($(this).val().replace(/,/g, ""));
          if (!isNaN(val)) {
            sum += val;
          }
          console.log("val : ", val);
          console.log("priceEL : ", priceEL);
          console.log("sum : ", sum);
      });
  
      $(sumPriceEL).val(GO.util.numberWithCommas(sum));
  },
    

	renderViewMode : function(){$('.viewModeHiddenPart').hide();},
	onEditDocument : function(){this.render();},
beforeSave : function() {
  // $("#divCustomWrapper input.ipt_editor, #divCustomWrapper textarea.txta_editor").each(function(){
  //   var val = $(this).val().trim();
  //   var $td = $(this).closest("td");

  //   if (val !== "") {
  //     if ($td.hasClass("buyer-edited")) {
  //       // 배경은 흰색, 글자만 파란색
  //       $(this).replaceWith(
  //         '<span style="color:#0b5fff; font-weight:bold;">' + val + '</span>'
  //       );
  //     } else {
  //       $(this).replaceWith('<span>' + val + '</span>');
  //     }
  //   } else {
  //     $(this).remove();
  //   }
  // });
},






	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;