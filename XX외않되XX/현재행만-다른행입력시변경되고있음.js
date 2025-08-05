
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
