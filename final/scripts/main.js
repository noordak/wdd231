const currentYear = new Date().getFullYear();

document.getElementById("currentYear").textContent = currentYear;

const lastModified = document.lastModified;

document.getElementById("lastModified").textContent = lastModified;


const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");


if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuButton.textContent =
            isOpen ? "✕" : "☰";
    });

}