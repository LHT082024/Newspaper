// sessionStorage.setItem('articleId', article.Id)
// const articleId = sessionStorage.getItem('articleId');

// async function fetchArticleDetails(articleId  ) {
//   try {
//     let response = await fetch(
//       `http://localhost:5095/api/Article/`
//     );
//     if (!response.ok) throw new Error('HTTP error ' + response.status);

//     let article = await response.json();
//     console.log('Article details:', article);

//     const container = document.querySelector('.article-container');
//     if (!container) {
//       console.error('Article container not found');
//       return;
//     }

//     container.textContent = '';

//     const articleTitle = document.createElement('h2');
//     articleTitle.textContent = article.headline;
//     container.appendChild(articleTitle);

//     const articleContent = document.createElement('p');
//     articleContent.textContent = article.content || 'No content available';
//     container.appendChild(articleContent);

//     if (article.imageURL) {
//       const articleImage = document.createElement('img');
//       articleImage.src = article.imageURL;
//       articleImage.alt = 'Article Image';
//       container.appendChild(articleImage);
//     }
//   } catch (error) {
//     console.error('Error fetching article:', error);
//   }
// }

// fetchArticleDetails();

async function getArticle(articleId) {
  try {
    const response = await fetch(`/getArticle?id=${articleId}`); // Call the server
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const article = await response.json(); // Convert the response to a JavaScript object

    // Now you have the article as a JavaScript object!
    console.log(article); 

    // Let's display the article
    displayArticle(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    // Handle errors, maybe display a message to the user
  }
}

function displayArticle(article) {
  const articleTitle = document.getElementById("article-title");
  const articleContent = document.getElementById("article-content");

  if (articleTitle && articleContent) {
    articleTitle.textContent = article.Headline;
    articleContent.textContent = article.Story;
  } else {
    console.error("Elements to display article not found in the DOM.");
  }
}

// Call the function to get the article with ID 2
getArticle(2);