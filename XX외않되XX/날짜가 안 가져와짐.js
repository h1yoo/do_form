
  autoSubject: function() {
    var draftDate = this.docModel.draftDate;
    console.log("draftDate : ", draftDate);
    $('#subject').val(draftDate);
  },
