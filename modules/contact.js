import { el, $, setTitle } from "./utils.js";

window.__AMY_EMAIL = window.__AMY_EMAIL || "amysidwell481@gmail.com";

export function Contact() {
  const main = $("main");
  const email = window.__AMY_EMAIL;

  main.innerHTML = "";

  const wrap = el("section", { className: "contact", parent: main });
  el("h1", { text: "Contact", parent: wrap });
  el("p", {
    text: "Business inquiries or suggestions? Drop a note below or email me.",
    parent: wrap,
  });

  const form = el("form", { className: "contact-form", parent: wrap });

  const name = el("input", {
    attrs: { type: "text", name: "name", placeholder: "Your name", required: "", autofocus: "" },
    parent: form,
  });

  const emailInput = el("input", {
    attrs: { type: "email", name: "email", placeholder: "Your email", required: "" },
    parent: form,
  });

  const msg = el("textarea", {
    attrs: { name: "message", rows: "6", placeholder: "Your message", required: "" },
    parent: form,
  });

  const submit = el("button", {
    text: "Send",
    attrs: { type: "submit" },
    parent: form,
  });

  const alt = el("p", { parent: wrap });
  el("a", {
    text: "Or email me directly",
    attrs: { href: "mailto:" + email },
    parent: alt,
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Website contact");
    const body = encodeURIComponent(
      `Name: ${name.value}\nEmail: ${emailInput.value}\n\n${msg.value}`
    );
    setTimeout(() => {
      const btn = document.querySelector('.nav-btn[data-page="thanks"]');
      if (btn) btn.click();
    }, 250);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });

  setTitle("contact");
}
