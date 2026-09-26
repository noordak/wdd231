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
Business Spotlights
------------------------------ */

const spotlightContainer = document.querySelector("#spotlights");

async function getSpotlights() {
try {
const response = await fetch("data/members.json");

    if (!response.ok) {
        throw new Error("Unable to load member data.");
    }

    const members = await response.json();

    // Keep only Gold and Silver members.
    const qualifyingMembers = members.filter(
        (member) => member.membership === 2 || member.membership === 3
    );

    // Randomize the qualifying members.
    const shuffledMembers = [...qualifyingMembers].sort(
        () => Math.random() - 0.5
    );

    // Display three random members.
    const selectedMembers = shuffledMembers.slice(0, 3);

    displaySpotlights(selectedMembers);

} catch (error) {
    spotlightContainer.innerHTML = `
        <p>
            Sorry, business spotlights could not be loaded at this time.
        </p>
    `;

    console.error(error);
}

}

/* ------------------------------
Display Spotlights
------------------------------ */

function displaySpotlights(members) {

spotlightContainer.innerHTML = "";

members.forEach((member) => {

    const card = document.createElement("article");

    card.classList.add("spotlight-card");

    const membershipLevel =
        member.membership === 3 ? "Gold Member" : "Silver Member";

    card.innerHTML = `
        <img
            src="images/${member.image}"
            alt="${member.name} logo"
            loading="lazy"
            width="150"
            height="100"
        >

        <h3>${member.name}</h3>

        <p class="membership-level">
            ${membershipLevel}
        </p>

        <p>${member.address}</p>

        <p>${member.phone}</p>

        <p>
            <a
                href="${member.website}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit Website
            </a>
        </p>
    `;

    spotlightContainer.appendChild(card);
});

}

/* ------------------------------
Start Spotlight Loading
------------------------------ */

getSpotlights();

/* ------------------------------
   Weather
------------------------------ */

// Syracuse, Utah coordinates
const latitude = 41.0894;
const longitude = -112.0647;

// Add your OpenWeatherMap API key here.
// Do not share this key publicly.
const weatherApiKey = "12247beed1601091592c02db70dd6120";

async function getWeather() {
    try {
        const currentUrl =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=imperial`;

        const forecastUrl =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=imperial`;

        const currentResponse = await fetch(currentUrl);
        const forecastResponse = await fetch(forecastUrl);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        document.getElementById("temperature").textContent =
            "Weather unavailable";

        document.getElementById("weather-description").textContent =
            "Unable to load current weather.";

        console.error(error);
    }
}


/* ------------------------------
   Display Current Weather
------------------------------ */

function displayCurrentWeather(data) {

    const temperature = document.getElementById("temperature");
    const description = document.getElementById("weather-description");

    temperature.textContent = `${Math.round(data.main.temp)}°F`;

    description.textContent = data.weather[0].description;
}


/* ------------------------------
   Display Three-Day Forecast
------------------------------ */

function displayForecast(data) {

    const forecastContainer =
        document.getElementById("forecast-container");

    forecastContainer.innerHTML = "";

    // OpenWeatherMap provides forecasts every 3 hours.
    // We select one forecast from each of the next three days.
    const dailyForecasts = [];

    data.list.forEach((forecast) => {

        const forecastDate = new Date(forecast.dt * 1000);

        const dateString = forecastDate.toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }
        );

        if (
            !dailyForecasts.some(
                (day) => day.date === dateString
            )
        ) {
            dailyForecasts.push({
                date: dateString,
                temperature: forecast.main.temp,
                description: forecast.weather[0].description
            });
        }
    });

    dailyForecasts.slice(1, 4).forEach((day) => {

        const card = document.createElement("article");

        card.classList.add("forecast-card");

        const date = new Date(day.date);

        const dayName = date.toLocaleDateString(
            "en-US",
            {
                weekday: "short"
            }
        );

        card.innerHTML = `
            <h4>${dayName}</h4>
            <p class="forecast-temperature">
                ${Math.round(day.temperature)}°F
            </p>
            <p>${day.description}</p>
        `;

        forecastContainer.appendChild(card);
    });
}


/* ------------------------------
   Start Weather
------------------------------ */

getWeather(); 