const articleId = sessionStorage.getItem('articleId');

async function fetchArticleDetails() {
  try {
    let response = await fetch(
      'http://localhost:5095/api/Article/${articleId}'
    );
    if (!response.ok) throw new Error('HTTP error ' + response.status);

    let article = await response.json();
    console.log('Article details:', article);

    const container = document.querySelector('.article-container');
    const articleTitle = document.createElement('h2');
    articleTitle.textContent = article.headline;
    container.appendChild(articleTitle);

    const articleContent = document.createElement('p');
    articleContent.textContent = article.content;
    container.appendChild(articleContent);

    const articleImage = document.createElement('img');
    articleImage.src = article.imageURL || '';
    container.appendChild(articleImage);
  } catch (error) {
    console.error('Error fetching article:', error);
  }
}

fetchArticleDetails();
