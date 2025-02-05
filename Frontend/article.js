document.addEventListener('DOMContentLoaded', () => {
  async function getArticle(articleId) {
    try {
      const response = await fetch(`http://localhost:5095/api/Article?id=${articleId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const articles = await response.json(); // The response is an array of articles
      console.log(articles); // Check the array structure in the console

      const article = articles.find(a => a.id === articleId); // Find the article with the correct ID
      const container = document.getElementById('article-content');

      if (!article) {
        container.innerHTML = `<p>No article found for ID ${articleId}.</p>`;
        return;
      }

      // Display the headline and story
      container.innerHTML = `
        <h1>${article.headline}</h1>
        <p>${article.story}</p>
      `;
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  }

  getArticle(13); // Pass the desired article ID
});
