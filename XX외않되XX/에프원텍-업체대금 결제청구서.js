
  // 맨 마지막 행 합계 => input으로 값 받아서 계산
	calAmountVal : function (priceEl, sumPriceEl) {
		var sum_price = 0;

    $(priceEl).each(function () {
    // $(priceEl).each(function(i,e){
      // sum_price += Number($(e).val().replace(/,/g, ""));
      var val = parseFloat($(this).val().replace(/,/g, ""));
      if (!isNaN(val)) {
        sum_price += val;
      }
    });    

    $(sumPriceEl).text(GO.util.numberWithCommas(sum_price));
	},
  // 맨 마지막 행 합계 => text로 값 받아서 계산
	calAmountText : function (priceEl, sumPriceEl) {
		var sum_price = 0;

    $(priceEl).each(function () {
    // $(priceEl).each(function(i,e){   // input이 아닌 값을 e로 받아오면 추가 클릭 시 값이 이상하게 들어감
      var val = parseint($(this).text().replace(/,/g, ""));
      if (!isNaN(val)) {
        sum_price += val;
      }
    });

    $(sumPriceEl).text(GO.util.numberWithCommas(sum_price));
	},

  // 각 행 합계 : 금액 계산 (= 단가 * 수량)
  calPrice : function () {
    var price = 0;
    var tax = 0;
    var sum = 0;
    $("#dynamic_table1 tr").each(function(i, e){
      if ($(e).find(".amount")[0]) {
        var amount = parseInt($(e).find(".amount input").val().replace(/,/g, "")) || 0;
        var unit = parseInt($(e).find(".unit input").val().replace(/,/g, "")) || 0;
        
        // 문제점 :::: 추가 클릭 시 맨 처음 값이 자동계산 되어 들어가짐
        
        if (amount == 0 || unit == 0) { 
          price = 0;
          tax = 0;
          sum = 0;
        } else {
          price = amount * unit;
          tax = price / 10;
          sum = price + tax;
        }
        
        $(e).find(".price").text(GO.util.numberWithCommas(price.toFixed(0)));
        $(e).find(".tax").text(GO.util.numberWithCommas(tax.toFixed(0)));
        $(e).find(".sum").text(GO.util.numberWithCommas(sum.toFixed(0)));
      }
    });
  },
