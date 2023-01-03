$(document).ready(function() {
  //when we click submit button
  $('.story_form').on('submit',(event)=>{
    event.preventDefault();
    let userInput = $('.story_form').serialize();
    let story_name = $('.storyName').val();
    let story_content = $('.content').val();
    //Check the story name is empty or not
    if(story_name.length === 0) {
      //change the erromessage display from none to block
      $('.erroMessage').css({color:'red',display:'block'})
      //change the html content for erromessage
      .html(`<p>story name cannot be empty</p>`);
      //Check the story conent is empty or not
    } else if (story_content.length === 0) {
      $('.erroMessage').css({color:'red',display:'block'})
      //change the erromessage html content
      .html(`<p>story content cannot be empty</p>`);
    } else {
      //change erromessage display status back to none
      $('.erroMessage').css({display:'none'});
      $.ajax({
        method:'POST',
        url:'/new',
        data: userInput
      })
      .then ( (res) => {
        console.log('response====', res);
        //ajax front end redirect to a new page
        window.location.href=`http://localhost:8080/stories/${res}`;
      }
      )
    }
  })
})
