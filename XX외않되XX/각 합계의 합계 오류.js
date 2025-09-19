$('.price').on('input', function () {
    let value = $(this).val().replace(/[^0-9]/g, ''); // 숫자만 남김
    if (value) {
        $(this).val(Number(value).toLocaleString()); // 5,000
    } else {
        $(this).val('');
    }
});
