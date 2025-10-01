var $ = require("jquery");
var app = require("app");
var Backbone = require("backbone");
var _ = require('underscore');


var Integration = Backbone.View.extend({
	initialize : function(options){
		this.options = options || {};
		this.docModel = this.options.docModel;
		this.variables = this.options.variables;
		this.infoData = this.options.infoData;
	},
	
	render : function() {
		var self = this;
		$('.viewModeHiddenPart').show();
    
		$(".exchRate input, .price input").on("change",function(){
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
      var val = parseFloat($(this).val().replace(/,/g, ""));
      if (!isNaN(val)) {
        sum_exchRate += val;
      }
    });    

    // 소수점이 0이 아닐 때만 소수점 출력 >> parseFloat(변수.toFixed(2));
    $(".sum_exchRate").text(GO.util.numberWithCommas(parseFloat(sum_exchRate.toFixed(2))));

    
		var sum_price = 0;

    $(".price input").each(function () {
      var val = parseInt($(this).val().replace(/,/g, ""));
      if (!isNaN(val)) {
        sum_price += val;
      }
    });    

    $(".sum_price").text(GO.util.numberWithCommas(sum_price));

    
		var sum_priceWon = 0;

    $("#dynamic_table1 tr").each(function(i, e){
      if ($(e).find(".price input")[0]) {
        var exchRate = parseFloat($(e).find(".exchRate input").val().replace(/\,/g,"")).toFixed(2); if (isNaN(exchRate)) exchRate = 0;
        var price = parseInt($(e).find(".price input").val().replace(/\,/g,""));   if (isNaN(price)) price = 0;
        var priceWon = exchRate * price;
        sum_priceWon += priceWon;

        $(e).find(".priceWon").text(GO.util.numberWithCommas(priceWon.toFixed(0)));
      }
    });  

    $(".sum_priceWon").text(GO.util.numberWithCommas(sum_priceWon));
	},

  _convertCurrencyFormat : function(value) {  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},

	renderViewMode : function(){$('.viewModeHiddenPart').hide();},
	onEditDocument : function(){this.render();},
	beforeSave :function() {$('.viewModeHiddenPart').hide();},
	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;
