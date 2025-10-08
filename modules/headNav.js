export function headNav(onHome) {
  const header = document.createElement("header");
  header.className = "head-nav";

  const brand = document.createElement("a");
  brand.className = "home-link";
  brand.href = "#";
  brand.textContent = "Gaming with Amy";
  brand.addEventListener("click", (e) => {
    e.preventDefault();
    if (onHome) onHome();
  });

  const nav = document.createElement("nav");
  nav.className = "link-nav";

  const list = document.createElement("ul");
  list.className = "nav-list";

  nav.appendChild(list);
  header.appendChild(brand);
  header.appendChild(nav);

  return { header, nav, list };
}
