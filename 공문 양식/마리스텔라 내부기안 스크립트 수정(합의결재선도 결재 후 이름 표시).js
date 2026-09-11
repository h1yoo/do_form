var Integration = Backbone.View.extend({
	initialize: function (options) {
		this.options = options || {};
		this.docModel = this.options.docModel;
		this.variables = this.options.variables;
		this.infoData = this.options.infoData;
	},
	render: function () {
    
	},

	renderViewMode: function () {
		/* 읽기모드에서 함수가 필요한 경우 구현 */
		var html1 = ""; // 결재선(#ttt) 전용
    var html2 = ""; // 합의선(#ttt2) 전용

    // 1. 결재선(.apprLine) 처리 -> #ttt 출력
    $('.apprLine .sign_type1_inline').each(function (index2, item) {
      $(item).find('.sign_member').each(function (index, member) {
        var stampSrc = $(member).find('.sign_stamp img').attr("src");
        var signDate = $(member).find('.sign_date').text();
        var displayContent = "<div></div>";

        if (stampSrc !== undefined) {
          displayContent = `
            <div style="text-align: center; width: 100px;">
              <p style="margin: 0; font-size: 11px;">${signDate}</p>
              <img src="${stampSrc}" style="height: 35px;">
            </div>
          `;
        }

        // 가로 정렬(display: flex) 유지
        html1 += `
          <div style="display: flex; align-items: center; justify-content: center; height: 50px; margin: 10px 0;">
            ${index2 === 0 ? '<div></div>' : ''}
            <div>
              ${displayContent}
            </div>
          </div>
        `;
      });
    });

    // 2. 합의선(.agrLine) 처리 -> #ttt2 출력
    $('.agrLine .sign_type1_inline').each(function (index2, item) {
      $(item).find('.sign_member').each(function (index, member) {
        var stampSrc = $(member).find('.sign_stamp img').attr("src");
        // var signDate = $(member).find('.sign_date').text();
				var signName = $(member).find('.sign_name').text();
        var displayContent = "<div></div>";

        if (stampSrc !== undefined) {
          displayContent = `
            <div style="text-align: center; width: 100px;">
              <p style="margin: 0; font-size: 11px;">${signName}</p>
            </div>
          `;
        }

        // 합의선 데이터를 html2에 누적
        html2 += `
          <div style="display: flex; margin: 10px 0;">
            ${index2 === 0 ? '<div></div>' : ''}
            <div style="align-items: center;">
              ${displayContent}
            </div>
          </div>
        `;
      });
    });

    // 3. 각각의 영역에 HTML 동시 주입
    $('#ttt').html(html1);
    $('#ttt2').html(html2);

	},

	onEditDocument: function () {
		/* '수정 ' 버튼을 눌렀을때 실행. */
	},

	beforeSave: function () {
	},

	
	afterSave: function () {
	},

	validate: function () {

		return true;
	},

	getDocVariables: function () {
		/* getDocVariables 사용 하려면 return 소스 코드 구현 */
	}
});
return Integration;