$(document).ready(function () {
  // let hasclick = false;
  // let id = window.location.pathname.split("/").pop();

  $('.upvote-btn')
  .on('click', function (event) {
    event.preventDefault();
    const $btn = $(this);
    const dataId = $(this).attr('data-id');
    let $upvoteNum = $(this).prev();
    const upvoteNumVal = Number($upvoteNum.html());
      console.log('dataid=====>', dataId);
      $.ajax({
        method: 'POST',
        url: `/story_contribution/${dataId}?action=upvote`
      })
        .then((res) => {
          console.log('res===>',res);
          $upvoteNum.html(upvoteNumVal+1)
          $btn.attr('disabled',true);
        //   if (hasclick) {
        //     upvoteNum = upvoteNum - 1;
        //     $('#upvote-num').html(upvoteNum);
        //     $('#upvote').css({ 'background-color': 'white' });
        //   } else {
        //     upvoteNum = upvoteNum + 1;
        //     $('#upvote-num').html(upvoteNum);
        //     $('#upvote').css({ 'background-color': 'red' });
        //   }
        //   hasclick = !hasclick;
        })

    })

})

