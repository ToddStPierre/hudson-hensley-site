const form = document.querySelector(".contact__form");
const status = form?.querySelector(".contact__status");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector("button[type=submit]");
  const data = Object.fromEntries(new FormData(form).entries());
  btn.disabled = true;
  status.hidden = false;
  status.dataset.state = "";
  status.textContent = "Sending…";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) {
      form.reset();
      status.dataset.state = "ok";
      status.textContent = "Thank you — your message has been sent.";
    } else {
      throw new Error(json.message || "failed");
    }
  } catch {
    status.dataset.state = "err";
    status.textContent = "Something went wrong. Please try again, or call one of the numbers above.";
  } finally {
    btn.disabled = false;
  }
});
