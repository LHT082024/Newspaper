document.addEventListener('DOMContentLoaded', () => {
  //this function takes the articles from the database and returns the articles as
  //a json object and places that article in a container from html
  async function getArticle(articleId) {
    try {
      const response = await fetch(`http://localhost:5095/api/Article`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const articles = await response.json(); // Array of articles
      console.log('Fetched articles:', articles); // Debugging

      // Find the article with the specified ID
      const article = articles.find((a) => a.id === articleId);
      const container = document.getElementById('article-content');

      if (!article) {
        container.innerHTML = `<p>No article found for ID ${articleId}.</p>`;
        return;
      }

      // here we take the article object and displays specific parts of it using the model class
      //to sort it.
      container.innerHTML = `
        <h2>${article.headline}</h2>
        <p>${article.story}</p>
        <img src="${article.imagePath}" alt="" height="200px" width="400px">
      `;
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  }

  // we have already decided that we only want to display one article decided via an id
  //this code decides which article we will display based on the id in the url of the
  //headline we just clikced
  const params = new URLSearchParams(window.location.search);
  const articleId = parseInt(params.get('articleId'), 10);

  if (!articleId) {
    document.getElementById(
      'article-content'
    ).innerHTML = `<p>No article ID provided in URL.</p>`;
    return;
  }

  getArticle(articleId); // Fetch and display the article
});

//login
async function Login() {}

const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
});
