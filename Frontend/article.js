const articles = JSON.parse(sessionStorage.getItem('article'));

if (articles && articles.length > 0) {
  const container = document.getElementsByClassName('article-container')[0];
  const articleElements = container.children;

  articles.forEach((article, index) => {
    if (articleElements[index]) {
      const articleElement = articleElements[index];

      const articleTitle = document.createElement('h2');
      articleTitle.textContent = article.headline;

      const articleContent = document.createElement('p');
      articleContent.textContent = article.content;

      articleElement.appendChild(articleTitle);
      articleElement.appendChild(articleContent);
    }
  });
} else {
  console.error('No articles found in sessionStorage');
}
