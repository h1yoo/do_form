
  // 정산상세 금액 구하는 함수
  calDetailPrice : function(){
    var unrecPrice = parseInt($(".unrecPrice input").val().replace(/,/g, "")); if (isNaN(unrecPrice)) unrecPrice = 0;
    var accInt1 = parseInt($(".accInt input").eq(0).val().replace(/,/g, "")); if (isNaN(accInt1)) accInt1 = 0;
    var dailyCarTax1 = parseInt($(".dailyCarTax input").eq(0).val().replace(/,/g, "")); if (isNaN(dailyCarTax1)) dailyCarTax1 = 0;
    var penalty = parseInt($(".penalty input").val().replace(/,/g, "")); if (isNaN(penalty)) penalty = 0;
    var transPriceVal = unrecPrice + accInt1 + dailyCarTax1 + penalty;
    $(".transPriceVal").text(GO.util.numberWithCommas(transPriceVal));

    var accInt2 = parseInt($(".accInt input").eq(1).val().replace(/,/g, "")); if (isNaN(accInt2)) accInt2 = 0;
    var dailyCarTax2 = parseInt($(".dailyCarTax input").eq(1).val().replace(/,/g, "")); if (isNaN(dailyCarTax2)) dailyCarTax2 = 0;
    var succFee = parseInt($(".succFee input").val().replace(/,/g, "")); if (isNaN(succFee)) succFee = 0;
    var finesFee = parseInt($(".finesFee input").val().replace(/,/g, "")); if (isNaN(finesFee)) finesFee = 0;
    var cogZone = parseInt($(".cogZone input").val().replace(/,/g, "")); if (isNaN(cogZone)) cogZone = 0;
    var othSetFee = parseInt($(".othSetFee input").val().replace(/,/g, "")); if (isNaN(othSetFee)) othSetFee = 0;
    var depCuar = parseInt($(".depCuar input").val().replace(/,/g, "")); if (isNaN(depCuar)) depCuar = 0;
    var unaccPriceVal = accInt2 + dailyCarTax2 + succFee + finesFee + cogZone + othSetFee + depCuar;
    console.log("accInt2: ", accInt2);
    console.log("dailyCarTax2: ", dailyCarTax2);
    console.log("succFee: ", succFee);
    console.log("finesFee: ", finesFee);
    console.log("cogZone: ", cogZone);
    console.log("othSetFee: ", othSetFee);
    console.log("depCuar: ", depCuar);
    $(".unaccPriceVal").text(GO.util.numberWithCommas(unaccPriceVal));
  },
