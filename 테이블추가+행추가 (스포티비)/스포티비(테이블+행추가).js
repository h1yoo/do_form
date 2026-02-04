var $ = require("jquery");
var GO = require("app");
var Backbone = require("backbone");
var EVENT_NS = '.SPLIP_CORP_CARD';

var Integration = Backbone.View.extend({ //View이지만 그려지는것은 IntegratorFunction에서 그려진다.
	initialize: function (options) {
		this.options = options || {};
		this.docModel = this.options.docModel;
		this.variables = this.options.variables;
	},
	render: function () {
		var self = this;
		this.bindEvent();
	},
	
	
	bindEvent : function(){
		var self = this;
		
		$('.viewModeHiddenPart').show();
		$("td.tt_han input").attr("readonly", true);
		$("td.tt_price input").eq(0).attr("readonly", true);
		$("td.price input, td.type select").on("change", function () {
			self.calculate();
		});
		/* 행 추가 삭제 EVENT*/
		$('#plus').off('click'+EVENT_NS);	// 먼저 기존에 바인딩된 같은 이벤트(click + 네임스페이스)가 있으면 제거 (.off()).
		$('#plus').on('click'+EVENT_NS, $.proxy(this.addRow, this));	// 그 후 .on()을 통해 addRow() 함수를 클릭 이벤트로 바인딩. $.proxy(..., this)는 this 컨텍스트가 유지되도록 하기 위한 처리
		
		$('#minus').off('click'+EVENT_NS);
		$('#minus').on('click'+EVENT_NS, $.proxy(this.minusRow, this));
		
		$('.plus1').off('click'+EVENT_NS);
		$('.plus1').on('click'+EVENT_NS, $.proxy(this.addDetailRow, this));
		
		$('.minus1').off('click'+EVENT_NS);
		$('.minus1').on('click'+EVENT_NS, $.proxy(this.minusDetailRow, this));
		
		self.addRow(); // 페이지 로딩 시 카드+내역 1세트 자동 추가
		self.calculate();    // 바로 계산 실행!
	},
	/* 카드 추가 */
	addRow : function(){
		var self = this;
		var dataId = $('#appendTable .plus1').length;
		var target = $('#appendTable .copyTbody');
		var cloneTr1 = self.getTemplateByClone($('#copiedTable .cardCopyRow'));
		var cloneTr2 = self.getTemplateByClone($('#copiedTable .detailCopyRow'));
		target.append(cloneTr1);
		target.append(cloneTr2);
		cloneTr1.find('table').addClass("cardTable_"+dataId)
		cloneTr2.find('table').addClass("dynamic_table1_"+dataId)
		cloneTr2.find('table').attr("data-row",dataId)
		$(".dynamic_table1_"+dataId).attr("id","dynamic_table1_"+dataId)
		$(".cardTable_"+dataId).attr("id","cardTable_"+dataId)
	},
	/* 카드 삭제 */
	minusRow : function(){
		var self = this;
		var dataId = $('#appendTable .plus1').length -1;
		$('#cardTable_'+dataId).closest('.cardCopyRow').remove();
		$('#dynamic_table1_'+dataId).closest('.detailCopyRow').remove();
		self.calculate();
	},
	/* 내역 추가 */
	addDetailRow : function(e){
		var self = this;
		var target = e.currentTarget;
		var rowNum = $(target).closest('table').attr("data-row")
		
		var cloneTr1 = self.getTemplateByClone($('#dynamic_table1 .bodyRow'));
		$('#dynamic_table1_'+rowNum+' tbody').append(cloneTr1);
	},
	/* 내역 삭제 */
	minusDetailRow : function(e){
		var self = this;
		var target = e.currentTarget;
		var rowNum = $(target).closest('table').attr("data-row")
		$('#dynamic_table1_'+rowNum+' tbody .bodyRow:last').remove();
		self.calculate();
	},
	
	calculate: function (event) {
		var self = this;
		var tt_price = 0;

		$("td.tt_type input").val(0);
		$("td.price").parent("tr").each(function(i, e){
			var type = $(e).find('td.type select').val();
			var price = parseInt($(e).find('td.price input').val().replace(/\,/g, ""));
			if (isNaN(price))  price = 0;
			if(type == '선택') return;
			var type_price = parseInt($('td.tt_type[tname="'+ type +'"] input').val().replace(/\,/g, ""));

			if (isNaN(type_price))  type_price = 0;

			tt_price += price;
			type_price += price;
				
			$("td.tt_type[tname='" + type + "'] input").val(GO.util.numberWithCommas(type_price));

			if(type_price == 0){
				$("td.tt_type[tname='" + type + "'] input").val(0);
			}

		});

		var tt_han = "금 " + self.num2han(tt_price) + "원정";

		$("td.tt_han input").val(tt_han);
		$("td.tt_price input").val(GO.util.numberWithCommas(tt_price));

		
		var rowNum = $('#appendTable .plus1').length; 
		for(var i = 0; i< rowNum; i++){
			var tablePrice = 0
				$('#dynamic_table1_'+i+' .copyRow1').each(function(i,v){
				var price = parseInt($(v).find('td.price input').val().replace(/\,/g, ""));
				if (isNaN(price))  price = 0;
				tablePrice += price
					
				});
			$('#cardTable_'+i).find('.row_tt_price input').val(GO.util.numberWithCommas(tablePrice));
			$('#dynamic_table1_'+i).find('.row_tt_price input').val(GO.util.numberWithCommas(tablePrice));
		}
		
		

		if(tt_price == 0){
			$("td.tt_price input").val('');
			$("td.tt_han input").val('');
		}
	},
	num2han: function (num) {
		num = parseInt((num + '').replace(/[^0-9]/g, ''), 10) + '';  // 숫자/문자/돈 을 숫자만 있는 문자열로 변환

		if (num == '0') return '영';

		var number = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
		var unit = ['', '만', '억', '조'];
		var smallUnit = ['천', '백', '십', ''];
		var result = [];  //변환된 값을 저장할 배열
		var unitCnt = Math.ceil(num.length / 4);  //단위 갯수. 숫자 10000은 일단위와 만단위 2개이다.

		num = num.padStart(unitCnt * 4, '0')  //4자리 값이 되도록 0을 채운다

		var regexp = /[\w\W]{4}/g;  //4자리 단위로 숫자 분리
		var array = num.match(regexp);

		//낮은 자릿수에서 높은 자릿수 순으로 값을 만든다(그래야 자릿수 계산이 편하다)
		for (var i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
			var hanValue = _makeHan(array[i]);  //한글로 변환된 숫자
			if (hanValue == '')  //값이 없을땐 해당 단위의 값이 모두 0이란 뜻.
				continue;
			result.unshift(hanValue + unit[unitCnt]);  //unshift는 항상 배열의 앞에 넣는다.
		}
		//여기로 들어오는 값은 무조건 네자리이다. 1234 -> 일천이백삼십사
		function _makeHan(text) {
			var str = '';
			for (var i = 0; i < text.length; i++) {
				var num = text[i];
				if (num == '0')  //0은 읽지 않는다
					continue;
				str += number[num] + smallUnit[i];
			}
			return str;
		}
		return result.join('');
	},
	renderViewMode: function() {
		$('.viewModeHiddenPart').hide();
	},
	
	getDocVariables : function(){
		return _.extend($('#document_content').getDocVariables(), this.variables);
	},

	validate :function() {
		
		return true
	},
	beforeSave :function() {
		$('.viewModeHiddenPart').hide();
		
	},
	
	afterSave :function() {
		$('.viewModeHiddenPart').hide();
	},
	
	onEditDocument : function(){
		this.render();
	},
	/* 행 추가 로직 START */
	getTemplateByClone : function(template , opt){
		var self = this;
		var $tr = $(template).clone(true);
		if (opt && opt.numbering) {
			$tr.find("td").eq(opt.idx).text(opt.val);
		}
		$tr.find('input[data-dsl*="cSum"]').each(function(){
			self.bindCsumComponent(this);
		});
		$tr.find('input[data-dsl*="currency"]').each(function(){
			self.bindCurrencyComponent(this);
		});
		$tr.find('input[data-dsl*="number"]').each(function(){
			self.bindNumberComponent(this);
		});
		$tr.find('input[data-dsl*="calendar"]').each(function(i, item){
			var uniqueId = _.uniqueId('editorForm_');
			$(item).attr({"name": uniqueId, "id": uniqueId});
			self.bindCalendarComponent(this);
		});

		$tr.find('select[data-dsl*="cSel"]').each(function(i, item){
			var uniqueId = _.uniqueId('editorForm_');
			$(item).attr({"name": uniqueId,"id": uniqueId});
			self.bindCselComponent(self);
		});
		
		$tr.find('select[data-dsl*="select"]').each(function(i, item){
			var uniqueId = _.uniqueId('editorForm_');
			$(item).attr({"name": uniqueId, "id": uniqueId});
		});            
		
		$tr.find('input[data-dsl="{{text}}"]').each(function(i, item){
			var uniqueId = _.uniqueId('editorForm_');
			$(item).attr({"name": uniqueId, "id": uniqueId})
		});
		
		$tr.find('input[data-dsl="{{textarea}}"]').each(function(i, item){
			var uniqueId = _.uniqueId('editorForm_');
			$(item).attr({"name": uniqueId, "id": uniqueId})
		});
		
		$tr.find('textarea[data-dsl="{{textarea}}"]').each(function(i, item){
			var uniqueId = _.uniqueId('editorForm_');
			$(item).attr({"name": uniqueId, "id": uniqueId})
		});
		
		return $tr;
	},
	bindCselComponent : function(target){
		if ($(target).attr('data-selectval')) {
			$(target).val($(target).attr('data-selectval'));
		} else {
			$(target).find("option:first").attr("selected", "selected");
		}
		$(target).off('change');
		$(target).on('change',function(){
			var selectVal = $(target).find(':selected').val();
			$(target).attr('data-selectval',selectVal);
		});
	},
	bindCurrencyComponent : function(target){
		$(target).removeAttr('inputmask');
		var dslKey = $(target).attr('data-dsl');
		var parseKey;
		dslKey.replace(/{{([^}}]*)}}/g,function(m,key){
			parseKey = key;
		});

		var precision = parseKey.split('_');
		
		$(target).inputmask({
			'alias': 'decimal',
			'groupSeparator': ',', 
			'autoGroup': true,
			'digits' : parseInt(precision[1] ? precision[1] : '0'),
			'allowMinus' : true
		});
	},

	bindNumberComponent : function(target){
		$(target).css('ime-mode', 'disabled');
		$(target).off('keydown');
		$(target).on('keydown',function(e){
			//Delete, Backspace, Tab, Esc, Enter, decimal point, period, ,
				if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 188, 189]) !== -1 ||
						// Ctrl+A 허용
					(e.keyCode == 65 && e.ctrlKey === true) || 
						// home, end, left, right 허용
					(e.keyCode >= 35 && e.keyCode <= 39)) {
							return;
				}
				
				var valid = false; //^[0-9]+$/.test(String.fromCharCode(e.keyCode)); 오른쪽 숫자키가 안됨. String.fromCharCode()로 변경하면서 문제 발생(소문자로 변경됨)
				if( ( e.keyCode >=48 && e.keyCode <= 57 ) || ( e.keyCode >=96 && e.keyCode <= 105 ) ){
					valid=true;
				}else{
					e.preventDefault();
				}
				
				if(e.shiftKey && valid){
				e.preventDefault();
				}
		});
	},
	bindCalendarComponent : function(target){
		$(target).removeClass('hasDatepicker')
		$(target).datepicker({
			dateFormat : "yy-mm-dd(D)",
			changeMonth: true,
			changeYear : true,
			yearRange : 'c-100:c+10',
			yearSuffix: "",
			onSelect: function( selectedDate ) {
				$(target).trigger('change');
			},
			beforeShow : function(elplaceholder, object) {
				object.dpDiv.attr("data-layer", "");
				var isBeforeCallback = true;
				$(document).trigger("showLayer.goLayer", isBeforeCallback);
			},
			onClose : function() {
				var isBeforeCallback = true;
				$(document).trigger("hideLayer.goLayer", isBeforeCallback);
			}
		});
	},
	bindCsumComponent : function(target){
		$(target).removeAttr('inputmask');
		var name = $(target).attr('name');
		var dslKey = $(target).attr('data-dsl');
		var parseKey;
		dslKey.replace(/{{([^}}]*)}}/g,function(m,key){
			parseKey = key;
		});
		var precisionValue = '0'
		if (parseKey.search('_') >= 0) {
			precisionValue = parseKey.split('_')[1].split(':')[0];	
		}
		$(target).inputmask({
				'alias': 'decimal', 
				'groupSeparator': ',', 
				'autoGroup': true,
				'digits' : parseInt(precisionValue),
				'allowMinus' : true
			});
		$(target).off('focusout');
		$(target).on('focusout',function(){
			var sum = 0;
			_.each( $('form input[data-dsl*="cSum"][name='+ name +']'), function(item){
				var value = $(item).val().replace(/\,/g,"");
				var num = parseFloat(value) || 0;
				sum += num;
			}, this);
			sum = parseFloat(sum.toFixed(precisionValue));
			$('form input[data-dsl*="rSum"][name='+ name +']').val(GO.util.formatNumber(sum));
		});
	},
	/* 행 추가 로직 END */
	
});


return Integration;
