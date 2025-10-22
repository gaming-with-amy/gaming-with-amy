import { el, $, setTitle } from "./utils.js";

export function Videos({ videos = [] } = {}) {
  const main = $(".main-body") || $("main");
  if (!main) return;

  main.innerHTML = "";

  const page = el("section", { className: "video-page", parent: main });
  el("h1", { className: "vid-page-head", text: "Videos", parent: page });

  const layout = el("div", { className: "videos-layout", parent: page });

  const playerWrap = el("div", { className: "video-container", parent: layout });
  const meta = el("div", { className: "video-meta", parent: layout });

  const listWrap = el("div", { className: "list-container", parent: layout });
  el("h2", { className: "list-head", text: "Latest uploads", parent: listWrap });
  const ul = el("ul", { className: "list", parent: listWrap });

  function renderPlayer(v) {
    playerWrap.innerHTML = "";
    const vidDiv = el("div", { className: "vid-div", parent: playerWrap });
    el("iframe", {
      attrs: {
        class: "video",
        src: `https://www.youtube.com/embed/${v.id}`,
        title: v.title || "YouTube video",
        frameborder: "0",
        allow:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        referrerpolicy: "strict-origin-when-cross-origin",
        allowfullscreen: "",
      },
      parent: vidDiv,
    });

    meta.innerHTML = "";
    el("h2", { text: v.title || "Untitled", parent: meta });
    if (v.description) el("p", { className: "video-desc", text: v.description, parent: meta });
  }

  videos.forEach((v, idx) => {
    const li = el("li", { className: "item", parent: ul });
    const btn = el("button", {
      className: "nav-anchor",
      text: v.title || "Untitled",
      parent: li,
    });
    btn.addEventListener("click", () => {
      renderPlayer(v);
      ul.querySelectorAll(".item").forEach((n) => n.classList.remove("item-selected"));
      li.classList.add("item-selected");
      setTitle("videos"); 
    });
    if (idx === 0) li.classList.add("item-selected");
  });

  if (videos[0]) renderPlayer(videos[0]);
  setTitle("videos");
}
