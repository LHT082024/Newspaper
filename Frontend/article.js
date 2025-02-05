document.addEventListener('DOMContentLoaded', () => {
  async function getArticle(articleId) {
    try {
      const response = await fetch(`http://localhost:5095/api/Article?id=${articleId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const article = await response.json();
      console.log(article); // Check the structure of the article object

      const container = document.getElementById('article-content');
      container.innerHTML = 
      `<h1>${article}</h1>
      <p>${article}</p>`; 
      // Use the correct property names from your JSON
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  }

  getArticle(13);
});