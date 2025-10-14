export function Footer(target = document.body) {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `Copyright <small>© ${new Date().getFullYear()} Gaming with Amy</small>`;
  target.appendChild(footer);
}