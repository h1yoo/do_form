var $ = require("jquery");
var app = require("app");
var Backbone = require("backbone");
var _ = require('underscore');

var Integration = Backbone.View.extend({

  initialize : function(options) {
  
  this.options = options || {};
  
  this.docModel = this.options.docModel;
  
  this.variables = this.options.variables;
  
  },
  
   
  render : function() {
  
  var self = this;
  
  if (this.docModel.docStatus == 'CREATE' && this.docModel.docType == 'DRAFT') {
      
      self.autoSubject();
  
  }
  
  
  if (GO.util.store.get('document.docMode') == 'EDIT') {
  
  self.setEvent();
  
  }
  
  },
  
   
  autoSubject: function() {
    // // html 그대로 사용 시 >> 결재 라인에 기안자 본인이 없으면 제목에 안나타남 >> html 수정 필요
    // $('.sign_type1_inline').each(function (index2, item) {
    //   $(item).find('.sign_member').each(function (index, item) {
    //     var sign_name = $(item).find('.sign_name').text();  // 기안자
    //     var sign_rank = $(item).find('.sign_rank').text();  // 직급
    //     var draftDept = $('#draftDept').val();  // 기안부서
    //     $('#subject').val(sign_name+ " " + sign_rank + " " + draftDept);
    //   });
    // });

    // html 수정 시
    var userName = $('.userName').find('input').val();  // 기안자
    var userRank = $('.userRank').find('input').val();  // 직급
    var userDep = $('.userDep').find('input').val();  // 기안부서
    $('#subject').val(userName+ " " + userRank + " " + userDep);
    
  },
  
   
  
  setEvent : function() {
  
  var self = this;
  
  },
  
   
  
  renderViewMode : function() {
  
  $('.viewModeHiddenPart').hide();
  
  },
  
   
  
  onEditDocument : function() {
  
  this.render();
  
  },
  
   
  beforeSave : function() {
  
  },
  
  
  afterSave : function() {
  
  },
  
   
  nvlToEmpty : function(v) {
  
  if (v) {
  
  return _.isNull(v) ? "" : v;
  
  }
  
  return "";
  
  },
  
   
  validate : function() {
  
  var self = this;
  
             try {
  
              self.finalSignCheck();
  
                 return true;
  
               } catch (error) {
  
              $.goMessage(error.message)
  
                 return false;
  
               }
  
  },
  
  
  // 최종결재자 유무 판단
  
  finalSignCheck: function() {
  
    if($('.sign_type1_inline').eq(2).find('.sign_member').text() == ""){
    
    throw new Error("최종 결재자 필수 추가");
    
    }
  
   
  
  },
  
  getDocVariables : function() {
  
  return _.extend(this.variables, {});
  
  }
  
  });
   
  
  return Integration;
