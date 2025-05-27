    $("#dynamic_table2 .prePrice input, #dynamic_table2 .exchangeRate2 input, #dynamic_table2 .foreign input").on("change", function () {
      self.calOverPrice2(".prePrice", ".prePrice input", ".calWon", ".overPrice");

      self.calExWon2(".exchangeRate2 input", ".foreign input", ".calWon");

      self.calSumPrice('#dynamic_table2 .prePrice input', '#dynamic_table2 .sum_prePrice');
      self.calSumPrice('#dynamic_table2 .foreign input', '#dynamic_table2 .sum_foreign');

      self.calSumPriceText('#dynamic_table2 .calWon', '#dynamic_table2 .sum_calWon');

      self.calWholeCost();
    });

calOverPrice2 : function (prePriceEl, prePriceValEl, wonEl, overPriceEl) {
  var self = this;
  
  $("#dynamic_table2 tr").each(function(i, e){
        if ($(e).find(prePriceEl)[0]) {
          var prePrice = parseInt($(e).find(prePriceValEl).val().replace(/\,/g,"")); if (isNaN(prePrice)) prePrice = 0;
          var price = parseInt($(e).find(wonEl).text().replace(/\,/g,"")); if (isNaN(price)) price = 0;
          var overPrice = 0;
  
          if (price > prePrice) {
              overPrice = price - prePrice;
              $(e).find(overPriceEl).text(GO.util.numberWithCommas(overPrice));
          }
          else {
              $(e).find(overPriceEl).text(0);
          }
      }
    });
  },
