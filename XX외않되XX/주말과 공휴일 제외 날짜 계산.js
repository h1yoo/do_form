import holidaysKR from '@kyungseopk1m/holidays-kr';

const list = holidaysKR(2025); // [ '2025-01-01', '2025-03-01', ... ]

// 공휴일 배열 준비
let holidays = [];

// API 또는 모듈로 공휴일 불러오는 함수
async function loadHolidays(year) {
  // 예: Abstract API 사용
  const res = await fetch(`https://holidays.abstractapi.com/v1/?api_key=${API_KEY}&country=KR&year=${year}`);
  const json = await res.json();
  holidays = json.map(item => {
    const [month, day, year] = item.date.split('/');
    return `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
  });
  // 또는 holidaysKR(year) 이용
}

// 날짜 → YYYY‑MM‑DD 포맷 함수
function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

// 계산 함수
async function calcDayPrice() {
  const year = new Date().getFullYear();
  await loadHolidays(year);

  $('#dynamic_table4 tr').each((_, tr) => {
    const start = new Date($(tr).find('.day_period input').eq(0).val());
    const end = new Date($(tr).find('.day_period input').eq(1).val());
    let valid = !isNaN(start) && !isNaN(end) && start <= end;
    let workDays = 0;

    if (valid) {
      let cur = new Date(start);
      while (cur <= end) {
        const w = cur.getDay();
        const ds = formatDate(cur);
        if (w !== 0 && w !== 6 && !holidays.includes(ds)) {
          workDays++;
        }
        cur.setDate(cur.getDate()+1);
      }
    }

    // …직급별 계산 생략…
  });
}
