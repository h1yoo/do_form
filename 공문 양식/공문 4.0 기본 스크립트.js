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

					var i1 = $(item).find('.sign_rank').text();
					var i2 = $(item).find('.sign_name').text();
					var i3 = $(item).find('.sign_stamp img').attr("src");
					var i4 = $(item).find('.sign_date').text();
					var i5 = "";

					if(i3 == undefined){
						i5 = `<div>${i2}</div>`;
						// i5 = `<div style="text-align: center; width: 100px;"><b>${i2}</b></div>`;
					}else{
						i5 = `<div style="text-align: center;"><img src="${i3}" style="height: 35px;"></div>`;
						// i5 = `
						// 			<div style="display: flex; margin-right: 30px;">
						// 				<div style="text-align: center; width: 60px;">${i3}</div>
						// 				<div style="text-align: center; width: 60px;"><b>${i2}</b></div>
						// 			</div>
						// 		`;
					}

					// 결재자 표시
					html1 += `
					<div style="display: flex; align-items: center; margin-right: 30px;">

						<div style="width: 40px;"></div>
						<div style="width: 160px;">
							${i5}
						</div>

					</div>
				 `;
					// html1 += `
					// 			<div style="display: flex; align-items: center;">

					// 				<div style="width: 70px; text-align: center;">${i1}</div>
					// 				<div style="width: 70px; text-align: center;"><b>${i2}</b></div>

					// 			</div>
					// 		 `;

				} else {

					var i1 = $(item).find('.sign_rank').text();
					var i2 = $(item).find('.sign_name').text();
					var i3 = $(item).find('.sign_stamp img').attr("src");
					var i4 = $(item).find('.sign_date').text();
					var i5 = "";

					if(i3 == undefined){
						i5 = `<div>${i2}</div>`;
					}else{
						i5 = `<div><img src="${i3}" style="height: 35px;"></div>`;
					}

					// if(i3 == undefined){
					// 	i5 = `<div style="text-align: center; width: 60px;"><b>${i2}</b></div>`;
					// }else{
					// 	i5 = `
					// 				<div style="display: flex;">
					// 					<div style="text-align: center; width: 60px;">${i3}</div>
					// 					<div style="text-align: center; width: 60px;"><b>${i2}</b></div>
					// 				</div>
					// 			`;
					// }

					// 협조자 표시
					html2 += `
					<div style="display: flex; align-items: center; margin-right: 30px;">

						<div style="width: 160px;>
							${i5}
						</div>

					</div>
				 `;
					// html2 += `
					// 			<div style="display: flex; align-items: center;">

					// 				<div style="width: 70px; text-align: center;">${i1}</div>
					// 				<div style="width: 70px; text-align: center;"><b>${i2}</b></div>

					// 			</div>
					// 		 `;
							 
				}
			});

		});

		$('#ttt').html(html1)
		$('#ttt2').html(html2)

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
