$(document).ready(function() {
  console.log('JS loaded.')

  $('.contribution_form').on('submit', (event) => {
    event.preventDefault();
    const rawContributionText = $('#contribution').val();

    const contributionText = $(this).serialize();

    if (rawContributionText.length > 0) {
      $.post('/story_contribution', contributionText)
        .then(function() {
          // Reset form on successful post
          $('#contribution').val('');
        });
      }

  })
});
