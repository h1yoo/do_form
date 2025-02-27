var $ = require("jquery");
var app = require("app");
var Backbone = require("backbone");
var _ = require('underscore');

var FormFormat = {
	textarea: ['<td style="font-size:12px; width:{{width}}; font-weight:normal; text-align:{{align}}; color:#000; background:#fff; vertical-align:middle; padding: 3px; height:22px; border: 1px solid black;">',
		'<textarea class="txta_editor" data-dsl="{{dsl}}" name="{{uniqueId}}" id="{{uniqueId}}" value="{{{val}}}" data-id="" data-name="" data-require="false" data-maxlength="" data-width="" data-defaultstr="" data-editable="true" data-value="{{{val}}}" placeholder="">{{{val}}}</textarea>',
		'</td>'
	].join(''),
	text: ['<td style="font-size:12px; {{width}}; text-align:{{align}}; color:#000; vertical-align:middle; padding: 3px; height:22px; border: 1px solid black;  ">',
		'<input type="text" class="ipt_editor" data-dsl="{{dsl}}" name="{{uniqueId}}" id="{{uniqueId}}" value="{{val}}" data-id="" data-name="" data-require="false" data-maxlength="" data-width="" data-defaultstr="" data-editable="true" data-value="{{val}}" placeholder="">',
		'</td>'
	].join(''),
	none: ['<td style="font-size:12px; width:{{width}}; font-weight:normal; text-align:{{align}}; color:#000; background:#fff; vertical-align:middle; padding: 3px; height:22px; border: 1px solid black;" >{{val}}</td>'].join('')
};

