calWon : function () {
  $("#dynamic_table1 tr").each(function(i, e){
    var exchRateInput = $(e).find(".exchRate input");
    var priceInput = $(e).find(".price input");

    var exchRate = parseFloat(exchRateInput.val().replace(/\,/g,""));
    if (isNaN(exchRate)) exchRate = 0;

    var price = parseInt(priceInput.val().replace(/\,/g,""));
    if (isNaN(price)) price = 0;

    var priceWon = exchRate * price;

    $(e).find(".priceWon").text(GO.util.numberWithCommas(priceWon.toFixed(0)));
  });
}
