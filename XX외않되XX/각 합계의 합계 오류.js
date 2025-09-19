
    // 추정 비용 합계, 추정 부대비용 구하는 함수
    calEstCost : function(){
        var commPrice = parseInt($(".sum_commPriceVal").text().replace(/,/g, "")) || 0;
        var repairPrice = parseInt($(".sum_repairPriceVal").text().replace(/,/g, "")) || 0;
        var consPrice = parseInt($(".sum_consPriceVal").text().replace(/,/g, "")) || 0;
        var etcPrice = parseInt($(".sum_etcPriceVal").text().replace(/,/g, "")) || 0;
        var estCost = commPrice + repairPrice + consPrice + etcPrice;
  
        $(".estCostVal").text(GO.util.numberWithCommas(estCost));
    },

결과 : 1,000,010,000
