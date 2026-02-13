const CONTACT = {
    whatsapp: "27632499823",
    email: "admin@szothimbainc.co.za"
};

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

function toggleMenu() {
    navMenu.classList.toggle("nav-open");

    if (window.innerWidth <= 768) {
        hamburger.textContent = navMenu.classList.contains("nav-open") ? "✕" : "☰";
    }
}

function closeMenu() {
    navMenu.classList.remove("nav-open");
    if (window.innerWidth <= 768) {
        hamburger.textContent = "☰";
    }
}

hamburger.addEventListener("click", toggleMenu);

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) closeMenu();
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});


const modal = document.getElementById("imageModal");
const fullImage = document.getElementById("fullImage");
const ownerImage = document.getElementById("ownerImage");

function closeImage() {
    if (modal) modal.style.display = "none";
}

if (ownerImage && fullImage && modal) {
    ownerImage.onclick = () => {
        fullImage.src = ownerImage.src;
        modal.style.display = "flex";
    };

    modal.onclick = e => {
        if (e.target === modal) closeImage();
    };
}

const toggle = document.createElement("span");
toggle.textContent = "🌙 Dark Mode";
toggle.className = "dark-toggle";

const header = document.querySelector(".header-content");
if (header) header.appendChild(toggle);

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

const whatsappLink = document.getElementById("whatsappLink");
if (whatsappLink) whatsappLink.href = `https://wa.me/${CONTACT.whatsapp}`;

const emailLink = document.getElementById("emailLink");
if (emailLink) emailLink.href = `mailto:${CONTACT.email}`;

const page = window.location.pathname.toLowerCase();
const practiceMap = {
    "criminal": "Criminal Law",
    "labour": "Labour Law",
    "road-accident-fund": "Road Accident Fund",
    "family-law": "Family & Divorce Law",
    "medical-negligence": "Medical Negligence",
    "corporate-law": "Corporate Law",
    "wills-estates": "Wills & Estates",
    "divorce": "Divorce",
    "property-law": "Property Law",
    "customary-law": "Customary Law"
};

document.querySelectorAll(".card").forEach(card => {
    for (const key in practiceMap) {
        if (page.includes(key) || (page === "/index.html" && card.textContent.includes(practiceMap[key]))) {
            if (page.includes(key)) card.classList.add("active");
        }
    }
});

document.querySelectorAll(".sidebar-card a.btn-primary").forEach(btn => {
    const href = btn.getAttribute("href");
    if (href && page.includes(href.split("/").pop().replace(".html", ""))) {
        btn.classList.add("active"); 
    }
});

const practiceSelect = document.getElementById("practiceArea");
if (practiceSelect) {
    for (const key in practiceMap) {
        if (page.includes(key)) {
            practiceSelect.value = practiceMap[key];
        }
    }
}

const hasWhatsAppRadios = document.querySelectorAll('input[name="hasWhatsApp"]');
const sameAsPhoneCheckbox = document.getElementById("sameAsPhone");
const whatsappNumberInput = document.getElementById("whatsappNumber");
const phoneInput = document.getElementById("phone");

function toggleWhatsAppFields() {
    const hasWhatsApp = document.querySelector('input[name="hasWhatsApp"]:checked')?.value;
    if (hasWhatsApp === "yes") {
        document.getElementById("whatsappWrapper").style.display = "block";
        whatsappNumberInput.style.display = sameAsPhoneCheckbox.checked ? "none" : "block";
    } else {
        document.getElementById("whatsappWrapper").style.display = "none";
    }
}

hasWhatsAppRadios.forEach(radio => radio.addEventListener("change", toggleWhatsAppFields));
if (sameAsPhoneCheckbox) sameAsPhoneCheckbox.addEventListener("change", toggleWhatsAppFields);

toggleWhatsAppFields();

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.onsubmit = e => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const area = document.getElementById("practiceArea").value;
        const message = document.getElementById("message").value.trim();
        const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
        const hasWhatsApp = document.querySelector('input[name="hasWhatsApp"]:checked')?.value;

        const phonePattern = /^\+27\d{9}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid South African phone number (e.g. +27612345678)");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        let whatsappNumber = phone;
        if (hasWhatsApp === "yes" && sameAsPhoneCheckbox && !sameAsPhoneCheckbox.checked) {
            whatsappNumber = whatsappNumberInput.value.trim();
            if (!phonePattern.test(whatsappNumber)) {
                alert("Please enter a valid WhatsApp number in South African format (e.g. +27612345678).");
                return;
            }
        }

        const text = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nPractice Area: ${area}\nMessage: ${message}\nWhatsApp Number: ${whatsappNumber}`;

        if (contactMethod === "whatsapp") {
            window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`);
        } else if (contactMethod === "email") {
            window.location.href = `mailto:${CONTACT.email}?subject=Consultation Request&body=${encodeURIComponent(text)}`;
        }
    };
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove("nav-open");
        hamburger.textContent = "☰";
    }
});

