function loadHistory() {
    const list = document.getElementById("history-list");
    let history = JSON.parse(localStorage.getItem("history")) || [];

    if (history.length === 0) {
        list.innerHTML = "<p style='text-align:center; opacity:0.7;'>No history found.</p>";
        return;
    }

    list.innerHTML = "";

    history.forEach(item => {
        const card = document.createElement("div");
        card.className = "history-card";

        card.innerHTML = `
            <img src="${item.poster}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>⭐ ${item.rating}</p>
            <p>${item.type.toUpperCase()}</p>
        `;

        card.addEventListener("click", () => {
            let searchQuery = "";

            if (item.type === "movie")
                searchQuery = `${item.title} full movie Hindi`;

            else if (item.type === "series")
                searchQuery = `${item.title} all episodes`;

            else if (item.type === "tv")
                searchQuery = `${item.title} full episodes`;

            window.open(
                `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
                "_blank"
            );
        });

        list.appendChild(card);
    });
}

function clearHistory() {
    localStorage.removeItem("history");
    loadHistory();
}

loadHistory();
