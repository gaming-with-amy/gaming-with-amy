(function () {
  function el(tag, opts = {}) {
    const node = document.createElement(tag);
    if (opts.className) node.className = opts.className;
    if (opts.attrs) {
      for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
    }
    if (opts.text) node.textContent = opts.text;
    if (opts.html) node.innerHTML = opts.html;
    if (opts.parent) opts.parent.appendChild(node);
    return node;
  }

  const pages = {
    home() {
      return `
        <h1>Gaming with Amy</h1>
        <p>Cozy games, horror-adjacent curiosities, and the occasional tangent.</p>
        <p>New videos & shorts coming soon.</p>
      `;
    },
    videos() {
      return `
        <h1>Videos</h1>
        <p>Roundups, reviews, and recommendations. (Listing TBD.)</p>
      `;
    },
    about() {
      return `
        <h1>About</h1>
        <p>Hi! I’m Amy. I like narrative games, gentle sims, weird web art, and snacks.</p>
        <p>This site is a work-in-progress.</p>
      `;
    },
    contact() {
      return `
        <h1>Contact</h1>
        <p>Business inquiries: <a href="mailto:emailplaceholder">email placeholder</a></p>
      `;
    },
    _notFound() {
      return `<h1>Not Found</h1><p>That page isn’t ready yet.</p>`;
    },
  };

  function render(key) {
    const main = document.querySelector("main");
    const view = pages[key] || pages._notFound;
    main.innerHTML = view();
    document.querySelectorAll("nav button").forEach(btn => {
      btn.classList.toggle("selected", btn.dataset.page === key);
    });
    document.title = (key === "home" ? "Home" : capitalize(key)) + " | Gaming with Amy";
  }

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    const header = el("header", { className: "site-header", parent: body });
    const brand = el("a", {
      className: "brand",
      text: "Gaming with Amy",
      attrs: { href: "#" },
      parent: header,
    });
    brand.addEventListener("click", (e) => { e.preventDefault(); render("home"); });

    const nav = el("nav", { className: "site-nav", parent: header });
    [
      ["home", "Home"],
      ["videos", "Videos"],
      ["about", "About"],
      ["contact", "Contact"],
    ].forEach(([key, label]) => {
      const btn = el("button", {
        className: "nav-btn",
        text: label,
        attrs: { "data-page": key, type: "button" },
        parent: nav,
      });
      btn.addEventListener("click", () => render(key));
    });

    el("main", { className: "site-main", parent: body });
    const footer = el("footer", { className: "site-footer", parent: body });
    footer.innerHTML = `<small>© ${new Date().getFullYear()} Gaming with Amy</small>`;

    render("home");
  });
})();
