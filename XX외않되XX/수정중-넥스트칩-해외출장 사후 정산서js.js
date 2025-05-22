
    $("#corpCardCost").on("change", ".corp_prePrice input, .corp_won input, .corp_foreign input", function () {
      self.calOverPrice(".corp_prePrice", ".corp_prePrice input", ".corp_won input", ".corp_overPrice");
      
      self.calSumPriceText('.corp_prePrice input', '#corpCardCost .corp_sum_prePrice');
      self.calSumPriceText('#corpCardCost .corp_won input', '#corpCardCost .corp_sum_won');
      self.calSumPriceText('.corp_foreign input', '#corpCardCost .corp_sum_foreign');
      
      self.calSumPriceText('.corp_totalWon', '#corpCardCost .corp_sum_totalWon');
      self.calSumPriceText('.corp_overPrice', '#corpCardCost .corp_sum_overPrice');

      self.calWholeCost();
    });
    $("#corpCardCost").on("change", ".pers_prePrice input, .pers_won input, .pers_foreign input", function () {
      self.calOverPrice(".pers_prePrice", ".pers_prePrice input", ".pers_won input", ".pers_overPrice");
      
      self.calSumPriceText('.pers_prePrice input', '#corpCardCost .pers_sum_prePrice');
      self.calSumPriceText('#corpCardCost .pers_won input', '#corpCardCost .pers_sum_won');
      self.calSumPriceText('.pers_foreign input', '#corpCardCost .pers_sum_foreign');
      
      self.calSumPriceText('.pers_totalWon', '#corpCardCost .pers_sum_totalWon');
      self.calSumPriceText('.pers_overPrice', '#corpCardCost .pers_sum_overPrice');

      self.calWholeCost();
    });


  // 차액금
	calOverPrice : function (prePriceEl, prePriceValEl, wonValEl, overPriceEl) {
		var self = this;
        
		$("#corpCardCost tr").each(function(i, e){
      if ($(e).find(prePriceEl)[0]) {
        var prePrice = parseInt($(e).find(prePriceValEl).val().replace(/\,/g,"")); if (isNaN(prePrice)) prePrice = 0;
        var price = parseInt($(e).find(wonValEl).val().replace(/\,/g,"")); if (isNaN(price)) price = 0;
        
        var overPrice = 0;
        if (price > prePrice) {
            overPrice = price - prePrice;
            $(e).find(overPriceEl).text(GO.util.numberWithCommas(overPrice));
        }
        else {
            $(e).find(overPriceEl).text(0);
        }
        if (prePriceEl.includes(".corp_prePrice")) {
          $(e).find(".corp_totalWon").text(GO.util.numberWithCommas(price));
        }
        if (prePriceEl.includes(".pers_prePrice")) {
          $(e).find(".pers_totalWon").text(GO.util.numberWithCommas(price));
        }
			}
		});
	},

  calSumPrice : function (priceEl, sumPriceEl) {
        var sum_prePrice = 0;

        $(priceEl).each(function () {
          var val = parseFloat($(this).val().replace(/,/g, ""));
          if (!isNaN(val)) {
              sum_prePrice += val;
          }
      });
  
      $(sumPriceEl).val(GO.util.numberWithCommas(sum_prePrice));
  },

  calSumPriceText : function (priceEl, sumPriceEl) {
        var sum_prePrice = 0;

        $(priceEl).each(function () {
          var val = parseFloat($(this).text().replace(/,/g, ""));
          if (!isNaN(val)) {
              sum_prePrice += val;
          }
      });
  
      $(sumPriceEl).text(GO.util.numberWithCommas(sum_prePrice));
  },


	calWholeCost : function () {
		var self = this;
    var wholeCost;

    var corp_sum1 = parseFloat(
      $("#corpCardCost .corp_sum_won input").length
        ? $("#corpCardCost .corp_sum_won input").val()
        : $("#corpCardCost .corp_sum_won").text()
    .replace(/,/g, "")) || 0;
    var pers_sum1 = parseFloat(
      $("#corpCardCost .pers_sum_won input").length
        ? $("#corpCardCost .pers_sum_won input").val()
        : $("#corpCardCost .pers_sum_won").text()
    .replace(/,/g, "")) || 0;
  
    var sum2 = parseFloat(
      $("#dynamic_table1 .sum_calWon input").length
        ? $("#dynamic_table1 .sum_calWon input").val()
        : $("#dynamic_table1 .sum_calWon").text()
    .replace(/,/g, "")) || 0;
  
    var sum3 = parseFloat(
      $("#dynamic_table2 .sum_calWon input").length
        ? $("#dynamic_table2 .sum_calWon input").val()
        : $("#dynamic_table2 .sum_calWon").text()
    .replace(/,/g, "")) || 0;
  
    var wholeCost = corp_sum1 + pers_sum1 + sum2 + sum3;
  
    $(".wholeCost").text( GO.util.numberWithCommas(wholeCost) );
	},
    
