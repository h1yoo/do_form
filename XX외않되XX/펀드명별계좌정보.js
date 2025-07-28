$firstCBRERow.find('.out1 select').append('<option value="(주)하나은행">(주)하나은행</option>');
			





$('#select1').on('change', function(){
			
			$('#text span').hide();
			$('#stmap span').hide();
			var select1 = $('#select1 select option:selected').val();
      
      if(select1 == "CBRE GSA로지스틱스제1호전문투자형사모부동산자투자유한회사"){
          $('#add2').show();
          $('#stamp8').show();
          $('.out1 select').val('(주)하나은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경

          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').show();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();

        }else if(select1 == "CBRE GSA로지스틱스제1의1호전문투자형사모부동산모투자유한회사"){
          $('#add3').show();
          $('#stamp2').show();
          $('.out1 select').val('(주)하나은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').show();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();
          
      }else if(select1 == "CBRE GSA로지스틱스제1의2호전문투자형사모부동산모투자유한회사"){
          $('#add4').show();
          $('#stamp3').show();
          $('.out1 select').val('(주)하나은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').show();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();
          
      }else if(select1 == "CBRE GSA로지스틱스제1의3호전문투자형사모부동산모투자유한회사"){
          $('#add5').show();
          $('#stamp4').show();
          $('.out1 select').val('(주)하나은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').show();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();
          
      }else if(select1 == "CBRE GSA로지스틱스제1의4호전문투자형사모부동산모투자유한회사"){
          $('#add6').show();
          $('#stamp5').show();
          $('.out1 select').val('(주)하나은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').show();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();
          
      }else if(select1 == "CBRE GSA로지스틱스제1의5호전문투자형사모부동산모투자유한회사"){
          $('#add7').show();
          $('#stamp6').show();
          $('.out1 select').val('(주)하나은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').show();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();
          
      }else if(select1 == "CBRE 로지스밸리제1의6호전문투자형사모부동산모투자유한회사"){
          $('#add8').show();
          $('#stamp7').show();
          $('.out1 select').val('(주)하나은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').show();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();
          
      }else if(select1 == "CBRE GSA로지스틱스제2호전문투자형사모부동산자투자유한회사"){
          $('#add9').show();
          $('#stamp9').show();
          $('.out1 select').val('(주)하나은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').show();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();
          
      }else if(select1 == "CBRE 로지스밸리전문투자형사모부동산투자신탁제1호"){
          $('#add11').show();
          $('#stamp1').show();
          $('.out1 select').val('(주)하나은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('(주)KB펀드파트너스');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').show();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();

      }
      else if(select1 == "CBRE ILC전문투자형사모부동산자투자신탁제1호"){
          $('#add12').show();
          $('#stamp1').show();
          $('.out1 select').val('(주)신한은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').show();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();

      }else if(select1 == "CBRE ILC일반사모부동산모투자신탁제1-1호"){
          $('#add13').show();
          $('#stamp1').show();
          $('.out1 select').val('(주)신한은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').show();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();

      }else if(select1 == "CBRE DL일반부동산사모투자회사"){
          $('#add10').show();
          $('#stamp10').show();
          $('.out1 select').val('(주)국민은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').hide();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').show();
          $('.CBRE_defaoulInput').hide();

      }else if(select1 == "CBRE ILC일반사모부동산자투자신탁제2호"){
          $('#add11').show();
          $('#stamp1').show();
          $('.out1 select').val('(주)신한은행');  // 신탁업자 옵션값 변경
          $('.out2 select').val('삼정KPMG AAS Inc.');  // 일반사무관리회사 옵션값 변경
          
          // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
          $('.CBRE_GSA1_Acc').hide();
          $('.CBRE_GSA1_1_Acc').hide();
          $('.CBRE_GSA1_2_Acc').hide();
          $('.CBRE_GSA1_3_Acc').hide();
          $('.CBRE_GSA1_4_Acc').hide();
          $('.CBRE_GSA1_5_Acc').hide();
          $('.CBRE_GSA1_6_Acc').hide();
          $('.CBRE_GSA2_Acc').hide();
          $('.CBRE_ILC_1').hide();
          $('.CBRE_ILC_2').show();
          $('.CBRE_ILC_1_1').hide();
          $('.CBRE_1').hide();
          $('.CBRE_DL').hide();
          $('.CBRE_defaoulInput').hide();
          
      }else{
        // 펀드명 별 수취계좌 & 입금/출금 계좌 설정
        $('.CBRE_GSA1_Acc').hide();
        $('.CBRE_GSA1_1_Acc').hide();
        $('.CBRE_GSA1_2_Acc').hide();
        $('.CBRE_GSA1_3_Acc').hide();
        $('.CBRE_GSA1_4_Acc').hide();
        $('.CBRE_GSA1_5_Acc').hide();
        $('.CBRE_GSA1_6_Acc').hide();
        $('.CBRE_GSA2_Acc').hide();
        $('.CBRE_defaoulInput').show();
			}
    });
