autoSubject: function() {
  var draftDate = this.docModel.draftDate;
  console.log("draftDate : ", draftDate);

  if (draftDate) {
    var dateOnly = draftDate.replace(/\(.*\)/, '').trim(); // "2025-10-13"
    var dateObj = new Date(dateOnly);
    
    if (!isNaN(dateObj.getTime())) {
      var days = ['일', '월', '화', '수', '목', '금', '토'];
      var formatted = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 (${days[dateObj.getDay()]})`;
      $('#subject').val(formatted);
    } else {
      console.warn("유효하지 않은 날짜 형식:", dateOnly);
    }
  } else {
    console.warn("draftDate 값이 없습니다.");
  }
}
