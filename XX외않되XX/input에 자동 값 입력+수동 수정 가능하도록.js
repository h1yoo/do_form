(function () {
  // 수동 입력 여부 추적
  $(document).on("input", ".vat input", function () {
    $(this).data("isUserEdited", true);
  });

  $(document).on("input", ".netAMT input", function () {
    var $tr = $(this).closest("tr");
    var $vatInput = $tr.find(".vat input");

    // netAMT가 바뀌면 수동 상태 해제
    $vatInput.data("isUserEdited", false);

    // 즉시 자동 계산
    GO.fn.calVat();
  });

  // VAT 계산 함수
  GO.fn.calVat = function () {
    $("#dynamic_table1 tr").each(function (i, e) {
      var $row = $(e);
      var $netInput = $row.find(".netAMT input");
      var $vatInput = $row.find(".vat input");

      var netAMT = parseFloat($netInput.val().replace(/,/g, "")) || 0;
      var isUserEdited = $vatInput.data("isUserEdited");

      if (!isUserEdited) {
        var vat = netAMT * 0.16;
        $vatInput.val(GO.util.numberWithCommas(vat.toFixed(2)));
      }
    });
  };
})();
