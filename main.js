// Set this once the app is live; the "Coming soon" buttons become real App Store links.
const APP_STORE_URL = "";

document.documentElement.classList.add("js");
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (APP_STORE_URL) {
  for (const a of document.querySelectorAll("[data-store]")) {
    a.href = APP_STORE_URL;
    a.target = "_blank";
    a.rel = "noopener";
    const small = a.querySelector(".store-small");
    if (small) small.textContent = "Download on the";
    else a.textContent = "Download";
  }
}

// Mobile menu
const menu = document.querySelector(".menu");
const links = document.getElementById("nav-links");
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", open);
  links.classList.toggle("open", open);
});
links.addEventListener("click", (e) => {
  if (e.target.closest("a")) { menu.setAttribute("aria-expanded", "false"); links.classList.remove("open"); }
});

// Stagger reveals inside each section
for (const section of document.querySelectorAll("section, .cards, .faq-list, .private-list")) {
  section.querySelectorAll(":scope > .reveal, :scope .reveal").forEach((el, i) => el.style.setProperty("--d", `${Math.min(i, 6) * 0.08}s`));
}

const seen = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add(e.target.matches("[data-play]") ? "play" : "in");
    if (e.target.matches(".ask")) typeQuestion(e.target);
    seen.unobserve(e.target);
  }
}, { threshold: 0.35, rootMargin: "0px 0px -5% 0px" });
document.querySelectorAll(".reveal, [data-play]").forEach((el) => seen.observe(el));

// Find: type the question, then show the answer, like the app does as you type.
function typeQuestion(box) {
  const out = box.querySelector(".ask-text");
  const text = out.textContent;
  if (still) { box.classList.add("answered"); return; }
  out.textContent = "";
  let i = 0;
  const tick = () => {
    out.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, 45 + Math.random() * 60);
    else setTimeout(() => box.classList.add("answered"), 350);
  };
  setTimeout(tick, 400);
}

// Hero: the devices lean toward the pointer (mouse and trackpad only).
const art = document.querySelector("[data-tilt]");
if (art && !still && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  addEventListener("pointermove", (e) => {
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    art.style.setProperty("--ry", `${-8 + x * 14}deg`);
    art.style.setProperty("--rx", `${4 - y * 10}deg`);
  }, { passive: true });
}
