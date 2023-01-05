function createStoryElement(story) {

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const markup = `
  <div class="story">
        <a href="/stories/${story.id}">
          <div class="storyContent">
            <span
              >${escape(story.content)}</span
            >
          </div>
          <hr class="breakLine" />
          <div class="storyFooter">
            <div class="status">
              <p class="${story.is_complete ? "completed": "incomplete"}">${story.is_complete ? "Completed": "In progress"}</p>
            </div>
          </div>
        </a>
      </div>
  `;

  return markup;
}

// Goes through an array of stories and uses createStoryElement to put them into HTML format
function renderStories(stories) {
  $("#stories-container").empty();
  for (let i = 0; i < stories.length; i++) {
    const newStory = createStoryElement(stories[i]);
    $('#stories-container').prepend(newStory);

  }
}

// Renders the stories on the homepage
function loadStories() {
  $.get( "/stories", function( data ) {
    renderStories(data);
  });
}

loadStories();
