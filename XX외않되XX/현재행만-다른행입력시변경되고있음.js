
    $(".vat input").on("change",function(){
      let value = $(this).val().replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
        $(this).val(
          Number(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        );
      }

      $("#dynamic_table1 tr").each(function(i, e){
        if ($(e).find(".netAMT")[0]) {
          var netAMT = parseFloat($(e).find(".netAMT input").val().replace(/,/g, ""));
          var vat = parseFloat($(e).find(".vat input").val().replace(/,/g, ""));
          var WithholdTax = parseFloat($(e).find(".WithholdTax input").val().replace(/,/g, "")) || 0;
          var totalAMT = netAMT + vat - WithholdTax;
          
          $(e).find(".vat input").val(GO.util.numberWithCommas(vat.toFixed(2)));
          $(e).find(".totalAMT input").val(GO.util.numberWithCommas(totalAMT.toFixed(2)));
        }
      });

      self.calTotal(".vat input", ".total_vat input");
    });


  calVatTotalAMT : function () {
    $("#dynamic_table1 tr").each(function(i, e){
      if ($(e).find(".netAMT")[0]) {
        var netAMT = parseFloat($(e).find(".netAMT input").val().replace(/,/g, ""));
        var vat = netAMT * 0.16 || parseFloat($(e).find(".vat input").val().replace(/,/g, ""));
        var WithholdTax = parseFloat($(e).find(".WithholdTax input").val().replace(/,/g, "")) || 0;
        var totalAMT = netAMT + vat - WithholdTax || parseFloat($(e).find(".totalAMT input").val().replace(/,/g, ""));
        
        $(e).find(".vat input").val(GO.util.numberWithCommas(vat.toFixed(2)));
        $(e).find(".totalAMT input").val(GO.util.numberWithCommas(totalAMT.toFixed(2)));
      }
    });
  },
