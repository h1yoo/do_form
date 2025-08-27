
    checkDate : function () {
        var startDateStr = $('.period input').eq(0).val();
        var endDateStr = $('.period input').eq(1).val();
        
        var startDate = new Date(startDateStr);
        var endDate = new Date(endDateStr);

        // 날짜 유효성 검사
        if (isNaN(endDate)) {   // endDate 값이 선택되지 않았다면
            let current = new Date(startDate);
            current.setDate(current.getDate() + 1); // 다음 날로 이동
            $('.period input').eq(1).val(current);
        }
    },
