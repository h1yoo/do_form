// 시작일과 종료일
var startDate = moment($('.day_period input').eq(0).val(), "YYYY-MM-DD");
var endDate = moment($('.day_period input').eq(1).val(), "YYYY-MM-DD");

// 평일 일수 계산
var weekdayCount = 0;
var current = startDate.clone();

while (current.isSameOrBefore(endDate)) {
  var day = current.day(); // 0:일, 1:월, ..., 6:토
  if (day !== 0 && day !== 6) { // 평일만 카운트
    weekdayCount++;
  }
  current.add(1, 'days');
}

// weekdayCount에는 평일 일수가 들어 있음
console.log("평일 일수:", weekdayCount);
