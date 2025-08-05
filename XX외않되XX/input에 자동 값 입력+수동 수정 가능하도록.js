let value = $(this).val().replace(/,/g, "");
if (!isNaN(value) && value !== "") {
  $(this).val(
    Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}


$(".netAMT input, .WithholdTax input").on("change",function(){
      self.calVatTotalAMT();

      self.calTotal(".netAMT input", ".total_netAMT input");
      self.calTotal(".WithholdTax input", ".total_WithholdTax input");
      
      let value = $(this).val().replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
          $(this).val(Number(value).toLocaleString()).toFixed(2); // 숫자로 변환 후 콤마 추가
      }
    });
    

    $(".vat input").on("change",function(){
      let value = $(this).val().replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
          $(this).val(Number(value).toLocaleString()).toFixed(2); // 숫자로 변환 후 콤마 추가
      }

      $("#dynamic_table1 tr").each(function(i, e){
        if ($(e).find(".netAMT")[0]) {
          var netAMT = parseFloat($(e).find(".netAMT input").val().replace(/,/g, ""));
          var vat = parseFloat($(e).find(".vat input").val().replace(/,/g, ""));
          // var vat = netAMT * 0.16;
          var WithholdTax = parseFloat($(e).find(".WithholdTax input").val().replace(/,/g, "")) || 0;
          // var totalAMT = parseFloat($(e).find(".totalAMT input").val().replace(/,/g, ""));
          var totalAMT = netAMT + vat - WithholdTax;
          
          $(e).find(".vat input").val(GO.util.numberWithCommas(vat.toFixed(2)));
          $(e).find(".totalAMT input").val(GO.util.numberWithCommas(totalAMT.toFixed(2)));
        }
      });

      self.calTotal(".vat input", ".total_vat input");
    });

    $(".totalAMT input").on("change",function(){
      let value = $(this).val().replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
          $(this).val(Number(value).toLocaleString()).toFixed(2); // 숫자로 변환 후 콤마 추가
      }

      $("#dynamic_table1 tr").each(function(i, e){
        if ($(e).find(".netAMT")[0]) {
          var netAMT = parseFloat($(e).find(".netAMT input").val().replace(/,/g, ""));
          // var vat = parseFloat($(e).find(".vat input").val().replace(/,/g, ""));
          var vat = netAMT * 0.16;
          var WithholdTax = parseFloat($(e).find(".WithholdTax input").val().replace(/,/g, "")) || 0;
          var totalAMT = parseFloat($(e).find(".totalAMT input").val().replace(/,/g, ""));
          // var totalAMT = netAMT + vat - WithholdTax;
          
          $(e).find(".totalAMT input").val(GO.util.numberWithCommas(totalAMT.toFixed(2)));
        }
      });

      self.calTotal(".totalAMT input", ".total_totalAMT input");
    });


Uncaught TypeError: $(...).val(...).toFixed is not a function
