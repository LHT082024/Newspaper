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
