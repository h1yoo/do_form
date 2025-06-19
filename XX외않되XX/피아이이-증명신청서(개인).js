
// 가장 안전하고 깔끔한 방법: 전체 테이블/섹션 범위에서 체크된 것들 모두 수집
var subCertSel = $("table .subCertSel")
    .closest("table") // 같은 테이블 안에서
    .find("input[type='checkbox']:checked")
    .map(function () {
        return $(this).val();
    })
    .get()
    .join(", ");
