import {
    getFavorites,
    toggleFavorite
} from "./storage.js";


const rideContainer = document.querySelector("#ride-container");
const landFilter = document.querySelector("#land-filter");
const typeFilter = document.querySelector("#type-filter");
const favoritesButton = document.querySelector("#favorites-button");
const allRidesButton = document.querySelector("#all-rides-button");

const rideModal = document.querySelector("#ride-modal");
const modalContent = document.querySelector("#modal-content");
const modalClose = document.querySelector("#modal-close");

let rides = [];
let showingFavorites = false;


async function getRides() {

    try {

        const response = await fetch("data/rides.json");

        if (!response.ok) {
            throw new Error("Unable to load ride data.");
        }

        rides = await response.json();

        createFilters(rides);
        displayRides(rides);

    } catch (error) {

        rideContainer.innerHTML = `
            <p class="card">
                Sorry, the ride information could not be loaded.
                Please try again later.
            </p>
        `;

        console.error("Ride data error:", error);
    }
}


function createFilters(rideData) {

    const lands = [...new Set(
        rideData.map(ride => ride.land)
    )].sort();

    const types = [...new Set(
        rideData.map(ride => ride.type)
    )].sort();


    lands.forEach(land => {

        const option = document.createElement("option");

        option.value = land;
        option.textContent = land;

        landFilter.appendChild(option);
    });


    types.forEach(type => {

        const option = document.createElement("option");

        option.value = type;
        option.textContent = type;

        typeFilter.appendChild(option);
    });
}


function displayRides(rideData) {

    rideContainer.innerHTML = "";

    if (rideData.length === 0) {

        rideContainer.innerHTML = `
            <p class="card">
                No rides match your selected filters.
            </p>
        `;

        return;
    }


    const favorites = getFavorites();


    rideData.forEach(ride => {

        const isFavorite = favorites.includes(ride.id);

        const article = document.createElement("article");

        article.classList.add("ride-card");

        article.innerHTML = `
            <div class="ride-card-content">

                <h3>${ride.name}</h3>

                <ul class="ride-details">

                    <li>
                        <strong>Land:</strong>
                        ${ride.land}
                    </li>

                    <li>
                        <strong>Type:</strong>
                        ${ride.type}
                    </li>

                    <li>
                        <strong>Height:</strong>
                        ${ride.heightRequirement}
                    </li>

                </ul>

                <button
                    class="button"
                    data-ride-id="${ride.id}"
                    type="button">
                    View Details
                </button>

                <button
                    class="button button-secondary favorite-button"
                    data-favorite-id="${ride.id}"
                    type="button">
                    ${isFavorite ? "★ Favorited" : "☆ Favorite"}
                </button>

            </div>
        `;


        const detailsButton =
            article.querySelector("[data-ride-id]");

        detailsButton.addEventListener("click", () => {
            openModal(ride);
        });


        const favoriteButton =
            article.querySelector("[data-favorite-id]");

        favoriteButton.addEventListener("click", () => {

            toggleFavorite(ride.id);

            displayRides(getFilteredRides());

        });


        rideContainer.appendChild(article);
    });
}


function getFilteredRides() {

    const selectedLand = landFilter.value;
    const selectedType = typeFilter.value;

    let filteredRides = rides.filter(ride => {

        const matchesLand =
            selectedLand === "all" ||
            ride.land === selectedLand;

        const matchesType =
            selectedType === "all" ||
            ride.type === selectedType;

        return matchesLand && matchesType;
    });


    if (showingFavorites) {

        const favorites = getFavorites();

        filteredRides = filteredRides.filter(ride =>
            favorites.includes(ride.id)
        );
    }


    return filteredRides;
}


function openModal(ride) {

    modalContent.innerHTML = `
        <h2>${ride.name}</h2>

        <p>
            ${ride.description}
        </p>

        <ul class="ride-details">

            <li>
                <strong>Land:</strong>
                ${ride.land}
            </li>

            <li>
                <strong>Type:</strong>
                ${ride.type}
            </li>

            <li>
                <strong>Height Requirement:</strong>
                ${ride.heightRequirement}
            </li>

        </ul>
    `;

    rideModal.showModal();
}


landFilter.addEventListener("change", () => {

    displayRides(getFilteredRides());

});


typeFilter.addEventListener("change", () => {

    displayRides(getFilteredRides());

});


favoritesButton.addEventListener("click", () => {

    showingFavorites = true;

    displayRides(getFilteredRides());

});


allRidesButton.addEventListener("click", () => {

    showingFavorites = false;

    landFilter.value = "all";
    typeFilter.value = "all";

    displayRides(rides);

});


modalClose.addEventListener("click", () => {

    rideModal.close();

});


rideModal.addEventListener("click", event => {

    if (event.target === rideModal) {
        rideModal.close();
    }

});


getRides();