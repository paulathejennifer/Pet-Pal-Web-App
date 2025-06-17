// async function fetchPetsByType(petType) {
//   const token = await getAccessToken(); // Step 3 below
//   const res = await fetch(`https://api.petfinder.com/v2/animals?type=${petType}&limit=1`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   const data = await res.json();
//   const pet = data.animals[0];
//   showPet(Pet);
// }
// async function getAccessToken() {
//   const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: new URLSearchParams({
//       grant_type: "client_credentials",
//       client_id: "YOUR_CLIENT_ID",
//       client_secret: "YOUR_CLIENT_SECRET"
//     })
//   });
//   const data = await res.json();
//   return data.access_token;}function showPet(pet) {
//   document.getElementById("pet-card").innerHTML = `
//     <h2>${pet.name}</h2>
//     <img src="${pet.photos[0]?.medium || 'https://via.placeholder.com/300'}" width="300"/>
//     <p><strong>Species:</strong> ${pet.species}</p>
//     <p><strong>Breed:</strong> ${pet.breeds.primary}</p>
//     <p><strong>Age:</strong> ${pet.age}</p>
//     <p><strong>Description:</strong> ${pet.description || 'No description available'}</p>
//   `;}