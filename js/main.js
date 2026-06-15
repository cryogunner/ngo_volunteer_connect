document.addEventListener("DOMContentLoaded", () => {
    /* =====================================
   ELEMENTS
===================================== */

const volunteerBtn =
document.getElementById("volunteerBtn");

const ngoBtn =
document.getElementById("ngoBtn");

const roleDescription =
document.getElementById("roleDescription");

const roleActions =
document.getElementById("roleActions");
const sessionText =
document.getElementById("sessionText");

const citySelect =
document.getElementById("citySelect");

/* =====================================
   SESSION STORAGE API
===================================== */

const savedRole =
sessionStorage.getItem("role");

if(savedRole === "NGO"){

    activateNGO();

}
else{

    activateVolunteer();

}

volunteerBtn.addEventListener(
"click",
activateVolunteer
);

ngoBtn.addEventListener(
"click",
activateNGO
);

function activateVolunteer(){

    sessionStorage.setItem(
        "role",
        "Volunteer"
    );
    sessionText.textContent =
"Current Session Role: Volunteer";

    volunteerBtn.classList.add(
        "bg-white",
        "text-primary"
    );

    ngoBtn.classList.remove(
        "bg-white",
        "text-primary"
    );

    roleDescription.textContent =
    "Discover volunteer opportunities near you.";

    roleActions.innerHTML = `
        <a
        href="#opportunities"
        class="bg-accent text-white px-6 py-3 rounded-xl inline-block">

        Explore Opportunities

        </a>
    `;
}

function activateNGO(){

    sessionStorage.setItem(
        "role",
        "NGO"
    );
    sessionText.textContent =
"Current Session Role: NGO";

    ngoBtn.classList.add(
        "bg-white",
        "text-primary"
    );

    volunteerBtn.classList.remove(
        "bg-white",
        "text-primary"
    );

    roleDescription.textContent =
    "Recruit passionate volunteers for your NGO.";

    roleActions.innerHTML = `
        <a
        href="#register"
        class="bg-accent text-white px-6 py-3 rounded-xl inline-block">

        Register NGO

        </a>
    `;
}

/* =====================================
   LOCAL STORAGE API
===================================== */

const savedCityText =
document.getElementById(
"savedCityText"
);

const savedCity =
localStorage.getItem(
"city"
);

if(savedCity){

    citySelect.value = savedCity;

    savedCityText.textContent =
    `Welcome back! Last selected city: ${savedCity}`;

}

citySelect.addEventListener(
"change",
() => {

    localStorage.setItem(
        "city",
        citySelect.value
    );

    savedCityText.textContent =
    `Welcome back! Last selected city: ${citySelect.value}`;

    renderOpportunities(
        citySelect.value
    );

}
);

/* =====================================
   GEOLOCATION API
===================================== */

const locationBtn =
document.getElementById(
"locationBtn"
);

const locationResult =
document.getElementById(
"locationResult"
);

locationBtn.addEventListener(
"click",
() => {

    if(!navigator.geolocation){

        locationResult.textContent =
        "Geolocation not supported.";

        return;
    }

    navigator.geolocation
    .getCurrentPosition(

       position => {

    const lat =
    position.coords.latitude;

    const lon =
    position.coords.longitude;

    let detectedCity =
    "Bangalore";

    if(lat > 18 && lat < 20){

        detectedCity = "Mumbai";

    }

    else if(lat > 28 && lat < 29){

        detectedCity = "Delhi";

    }

    else if(lat > 12 && lat < 14){

        detectedCity = "Bangalore";

    }

    locationResult.innerHTML =

    `Location detected successfully!
    <br>
    City: ${detectedCity}`;

    citySelect.value =
    detectedCity;

    localStorage.setItem(
        "city",
        detectedCity
    );

    renderOpportunities(
        detectedCity
    );

},

error => {

    locationResult.textContent =

    "Unable to retrieve location.";

}

);
});

/* =====================================
   FILE API
===================================== */

const resumeUpload =
document.getElementById(
"resumeUpload"
);

const fileName =
document.getElementById(
"fileName"
);

resumeUpload.addEventListener(
"change",
e => {

    const file =
    e.target.files[0];

    if(file){

        fileName.textContent =
        `Uploaded: ${file.name}`;

    }

}
);

/* =====================================
   DRAG & DROP API
===================================== */

const dropZone =
document.getElementById(
"dropZone"
);

document
.querySelectorAll(
".interest-card"
)
.forEach(card => {

    card.addEventListener(
    "dragstart",
    e => {

        e.dataTransfer.setData(
            "text/plain",
            e.target.id
        );

    });

});

dropZone.addEventListener(
"dragover",
e => {

    e.preventDefault();

    dropZone.classList.add(
        "drag-over"
    );

});

dropZone.addEventListener(
"dragleave",
() => {

    dropZone.classList.remove(
        "drag-over"
    );

});

dropZone.addEventListener(
"drop",
e => {

    e.preventDefault();

    dropZone.classList.remove(
        "drag-over"
    );

    const id =
    e.dataTransfer.getData(
        "text/plain"
    );

    const item =
    document.getElementById(id);

    dropZone.appendChild(item);

});
const opportunities = {

    Bangalore: [

        {
            title: "Teach Underprivileged Children",
            ngo: "Smile Foundation",
            verified: true,
            description:
                "Help students improve reading, mathematics and communication skills.",

            tags: [
                "Education",
                "Weekend",
                "Certificate Available"
            ]
        },

        {
            title: "Lake Cleanup Initiative",
            ngo: "Green Earth",
            verified: true,
            description:
                "Join community volunteers to restore local lakes.",

            tags: [
                "Environment",
                "Beginner Friendly",
                "Weekend"
            ]
        },

        {
            title: "Health Awareness Campaign",
            ngo: "Care India",
            verified: true,
            description:
                "Support healthcare awareness activities and workshops.",

            tags: [
                "Healthcare",
                "Certificate Available"
            ]
        }

    ],

    Mumbai: [

        {
            title: "Coastal Cleanup Drive",
            ngo: "Blue Ocean Trust",
            verified: true,
            description:
                "Participate in cleaning Mumbai's coastline.",

            tags: [
                "Environment",
                "Weekend"
            ]
        },

        {
            title: "Slum Education Program",
            ngo: "Udaan NGO",
            verified: true,
            description:
                "Conduct educational sessions for children.",

            tags: [
                "Education",
                "Beginner Friendly"
            ]
        },

        {
            title: "Senior Citizen Support",
            ngo: "Helping Hands",
            verified: true,
            description:
                "Assist elderly citizens through community programs.",

            tags: [
                "Community",
                "Certificate Available"
            ]
        }

    ],

    Delhi: [

        {
            title: "Women Empowerment Workshop",
            ngo: "Shakti Foundation",
            verified: true,
            description:
                "Support training sessions and workshops.",

            tags: [
                "Women Empowerment",
                "Weekend"
            ]
        },

        {
            title: "Blood Donation Camp",
            ngo: "LifeCare",
            verified: true,
            description:
                "Assist with registrations and volunteer coordination.",

            tags: [
                "Healthcare",
                "Certificate Available"
            ]
        },

        {
            title: "Community Health Drive",
            ngo: "Health First",
            verified: true,
            description:
                "Spread healthcare awareness in local communities.",

            tags: [
                "Healthcare",
                "Beginner Friendly"
            ]
        }

    ]

};
const heading =
    document.getElementById("opportunityHeading");
function renderOpportunities(city) {

    const container =
        document.getElementById("opportunityContainer");

    const countText =
        document.getElementById("opportunityCount");

    if (!container) return;

    container.innerHTML = "";

    const cityData =
        opportunities[city] || [];
    heading.textContent =
        `Volunteer Opportunities in ${city}`;

    countText.textContent =
        `${cityData.length} opportunities found`;

    cityData.forEach(opportunity => {

        const tagsHTML =
            opportunity.tags.map(tag =>

                `<span class="bg-green-100
                               text-green-700
                               px-3 py-1
                               rounded-full
                               text-sm">
                    ${tag}
                </span>`

            ).join("");

        container.innerHTML += `

            <div class="bg-white rounded-2xl shadow-sm p-6 hover-card">

                <div class="flex justify-between items-center">

                    <h3 class="text-xl font-bold">
                        ${opportunity.title}
                    </h3>

                    ${
                        opportunity.verified
                        ? `<span class="text-green-600 text-sm font-medium">
                            ✓ Verified NGO
                           </span>`
                        : ""
                    }

                </div>

                <p class="text-primary mt-2 font-medium">
                    ${opportunity.ngo}
                </p>

                <p class="text-gray-600 mt-4">
                    ${opportunity.description}
                </p>

                <div class="flex flex-wrap gap-2 mt-4">
                    ${tagsHTML}
                </div>

                <div class="flex gap-3 mt-6">

                    <button
                        class="bg-primary text-white px-4 py-2 rounded-lg">

                        Apply

                    </button>

                    <button
                        class="border px-4 py-2 rounded-lg">

                        Read More

                    </button>

                </div>

            </div>

        `;
    });

}
renderOpportunities(
    citySelect.value
);
    /* =====================================
   REGISTRATION FORM
===================================== */

const volunteerForm =
document.getElementById(
"volunteerForm"
);

const successMessage =
document.getElementById(
"successMessage"
);

volunteerForm.addEventListener(
"submit",
function(e){

    e.preventDefault();

   successMessage.classList.remove(
    "hidden"
);

setTimeout(() => {

    successMessage.classList.add(
        "hidden"
    );

}, 3000);

}
);

});
