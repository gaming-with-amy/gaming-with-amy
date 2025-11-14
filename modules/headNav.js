import { el } from "./utils.js";

export function headNav(onHome) {
  const header = el("header", { className: "head-nav" });

  const brand = el("a", {
    className: "home-link brand",
    attrs: { href: "#", "data-page": "home", "aria-label": "Home" },
    parent: header
  });
  el("span", { className: "brand-avatar", parent: brand });
  el("span", { className: "brand-title", text: "Gaming with Amy", parent: brand });

  brand.addEventListener("click", (e) => {
    e.preventDefault();
    onHome?.();
  });

  const linkNav = el("nav", { className: "link-nav", parent: header });
  const list = el("ul", { className: "nav-list", parent: linkNav });

  return { header, list };
}
