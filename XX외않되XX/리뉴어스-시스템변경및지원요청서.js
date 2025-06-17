
    checkInputSub: function () {

        var emergency = $(".emergency select").val();  // 선택된 긴급여부 드롭박스 옵션값
        var selected = $(".selectedSub select").val();  // 선택된 대상시스템 드롭박스 옵션값
        var request = $(".request select").val();  // 선택된 요청구분 드롭박스 옵션값
        // var prefixes = $(".selectedSub select option").map(function () {    // 대상시스템 드롭박스 옵션값 모두 추출
        //     return $(this).text();
        // }).get();
        var inputVal = $("#tmp_title input").val();
        var title = "";
        console.log("selected: ", selected, " , inputVal: ", inputVal, " , prefixes: ", prefixes);

        // // 모든 prefix 후보들 중 실제로 앞에 붙어 있는 prefix만 제거
        // prefixes.forEach(function (prefix) {
        //     if (inputVal.startsWith(prefix + "_")) {
        //         inputVal = inputVal.slice(prefix.length + 1); // prefix 제거
        //     }
        // });
    
        // prefix 텍스트 표시
        if (emergency && emergency !== "--선택--") {
            title += emergency + "/";
            $("#prefixText").text(title);
        } else if (selected && selected !== "--선택--") {
            $("#prefixText").text(title);
        } else if (request && request !== "--선택--") {
            $("#prefixText").text(seltitle);
        } else {
            $("#prefixText").text("");
        }

        $("#tmp_title input").val(inputVal);
    },
