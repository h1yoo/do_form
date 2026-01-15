var $ = require("jquery");
var Backbone = require("backbone");

/* =========================================================================
   [모듈] PlusMinusRow: 행 추가/삭제 기능 (첫 번째 방식)
   ========================================================================= */
var PlusMinusRow = function (options) {
    var defaults = {
        maxRow: 0,
        copyRowNoSize: 1
    };

    var settings = $.extend({}, defaults, options);
    var plusCnt;

    // 초기 plusCnt 설정
    if ($("#" + settings.tableId + " .copiedRow")[0] === undefined) {
        plusCnt = 1;
    } else {
        if (!$($("#" + settings.tableId + " ." + settings.copyRowClass + " td")[0]).attr("rowspan")) {
            plusCnt = $("#" + settings.tableId + " .copiedRow").length + 1;
        } else {
            var rowCnt = parseInt($($("#" + settings.tableId + " ." + settings.copyRowClass + " td")[0]).attr("rowspan"));
            plusCnt = ($("#" + settings.tableId + " .copiedRow").length + rowCnt) / rowCnt;
        }
    }

    // 행 추가 이벤트
    $("#" + settings.plusBtnId).off('click').on('click', function () {
        if ($("#" + settings.tableId + " ." + settings.copyRowClass).length + $("#" + settings.tableId + " .copiedRow").length < settings.maxRow || settings.maxRow == 0) {
            plusRow();
            plusCnt++;
        }
    });

    // 행 삭제 이벤트
    $("#" + settings.minusBtnId).off('click').on('click', minusRow);

    function plusRow() {
        var $tr = $("#" + settings.tableId + " ." + settings.copyRowClass).clone(true);
        $tr.show();

        // 순번 처리 (옵션)
        if (settings.copyRowNoClass && $("#" + settings.tableId + " ." + settings.copyRowNoClass)[0] !== undefined) {
            var copyRowNoCnt = $tr.find("." + settings.copyRowNoClass).length;
            for (var i = 0; i < copyRowNoCnt; i++) {
                var newNo = parseInt($($tr.find("." + settings.copyRowNoClass)[i]).text()) + settings.copyRowNoSize * plusCnt;
                $($tr.find("." + settings.copyRowNoClass)[i]).text(newNo);
            }
        }

        // 클래스 재설정 및 초기화
        var i = 1;
        $.each($tr, function (k, v) {
            $(v).removeClass(settings.copyRowClass).addClass('copiedRow');
            initComponent($(v), i++);
        });

        // 테이블에 추가
        if ($("#" + settings.tableId + " .copiedRow")[0] === undefined) {
            $("#" + settings.tableId + " ." + settings.copyRowClass + ":last").after($tr);
        } else {
            $("#" + settings.tableId + " .copiedRow:last").after($tr);
        }

        // 콜백 실행
        if (typeof settings.plusRowCallback == 'function') {
            settings.plusRowCallback($tr);
        }
    }

    function initComponent($tr, i) {
        // 값 초기화
        $tr.find('input').not(':checkbox, :radio').val('');
        $tr.find('input:checkbox, input:radio').prop('checked', false);
        $tr.find('textarea').val('');
        $tr.find('select').each(function () {
            $(this).find('option:first').prop('selected', true);
        });
    }

    function minusRow() {
        if ($("#" + settings.tableId + " .copiedRow")[0] !== undefined) {
            $("#" + settings.tableId + " .copiedRow:last").remove();
            plusCnt--;

            if (typeof settings.minusRowCallback == 'function') {
                settings.minusRowCallback();
            }
        }
    }
};

/* =========================================================================
   [데이터] 거래처 목록
   ========================================================================= */
