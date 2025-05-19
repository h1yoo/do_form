
    // 1. 납품물 정보 테이블
		$(".Amount1 input, .Amount2 input, .Amount3 input, Amount4 input").on("change",function(){
      self.calTotalWL();
      
      self.calAmount(".Amount1 input", ".TotalAmount1 input");
      self.calAmount(".Amount2 input", ".TotalAmount2 input");
      self.calAmount(".Amount3 input", ".TotalAmount3 input");
      self.calAmount(".Amount4 input", ".TotalAmount4 input");
      self.calAmount(".Result input", ".TotalResult input");
      
      let value = $(this).val().replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
          $(this).val(Number(value).toLocaleString()); // 숫자로 변환 후 콤마 추가
      }
    });
     
    // 2-2) 외부 테이블
		$(".Amount2-1 input, .Amount2-2 input, .Amount2-3 input").on("change",function(){
      self.calTotalPay();
      
      self.calAmount(".Amount2-1 input", ".TotalAmount2-1 input");
      self.calAmount(".Amount2-2 input", ".TotalAmount2-2 input");
      self.calAmount(".Amount2-3 input", ".TotalAmount2-3 input");
      
      let value = $(this).val().replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
          $(this).val(Number(value).toLocaleString()); // 숫자로 변환 후 콤마 추가
      }
    });
     
    // 3. 수금일정 테이블
		$(".Amount3-1 input").on("change",function(){
      self.calAmount(".Amount3-1 input", ".TotalAmount3-1 input");
      
      let value = $(this).val().replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
          $(this).val(Number(value).toLocaleString()); // 숫자로 변환 후 콤마 추가
      }
    });
	},




  // 맨 마지막 행 합계 구하는 함수
	calAmount : function (amountEL, totalAmoutEL) {
		var sum_amount = 0;

    $(amountEL).each(function(i,e){
      sum_amount += Number($(e).val().replace(/,/g, ""));
    })
    
		$(totalAmoutEL).val(GO.util.numberWithCommas(sum_amount));
	},
