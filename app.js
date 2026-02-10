let ORIGINAL_MOVIES = [];
let ORIGINAL_SERIES = [];
let ORIGINAL_RANDOM = [];

window.SEARCH_QUERY = "";

/* =================================================
   ================= NO RESULTS ====================
   ================================================= */

function showNoResults() {
  const el = document.getElementById("no-results");
  if (el) el.classList.add("show");
}

function hideNoResults() {
  const el = document.getElementById("no-results");
  if (el) el.classList.remove("show");
}

/* =================================================
   ============ SECTION SHOW / HIDE ================
   ================================================= */
function hideAllSections() {
  document
    .querySelectorAll(".movie-list-container")
    .forEach((sec) => (sec.style.display = "none"));
}

function showSection(sectionId) {
  const sec = document.getElementById(sectionId);
  if (sec) sec.style.display = "block";
}

function restoreAllSections() {
  document
    .querySelectorAll(".movie-list-container")
    .forEach((sec) => (sec.style.display = "block"));

  document
    .querySelectorAll(".movie-list")
    .forEach((list) => (list.style.transform = "translateX(0px)"));

  hideNoResults();
}

/* =================================================
   ================= SLIDER ========================
   ================================================= */

document.querySelectorAll(".arrow").forEach((arrow) => {
  const wrapper = arrow.closest(".movie-list-wrapper");
  const list = wrapper.querySelector(".movie-list");
  let current = 0;

  arrow.addEventListener("click", () => {
    const card = list.querySelector(".movie-list-item");
    if (!card) return;

    const step = card.offsetWidth + 20;
    const max = list.scrollWidth - wrapper.offsetWidth;

    current = current >= max ? 0 : current + step;

    list.style.transform = `translateX(-${current}px)`;
  });
});

/* =================================================
   ================= UI TOGGLES ====================
   ================================================= */

document.querySelector(".toggle-ball")?.addEventListener("click", () => {
  document
    .querySelectorAll(
      ".container,.movie-list-title,.navbar-container,.sidebar,.profile-dropdown,left-menu-icon,.toggle",
    )
    .forEach((el) => el.classList.toggle("active"));
});

document.querySelector(".hamburger")?.addEventListener("click", () => {
  document.querySelector(".sidebar")?.classList.toggle("collapsed");
});

/* =================================================
   ===== SIDEBAR MENU OPTIONS CLICK HANDLER ========
   ================================================= */
document.querySelectorAll(".left-menu-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    document
      .querySelectorAll(".left-menu-icon")
      .forEach((i) => i.classList.remove("active"));

    icon.classList.add("active");
  });
});

document.querySelectorAll(".left-menu-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    const type = icon.dataset.title.toLowerCase();

    // ALL SECTIONS hide
    hideAllSections();
    hideNoResults();
    searchInput.value = "";

    switch (type) {
      case "search":
        searchInput.classList.add("open");
        searchInput.focus();
        break;

      case "home":
        restoreAllSections();
        break;

      case "users":
        window.location.href = "profile.html";
        break;

      case "saved":
        window.location.href = "favorites.html";
        break;

      case "tv":
        showSection("section-tv");
        break;

      case "history":
        window.location.href = "history.html";
        break;

      default:
        restoreAllSections();
    }
  });
});

document
  .querySelector(".profile-text-container")
  ?.addEventListener("click", () => {
    document.querySelector(".profile-dropdown")?.classList.toggle("show");
  });

/* =================================================
   ================= SEARCH UI =====================
   ================================================= */

const searchInput = document.querySelector(".search-input");
document.querySelector(".navbar-search-icon")?.addEventListener("click", () => {
  searchInput.classList.toggle("open");
  searchInput.focus();
});

/* =================================================
   ================= API CONFIG ====================
   ================================================= */

const TMDB_KEY = "fa4b8d42298757777e99973c34daa752";
const TMDB = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

/* =================================================
   ============ LOCAL CONTENT ======================
   ================================================= */

