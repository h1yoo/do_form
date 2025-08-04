      // 일비 기간 날짜
      var startDate = moment($('.day_period input').eq(0).val(), "YYYY-MM-DD");
      var endDate = moment($('.day_period input').eq(1).val(), "YYYY-MM-DD");

      // startDate와 endDate 사이에 주말이 포함되어 있으면 주말 일수는 제외하고 평일 날짜만 계산
      var dayDiff = endDate.diff(startDate, 'days') + 1;
