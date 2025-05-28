
calOverPrice2 : function (prePriceValEl, wonEl, overPriceEl) {

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
