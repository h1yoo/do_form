
  calDayPrice : function () {
    // 일비 정산금액 계산
		$("#dynamic_table4 tr").each(function(i, e){
      if ($(e).find(".userRank select option:selected")[0]) {
        var selectedUserRank = $('.userRank select option:selected').val();
        // var price = "";

        if(selectedUserRank == "주임" || selectedUserRank == "대리" || selectedUserRank == "과장" || selectedUserRank == "차장"){
          // price = "30000";
          $(e).find(".price4").text(GO.util.numberWithCommas("30000"));
        }
        else if(selectedUserRank == "팀장"){
          // price = "35000";
          $(e).find(".price4").text(GO.util.numberWithCommas("35000"));
        }
        else if(selectedUserRank == "실장" || selectedUserRank == "위원"){
          // price = "40000";
          $(e).find(".price4").text(GO.util.numberWithCommas("40000"));
        }
        else if(selectedUserRank == "대표" || selectedUserRank == "소장" || selectedUserRank == "본부장" || selectedUserRank == "이사"){
          // price = "50000";
          $(e).find(".price4").text(GO.util.numberWithCommas("50000"));
        }
        else {
          price = "";
        }

        // $(e).find(".price4").text(GO.util.numberWithCommas(price));
      }
    });

    var sum_price4 = 0;

    $(".price4").each(function () {
      var val = parseFloat($(this).text().replace(/,/g, ""));
      if (!isNaN(val)) {
        sum_price4 += val;
      }
    });

    $(".sum_price4").text(GO.util.numberWithCommas(sum_price4));
  },
