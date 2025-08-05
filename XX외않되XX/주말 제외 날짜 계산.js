calDayPrice: function () {
  $("#dynamic_table4 tr").each(function (i, e) {
    const selectedUserRank = $(e).find(".userRank select option:selected").val();

    // 각 행의 input에서 시작일, 종료일 가져오기
    const startDateStr = $(e).find(".day_period input").eq(0).val();
    const endDateStr = $(e).find(".day_period input").eq(1).val();

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    let dayDiff = 0;

    // 날짜 유효성 검사
    if (!isNaN(startDate) && !isNaN(endDate) && startDate <= endDate) {
      let current = new Date(startDate);

      while (current <= endDate) {
        const dayOfWeek = current.getDay(); // 0 = 일요일, 6 = 토요일
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          dayDiff++;
        }
        current.setDate(current.getDate() + 1); // 다음 날로 이동
      }
    }

    // 직급에 따라 금액 계산
    let price = 0;
    if (selectedUserRank) {
      if (["주임", "대리", "과장", "차장"].includes(selectedUserRank)) {
        price = 30000 * dayDiff;
      } else if (selectedUserRank === "팀장") {
        price = 35000 * dayDiff;
      } else if (["실장", "위원"].includes(selectedUserRank)) {
        price = 40000 * dayDiff;
      } else if (["대표", "소장", "본부장", "이사"].includes(selectedUserRank)) {
        price = 50000 * dayDiff;
      }
    }

    $(e).find(".price4").text(price ? GO.util.numberWithCommas(price) : "");
  });

  // 총합 계산
  let sum_price4 = 0;
  $(".price4").each(function () {
    const val = parseFloat($(this).text().replace(/,/g, ""));
    if (!isNaN(val)) {
      sum_price4 += val;
    }
  });
  $(".sum_price4").text(GO.util.numberWithCommas(sum_price4));
}
