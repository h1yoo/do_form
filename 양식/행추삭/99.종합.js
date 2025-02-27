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
	el: '#document_content',

	events: {
			'change #dynamic_table4 .pay_type select' : 'text_validate',
			'change #dynamic_table6 .radio1 input' : 'calScore',
			'change #dynamic_table6 .check1 input' : 'calScore',
			'click .ex_rate' : '_popup',
			'click #sel_minus' : 'selminus',
			'click #sel_plus' : 'selplus',
			'click #sel_dupl' : 'seldupl'
	},

	_popup : function() {
		window.open("http://info.finance.naver.com/marketindex/?tabSel=exchange#tab_section", "popup", "width=1000, height=1000");
	},
	
	DeptSelectDefaultValue : 
		{ 
			"" : {"CC":""},
			"President" : {"CC":"8300"},
			"Executive Advisor" : {"CC":"8474"},
		}, 

	render : function() {
		var self = this;
		self.calScore();

		$(".amount input, .price input").on("change",function(){self.calAmount();});
		$("#StartDate, #EndDate").on("change",function(){self.calPeriod();});
		$(".s1, .ss1, .e1, .ee1, .s2, .ss2, .e2, .ee2").on("change",function(){self.cal_time();});
		
		//입력 행 수에 따른 행 출력 및 추가/삭제
		PlusMinusRow({
				tableId : "dynamic_table1",
				rowNo : "rowNo1",
				plusBtnId : "plus1", 
				minusBtnId : "minus1",
				copyRowClass : "copyRow1",
				copyRowNoClass : "copyRowNo1",
				rowspanClass : "rowspanTr1",
				minusRowCallback : function() {self.calAmount();},
				plusRowCallback : function() {self.calAmount();}
		 });

		 //기간 계산 및 계산 일 수에 따른 행 출력 + 추가/삭제(병합)
		 PlusMinusRow({
				tableId : "dynamic_table2",
				rowNo : "rowNo2",
				plusBtnId : "plus2",
				minusBtnId : "minus2",
				copyRowClass : "copyRow2",
				copyRowNoClass : "copyRowNo2",
				rowspanClass : "rowspanTr2",
				minusRowCallback : function() {
					self._PS_CODE();},
				plusRowCallback : function() {
					self._init();
					self._PS_CODE();
				}
		 });
		 
		 //부서 선택에 따른 코드 노출
		 $('.department_sel select').on("change", $.proxy(function(e)
			{ 
				var $currentTarget = $(e.currentTarget); 
				var value = $currentTarget.val(); 
				var DeptDefaultValue = this.DeptSelectDefaultValue[value]; 
				$(".cost_center").text(DeptDefaultValue["CC"]); 
			}, this));
		
		//선택값에 따른 select box 구성
		$('.type').on('change', function(e){
			var target = $(e.currentTarget);
			self._select(target);
			self._PS_CODE();
		})
		
		//선택값에 따른 코드 노출
		$('.subtype').on('change', function(e){
			var target = $(e.currentTarget);
			self._select(target);
			self._PS_CODE();
		})
	},

	//원하는 행 삭제
	selminus : function (e) {
		var self = this;
		var targetTr = $(e.currentTarget).closest("tr");
		var targetTrClass = $(targetTr).attr('class');
		
		if(targetTrClass=="copiedRow"){
			$(targetTr).remove();
			self.calAmount();
		}
		else if(targetTrClass=="copyRow1"){
			alert("첫 번째 행은 삭제할 수 없습니다.");
		}
	},

	//원하는 행 추가
	selplus : function (e) {
		var self = this;
		var targetTr = $(e.currentTarget).closest("tr");
		var nextTr = $(targetTr).clone(true);
		$(targetTr).after(nextTr);
		$(nextTr).find('input').attr('value','');
		self.calAmount();
	},
	
	//원하는 행 복제
	seldupl : function (e) {
		var self = this;
		var targetTr = $(e.currentTarget).closest("tr");
		var nextTr = $(targetTr).clone(true);
		$(targetTr).after(nextTr);
		self.calAmount();
	},
	
	//수량, 단가, 금액 -> 합계
	calAmount : function () {
		var self = this;
		var cur = 0;
		var sum_amount = 0;
		var sum_price = 0;
		var sum_cur = 0;

		$("#dynamic_table1 tr").each(function(i, e){
			 if ($(e).find('.amount')[0]) {
				var amount = parseInt($(e).find('.amount input').val()); if (isNaN(amount)) amount = 0;
				var price = parseFloat($(e).find('.price input').val().replace(/\,/g,"")); if (isNaN(price)) price = 0;

				cur = amount * price;
				$(e).find(".cur").text(GO.util.numberWithCommas(cur));
				
				sum_amount = sum_amount + amount;
				sum_price = sum_price + price;
				sum_cur = sum_cur + cur;
			}
		});
		$(".sum_amount").text(sum_amount);
		$(".sum_price").text(GO.util.numberWithCommas(sum_price));//자체 함수
		$(".sum_cur").text(self._convertCurrencyFormat(sum_cur)); //만든 함수
		$('.Kor_cur').text(self._viewKorean(sum_cur.toString()));
	},
	
	_viewKorean : function(num) {
	  var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십");
	  var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천");
	  var result = "";
	  for(i=0; i<num.length; i++) {
		str = "";
		han = hanA[num.charAt(num.length-(i+1))];
		if(han != "")
		  str += han+danA[i];
		if(i == 4) str += "만";
		if(i == 8) str += "억";
		if(i == 12) str += "조";
		result = str + result;
	  }
	  if(num != 0)
		result = result + "원";
	  return result;
	},

	_convertCurrencyFormat : function(value) { 	
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	//기간 계산 및 시작 날짜 validation check
	calPeriod : function() {
		//기간 계산 start
		var StartDate = $("#StartDate").val();
		var EndDate = $("#EndDate").val();
		var Day1 = new Date(StartDate);
		var Day2 = new Date(EndDate);

		var day = ((Day2 - Day1)/(24 * 60 * 60 * 1000))+1;
		if(day<0) day=0;
		$(".rowNo2 input").attr({"value":day, "data-value":day});
		$(".rowNo2").trigger("change");
		//기간 계산 end
		
		//시작 날짜 validation check start
		var Today = new Date();
		var TodayYear = Today.getFullYear();
		var TodayMonth = Today.getMonth();
		var TodayDay = Today.getDate();
		Today = new Date(TodayYear, TodayMonth, TodayDay); 

		if((Day1-Today)<0) alert("금일 이후부터 작성");
		//시작 날짜 validation check end
	},
	
	//선택 값에 따른 항목 필수 지정
	text_validate : function(e) {
		var targetTr = $(e.currentTarget).closest("tr");
		var pay_type = $(targetTr).find(".pay_type select option:selected").val();
		
		if (pay_type=="계좌이체"||pay_type=="원천징수"){
			$(targetTr).find(".text1 input").attr({
				'data-dsl':'{{text$require$}}',
				'data-require':'true',
				'placeholder': '필수값 입니다.'
			});
		}
		else{
			$(targetTr).find(".text1 input").attr({
				'data-dsl':'{{text}}',
				'data-require':'false',
				'placeholder': ''
			});
		}

		//선택 값에 따른 표 노출 설정
		if (pay_type=="계좌이체"||pay_type=="원천징수"){
			$('#dynamic_table5').css('display', 'none');
		}
		else{
			$('#dynamic_table5').css('display', '');
		}
	},

	//선택 값에 따른 점수 계산
	calScore : function(e) {
		var self = this;
		var radio1 = parseInt(($('.radio1 span input:checked').val()).substring(0,1)); 
		$(".score1").text(radio1);
		
		//체크박스의 값도 받아올 수 있지만, 체크된 여러 개의 값 중 가장 앞의 값만 반영됨 -> 체크 유무만 판단할 경우 사용 가능
		var check1 = $('.check1 span input:checked').val();
		$(".score2").text(check1);
	},

	//시간 계산
	cal_time : function() {
		var time =0;
		var total_time = 0;

		$("#dynamic_table7 tr").each(function(i, e){
			 if ($(e).find('.s1')[0]) {
				var s1 = parseFloat($(e).find(".s1 select option:selected").val());
				var ss1 = parseFloat($(e).find(".ss1 select option:selected").val());
				var e1 = parseFloat($(e).find(".e1 select option:selected").val());
				var ee1 = parseFloat($(e).find(".ee1 select option:selected").val());

				var checks = parseInt((s1*60) + ss1); //A
				var checke = parseInt((e1*60) + ee1); //B	
				var time = 0;

				//점심 시간 변수
				var lunch_time_start = 690; //11시 30분
				var lunch_time_end = 750; //12시 30분
				var dinner_time_start = 1050; //17시 30분
				var dinner_time_end = 1120; //18시 30분

				if(checks<=lunch_time_start){
					if(checke<=lunch_time_start) time = checke - checks;
					else if(checke>=lunch_time_start&&checke<=lunch_time_end) time = lunch_time_start - checks;
					else if(checke>=lunch_time_end&&checke<=dinner_time_start) time = checke - checks - 60;
					else if(checke>=dinner_time_start&&checke<=dinner_time_end) time = dinner_time_start - checks - 60;
					else if(checke>=dinner_time_end) time = checke - checks - 120;
				}
				else if(checks>=lunch_time_start&&checks<=lunch_time_end){
					if(checke>=lunch_time_start&&checke<=lunch_time_end) time = 0;
					else if(checke>=lunch_time_end&&checke<=dinner_time_start) time = checke - lunch_time_end;
					else if(checke>=dinner_time_start&&checke<=dinner_time_end) time = dinner_time_start - lunch_time_end;
					else if(checke>=dinner_time_end) time = checke - lunch_time_end - 60;
					else $(e).find(".time").text("시간을 다시 입력하세요.");
				}
				else if(checks>=lunch_time_end&&checks<=dinner_time_start){
					if(checke>=lunch_time_end&&checke<=dinner_time_start) time = checke - checks;
					else if(checke>=dinner_time_start&&checke<=dinner_time_end) time = dinner_time_start - checks;
					else if(checke>=dinner_time_end) time = checke - checks - 60;
					else $(e).find(".time").text("시간을 다시 입력하세요.");
				}
				else if(checks>=dinner_time_start&&checks<=dinner_time_end){
					if(checke>=dinner_time_start&&checke<=dinner_time_end) time = 0;
					else if(checke>=dinner_time_end) time = checke - dinner_time_end;
					else $(e).find(".time").text("시간을 다시 입력하세요.");
				}
				else if(checks>=dinner_time_end){
					if(checke>=dinner_time_end) time = checke - checks;
					else $(e).find(".time").text("시간을 다시 입력하세요.");
				}
				
				time = time/60;
				$(e).find(".time").text(parseInt(time)+"시간 "+((time-parseInt(time))*60).toFixed(0)+"분");
				total_time += time;
			 }
		});
		if(total_time>12) $(".total_time").text("시간 외 근로시간은 주 12시간을 넘을 수 없습니다.");
		else $(".total_time").text(parseInt(total_time)+"시간 "+((total_time-parseInt(total_time))*60).toFixed(0)+"분");
	},

	//선택값에 따른 select box 구성
	_select : function(target) {
		var f = $(target).find('select');
		var f2 = $(target).parent().find('.subtype select');

		var checked = f.find('option:selected').val();

		var sel1 = ['국내샘플비', '해외샘플비', '견본발송비'];
		var sel2 = ['매장소품(VMD-only)'];
		
		if (checked == " "){
			f2.empty();
			f2.attr('data-dsl', '{{cSel_}}');
		}
		 if (checked == "견본비"){
			f2.empty();
			for (var i=0; i<sel1.length; i++){
				f2.append("<option value="+sel1[i]+">"+sel1[i]+"</option>");
			}
			f2.attr('data-dsl', '{{cSel_국내샘플비_해외샘플비_견본발송비}}');
		}
		else if (checked == "광고비(VMD)"){
			f2.empty();
			for (var i=0; i<sel2.length; i++){
				f2.append("<option value="+sel2[i]+">"+sel2[i]+"</option>");
			}
			f2.attr('data-dsl', '{{cSel_매장소품(VMD only)}}');
		}
	},

	//select box 초기화
	_init : function() {
		$('.copiedRow:last .type select').val(' ');
		$('.copiedRow:last .type select').attr('data-dsl', '{{cSel_ _견본비_광고비(VMD)}}');
		$('.copiedRow:last .type select').attr('data-selectval', ' ');
		$('.copiedRow:last .subtype select').empty();
	},

	//값 선택에 따른 코드 노출
	_PS_CODE : function() {
		$("#dynamic_table2 tr").each(function(i, e){
			 if ($(e).find('.subtype')[0]) {
				var checked2 = $(e).find('.subtype select option:selected').val();
				var ps_code = "";
				
				if(checked2=="국내샘플비"||checked2=="해외샘플비") ps_code = "6030";
				else if(checked2=="견본발송비") ps_code = "8454";
				else if(checked2=="매장소품(VMD-only)") ps_code = "7810";
				else ps_code = "";

				$(e).find(".ps_code").text(ps_code); 
			 }
		});
	},

	renderViewMode : function(){$('.viewModeHiddenPart').hide();}, //전자결재 문서 조회 폼 렌더링  * 읽기모드에서 함수가 필요한 경우 구현
	onEditDocument : function(){this.render();},
	beforeSave :function() { //전자결재 결재요청/저장 클릭 후 서버에 전송되기 직전 호출
		//선택 값에 따른 subject 변경
		var Sel_subject = $('.Sel_subject span input:checked').val();
		var Subject= Sel_subject + " 제목";
		$(".Title_subject").text(Subject);
		$("#subject").attr('value',Subject);
		$("#subject").attr('data-value',Subject);
	},
	afterSave :function() {$('.viewModeHiddenPart').hide();}, // 전자결재 서버에 문서가 저장된 후 호출
	validate :function() { //전자결재 결재요청/저장 전 데이터 유효성 검사 수행
		//승인자 지정 필수
		var check = $('[data-group-seq=1]').text();
		if(check=="") {
			$.goError("승인자 지정은 필수입니다.")
			return false;
		}
		else {
			var D = new Date();
			var draftTime;
			var H = D.getHours();
			var M = D.getMinutes();

			if(H<10) H="0"+H;
			if(M<10) M="0"+M;
			
			draftTime = H + "시 " + M + "분";
			$('.draftTime').text(draftTime);
			return true;
		}
	},
	getDocVariables : function(){} // 사용자 입력값 외 별도의 변수를 전송하고자 할 때 구현
	//주의: $('#document_content').getDocVariables()의 리턴값을 확장해서 반환해야 한다.
});
return Integration;