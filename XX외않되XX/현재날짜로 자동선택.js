
    checkDate : function () {
        var startDateStr = $(e).find('.period input').eq(0).val();
        var endDateStr = $(e).find('.period input').eq(1).val();
        
        var startDate = new Date(startDateStr);
        var endDate = new Date(endDateStr);

        // 날짜 유효성 검사
        if (isNaN(endDate)) {   // endDate 값이 선택되지 않았다면
            endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1); // 다음 날로 이동
        }
    },
