import { discoverItems } from "../data/discover.mjs";

/* ------------------------------
Footer
------------------------------ */

const footerYear = document.getElementById("currentYear");
const footerModified = document.getElementById("lastModified");

footerYear.textContent = new Date().getFullYear();
footerModified.textContent = document.lastModified;

/* ------------------------------
Mobile Navigation
------------------------------ */

const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

menuButton.addEventListener("click", () => {

const isOpen = mainNav.classList.toggle("open");

menuButton.setAttribute("aria-expanded", isOpen);

menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
);

});

/* ------------------------------
Discover Cards
------------------------------ */

const discoverGrid = document.querySelector("#discover-grid");

function displayDiscoverItems(items) {

discoverGrid.innerHTML = "";

items.forEach((item) => {

    const card = document.createElement("article");

    card.classList.add("discover-card");

    card.innerHTML = `
        <h2>${item.name}</h2>

        <figure>
            <img
                src="images/${item.image}"
                alt="${item.name}"
                loading="lazy"
                width="300"
                height="200"
            >
        </figure>

        <address>${item.address}</address>

        <p>${item.description}</p>

        <button type="button">Learn More</button>
    `;

    discoverGrid.appendChild(card);
});

}

displayDiscoverItems(discoverItems);

/* ------------------------------
Last Visit Message
------------------------------ */

const visitMessage = document.querySelector("#visitMessage");

const currentVisit = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {

visitMessage.textContent =
    "Welcome! Let us know if you have any questions.";

} else {

const lastVisitTime = Number(lastVisit);

const timeDifference =
    currentVisit - lastVisitTime;

const millisecondsPerDay =
    1000 * 60 * 60 * 24;

const daysBetween =
    Math.floor(timeDifference / millisecondsPerDay);

if (timeDifference < millisecondsPerDay) {

    visitMessage.textContent =
        "Back so soon! Awesome!";

} else {

    const dayWord =
        daysBetween === 1 ? "day" : "days";

    visitMessage.textContent =
        `You last visited ${daysBetween} ${dayWord} ago.`;
}

}

localStorage.setItem("lastVisit", currentVisit);