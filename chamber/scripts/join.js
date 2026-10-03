/* ------------------------------
Footer
------------------------------ */

const footerYear = document.getElementById("currentYear");
const footerModified = document.getElementById("lastModified");

if (footerYear) {
footerYear.textContent = new Date().getFullYear();
}

if (footerModified) {
footerModified.textContent = document.lastModified;
}

/* ------------------------------
Mobile Navigation
------------------------------ */

const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

if (menuButton && mainNav) {
menuButton.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

}

/* ------------------------------
Timestamp
------------------------------ */

const timestampField = document.querySelector("#timestamp");

if (timestampField) {
timestampField.value = new Date().toISOString();
}

/* ------------------------------
Membership Modals
------------------------------ */

const modalLinks = document.querySelectorAll(".modal-link");
const closeButtons = document.querySelectorAll(".close-modal");

modalLinks.forEach((link) => {

link.addEventListener("click", () => {

    const modalId = link.getAttribute("data-modal");
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.showModal();
    }
});

});

closeButtons.forEach((button) => {

button.addEventListener("click", () => {

    const modal = button.closest("dialog");

    if (modal) {
        modal.close();
    }
});

});

/* Close modal when clicking outside content */

document.querySelectorAll("dialog").forEach((modal) => {

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.close();
    }
});

});