/***
 * 전자결재 연동 양식(html)에 추가될 javascript
 * html 밑에 script tag로 끼는 것도 되고, admin page에서 경로 넣는 것도 됨.
 <script>$.getScript("https://int-badev.daouoffice.com/resources/test.js", function( data, textStatus, jqxhr ) {});</script>
 */

 (function() {
	var variables = GO.util.store.get('document.variables');
	var variablesData = {
			status : variables.status
	};


	//양식에 쓰이는 함수객체 
	var Formfunc = (function() {
		var _variable = {}; //variables 데이터를 가지고 있는 private변수
		var docMode = '';

		/***
		 * 테이블을 그린다.
		 */
		function render() {
      var self = this;
      $('.viewModeHiddenPart').hide();

			if (docMode == "EDIT") {
        $('.viewModeHiddenPart').show();
        
        //행 추가/삭제
        PlusMinusRow({
          tableId : "dynamic_table1",
          plusBtnId : "plus1", 
          minusBtnId : "minus1",
          copyRowClass : "copyRow1",
          copyRowNoClass : "copyRowNo1",
          rowspanClass : "rowspanTd1",
          // minusRowCallback : function() {self.calAmount();},
          // plusRowCallback : function() {self.calAmount();}
        });
      }
		}

		/***
		 * Private 변수를 set한다. 
		 */
		function setData(data, mode) {
			_variable = data;
			docMode = mode;
		}

		/***
		 * 전자결재에서 사용할 variables 값을 설정 (사용시점 : draft, tempsave, modify doc)
		 */
		function getVariablesData() {
			return _variable;
		}

		/***
		 * 상신전 처리사항
		 */
		function beforeSave() {
			$('.viewModeHiddenPart').hide();
		}

		/***
		 * 상신전 validate 처리
		 */
		function validateIntegrationData() {
			return true;
		}

		// 화면 emptyData 삭제
		function clearEmptyIntegrationData() {

		}

    // 행추가삭제 로직 START
    var PlusMinusRow = function (options) {
      var defaults = {
        maxRow: 0,
        copyRowNoSize: 1
      };

      var options = {
        tableId: options.tableId,
        plusBtnId: options.plusBtnId,
        minusBtnId: options.minusBtnId,
        copyRowClass: options.copyRowClass,
        copyRowNoClass: options.copyRowNoClass,
        copyRowNoSize: options.copyRowNoSize,
        rowNo: options.rowNo,
        maxRow: options.maxRow,
        maxNo: options.maxNo,
        rowspanClass: options.rowspanClass,
        plusRowCallback: options.plusRowCallback,
        minusRowCallback: options.minusRowCallback
      };

      var settings = $.extend({}, defaults, options);
      var plusCnt;

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

      $("." + settings.rowNo).on('change', function () {
        $("#" + settings.tableId + " .copiedRow").remove();
        plusCnt = 1;

        var row_no = parseInt($("." + settings.rowNo + " input").val());

        for (var i = 0; i < row_no - 1; i++) {
          plusRow();
          plusCnt++;
        }
      });

      $("#" + settings.plusBtnId).on('click', function () {
        if ($("#" + settings.tableId + " ." + settings.copyRowClass).length + $("#" + settings.tableId + " .copiedRow").length < settings.maxRow || settings.maxRow == 0) {
          if (settings.maxNo !== undefined) {
            if (parseInt($("#" + settings.tableId + " ." + settings.copyRowNoClass + ":last").text()) < settings.maxNo) {
              plusRow();
              plusCnt++;
            }
          } else {
            plusRow();
            plusCnt++;
          }
        }
      });

      $("#" + settings.minusBtnId).on('click', minusRow);

      function plusRow() {
        var $tr = $("#" + settings.tableId + " ." + settings.copyRowClass).clone(true);

        if ($("#" + settings.tableId + " ." + settings.rowspanClass)[0] !== undefined) {
          $.each($("#" + settings.tableId + " ." + settings.rowspanClass), function (k, v) {
            $(v).attr("rowspan", parseInt($(v).attr("rowspan")) + $tr.length);
          });

          $.each($tr.find("td[rowspan]"), function (k, v) {
            if ($(v).hasClass(settings.rowspanClass)) {
              $(v).remove();
            }
          });
        }

        if ($("#" + settings.tableId + " ." + settings.copyRowNoClass)[0] !== undefined) {
          var copyRowNoCnt = $tr.find("." + settings.copyRowNoClass).length;

          for (var i = 0; i < copyRowNoCnt; i++) {
            var newNo;
            if (!$tr.find("." + settings.copyRowNoClass).attr('rowspan')) {
              newNo = parseInt($($tr.find("." + settings.copyRowNoClass)[i]).text()) + settings.copyRowNoSize * plusCnt * $tr.length;
            } else {
              newNo = parseInt($($tr.find("." + settings.copyRowNoClass)[i]).text()) + settings.copyRowNoSize * plusCnt;
            }
            $($tr.find("." + settings.copyRowNoClass)[i]).text(newNo);
          }
        }

        var i = 1;
        $.each($tr, function (k, v) {
          $(v).removeClass(settings.copyRowClass);
          $(v).addClass('copiedRow');
          initComponent($(v), i++);
        });

        if ($("#" + settings.tableId + " .copiedRow")[0] === undefined) {
          $("#" + settings.tableId + " ." + settings.copyRowClass + ":last").after($tr);
        } else {
          $("#" + settings.tableId + " .copiedRow:last").after($tr);
        }

        if (typeof settings.plusRowCallback == 'function') {
          settings.plusRowCallback(this);
        }
      }

      function initComponent($tr, i) {
        var editorFormCnt = 1;
        var radioName = "";
        var checkName = "";

        $.each($tr.find("td input"), function (k, v) {
          var componentType = $(v).attr("data-dsl");
          var componentId = $(v).attr("id");

          if (!(componentType.search("check") > -1) && !(componentType.search("radio") > -1)) {
            var newId = settings.tableId + "_" + ($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt;
            $(v).attr({ name: newId, id: newId });
            $(v).val("");

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
                'digits': parseInt(precision[1] ? precision[1] : '0'),
                'allowMinus': true
              });
            } else if (componentType.search("calendar") > -1) {
              $(v).datepicker("destroy").removeClass('hasDatepicker');
              $(v).datepicker({
                dateFormat: "yy-mm-dd(D)",
                changeMonth: true,
                changeYear: true,
                yearSuffix: ""
              });
            }
          } else if (componentType.search("radio") > -1) {
            if ($(v).attr('name') == radioName) {
              editorFormCnt--;
            } else {
              radioName = $(v).attr('name');
            }

            var newName = settings.tableId + "_" + ($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt;
            var newId = newName + "_" + componentId.split("_")[2];

            $(v).attr({ name: newName, id: newId, checked: false });
          } else if (componentType.search("check") > -1) {
            var curCheckName = $(v).attr('name').split("_")[0] + "_" + $(v).attr('name').split("_")[1];

            if (curCheckName == checkName) {
              editorFormCnt--;
            } else {
              checkName = curCheckName;
            }

            var newId = settings.tableId + "_" + ($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt + "_" + componentId.split("_")[2];

            $(v).attr({ name: newId, id: newId, checked: false });
          }

          editorFormCnt++;
        });

        $.each($tr.find("td select"), function (k, v) {
          var componentName = $(v).attr("name");
          var newName = settings.tableId + "_" + ($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt;

          $(v).attr({ name: newName, id: newName });
          editorFormCnt++;
        });

        $.each($tr.find("td textarea"), function (k, v) {
          var componentId = $(v).attr("id");
          var newId = settings.tableId + "_" + ($("#" + settings.tableId).find(".copiedRow").length + i) + "_" + editorFormCnt;

          $(v).attr({ name: newId, id: newId });
          $(v).val("");

          editorFormCnt++;
        });

        return $tr;
      }

      function minusRow() {
        if ($("#" + settings.tableId + " .copiedRow")[0] !== undefined) {
          if ($("#" + settings.tableId + " ." + settings.rowspanClass)[0] !== undefined) {
            $.each($("#" + settings.tableId + " ." + settings.rowspanClass), function (k, v) {
              $(v).attr("rowspan", parseInt($(v).attr("rowspan")) - $("#" + settings.tableId + " ." + settings.copyRowClass).length);
            });
          }

          for (var i = 0; i < $('.' + settings.copyRowClass).length; i++) {
            $("#" + settings.tableId + " .copiedRow:last").remove();
          }

          plusCnt--;
        }

        if (typeof settings.minusRowCallback == 'function') {
          settings.minusRowCallback(this);
        }
      }
    };
    // 행추가삭제 로직 END

		return {
			setData : setData,
			validateIntegrationData : validateIntegrationData,
			render : render,
			getVariablesData : getVariablesData,
			beforeSave : beforeSave,
			clearEmptyIntegrationData : clearEmptyIntegrationData
		};
	})(); //Formfunc end

	Formfunc.setData(variablesData, GO.util.store.get('document.docMode'));
	Formfunc.render();

	/***
	 * core 부분에서 사용할수 있도록 jQuery 전역 객체에 함수를 바인딩. 
	 */
	$.goIntegrationForm = {
			getIntegrationData : function() {
				return Formfunc.getVariablesData();
			},
			validateIntegrationData : function() {
				return Formfunc.validateIntegrationData();
			},
			clearEmptyIntegrationData : function() {
				Formfunc.clearEmptyIntegrationData();
			},
			beforeSave : function() {
				Formfunc.beforeSave();
			}
	};
})();