var IntegrationUtil = {
	getTemplate: function (headerData, data) {
		_.each(headerData, function (header) {
			var val = data[header.key];
			var dsl = header.type;
			var uniqueId = _.uniqueId('editForm_');
			var align = header.align;
			var width = header.width;
			var tpl = Hogan.compile(FormFormat[header.type]).render({
				val: val,
				dsl: dsl,
				uniqueId: uniqueId,
				align: align,
				width: width
			}).clone();
		}, this);
	},

	getTemplateByClone: function (template, opt) {
		var self = this;
		var eventCopy = false;
		if (opt && opt.eventCopy) {
			eventCopy = true;
		}
		var $tr = $(template).clone(eventCopy);
		if (opt && opt.use) {
			$tr.find("td").eq(opt.idx).text(opt.val);
		}
		$tr.find('input[data-dsl*="cSum"]').each(function () {
			self.bindCsumComponent(this);
		});
		$tr.find('input[data-dsl*="currency"]').each(function () {
			self.bindCurrencyComponent(this);
		});
		$tr.find('input[data-dsl*="number"]').each(function () {
			self.bindNumberComponent(this);
		});
		$tr.find('input[data-dsl*="calendar"]').each(function (i, item) {
			var uniqueId = 'editorForm_' + Date.now() + '' + _.uniqueId();
			$(item).attr({
				"name": uniqueId,
				"id": uniqueId
			});
			self.bindCalendarComponent(this);
		});

		$tr.find('select[data-dsl*="cSel"]').each(function (i, item) {
			var uniqueId = 'editorForm_' + Date.now() + '' + _.uniqueId();
			$(item).attr({
				"name": uniqueId
			});
			self.bindCselComponent(this);
		});

		$tr.find('select[data-dsl*="select"]').each(function (i, item) {
			var uniqueId = 'editorForm_' + Date.now() + '' + _.uniqueId();
			$(item).attr({
				"name": uniqueId,
				"id": uniqueId
			});
		});

		$tr.find('input[data-dsl="{{text}}"]').each(function (i, item) {
			var uniqueId = 'editorForm_' + Date.now() + '' + _.uniqueId();
			$(item).attr({
				"name": uniqueId,
				"id": uniqueId
			})
		});

		$tr.find('input[data-dsl="{{textarea}}"]').each(function (i, item) {
			var uniqueId = 'editorForm_' + Date.now() + '' + _.uniqueId();
			$(item).attr({
				"name": uniqueId,
				"id": uniqueId
			})
		});

		$tr.find('textarea[data-dsl="{{textarea}}"]').each(function (i, item) {
			var uniqueId = 'editorForm_' + Date.now() + '' + _.uniqueId();
			$(item).attr({
				"name": uniqueId,
				"id": uniqueId
			})
		});

		return $tr;
	},

	bindCselComponent: function (target) {
		if ($(target).attr('data-selectval')) {
			$(target).val($(target).attr('data-selectval'));
		} else {
			$(target).find("option:first").attr("selected", "selected");
		}
		$(target).off('change');
		$(target).on('change', function () {
			var selectVal = $(target).find(':selected').val();
			$(target).attr('data-selectval', selectVal);
		});
	},

	bindCsumComponent: function (target) {
		$(target).removeAttr('inputmask');
		var name = $(target).attr('name');
		var dslKey = $(target).attr('data-dsl');
		var parseKey;
		dslKey.replace(/{{([^}}]*)}}/g, function (m, key) {
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
			'digits': parseInt(precisionValue),
			'allowMinus': true
		});
		$(target).off('focusout');
		$(target).on('focusout', function () {
			var sum = 0;
			_.each($('form input[data-dsl*="cSum"][name=' + name + ']'), function (item) {
				var value = $(item).val().replace(/\,/g, "");
				var num = parseFloat(value) || 0;
				sum += num;
			}, this);
			sum = parseFloat(sum.toFixed(precisionValue));
			$('form input[data-dsl*="rSum"][name=' + name + ']').val(GO.util.formatNumber(sum));
		});
	},

	bindCurrencyComponent: function (target) {
		$(target).removeAttr('inputmask');
		var dslKey = $(target).attr('data-dsl');
		var parseKey;
		dslKey.replace(/{{([^}}]*)}}/g, function (m, key) {
			parseKey = key;
		});

		var precision = parseKey.split('_');

		$(target).inputmask({
			'alias': 'decimal',
			'groupSeparator': ',',
			'autoGroup': true,
			'digits': parseInt(precision[1] ? precision[1] : '0'),
			'allowMinus': true
		});
	},

	bindNumberComponent: function (target) {
		$(target).css('ime-mode', 'disabled');
		$(target).off('keydown');
		$(target).on('keydown', function (e) {
			//Delete, Backspace, Tab, Esc, Enter, decimal point, period, ,
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 188, 189]) !== -1 ||
				// Ctrl+A 허용
				(e.keyCode == 65 && e.ctrlKey === true) ||
				// home, end, left, right 허용
				(e.keyCode >= 35 && e.keyCode <= 39)) {
				return;
			}

			var valid = false; //^[0-9]+$/.test(String.fromCharCode(e.keyCode)); 오른쪽 숫자키가 안됨. String.fromCharCode()로 변경하면서 문제 발생(소문자로 변경됨)
			if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
				valid = true;
			} else {
				e.preventDefault();
			}

			if (e.shiftKey && valid) {
				e.preventDefault();
			}
		});
	},

	bindCalendarComponent: function (target) {
		$(target).removeClass('hasDatepicker')
		$(target).datepicker({
			dateFormat: "yy-mm-dd(D)",
			changeMonth: true,
			changeYear: true,
			yearRange: 'c-100:c+10',
			yearSuffix: "",
			onSelect: function (selectedDate) {
				$(target).trigger('change');
			},
			beforeShow: function (elplaceholder, object) {
				object.dpDiv.attr("data-layer", "");
				var isBeforeCallback = true;
				$(document).trigger("showLayer.goLayer", isBeforeCallback);
			},
			onClose: function () {
				var isBeforeCallback = true;
				$(document).trigger("hideLayer.goLayer", isBeforeCallback);
			}
		});
	},

	nvlToEmpty: function (v) {
		return _.isNull(v) ? "" : v;
	},

	_convertNumber: function (value) {
		if (value == '') {
			return 0;
		} else if (value == null) {
			return 0;
		}
		return value.replace(/,/gi, "");
	}
};

