
  // 정산상세 금액 구하는 함수
  calDetailPrice : function(unrecPriceEL, accIntEL, dailyCarTaxEL, penaltyEL, transPriceValEL, succFeeEL, finesEtcEL, cogZoneEL, othSetFeeEL, depGuarEL, unaccPriceValEL){
    var unrecPrice = parseInt($(unrecPriceEL).val().replace(/,/g, "")); if (isNaN(unrecPrice)) unrecPrice = 0;  // 미회수원금
    var accInt1 = parseInt($(accIntEL).eq(0).val().replace(/,/g, "")); if (isNaN(accInt1)) accInt1 = 0;   // (승계) 경과이자
    var dailyCarTax1 = parseInt($(dailyCarTaxEL).eq(0).val().replace(/,/g, "")); if (isNaN(dailyCarTax1)) dailyCarTax1 = 0; // (승계) 일할자동차세
    var penalty = parseInt($(penaltyEL).val().replace(/,/g, "")); if (isNaN(penalty)) penalty = 0;  // 해지패널티
    var transPriceVal = unrecPrice + accInt1 + dailyCarTax1 + penalty;  // 승계금액
    $(transPriceValEL).text(GO.util.numberWithCommas(transPriceVal));

    var accInt2 = parseInt($(accIntEL).eq(1).val().replace(/,/g, "")); if (isNaN(accInt2)) accInt2 = 0; // (미승계) 경과이자
    var dailyCarTax2 = parseInt($(dailyCarTaxEL).eq(1).val().replace(/,/g, "")); if (isNaN(dailyCarTax2)) dailyCarTax2 = 0; // (미승계) 일할자동차세
    var succFee = parseInt($(succFeeEL).val().replace(/,/g, "")); if (isNaN(succFee)) succFee = 0;  // 승계수수료
    var finesEtc = parseInt($(finesEtcEL).val().replace(/,/g, "")); if (isNaN(finesEtc)) finesEtc = 0;  // 범칙금등
    var cogZone = parseInt($(cogZoneEL).val().replace(/,/g, "")); if (isNaN(cogZone)) cogZone = 0;  // 인지대
    var othSetFee = parseInt($(othSetFeeEL).val().replace(/,/g, "")); if (isNaN(othSetFee)) othSetFee = 0;  // 기타정산금
    var depGuar = parseInt($(depGuarEL).val().replace(/,/g, "")); if (isNaN(depGuar)) depGuar = 0;  // 예치보증금
    var unaccPriceVal = accInt2 + dailyCarTax2 + succFee + finesEtc + cogZone + othSetFee + depGuar;  // 미승계금액
    $(unaccPriceValEL).text(GO.util.numberWithCommas(unaccPriceVal));

    // 매입 천하-고객 정산
    if (unrecPrice.includes("pur_")) {
      // 천하-고객 정산 = 매입금액(purPrice) - 승계금액(transPriceVal) - 미승계금액(unaccPriceVal) + (excDepPrice)
      var purPrice = parseInt($(".purPrice input").val().replace(/,/g, "")); if (isNaN(purPrice)) purPrice = 0; // 매입가격
      var security = parseInt($(".pur_security input").val().replace(/,/g, "")); if (isNaN(security)) security = 0; // 보증금

      var chunCusSetVal = purPrice - transPriceVal - unaccPriceVal + security;
      $(".pur_chunCusSetVal").text(GO.util.numberWithCommas(chunCusSetVal));
    }

    // 판매 천하-금융사 정산 & 천하-고객 정산
    else if (unrecPrice.includes("sale_")) {
      // 천하-금융사 정산 = 보증금(security) + 금융신청금액(finAppPrice) - 승계금액(transPriceVal) - 미승계금액(unaccPriceVal) - 판매고객보증금(cusSecur)
      var security = parseInt($(".sale_security input").val().replace(/,/g, "")); if (isNaN(security)) security = 0; // 보증금
      var finAppPrice = parseInt($(".sale_finAppPrice input").val().replace(/,/g, "")); if (isNaN(finAppPrice)) finAppPrice = 0;  // 금융신청금액
      var cusSecur = parseInt($(".sale_cusSecur input").val().replace(/,/g, "")); if (isNaN(cusSecur)) cusSecur = 0;   // 판매고객보증금
      var finSet = security + finAppPrice - transPriceVal - unaccPriceVal - cusSecur;
      $(".sale_chunFinSetVal").text(GO.util.numberWithCommas(finSet));

      // 천하-고객 정산 = 판매금액(salesPriceVal) - 금융신청금액(finAppPrice) + 판매고객보증금(cusSecur) - 초과입금액(excDepPrice)
      var salesPriceVal = parseInt($(".salesPriceVal").eq(0).text().replace(/,/g, "")); if (isNaN(salesPriceVal)) salesPriceVal = 0; // 판매금액
      var excDepPrice = parseInt($(".sale_excDepPrice input").val().replace(/,/g, "")); if (isNaN(excDepPrice)) excDepPrice = 0; // 초과입금액
      var chunCusSetVal = salesPriceVal - finAppPrice + cusSecur + excDepPrice;
      $(".sale_chunCusSetVal").text(GO.util.numberWithCommas(chunCusSetVal));
    }
  },
