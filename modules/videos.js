import { el, $, setTitle } from "./utils.js";

export function Videos({ videos = [], slug = null, onNavigate } = {}) {
  const main = $(".main-body") || $("main");
  const rail = $(".junior-body");
  if (!main) return;

  main.innerHTML = "";
  if (rail) rail.innerHTML = "";

  let activeVideo;
  if (slug) {
    activeVideo = videos.find(v => v.slug === slug);
    if (!activeVideo) activeVideo = videos[0];
  } else {
    activeVideo = videos[0];
  }

  const page = el("section", { className: "video-page", parent: main });
  el("h1", { className: "vid-page-head", text: "Videos", parent: page });

  const playerWrap = el("div", { className: "video-container", parent: page });
  const meta = el("div", { className: "video-meta", parent: page });

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

    setTitle(v.title || "Videos");
  }

  if (activeVideo) renderPlayer(activeVideo);

  if (rail) {
    const listWrap = el("section", { className: "list-container", parent: rail });
    el("h2", { className: "list-head", text: "Latest uploads", parent: listWrap });
    const ul = el("ul", { className: "list", parent: listWrap });

    videos.forEach((v) => {
      const li = el("li", { className: "item", parent: ul });
      const btn = el("button", { className: "nav-anchor", text: v.title || "Untitled", parent: li });
      btn.type = "button";

      if (v.slug === activeVideo?.slug) li.classList.add("item-selected");

      btn.addEventListener("click", () => {
        const path = "/videos/" + (v.slug || "");
        if (onNavigate) {
          onNavigate(path);
        } else {
          ul.querySelectorAll(".item").forEach(n => n.classList.remove("item-selected"));
          li.classList.add("item-selected");
          renderPlayer(v);
          window.scrollTo(0, 0);
        }
      });
    });
  }
}
