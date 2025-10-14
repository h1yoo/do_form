      // var val = parseFloat($(this).val().replace(/,/g, ""));  // input에 쉼표 제거
      var val = parseFloat($(this).val().replace(/[^0-9]/g, ''));  // input에 숫자 외 문자는 모두 제거
