
    // 상품화내역, 수리, 탁송, 기타
    $(".commPrice input, .repairPrice input, .consPrice input, .etcPrice input").on('change', function(){
      self.calEstCost();
    });


    // 추정 비용 합계, 추정 부대비용 구하는 함수
    calEstCost : function(){
        var commPrice = parseInt($(".sum_commPriceVal").text().replace(/,/g, "")); if (isNaN(commPrice)) commPrice = 0;
        var repairPrice = parseInt($(".sum_repairPriceVal").text().replace(/,/g, "")); if (isNaN(repairPrice)) repairPrice = 0;
        var consPrice = parseInt($(".sum_consPriceVal").text().replace(/,/g, "")); if (isNaN(consPrice)) consPrice = 0;
        var etcPrice = parseInt($(".sum_etcPriceVal").text().replace(/,/g, "")); if (isNaN(etcPrice)) etcPrice = 0;
        var estCost = commPrice + repairPrice + consPrice + etcPrice;
        console.log("commPrice: ", commPrice);
        console.log("repairPrice: ", repairPrice);
        console.log("consPrice: ", consPrice);
        console.log("etcPrice: ", etcPrice);
        console.log("estCost: ", estCost);
  
        $(".estCostVal").text(GO.util.numberWithCommas(estCost));
    },
