// create html form for adding and editing articles
<form id="article-form">
  <input type="hidden" id="article-id" />
  <label for="headline">Headline:</label>
  <input type="text" id="headline" required />

  <label for="content">Content:</label>
  <textarea id="content" required></textarea>

  <label for="imagePath">Image Path:</label>
  <input type="text" id="imagePath" />

  <button type="submit">Save Article</button>
</form>;

// handle form submission with javascript
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

// pre-fill the form for editing an article
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

// delete articles
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

document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = sessionStorage.getItem('LoggedInUser');

  if (!loggedInUser) {
    window.location.href = '/login.html'; // Redirect to login if not logged in
  }
});

// hide button based on users role
// Assuming you have a JWT token stored in localStorage
const token = localStorage.getItem('auth-token'); // Retrieve token
if (token) {
  const decoded = decodeJwt(token); // Decode the JWT to get the user info
  const userRole = decoded.role; // Get user role from the token (e.g., 'editor' or 'reader')

  // Show the button if the user is an editor
  if (userRole === 'editor') {
    document.getElementById('add-article-btn').style.display = 'block';
  }
}

// Example function to decode JWT (you can use a library like jwt-decode)
function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// add article
// Event listener for the "Add Article" button
const addArticleBtn = document.getElementById('add-article-btn');
addArticleBtn.addEventListener('click', () => {
  // Handle the action when the button is clicked
  openAddArticleForm();
});

// Example function to show the add article form (you can create the form dynamically or display an existing one)
function openAddArticleForm() {
  const formContainer = document.createElement('div');
  formContainer.innerHTML = `
    <form id="add-article-form">
      <input type="text" id="article-title" placeholder="Article Title" required />
      <textarea id="article-content" placeholder="Article Content" required></textarea>
      <button type="submit">Submit Article</button>
    </form>
  `;
  document.body.appendChild(formContainer);

  const form = document.getElementById('add-article-form');
  form.addEventListener('submit', handleAddArticle);
}

function handleAddArticle(event) {
  event.preventDefault();

  const title = document.getElementById('article-title').value;
  const content = document.getElementById('article-content').value;

  // Send the article data to the server (you can make a POST request)
  fetch('http://localhost:5095/api/Article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Article added:', data);
      // Optionally, close the form and update the UI
      alert('Article added successfully!');
      // You might want to reload the articles or update the DOM with the new article.
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
