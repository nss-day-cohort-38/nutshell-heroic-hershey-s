//render news articles to dom - Katie Wohl

import makeNewsComponent from "./htmlFactory.js"
const newsContainer = document.querySelector("#newsOutputContainer")
const renderNewsArticles = (articles) => {
    
    articles.forEach(article => {
        const articleHtml = makeNewsComponent(article)
        newsContainer.innerHTML += articleHtml
    })
}

export default renderNewsArticles