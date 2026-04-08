// 운용지시서 양식 정보 > JSON 형식으로 관리 >> 드롭박스에 해당 값이 들어가지 않는 경우 드롭박스 html 확인 필요 (아래 입력된 값과 동일해야 함)
let fundMap = {
  "CBRE GSA로지스틱스제1호전문투자형사모부동산자투자유한회사": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_GSA1_Acc",  // 펀드명 별 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "BRE GSA로지스틱스제1호전문투자형사모부동산자투자유한회사\n이사 CBRE 인베스트먼트매니지먼트자산운용주식회사",
      stampImgSrc: '<img id="stamp1" data-appcode="dop-employee-approval" data-filename="1f0d3cd8-423e-4714-bbbe-9529e7e3ed11.png" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/67f2300b-7865-4c39-a9d4-80325589d642" data-inline="true" style="width: 87px; height: 90px;" data-id="1490990465326067712" data-from="DaouOffice">',
  },
  "CBRE GSA로지스틱스제2호전문투자형사모부동산자투자유한회사": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_GSA2_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE GSA로지스틱스제2호전문투자형사모부동산자투자유한회사\n이사 CBRE 인베스트먼트매니지먼트자산운용주식회사",
      stampImgSrc: '<img id="stamp2" data-appcode="dop-employee-approval" data-filename="08b7d286-c225-4704-a367-936b3643473b.png" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/f821df9d-6fa2-4933-958d-41151c0c1cb9" data-inline="true" style="width: 88px; height: 90px;" data-id="1490990465820995584" data-from="DaouOffice">',
  },
  "CBRE GSA로지스틱스제1의1호전문투자형사모부동산모투자유한회사": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_GSA1_1_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE GSA로지스틱스제1의1호전문투자형사모부동산모투자유한회사\n이사 CBRE 인베스트먼트매니지먼트자산운용주식회사",
      stampImgSrc: '<img id="stamp3" data-appcode="dop-employee-approval" data-filename="2c47e39e-4c7b-4ca6-ace8-92b948dbef7b.jpeg" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/a6735b63-34b1-46c4-8d49-c9a9a315fa5f" data-inline="true" style="width: 88px; height: 90px;" data-id="1490990466269786112" data-from="DaouOffice">',
  },
  "CBRE GSA로지스틱스제1의2호전문투자형사모부동산모투자유한회사": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_GSA1_2_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE GSA로지스틱스제1의2호전문투자형사모부동산모투자유한회사\n이사 CBRE 인베스트먼트매니지먼트자산운용주식회사",
      stampImgSrc: '<img id="stamp4" data-appcode="dop-employee-approval" data-filename="63160ca0-17d3-4021-ae5f-6815660f8cd1.jpeg" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/5d81b472-0e19-435c-b153-d8e058275a55" data-inline="true" style="width: 87px; height: 90px;" data-id="1490990466752131072" data-from="DaouOffice">',
  },
  "CBRE GSA로지스틱스제1의3호전문투자형사모부동산모투자유한회사": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_GSA1_3_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE GSA로지스틱스제1의3호전문투자형사모부동산모투자유한회사\n이사 CBRE 인베스트먼트매니지먼트자산운용주식회사",
      stampImgSrc: '<img id="stamp5" data-appcode="dop-employee-approval" data-filename="e722d9fc-72d5-4b17-8436-7fcd3caddb6c.jpeg" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/0ee856b9-ee15-485e-a6af-412e2721ec7a" data-inline="true" style="width: 92px; height: 90px;" data-id="1490990467226087424" data-from="DaouOffice">',
  },
  "CBRE GSA로지스틱스제1의4호전문투자형사모부동산모투자유한회사": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_GSA1_4_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE GSA로지스틱스제1의4호전문투자형사모부동산모투자유한회사\n이사 CBRE 인베스트먼트매니지먼트자산운용주식회사",
      stampImgSrc: '<img id="stamp6" data-appcode="dop-employee-approval" data-filename="dcc7ccf8-a8c3-48b3-a7a0-c3f89357c951.jpeg" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/09f9e53f-c4cc-4989-ba1c-102edafeed96" data-inline="true" style="width: 88px; height: 90px;" data-id="1490990467704238080" data-from="DaouOffice">',
  },
  "CBRE GSA로지스틱스제1의5호전문투자형사모부동산모투자유한회사": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_GSA1_5_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE GSA로지스틱스제1의5호전문투자형사모부동산모투자유한회사\n이사 CBRE 인베스트먼트매니지먼트자산운용주식회사",
      stampImgSrc: '<img id="stamp7" data-appcode="dop-employee-approval" data-filename="dabd0fcb-d49c-4726-bde9-a9d5ea630a40.jpeg" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/fe470e39-1a55-45eb-8f37-cc812e62a944" data-inline="true" style="width: 89px; height: 90px;" data-id="1490990468215943168" data-from="DaouOffice">',
  },
  "CBRE 로지스밸리제1의6호전문투자형사모부동산모투자유한회사": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_GSA1_6_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE 로지스밸리제1의6호전문투자형사모부동산모투자유한회사\n이사 CBRE 인베스트먼트매니지먼트자산운용주식회사",
      stampImgSrc: '<img id="stamp8" data-appcode="dop-employee-approval" data-filename="6f387150-38ec-4bd0-98a7-2625e99921ab.png" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/a177c8db-a917-4c0a-b0c1-19ca936f1aa6" data-inline="true" style="width: 89px; height: 90px;" data-id="1490990468736036864" data-from="DaouOffice">',
  },
  "CBRE ILC전문투자형사모부동산자투자신탁제1호": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_ILC1_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE 인베스트먼트매니지먼트자산운용주식회사\n서울특별시 종로구 종로 47, 19층(공평동, 에스씨은행본점빌딩)\nT. 02 398 1555 /  F. 02 398 1556",
      stampImgSrc: '<img id="stamp9" data-appcode="dop-employee-approval" data-filename="36788fa1-13d1-4afd-9ad7-6c018b7c501f.png" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/091ac85f-97ee-4a5d-a64b-363a33154361" data-inline="true" style="width: 96px; height: 90px;" data-id="1490990469201604608" data-from="DaouOffice">',
  },
  "CBRE ILC일반사모부동산자투자신탁제2호": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_ILC2_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE 인베스트먼트매니지먼트자산운용주식회사\n서울특별시 종로구 종로 47, 19층(공평동, 에스씨은행본점빌딩)\nT. 02 398 1555 /  F. 02 398 1556",
      stampImgSrc: '<img id="stamp9" data-appcode="dop-employee-approval" data-filename="36788fa1-13d1-4afd-9ad7-6c018b7c501f.png" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/091ac85f-97ee-4a5d-a64b-363a33154361" data-inline="true" style="width: 96px; height: 90px;" data-id="1490990469201604608" data-from="DaouOffice">',
  },
  "CBRE ILC일반사모부동산모투자신탁제1-1호": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_ILC1_1_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE 인베스트먼트매니지먼트자산운용주식회사\n서울특별시 종로구 종로 47, 19층(공평동, 에스씨은행본점빌딩)\nT. 02 398 1555 /  F. 02 398 1556",
      stampImgSrc: '<img id="stamp9" data-appcode="dop-employee-approval" data-filename="36788fa1-13d1-4afd-9ad7-6c018b7c501f.png" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/091ac85f-97ee-4a5d-a64b-363a33154361" data-inline="true" style="width: 96px; height: 90px;" data-id="1490990469201604608" data-from="DaouOffice">',
  },
  "CBRE DL일반부동산사모투자회사": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_DL_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE DL일반부동산사모투자회사\n이사 CBRE 인베스트먼트매니지먼트자산운용주식회사",
      stampImgSrc: '<img id="stamp10" data-appcode="dop-employee-approval" data-filename="f3f4ad59-7491-4aae-b583-8886cd7d1e0b.png" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/0dd8d604-42c7-41d6-bac2-0863da25db35" data-inline="true" style="width: 96px; height: 90px;" data-id="1490990469717504000" data-from="DaouOffice">',
  },
  "CBRE 로지스밸리전문투자형사모부동산투자신탁제1호": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_1_Acc",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE 인베스트먼트매니지먼트자산운용주식회사\n서울특별시 종로구 종로 47, 19층(공평동, 에스씨은행본점빌딩)\nT. 02 398 1555 /  F. 02 398 1556",
      stampImgSrc: '<img id="stamp9" data-appcode="dop-employee-approval" data-filename="36788fa1-13d1-4afd-9ad7-6c018b7c501f.png" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/091ac85f-97ee-4a5d-a64b-363a33154361" data-inline="true" style="width: 96px; height: 90px;" data-id="1490990469201604608" data-from="DaouOffice">',
  },
  "CBRE NLC 부동산일반사모투자회사": {
      trustee: "하나은행",
      office: "KB펀드파트너스",
      activeAcc: ".CBRE_NLC",  // 펀드명 별 계좌 드롭박스 부분 (각각 클래스로 묶음)
      stampImgLeftStr: "CBRE NLC 부동산일반사모투자회사\n이사 CBRE 인베스트먼트매니지먼트자산운용주식회사",
      stampImgSrc: '<img id="stamp11" data-appcode="dop-employee-approval" data-filename="c32ea40a-77b0-48e6-b8c5-8473e795f94b.png" src="/api/thumb/attach/original/dop-employee-approval/PMS_SITE-1IUQFZO00I6NL/20260407/dee18211-7694-409a-94ae-b30a28616f6c" data-inline="true" style="width: 94px; height: 90px;" data-id="1490990470199848960" data-from="DaouOffice">',
  },
};
////////////////////////////////////////////////////////////


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
    var $tr = $("#" + settings.tableId + " ." + settings.copyRowClass).clone(true);

    /* 
    ---------------------------------------------------------
    수정 — 기존 코드에서는 펀드명이 “선택”이 아니면 무조건 hide 해서
    기타 input(.CBRE_defaultInput)이 사라지는 문제가 있었음.
    ---------------------------------------------------------
    */
    var selectedEtc = $tr.find(".selectEtc select").val();

    if (selectedEtc !== "기타") {
      $tr.find(".CBRE_defaultInput").hide();
    } else {
      $tr.find(".CBRE_defaultInput").show();
    }
    
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

    PlusMinusRow({
      tableId : "dynamic_table1",
      plusBtnId : "plus1", 
      minusBtnId : "minus1",
      copyRowClass : "copyRow1",
      copyRowNoClass : "copyRowNo1",
      minusRowCallback : function() {self.calAmount();},
      plusRowCallback : function() {self.calAmount();}
    });
    PlusMinusRow({
      tableId : "dynamic_table2",
      plusBtnId : "plus2", 
      minusBtnId : "minus2",
      copyRowClass : "copyRow2",
      copyRowNoClass : "copyRowNo2"
    });
    PlusMinusRow({
      tableId : "dynamic_table3",
      plusBtnId : "plus3", 
      minusBtnId : "minus3",
      copyRowClass : "copyRow3",
      copyRowNoClass : "copyRowNo3"
    });

		$('#select1').on('change', function(){
        self.checkFundOpt();
    });

    $('#select2').find('select').on('change',function(){
        self.checkText1();
    });

    // 기타 선택 시 input 보이도록 유지
    $(".selectEtc select").on("change", function () {
      var val = $(this).val();
      var input = $(this).closest("td").find('.CBRE_defaultInput');
      if(val === "기타") input.show();
      else input.hide();
    });

		$(".price input, .vat input").on("change",function(){
			self.calAmount();
		});

    // 임스소스
    $('.editor_slt').css({
      'width': '100%',
      'max-width': '100%',
      'box-sizing': 'border-box'
    });

		// 저장 후 불러오면 기타 input 다시 보이도록 복원
		this.restoreEtcInput();
	},

  // 펀드명별 정보 자동 입력
  checkFundOpt : function() {
    // $('#stamp img').hide();  // 펀드 사용인감도장 싹 화면에 안 보이게 숨기기 >> 안먹음 (주석처림)
    var select1 = $('#select1 select option:selected').val();

    // 실행 로직 > 선택된 펀드이름(key)으로 JSON 해당 펀드의 설정값(value) 가져옴 > 객체 매핑
    const targetAcc = fundMap[select1];

    if (targetAcc) {
      // 공통: 모든 계좌 입력창과 기본 입력창을 한 번에 숨김
      $('[class^="CBRE_"]').hide();

      // 해당 계좌 도장 이미지를 #stamp에 보여주기
      $('#stamp').html(targetAcc.stampImgSrc);

      // 해당 계좌 드롭박스만 보여주기
      $(targetAcc.activeAcc).show();
      
      $('#text').html(targetAcc.stampImgLeftStr);

      // 옵션값 변경 > 정확히 일치해야 변경(prop true 사용)
      $('.out1 select').val(targetAcc.trustee).prop("selected", true);
      $('.out2 select').val(targetAcc.office).prop("selected", true);
    } else {
      console.warn("매핑된 펀드 데이터가 없습니다. fundMap의 key값을 확인하세요.");
      $('[class^="CBRE_"]').hide();

      // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
      $('.CBRE_defaultInput').show();

    }
  },

  /* ----------------------------------------------------
      기타 input 복원 기능 — 새로 추가된 메서드
  ---------------------------------------------------- */
  restoreEtcInput : function(){
    $(".selectEtc select").each(function(){
      if($(this).val() === "기타"){
        $(this).closest("td").find(".CBRE_defaultInput").show();
      }
    });
  },

	checkText1 : function(){
		var select2 = $('#select2 select').val();
		if(select2 == '회계처리'){
			$('#dynamic_table2').hide();
			$('#dynamic_table1').show();
			$('#dynamic_table3').show();
		}else{
			$('#dynamic_table2').css('display','');
			$('#dynamic_table1').show();
			$('#dynamic_table3').show();
		}
	},
	
	calAmount : function(){
		var cur = 0;
		var sum_vat = 0;
		var sum_price = 0;
		var sum_cur = 0;

		$("#dynamic_table1 tr").each(function(i, e){
			 if ($(e).find('.price')[0]) {
				var vat = parseFloat($(e).find('.vat input').val().replace(/\,/g,"")); if (isNaN(vat)) vat = 0;
				var price = parseFloat($(e).find('.price input').val().replace(/\,/g,"")); if (isNaN(price)) price = 0;

				cur = vat + price;
				$(e).find(".cur").text(GO.util.numberWithCommas(cur));
				
				sum_vat += vat;
				sum_price += price;
				sum_cur += cur;
			}
		});
		$(".sum_vat").text("\\ "+GO.util.numberWithCommas(sum_vat));
		$(".sum_price").text("\\ "+GO.util.numberWithCommas(sum_price));
		$(".sum_cur").text("\\ "+GO.util.numberWithCommas(sum_cur));
	},

	renderViewMode : function(){
		$('.viewModeHiddenPart').hide();
	},

	onEditDocument : function(){
    this.render();
  },

  /* ----------------------------------------------------
     beforeSave에서 기타 input이 hide되지 않도록 수정
  ---------------------------------------------------- */
	beforeSave :function() {
    $('.viewModeHiddenPart').hide();
    $('#text span').hide();
    $('#stmap span').hide();

    // 기타 input hide 하지 않음
	},

	afterSave :function() {
		$('.viewModeHiddenPart').hide();
		this.renderViewMode();
	},

	validate :function() {
			var select1 = $('#select1').find('select').attr('data-selectval')
			
			if(select1 == "선택" || select1 == ""){
				$.goError('펀드명을 선택하시기 바랍니다.')
				return false;
			}else{
				return true;
			}
	},

	getDocVariables : function(){}
});

return Integration;
