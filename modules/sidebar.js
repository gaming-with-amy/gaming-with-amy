export function Sidebar({ parent = document.body, playlists = [], latestUrl = "#" } = {}) {
  const aside = document.createElement("aside");
  aside.className = "site-sidebar";

  const links = document.createElement("section");
  const h2 = document.createElement("h2");
  h2.textContent = "Quick Links";
  const ul = document.createElement("ul");
  ul.className = "sidebar-links";

  const items = [
    { label: "Latest video", href: latestUrl, external: true },
    { label: "YouTube channel", href: "https://www.youtube.com/@GamingWithAmy89", external: true },
  ];

  items.forEach(({ label, href, external }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = label;
    a.href = href;
    if (external) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    li.appendChild(a);
    ul.appendChild(li);
  });

  links.appendChild(h2);
  links.appendChild(ul);
  aside.appendChild(links);

  const wrap = document.createElement("section");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sidebar-toggle";
  btn.textContent = "Playlists";

  const list = document.createElement("ul");
  list.className = "sidebar-playlists hidden";

  (playlists.length ? playlists : [{ label: "My Favorite Cozy Games", href: latestUrl }]).forEach(p => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = p.label || "Playlist";
    a.href = p.href || "#";
    a.target = "_blank";
    a.rel = "noopener";
    li.appendChild(a);
    list.appendChild(li);
  });

  btn.addEventListener("click", () => {
    list.classList.toggle("hidden");
  });

  wrap.appendChild(btn);
  wrap.appendChild(list);
  aside.appendChild(wrap);

  (parent || document.body).appendChild(aside);
  return aside;
}
