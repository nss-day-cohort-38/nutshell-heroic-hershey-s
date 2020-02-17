//articles section - Katie Wohl
const baseURL = "http://localhost:8088"

const API = {
    getNewsArticles() {
        return fetch(`${baseURL}/articles`)
            .then(response => response.json())
    },
    saveNewsArticle(newArticle) {
        return fetch(`${baseURL}/articles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newArticle)
        })
    }
}

export default API