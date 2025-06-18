const animalList = document.getElementById('animal-list');
const animals = window.ANIMALS;

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}
function setFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
}
function updateFavCount() {
  const favs = getFavorites();
  const count = favs.length;
  const span = document.getElementById('fav-count');
  if (count > 0) {
    span.textContent = `(${count})`;
  } else {
    span.textContent = '';
  }
}
function isFavorite(id) {
  return getFavorites().includes(id);
}
function toggleFavorite(id) {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
  } else {
    favs.push(id);
  }
  setFavorites(favs);
  renderAnimals();
  updateFavCount();
}


function getFakeRating(id) {
  const stars = ["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
  return stars[parseInt(id, 10) % stars.length];
}

function renderAnimals() {
  animalList.innerHTML = '';
  animals.forEach(animal => {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.innerHTML = `
      <div class="pet-img-container">
        <img src="${animal.img}" alt="${animal.name}">
        <button class="fav-btn ${isFavorite(animal.id) ? 'favorited' : ''}" title="Add to favorites" data-id="${animal.id}">&#10084;</button>
      </div>
      <h2>${animal.name}</h2>
      <div class="pet-rating">${getFakeRating(animal.id)}</div>
      <div class="pet-price">${animal.price ? '$'+animal.price : animal.age}</div>
      <div class="pet-actions">
        <button class="adopt-btn" onclick="location.href='adopt.html?pet=${animal.id}'">Adopt</button>
        <button class="quickview-btn" data-id="${animal.id}">Quick View</button>
      </div>
    `;
    animalList.appendChild(card);
  });


  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.id);
    };
  });


  document.querySelectorAll('.quickview-btn').forEach(btn => {
    btn.onclick = (e) => {
      const id = btn.dataset.id;
      const animal = animals.find(a => a.id === id);
      showQuickView(animal);
    };
  });
}

function showQuickView(animal) {
  document.getElementById('modal-img').src = animal.img;
  document.getElementById('modal-name').textContent = animal.name;
  document.getElementById('modal-desc').textContent = `Age: ${animal.age}\nTraits: ${animal.traits || ''}\nDesc: ${animal.desc || ''}\nFee: ${animal.fee}`;
  document.getElementById('quickview-modal').style.display = 'block';
}
document.getElementById('close-modal').onclick = () => {
  document.getElementById('quickview-modal').style.display = 'none';
};
window.onclick = function(event) {
  const modal = document.getElementById('quickview-modal');
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

renderAnimals();
updateFavCount();