const INDIAN_SHOWS = [
  {
    title: "Taarak Mehta Ka Ooltah Chashmah",
    type: "tv",
    seasons: 15,
    rating: 9.6,
    poster: "img/tmkoc.webp",
  },

  {
    title: "CID",
    type: "tv",
    seasons: 21,
    rating: 8.2,
    poster: "img/cid.webp",
    playlist: "PLXTTJTiZUhlpbbUVImQyThd8yWrcTDhl5",
  },

  {
    title: "Bhabiji Ghar Par Hai",
    type: "tv",
    seasons: 1,
    rating: 9.0,
    poster: "img/BGPH.webp",
  },

  { title: "Fir", type: "tv", seasons: 4, rating: 9.4, poster: "img/fir.webp" },

  {
    title: "Pritam Pyare Aur Wo",
    type: "tv",
    seasons: 1,
    rating: 8.0,
    poster: "img/PPAW.webp",
  },

  {
    title: "Hatim",
    type: "tv",
    seasons: 1,
    rating: 9.0,
    poster: "img/hatim.webp",
  },

  {
    title: "Naagin",
    type: "tv",
    seasons: 1,
    rating: 6.9,
    poster: "img/naagin.webp",
  },

  {
    title: "Sacred Games",
    type: "series",
    seasons: 2,
    rating: 8.6,
    poster: "img/sacredgames.jpg",
  },
  {
    title: "Mirzapur",
    type: "series",
    seasons: 3,
    rating: 8.4,
    poster: "img/mirzapur.jpg",
  },
  {
    title: "Panchayat",
    type: "series",
    seasons: 3,
    rating: 8.9,
    poster: "img/panchayat.jpg",
  },

  { title: "Animal", type: "movie", rating: 7.2, poster: "img/animal.jpg" },
  { title: "RRR", type: "movie", rating: 8.1, poster: "img/rrr.jpg" },
];

function highlightText(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}

/* =================================================
   =============== RENDER CARDS ====================
   ================================================= */

function renderCards(data, listId) {
  const list = document.getElementById(listId);
  if (!list) return;

  list.innerHTML = "";

  data.forEach((item) => {
    if (!item.poster) return;

    const title = item.title || item.name;

    const card = document.createElement("div");
    card.className = "movie-list-item netflix-card";

    card.innerHTML = `
        <div class="poster-wrapper">
            <img src="${item.poster}" alt="${title}">
        </div>

        <div class="netflix-hover">
            <h3>${title}</h3>
            <p>⭐ ${item.rating ?? "N/A"}</p>

            <button class="fav-btn" onclick='addToFavorites(${JSON.stringify(item)})'>
                ❤️ Add
            </button>

            <button class="movie-list-item-button"
                onclick="playMovieTrailer('${title}', '${item.poster}', '${item.rating}', '${item.type || "movie"}')">
                Watch
            </button>
        </div>`;

    list.appendChild(card);
  });
}

/* =================================================
   ================= HOME LOAD =====================
   ================================================= */

fetch(
  `${TMDB}/discover/movie?api_key=${TMDB_KEY}&region=IN&with_original_language=hi`,
)
  .then((r) => r.json())
  .then((d) => {
    ORIGINAL_MOVIES = d.results
      .filter((x) => x.poster_path)
      .map((x) => ({
        title: x.title,
        rating: x.vote_average,
        poster: TMDB_IMG + x.poster_path,
        type: "movie",
      }));

    renderCards(ORIGINAL_MOVIES, "movies-new");
  });

fetch(`${TMDB}/tv/popular?api_key=${TMDB_KEY}&with_original_language=hi`)
  .then((r) => r.json())
  .then((d) => {
    ORIGINAL_SERIES = d.results
      .filter((x) => x.poster_path)
      .map((x) => ({
        title: x.name,
        rating: x.vote_average,
        poster: TMDB_IMG + x.poster_path,
        type: "series",
      }));

    renderCards(ORIGINAL_SERIES, "series");
  });

renderCards(
  INDIAN_SHOWS.filter((x) => x.type === "tv"),
  "tv",
);

fetch(`${TMDB}/trending/all/week?api_key=${TMDB_KEY}`)
  .then((r) => r.json())
  .then((d) => {
    ORIGINAL_RANDOM = d.results
      .filter((x) => x.poster_path)
      .map((x) => ({
        title: x.title || x.name,
        rating: x.vote_average,
        poster: TMDB_IMG + x.poster_path,
        type: x.media_type === "tv" ? "series" : "movie",
      }));

    renderCards(ORIGINAL_RANDOM, "random");
  });

/* =================================================
   ================= SEARCH ========================
   ================================================= */
searchInput.addEventListener("keyup", async (e) => {
  const q = e.target.value.trim().toLowerCase();

  if (q === "") {
    renderCards(ORIGINAL_MOVIES, "movies-new");
    renderCards(ORIGINAL_SERIES, "series");
    renderCards(
      INDIAN_SHOWS.filter((x) => x.type === "tv"),
      "tv",
    );
    renderCards(ORIGINAL_RANDOM, "random");
    restoreAllSections();
    return;
  }

  if (q.length < 2) return;

  hideAllSections();
  hideNoResults();

  const local = INDIAN_SHOWS.filter((x) => x.title.toLowerCase().includes(q));

  if (local.length) {
    renderCards(
      local,
      local[0].type === "movie" ? "movies-new" : local[0].type,
    );
    showSection("section-tv");
    return;
  }

  const res = await fetch(
    `${TMDB}/search/multi?api_key=${TMDB_KEY}&query=${q}`,
  );
  const data = await res.json();

  const movies = data.results.filter(
    (x) => x.media_type === "movie" && x.poster_path,
  );
  const series = data.results.filter(
    (x) => x.media_type === "tv" && x.poster_path,
  );

  if (movies.length) {
    renderCards(
      movies.map((x) => ({
        title: x.title,
        rating: x.vote_average,
        poster: TMDB_IMG + x.poster_path,
        type: "movie",
      })),
      "movies-new",
    );

    showSection("section-movies");
  }

  if (series.length) {
    renderCards(
      series.map((x) => ({
        title: x.name,
        rating: x.vote_average,
        poster: TMDB_IMG + x.poster_path,
        type: "series",
      })),
      "series",
    );

    showSection("section-series");
  }

  if (!movies.length && !series.length) showNoResults();
});

