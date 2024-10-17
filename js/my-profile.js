const darkMode = document.querySelector(".dark-mode");
const body = document.body;

if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("active");
}

darkMode.addEventListener("click", () => {
    body.classList.toggle("active");
    
    if (body.classList.contains("active")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});
