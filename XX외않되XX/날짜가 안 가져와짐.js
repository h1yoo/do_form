<td class="BCel" style="">
  <input type="text" readonly="" style="vertical-align:middle;width:100%;border:0px;box-shadow: inset 0px 0px 0px rgba(150,150,150,0.2)" data-dsl="{{label:draftDate}}" name="draftDate" id="draftDate" value="" data-id="draftDate" data-name="draftDate" data-require="false" data-maxlength="" data-width="" data-defaultstr="" data-editable="false" data-value="2025-10-13(월)" placeholder="">                                 
</td>


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
