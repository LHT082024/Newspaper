<form id="article-form">
  <input type="hidden" id="article-id" />
  <label for="headline">Headline:</label>
  <input type="text" id="headline" required />
  
  <label for="content">Content:</label>
  <textarea id="content" required></textarea>
  
  <label for="imagePath">Image Path:</label>
  <input type="text" id="imagePath" />

  <button type="submit">Save Article</button>
</form>

document.getElementById('article-form').addEventListener('submit', async (event) => {
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
      response = await fetch(`http://localhost:5095/api/Article/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });
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

<button class="edit-button" data-id="1">Edit</button>

document.querySelectorAll('.edit-button').forEach(button => {
  button.addEventListener('click', async (event) => {
    const articleId = event.target.getAttribute('data-id');
    
    try {
      const response = await fetch(`http://localhost:5095/api/Article/${articleId}`);
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

document.querySelectorAll('.delete-button').forEach(button => {
  button.addEventListener('click', async (event) => {
    const articleId = event.target.getAttribute('data-id');

    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(`http://localhost:5095/api/Article/${articleId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete article');
        
        alert('Article deleted successfully');
        location.reload(); // Reload to reflect the changes
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  });
});

