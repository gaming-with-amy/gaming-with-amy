import { el, $ } from "./utils.js";

function ytIdFrom(input) {
  if (!input) return "";
  if (/^[\w-]{11}$/.test(input)) return input;
  try {
    const u = new URL(input);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v") || "";
  } catch (_) {}
  return "";
}

function buildPlayer(id, title) {
  const wrap = el("div", { className: "video-container" });
  el("iframe", {
    className: "video",
    attrs: {
      width: "560",
      height: "315",
      src: `https://www.youtube.com/embed/${id}`,
      title: title || "YouTube video player",
      frameborder: "0",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      referrerpolicy: "strict-origin-when-cross-origin",
      allowfullscreen: "",
    },
    parent: wrap,
  });
  return wrap;
}

export function Videos({ videos = [] } = {}) {
  const main = $("main");
  main.innerHTML = "";

  el("h1", { text: "Videos", parent: main });

  if (!videos.length) {
    el("p", { text: "No videos yet—check back soon.", parent: main });
    document.title = "Videos | Gaming with Amy";
    return;
  }

  const first = videos[0];
  let playerEl = buildPlayer(ytIdFrom(first.id || first.url), first.title);
  main.appendChild(playerEl);

  const list = el("ul", { className: "video-list", parent: main });

  videos.forEach((v, i) => {
    const li = el("li", {
      className: "video-item" + (i === 0 ? " item-selected" : ""),
      parent: list,
    });

    const btn = el("button", {
      className: "video-link",
      text: v.title || "Untitled",
      attrs: { type: "button" },
      parent: li,
    });

    if (v.description) {
      el("p", { className: "video-desc", text: v.description, parent: li });
    }

    btn.addEventListener("click", () => {
      const id = ytIdFrom(v.id || v.url);
      const next = buildPlayer(id, v.title);
      playerEl.replaceWith(next);
      playerEl = next;

      Array.from(list.children).forEach((n) => n.classList.remove("item-selected"));
      li.classList.add("item-selected");

      document.title = `${v.title || "Video"} | Gaming with Amy`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.title = `${first.title || "Videos"} | Gaming with Amy`;
}
