const CONTACT = {
    whatsapp: "27632499823",
    email: "szothimba@gmail.com"
};

document.getElementById("hamburger").onclick = () => {
    document.getElementById("navMenu").classList.toggle("nav-open");
};

const ownerImage = document.getElementById("ownerImage");
if (ownerImage) {
    ownerImage.onclick = () => {
        document.getElementById("fullImage").src = ownerImage.src;
        document.getElementById("imageModal").style.display = "block";
    };
}

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}

document.getElementById("contactForm").onsubmit = e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const area = document.getElementById("practiceArea").value;
    const message = document.getElementById("message").value;
    const method = document.querySelector('input[name="contactMethod"]:checked').value;

    const text = `Name: ${name}\nPractice Area: ${area}\nMessage: ${message}`;

    if (method === "whatsapp") {
        window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`);
    } else if (method === "email") {
        window.location.href = `mailto:${CONTACT.email}?subject=Consultation Request&body=${encodeURIComponent(text)}`;
    }
};


const whatsappLink = document.getElementById("whatsappLink");
if (whatsappLink) whatsappLink.href = `https://wa.me/${CONTACT.whatsapp}`;

const emailLink = document.getElementById("emailLink");
if (emailLink) emailLink.href = `mailto:${CONTACT.email}`;

const toggle = document.createElement("span");
toggle.textContent = "🌙 Dark Mode";
toggle.className = "dark-toggle";

const header = document.querySelector(".header-content");
if (header) header.appendChild(toggle);

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent =
        document.body.classList.contains("dark")
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
});


const page = window.location.pathname.toLowerCase();


const practiceMap = {
    "criminal": "Criminal",
    "labour": "Labour",
    "road-accident-fund": "Road Accident Fund",
    "family-law": "Family & Divorce Law",
    "medical-negligence": "Medical Negligence",
    "corporate-law": "Corporate Law",
    "wills-estates": "Wills & Estates"
};

document.querySelectorAll(".card").forEach(card => {
    for (const key in practiceMap) {
        if (page.includes(key) || (page === "/index.html" && card.textContent.includes(practiceMap[key]))) {
            if (page.includes(key)) {
                card.classList.add("active");
            }
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
