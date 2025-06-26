
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
		
		//행 추가/삭제
		PlusMinusRow({
      tableId : "dynamic_table1",
      plusBtnId : "plus1", 
      minusBtnId : "minus1",
      copyRowClass : "copyRow1",
      copyRowNoClass : "copyRowNo1",
      rowspanClass : "rowspanTd1",
      minusRowCallback : function() {
        self.calAmountVal(".amount input", ".sum_amount");
        self.calAmountVal(".unit input", ".sum_unit");
        // self.calAmountVal(".unitPrice input", ".sum_unitPrice");
        self.calAmountText(".price", ".sum_price");
        self.calAmountText(".tax", ".sum_tax");
        self.calAmountText(".sum", ".total_sum");
      },
      plusRowCallback : function() {}
    });
    
		$(".amount input, .unit input").on("change",function(){
      self.calPrice();
      self.calAmountVal(".amount input", ".sum_amount");
      self.calAmountVal(".unit input", ".sum_unit");
      // self.calAmountVal(".unitPrice input", ".sum_unitPrice");
      self.calAmountText(".price", ".sum_price");
      self.calAmountText(".tax", ".sum_tax");
      self.calAmountText(".sum", ".total_sum");
      
      let value = $(this).val().replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
          $(this).val(Number(value).toLocaleString()); // 숫자로 변환 후 콤마 추가
      }
    });
	},

  // 맨 마지막 행 합계 => input으로 값 받아서 계산
	calAmountVal : function (priceEl, sumPriceEl) {
		var sum_price = 0;

    $(priceEl).each(function(i,e){
      sum_price += Number($(e).val().replace(/,/g, ""));
    });    

    $(sumPriceEl).text(GO.util.numberWithCommas(sum_price));
	},
  // 맨 마지막 행 합계 => text로 값 받아서 계산
	calAmountText : function (priceEl, sumPriceEl) {
		var sum_price = 0;

    $(priceEl).each(function(i,e){
      sum_price += Number($(e).text().replace(/,/g, ""));
    });    

    $(sumPriceEl).text(GO.util.numberWithCommas(sum_price));
	},

  // 금액 계산 (= 단가 * 수량)
  calPrice : function () {
    // var price = 0;
    // var tax = 0;
    // var sum = 0;
    $("#dynamic_table1 tr").each(function(i, e){
      if ($(e).find(".amount")[0]) {
        var amount = parseInt($(e).find(".amount input").val().replace(/,/g, "")) || 0;
        var unit = parseInt($(e).find(".unit input").val().replace(/,/g, "")) || 0;
        
        // 문제점 :::: 추가 클릭 시 맨 처음 값이 자동계산 되어 들어가짐
        
        if (amount == 0 || unit == 0) { 
          var price = 0;
          var tax = 0;
          var sum = 0;
        } else {
          var price = amount * unit;
          var tax = price / 10;
          var sum = price + tax;
        }
        
        $(e).find(".price").text(GO.util.numberWithCommas(price.toFixed(0)));
        $(e).find(".tax").text(GO.util.numberWithCommas(tax.toFixed(0)));
        $(e).find(".sum").text(GO.util.numberWithCommas(sum.toFixed(0)));
      }
    });
  },

