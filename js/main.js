const fadeElements = document.querySelectorAll(".fade-in");

const showOnScroll = () => {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < window.innerHeight - 100) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", showOnScroll);

window.addEventListener("load", showOnScroll);
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");
const langData = {
  ro: { flag: "assets/flags/ro.png", code: "RO" },
  en: { flag: "assets/flags/us.png", code: "EN" },
  fr: { flag: "assets/flags/fr.png", code: "FR" },
  es: { flag: "assets/flags/es.png", code: "ES" },
  it: { flag: "assets/flags/it.png", code: "IT" },
  de: { flag: "assets/flags/de.png", code: "DE" },
  bg: { flag: "assets/flags/bg.png", code: "BG" },
  hu: { flag: "assets/flags/hu.png", code: "HU" },
};
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mbdbwjqw", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();

        if (successMsg) {
          successMsg.style.display = "block";

          setTimeout(() => {
            successMsg.style.display = "none";
          }, 3000);
        }
      } else {
        alert("A apărut o eroare. Încearcă din nou.");
      }
    } catch (error) {
      alert("Eroare de rețea. Încearcă din nou.");
    }
  });
}
const langDropdown = document.querySelector(".lang-dropdown");
const langBtn = document.getElementById("langBtn");

langBtn.addEventListener("click", () => {
  langDropdown.classList.toggle("active");
});

// închide când dai click în afara lui
document.addEventListener("click", (e) => {
  if (!langDropdown.contains(e.target)) {
    langDropdown.classList.remove("active");
  }
});
function setLanguage(lang) {
  const body = document.body;

  body.classList.add("lang-fade-out");

  setTimeout(() => {
    document.querySelectorAll("[data-key]").forEach((el) => {
      const key = el.dataset.key;

      const text = translations?.[lang]?.[key] || translations?.ro?.[key];

      if (text) el.textContent = text;
    });

    localStorage.setItem("lang", lang);

    // 🔥 UPDATE BUTTON TEXT
    const langBtn = document.getElementById("langBtn");
    const data = langData[lang];

    if (langBtn && data) {
      langBtn.innerHTML = `
    <span class="lang-content">
      <img src="${data.flag}" class="flag-small" />
      ${data.code} ▾
    </span>
  `;
    }

    body.classList.remove("lang-fade-out");
    body.classList.add("lang-fade-in");

    setTimeout(() => {
      body.classList.remove("lang-fade-in");
    }, 300);
  }, 150);
  const dropdown = document.querySelector(".lang-dropdown");
  if (dropdown) {
    dropdown.classList.remove("active");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ro";
  setLanguage(savedLang);
});
