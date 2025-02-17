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
