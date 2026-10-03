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
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
});

}

/* ------------------------------
Get Form Data
------------------------------ */

const params = new URLSearchParams(window.location.search);

/* ------------------------------
Display Required Information
------------------------------ */

document.getElementById("displayFirstName").textContent =
params.get("firstName") || "";

document.getElementById("displayLastName").textContent =
params.get("lastName") || "";

document.getElementById("displayEmail").textContent =
params.get("email") || "";

document.getElementById("displayPhone").textContent =
params.get("phone") || "";

document.getElementById("displayOrganization").textContent =
params.get("organization") || "";

const timestamp = params.get("timestamp");

if (timestamp) {

const date = new Date(timestamp);

document.getElementById("displayTimestamp").textContent =
    date.toLocaleString();

}
