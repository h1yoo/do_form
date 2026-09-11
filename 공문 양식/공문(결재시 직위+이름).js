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

		var html1 = "";
		var html2 = "";

		$('.sign_type1_inline').each(function (index2, item) {

			$(item).find('.sign_member').each(function (index, item) {
				if (index2 == 0) {

					var rank = $(item).find('.sign_rank').text();
					var name = $(item).find('.sign_name').text();
					var stamp = $(item).find('.sign_stamp img').attr("src");
					var date = $(item).find('.sign_date').text();
					var displayContent = "<div></div>";
	
					if (date !== undefined) {	// 결재 완료시에만 표시되도록 제한
						displayContent = `
								<div style="width: 100px;">
									${rank}
								</div>
								<div style="width: 100px; font-weight: bold;">
									${name}
								</div>
						`;
					}

					// 결재자 표시
					html1 += `
					<div style="display: flex; align-items: center; padding-top: 20px;">
              ${displayContent}
					</div>
				 `;

				} /* else {

					var rank = $(item).find('.sign_rank').text();
					var name = $(item).find('.sign_name').text();
					var stamp = $(item).find('.sign_stamp img').attr("src");
					var date = $(item).find('.sign_date').text();

					// 협조자 표시
					html2 += `
					<div style="display: flex; align-items: center; padding-top: 20px;">

						<div style="width: 100px;">
							${rank} else
						</div>
						<div style="width: 100px; font-weight: bold;">
							${name} else
						</div>

					</div>
				 `;
							 
				} */
			});

		});

		$('#ttt').html(html1);
		// $('#ttt2').html(html2);

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