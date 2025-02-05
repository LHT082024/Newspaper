document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch and display the article
  async function getArticle(articleId) {
    try {
      const response = await fetch(`http://localhost:5095/api/Article`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const articles = await response.json(); // Array of articles
      console.log("Fetched articles:", articles); // Debugging

      // Find the article with the specified ID
      const article = articles.find(a => a.id === articleId);
      const container = document.getElementById('article-content');

      if (!article) {
        container.innerHTML = `<p>No article found for ID ${articleId}.</p>`;
        return;
      }

      // Display the article details
      container.innerHTML = `
        <h1>${article.headline}</h1>
        <p>${article.story}</p>
      `;
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  }

  // Get the article ID from the URL
  const params = new URLSearchParams(window.location.search);
  const articleId = parseInt(params.get('articleId'), 10);

  if (!articleId) {
    document.getElementById('article-content').innerHTML = `<p>No article ID provided in URL.</p>`;
    return;
  }

  getArticle(articleId); // Fetch and display the article
});

