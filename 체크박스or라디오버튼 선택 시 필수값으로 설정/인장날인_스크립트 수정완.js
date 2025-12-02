	/**

	 

	 *  양식명: 인장날인/법인서류신청서                                                                                                                                                                                                                                      

	 

	 */

	 

	  var Integration = Backbone.View.extend({

	    initialize: function (options) {

	      this.options = options || {};

	      this.docModel = this.options.docModel;

	      this.variables = this.options.variables;

	      this.infoData = this.options.infoData;

	 

	    },

	 

	    render: function () {

	      var self = this;

	      $('#draftUserEmail').css('width', '100%');

	      self.checkValidate();
	      self.checkValidate2();

	      /* docStatus == 'Create'or 'TempSave' 일때 불리는 함수. (2.0.0 이전의 쓰던 연동코드를 구현) */

	      $('.check1 input, .check2 input, .check3 input, .checkBox1 input').on('click', function () {

	        self.checkValidate();
	        self.checkValidate2();
	        self.checkContractDate();
	      });

	 

	      // $('.check3 input').on('click', function() {

	      // self.titleCheck()

	      // })

	      
	      $('.ContractCheck input[type="radio"]').on('click', function(){
	 	     self.checkValidate();
	 	     self.checkValidate2();
	 	   })

	      
	      $('.contractKind input[type="radio"]').on('click', function(){
	    	  self.checkValidate();
	    	  self.checkValidate2();
	      })

	    },

			checkContractDate : function () {

				if($('.check1 input').is(':checked') == true){
					$('.contractDate').eq(0).find('input').attr('data-require', true);
					$('.contractDate').eq(0).find('input').attr('placeholder', '필수값 입니다.');
					$('.contractDate').eq(1).find('input').attr('data-require', true);
					$('.contractDate').eq(1).find('input').attr('placeholder', '필수값 입니다.');
				} else {
					$('.contractDate').eq(0).find('input').attr('data-require', false);
					$('.contractDate').eq(0).find('input').attr('placeholder', '');
					$('.contractDate').eq(1).find('input').attr('data-require', false);
					$('.contractDate').eq(1).find('input').attr('placeholder', '');
				}

			},
	   

	    checkValidate2 : function() {

	var self = this;


	if($('.contractKind input[type="radio"]:checked').val() == "광고계약"){
		console.log("광고계약");
		$(".ContractNo1 input").attr("readonly", true);
		$('.ContractNo1').find('input').attr('placeholder', '계약 종류 하도급 선택시 입력가능');
	
	}

	if($('.contractKind input[type="radio"]:checked').val() == "하도급"){

	console.log("하도급");

	$(".ContractNo1 input").attr("readonly", false);
	$('.ContractNo1 input').attr('placeholder', '');

	}



	},

	   

	 
	    checkValidate: function () {

	      //체크박스 눌렀을때, 해당 박스 내의 요소 필수지정. 체크 풀리면 필수지정 없애고 값 초기화

	   

	if($('.ContractCheck input[type="radio"]').eq(0).is(":checked")){

	$('.contractForm').hide();

	$('.contractKind').show();

	$('.ContractNo1').show();

	$('.ContractNo2').hide();
	$('.check4Block').show();
	}


	if($('.ContractCheck input[type="radio"]').eq(1).is(":checked")){

	$('.contractForm').show();

	$('.contractKind').hide();

	$('.ContractNo1').hide();

	$('.ContractNo2').show();
	$('.check4Block').hide();

	$('.ContractNo2').find('input:visible').attr('placeholder', '필수항목을 입력해주세요');


	}




	      if (($('.check1 input').is(':checked') == true)) {

	        $('.check1Block .BCel').eq(3).find('input').attr('data-require', true);

	       // $('.check1Block .BCel').eq(4).find('input').attr('data-require', true);

	        // $('.check1Block .BCel').eq(5).find('input').attr('data-require', true);

	        $('.check1Block .BCel').eq(6).find('input').attr('data-require', true);

	        $('.check1Block .BCel').eq(7).find('input').attr('data-require', true);

	        $('.check1Block .BCel').eq(3).find('input').attr('placeholder', '필수항목을 입력해주세요');

	        $('.check1Block .BCel').eq(4).find('input').attr('placeholder', '필수항목을 입력해주세요');

	        $('.check1Block .BCel').eq(5).find('input').attr('placeholder', '필수항목을 입력해주세요');

	        $('.check1Block .BCel').eq(6).find('input').attr('placeholder', '필수항목을 입력해주세요');

	        $('.check1Block .BCel').eq(7).find('input').attr('placeholder', '필수항목을 입력해주세요');

	      } else if (($('.check1 input').is(':checked') == false)) {
	        $('.check1Block input:lt(13)').attr('data-require', false);

	        $('.check1Block input:lt(13)').attr('placeholder', '');

	        $('.check1Block .BCel').eq(3).find('input').attr('data-require', false);

	        //$('.check1Block .BCel').eq(4).find('input').attr('data-require', false);

	        // $('.check1Block .BCel').eq(5).find('input').attr('data-require', false);

	        $('.check1Block .BCel').eq(6).find('input').attr('data-require', false);

	        $('.check1Block .BCel').eq(7).find('input').attr('data-require', false);

	 
	        $('.check1Block .BCel').eq(3).find('input').attr('placeholder', '');

	        $('.check1Block .BCel').eq(4).find('input').attr('placeholder', '');

	        // $('.check1Block .BCel').eq(5).find('input').attr('placeholder', '');

	        $('.check1Block .BCel').eq(6).find('input').attr('placeholder', '');

	        $('.check1Block .BCel').eq(7).find('input').attr('placeholder', '');

	        $('.check1Block .BCel').eq(3).find('input').val('');

	        $('.check1Block .BCel').eq(4).find('input').val('');

	        // $('.check1Block .BCel').eq(5).find('input').val('');

	        $('.check1Block .BCel').eq(6).find('input').val('');

	        $('.check1Block .BCel').eq(7).find('input').val('');

	        $('.check1Sort input').attr('checked', false);

	      }

	 

	 

	      if (($('.check2 input').is(':checked') == true)) {

	        $('.check2Block .BCel').eq(3).find('input').attr('data-require', true);

	        $('.check2Block .BCel').eq(4).find('input').attr('data-require', true);

	        $('.check2Block .BCel').eq(3).find('input').attr('placeholder', '필수항목을 입력해주세요');

	        $('.check2Block .BCel').eq(4).find('input').attr('placeholder', '필수항목을 입력해주세요');

	      } else if (($('.check2 input').is(':checked') == false)) {

	        $('.check2Block .BCel').eq(3).find('input').attr('data-require', false);

	        $('.check2Block .BCel').eq(4).find('input').attr('data-require', false);

	        $('.check2Block .BCel').eq(3).find('input').attr('placeholder', '');

	        $('.check2Block .BCel').eq(4).find('input').attr('placeholder', '');

	        $('.check2Block .BCel').eq(3).find('input').val('');

	        $('.check2Block .BCel').eq(4).find('input').val('');

	        $('.check2Sort input').attr('checked', false);

	      }

	 

	      if (($('.check3 input').is(':checked') == true)) {

	        $('.check3Block .BCel').eq(2).find('input').attr('data-require', true);

	        $('.check3Block .BCel').eq(3).find('input').attr('data-require', true);

	        $('.check3Block .BCel').eq(4).find('input').attr('data-require', true);

	 

	 

	        $('.check3Block .BCel').eq(2).find('input').attr('placeholder', '필수항목을 입력해주세요');

	 

	        $('.check3Block .BCel').eq(3).find('input').attr('placeholder', '필수항목을 입력해주세요');

	 

	        $('.check3Block .BCel').eq(4).find('input').attr('placeholder', '필수항목을 입력해주세요');

	 

	 

	 

	 
	 

	 

	      } else if (($('.check3 input').is(':checked') == false)) {

	 

	        $('.check3Block .BCel').eq(2).find('input').attr('data-require', false);

	 

	        $('.check3Block .BCel').eq(3).find('input').attr('data-require', false);

	 

	        $('.check3Block .BCel').eq(4).find('input').attr('data-require', false);

	 

	 

	        $('.check3Block .BCel').eq(2).find('input').attr('placeholder', '');

	 

	        $('.check3Block .BCel').eq(3).find('input').attr('placeholder', '');

	 

	        $('.check3Block .BCel').eq(4).find('input').attr('placeholder', '');

	 

	 

	        $('.check3Block .BCel').eq(2).find('input').val('');

	 

	        $('.check3Block .BCel').eq(3).find('input').val('');

	 

	        $('.check3Block .BCel').eq(4).find('input').val('');

	 

	        $('.check3Sort input').attr('checked', false);

	 

	 

	 

	      }

	 

	 

	      if (($('.checkBox1 input').is(':checked') == true)) {

	 

	        $('.check4Block .BCel').eq(3).find('input').attr('data-require', true);

	 

	        $('.check4Block .BCel').eq(4).find('input').attr('data-require', true);

	 

	        $('.check4Block .BCel').eq(5).find('input').attr('data-require', true);

	 

	 

	 

	 

	        $('.check4Block .BCel').eq(3).find('input').attr('placeholder', '필수항목을 입력해주세요');

	 
	 

	        $('.check4Block .BCel').eq(4).find('input').attr('placeholder', '필수항목을 입력해주세요');

	 

	        $('.check4Block .BCel').eq(5).find('input').attr('placeholder', '필수항목을 입력해주세요');

	 

	 

	 

	 

	 

	      } else if (($('.checkBox1 input').is(':checked') == false)) {

	 

	        $('.check4Block .BCel').eq(3).find('input').attr('data-require', false);

	 

	        $('.check4Block .BCel').eq(4).find('input').attr('data-require', false);

	 

	        $('.check4Block .BCel').eq(5).find('input').attr('data-require', false);

	 

	 

	 

	 

	        $('.check4Block .BCel').eq(3).find('input').attr('placeholder', '');

	 

	        $('.check4Block .BCel').eq(4).find('input').attr('placeholder', '');

	 

	        $('.check4Block .BCel').eq(5).find('input').attr('placeholder', '');

	 

	 

	 

	 

	 

	        $('.check4Block .BCel').eq(3).find('input').val('');

	 

	        $('.check4Block .BCel').eq(4).find('input').val('');

	 

	        $('.check4Block .BCel').eq(5).find('input').val('');

	 

	 

	 

	        $('.checkBox2 input').attr('checked', false);

	 

	 

	 

	 

	 
	 

	      }

	 

	 

	 

	      if (($('.check1 input').is(':checked') == true)) {

	 

	        $('.check4Block input').attr('disabled', 'true');

	 

	        $('.check2Block input').attr('disabled', 'true');

	 

	 

	      } else if (($('.check2 input').is(':checked') == true)) {

	 

	        $('.check1Block input').attr('disabled', 'true');

	 

	 

	        $('.check4Block input').attr('disabled', 'true');

	 

	 

	      } else if (($('.checkBox1 input').is(':checked') == true)) {

	 

	        $('.check1Block input').attr('disabled', 'true');

	 

	        $('.check2Block input').attr('disabled', 'true');

	 

	 

	 

	 

	      } else if (($('.check1 input').is(':checked') == false)

	 

	        && ($('.check2 input').is(':checked') == false)

	 

	        && ($('.checkBox1 input').is(':checked') == false)) {

	 

	        $('.check1Block input').removeAttr('disabled');

	 

	        $('.check2Block input').removeAttr('disabled');

	 

	        $('.check4Block input').removeAttr('disabled');

	 

	      }

	 

	 
	    },

	 

	 

	 

	 

	 

	    renderViewMode: function () {

	      /* 읽기모드에서 함수가 필요한 경우 구현 */

	    },

	 

	 

	 

	    onEditDocument: function () {

	      /* '수정 ' 버튼을 눌렀을때 실행. */

	    },

	 

	 

	 

	    beforeSave: function () {

	    },

	 

	 

	 

	    afterSave: function () {

	    },

	 

	 

	 

	    validate: function () {

	    	if($('.ContractCheck input[type="radio"]').eq(0).is(":checked") == true && $('.contractKind input[type="radio"]:checked').val() == "하도급"){
	    		if($('.ContractNo1 input').val() == ""){
	    			 $.goError('계약 심의 품의번호를 입력해주세요');
	    			 return false;
	    		}
	    	}

	      if (($('.check1 input').is(':checked') == false)
	        && ($('.check2 input').is(':checked') == false)
	        && ($('.checkBox1 input').is(':checked') == false) && ($('.check3 input').is(':checked') == false)) {

	        $.goError('작성할 양식을 체크해주세요');
	        return false;
	      }

	      if (($('.check1 input').is(':checked') == true)
	        && ($('.check1Sort input').is(':checked') == false)) {

	        $.goError('날인구분을 체크해주세요');
	        return false;
	      }

	      if (($('.check2 input').is(':checked') == true)
	        && ($('.check2Sort input').is(':checked') == false)) {

	        $.goError('날인구분을 체크해주세요');
	        return false;
	      }


	      if (($('.check3 input').is(':checked') == true)
	        && ($('.check3Sort input').is(':checked') == false)) {

	        $.goError('날인구분을 체크해주세요');
	        return false;
	      }


	      if (($('.checkBox1 input').is(':checked') == true)
	        && ($('.checkBox2 input').is(':checked') == false)) {

	        $.goError('날인구분을 체크해주세요');
	        return false;
	      }


				// 스크립트 추가 (2025.12.02)
				// 인장날인(계약서) 체크박스 선택되면 '계약 시작일', '계약 종료일' 도 필수 입력 값으로 설정
	      if (($('.check1 input').is(':checked') == true)
	        && ($('.contractDate input').val() == null || $('.contractDate input').val() == "" || $('.contractDate input').val() == undefined)) {

	        $.goError('계약 시작일과 계약 종료일을 입력해주세요');
	        return false;
	      }

	 
	 

	 

	      return true;

	 

	    },

	 

	 

	 

	    getDocVariables: function () {

	      /* getDocVariables 사용 하려면 return 소스 코드 구현 */

	    }

	  });

	 

	  return Integration;

