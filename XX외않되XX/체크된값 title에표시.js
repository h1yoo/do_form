
  checkOpt : function(){
      $('.seletedTitle').hide();
      
      var check1 = $('.selectTitleOpt input:checked').val();

      if(check1 == undefined){
        $('.seletedTitle').hide();
      } else{
        $('.seletedTitle').text(check1);
      }
  },
