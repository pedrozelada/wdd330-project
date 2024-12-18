//console.log(import.meta.env);
// API Keys
//const ANIMALS_API_KEY = import.meta.env.VITE_ANIMALS_API_KEY;
//const IMAGES_API_KEY = import.meta.env.VITE_IMAGES_API_KEY;
const ANIMALS_API_KEY = "w8BZG2Oibpa4V+7lqaADug==aReAFaiWo9O47mYa";
const IMAGES_API_KEY = "5HFbwzlZZmVOroLoa1MBG58UEbYrUUqx3Mx11cm9ponhhQkV9fbT4CSK";

const searchBtn = document.getElementById("search-btn");
const animalInput = document.getElementById("animal-input");
const resultsSection = document.getElementById("results-section");

// Fetch animal details
async function fetchAnimalDetails(name) {
  const url = `https://api.api-ninjas.com/v1/animals?name=${name}`;
  const headers = { "X-Api-Key": ANIMALS_API_KEY };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error("Failed to fetch animal details");
    return await response.json();
  } catch (error) {
    console.error("Error fetching animal details:", error);
    return [];
  }
}

// Fetch animal images
async function fetchAnimalImages(name) {
  const url = `https://api.pexels.com/v1/search?query=${name}&per_page=2`;
  const headers = { Authorization: IMAGES_API_KEY };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error("Failed to fetch animal images");
    const data = await response.json();
    return data.photos;
  } catch (error) {
    console.error("Error fetching animal images:", error);
    return [];
  }
}


// Render results with images displayed separately
function renderResults(animalData, images) {
  resultsSection.innerHTML = "";
  if (animalData.length === 0) {
    resultsSection.innerHTML = `<p>No results found. Try a different animal name.</p>`;
    return;
  }
  const imageSection = document.createElement("div");
  imageSection.classList.add("image-section");
  imageSection.classList.add("image-section");

  const image1 = images[0]?.src.medium ;
  const image2 = images[1]?.src.medium ;

  imageSection.innerHTML = `
    <div class="image-wrapper">
      <img src="${image1}" alt="Animal Image 1" class="animal-image" />
      <img src="${image2}" alt="Animal Image 2" class="animal-image" />
    </div>
  `;
  resultsSection.appendChild(imageSection);

  animalData.forEach((animal) => {
    const card = document.createElement("div");
    card.classList.add("result-card");

    card.innerHTML = `
      <h3>${animal.name}</h3>
      <p><strong>Scientific Name:</strong> ${animal.taxonomy.scientific_name || "N/A"}</p>
      <p><strong>Location:</strong> ${animal.locations.join(", ") || "N/A"}</p>
      <p><strong>Diet:</strong> ${animal.characteristics.diet || "N/A"}</p>
      <p><strong>Biggest Threat:</strong> ${animal.characteristics.biggest_threat || "N/A"}</p>
      <p><strong>Lifespan:</strong> ${animal.characteristics.lifespan || "N/A"}</p>
      
    `;

    resultsSection.appendChild(card);
  });
}


async function searchAnimal() {
  const animalName = animalInput.value.trim();

  if (!animalName) {
    alert("Please enter an animal name.");
    return;
  }

  const [animalDetails, animalImages] = await Promise.all([
    fetchAnimalDetails(animalName),
    fetchAnimalImages(animalName),
  ]);

  renderResults(animalDetails, animalImages);
}


searchBtn.addEventListener("click", searchAnimal);
