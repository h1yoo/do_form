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
    
    // // 사용자가 VAT를 수동으로 입력한 경우
    // $(document).on("input", ".vat input", function () {
    //   $(this).data("auto", false);
    // });

    // // 사용자가 totalAMT를 수동으로 입력한 경우
    // $(document).on("input", ".totalAMT input", function () {
    //   $(this).data("auto", false);
    // });
    
    $(".netAMT input, .WithholdTax input").on("change",function(){
      self.calVatTotalAMT();

      self.calTotal(".netAMT input", ".total_netAMT input");
      self.calTotal(".WithholdTax input", ".total_WithholdTax input");
      
      let value = $(this).val().replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
        $(this).val(
          Number(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        );
      }
    });
    

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
          var vat = netAMT * 0.16;
          var WithholdTax = parseFloat($(e).find(".WithholdTax input").val().replace(/,/g, "")) || 0;
          var totalAMT = parseFloat($(e).find(".totalAMT input").val().replace(/,/g, ""));
          
          $(e).find(".totalAMT input").val(GO.util.numberWithCommas(totalAMT.toFixed(2)));
        }
      });

      self.calTotal(".totalAMT input", ".total_totalAMT input");
    });
    
  },


  calVatTotalAMT : function () {
    $("#dynamic_table1 tr").each(function(i, e){
      if ($(e).find(".netAMT")[0]) {
        var netAMT = parseFloat($(e).find(".netAMT input").val().replace(/,/g, ""));
        var vat = netAMT * 0.16;
        var WithholdTax = parseFloat($(e).find(".WithholdTax input").val().replace(/,/g, "")) || 0;
        var totalAMT = netAMT + vat - WithholdTax;
        
        $(e).find(".vat input").val(GO.util.numberWithCommas(vat.toFixed(2)));
        $(e).find(".totalAMT input").val(GO.util.numberWithCommas(totalAMT.toFixed(2)));
      }
    });
  },

  calTotal : function (priceEL, totalEL) {
    var total = 0;

    $(priceEL).each(function () {
      var val = parseFloat($(this).val().replace(/,/g, ""));
      if (!isNaN(val)) {
        total += val;
      }
    });    
    $(totalEL).val(GO.util.numberWithCommas(total.toFixed(2)));
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
