const currentYear = new Date().getFullYear();

document.getElementById("currentYear").textContent = currentYear;

const lastModified = document.lastModified;

document.getElementById("lastModified").textContent = lastModified;

// Member Directory

const membersContainer = document.querySelector("#members");

async function getMembers() {
try {
const response = await fetch("data/members.json");

    if (!response.ok) {
        throw new Error("Unable to load member data.");
    }

    const members = await response.json();

    displayMembers(members);
} catch (error) {
    membersContainer.innerHTML = `
        <p>Sorry, the member directory could not be loaded at this time.</p>
    `;

    console.error(error);
}

}

function getMembershipLevel(level) {
if (level === 1) {
return "Member";
} else if (level === 2) {
return "Silver";
} else if (level === 3) {
return "Gold";
} else {
return "Unknown";
}
}

function displayMembers(members) {
membersContainer.innerHTML = "";

members.forEach((member) => {
    const card = document.createElement("article");

    card.classList.add("member-card");

    card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
        <a href="${member.website}" target="_blank" rel="noopener">
            Visit Website
        </a>
    `;

    membersContainer.appendChild(card);
});

}

getMembers();

// Mobile Navigation

const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

menuButton.addEventListener("click", () => {
const isOpen = mainNav.style.display === "block";

mainNav.style.display = isOpen ? "none" : "block";

menuButton.setAttribute("aria-expanded", !isOpen);

});

// Grid and List Views

const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");

gridButton.classList.add("active-view");

gridButton.addEventListener("click", () => {
membersContainer.classList.add("grid");
membersContainer.classList.remove("list");

gridButton.classList.add("active-view");
listButton.classList.remove("active-view");

});

listButton.addEventListener("click", () => {
membersContainer.classList.add("list");
membersContainer.classList.remove("grid");

listButton.classList.add("active-view");
gridButton.classList.remove("active-view");

});