$(document).ready(function(){
  checkMarker();
});

// note: i believe there will be a delegation problem when a todo is add to the page; will fix later

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