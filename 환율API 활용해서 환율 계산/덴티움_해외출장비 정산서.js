var $ = require("jquery");
var app = require("app");
var Backbone = require("backbone");
var _ = require('underscore');

// ***** 화폐 단위 매핑 ***** //
// 2025-12-30 statisticTableCode (통계표)코드, statisticItemCode (통계항목)코드 추가
// 별도로 추가할경우 아래 형식대로 추가 및 화면 샐렉트박스에 동일한 나라명으로 추가해두기
let currencyMap = {
    "중국": {
        curUnitStr: "CNY",
        curUnitPrint: "¥",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000053"
    },
    "일본": {
        curUnitStr: "JPY",
        curUnitPrint: "¥",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000002"
    },
    "스위스": {
        curUnitStr: "CHF",
        curUnitPrint: "CHF",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000014"
    },
    "홍콩": {
        curUnitStr: "HKD",
        curUnitPrint: "HK$",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000015"
    },
    "싱가폴": {
        curUnitStr: "SGD",
        curUnitPrint: "S$",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000024"
    },
    "두바이(UAE)": {
        curUnitStr: "AED",
        curUnitPrint: "AED",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000023"
    },
    "태국": {
        curUnitStr: "THB",
        curUnitPrint: "฿",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000028"
    },
    "말레이시아": {
        curUnitStr: "MYR",
        curUnitPrint: "RM",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000025"
    },
    "튀르키예(터키)": {
        curUnitStr: "TRY",
        curUnitPrint: "₺",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000050"
    },
    "멕시코": {
        curUnitStr: "MXN",
        curUnitPrint: "Mex$",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000040"
    },
    "대만": {
        curUnitStr: "TWD",
        curUnitPrint: "NT$",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000031"
    },
    "카자흐스탄": {
        curUnitStr: "KZT",
        curUnitPrint: "₸",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000033"
    },
    "인도네시아": {
        curUnitStr: "IDR",
        curUnitPrint: "Rp",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000029"
    },
    "베트남": {
        curUnitStr: "VND",
        curUnitPrint: "₫",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000035"
    },
    "헝가리": {
        curUnitStr: "HUF",
        curUnitPrint: "Ft",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000044"
    },
    "독일": {
        curUnitStr: "EUR",
        curUnitPrint: "€",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000003"
    },
    "스페인": {
        curUnitStr: "EUR",
        curUnitPrint: "€",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000003"
    },
    "러시아": {
        curUnitStr: "RUB",
        curUnitPrint: "₽",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000043"
    },
    "영국": {
        curUnitStr: "GBP",
        curUnitPrint: "£",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000012"
    },
    "아랍에미리트(UAE)": {
        curUnitStr: "AED",
        curUnitPrint: "AED",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000023"
    },
    "남아프리카공화국": {
        curUnitStr: "ZAR",
        curUnitPrint: "R",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000051"
    },
    "유로국가(공통)": {
        curUnitStr: "EUR",
        curUnitPrint: "€",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000003"
    },
    "미국": {
        curUnitStr: "USD",
        curUnitPrint: "$",
		statisticTableCode: "731Y001",
		statisticItemCode: "0000001"
    }
};

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
        //        ex) 1    ...         2    ...                         ex) 1    ...         1    ...
        //                3    ...         4    ...         or                    2    ...         2    ...
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
                var newId =    settings.tableId+"_"+($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt;

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
			if($("#" + settings.tableId + " .copiedRow").length > 0) {
				$("#" + settings.tableId + " .copiedRow:last").remove();
			}
			// for (var i = 0; i < $('.' + settings.copyRowClass).length; i++) {}
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
		//문서가 생성된 시점. 최초 기안전일때
		if (self.docModel.docStatus == "CREATE" && self.docModel.docType == "DRAFT") {
			// 문서 생성시점에 환율 기준일을 지정, 가져오도록
			$('.curUnitDate input').val(moment().format('YYYY-MM-DD(ddd)'));
			self.getStatisticSearch();
		}
		
		debugger;
		//행 추가/삭제
		PlusMinusRow({
			tableId : "dynamic_table1",
			plusBtnId : "plus1", 
			minusBtnId : "minus1",
			copyRowClass : "copyRow1",
			copyRowNoClass : "copyRowNo1",
			rowspanClass : "rowspanTd1",
			minusRowCallback : function() {
				self.calPrice();
			},
			plusRowCallback : function() {}
		});

		PlusMinusRow({
			tableId : "dynamic_table2",
			plusBtnId : "plus2", 
			minusBtnId : "minus2",
			copyRowClass : "copyRow1",
			copyRowNoClass : "copyRowNo1",
			rowspanClass : "rowspanTd1",
			minusRowCallback : function() {
				self.calPrice();
			},
			plusRowCallback : function() {}
		});
		
		$(".curUnit select, .curUnitDate input").on("change", function(){
			self.checkCurUnit();
			self.calPrice();
		});

		$("#dynamic_table2 .priceWon input").on("change", function(){
			self.domesticCalPrice();
		});
		
		$("#dynamic_table1 .payType select, #dynamic_table2 .payType select").on("change", function(){
			self.calcAccountsPayable();
		});
			
		$(".selectedItem select, .price input, .foreignPrice input, .priceWon input, .excBud input, .sum_price1 input, .sum_price2 input, .sum_price3 input, .sum_price4 input, .sum_price5 input, .setPriceForgn input, .setPriceKor input").on("change", function() {
			self.calPrice();

			let value = $(this).val().replace(/,/g, "");
			if (!isNaN(value) && value !== "") {
				$(this).val(Number(value).toLocaleString()); // 숫자로 변환 후 콤마 추가
			}
		});
	},
	
	// 미지급금분류
	calcAccountsPayable : function() {
		let self = this;
		let per_ap = 0; // 개인정산
		let corp_ap = 0; // 법인카드
		let biz_ap = 0; // 사업비카드
		$('.priceWon').each(function(i, e) {
			let targetTr = $(e).closest('tr');
			let priceWon = parseFloat($(e).find('input').val().replace(/\,/g, '') || 0);
			switch($(targetTr).find('.payType select').val()) {
			case "개인정산" :
				per_ap += priceWon;
				break;
			case "법인카드" :
				corp_ap += priceWon;
				break;
			case "사업비 카드" :
				biz_ap += priceWon;
				break;
			}
		});
		$('.per_ap input').val(per_ap);
		$('.corp_ap input').val(corp_ap);
		$('.biz_ap input').val(biz_ap);
		$('.total_ap input').val(GO.util.numberWithCommas(parseInt(per_ap + corp_ap + biz_ap, 10)));
	},

	getPriceWon : function(price) {
		let self = this;
		let priceWon = 0;
		let curUnitDate = moment($('.curUnitDate input').val(), 'YYYY-MM-DD(ddd)');
		if(!curUnitDate.isValid()) {
			$.goMessage('환율 기준일을 선택해주세요.');
		} 
		let getStatistic = currencyMap[$('.curUnit select').val()][curUnitDate.format('YYYYMMDD')];
		if(getStatistic) {
			if(/\d/.test(getStatistic['ITEM_NAME1'])) {
				const numberOnly = getStatistic['ITEM_NAME1'].replace(/[^0-9]/g, '');
				price = price / parseFloat(numberOnly); // 엔화, 동, 루피아의경우 계산을 다르게해야함
			}
			priceWon = price * parseFloat(getStatistic['DATA_VALUE']); // * 출장계획서 테이블 KRW 자동계산
			return priceWon.toFixed(2);
		} 
		return priceWon.toFixed(2);
	},
	
	// ===== KRW 계산 (화폐 단위에 따른 환율 API 호출) ===== 
	getStatisticSearch : function() {
		let self = this;
		// json 형태 요청, kr - 언어구분, 요청건수 1 ~ 10건까지, 주기 - D 주기(년:A, 반년:S, 분기:Q, 월:M, 반월:SM, 일: D)
		let queryString = "/kr/1/10/statisticTableCode/D/curUnitDate/curUnitDate/statisticItemCode";
		let curUnitDate = moment($('.curUnitDate input').val(), 'YYYY-MM-DD(ddd)'); // 환율 기준일
		if(curUnitDate.isValid()) {
			let curUnit = $('.curUnit select').val();
			let currency = currencyMap[curUnit];
			// 환율 기준일자에 해당하는 데이터가 없으면 API 조회
			if(!currencyMap[curUnit][curUnitDate.format('YYYYMMDD')]) {
				queryString = queryString.replaceAll('curUnitDate', curUnitDate.format('YYYYMMDD'));
				for (let key in currency) {
					queryString = queryString.replace(key, currency[key]);
				}
				self.getSearch(queryString);
			}
		} else {
			$.goMessage('환율 기준일을 선택해주세요.');
		}
	},
	
	getSearch : function(queryString) {
		let self = this;
		$.ajax({
			url: GO.contextRoot + 'api/bank/korea/statistic', // 호출할 API 주소
			type: "GET",
			dataType: "json",
			async: false,
			data: {
				'queryString' : queryString
			},
			success: function (response) {
				let curUnitDate = moment($('.curUnitDate input').val(), 'YYYY-MM-DD(ddd)').format('YYYYMMDD'); // 환율 기준일
				let data = JSON.parse(response.data);
				if(data['StatisticSearch']) {
					statisticSearch = data['StatisticSearch']['row']['0'];
					console.log('statisticSearch', statisticSearch)
					currencyMap[$('.curUnit select').val()][curUnitDate] = statisticSearch;
				} else {
					$.goMessage(`환율기준일 ${curUnitDate}에 해당하는 데이터를 조회하지못하였습니다.`);
				}
			},
			error: function (xhr, status, error) {
				console.error("API 오류:", error);
				$.goMessage('환율 조회에 실패하였습니다. 환율 기준일을 변경하였을때에도 동일한 메세지가 발생한다면 담당자에게 문의해주세요.');
			}
		});
	},
	
    // * 기타(국내) [항목란을 사용할것인지 확인한 이후 로직 재작성하기]
	domesticCalPrice : function() {
		let self = this;
		let totalPriceWon = 0;
		$('#dynamic_table2 tr').each(function(i, e) {
			if($(e).find('.priceWon').length > 0) {
				let priceWon = parseInt($(e).find('.priceWon input').val().replace(/\,/, '') || 0, 10);
				totalPriceWon += priceWon;
			}
		});
		$('.setPriceKor:eq(5) input').val(totalPriceWon);
		self.calPrice();
	},
	
	// * 출장계획서 관련문서 첨부 必
	calPrice : function() {
		let self = this;
		var sum_price1 = 0; // 숙박
		var sum_price2 = 0; // 식대
		var sum_price3 = 0; // 교통비
		var sum_price4 = 0; // 기타
		var sum_price5 = 0; // 통신비

		$("#dynamic_table1 tr").each(function(i, e){
			if ($(e).find(".price").length > 0) {
				var selectedItem = $(e).find(".selectedItem select").val() || "";    // 현재 선택된 항목값
				var price = parseFloat($(e).find(".price input").val().replace(/,/g, ""));    if (isNaN(price)) price = 0; // (현지)사용금액
				// 현재 행 USD에 해당하는 부분 >> 입력된 (현지)사용금액 자동입력
				$(e).find(".foreignPrice input").val(GO.util.numberWithCommas(price.toFixed(2)));     
				// ===== KRW 계산 (환율 API) =====
				var priceWonVal = parseFloat(self.getPriceWon(price));
				$(e).find(".priceWon input").val(GO.util.numberWithCommas(priceWonVal));
				// 항목별 합계금액 구하기
				// sum_price1 += price; 같은 부분 화면상에서 숙박 관련 입력란에 외화 $ 표시가 되어있는데 KRW 금액이 적혀져있어 혹시몰라 추가적으로 수정함 수정전이 맞다면 삭제
				if (selectedItem.includes("숙박")) {
					// sum_price1 += priceWonVal;
					sum_price1 += price;
				} else if (selectedItem.includes("식대")) {
					// sum_price2 += priceWonVal;
					sum_price2 += price;
				} else if (selectedItem.includes("교통")) {
					// sum_price3 += priceWonVal;
					sum_price3 += price;
				} else if (selectedItem.includes("기타")) {
					// sum_price4 += priceWonVal;
					sum_price4 += price;
				} else if (selectedItem.includes("통신")) {
					// sum_price5 += priceWonVal;
					sum_price5 += price;
				}
			}
		});

		var total_sum_price = sum_price1 + sum_price2 + sum_price3 + sum_price4 + sum_price5; // 총계
		total_sum_price = total_sum_price || 0;
		// 예산 VS 사용금액 정산 [사용금액 계산 후 자동입력]
		$(".sum_price1 input").val(GO.util.numberWithCommas(sum_price1.toFixed(2))); // 숙박
		$(".sum_price2 input").val(GO.util.numberWithCommas(sum_price2.toFixed(2))); // 식대
		$(".sum_price3 input").val(GO.util.numberWithCommas(sum_price3.toFixed(2))); // 교통비
		$(".sum_price4 input").val(GO.util.numberWithCommas(sum_price4.toFixed(2))); // 기타
		$(".sum_price5 input").val(GO.util.numberWithCommas(sum_price5.toFixed(2))); // 통신비
		$(".total_sum_price input").val(GO.util.numberWithCommas(total_sum_price.toFixed(2))); // 사용금액 총액


		// 정산금액 계산
		var total_setPriceForgn = 0;    // 정산금액(USD) 총계 계산
		var total_setPriceKor = 0;    // 정산금액(KRW) 총계 계산
		$("#budVSprice tr").each(function(i, e) {
			if ($(e).find(".excBud").length > 0) {
				// #budVSprice tr 에 첫번재 td 텍스트가 "숙박"이면 sum_price1 값을 가져와서 계산하고, "식대"이면 sum_price2 값을 가져와서 계산하려고 함
				var itemName = $(e).find("td:first").text().trim();
				// 현재 행 예산초과
				var excBud = parseFloat($(e).find(".excBud input").val().replace(/,/g, ""));    if (isNaN(excBud)) excBud = 0;
				var setPriceForgn = 0;
				// 정산금액(USD) 계산
				if (itemName.includes("숙박")) {
					setPriceForgn = sum_price1 - excBud;
				} else if (itemName.includes("식대")) {
					setPriceForgn = sum_price2 - excBud;
				} else if (itemName.includes("교통")) {
					setPriceForgn = sum_price3 - excBud;
				} else if (itemName.includes("기타")) {
					setPriceForgn = sum_price4 - excBud;
				} else if (itemName.includes("통신")) {
					setPriceForgn = sum_price5 - excBud;
				}
				// 계산한 정산금액 USD 텍스트박스(input)에 자동입력
				$(e).find(".setPriceForgn input").val(GO.util.numberWithCommas(setPriceForgn.toFixed(2)));
				total_setPriceForgn += setPriceForgn; // 정산금액 USD 총계에 계산한 정산금액 USD 더하기

				// ===== 정산금액 KRW 계산 =====
				var setPriceKor = parseFloat(self.getPriceWon(setPriceForgn));
				// 계산한 정산금액 KRW 텍스트박스(input)에 자동입력
				$(e).find(".setPriceKor input").val(GO.util.numberWithCommas(setPriceKor.toFixed(0)));
				total_setPriceKor += setPriceKor; // 정산금액 KRW 총계에 계산한 정산금액 KRW 더하기
			}
		});
		// 정산금액 총계 표시
		$(".total_setPriceForgn input").val(GO.util.numberWithCommas(total_setPriceForgn.toFixed(2)));
		total_setPriceKor += parseInt($(".setPriceKor:eq(5) input").val().replace(/\,/g, '') || 0, 10); // 기타(국내)
		$(".total_setPriceKor input").val(GO.util.numberWithCommas(total_setPriceKor.toFixed(0)));
		self.calcAccountsPayable();
	},

	checkCurUnit : function() {
		let self = this;
		// 통화 단위 표시
		var country = $(".curUnit select").val();
		// 통화 표시
		$(".curUnitStr").text(currencyMap[country].curUnitStr);
		$(".curUnitPrint").text(currencyMap[country].curUnitPrint);
		self.getStatisticSearch();
	},

	renderViewMode : function(){$('.viewModeHiddenPart').hide();},
	onEditDocument : function(){this.render();},
	beforeSave :function() {$('.viewModeHiddenPart').hide();},
	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;