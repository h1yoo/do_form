define(function(require) {
    var $ = require("jquery");
    var Backbone = require("backbone");
    var Vacation = require("approval/daouform/vacation_half_ver/views/main_new");
    var VacationStatusCollection = require("approval/daouform/vacation_half_ver/collections/statuses");

    // 초기셋팅
    var initOptions = {
        startDateEl : "#startDate", //default
        endDateEl : "#endDate", //default
        vacationTypeAreaEl : "#vacationTypeArea", //default
        vacationHalfAreaEl : "#vacationHalfArea", //option
        applyPointAreaEl : "#applyPointArea", //option
        restPointAreaEl : "#restPointArea",	//option
        selectedDaysAreaEl : "#usingPointArea", //option
        descriptionEl : "#description" //option
    }

    var Integration = Backbone.View.extend({

        initialize : function(options) {
            this.options = options || {};
            this.docModel = this.options.docModel;
            this.variables = this.options.variables;
            this.infoData = this.options.infoData;

            this.docStatus = GO.util.store.get('document.docStatus');
            this.docMode = GO.util.store.get('document.docMode');
            this.vacationStatuses = new VacationStatusCollection();
            this.vacationStatuses.fetch({ async: false });
        },

        render : function() {
            // create Mode
            this.vacation = new Vacation(_.extend(initOptions, this.options, this.vacationStatuses));
            if(_.isEqual(this.docStatus, "TEMPSAVE")){
                this.vacation.renderEditDocument();
            }else{
                this.vacation.render();
            }
        },

        renderViewMode : function() {
            /* 읽기모드에서 함수가 필요한 경우 구현 */
        },

        onEditDocument : function() {
            /* '수정 ' 버튼을 눌렀을때 실행. */
            this.vacation = new Vacation(_.extend(initOptions, this.options, this.vacationStatuses));
            this.vacation.renderEditDocument();
        },

	    autoSubject: function() {
            var type = $('#vacationTypeArea').find('select').val();
            var drafter = this.options.docModel.drafterName;
	        
            $('#custTitle').text(type+"신청서");
            // $('#subject').val(type+"신청서_"+drafter+"_"+$("#startDate").val() + " ~ " + $("#endDate").val());
            $('#subject').val(type+"("+$("#startDate").val() + "~" + $("#endDate").val());
        },

        beforeSave : function() {
		var self = this;
		self.autoSubject();

        $('.viewModeHiddenPart').hide();
 
        // // +++ 제목에 표시
        // self.checkInputSub();
        },

        afterSave : function() {
        },

        validate : function() {
            if(this.vacation){
                return this.vacation.validate().descriptionLength();
            } else {
                return true;
            }
        },

        getDocVariables : function() {
            if(this.vacation) {
                return this.vacation.getVariablesData();
            } else {
                return this.variables;
            }
        },
        getCheckMessageKeys : function () {
            return {
                checkMessage_desc1 : '문서를 삭제하면 복구되지 않으며, 관련문서로 지정된 사항도 함께 삭제됩니다',
                checkMessage_desc2 : '반려 또는 강제반려 없이 문서를 삭제하면 연차가 복구되지 않습니다'
            };
        }
    });

    return Integration;
});
