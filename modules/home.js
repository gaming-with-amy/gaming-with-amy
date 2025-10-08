export function Home(root) {
  const main = root || document.querySelector("main");
  if (!main) return;

  main.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.textContent = "Welcome to Gaming with Amy";

  const p = document.createElement("p");
  p.textContent = "Cozy games, comfy vibes, occasional detours into music and books.";

  const vidWrap = document.createElement("div");
  vidWrap.className = "video-container";
  vidWrap.innerHTML = `
    <iframe class="video" width="560" height="315"
      src="https://www.youtube.com/embed/VIDEO_ID"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `;

  const cta = document.createElement("div");
  cta.className = "home-cta";
  cta.innerHTML = `<button>More Videos</button><button>More Music</button>`;

  main.append(h1, p, vidWrap, cta);
}
