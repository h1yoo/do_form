checkInputSub: function () {
    const inputEl = $("#tmp_title input");
    let inputVal = inputEl.val();

    // 접두어 제거 함수
    function removePrefixes(val, selector, delimiter) {
        const prefixes = $(`${selector} option`).map(function () {
            return $(this).text();
        }).get();

        prefixes.forEach(function (prefix) {
            if (val.startsWith(prefix + delimiter)) {
                val = val.slice(prefix.length + delimiter.length);
            }
        });

        return val;
    }

    // 접두사 제거
    inputVal = removePrefixes(inputVal, ".selectedSub select", "/");
    inputVal = removePrefixes(inputVal, ".request select", "/");
    inputVal = removePrefixes(inputVal, ".emergency select", "_");

    // 접두사 생성
    const selected = $(".selectedSub select").val();
    const request = $(".request select").val();
    const emergency = $(".emergency select").val();

    const titleParts = [];

    if (selected && selected !== "--선택--") {
        titleParts.push(selected + "/");
    }

    if (request && request !== "--선택--") {
        titleParts.push(request + "/");
    }

    if (emergency && emergency !== "--선택--") {
        titleParts.push(emergency + "_");
    }

    const title = titleParts.join("");
    $("#prefixText").text(title);
    inputEl.val(inputVal);
},
