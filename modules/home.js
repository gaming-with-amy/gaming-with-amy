export function Home() {
  const root = document.querySelector(".junior-body") || document.body;
  root.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.textContent = "Welcome to Gaming with Amy";
  root.appendChild(h1);

  const intro = document.createElement("p");
  intro.textContent = "Cozy games, comfy vibes, occasional detours into music and books.";
  root.appendChild(intro);

  const videoWrap = document.createElement("div");
  videoWrap.className = "video-container";
  videoWrap.innerHTML = `
    <iframe
      class="video"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/VIDEO_ID"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  `;
  root.appendChild(videoWrap);

  const ctas = document.createElement("div");
  ctas.className = "home-cta";
  const vidsBtn = document.createElement("button");
  vidsBtn.textContent = "More Videos";
  const musicBtn = document.createElement("button");
  musicBtn.textContent = "More Music";
  ctas.append(vidsBtn, musicBtn);
  root.appendChild(ctas);

  vidsBtn.addEventListener("click", () => {
    location.hash = "#/videos";
  });

  musicBtn.addEventListener("click", () => {
    location.hash = "#/music";
  });
}
