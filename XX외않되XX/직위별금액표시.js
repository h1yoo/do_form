calDayPrice: function () {
  // 일비 정산금액 계산
  $("#dynamic_table4 tr").each(function (i, e) {
    var selectedUserRank = $(e).find(".userRank select option:selected").val();

    if (selectedUserRank) {
      let price = 0;

      if (["주임", "대리", "과장", "차장"].includes(selectedUserRank)) {
        price = 30000;
      } else if (selectedUserRank === "팀장") {
        price = 35000;
      } else if (["실장", "위원"].includes(selectedUserRank)) {
        price = 40000;
      } else if (["대표", "소장", "본부장", "이사"].includes(selectedUserRank)) {
        price = 50000;
      }

      $(e).find(".price4").text(price ? GO.util.numberWithCommas(price) : "");
    }
  });

  // 총 합계 계산
  var sum_price4 = 0;

  $(".price4").each(function () {
    var val = parseFloat($(this).text().replace(/,/g, ""));
    if (!isNaN(val)) {
      sum_price4 += val;
    }
  });

  $(".sum_price4").text(GO.util.numberWithCommas(sum_price4));
}
