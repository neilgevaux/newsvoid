const apiKey = config.apiKey;

async function getNews() {
  const topHeadlines = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  console.log(topHeadlines);

  try {
    const response = await fetch(topHeadlines);

    if(!response.ok) {
      throw new Error(`HTTP error status ${response.status} - ${response.statusText} `)
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      throw new Error("No news articles found.");
  }

    const newsDiv = document.getElementById('news');
    if (newsDiv) {
      const newsList = document.getElementById('news-list');
      if (!newsList) {
        console.error("news-list element not found!");
        return;
      }

      newsList.innerHTML = "";

      const keywordInput = document.getElementById('void-search');
      const keyword = keywordInput.value.toLowerCase()

      data.articles
      .filter(article => {
        if (article.title) {
          return !article.title.toLowerCase().includes(keyword.toLowerCase());
        }
        return true;
      })
      .forEach(article => {
        const title = article.title;
        const imgUrl = article.urlToImage;

        const newsItem = document.createElement('div');

        const titleHeading = document.createElement('h3');
        titleHeading.textContent = title;
        newsItem.appendChild(titleHeading);

        if (imgUrl) {
          const imgContainer = document.createElement('img');
          imgContainer.src = imgUrl;
          imgContainer.alt = title;
          newsItem.appendChild(imgContainer);
        }
        
        newsList.appendChild(newsItem);
      });

    } else {
      console.error("news element not found!")
    }

  } catch (error) {
    console.error("Error fetching news data:", error);
    const newsDiv = document.getElementById('news');
    if (newsDiv) {
      newsDiv.textContent = "Error fetching news data. Please try again later.";
    } else {
      console.error("news element not found!");
    }
  }
}

const voidSubmitButton = document.getElementById('void-submit');

if (voidSubmitButton) {
  voidSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    getNews();
  });
} else {
  "Submit button not found."
}

getNews();
