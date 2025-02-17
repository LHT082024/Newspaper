//fetch data and returns it as a json via url
let articles = [];

async function fetchArticles() {
  try {
    let response = await fetch('http://localhost:5095/api/Article');
    if (!response.ok) throw new Error('HTTP error ' + response.status);

    articles = await response.json();
    console.log('Articles:', articles);
    //find the element in html where the data is to be implemented
    const container = document.querySelector('.article-container');

    //if the element doesn't exist, return error message
    if (!container) {
      console.error('Article container not found');
      return;
    }

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    articles.forEach((article) => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');

      if (article.imagePath) {
        const articleImage = document.createElement('img');
        articleImage.src = article.imagePath;
        articleImage.alt = article.headline || 'Article image';
        articleElement.appendChild(articleImage);
      }

      const headline = document.createElement('a');
      headline.href = '#';
      headline.textContent = article.headline;
      headline.classList.add('headline');

      headline.addEventListener('click', () => openArticle(article.id));

      articleElement.appendChild(headline);

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

//we add an event listener so that the program knows when we are clicking the button.
//this event listener then sees the Id of the headline we clicked and will then open a webpage
//displaying the story that has the same Id as the headline just clicked
document.addEventListener('DOMContentLoaded', () => {
  // Add click listeners to all headline elements
  const headlines = document.querySelectorAll('.headline');

  headlines.forEach((headline) => {
    headline.addEventListener('click', (event) => {
      headline.addEventListener('click', () => openArticle(article.id));

      const articleId = parseInt(event.target.getAttribute('data-id'), 10); // Get the article ID
      console.log('Clicked headline for article ID:', articleId); // Debugging

      // Redirect to the article page with the ID as a query parameter
      window.location.href = `article-page.html?articleId=${articleId}`;
    });
  });
});

// createArticle();

document.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.getElementById('login-link');
  const logoutLink = document.getElementById('logout-link');

  // Check if the user is logged in by checking sessionStorage or localStorage
  const isLoggedIn =
    sessionStorage.getItem('LoggedInUser') ||
    localStorage.getItem('auth-token');

  if (isLoggedIn) {
    // User is logged in, show the logout button and hide the login button
    loginLink.style.display = 'none';
    logoutLink.style.display = 'block';
  } else {
    // User is not logged in, show the login button and hide the logout button
    loginLink.style.display = 'block';
    logoutLink.style.display = 'none';
  }

  // Handle logout
  logoutLink.addEventListener('click', async () => {
    try {
      // Make a logout request to the server (if you have an API endpoint for logout)
      let response = await fetch('http://localhost:5095/api/Login/logout', {
        method: 'POST', // Or GET, depending on your backend
        credentials: 'include', // Make sure session cookies are sent
      });

      if (response.ok) {
        // Clear sessionStorage and localStorage
        sessionStorage.removeItem('LoggedInUser');
        localStorage.removeItem('auth-token');

        // Refresh the page or redirect to login
        window.location.href = '/login.html';
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout Error:', error);
    }
  });
});

//hamburger menu
const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
});
