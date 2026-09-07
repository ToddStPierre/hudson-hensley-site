if (matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); }
  }, { rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll(".section").forEach((s) => { s.classList.add("reveal"); io.observe(s); });
}