var clientList = [
    "(株)インターナショナルコミュニケーション(日本観光新聞)", "Alipay Korea", "Amex", "Apple Korea", "ArchSeoul",
    "AREX(申請時GAに相談必須)(신청시GA에 상담필수)", "BandaiNamcoKorea", "BC Card", "BNK Busan Bank", "Bomsen",
    "BridgeM", "CCMS", "Daou Technology", "DAOUDATA", "Dentsu Korea", "Designbit", "Ebridge", "ENTRUST",
    "Eximbay", "expedia", "Fime Korea", "GLN", "Gmarket", "Gorilla District", "GS25", "Hana Bank", "Hana Card",
    "Hanul LLC", "IBK Bank", "ICTK", "INSPIRE Entertainment Resort", "Japan Airlines", "JCB", "JR九州", "K&C",
    "Kakao bank", "Kakao Mobility", "Kayak/Hotels Combined", "KB Card", "KCP", "KFTC", "KICC", "KIS", "KOCES",
    "KOREA HD", "KOVAN", "KPN", "KS NET", "Kukje Bldg.", "Lord System", "Lotte Card", "Lotte Global Logistics",
    "Lotte Mart", "MAEKYUNG MEDIA GROUP", "Malltail", "Mercury Project(덴츠코리아 관련 마케팅 대행사 협력사)",
    "Master Card", "Mercury Project", "Moxie", "Naver Financial", "NH Bank", "NH Card", "NICE", "NICE PAYMENT",
    "Nishitetsu", "Olive Young", "Orange Square", "Paradise Group", "Payco", "Samsung Card", "Samsung Electronics",
    "SCSPRO", "SECTANINE", "Seol Studio", "Shinhan Card", "Shinsegae I&C", "SJC", "SMARTIX", "SMARTRO", "Snow on Card",
    "Starbucks Korea", "T.P Micronesia, Inc", "The North Face", "TIDESQUARE", "T-money", "Toss", "Toss Bank",
    "Tourism EXPO Japan", "Travel Wallet", "Trip.com", "Unionpay", "USJ Korea Office", "Vectorcom", "Visa Card",
    "Widemobile", "Woori Card", "X-GOLF", "Zeropay", "デロイト安進会計法人", "ロッテ免税店", "明洞商人協会",
    "未定(미정)", "富邦銀行（Taipei Fubon Commercial Bank）", "星野リゾート", "新羅I-park免税店",
    "与信金融協会(신청시 GA상담 필요)", "株式会社星野リゾート", "韓日文化産業交流協会", "現代百貨店免税店",
    "株式会社日専連", "Golf Magazine"
];

/* =========================================================================
   [메인] Integration View
   ========================================================================= */
