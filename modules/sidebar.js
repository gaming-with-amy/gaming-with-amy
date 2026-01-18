export function Sidebar({
  parent = document.body,
  playlists,
  latestUrl = "#",
  bandcamp
} = {}) {
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
    { label: "Latest video", href: latestUrl, external: true },
    { label: "YouTube channel", href: "https://www.youtube.com/@GamingWithAmy89", external: true },
    { label: "Bandcamp", href: "https://gamingwithamy.bandcamp.com/", external: true },
    { label: "GitHub", href: "https://github.com/gaming-with-amy", external: true },
  ];

  items.forEach(({ label, href, external }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = label;
    a.href = href || "#";
    if (external) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    li.appendChild(a);
    ul.appendChild(li);
  });

  linksCard.appendChild(h2);
  linksCard.appendChild(ul);
  aside.appendChild(linksCard);

  if (bandcamp?.embedSrc || bandcamp?.trackId) {
    const src = bandcamp.embedSrc
      || `https://bandcamp.com/EmbeddedPlayer/track=${bandcamp.trackId}/size=small/bgcol=1b1026/linkcol=ffd86b/artwork=none/transparent=true/`;

    const player = document.createElement("section");
    player.className = "sidebar-card player";
    player.innerHTML = `
      <h2 class="sidebar-head">Now Playing</h2>
      <div class="bandcamp-embed">
        <iframe
          style="border:0; width:100%; height:42px;"
          src="${src}"
          seamless
          title="Bandcamp player">
        </iframe>
      </div>
    `;
    aside.appendChild(player);
  }

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

  // Important: if callers pass playlists: [] (common), we still want a real list,
  // so we use a fallback when playlists is empty or not an array.
  const defaultPlaylists = [
    { label: "All Videos", href: "https://www.youtube.com/playlist?list=PLMwAfy-5FONewO-g8Rz6sJJl1N0Nrp449" },
    { label: "Powerwash Sim Vids", href: "https://www.youtube.com/playlist?list=PLMwAfy-5FONeCgoFiN-T1KB5nDV9jDS10" },
    { label: "Coffee Talk Vids", href: "https://www.youtube.com/playlist?list=PLMwAfy-5FONduz0bb_yKr49nw7ZyDMwl1" },
    { label: "Unpacking Vids", href: "https://www.youtube.com/playlist?list=PLMwAfy-5FONdugpDtvQml-RX3JVvD3-NJ" }
  ];

  const finalPlaylists =
    Array.isArray(playlists) && playlists.length
      ? playlists
      : defaultPlaylists;

  finalPlaylists.forEach((p) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = p.label || "Playlist";
    a.href = p.href || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
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
