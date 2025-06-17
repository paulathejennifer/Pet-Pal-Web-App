async function getAccessToken() {
    try {
        const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: "Cti68kwTXwHjOq4NdJgQcaybEsIXbZtcrjeP6xjkC1DyrWlLEf", // replace
                client_secret: "hXi3EhpNwsgrUbxdkfK17EBtID9xZGQIFFQS4Ib7" // replace
            })
        });
        if (!res.ok) throw new Error("Token fetch failed");
        const data = await res.json();
        return data.access_token;
    } catch (err) {
        console.error("Access token error:", err);
        alert("Failed to get access token. Check console.");
    }
}

async function fetchPetsByType(petType) {
    const token = await getAccessToken();
    if (!token) return;
    try {
        const res = await fetch(`https://api.petfinder.com/v2/animals?type=${petType}&limit=25`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        console.log("Fetched data:", data);
        
        // Clear previous pets
        const petCardContainer = document.getElementById("pet-card");
        petCardContainer.innerHTML = ""; // Clear previous content
        
        // Loop through the fetched pets and display them
        if (data.animals && data.animals.length > 0) {
            data.animals.forEach(pet => {
                showPet(pet, petCardContainer);
            });
        } else {
            petCardContainer.innerHTML = "<p>No pets found.</p>";
        }
    } catch (err) {
        console.error("Pet fetch error:", err);
        alert("Error fetching pets. Check console.");
    }
}

function showPet(pet, container) {
    const petHTML = `
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <h2>${pet.name}</h2>
                    <img src="${pet.photos[0]?.medium || 'https://via.placeholder.com/300'}" width="100%" />
                    <p><strong>Species:</strong> ${pet.species}</p>
                    <p><strong>Breed:</strong> ${pet.breeds.primary}</p>
                    <p><strong>Age:</strong> ${pet.age}</p>
                    <p><strong>Description:</strong> ${pet.description || 'No description available'}</p>
                </div>
            </div>
            <div class="face face2">
                <!-- You can add additional content or styling here -->
            </div>
        </div>
    `;
    container.innerHTML += petHTML; 
}









