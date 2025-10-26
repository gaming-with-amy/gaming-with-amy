import { el, $ } from "./utils.js";

export function Home({ videos = [], target } = {}) {
  const main = target || $(".main-body") || $("main");

  main.innerHTML = ""; 

  const first = videos[0];
  const ytId = first?.id || "VIDEO_ID";
  const title = first?.title || "Latest video coming soon";
  const desc  = first?.description || "";

  el("h1", { text: "Gaming with Amy (Homepage)", parent: main });
  el("p", { text: "Cozy games, comfy vibes, occasional detours into music and books.", parent: main });

  const wrap = el("div", { className: "video-container", parent: main });
  el("iframe", {
    attrs: {
      class: "video",
      width: "560",
      height: "315",
      src: `https://www.youtube.com/embed/${ytId}`,
      title: "YouTube video player",
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      referrerpolicy: "strict-origin-when-cross-origin",
      allowfullscreen: ""
    },
    parent: wrap
  });

  const meta = el("div", { className: "video-meta", parent: main });
  el("h2", { text: title, parent: meta });
  if (desc) el("p", { text: desc, parent: meta });

  const cta = el("div", { className: "home-cta", parent: main });
  el("button", { text: "More Videos", parent: cta });
  el("button", { text: "More Music", parent: cta });
}



