$(document).ready(function(){
  checkMarker();
  $(document).on('click', 'div.box', completedTodo)
});

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
  $('#'+reply.id).unbind('mouseenter mouseleave');
  $('#'+reply.id).unbind('click');
}
// note: i believe there will be a delegation problem when a todo is add to the page when ajaxed; will fix later

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