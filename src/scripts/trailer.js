document.querySelectorAll(".trailer").forEach((box) => {
  box.querySelector(".trailer__play")?.addEventListener("click", () => {
    const id = box.dataset.youtubeId;
    box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="Song Sung Blue trailer" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  });
});
