const dialog = document.querySelector("dialog.lightbox");
const img = dialog?.querySelector("img");
let opener = null;

document.querySelectorAll(".card__media").forEach((btn) => {
  btn.addEventListener("click", () => {
    opener = btn;
    img.src = btn.dataset.full;
    img.alt = btn.dataset.alt || "";
    dialog.showModal();
  });
});

dialog?.querySelector(".lightbox__close")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
dialog?.addEventListener("close", () => {
  img.src = "";
  img.alt = "";
  opener?.focus();
});
