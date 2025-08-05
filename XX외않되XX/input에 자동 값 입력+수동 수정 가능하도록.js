calVatTotalAMT: function () {
  $("#dynamic_table1 tr").each(function (i, e) {
    const $row = $(e);
    const $netAMT = $row.find(".netAMT input");
    const $vat = $row.find(".vat input");
    const $WithholdTax = $row.find(".WithholdTax input");
    const $totalAMT = $row.find(".totalAMT input");

    let netAMT = parseFloat($netAMT.val().replace(/,/g, "")) || 0;
    let WithholdTax = parseFloat($WithholdTax.val().replace(/,/g, "")) || 0;

    // --- VAT 계산 ---
    let vat;
    if ($vat.data("auto") !== false) {
      vat = netAMT * 0.16;
      $vat.val(GO.util.numberWithCommas(vat.toFixed(2)));
      $vat.data("auto", true); // 자동계산 중이라는 표시
    } else {
      vat = parseFloat($vat.val().replace(/,/g, "")) || 0;
    }

    // --- totalAMT 계산 ---
    if ($totalAMT.data("auto") !== false) {
      let totalAMT = netAMT + vat - WithholdTax;
      $totalAMT.val(GO.util.numberWithCommas(totalAMT.toFixed(2)));
      $totalAMT.data("auto", true);
    }
  });
}


// 사용자가 VAT를 수동으로 입력한 경우
$(document).on("input", ".vat input", function () {
  $(this).data("auto", false);
});

// 사용자가 totalAMT를 수동으로 입력한 경우
$(document).on("input", ".totalAMT input", function () {
  $(this).data("auto", false);
});
