import "./style/reset.css";
import "./style/main.css";


import { Home } from "./modules/home.js";
import { headNav } from "./modules/headNav.js";
import { Sidebar } from "./modules/sidebar.js";
import { Footer } from "./modules/footer.js";
import { Contact } from "./modules/contact.js";
import { el, $, $$, setTitle } from "./modules/utils.js";
import videos from "./data/videos.json5";

(function () {
  const pages = {
    videos() {
      const items = (videos || [])
        .map((v) => {
          const url = v.url || `https://www.youtube.com/watch?v=${v.id}`;
          const title = v.title || "Untitled";
          const desc = v.description || "";
          return `
            <li class="item">
              <a class="nav-anchor" href="${url}" target="_blank" rel="noopener">${title}</a>
              ${desc ? `<p class="video-desc">${desc}</p>` : ""}
            </li>
          `;
        })
        .join("");

      return `
        <section class="video-page">
          <h1 class="vid-page-head">Videos</h1>
          <div class="list-container">
            <h2 class="list-head">Latest uploads</h2>
            <ul class="list">${items}</ul>
          </div>
        </section>
      `;
    },

    about() {
      return `
        <section class="a-container">
          <h1>About</h1>
          <p>Hi! I’m Amy. I like narrative games, gentle sims, weird web art, and snacks.</p>
          <p>This site is a work-in-progress.</p>
        </section>
      `;
    },

    contact() {
      Contact();
      return ""; 
    },

    _notFound() {
      return `<h1>Not Found</h1><p>That page isn’t ready yet.</p>`;
    },
  };

  function render(key) {
    const main = $(".main-body");
    main.innerHTML = "";

    if (key === "home") {
      Home({ videos }); 
    } else if (key === "contact") {
      pages.contact(); 
    } else {
      const view = pages[key] || pages._notFound;
      main.innerHTML = view();
      setTitle(key);
    }

    $$(".nav-btn").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.page === key);
    });

    if (key !== "home" && key !== "contact") setTitle(key);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const root = $(".main-container");
    const main = $(".main-body");
    const aside = $(".junior-body");

    const { header, list } = headNav(() => render("home"));
    root.prepend(header);

    [
      ["home", "Home"],
      ["videos", "Videos"],
      ["about", "About"],
      ["contact", "Contact"],
    ].forEach(([key, label]) => {
      const li = el("li", { className: "nav-li", parent: list });
      const btn = el("button", {
        className: "nav-btn nav-anchor",
        text: label,
        attrs: { "data-page": key, type: "button" },
        parent: li,
      });
      btn.addEventListener("click", () => render(key));
    });

    Sidebar({
      parent: aside,
      latestUrl:
        (videos &&
          videos[0] &&
          (videos[0].url || `https://www.youtube.com/watch?v=${videos[0].id}`)) ||
        "#",
      playlists: [],
    });

    
    Footer(root);

    render("home");
  });
})();
