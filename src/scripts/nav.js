const header = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("nav-menu");

toggle?.addEventListener("click", () => {
  const open = header.dataset.open === "true";
  header.dataset.open = String(!open);
  toggle.setAttribute("aria-expanded", String(!open));
});
menu?.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && matchMedia("(max-width:720px)").matches) {
    header.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && header.dataset.open === "true") {
    header.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }
});
const links = [...menu.querySelectorAll("a")];
const io = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (!en.isIntersecting) continue;
    links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${en.target.id}`));
  }
}, { rootMargin: "-45% 0px -50% 0px" });
["home", "film-tv", "press", "about"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
