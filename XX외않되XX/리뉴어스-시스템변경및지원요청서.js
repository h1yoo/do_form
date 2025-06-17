
    checkInputSub: function () {
        var title = "";
        var title1 = "";
        var title2 = "";
        var title3 = "";
        var selected = $(".selectedSub select").val();  // 선택된 대상시스템 드롭박스 옵션값
        var request = $(".request select").val();  // 선택된 요청구분 드롭박스 옵션값
        var emergency = $(".emergency select").val();  // 선택된 긴급여부 드롭박스 옵션값
        
        var inputVal = $("#tmp_title input").val();
        var prefixes1 = $(".selectedSub select option").map(function () {   // 대상시스템 드롭박스 옵션값 모두 가져오기
            return $(this).text();
        }).get();
        var prefixes2 = $(".request select option").map(function () {   // 요청구분 드롭박스 옵션값 모두 가져오기
            return $(this).text();
        }).get();
        var prefixes3 = $(".emergency select option").map(function () {   // 긴급여부 드롭박스 옵션값 모두 가져오기
            return $(this).text();
        }).get();

        prefixes1.forEach(function (prefix) {
            if (inputVal.startsWith(prefix + "/")) {
                inputVal = inputVal.slice(prefix.length + 1); // prefix 제거
            }
        });
        prefixes2.forEach(function (prefix) {
            if (inputVal.startsWith(prefix + "/")) {
                inputVal = inputVal.slice(prefix.length + 1); // prefix 제거
            }
        });
        prefixes3.forEach(function (prefix) {
            if (inputVal.startsWith(prefix + "_")) {
                inputVal = inputVal.slice(prefix.length + 1); // prefix 제거
            }
        });
    
        if (selected && selected !== "--선택--") {
            title1 = selected + "/";
            title = title1 + title2 + title3;
            $("#prefixText").text(title);
        }
        if (request && request !== "--선택--") {
            title2 = request + "/";
            title = title1 + title2 + title3;
            $("#prefixText").text(title);
        }
        if (emergency && emergency !== "--선택--") {
            title3 = emergency + "_";
            title = title1 + title2 + title3;
            $("#prefixText").text(title);
        }
        if (selected == "--선택--") {
            title1 = "";
            title = title1 + title2 + title3;
            $("#prefixText").text(title);
        }
        if (request == "--선택--") {
            title2 = "";
            title = title1 + title2 + title3;
            $("#prefixText").text(title);
        }

        $("#tmp_title input").val(inputVal);
    },
