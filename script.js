const words = [
    "Web Developer",
    "Student",
    "Creative Designer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const typing = document.getElementById("typing");

    const currentWord = words[wordIndex];

    if (deleting) {
        typing.textContent = currentWord.substring(0, charIndex--);
    } else {
        typing.textContent = currentWord.substring(0, charIndex++);
    }

    let speed = deleting ? 60 : 120;

    if (!deleting && charIndex > currentWord.length) {
        deleting = true;
        speed = 1000;
    }

    if (deleting && charIndex < 0) {
        deleting = false;
        charIndex = 0;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();
function copyEmail() {
    const email ="jenneakhila380@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email adress copied successfully");

    })
    .catch(()=>{
        alert("unable to copy email address");
    })
}


const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 120
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;

    createParticles();
}
window.addEventListener("resize",resizeCanvas);
window.addEventListener("load",resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        
        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }

        
        if (mouse.x !== null && mouse.y !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius && distance > 0) {
                const force = (mouse.radius - distance) / mouse.radius;

                this.x += (dx / distance) * force * 2;
                this.y += (dy / distance) * force * 2;
            }
        }
    }

    draw() {
        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#00ffff";

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00ffff";

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}

function createParticles() {
    particles = [];

    
    const particleCount = Math.min(
        Math.floor(
            (canvas.width * canvas.height) / 10000
        ),
        120
    );

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = 1 - distance / 120;

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(0, 255, 255, ${opacity * 0.35})`;

                ctx.lineWidth = 0.7;

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    connectParticles();

    requestAnimationFrame(animateParticles);
}


window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});


window.addEventListener("mouseout", (event) => {
    if (!event.relatedTarget) {
        mouse.x = null;
        mouse.y = null;
    }
});


window.addEventListener("touchmove", (event) => {
    if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    }
}, { passive: true });

window.addEventListener("touchend", () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load",resizeCanvas);

/* TECHNOLOGY SCROLL ANIMATION */

const technologies = document.querySelectorAll(".technology");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }

    });

}, {
    threshold: 0.2
});

technologies.forEach((technology, index) => {

    technology.style.transitionDelay = `${index * 80}ms`;

    observer.observe(technology);

});
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, {
    threshold: 0.2
});

revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 80}ms`;
    revealObserver.observe(element);
});
resizeCanvas();
animateParticles();