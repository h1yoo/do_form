calDayPrice: function () {
  const holidays = [  // 공휴일 목록을 여기에 정의하거나 ajax로 받아와도 됩니다
    "2025-08-15", "2025-10-03", "2025-12-25"  // 예시
  ];

  $("#dynamic_table4 tr").each(function (i, e) {
    const selectedUserRank = $(e).find(".userRank select option:selected").val();
    const startVal = $('.day_period input').eq(0).val();
    const endVal = $('.day_period input').eq(1).val();
    const startDate = moment(startVal, "YYYY-MM-DD");
    const endDate = moment(endVal, "YYYY-MM-DD");

    let workDays = 0;

    if (startDate.isValid() && endDate.isValid() && startDate.isSameOrBefore(endDate)) {
      const current = startDate.clone();

      while (current.isSameOrBefore(endDate)) {
        const dayOfWeek = current.day(); // 0: 일요일, 6: 토요일
        const formatted = current.format("YYYY-MM-DD");

        if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays.includes(formatted)) {
          workDays++;
        }

        current.add(1, 'days');
      }
    }

    // 일비 계산
    let price = 0;

    if (selectedUserRank) {
      if (["주임", "대리", "과장", "차장"].includes(selectedUserRank)) {
        price = 30000 * workDays;
      } else if (selectedUserRank === "팀장") {
        price = 35000 * workDays;
      } else if (["실장", "위원"].includes(selectedUserRank)) {
        price = 40000 * workDays;
      } else if (["대표", "소장", "본부장", "이사"].includes(selectedUserRank)) {
        price = 50000 * workDays;
      }
    }

    $(e).find(".price4").text(price ? GO.util.numberWithCommas(price) : "");
  });

  // 총 합계 계산
  let sum_price4 = 0;

  $(".price4").each(function () {
    const val = parseFloat($(this).text().replace(/,/g, ""));
    if (!isNaN(val)) {
      sum_price4 += val;
    }
  });

  $(".sum_price4").text(GO.util.numberWithCommas(sum_price4));
},
