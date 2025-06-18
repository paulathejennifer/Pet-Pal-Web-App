const urlParams = new URLSearchParams(window.location.search);
const petId = urlParams.get('pet');
const animals = window.ANIMALS;
const pet = animals.find(a => a.id === petId);

if (pet) {
  document.getElementById('adopt-pet-info').innerHTML = `
    <h2>Adopting: ${pet.name}</h2>
    <img src="${pet.img}" alt="${pet.name}" style="max-width:200px;">
    <p>${pet.desc}</p>
    <p>Age: ${pet.age}</p>
    <p>Traits: ${pet.traits}</p>
  `;
  document.getElementById('adopted-pet-name').textContent = pet.name;
}

document.getElementById('adopt-form').onsubmit = function(e) {
  e.preventDefault();

  document.getElementById('adopt-form').style.display = 'none';
  document.getElementById('adopt-success').classList.remove('hidden');
  document.getElementById('yay-sound').play();

  let adopted = JSON.parse(localStorage.getItem('adopted') || '[]');
  if (!adopted.includes(petId)) {
    adopted.push(petId);
    localStorage.setItem('adopted', JSON.stringify(adopted));
  }
};