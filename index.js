import { Home } from "./modules/home.js";
import { headNav } from "./modules/headNav.js";

(function () {
  function el(tag, opts = {}) {
    const node = document.createElement(tag);
    if (opts.className) node.className = opts.className;
    if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
    if (opts.text) node.textContent = opts.text;
    if (opts.html) node.innerHTML = opts.html;
    if (opts.parent) opts.parent.appendChild(node);
    return node;
  }

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
    const main = document.querySelector("main");
    main.innerHTML = "";

    if (key === "home") {
      Home(main);
    } else {
      const view = pages[key] || pages._notFound;
      main.innerHTML = view();
    }

    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.page === key);
    });

    document.title = (key === "home" ? "Home" : capitalize(key)) + " | Gaming with Amy";
  }

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
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

    const footer = el("footer", { className: "site-footer", parent: body });
    footer.innerHTML = `<small>© ${new Date().getFullYear()} Gaming with Amy</small>`;

    render("home");
  });
})();
