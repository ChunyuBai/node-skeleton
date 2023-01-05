$(document).ready(function () {
  $('.addContribution-btn')
  .on('click', function (event) {
    event.preventDefault();
    const $btn = $(this);
    const dataId = $(this).attr('data-id');
    const story = $('#story_content').html();
    console.log('story====>', story);
    const pathArray = window.location.pathname.split('/');
    const storyId = pathArray[pathArray.length-1];
    let contribution = $(this).attr('data-contribution');
      console.log('contribution=====>', contribution);
      console.log('storyId=====>',storyId);
      $('#story_content').html(`${story} ${contribution}`);
      $.ajax({
        method: 'POST',
        url: `/story_contribution/${storyId}/add`,
        data: {contribution:contribution}
      })
        .then((res) => {
          console.log('res===>',res);
          $('#story_content').html(`${story} ${contribution}`);
        })

    })

})


