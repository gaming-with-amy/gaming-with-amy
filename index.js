import { Home } from "./modules/home.js";
import { headNav } from "./modules/headNav.js";
import { Sidebar } from "./modules/sidebar.js";
import { Footer } from "./modules/footer.js";
import { Contact } from "./modules/contact.js";
import { ContactResponse } from "./modules/contactResponse.js"; // <- add
import { el, $, $$, setTitle } from "./modules/utils.js";
import videos from "./data/videos.json5";

(function () {
  const pages = {
    videos() {
      return `
        <h1>Videos</h1>
        <p>Roundups, reviews, and recommendations. (Listing TBD.)</p>
      `;
    },
    about() {
      return `
        <h1>About</h1>
        <p>Hi! I’m Amy. I like narrative games, gentle sims, weird web art, and snacks.</p>
        <p>This site is a work-in-progress.</p>
      `;
    },
    _notFound() {
      return `<h1>Not Found</h1><p>That page isn’t ready yet.</p>`;
    },
  };

  function render(key) {
    const main = $("main");
    main.innerHTML = "";

    if (key === "home") {
      Home({ videos });
    } else if (key === "contact") {
      Contact();
    } else if (key === "thanks") {
      ContactResponse();
    } else {
      const view = pages[key] || pages._notFound;
      main.innerHTML = view();
    }

    $$(".nav-btn").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.page === key);
    });

    setTitle(key);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    const { header, list } = headNav(() => render("home"));
    body.appendChild(header);

    [
      ["home", "Home"],
      ["videos", "Videos"],
      ["about", "About"],
      ["contact", "Contact"],
    ].forEach(([key, label]) => {
      const li = el("li", { parent: list });
      const btn = el("button", {
        className: "nav-btn",
        text: label,
        attrs: { "data-page": key, type: "button" },
        parent: li,
      });
      btn.addEventListener("click", () => render(key));
    });

    Sidebar({
      parent: body,
      latestUrl:
        (videos &&
          videos[0] &&
          (videos[0].url || `https://www.youtube.com/watch?v=${videos[0].id}`)) ||
        "#",
      playlists: [],
    });

    el("main", { className: "site-main", parent: body });

    Footer(body);

    render("home");
  });
})();
