import "./style/reset.css";
import "./style/main.css";

import { Home } from "./modules/home.js";
import { headNav } from "./modules/headNav.js";
import { Sidebar } from "./modules/sidebar.js";
import { Blog } from "./modules/blog.js";
import { Videos } from "./modules/videos.js";
import { Footer } from "./modules/footer.js";
import { Contact } from "./modules/contact.js";
import { el, $, $$, setTitle } from "./modules/utils.js";

import videos from "./data/videos.json5";
import blogs from "./data/blogs.json5";
import channel from "./data/channel.json5";

function parseRoute(pathname) {
  const parts = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if (parts.length === 0) return { page: "home" };

  const base = parts[0].toLowerCase();
  switch (base) {
    case "home":    return { page: "home" };
    case "videos":
    case "vids":    return { page: "videos", slug: parts[1] || null };
    case "blog":
    case "blogs":   return { page: "blog", slug: parts[1] || null };
    case "contact": return { page: "contact" };
    default:        return { page: "404" };
  }
}

function navigate(path, replace = false) {
  if (path !== window.location.pathname) {
    if (replace) {
      history.replaceState(null, "", path);
    } else {
      history.pushState(null, "", path);
    }
  }
  renderFromURL();
}

function makeIntroPanel(host) {
  host.innerHTML = "";
  const introWrap = el("section", { className: "intro-message-container", parent: host });
  el("h2", { className: "intro-message-head", text: channel.welcomeHeading, parent: introWrap });
  const introPanel = el("article", { className: "intro-message", parent: introWrap });
  el("p", { text: channel.welcomeMessage, parent: introPanel });
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

  return { root, section, leftRail, main, junior };
}

function render(page, opts = {}) {
  const main   = document.querySelector(".main-body");
  const junior = document.querySelector(".junior-body");
  if (!main || !junior) return;

  switch (page) {
    case "home":
      main.innerHTML = "";
      Home({ videos, channel });
      makeIntroPanel(junior);
      setTitle("home");
      break;

    case "videos":
      Videos({ videos, slug: opts.slug, onNavigate: navigate });
      break;

    case "blog":
      Blog({ posts: blogs, slug: opts.slug, onNavigate: navigate });
      break;

    case "contact":
      main.innerHTML = "";
      Contact();
      makeIntroPanel(junior);
      break;

    default:
      main.innerHTML = `<h1>Not Found</h1><p>That page isn't ready yet.</p>`;
      setTitle("not found");
      break;
  }

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.page === page);
  });
}

function renderFromURL() {
  const route = parseRoute(window.location.pathname);
  render(route.page, { slug: route.slug });
  window.scrollTo(0, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  const { root, leftRail } = ensureLayout();

  const { header, list } = headNav(() => navigate("/"));
  if (!root.querySelector(".head-nav")) root.prepend(header);

  [
    ["home",    "Home",    "/"],
    ["videos",  "Videos",  "/videos"],
    ["blog",    "Blog",    "/blog"],
    ["contact", "Contact", "/contact"],
  ].forEach(([key, label, path]) => {
    const li = el("li", { className: "nav-li", parent: list });
    const btn = el("button", {
      className: "nav-btn nav-anchor",
      text: label,
      attrs: { "data-page": key, type: "button" },
      parent: li,
    });
    btn.addEventListener("click", () => navigate(path));
  });

  Sidebar({
    parent: leftRail,
    latestUrl:
      (videos && videos[0] &&
        (videos[0].url || `https://www.youtube.com/watch?v=${videos[0].id}`)) || "#",
    playlists: [],
    bandcamp: {
      embedSrc: "https://bandcamp.com/EmbeddedPlayer/track=999830409/size=small/bgcol=1b1026/linkcol=ffd86b/artwork=none/transparent=true/"
    }
  });

  Footer(root);

  window.addEventListener("popstate", renderFromURL);

  renderFromURL();
});
