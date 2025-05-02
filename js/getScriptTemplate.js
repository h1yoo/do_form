/***
 * 전자결재 연동 양식(html)에 추가될 javascript
 * @author : 홍수영 <sue7ky@daou.co.kr>
 * html 밑에 script tag로 끼는 것도 되고, admin page에서 경로 넣는 것도 됨.
 <script>$.getScript("https://int-badev.daouoffice.com/resources/test.js", function( data, textStatus, jqxhr ) {});</script>
 */

 (function() {
	var variables = GO.util.store.get('document.variables');
	var variablesData = {
			status : variables.status
	};


	//양식에 쓰이는 함수객체 
	var Formfunc = (function() {
		var _variable = {}; //variables 데이터를 가지고 있는 private변수
		var docMode = '';

		/***
		 * 테이블을 그린다.
		 */
		function render() {
			if (docMode == "EDIT") {
				// 편집 모드일 때만 해야 할 적업을 여기에 작성
				/* 
				ex)	편집 모드일 때만 input 창 활성화,
						버튼 표시,
						수정 가능한 필드 열기
				*/
			}

			// 편집 모드와 상관없이 화면이 렌더될 때 작업 코드 작성
		}

		/***
		 * Private 변수를 set한다. 
		 */
		function setData(data, mode) {
			_variable = data;
			docMode = mode;
		}

		/***
		 * 전자결재에서 사용할 variables 값을 설정 (사용시점 : draft, tempsave, modify doc)
		 */
		function getVariablesData() {
			return _variable;
		}

		/***
		 * 상신전 처리사항
		 */
		function beforeSave() {
			// 제목 스크립트 같은 스크립트 여기에 작성
		}

		/***
		 * 상신전 validate 처리
		 */
		function validateIntegrationData() {
			// // ex)
			// try {
			// 		// 시작일과 종료일 비교 로직 추가
			// 		var startDate = moment($('.period input').eq(0).val(), "YYYY-MM-DD"); // 시작일
			// 		var endDate = moment($('.period input').eq(1).val(), "YYYY-MM-DD");   // 종료일
			// 		var dayDiff = endDate.diff(startDate, 'days') + 1;

			// 		// 유효하지 않은 경우 작성
			// 		if (startDate.isValid() || endDate.isValid() || startDate.isAfter(endDate) || dayDiff > 5) {
			// 			// 날짜 형식이 잘못되었거나 비어 있는 경우 |또는| 시작일이 종료일보다 뒤에 있는 경우 |또는| dayDiff가 5보다 큰 경우
			// 			// 셋 중 하나라도 참이면 Error를 던짐 
			// 			throw new Error("경조휴가 날짜를 다시 선택해주세요");
			// 		}

			// 		// 모두 유효하면 true 반환
			// 		return true;

			// }   catch (error) {
			// 		// throw new Error(...)로 던져진 예외나, validateTypeCheck() 내부에서 발생한 오류를 잡아냄
			// 		$.goMessage(error.message)

			// 		// return false;를 통해 검증 실패를 알림
			// 		return false;
			// }        

			// validate에 아무것도 작성하지 않는다면 아래 코드만 작성
			return true;
		}

		// 화면 emptyData 삭제
		function clearEmptyIntegrationData() {
			// ??? 뭔지 잘 모르겠음
		}

		return {
			setData : setData,
			validateIntegrationData : validateIntegrationData,
			render : render,
			getVariablesData : getVariablesData,
			beforeSave : beforeSave,
			clearEmptyIntegrationData : clearEmptyIntegrationData
		};
	})(); //Formfunc end

	Formfunc.setData(variablesData, GO.util.store.get('document.docMode'));
	Formfunc.render();

	/***
	 * core 부분에서 사용할수 있도록 jQuery 전역 객체에 함수를 바인딩. 
	 */
	$.goIntegrationForm = {
			getIntegrationData : function() {
				return Formfunc.getVariablesData();
			},
			validateIntegrationData : function() {
				return Formfunc.validateIntegrationData();
			},
			clearEmptyIntegrationData : function() {
				Formfunc.clearEmptyIntegrationData();
			},
			beforeSave : function() {
				Formfunc.beforeSave();
			}
	};
})();