var Integration = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
        this.docModel = this.options.docModel;
    },

    render: function () {
        var self = this;

        // 1. 거래처 입력창 잠금 (직접 입력 방지)
        self.lockClientName();

        // 2. 증답 선택 시 안내 문구 자동 입력
        // HTML의 .selectBox 가 있는 td 내부의 select를 찾음
        $('.selectBox select').off('change.giftGuide').on('change.giftGuide', function () {
            var selectedVal = $(this).val() || '';
            // "증답" 또는 "贈答"이 포함되어 있는지 확인
            var isGift = (selectedVal.indexOf('증답') > -1 || selectedVal.indexOf('贈答') > -1);
            
            // #giftTarget ID를 가진 td 내부의 textarea나 input 찾기
            var $target = $('#giftTarget').find('textarea, input').first();

            if ($target.length > 0) {
                if (isGift) {
                    if (!$target.val().trim()) $target.val('증답 내용을 기재해 주세요.');
                } else {
                    if ($target.val() === '증답 내용을 기재해 주세요.') $target.val('');
                }
            }
        });
		
		 // 2-1. 사후신청 선택 시 안내 문구 자동 입력
        // HTML의 .selectBox2 가 있는 td 내부의 select를 찾음
        $('.selectBox2 select').off('change.giftGuide').on('change.giftGuide', function () {
            var selectedVal = $(this).val() || '';
            // "사후신청"이 포함되어 있는지 확인
            var isGift = (selectedVal.indexOf('사후신청') > -1 || selectedVal.indexOf('사후신청') > -1);
            
            // #giftTarget2 ID를 가진 td 내부의 textarea나 input 찾기
            var $target = $('#giftTarget2').find('textarea, input').first();

            if ($target.length > 0) {
                if (isGift) {
                    if (!$target.val().trim()) $target.val('사후신청 시 정당한 이유를 입력해주세요.');
                } else {
                    if ($target.val() === '사후신청 시 정당한 이유를 입력해주세요.') $target.val('');
                }
            }
        });

        // 3. 거래처 찾기 팝업 버튼 이벤트
        $(document).off('click.openClientPopup', '.btn-search-client').on('click.openClientPopup', '.btn-search-client', function (e) {
            e.preventDefault();
            self.openPopup($(this).closest('tr'));
        });

        // 4. 행 추가/삭제 기능 적용 (PlusMinusRow 사용)
        
        // 4-1. 거래처 목록 (id="tbl_partner" 필요)
        PlusMinusRow({
            tableId: "tbl_partner",
            plusBtnId: "plus1",
            minusBtnId: "minus1",
            copyRowClass: "copyRow1",
            // copyRowNoClass: "rowNo1", // 순번 클래스가 없으면 생략 가능
            plusRowCallback: function ($newRow) {
                // 행 추가 후 콜백: 새 행의 거래처 입력창 잠금 & 인원수 재계산 & 최종금액 재계산
                self.lockClientName($newRow);
                self.calInputNumber('.copiedRow1', '.inputNumber1 input', '.Total_inputNumber1');
                self.calFinalAmount();
            },
            minusRowCallback: function () {
                self.calInputNumber('.copiedRow1', '.inputNumber1 input', '.Total_inputNumber1');
                self.calFinalAmount();
            }
        });

        // 4-2. 당사 목록 (id="tbl_ourCompany" 필요)
        PlusMinusRow({
            tableId: "tbl_ourCompany",
            plusBtnId: "plus2",
            minusBtnId: "minus2",
            copyRowClass: "copyRow2",
            // copyRowNoClass: "rowNo2",
            plusRowCallback: function () {
                self.calInputNumber('.copiedRow2', '.inputNumber2 input', '.Total_inputNumber2');
                self.calFinalAmount();
            },
            minusRowCallback: function () {
                self.calInputNumber('.copiedRow2', '.inputNumber2 input', '.Total_inputNumber2');
                self.calFinalAmount();
            }
        });

        // 5. 초기 계산 실행 및 변경 감지 이벤트 바인딩
        self.calInputNumber('.copiedRow1', '.inputNumber1 input', '.Total_inputNumber1');
        self.calInputNumber('.copiedRow2', '.inputNumber2 input', '.Total_inputNumber2');

        // 비용 변경 시
        $('.Amount1 input, .Amount2 input').off('change keyup').on('change keyup', function () {
            self.calTotalAmount();
            self.calRate();
            self.calFinalAmount();
        });

        // 인원수 변경 시
        $('.inputNumber1 input, .inputNumber2 input').off('change').on('change', function () {
            if ($(this).closest('span').hasClass('inputNumber1') || $(this).parents('.inputNumber1').length) {
                self.calInputNumber('.copiedRow1', '.inputNumber1 input', '.Total_inputNumber1');
            } else {
                self.calInputNumber('.copiedRow2', '.inputNumber2 input', '.Total_inputNumber2');
            }
            self.calFinalAmount();
        });
    },

    // -------------------------------------------------------------------------
    // [기능 함수들]
    // -------------------------------------------------------------------------

    // 거래처명 입력란 잠금 (팝업으로만 입력)
    lockClientName: function (scope) {
        var $scope = scope ? $(scope) : $(document);
        $scope.find('.clientName input').attr('readonly', true)
            .off('keydown paste drop').on('keydown paste drop', function (e) { e.preventDefault(); });
    },

    // 최종 1인당 금액 계산
    calFinalAmount: function () {
        var JPN_TotalAmount = Number(($('.JPN_TotalAmount').text() || '0').replace(/,/g, ''));
        var Total_inputNumber1 = Number(($('.Total_inputNumber1').text() || '0').replace(/,/g, ''));
        var Total_inputNumber2 = Number(($('.Total_inputNumber2').text() || '0').replace(/,/g, ''));

        var denom = (Total_inputNumber1 + Total_inputNumber2);
        var result = denom ? (JPN_TotalAmount / denom) : 0;

        $('.FinalAmount').text(GO.util.formatNumber(result.toFixed(0), { "decimalPoints": 0 }));
    },

    // 환율 적용 계산 (0.106)
    calRate: function () {
        var Amount1 = Number(($('.Amount1 input').val() || '0').replace(/,/g, ""));
        var Amount2 = Number(($('.Amount2 input').val() || '0').replace(/,/g, ""));
        var TotalAmount = Number(($('.TotalAmount').text() || '0').replace(/,/g, ""));
        var rate = Number(($('.JPN_rate').text() || '0').replace(/,/g, "")); // HTML에 0.106 텍스트가 있어야 함

        $('.JPN_Amount1').text(GO.util.formatNumber((Amount1 * rate).toFixed(0)));
        $('.JPN_Amount2').text(GO.util.formatNumber((Amount2 * rate).toFixed(0)));
        $('.JPN_TotalAmount').text(GO.util.formatNumber((TotalAmount * rate).toFixed(0)));
    },

    // 비용 합계 계산 및 예산 유무 체크
    calTotalAmount: function () {
        var Amount1 = Number(($('.Amount1 input').val() || '0').replace(/,/g, ""));
        var Amount2 = Number(($('.Amount2 input').val() || '0').replace(/,/g, ""));
        
        $('.TotalAmount').text(GO.util.numberWithCommas(Amount1 + Amount2));

        if (Amount1 > 0) {
            $('.BudgetStatus input').val('있음(有)');
        } else {
            $('.BudgetStatus input').val('없음(無)');
        }
    },

    // 인원수 합계 계산 (행 개수 + 기타 인원)
    calInputNumber: function (copiedRowClass, inputNumberClass, inputTotalNumberClass) {
        // 복사된 행(.copiedRow) 개수 + 기본 행 1개
        var rowNo = $(copiedRowClass).length + 1; 
        
        // 기타 인원수 입력값
        var inputNo = Number(($(inputNumberClass).val() || '0').replace(/,/g, ""));
        
        $(inputTotalNumberClass).text(rowNo + inputNo);
    },

    // 팝업 열기
    openPopup: function (trEl) {
        var self = this;
        var contentHtml = `
            <style>
                .pop-search-wrap { padding: 15px; background: #f8f8f8; text-align: center; border-bottom: 1px solid #e8e8e8; }
                .pop-search-input { width: 220px; padding: 5px; border: 1px solid #ddd; border-radius: 3px; outline: none; }
                .pop-search-btn { display: inline-block; padding: 5px 12px; margin-left: 5px; border: 1px solid #ccc; background: #fff; border-radius: 3px; cursor: pointer; color: #555; font-size: 12px; }
                .pop-search-btn:hover { background: #f0f0f0; border-color: #bbb; color: #333; }
                .pop-table-header { width: 100%; border-collapse: collapse; table-layout: fixed; }
                .pop-table-header th { background: #f3f3f3; padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: bold; color: #555; font-size: 13px; }
                .pop-list-container { height: 350px; overflow-y: auto; border-bottom: 1px solid #ddd; }
                .pop-table-body { width: 100%; border-collapse: collapse; table-layout: fixed; }
                .pop-table-body td { padding: 8px 10px; border-bottom: 1px solid #eee; vertical-align: middle; font-size: 13px; color: #444; }
                .pop-table-body tr:hover { background-color: #f0f8ff; }
                .btn-choice { padding: 4px 12px; border: 1px solid #ccc; background-color: #fff; color: #555; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.2s; }
                .btn-choice:hover { border-color: #888; background-color: #666; color: #fff; }
                .text-wrap { white-space: normal; word-break: break-all; display: block; text-align: left; line-height: 1.4; }
            </style>
            <div class="go_renew">
                <div class="pop-search-wrap">
                    <input type="text" id="popKeyword" class="pop-search-input" placeholder="거래처명 입력">
                    <span id="btnPopSearch" class="pop-search-btn">검색</span>
                </div>
                <table class="pop-table-header">
                    <colgroup><col width="*"><col width="80"></colgroup>
                    <thead><tr><th>업체명</th><th>선택</th></tr></thead>
                </table>
                <div class="pop-list-container">
                    <table class="pop-table-body">
                        <colgroup><col width="*"><col width="80"></colgroup>
                        <tbody id="popListBody"></tbody>
                    </table>
                </div>
            </div>
        `;

        $.goPopup({
            header: '거래처 선택',
            width: 450,
            modal: true,
            contents: contentHtml,
            openCallback: function (popupEl) {
                self.drawList(clientList, popupEl);

                popupEl.find('#btnPopSearch').on('click', function () { self.searchList(popupEl); });
                popupEl.find('#popKeyword').on('keydown', function (e) { if (e.keyCode === 13) self.searchList(popupEl); });

                popupEl.find('#popListBody').on('click', '.btn-choice', function () {
                    var selectedName = $(this).data('name');
                    if ($('.clientName').length > 0) {
                        $(trEl).find('.clientName input').val(selectedName);
                    } else {
                        alert("입력할 위치(class='clientName')가 없습니다.");
                    }
                    $.goPopup.close();
                });
            },
            buttons: [{ btype: 'normal', btext: '닫기', autoclose: true }]
        });
    },

    searchList: function (popupEl) {
        var keyword = popupEl.find('#popKeyword').val().trim().toLowerCase();
        if (!keyword) {
            this.drawList(clientList, popupEl);
            return;
        }
        var filtered = clientList.filter(function (name) {
            return name.toLowerCase().indexOf(keyword) > -1;
        });
        this.drawList(filtered, popupEl);
    },

    drawList: function (data, popupEl) {
        var $tbody = popupEl.find('#popListBody');
        $tbody.empty();
        if (data.length === 0) {
            $tbody.append('<tr><td colspan="2" style="text-align:center; padding:20px; color:#999;">검색 결과가 없습니다.</td></tr>');
            return;
        }
        $.each(data, function (i, name) {
            var coloredName = name.replace(/(\([^)]*(신청|申請)[^)]*\))/g, '<span style="color:red;">$1</span>');
            var row = `<tr><td><span class="text-wrap">${coloredName}</span></td><td style="text-align:center;"><button type="button" class="btn-choice" data-name="${name}">선택</button></td></tr>`;
            $tbody.append(row);
        });
    },

    // 기본 함수
    renderViewMode: function () {
        $(".viewModeHiddenPart").hide();
        $(".btn-search-client").hide();
    },
    onEditDocument: function () { this.render(); },
    validate: function () { return true; },
    getDocVariables: function () { return $.extend({}, this.variables); }
});

return Integration;