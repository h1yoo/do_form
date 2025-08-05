// 공휴일 리스트
const holidays = [
  "2025-01-01",
  "2025-03-01",
  "2025-05-05",
  "2025-06-06",
  "2025-08-15",
  "2025-10-03",
  "2025-10-09",
  "2025-12-25"
];

// 날짜 포맷 함수
function formatDate(date) {
  const y = date.getFullYear();
  const m = ('0' + (date.getMonth() + 1)).slice(-2);
  const d = ('0' + date.getDate()).slice(-2);
  return `${y}-${m}-${d}`;
}
