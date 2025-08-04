// 사용자가 직접 totalAMT 수정한 경우 추적
$(document).on("input", ".totalAMT input", function () {
  $(this).data("userModified", true);
});

// netAMT 값 변경 시 totalAMT 다시 자동계산
$(document).on("input", ".netAMT input, .WithholdTax input", function () {
  // totalAMT 수동 입력 해제
  $(this).closest("tr").find(".totalAMT input").data("userModified", false);
  // 다시 계산
  GO.fn.calVatTotalAMT();
});


calVatTotalAMT : function () {
  $("#dynamic_table1 tr").each(function(i, e){
    var $row = $(e);
    var $netInput = $row.find(".netAMT input");
    var $vatInput = $row.find(".vat input");
    var $withholdInput = $row.find(".WithholdTax input");
    var $totalInput = $row.find(".totalAMT input");

    if ($netInput.length) {
      var netAMT = parseFloat($netInput.val().replace(/,/g, "")) || 0;
      var WithholdTax = parseFloat($withholdInput.val().replace(/,/g, "")) || 0;

      // VAT 자동 계산 (항상 자동)
      var vat = netAMT * 0.16;
      $vatInput.val(GO.util.numberWithCommas(vat.toFixed(2)));

      // 수동 입력이 아닐 경우에만 totalAMT 계산
      if (!$totalInput.data("userModified")) {
        var totalAMT = netAMT + vat - WithholdTax;
        $totalInput.val(GO.util.numberWithCommas(totalAMT.toFixed(2)));
      }
    }
  });
}
