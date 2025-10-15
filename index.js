import "./style/reset.css";
import "./style/main.css";

import { Home } from "./modules/home.js";
import { headNav } from "./modules/headNav.js";
import { Sidebar } from "./modules/sidebar.js";
import { Videos } from "./modules/videos.js";
import { Footer } from "./modules/footer.js";
import { Contact } from "./modules/contact.js";
import { el, $, $$, setTitle } from "./modules/utils.js";
import videos from "./data/videos.json5";

function ensureLayout() {
  let root = $(".main-container");
  if (!root) root = el("div", { className: "main-container", parent: document.body });

  let section = $(".section-container");
  if (!section) section = el("div", { className: "section-container", parent: root });

  let leftRail = $(".left-rail");
  if (!leftRail) leftRail = el("aside", { className: "left-rail sidebar", parent: section });

  let main = $(".main-body");
  if (!main) main = el("div", { className: "main-body card", parent: section });

  let junior = $(".junior-body");
  if (!junior) junior = el("aside", { className: "junior-body", parent: section });

  let footer = $(".site-footer");
  if (!footer) footer = el("footer", { className: "site-footer", parent: root });

  return { root, section, leftRail, main, junior, footer };
}

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
  if (!main) {
    console.error("[render] .main-body not found");
    return;
  }
  main.innerHTML = "";

  if (key === "home") {
    Home({ videos });
  } else if (key === "videos") {
    
    Videos({ videos });
    const view = pages.videos;
    main.innerHTML = view();
  } else {
    const view = pages[key] || pages._notFound;
    main.innerHTML = view();
  }

  $$(".nav-btn").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.page === key);
  });

  if (key !== "home" && key !== "contact") setTitle(key);
}

document.addEventListener("DOMContentLoaded", () => {
  const { root, leftRail, junior, footer } = ensureLayout();

  const { header, list } = headNav(() => render("home"));
  
  if (!root.querySelector(".head-nav")) root.prepend(header);

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
    parent: leftRail,
    latestUrl:
      (videos &&
        videos[0] &&
        (videos[0].url || `https://www.youtube.com/watch?v=${videos[0].id}`)) ||
      "#",
    playlists: [],
  });

  if (!footer.dataset.bound) {
    Footer(root);
    footer.dataset.bound = "1";
  }

  render("home");
});
