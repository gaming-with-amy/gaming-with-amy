import { el, $, setTitle } from "./utils.js";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzzkozql";

export function Contact() {
  const main = $(".main-body") || $("main");
  if (!main) return;

  main.innerHTML = "";

  const wrap = el("section", { className: "contact form-page", parent: main });

  el("h1", { className: "form-head", text: "Contact", parent: wrap });
  el("p", {
    className: "form-copy-p",
    text: "Business inquiries or suggestions? Drop a note below.",
    parent: wrap,
  });

  const panel = el("div", { className: "form-body", parent: wrap });

  const form = el("form", {
    className: "contact-form",
    attrs: {
      action: FORMSPREE_ENDPOINT,
      method: "POST",
    },
    parent: panel,
  });

  el("input", {
    className: "form-control",
    attrs: {
      type: "text",
      name: "name",
      placeholder: "Your name",
      required: "",
    },
    parent: form,
  });

  el("input", {
    className: "form-control",
    attrs: {
      type: "email",
      name: "email",
      placeholder: "Your email",
      required: "",
    },
    parent: form,
  });

  el("textarea", {
    className: "form-control",
    attrs: {
      name: "message",
      rows: "6",
      placeholder: "Your message",
      required: "",
    },
    parent: form,
  });

  el("button", {
    className: "btn btn-primary btn-lg btn-block",
    text: "Send",
    attrs: { type: "submit" },
    parent: form,
  });

  setTitle("contact");
}
