import { el, $, setTitle } from "./utils.js";

window.__AMY_EMAIL = window.__AMY_EMAIL || "amysidwell481@gmail.com";

export function Contact() {
  const main = $(".main-body") || $("main");
  if (!main) return;

  const email = window.__AMY_EMAIL;
  main.innerHTML = "";

  const wrap = el("section", { className: "contact form-page", parent: main });

  el("h1", { className: "form-head", text: "Contact", parent: wrap });
  el("p", {
    className: "form-copy-p",
    text: "Business inquiries or suggestions? Drop a note below.",
    parent: wrap,
  });

  const panel = el("div", { className: "form-body", parent: wrap });

  const form = el("form", { className: "contact-form", parent: panel });

  const name = el("input", {
    className: "form-control",
    attrs: { type: "text", name: "name", placeholder: "Your name", required: "", autofocus: "" },
    parent: form,
  });

  const emailInput = el("input", {
    className: "form-control",
    attrs: { type: "email", name: "email", placeholder: "Your email", required: "" },
    parent: form,
  });

  const msg = el("textarea", {
    className: "form-control",
    attrs: { name: "message", rows: "6", placeholder: "Your message", required: "" },
    parent: form,
  });

  el("button", {
    className: "btn btn-primary btn-lg btn-block",
    text: "Send",
    attrs: { type: "submit" },
    parent: form,
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Website contact");
    const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${emailInput.value}\n\n${msg.value}`);
    setTimeout(() => {
      const btn = document.querySelector('.nav-btn[data-page="thanks"]');
      if (btn) btn.click();
    }, 250);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });

  setTitle("contact");
}