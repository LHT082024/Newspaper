document.addEventListener('DOMContentLoaded', () => {
  // This function fetches articles from the database and displays the one with the specified ID.
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

      if (!container) {
        console.error('Container not found!');
        return;
      }

      container.textContent = ''; // Clear previous content

      if (!article) {
        const p = document.createElement('p');
        p.textContent = `No article found for ID ${articleId}.`;
        container.appendChild(p);
        return;
      }

      // Creating and appending elements
      const img = document.createElement('img');
      img.src = article.imagePath;
      img.height = 500;
      img.width = 900;
      img.alt = '';
      const h2 = document.createElement('h2');
      h2.textContent = article.headline;


      const p = document.createElement('p');
      p.textContent = article.story;

      container.appendChild(img);
      container.appendChild(h2);
      container.appendChild(p);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  }

  // Extract article ID from URL
  const params = new URLSearchParams(window.location.search);
  const articleId = parseInt(params.get('articleId'), 10);

  if (isNaN(articleId)) {
    const container = document.getElementById('article-content');
    if (container) {
      const p = document.createElement('p');
      p.textContent = 'No article ID provided in URL.';
      container.appendChild(p);
    }
    return;
  }

  getArticle(articleId); // Fetch and display the article

  // Hamburger menu
  const hamMenu = document.querySelector('.ham-menu');
  const offScreenMenu = document.querySelector('.off-screen-menu');

  if (hamMenu && offScreenMenu) {
    hamMenu.addEventListener('click', () => {
      hamMenu.classList.toggle('active');
      offScreenMenu.classList.toggle('active');
    });
  }   
});
