
      $(".selectEtc select").on("change", function () {
        var selectEtc = $(this).val();
                          
        if(selectEtc == "기타") {
          $(this).closest("td").find('.CBRE_defaultInput').show();
        } 
      });
