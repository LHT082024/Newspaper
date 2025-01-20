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
}

fetchArticles();

//send data to backend
async function createArticle() {
  let newArticle = {
    title: 'Pyramids are definitely gonna work this time',
    content: '10/10 pharaohs say pyrmids were a good idea.',
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

/*async function ConnectBackend(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error('HTTP error! Status: ${response.status}');
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

ConnectBackend('http://localhost:5095/api/Article').then((data) => {
  console.log('Received from backend:', data);
});*/