document.querySelectorAll(".menu-list-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".menu-list-item")
      .forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    const type = item.dataset.nav;

    hideAllSections();
    hideNoResults();
    searchInput.value = "";

    switch (type) {
      case "home":
        restoreAllSections();
        break;

      case "movies":
        showSection("section-movies");
        break;

      case "series":
        showSection("section-series");
        break;

      case "tv":
        showSection("section-tv");
        scrollToSectionWithOffset("section-tv");
        break;

      case "popular":
      case "trends":
        showSection("section-random");
        break;
    }
  });
});

document.addEventListener("click", (e) => {
  const profile = document.querySelector(".profile-container");
  if (!profile.contains(e.target)) {
    document.querySelector(".profile-dropdown")?.classList.remove("show");
  }
});

function openTrailer(url) {
  const modal = document.getElementById("trailerModal");
  const frame = document.getElementById("trailerFrame");

  frame.src = url;
  modal.style.display = "block";
}

document.getElementById("closeTrailer").onclick = () => {
  document.getElementById("trailerModal").style.display = "none";
  document.getElementById("trailerFrame").src = "";
};

function playTVPlaylist(showName) {
  window.open(
    `https://www.youtube.com/results?search_query=${showName}+full+episodes`,
    "_blank",
  );
}

function playMovieTrailer(title, poster, rating = "N/A", type = "movie") {
  // SAVE TO HISTORY
  addToHistory({
    title: title,
    poster: poster,
    rating: rating,
    type: type,
  });

  const msg = document.getElementById("youtubeMessage");
  if (msg) {
    msg.style.display = "block";
    setTimeout(() => {
      msg.style.display = "none";
    }, 4000);
  }

  // Auto detect content type
  let query = "";

  if (type === "movie") {
    query = `${title} full movie Hindi`;
  } else if (type === "series") {
    query = `${title} all episodes`;
  } else if (type === "tv") {
    query = `${title} full episodes`;
  } else {
    query = `${title} video`;
  }

  window.open(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
    "_blank",
  );
}

function addToHistory(movie) {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  // remove duplicate
  history = history.filter((m) => m.title !== movie.title);

  // add at top
  history.unshift(movie);

  // max 50 history
  if (history.length > 50) history.pop();

  localStorage.setItem("history", JSON.stringify(history));
}

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchInput.value = "";
    searchInput.blur();

    renderCards(ORIGINAL_MOVIES, "movies-new");
    renderCards(ORIGINAL_SERIES, "series");
    renderCards(
      INDIAN_SHOWS.filter((x) => x.type === "tv"),
      "tv",
    );
    renderCards(ORIGINAL_RANDOM, "random");

    restoreAllSections();
  }
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function addToFavorites(movie) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favs.some((m) => m.title === movie.title);
  if (exists) {
    alert("Already in favorites ❤️");
    return;
  }

  favs.push(movie);
  localStorage.setItem("favorites", JSON.stringify(favs));
  alert("Added to favorites ⭐");
}

function openFavorites() {
  window.location.href = "favorites.html";
}

function scrollToSectionWithOffset(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const navbarHeight = 70; // तुझा navbar 60px आहे, थोडा safe margin
  const elementPos = element.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: elementPos - navbarHeight,
    behavior: "smooth",
  });
}

// FINAL SIGNUP FUNCTION (Node.js + MongoDB)
async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both Email and Password");
    return;
  }

  try {
    const res = await fetch(
      "https://universa-backend.onrender.com/api/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await res.json();
    alert(data.message);

    if (data.message === "Account created successfully") {
      window.location.href = "login.html";
    }
  } catch (error) {
    alert("Signup failed");
  }
}

function navigateTo(section) {
  hideAllSections();
  hideNoResults();
  searchInput.value = "";

  switch (section) {
    case "home":
      restoreAllSections();
      break;

    case "movies":
      showSection("section-movies");
      break;

    case "series":
      showSection("section-series");
      break;

    case "tv":
      showSection("section-tv");
      scrollToSectionWithOffset("section-tv");
      break;

    case "popular":
    case "trends":
      showSection("section-random");
      break;
  }

  // Close mobile menu after clicking
  mobileMenu.classList.remove("open");
}

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
