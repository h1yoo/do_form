var Integration = Backbone.View.extend({
	initialize : function(options){
		this.options = options || {};
		this.docModel = this.options.docModel;
		this.variables = this.options.variables;
		this.infoData = this.options.infoData;
	},
	
	render : function() {
		var self = this;
		$('.viewModeHiddenPart').show();
    
    $(".evalTR input[type='checkbox']").on("change", function () {
      // 같은 행에서는 하나만 선택 (라디오처럼)
      var $row = $(this).closest(".evalTR");
      $row.find("input[type='checkbox']").not(this).prop("checked", false);

      self.calScore();
    });
	},
  
  calScore : function () {
    // var totalSum = 0;

    // 순번별 개수 (0~4 → 5점~1점)
    var scoreCount = [0, 0, 0, 0, 0];

    $("#dynamic_table1 .evalTR").each(function () {

      var $inputs = $(this).find("input[type='checkbox']");

      $inputs.each(function (index) {
        if ($(this).is(":checked")) {

          // var score = (5 - index) * 2; // 5~1점 > 10~2점
          // console.log("score : ", score);

          // totalSum += score;          // 전체 합계
          scoreCount[index] += 1;     // 위치별 개수
        }
      });

    });

    // // 전체 점수
    // $(".sum_evalTR .total").val(totalSum);

    // 위치별 개수
    $(".sum_evalTR .score5 input").val(scoreCount[0] * 10); // 5점 > 10점
    $(".sum_evalTR .score4 input").val(scoreCount[1] * 8); // 4점 > 8점
    $(".sum_evalTR .score3 input").val(scoreCount[2] * 6); // 3점 > 6점
    $(".sum_evalTR .score2 input").val(scoreCount[3] * 4); // 2점 > 4점
    $(".sum_evalTR .score1 input").val(scoreCount[4] * 2); // 1점 > 2점
  },

	renderViewMode : function(){$('.viewModeHiddenPart').hide();},
	onEditDocument : function(){this.render();},
	beforeSave :function() {$('.viewModeHiddenPart').hide();},
	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;