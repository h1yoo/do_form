
  calTotalPrice : function () {
      var sum_price1 = parseFloat($(".sum_price1").text().replace(/,/g, "")) || 0;
      var sum_price2 = parseFloat($(".sum_price2").text().replace(/,/g, "")) || 0;
      var sum_price3 = parseFloat($(".sum_price3").text().replace(/,/g, "")) || 0;
      var sum_price4 = parseFloat($(".sum_price4").text().replace(/,/g, "")) || 0;
      var sum_price5 = parseFloat($(".sum_price5").text().replace(/,/g, "")) || 0;
      var totalPrice = sum_price1 + sum_price2 + sum_price3 + sum_price4 + sum_price5;

      // $(priceEl).each(function () {
      //   var val = parseFloat($(this).text().replace(/,/g, ""));
      //   if (!isNaN(val)) {
      //     totalPrice += val;
      //   }
      // });
  
      $("totalPrice").text(GO.util.numberWithCommas(totalPrice));
  },
