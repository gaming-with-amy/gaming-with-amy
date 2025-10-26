import { el, $, setTitle } from "./utils.js";

export function Blog({ posts = [] } = {}) {
  const main = $(".main-body") || $("main");
  const aside = $(".junior-body");
  if (!main || !aside) return;

  main.innerHTML = "";
  aside.innerHTML = "";

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
  }

  function buildList() {
    const listWrap = el("section", { className: "list-container", parent: aside });
    el("h2", { className: "list-head", text: "Latest posts", parent: listWrap });

    const ul = el("ul", { className: "list", parent: listWrap });

    (posts || []).forEach((p, i) => {
      const li = el("li", { className: "item", parent: ul });
      const btn = el("button", {
        className: "nav-anchor",
        text: p.title || "Untitled",
        parent: li,
      });
      btn.type = "button";

      btn.addEventListener("click", () => {
        ul.querySelectorAll(".item").forEach(n => n.classList.remove("item-selected"));
        li.classList.add("item-selected");
        renderPost(p);
        setTitle("blog");
      });

      if (i === 0) li.classList.add("item-selected");
    });
  }

  renderPost(posts[0]);
  buildList();
  setTitle("blog");
}
