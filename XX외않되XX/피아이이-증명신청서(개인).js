checkInputSub: function () {
    // 선택된 체크박스 가져오기
    const query = 'input[type="checkbox"]:checked';
    const selectedEls = document.querySelectorAll(query);

    // 선택된 값 구성
    let result = '';
    const selectedCount = selectedEls.length;

    if (selectedCount > 0) {
        result = selectedEls[0].value;
        if (selectedCount > 1) {
            result += ` 외 ${selectedCount - 1}건`;
        }
    }

    // 날짜 및 구분 가져오기
    const subDate = this.formatDate($(".subDate input").val());
    const subUse = $(".subUse select").val();

    // 하나라도 값이 있으면 제목 작성
    if (result || subDate || subUse) {
        const title = `${subUse || ""}(${subDate || ""}, ${result || ""})`;
        $("#subject input").val(title);
        $("#tmp_title input").val(title);
    }
}
