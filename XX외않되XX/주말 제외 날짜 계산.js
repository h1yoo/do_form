
  calDayPrice : function () {
    // 일비 정산금액 계산
    $("#dynamic_table4 tr").each(function (i, e) {
      var selectedUserRank = $(e).find(".userRank select option:selected").val();

      // 일비 기간 날짜
      var startDate = moment($('.day_period input').eq(0).val(), "YYYY-MM-DD");
      var endDate = moment($('.day_period input').eq(1).val(), "YYYY-MM-DD");

      var workdayCount = 0;
      var current = startDate.clone();

      while (current.isSameOrBefore(endDate)) {
        var dayOfWeek = current.day(); // 0: 일요일, 6: 토요일
        var formattedDate = current.format("YYYY-MM-DD");

        // 주말이 아니고 공휴일이 아니면 근무일로 카운트
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          workdayCount++;
        }

        current.add(1, 'days');
      }

      // console.log("주말과 공휴일 제외한 근무일 수:", workdayCount);

      if (selectedUserRank) {
        let price = 0;

        if (["주임", "대리", "과장", "차장"].includes(selectedUserRank)) {
          console.log("직위 : ", selectedUserRank);
          console.log("주말과 공휴일 제외한 근무일 수:", workdayCount);
          price = 30000 * workdayCount;
        } else if (selectedUserRank === "팀장") {
          price = 35000 * workdayCount;
        } else if (["실장", "위원"].includes(selectedUserRank)) {
          price = 40000 * workdayCount;
        } else if (["대표", "소장", "본부장", "이사"].includes(selectedUserRank)) {
          console.log("직위 : ", selectedUserRank);
          console.log("주말과 공휴일 제외한 근무일 수:", workdayCount);
          price = 50000 * workdayCount;
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
