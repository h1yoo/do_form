checkInputSub: function () {
    var title = "";
    var selected = $(".selectedSub select").val();
    var subRel = $(".subRel input").val();
    var subName = $(".subName input").val();
    var occDate = this.formatDate($(".occDate input").val());

    if (subRel || subName || occDate) {
        title = selected + "(" + subRel + " " + subName + ")" + occDate;
        $("#subject input").val(title);
        $("#tmp_title input").val(title);
    }
},

beforeSave : function() {
    $('.viewModeHiddenPart').hide();

    var selected = $(".selectedSub select").val();
    var subRel = $(".subRel input").val();
    var subName = $(".subName input").val();
    var occDate = this.formatDate($(".occDate input").val());

    var title = selected + "(" + subRel + " " + subName + ")" + occDate;

    $("#subject").val(title);
},

formatDate: function(rawDate) {
    var date = new Date(rawDate);
    if (isNaN(date)) return rawDate;

    var yyyy = date.getFullYear();
    var mm = ("0" + (date.getMonth() + 1)).slice(-2);
    var dd = ("0" + date.getDate()).slice(-2);
    return `${yyyy}-${mm}-${dd}`;
}
