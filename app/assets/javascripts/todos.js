$(document).ready(function(){
  checkMarker();
  $(document).on('click', 'div.box', completedTodo);
});

// Hover to show user can add check mark to box

function checkMarker(){
  var boxes= $('.box')
  for (var i=0; i < boxes.length; i++) {
    var nodeList= $(boxes[i]).has('i')
    if (nodeList.length > 0) {
      console.log('do not remove')
    } else {
      $(boxes[i]).hover(
        function(){
          $(this).append('<i class="fa fa-check fa-4x"></i>');
        },
        function(){
          $(this).find('.fa-check').remove()
        }
      );
    }
  }
}

// AJAX call to complete a todo

function completedTodo(evt){
  var data = $(this).attr('id')
  var that = this;
  $.ajax({
    type: 'PATCH',
    url: '/todos/'+data+'/finished',
    data: data
  }).done(addCheckMark)
}

function addCheckMark(reply){
  debugger;
  var $boxThatIsChecked = $('#'+reply.id)
  $boxThatIsChecked.unbind('mouseenter mouseleave');
  $boxThatIsChecked.unbind('click');
  $boxThatIsChecked.on('click', function(evt){
    undoCompletion(evt, $boxThatIsChecked)
  })
}

// AJAX call to undo a box that is checked

function undoCompletion(evt, $boxThatIsChecked) {
  $boxThatIsChecked.children().remove();
  var idOfBox= $boxThatIsChecked.attr('id')
  $.ajax({
    type: 'PATCH',
    url: '/todos/'+idOfBox+'/undocompletion',
    data: idOfBox
  }).done(removeCheckMark)
}

function removeCheckMark(reply){
  var $boxThatIsUnchecked = $('#'+reply.id)
  $boxThatIsUnchecked.unbind('click')
  $boxThatIsUnchecked.on('click', completedTodo)
  checkMarker();
}