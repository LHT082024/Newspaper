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
        <img src="${article.imagePath}" alt="" height="200px" width="400px">
        <p>${article.story}</p>
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

//hamburger menu
const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
});

//edit button redirect to article page
// Find the article with the specified ID
const article = articles.find((a) => a.id === articleId);
const container = document.getElementById('article-content');

if (!article) {
  container.innerHTML = `<p>No article found for ID ${articleId}.</p>`;
  return;
}
//redirect to the correct window
const params = new URLSearchParams(window.location.search);
const articleId = parseInt(params.get('articleId'), 10);

if (!articleId) {
  document.getElementById(
    'article-content'
  ).innerHTML = `<p>No article ID provided in URL.</p>`;
  return;
}

//article form
document
  .getElementById('article-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const articleId = document.getElementById('article-id').value;
    const headline = document.getElementById('headline').value;
    const content = document.getElementById('content').value;
    const imagePath = document.getElementById('imagePath').value;

    const articleData = {
      headline,
      content,
      imagePath,
    };

    try {
      let response;

      if (articleId) {
        // Update existing article
        response = await fetch(
          `http://localhost:5095/api/Article/${articleId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(articleData),
          }
        );
      } else {
        // Create new article
        response = await fetch('http://localhost:5095/api/Article', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData),
        });
      }

      if (!response.ok) throw new Error('Error saving article');

      const result = await response.json();
      alert('Article saved successfully');
      clearForm(); // Clear the form after saving
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save article');
    }
  });

function clearForm() {
  document.getElementById('article-form').reset();
  document.getElementById('article-id').value = ''; // Clear article ID if editing
}

//edit article
document.querySelectorAll('.edit-button').forEach((button) => {
  button.addEventListener('click', async (event) => {
    const articleId = event.target.getAttribute('data-id');

    try {
      const response = await fetch(
        `http://localhost:5095/api/Article/${articleId}`
      );
      const article = await response.json();

      if (!response.ok) throw new Error('Article not found');

      // Fill the form with article data
      document.getElementById('article-id').value = article.id;
      document.getElementById('headline').value = article.headline;
      document.getElementById('content').value = article.content;
      document.getElementById('imagePath').value = article.imagePath;
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  });
});

document.querySelectorAll('.delete-button').forEach((button) => {
  button.addEventListener('click', async (event) => {
    const articleId = event.target.getAttribute('data-id');

    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(
          `http://localhost:5095/api/Article/${articleId}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) throw new Error('Failed to delete article');

        alert('Article deleted successfully');
        location.reload(); // Reload to reflect the changes
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  });
});
