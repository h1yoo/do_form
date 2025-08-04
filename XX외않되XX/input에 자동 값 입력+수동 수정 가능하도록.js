
  calVat : function () {
    $("#dynamic_table1 tr").each(function(i, e){
      if ($(e).find(".netAMT")[0]) {
        var netAMT = parseFloat($(e).find(".netAMT input").val().replace(/,/g, "")) || 0;
        var vat = netAMT * 0.16;
        
        $(e).find(".vat input").val(GO.util.numberWithCommas(vat.toFixed(2)));
      }
    });
  },
