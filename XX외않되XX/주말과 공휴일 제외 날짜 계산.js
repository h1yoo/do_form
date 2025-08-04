var startDate = moment($('.day_period input').eq(0).val(), "YYYY-MM-DD");
var endDate = moment($('.day_period input').eq(1).val(), "YYYY-MM-DD");

// 공휴일 목록
var holidays = [
  "2025-01-01", "2025-02-10", "2025-02-11", "2025-03-01",
  "2025-05-05", "2025-06-06", "2025-08-15", "2025-09-10",
  "2025-09-11", "2025-10-03", "2025-10-09", "2025-12-25"
];

var workdayCount = 0;
var current = startDate.clone();

while (current.isSameOrBefore(endDate)) {
  var dayOfWeek = current.day(); // 0: 일요일, 6: 토요일
  var formattedDate = current.format("YYYY-MM-DD");

  // 주말이 아니고 공휴일이 아니면 근무일로 카운트
  if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays.includes(formattedDate)) {
    workdayCount++;
  }

  current.add(1, 'days');
}

console.log("주말과 공휴일 제외한 근무일 수:", workdayCount);
