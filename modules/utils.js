export function el(tag, opts = {}) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
  if (opts.text) node.textContent = opts.text;
  if (opts.html) node.innerHTML = opts.html;
  if (opts.parent) opts.parent.appendChild(node);
  return node;
}

export const $ = (sel, root = document) => root.querySelector(sel);

export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : "");

export function setTitle(page) {
  document.title = `${page === "home" ? "Home" : cap(page)} | Gaming with Amy`;
}
