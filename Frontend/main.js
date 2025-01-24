//fetch data with javascript
async function fetchArticles() {
  try {
    let response = await fetch('http://localhost:5095/api/Article');
    if (!response.ok) throw new Error('HTTP error ' + response.status);

    let data = await response.json();
    console.log('Articles:', data);
  } catch (error) {
    console.error('Fetch Error:', error);
  }

  //find the element in html where the data is to be implemented
  const container = document.getElementById('article-container');

  //removes what is already within the html container
  container.innerHTML = '';
}

fetchArticles();

//send articles to frontend

//send data to backend
async function createArticle() {
  let newArticle = {
    title: 'Pyramids are definitely gonna work this time',
    content: '10/10 pharaohs say pyramids were a good idea.',
  };

  try {
    let response = await fetch('http://localhost:5095/api/Article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle),
    });

    if (!response.ok) throw new Error('HTTP error ' + response.status);

    let result = await response.json();
    console.log('Created:', result);
  } catch (error) {
    console.error('POST Error:', error);
  }
}

createArticle();

//login
async function Login() {}

const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
});
