calDayPrice : function () {
  // 일비 정산금액 계산
  $("#dynamic_table4 tr").each(function (i, e) {
    var selectedUserRank = $(e).find(".userRank select option:selected").val();

    // 각 행에서 일비 기간 날짜 가져오기
    var startDateStr = $(e).find('.day_period input').eq(0).val();
    var endDateStr = $(e).find('.day_period input').eq(1).val();

    var startDate = moment(startDateStr, "YYYY-MM-DD");
    var endDate = moment(endDateStr, "YYYY-MM-DD");

    // 기본 일수 차이 계산 (양 끝 포함)
    var dayDiff = endDate.diff(startDate, 'days') + 1;

    // 날짜 유효성 검사
    if (!startDate.isValid() || !endDate.isValid() || startDate.isAfter(endDate)) {
      dayDiff = 0;
    } else {
      // 주말 제외 계산
      let weekendCount = 0;
      let current = startDate.clone();

      while (current.isSameOrBefore(endDate)) {
        const dayOfWeek = current.day(); // 0 = 일요일, 6 = 토요일
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          weekendCount++;
        }
        current.add(1, 'days');
      }

      dayDiff -= weekendCount;
    }

    // 직급에 따라 금액 계산
    if (selectedUserRank) {
      let price = 0;

      if (["주임", "대리", "과장", "차장"].includes(selectedUserRank)) {
        price = 30000 * dayDiff;
      } else if (selectedUserRank === "팀장") {
        price = 35000 * dayDiff;
      } else if (["실장", "위원"].includes(selectedUserRank)) {
        price = 40000 * dayDiff;
      } else if (["대표", "소장", "본부장", "이사"].includes(selectedUserRank)) {
        price = 50000 * dayDiff;
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
