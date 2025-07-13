
	//수량, 단가, 금액 -> 합계
	calAmount : function () {
		var self = this;
		var cur = 0;
		var sum_cur = 0;
		var sum_cur_vat = 0;
		var sum_cur_us = 0;
		var sum_cur_ur = 0;

		$("#dynamic_table1 tr").each(function(i, e){
			 if ($(e).find('.amount')[0]) {
				var amount = parseInt($(e).find('.amount input').val().replace(/,/g,'')); if (isNaN(amount)) amount = 0;
				var price = parseFloat($(e).find('.price input').val().replace(/,/g,'')); if (isNaN(price)) price = 0;
				var sel_vat = $(e).find(".sel_vat select option:selected").val();
				var sel_cur = $(e).find(".sel_cur select option:selected").val();
				
				cur = parseFloat((amount * price).toFixed(2));
				$(e).find(".cur").text(GO.util.numberWithCommas(cur));
				
						cur  = parseFloat((cur + cur * 0.1).toFixed(2));
						sum_cur_vat += cur;
					
			}
		});
		sum_cur = (sum_cur_vat/1.1).toFixed(2);
		sum_cur_us = (sum_cur_us).toFixed(2);
		sum_cur_ur = (sum_cur_ur).toFixed(2);
		$(".sum_cur").text(GO.util.numberWithCommas(sum_cur));
		$(".sum_cur_vat").text(GO.util.numberWithCommas(sum_cur_vat));
		$(".sum_cur_us").text(GO.util.numberWithCommas(sum_cur_us));
		$(".sum_cur_ur").text(GO.util.numberWithCommas(sum_cur_ur));
	},


  calABCDE : function () {
    var A = parseInt($(".sum_cur").text().replace(/,/g, "")) || 0;
    var B = parseInt($(".calIGST_B input").val().replace(/,/g, "")) || 0;
    var C = parseInt($(".calCGST_C input").val().replace(/,/g, "")) || 0;
    var D = parseInt($(".calSGST_D input").val().replace(/,/g, "")) || 0;
    var E = parseInt($(".calTDS_E input").val().replace(/,/g, "")) || 0;

    var total = (A + B + C + D) - E || 0;

    $(".calTotalABCDE input").val(GO.util.numberWithCommas(total));
  },

  calPercent : function () {
    var advPay = parseInt($(".advPayInput input").val().replace(/,/g, ""));
    var calTotalABCDE = parseInt($(".calTotalABCDE input").val().replace(/,/g, "")) || 0;

    if (advPay || advPay == 0) {
      var calTotalABCDExAdvPay = calTotalABCDE * advPay / 100;
      $(".calTotalABCDExAdvPay input").val(GO.util.numberWithCommas(calTotalABCDExAdvPay));

      var calBalAmount = 100 - advPay;
      $(".calBalAmount input").val(GO.util.numberWithCommas(calBalAmount));

      var calTotalBalAmount = calTotalABCDE - calTotalABCDExAdvPay;
      $(".calTotalBalAmount input").val(GO.util.numberWithCommas(calTotalBalAmount));
    }
  },
