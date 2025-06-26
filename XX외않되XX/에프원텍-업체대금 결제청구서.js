// 해당 input이 속한 행만 계산되게 함수 수정

$(".amount input, .unit input").on("change", function () {
  self.calPrice(this); // ← 여기 중요!

  self.calAmountVal(".amount input", ".sum_amount");
  self.calAmountVal(".unit input", ".sum_unit");
  self.calAmountText(".price", ".sum_price");
  self.calAmountText(".tax", ".sum_tax");
  self.calAmountText(".sum", ".total_sum");

  let value = $(this).val().replace(/,/g, "");
  if (!isNaN(value) && value !== "") {
    $(this).val(Number(value).toLocaleString());
  }
});

calPrice: function (targetInput) {
  var $row = $(targetInput).closest("tr");

  var amount = parseInt($row.find(".amount input").val().replace(/,/g, "")) || 0;
  var unit = parseInt($row.find(".unit input").val().replace(/,/g, "")) || 0;

  var price = 0, tax = 0, sum = 0;
  if (amount > 0 && unit > 0) {
    price = amount * unit;
    tax = price / 10;
    sum = price + tax;
  }

  $row.find(".price").text(GO.util.numberWithCommas(price.toFixed(0)));
  $row.find(".tax").text(GO.util.numberWithCommas(tax.toFixed(0)));
  $row.find(".sum").text(GO.util.numberWithCommas(sum.toFixed(0)));
}
