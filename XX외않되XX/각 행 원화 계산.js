
	render : function() {
		var self = this;
		$('.viewModeHiddenPart').show();
    
		$(".exchRate input, .price input").on("change",function(){
      self.calWon();
      self.calPrice();

      let value = $(this).val().replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
          $(this).val(Number(value).toLocaleString()); // 숫자로 변환 후 콤마 추가
      }
    });
	},

	calPrice : function () {
		var sum_exchRate = 0;

    $(".exchRate input").each(function () {
      var val = parseInt($(this).val().replace(/,/g, ""));
      if (!isNaN(val)) {
        sum_exchRate += val;
      }
    });    

    $(".sum_exchRate").text(GO.util.numberWithCommas(sum_exchRate));

    
		var sum_price = 0;

    $(".price input").each(function () {
      var val = parseInt($(this).val().replace(/,/g, ""));
      if (!isNaN(val)) {
        sum_price += val;
      }
    });    

    $(".sum_price").text(GO.util.numberWithCommas(sum_price));

    
		var sum_priceWon = 0;

    $(".priceWon").each(function () {
      var val = parseInt($(this).text().replace(/,/g, ""));
      if (!isNaN(val)) {
        sum_priceWon += val;
      }
    });    

    $(".sum_priceWon").text(GO.util.numberWithCommas(sum_priceWon));
	},

	calWon : function () {
    $("#dynamic_table1 tr").each(function(i, e){
      if ($(e).find(".price input")[0]) {
        var exchRate = parseFloat($(".exchRate input").val().replace(/\,/g,"")).toFixed(2); if (isNaN(exchRate)) exchRate = 0;
        var price = parseInt($(e).find(".price input").val().replace(/\,/g,""));   if (isNaN(price)) price = 0;
        var priceWon = exchRate * price;

        $(e).find(".priceWon").text(GO.util.numberWithCommas(priceWon.toFixed(0)));
      }
    });
	},
