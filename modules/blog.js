import { el, $, setTitle } from "./utils.js";

export function Blog({ posts = [], slug = null, onNavigate } = {}) {
  const main = $(".main-body") || $("main");
  const aside = $(".junior-body");
  if (!main || !aside) return;

  main.innerHTML = "";
  aside.innerHTML = "";

  let activePost;
  if (slug) {
    activePost = posts.find(p => p.id === slug);
    if (!activePost) {
      activePost = posts[0];
    }
  } else {
    activePost = posts[0];
  }

  const page = el("section", { className: "blog-page", parent: main });
  el("h1", { className: "blog-head", text: "Blog", parent: page });

  const contentWrap = el("article", { className: "blog-content card", parent: page });

  function renderPost(post = {}) {
    contentWrap.innerHTML = "";
    const title = post.title || "Untitled post";
    const date  = post.date  || "";
    const html  = post.html || post.content || "";

    el("h2", { text: title, parent: contentWrap });
    if (date) el("p", { className: "blog-date", text: date, parent: contentWrap });

    if (html) {
      const body = el("div", { parent: contentWrap });
      body.innerHTML = html;
    }

    setTitle(title);
  }

  function buildList() {
    const listWrap = el("section", { className: "list-container", parent: aside });
    el("h2", { className: "list-head", text: "Latest posts", parent: listWrap });

    const ul = el("ul", { className: "list", parent: listWrap });

    (posts || []).forEach((p) => {
      const li = el("li", { className: "item", parent: ul });
      const btn = el("button", {
        className: "nav-anchor",
        text: p.title || "Untitled",
        parent: li,
      });
      btn.type = "button";

      if (p.id === activePost?.id) li.classList.add("item-selected");

      btn.addEventListener("click", () => {
        const path = "/blog/" + (p.id || "");
        if (onNavigate) {
          onNavigate(path);
        } else {
          ul.querySelectorAll(".item").forEach(n => n.classList.remove("item-selected"));
          li.classList.add("item-selected");
          renderPost(p);
          window.scrollTo(0, 0);
        }
      });
    });
  }

  renderPost(activePost);
  buildList();
}
