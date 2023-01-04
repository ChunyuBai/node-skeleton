$(document).ready(function () {
  let hasclick = false;
  let upvoteNum = Number($('#upvote-num').html());
  let id = window.location.pathname.split("/").pop();
    $('#upvote')
  .on('click', (event) => {
    event.preventDefault();
    if(hasclick){
      upvoteNum = upvoteNum - 1;
      $('#upvote-num').html(upvoteNum);
      $('#upvote').css({'background-color':'white'});
    } else {
      upvoteNum = upvoteNum + 1;
      $('#upvote-num').html(upvoteNum);
      $('#upvote').css({'background-color':'red'});
    }
    hasclick = !hasclick;
    $.ajax({
      method:'POST',
      url:`/stories/${id}`,
      data: {'upvoteNum': upvoteNum}
    })
  })
})

