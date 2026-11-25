function copyEmail() {
    const email ="jenneakhila380@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email adress copied successfully");

    })
    .catch(()=>{
        alert("unable to copy email address");
    })
}

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

    technology.style.transitionDelay = `${index * 60}ms`;

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
    element.style.transitionDelay = `${index * 60}ms`;
    revealObserver.observe(element);
});
resizeCanvas();
