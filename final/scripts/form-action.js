const results = document.querySelector("#trip-results");

const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const travelers = params.get("travelers");
const days = params.get("days");
const month = params.get("month");
const interest = params.get("interest");
const notes = params.get("notes");


if (name && travelers && days && month && interest) {

    results.innerHTML = `
        <h2>Thanks, ${name}!</h2>

        <p>
            Here is the information you provided for your
            Disneyland trip.
        </p>

        <dl>

            <dt><strong>Travelers</strong></dt>
            <dd>${travelers}</dd>

            <dt><strong>Trip Length</strong></dt>
            <dd>${days}</dd>

            <dt><strong>Preferred Month</strong></dt>
            <dd>${month}</dd>

            <dt><strong>Main Interest</strong></dt>
            <dd>${interest}</dd>

            <dt><strong>Additional Notes</strong></dt>
            <dd>${notes || "No additional notes provided."}</dd>

        </dl>
    `;

} else {

    results.innerHTML = `
        <h2>No Trip Information Found</h2>

        <p>
            Please return to the resources page and complete
            the trip planning form.
        </p>
    `;
}