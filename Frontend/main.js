//fetch data with javascript
async function fetchArticles() {
  try {
    let response = await fetch('http://localhost:5095/api/Article');
    if (!response.ok) throw new Error('HTTP error ' + response.status);

    let data = await response.json();
    console.log('Articles:', data);

    //find the element in html where the data is to be implemented
    const container = document.querySelector('.article-container');

    if (!container) {
      console.error('Article container not found');
      return;
    }

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    data.forEach((article) => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');

      const headline = document.createElement('a');
      headline.href = '#';
      headline.textContent = article.headline;

      headline.addEventListener('click', () => openArticle(article.id));

      articleElement.appendChild(headline);

      if (article.imageURL) {
        const articleImage = document.createElement('img');
        articleImage.src = article.imageURL;
        articleImage.alt = article.headline || 'Article image';
        articleElement.appendChild(articleImage);
      }

      container.appendChild(articleElement);
    });
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

function openArticle(articleId) {
  window.location.href = `/article-page.html?articleId=${articleId}`;
}

fetchArticles();

async function fetchArticleDetails(articleId) {
  try {
    let response = await fetch(
      'http://localhost:5095/api/Article/${articleId}'
    );
    if (!response.ok) throw new Error('Http error ' + response.status);

    let article = await response.json();

    sessionStorage.setItem('article', JSON.stringify(article));

    window.location.href = '/article-page.html';
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  // Add click listeners to all headline elements
  const headlines = document.querySelectorAll('.headline');

  headlines.forEach(headline => {
    headline.addEventListener('click', (event) => {
      headline.addEventListener('click', () => openArticle(article.id));
      
      const articleId = parseInt(event.target.getAttribute('data-id'), 10); // Get the article ID
      console.log("Clicked headline for article ID:", articleId); // Debugging
      
      // Redirect to the article page with the ID as a query parameter
      window.location.href = `article-page.html?articleId=${articleId}`;
    });
  });
});


//send articles to frontend

//send data to backend
// async function createArticle() {
//   let newArticle = {
//     title: 'Pyramids are definitely gonna work this time',
//     content: '10/10 pharaohs say pyramids were a good idea.',
//   };

//   try {
//     let response = await fetch('http://localhost:5095/api/Article', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newArticle),
//     });

//     if (!response.ok) throw new Error('HTTP error ' + response.status);

//     let result = await response.json();
//     console.log('Created:', result);
//   } catch (error) {
//     console.error('POST Error:', error);
//   }
// }

// createArticle();

//login
async function Login() {}

const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
});