var Integration = Backbone.View.extend({
	initialize: function (options) {
		this.options = options || {};
		this.docModel = this.options.docModel;
		this.variables = this.options.variables;
		this.infoData = this.options.infoData;
	},

	render: function () {
		var self = this;
		if (this.docModel.docStatus == "CREATE" && this.docModel.docType == "DRAFT") {
			this._docCreatedInit();
		}

		if (GO.util.store.get('document.docMode') == "EDIT") {
			this._settingOnEditMode();
		}

		this._bindAllTimeEvent();
	},


	//최초 문서 생성 상태에서 기안전에만 실행 
	_docCreatedInit: function () {
		var self = this;
		self.addCopyArea();
	},

	//입력, 수정모드일때 이벤트 바인딩
	_settingOnEditMode: function () {
		var self = this;
		$('.viewModeHiddenPart').show();

		$('#plusArea').on('click', function (e) {
			self.addCopyArea();
			self._bindDetailTableEvent();
		});

		$('#minusArea').on('click', function (e) {
			self.deleteCopyArea();
		});

		self._bindDetailTableEvent();
	},

	_bindDetailTableEvent: function () {
		var self = this;
		$('div.copiedArea').each(function (i, area) {
			var $target = $(area);

			$target.on('change', '.price1 input, .price2 input', function (e) {
				self.calAmount(e);
			});

			$target.find('.addDetail').off('click');
			$target.find('.addDetail').on('click', function (e) {
				self.addCopyDetail(e);
			});

			$target.find('.minusDetail').off('click');
			$target.find('.minusDetail').on('click', function (e) {
				self.deleteCopyDetail(e);
				self.calAmount(e);
			});
		});

	},

	addCopyArea: function () {
		var copyArea = $('div.copyArea');
		var lastCopiedArea = $('div.copiedArea:last');

		var copiedArea = IntegrationUtil.getTemplateByClone(copyArea);
		copiedArea.show().removeClass('copyArea').addClass('copiedArea');

		//최초에는 추가된 테이블이 없기때문에 숨겨진 테이블 다음에 복사하고
		//이후부터는 마지막으로 추가된 테이블 다음에 복사
		if (lastCopiedArea.length > 0) {
			lastCopiedArea.after(copiedArea);
		} else {
			copyArea.after(copiedArea);
		}

		return copiedArea;
	},

	deleteCopyArea: function () {
		var self = this;

		//최소 하나는 지우지 않음.
		if ($('div.copiedArea').length > 1) {
			var lastCopiedArea = $('div.copiedArea:last');
			lastCopiedArea.remove();
		}
	},

	addCopyDetail: function (e) {
		var $target = $(e.currentTarget).closest('table');

		var copyDetail = $target.find('tr.copyDetail');
		var lastCopiedDetail = $target.find('tr.copiedDetail:last');

		var copiedDetail = IntegrationUtil.getTemplateByClone(copyDetail);
		copiedDetail.show().removeClass('copyDetail').addClass('copiedDetail');

		//최초에는 추가된 테이블이 없기때문에 숨겨진 테이블 다음에 복사하고
		//이후부터는 마지막으로 추가된 테이블 다음에 복사
		if (lastCopiedDetail.length > 0) {
			lastCopiedDetail.after(copiedDetail);
		} else {
			copyDetail.after(copiedDetail);
		}

		return copiedDetail;
	},

	deleteCopyDetail: function (e) {
		var self = this;
		var $target = $(e.currentTarget).closest('table');

		//최소 하나는 지우지 않음.
		if ($target.find('tr.copiedDetail').length > 1) {
			var lastCopiedDetail = $target.find('tr.copiedDetail:last');
			lastCopiedDetail.remove();
		}
	},

	calAmount: function (e) {
		var self = this;
		var cur = 0;
		var sum_cur = 0;
		var $target = $(e.currentTarget).closest('table');

		var sumPrice1 = 0;
		var sumPrice2 = 0;

		$target.find("tbody tr.copiedDetail").each(function (i, tr) {
			var price1 = parseFloat($(tr).find('.price1 input').val().replace(/\,/g, ""));
			if (isNaN(price1)) price1 = 0;
			var price2 = parseFloat($(tr).find('.price2 input').val().replace(/\,/g, ""));
			if (isNaN(price2)) price2 = 0;

			sumPrice1 += price1;
			sumPrice2 += price2;

			cur = parseFloat((price1 + price2).toFixed(2));
			$(tr).find(".cur").text(GO.util.numberWithCommas(cur));

			sum_cur = parseFloat((sum_cur + cur).toFixed(2));
		});

		$target.find(".sum_price1").text(GO.util.numberWithCommas(sumPrice1));
		$target.find(".sum_price2").text(GO.util.numberWithCommas(sumPrice2));
		$target.find(".sum_cur").text(GO.util.numberWithCommas(sum_cur));
	},

	renderViewMode: function () {$('.viewModeHiddenPart').hide(); },
	onEditDocument : function() {
            this._settingOnEditMode();
            this._bindAllTimeEvent();
        },
	beforeSave :function() {$('.viewModeHiddenPart').hide();},
	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate: function () {
		var docMode = GO.util.store.get('document.docMode');
		//수신문서 뷰모드일때는 통과
		if (this.docModel.docStatus == "RECEIVED" && docMode == 'VIEW') {
			return true;
		}
		return true;
	},
	getDocVariables : function(){}
});
return Integration;