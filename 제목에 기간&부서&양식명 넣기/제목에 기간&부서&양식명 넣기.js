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

    // ※ html 기간 부분 td 태그에 class 추가 필요
    $(".startDate input, .endDate input").on("change",function(){
      self.autoSubject();
    });
	},

  // ★★★★★★★ 제목에 기간 날짜&부서&양식명 반영 START ★★★★★★★
  autoSubject : function() {// 1. 기안부서 가져오기 및 안전한 문자열 예외 처리 (.isValid() 완전 제거)
    var drafterDeptName = this.docModel ? this.docModel['drafterDeptName'] : ""; 
    if (!drafterDeptName) drafterDeptName = ""; 
    console.log("drafterDeptName : ", drafterDeptName);
    
    // 2. 시작 / 종료일 인풋 값 가져오기
    var startVal = $(".startDate input").val() || "";
    var endVal = $(".endDate input").val() || "";

    // 3. moment 객체 생성
    var startDate = moment(startVal, "YYYY-MM-DD");
    var endDate = moment(endVal, "YYYY-MM-DD");
    console.log("startDate valid?:", startDate.isValid());
    console.log("endDate valid?:", endDate.isValid());
  
    // 4. 날짜가 정상적(valid)일 때만 포맷팅하고, 비어있거나 이상하면 빈값("") 처리
    var startStr = startDate.isValid() ? startDate.format("YYYY-MM-DD") : "";
    var endStr = endDate.isValid() ? endDate.format("YYYY-MM-DD") : "";
  
    // 5. 제목(subject) 세팅 (날짜가 입력되었을 때만 주입 진행)
    if (startStr || endStr) {
        var generatedTitle = startStr + "~" + endStr + " & " + drafterDeptName + " & 근태보고서";
        
        // // #subject 창과 다우오피스 순정 제목창(#approval_title) 모두에 안전하게 입력
        // $('#subject, #approval_title, .approval_title').val(generatedTitle);
        $('#subject').val(generatedTitle);
    }
  },
  // ★★★★★★★ 제목에 기간 날짜 반영 END ★★★★★★★

	renderViewMode : function(){$('.viewModeHiddenPart').hide();},
	onEditDocument : function(){this.render();},
	beforeSave :function() {$('.viewModeHiddenPart').hide();},
	afterSave :function() {$('.viewModeHiddenPart').hide();},
	validate :function() {return true;},
	getDocVariables : function(){}
});
return Integration;