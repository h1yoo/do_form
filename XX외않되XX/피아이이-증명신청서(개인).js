checkInputSub: function () {
    const certTypes = [
        '재직증명',
        '재직증명(영문)',
        '경력증명',
        '경력증명(영문)',
        '원천징수영수증',
        '갑종근로소득납세필증명'
    ];

    const certCounts = Array(certTypes.length).fill(0);

    $('td').each(function () {
        const td = $(this);
        const tdText = td.text().replace(/\s+/g, '').trim(); // 공백 제거 후 텍스트 비교

        certTypes.forEach(function (certName, index) {
            if (tdText.includes(certName)) {
                const select = td.find('select.editor_slt');
                if (select.length > 0) {
                    const val = parseInt(select.val(), 10);
                    if (!isNaN(val)) {
                        certCounts[index] = val;
                    }
                }

                const checkbox = td.find('input[type="checkbox"]');
                if (checkbox.length && checkbox.is(':checked')) {
                    certCounts[index] = 1;
                }
            }
        });
    });

    console.log(certCounts);

    var subCertSel = certCounts.join(','); // ← 빠졌던 부분 보완
    var subDate = this.formatDate($(".subDate input").val());
    var subUse = $(".subUse select").val();

    if (subCertSel || subDate || subUse) {
        var title = subUse + "(" + subDate + ", " + subCertSel + ")" || "";
        $("#subject input").val(title);
        $("#tmp_title input").val(title);
    }
},
