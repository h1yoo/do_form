
checkInputSub: function () {
    var subCertSel = [];
    
    $(".subCertSel").nextAll("tr").slice(0, 3).find("td").each(function () {
        var $td = $(this);
        var label = $td.contents().filter(function () {
            return this.nodeType === 3; // 텍스트 노드만
        }).text().trim();

        var value = $td.find("select").val();
        if (value !== "0") {
            subCertSel.push(label);
        }
    });

    var subDate = this.formatDate($(".subDate input").val());
    var subUse = $(".subUse select").val();

    if (subCertSel.length || subDate || subUse) {
        var title = subUse + "(" + subDate + ", " + subCertSel.join(", ") + ")" || "";
        $("#subject input").val(title);
        $("#tmp_title input").val(title);
    }
},

beforeSave: function () {
    $('.viewModeHiddenPart').hide();

    var subCertSel = [];
    
    $(".subCertSel").nextAll("tr").slice(0, 3).find("td").each(function () {
        var $td = $(this);
        var label = $td.contents().filter(function () {
            return this.nodeType === 3;
        }).text().trim();

        var value = $td.find("select").val();
        if (value !== "0") {
            subCertSel.push(label);
        }
    });

    var subDate = this.formatDate($(".subDate input").val());
    var subUse = $(".subUse select").val();

    var title = subUse + "(" + subDate + ", " + subCertSel.join(", ") + ")" || "";
    $("#subject").val(title);
}
