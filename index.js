import { Home } from "./modules/home.js";
import { headNav } from "./modules/headNav.js";
import { Footer } from "./modules/footer.js";
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
    contact() {
      return `
        <h1>Contact</h1>
        <p>Business inquiries: <a href="mailto:emailplaceholder">email placeholder</a></p>
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

    el("main", { className: "site-main", parent: body });

    Footer(body);

    render("home");
  });
})();
