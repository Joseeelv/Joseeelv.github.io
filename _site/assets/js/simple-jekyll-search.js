document.addEventListener("DOMContentLoaded", function () {
  SimpleJekyllSearch({
      searchInput: document.getElementById("search"),
      resultsContainer: document.getElementById("results-container"),
      json: window.location.origin + "/search.json",
      searchResultTemplate: `
      <div class="columns has-text-centered" id="blog-card">
        <div class="column is-marginless is-paddingless is-one-third-desktop is-one-third-fullhd is-one-third-tablet">
          <div class="image is-16by9" style="background-image: url({image});">
          </div>
        </div>
        <a href="{url}" class="column has-text-left-desktop has-text-left-tablet">
            <h1 class="title is-size-4-touch">{title}</h1>
            <div class="content has-text-grey">
              {description}
              <hr class="has-background-grey">
            </div>
          <div class="difficulty is-size-6-touch">
            <strong>Difficulty:</strong> 
            <span class="tag difficulty {difficulty}">
              {difficulty}
            </span>
          </div>
          <div class="os is-size-6-touch">
            <strong>Operating System:</strong> {os}
          </div>
          <div>
            <strong>Skills: </strong>{tags}
          </div>
        </a>
      </div>  
      <hr class="has-background-black" style="margin: 0.5rem 5rem 2.5rem 5rem">
    `,
      noResultsText: `<div class="subtitle has-text-centered is-uppercase">No Results Found</div><hr class="has-background-black" style="margin: 0.5rem 5rem 2.5rem 5rem">`
  });
});
