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

  if (!junior.querySelector(".intro-message-container")) {
    const introWrap = el("section", { className: "intro-message-container", parent: junior });
    el("h2", { className: "intro-message-head", text: "Welcome to Gaming with Amy!", parent: introWrap });
    const introPanel = el("article", { className: "intro-message", parent: introWrap });
    el("p", {
      text:
        "Dive into the wonderful world of cozy games, books, and everything soft and squishy. From the newest indie game reviews to my latest squishmallow haul, join me on my cozy adventures!",
      parent: introPanel,
    });
  }

  return { root, section, leftRail, main, junior };
}

const pages = {
  about() {
    return `
      <section class="a-container">
        <h1>About</h1>
        <p>Hi! I’m Amy. I like narrative games, gentle sims, weird web art, and snacks.</p>
        <p>This site is a work-in-progress.</p>
      </section>
    `;
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

  switch (key) {
    case "home":
      Home({ videos, target: document.querySelector(".main-body") });
      setTitle("home");
      break;

    case "videos":
      Videos({
        videos,
        mainTarget: document.querySelector(".main-body"),
        listTarget: document.querySelector(".junior-body"),
      });
      break;

    case "about":
      main.innerHTML = pages.about();
      setTitle("about");
      break;

    case "contact":
      Contact();            
      setTitle("contact");
      break;

    default:
      main.innerHTML = pages._notFound();
      setTitle("not found");
      break;
  }

  $$(".nav-btn").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.page === key);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const { root, leftRail } = ensureLayout();

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

  Footer(root);
  render("home");
});
