 
        async function getAccessToken() {
            try {
                const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        grant_type: "client_credentials",
                        client_id: "Cti68kwTXwHjOq4NdJgQcaybEsIXbZtcrjeP6xjkC1DyrWlLEf",
                        client_secret: "hXi3EhpNwsgrUbxdkfK17EBtID9xZGQIFFQS4Ib7"
                    })
                });
                const data = await res.json();
                return data.access_token;
            } catch (err) {
                console.error("Access token error:", err);
                alert("Failed to get access token. Check console.");
            }
        }
        async function searchPets() {
            const species = document.getElementById("speciesSelect").value;
            if (!species) {
                alert("Please select a species.");
                return;
            }
            const token = await getAccessToken();
            if (!token) return;
            try {
                const res = await fetch(`https://api.petfinder.com/v2/animals?type=${species}&limit=20`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                displayPets(data.animals);
            } catch (err) {
                console.error("Pet fetch error:", err);
                alert("Error fetching pets. Check console.");
            }
        }
        function displayPets(pets) {
            const container = document.getElementById("pet-card");
            container.innerHTML = "";
            if (!pets || pets.length === 0) {
                container.innerHTML = "<p>No pets found.</p>";
                return;
            }
            pets.forEach(pet => {
                const image = pet.photos[0]?.medium || 'https://via.placeholder.com/300x300';
                const desc = pet.description || 'No description available';
                const card = `
          <div class="card">
            <div class="face face1">
              <img src="${image}" alt="${pet.name}">
              <div class="content">
                <h2>${pet.name}</h2>
                <p><strong>Breed:</strong> ${pet.breeds.primary}</p>
                <p><strong>Age:</strong> ${pet.age}</p>
              </div>
            </div>
            <div class="face face2">
              <p>${desc}</p>
            </div>
          </div>
        `;
                container.innerHTML += card;

            });
        }
    