async function loadComponent(id, file, callback) {
  const element = document.getElementById(id);
  if (!element) return;
  const response = await fetch(file);
  const html = await response.text();
  element.innerHTML = html;
  if (callback) callback();
}

loadComponent("header", "./components/header.html", initHeader);
loadComponent("footer", "./components/footer.html");

function initHeader() {
  // Theme toggle
  const toggle = document.getElementById("themeToggle");
if (toggle) {
  const moonIcon = '<i class="fa-regular fa-moon"></i>';
  const sunIcon  = '<i class="fa-regular fa-sun"></i>';

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.innerHTML = sunIcon;
  } else {
    toggle.innerHTML = moonIcon;
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggle.innerHTML = isDark ? sunIcon : moonIcon;
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

  // Hamburger toggle
  const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("mobileNav");   // ← changed
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", false);
      });
    });
  }
}