
formatDate: function(rawDate) {
    var date = new Date(rawDate);
    if (isNaN(date)) return rawDate;

    var yyyy = date.getFullYear();
    var mm = ("0" + (date.getMonth() + 1)).slice(-2);
    var dd = ("0" + date.getDate()).slice(-2);
    return `${yyyy}/${mm}/${dd}`;
},

checkInputSub: function () {
    // 체크된 항목들을 배열로 추출
    var subCertSel = $(".subCertSel input[type='checkbox']:checked")
        .map(function () {
            return $(this).val();
        })
        .get()
        .join(", "); // 예: "매출, 상품권"
    var subDate = this.formatDate($(".subDate input").val());
    var subUse = $(".subUse select").val();

    if (subCertSel || subDate || subUse) {
            var title = subUse + "(" + subDate + ", " + subCertSel + ")" || "";
            $("#subject input").val(title);
            $("#tmp_title input").val(title);
    }
},


beforeSave :function() {
    $('.viewModeHiddenPart').hide();

    // 체크된 항목들을 배열로 추출
    var subCertSel = $(".subCertSel input[type='checkbox']:checked")
        .map(function () {
            return $(this).val();
        })
        .get()
        .join(", "); // 예: "매출, 상품권"
    var subDate = this.formatDate($(".subDate input").val());
    var subUse = $(".subUse select").val();

    var title = subUse + "(" + subDate + ", " + subCertSel + ")" || "";

    $("#subject").val(title); // 최종 제목 세팅
},
