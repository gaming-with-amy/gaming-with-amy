import { el, $, setTitle } from "./utils.js";

export function ContactResponse() {
  const main = $("main");
  main.innerHTML = "";

  const email = window.__AMY_EMAIL || "amysidwell481@gmail.com";
  const isNarrow = window.matchMedia("(max-width: 900px)").matches;

  const wrap = el("section", { className: "contact-response", parent: main });
  if (isNarrow) el("div", { className: "res-line", parent: wrap });

  el("h1", { text: "Thanks! Your message is on its way.", parent: wrap });
  el("p", {
    html: `If you don’t hear back soon, you can email me directly at <a href="mailto:${email}">${email}</a>.`,
    parent: wrap,
  });

  const actions = el("div", { className: "contact-actions", parent: wrap });
  const back = el("button", { text: "Back Home", attrs: { type: "button" }, parent: actions });
  back.addEventListener("click", () => {
    const homeBtn = document.querySelector('.nav-btn[data-page="home"]');
    if (homeBtn) homeBtn.click();
  });

  if (isNarrow) el("div", { className: "res-line", parent: wrap });

  setTitle("thanks");
}
