
    checkInputSub: function () {
        // 선택된 목록 가져오기
        const query = 'input[type="checkbox"]:checked';
        const selectedEls = 
            document.querySelectorAll(query);
        
            // 선택된 목록에서 value 찾기
            let result = '';
            selectedEls.forEach((el) => {
            result += el.value + ' ';
        });
    
        // var subCertSel = certCounts.join(',');
        var subDate = this.formatDate($(".subDate input").val());
        var subUse = $(".subUse select").val();

        if (result || subDate || subUse) {
        // if (subCertSel || subDate || subUse) {
                var title = subUse + "(" + subDate + ", " + result + ")" || "";
                // var title = subUse + "(" + subDate + ", " + subCertSel + ")" || "";
                $("#subject input").val(title);
                $("#tmp_title input").val(title);
        }
    },
