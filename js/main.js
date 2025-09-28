// ========================
// Tab Switching for Schedule Page
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons & panels
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      // Add active class to clicked button and matching panel
      btn.classList.add("active");
      document.getElementById(btn.dataset.day).classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  const overlay = document.getElementById("nav-overlay");
  const iconSpan = menuToggle?.querySelector(".material-icons");

  if (!menuToggle || !navbar || !overlay) {
    console.warn(
      "Mobile nav: required elements not found (menu-toggle, navbar, or nav-overlay)."
    );
    return;
  }

  const openMenu = () => {
    navbar.classList.add("active");
    overlay.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    navbar.setAttribute("aria-hidden", "false");
    iconSpan && (iconSpan.textContent = "close");
    document.body.style.overflow = "hidden"; // prevent body scroll when menu open
  };

  const closeMenu = () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    navbar.setAttribute("aria-hidden", "true");
    iconSpan && (iconSpan.textContent = "menu");
    document.body.style.overflow = "";
  };

  menuToggle.addEventListener("click", () => {
    if (navbar.classList.contains("active")) closeMenu();
    else openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  // close when any nav link clicked (useful on mobile)
  document
    .querySelectorAll("#navbar a")
    .forEach((a) => a.addEventListener("click", closeMenu));

  // close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});

// ========================
// Gallery Lightbox
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close-btn");

  // Open lightbox on image click
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = item.src;
    });
  });

  // Close lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  // Close lightbox if background clicked
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
});

// ========================
// Contact Form Validation
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const formMessage = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();

      // Simple validation checks
      if (!name || !email || !phone) {
        formMessage.textContent = "⚠️ Please fill in all required fields.";
        formMessage.style.color = "red";
        return;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email)) {
        formMessage.textContent = "⚠️ Please enter a valid email address.";
        formMessage.style.color = "red";
        return;
      }

      const phonePattern = /^\+?\d{10,13}$/;
      if (!phonePattern.test(phone)) {
        formMessage.textContent = "⚠️ Please enter a valid phone number.";
        formMessage.style.color = "red";
        return;
      }

      // Success
      formMessage.textContent =
        "✅ Thank you! Your registration has been received.";
      formMessage.style.color = "green";

      // Reset form
      form.reset();
    });
  }
});
