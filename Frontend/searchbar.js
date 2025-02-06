
//retrives elements from html
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.querySelector(".search-button");

    if (!searchInput) {
        console.error("Search input not found.");
        return;
    }

    // Search when typing
    searchInput.addEventListener("input", searchArticles);

    // Search when clicking the button
    if (searchButton) {
        searchButton.addEventListener("click", searchArticles);
    }
});

function searchArticles() {
    let query = document.getElementById("search-input").value.toLowerCase();
    let articles = document.querySelectorAll(".article"); // Get all articles currently displayed

    if (!articles.length) {
        console.error("No articles found in the DOM.");
        return;
    }

    articles.forEach(article => {
        let headline = article.querySelector("a").textContent.toLowerCase();
        
        if (headline.includes(query)) {
            article.style.display = "block"; // Show matching articles
        } else {
            article.style.display = "none"; // Hide non-matching articles
        }
    });
}
