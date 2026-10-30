window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");

    setTimeout(function () {
        preloader.classList.add("hide");
    }, 1800);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("click", function (e) {

    const link = e.target.closest('.nav-menu a[href^="#"]');

    if (!link) return;

    e.preventDefault();

    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight -
        20;

    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;

    const duration = 1000;

    let startTime = null;

    function animation(currentTime) {

        if (startTime === null) {
            startTime = currentTime;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // efek mulai pelan → cepat → pelan
        const ease =
            progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        window.scrollTo(
            0,
            startPosition + distance * ease
        );

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);

});

const header = document.querySelector("header");
window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

const typingText = document.getElementById("typing-text");
const text = "Teknik Informatika";

let index = 0;
let deleting = false;

function typeLoop() {

    if (!deleting) {
        
        typingText.textContent = text.substring(0, index);
        index++;
        // Kalau sudah selesai mengetik
        if (index > text.length) {
            deleting = true;
            setTimeout(typeLoop, 1000);
            return;
        }
        setTimeout(typeLoop, 200);

    } else {
        // Menghapus
        typingText.textContent = text.substring(0, index);
        index--;

        // Kalau sudah habis
        if (index < 0) {
            index = 0;
            deleting = false;
            setTimeout(typeLoop, 500);
            return;
        }

        setTimeout(typeLoop, 60);
    }
}

typeLoop();

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.5
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});