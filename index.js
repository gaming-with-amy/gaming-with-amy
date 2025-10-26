import "./style/reset.css";
import "./style/main.css";

import { Home } from "./modules/home.js";
import { headNav } from "./modules/headNav.js";
import { Sidebar } from "./modules/sidebar.js";
import { Videos } from "./modules/videos.js";
import { Blog } from "./modules/blog.js";
import { Footer } from "./modules/footer.js";
import { Contact } from "./modules/contact.js";
import { el, $, $$, setTitle } from "./modules/utils.js";

import videos from "./data/videos.json5";
import blogs from "./data/blogs.json5";

function makeIntroPanel(host) {
  host.innerHTML = "";
  const introWrap = el("section", { className: "intro-message-container", parent: host });
  el("h2", { className: "intro-message-head", text: "Welcome to Gaming with Amy!", parent: introWrap });
  const introPanel = el("article", { className: "intro-message", parent: introWrap });
  el("p", {
    text:
      "Dive into the wonderful world of cozy games, books, and everything soft and squishy. From the newest indie game reviews to my latest squishmallow haul, join me on my cozy adventures!",
    parent: introPanel,
  });
}

function ensureLayout() {
  let root = $(".main-container");
  if (!root) root = el("div", { className: "main-container", parent: document.body });

  let section = $(".section-container");
  if (!section) section = el("section", { className: "section-container", parent: root });

  let leftRail = $(".left-rail");
  if (!leftRail) leftRail = el("aside", { className: "left-rail sidebar", parent: section });

  let main = $(".main-body");
  if (!main) main = el("div", { className: "main-body card", parent: section });

  let junior = $(".junior-body");
  if (!junior) junior = el("aside", { className: "junior-body", parent: section });

  if (!junior.querySelector(".intro-message-container")) makeIntroPanel(junior);

  let footer = $(".site-footer");
  if (!footer) footer = el("footer", { className: "site-footer", parent: root });

  return { root, section, leftRail, main, junior, footer };
}

function renderVideoToMain(video) {
  const main = document.querySelector(".main-body");
  if (!main) return;
  main.innerHTML = "";

  const title = video?.title || "Videos";
  const desc  = video?.description || "";
  const ytId  = video?.id || "VIDEO_ID";

  el("h1", { className: "vid-page-head", text: "Videos", parent: main });

  const wrap = el("div", { className: "video-container", parent: main });
  const frameWrap = el("div", { className: "vid-div", parent: wrap });
  el("iframe", {
    attrs: {
      class: "video",
      src: `https://www.youtube.com/embed/${ytId}`,
      title,
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      referrerpolicy: "strict-origin-when-cross-origin",
      allowfullscreen: ""
    },
    parent: frameWrap
  });

  const meta = el("div", { className: "video-meta", parent: main });
  el("h2", { text: title, parent: meta });
  if (desc) el("p", { className: "video-desc", text: desc, parent: meta });
}

function showLatestUploads(aside, vids, onSelect) {
  aside.innerHTML = "";
  const listWrap = el("section", { className: "list-container", parent: aside });
  el("h2", { className: "list-head", text: "Latest uploads", parent: listWrap });

  const ul = el("ul", { className: "list", parent: listWrap });

  (vids || []).forEach((v, idx) => {
    const li = el("li", { className: "item", parent: ul });
    const btn = el("button", { className: "nav-anchor", text: v.title || "Untitled", parent: li });
    btn.type = "button";
    btn.addEventListener("click", () => {
      ul.querySelectorAll(".item").forEach(n => n.classList.remove("item-selected"));
      li.classList.add("item-selected");
      onSelect?.(v, li);
    });
    if (idx === 0) li.classList.add("item-selected");
  });
}

function render(key) {
  const main   = document.querySelector(".main-body");
  const junior = document.querySelector(".junior-body");
  if (!main || !junior) return;

  switch (key) {
    case "home":
      main.innerHTML = "";
      Home({ videos });
      makeIntroPanel(junior);
      setTitle("home");
      break;

    case "videos":
      renderVideoToMain(videos?.[0]);
      showLatestUploads(junior, videos, (v) => {
        renderVideoToMain(v);
        setTitle("videos");
      });
      setTitle("videos");
      break;

    case "blog":
      Blog({ posts: blogs });
      break;

    case "contact":
      main.innerHTML = "";
      Contact();
      makeIntroPanel(junior);
      break;

    default:
      main.innerHTML = `<h1>Not Found</h1><p>That page isn’t ready yet.</p>`;
      setTitle("not found");
      break;
  }

  document.querySelectorAll(".nav-btn").forEach((btn) => {
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
    ["blog", "Blog"],
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
