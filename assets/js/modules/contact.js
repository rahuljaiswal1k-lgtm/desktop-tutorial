/* =============================================================
   contact.js — client-side form validation + friendly feedback.
   No backend: opens a pre-filled mailto so it works on GitHub Pages.
   Swap in a real endpoint (Formspree, Getform, etc.) where noted.
   ============================================================= */
import { $, esc } from "./util.js";

export function initContactForm(profile = {}) {
  const form = $("#contact-form");
  if (!form) return;
  const status = $(".form__status", form);

  const setError = (name, msg) => {
    const field = form.querySelector(`[data-field="${name}"]`);
    if (!field) return;
    field.classList.toggle("error", !!msg);
    const m = field.querySelector(".field__msg");
    if (m) m.textContent = msg || "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    let ok = true;

    if (!data.name?.trim()) { setError("name", "Please enter your name."); ok = false; }
    else setError("name", "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "")) { setError("email", "Enter a valid email."); ok = false; }
    else setError("email", "");

    if (!data.message?.trim() || data.message.trim().length < 10) { setError("message", "Message is a little short."); ok = false; }
    else setError("message", "");

    if (!ok) { if (status) { status.textContent = "Please fix the fields above."; status.classList.remove("ok"); } return; }

    /* --- Delivery via mailto (no server needed). ---
       To use a real backend instead, POST `data` to your endpoint here. */
    const to = profile.email || "hello@example.com";
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    if (status) { status.textContent = "Opening your email app…"; status.classList.add("ok"); }
    form.reset();
  });
}
