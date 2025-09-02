
    $tr.find('input[data-dsl="{{text}}"]').each(function(i, item){
      var uniqueId = _.uniqueId('editorForm_');
      $(item).attr({"name": uniqueId, "id": uniqueId+ Date.now()})
    });

위의 코드랑

    $tr.find('input[data-dsl="{{text}}"]').each(function(i, item){
      var uniqueId = _.uniqueId('editorForm_');
      $(item).attr({"name": uniqueId, "id": uniqueId})
    });

아래 코드의 차이가 뭘까?
