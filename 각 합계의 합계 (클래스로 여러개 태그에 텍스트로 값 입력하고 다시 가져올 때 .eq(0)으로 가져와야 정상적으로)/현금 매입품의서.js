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

/* ------------------------------------------ PlusMinusRow.js End ------------------------------------------ */


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
          self.calSumPrice("#dynamic_table1 tr", ".commPrice", ".commPrice input", ".sum_commPriceVal");
          self.calEstCost();
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
          self.calSumPrice("#dynamic_table2 tr", ".repairPrice", ".repairPrice input", ".sum_repairPriceVal");
          self.calEstCost();
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
          self.calSumPrice("#dynamic_table3 tr", ".consPrice", ".consPrice input", ".sum_consPriceVal");
          self.calEstCost();
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
          self.calSumPrice("#dynamic_table4 tr", ".etcPrice", ".etcPrice input", ".sum_etcPriceVal");
          self.calEstCost();
        },
        plusRowCallback : function() {}
    });

    $('.purPrice input').on('change', function(){
        self.autoInputVal(".purPrice input", ".purPriceVal");
        self.calSet();
    });
    $('.expPrice input').on('change', function(){
        self.autoInputVal(".expPrice input", ".expPriceVal");
        self.calSet(); 
    });

    // 상품화내역 금액
    $(".commPrice input").on('change', function(){
      self.calSumPrice("#dynamic_table1 tr", ".commPrice", ".commPrice input", ".sum_commPriceVal");
    });

    // 수리 금액
    $(".repairPrice input").on('change', function(){
      self.calSumPrice("#dynamic_table2 tr", ".repairPrice", ".repairPrice input", ".sum_repairPriceVal");
    });

    // 탁송 금액
    $(".consPrice input").on('change', function(){
      self.calSumPrice("#dynamic_table3 tr", ".consPrice", ".consPrice input", ".sum_consPriceVal");
    });

    // 기타 금액
    $(".etcPrice input").on('change', function(){
      self.calSumPrice("#dynamic_table4 tr", ".etcPrice", ".etcPrice input", ".sum_etcPriceVal");
    });

    // 상품화내역, 수리, 탁송, 기타
    $(".commPrice input, .repairPrice input, .consPrice input, .etcPrice input").on('change', function(){      
      self.calEstCost();
    });

    // 중고차매입지원금 입력 시 추정 판매이익 금액 계산
    $(".usedPurSub input").on('change', function(){
      self.calSet();
    });
	},
  
  autoInputVal : function(inputEL, valEL){      
    var inputVal = parseInt($(inputEL).val().replace(/,/g, "")); if (isNaN(inputVal)) inputVal = "";

    $(valEL).text(GO.util.numberWithCommas(inputVal));
  },
  
  // 부가세정산, 정산이익, 추정판매이익 구하는 함수
  calSet : function(){
      var purPrice = parseInt($(".purPrice input").val().replace(/,/g, "")); if (isNaN(purPrice)) purPrice = 0; // 매입가격
      var expPrice = parseInt($(".expPrice input").val().replace(/,/g, "")); if (isNaN(expPrice)) expPrice = 0; // 예상판매가격
      var tax = (expPrice - expPrice / 1.1) - (purPrice - purPrice / 1.1);  // 부가세정산(c)
      var setProfitVal = expPrice - purPrice - tax; // 정산이익(d=a-b-c)
      var usedPurSub = parseInt($(".usedPurSub input").val().replace(/,/g, "")); if (isNaN(usedPurSub)) usedPurSub = 0; // 중고차매입지원금
      var estCost = parseInt($(".estCostVal").eq(0).text().replace(/,/g, "")); if (isNaN(estCost)) estCost = 0; // 추정 비용 합계(=추정 부대비용)
      var estProfit = setProfitVal - estCost + usedPurSub;
      console.log("usedPurSub: ", usedPurSub);
      console.log("estProfit: ", estProfit);

      $(".taxVal").text(GO.util.numberWithCommas(tax.toFixed(0)));
      $(".setProfitVal").text(GO.util.numberWithCommas(setProfitVal.toFixed(0)));
      $(".estProfitVal").text(GO.util.numberWithCommas(estProfit.toFixed(0)));
  },
  
    // // 각 행 합계 : 금액 계산 (= 단가 * 수량)
    // calSumPrice : function () {
    //   var sum1 = 0;
      
    //   $("#dynamic_table1 tr").each(function(i, e){
    //     if ($(e).find(".commPrice")[0]) {
    //       var commPrice = parseInt($(e).find(".commPrice input").val().replace(/,/g, "")); if (isNaN(commPrice)) commPrice = 0;
          
    //       sum1 += commPrice;
    //     }
    //   });

    //   $(".sum_commPriceVal").text(GO.util.numberWithCommas(sum1));
      

    //   var sum2 = 0;
      
    //   $("#dynamic_table2 tr").each(function(i, e){
    //     if ($(e).find(".repairPrice")[0]) {
    //       var repairPrice = parseInt($(e).find(".repairPrice input").val().replace(/,/g, "")); if (isNaN(repairPrice)) repairPrice = 0;
          
    //       sum2 += repairPrice;
    //     }
    //   });

    //   $(".sum_repairPriceVal").text(GO.util.numberWithCommas(sum2));
      

    //   var sum3 = 0;
      
    //   $("#dynamic_table3 tr").each(function(i, e){
    //     if ($(e).find(".consPrice")[0]) {
    //       var consPrice = parseInt($(e).find(".consPrice input").val().replace(/,/g, "")); if (isNaN(consPrice)) consPrice = 0;
          
    //       sum3 += consPrice;
    //     }
    //   });

    //   $(".sum_consPriceVal").text(GO.util.numberWithCommas(sum3));
      

    //   var sum4 = 0;
      
    //   $("#dynamic_table4 tr").each(function(i, e){
    //     if ($(e).find(".etcPrice")[0]) {
    //       var etcPrice = parseInt($(e).find(".etcPrice input").val().replace(/,/g, "")); if (isNaN(etcPrice)) etcPrice = 0;
          
    //       sum4 += etcPrice;
    //     }
    //   });

    //   $(".sum_etcPriceVal").text(GO.util.numberWithCommas(sum4));

      
    //   var estCost = sum1 + sum2 + sum3 + sum4;
    //   $(".estCostVal").text(GO.util.numberWithCommas(estCost));
    // },
  
    // 각 행 합계 : 금액 계산 (= 단가 * 수량)
    calSumPrice : function (trEL, priceEL, priceInputEL, sumPriceValEL) {
      var sum = 0;
      
      $(trEL).each(function(i, e){
        if ($(e).find(priceEL)[0]) {
          var price = parseInt($(e).find(priceInputEL).val().replace(/,/g, "")); if (isNaN(price)) price = 0;
          
          sum += price;
        }
      });

      $(sumPriceValEL).text(GO.util.numberWithCommas(sum));
    },
    
    calEstCost : function(){
      // var commPrice = parseInt($(".sum_commPriceVal").first().text().replace(/,/g, "")); 
      var commPrice = parseInt($(".sum_commPriceVal").eq(0).text().replace(/,/g, "")); 
      if (isNaN(commPrice)) commPrice = 0;
  
      // var repairPrice = parseInt($(".sum_repairPriceVal").first().text().replace(/,/g, "")); 
      var repairPrice = parseInt($(".sum_repairPriceVal").eq(0).text().replace(/,/g, "")); 
      if (isNaN(repairPrice)) repairPrice = 0;
  
      // var consPrice = parseInt($(".sum_consPriceVal").first().text().replace(/,/g, "")); 
      var consPrice = parseInt($(".sum_consPriceVal").eq(0).text().replace(/,/g, "")); 
      if (isNaN(consPrice)) consPrice = 0;
  
      // var etcPrice = parseInt($(".sum_etcPriceVal").first().text().replace(/,/g, "")); 
      var etcPrice = parseInt($(".sum_etcPriceVal").eq(0).text().replace(/,/g, "")); 
      if (isNaN(etcPrice)) etcPrice = 0;
  
      var estCost = commPrice + repairPrice + consPrice + etcPrice;
      $(".estCostVal").text(GO.util.numberWithCommas(estCost));
  },

	renderViewMode : function(){$('.viewModeHiddenPart').hide();},
	onEditDocument : function(){this.render();},
	beforeSave :function() {$('.viewModeHiddenPart').hide();},
	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;