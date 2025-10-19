import { el, $, setTitle } from "./utils.js";

export function Videos({ videos = [] } = {}) {
  const main = $(".main-body") || $("main");
  main.innerHTML = "";
  
  el("h1", { text: "Videos", parent: main });

   if (!videos.length) {
     el("p", { text: "No videos yet—check back soon.", parent: main });
     setTitle("videos");
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
       setTitle(v.title || "videos");
       window.scrollTo({ top: 0, behavior: "smooth" });
     });
   });
   
   setTitle(first.title || "videos");
 }
