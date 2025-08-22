
    validate : function() {
    
    var self = this;
    
               try {
    
                var existText = $('.existText').find('input').val();  // 확인할 input값

                if ( existText.includes("특정 문구가 포함됨")) {
                  return true;

                } else {
                  throw new Error("특정 문구 포함 필수");
                }
    
                 } catch (error) {
    
                $.goMessage("특정 문구 포함 필수");
                // $.goError("특정 문구 포함 필수");
    
                   return false;
    
                 }
    
    },
