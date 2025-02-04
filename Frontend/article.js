const articleId = sessionStorage.getItem('articleId');

async function fetchArticleDetails() {
  if (!articleId) {
    console.error('No article ID found in sessionStorage.');
    return;
  }
  try {
    let response = await fetch(
      `http://localhost:5095/api/Article/${articleId}`
    );
    if (!response.ok) throw new Error('HTTP error ' + response.status);

    let article = await response.json();
    console.log('Article details:', article);

    const container = document.querySelector('.article-container');
    if (!container) {
      console.error('Article container not found');
      return;
    }

    container.innerHTML = '';

    const articleTitle = document.createElement('h2');
    articleTitle.textContent = article.headline;
    container.appendChild(articleTitle);

    const articleContent = document.createElement('p');
    articleContent.textContent = article.content || 'No content available';
    container.appendChild(articleContent);

    if (article.imageURL) {
      const articleImage = document.createElement('img');
      articleImage.src = article.imageURL;
      articleImage.alt = 'Article Image';
      container.appendChild(articleImage);
    }
  } catch (error) {
    console.error('Error fetching article:', error);
  }
}

fetchArticleDetails();
