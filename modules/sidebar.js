export function Sidebar({ parent = document.body, playlists = [], latestUrl = "#" } = {}) {
  const host = parent || document.body;

  let aside;
  if (host.tagName?.toLowerCase() === "aside" && host.classList.contains("left-rail")) {
    aside = host;
  } else {
    aside = document.createElement("aside");
    aside.className = "left-rail sidebar";
    host.appendChild(aside);
  }

  aside.innerHTML = "";

  const linksCard = document.createElement("section");
  linksCard.className = "sidebar-card latest";

  const h2 = document.createElement("h2");
  h2.className = "sidebar-head";
  h2.textContent = "Quick Links";

  const ul = document.createElement("ul");
  ul.className = "sidebar-links";

  const items = [
    { label: "Latest Vid", href: latestUrl, external: true },
    { label: "YouTube", href: "https://www.youtube.com/@GamingWithAmy89", external: true },
    { label: "GitHub", href: "https://github.com/gaming-with-amy", external: true },
  ];

  items.forEach(({ label, href, external }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = label;
    a.href = href || "#";
    if (external) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    li.appendChild(a);
    ul.appendChild(li);
  });

  linksCard.appendChild(h2);
  linksCard.appendChild(ul);
  aside.appendChild(linksCard);

  const listsCard = document.createElement("section");
  listsCard.className = "sidebar-card playlists";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "sidebar-toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.textContent = "Playlists";

  const list = document.createElement("ul");
  list.className = "playlist-list";
  list.hidden = true;

  const finalPlaylists = playlists.length
    ? playlists
    : [{ label: "My Favorite Cozy Games", href: latestUrl }];

  finalPlaylists.forEach((p) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = p.label || "Playlist";
    a.href = p.href || "#";
    a.target = "_blank";
    a.rel = "noopener";
    li.appendChild(a);
    list.appendChild(li);
  });

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    list.hidden = isOpen;
  });

  listsCard.appendChild(toggle);
  listsCard.appendChild(list);
  aside.appendChild(listsCard);

  return aside;
}
