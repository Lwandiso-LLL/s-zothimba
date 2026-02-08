const CONTACT = {
    whatsapp: "27632499823",
    email: "admin@szothimbainc.co.za"
};

// -------------------------
// Mobile-first Hamburger Menu
// -------------------------
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

// Toggle menu open/close
function toggleMenu() {
    navMenu.classList.toggle("nav-open");

    // Update icon only for mobile
    if (window.innerWidth <= 768) {
        hamburger.textContent = navMenu.classList.contains("nav-open") ? "✕" : "☰";
    }
}

// Close menu (used for links or resizing)
function closeMenu() {
    navMenu.classList.remove("nav-open");
    if (window.innerWidth <= 768) {
        hamburger.textContent = "☰";
    }
}

// Click hamburger toggles menu
hamburger.addEventListener("click", toggleMenu);

// Click any nav link closes mobile menu
document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) closeMenu();
    });
});

// Reset menu when resizing to desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMenu(); // ensures nav isn't stuck in mobile state
    }
});




// -------------------------
// Owner image modal
// -------------------------
const modal = document.getElementById("imageModal");
const fullImage = document.getElementById("fullImage");
const ownerImage = document.getElementById("ownerImage");

function closeImage() {
    if (modal) modal.style.display = "none";
}

if (ownerImage && fullImage && modal) {
    ownerImage.onclick = () => {
        fullImage.src = ownerImage.src;
        modal.style.display = "flex"; // centers the image
    };

    // Close modal if clicking outside the image
    modal.onclick = e => {
        if (e.target === modal) closeImage();
    };
}

// -------------------------
// Dark mode toggle
// -------------------------
const toggle = document.createElement("span");
toggle.textContent = "🌙 Dark Mode";
toggle.className = "dark-toggle";

const header = document.querySelector(".header-content");
if (header) header.appendChild(toggle);

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// -------------------------
// Quick WhatsApp & Email links
// -------------------------
const whatsappLink = document.getElementById("whatsappLink");
if (whatsappLink) whatsappLink.href = `https://wa.me/${CONTACT.whatsapp}`;

const emailLink = document.getElementById("emailLink");
if (emailLink) emailLink.href = `mailto:${CONTACT.email}`;

// -------------------------
// Highlight active practice cards & sidebar links
// -------------------------
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

// Highlight cards
document.querySelectorAll(".card").forEach(card => {
    for (const key in practiceMap) {
        if (page.includes(key) || (page === "/index.html" && card.textContent.includes(practiceMap[key]))) {
            if (page.includes(key)) card.classList.add("active");
        }
    }
});

// Highlight sidebar buttons
document.querySelectorAll(".sidebar-card a.btn-primary").forEach(btn => {
    const href = btn.getAttribute("href");
    if (href && page.includes(href.split("/").pop().replace(".html", ""))) {
        btn.classList.add("active"); 
    }
});

// Set default practice selection in contact form
const practiceSelect = document.getElementById("practiceArea");
if (practiceSelect) {
    for (const key in practiceMap) {
        if (page.includes(key)) {
            practiceSelect.value = practiceMap[key];
        }
    }
}

// -------------------------
// WhatsApp number logic for contact form
// -------------------------
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

// Event listeners
hasWhatsAppRadios.forEach(radio => radio.addEventListener("change", toggleWhatsAppFields));
if (sameAsPhoneCheckbox) sameAsPhoneCheckbox.addEventListener("change", toggleWhatsAppFields);

// Initialize on page load
toggleWhatsAppFields();

// -------------------------
// Contact form submission with validation
// -------------------------
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

        // Validate phone (South African format)
        const phonePattern = /^\+27\d{9}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid South African phone number (e.g. +27612345678)");
            return;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Determine WhatsApp number
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

// -------------------------
// Reset nav when resizing to desktop
// -------------------------
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove("nav-open");
        hamburger.textContent = "☰";
    }
});

