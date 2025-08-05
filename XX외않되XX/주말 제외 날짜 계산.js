
  calDayPrice : function () {
    // 일비 정산금액 계산
    $("#dynamic_table4 tr").each(function (i, e) {
      var selectedUserRank = $(e).find(".userRank select option:selected").val();

      // 일비 기간 날짜
      var startDate = moment($('.day_period input').eq(0).val(), "YYYY-MM-DD");
      var endDate = moment($('.day_period input').eq(1).val(), "YYYY-MM-DD");
      var dayDiff = endDate.diff(startDate, 'days') + 1;
      var current = startDate.clone();

      while (current.isSameOrBefore(endDate)) {
        var dayOfWeek = current.day(); // 0: 일요일, 6: 토요일

        // 주말이 아니고 공휴일이 아니면 근무일로 카운트
        if (dayOfWeek == 0 || dayOfWeek == 6) {
          dayDiff--;
        }

        current.add(1, 'days');
      }

      // 유효하지 않은 날짜인 경우
      if (!startDate.isValid() || !endDate.isValid() || startDate > endDate || startDate.isAfter(endDate)) {
        dayDiff = 0;
      }

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
  },
