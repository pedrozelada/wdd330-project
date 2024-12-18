
// API Keys
const ANIMALS_API_KEY = import.meta.env.VITE_ANIMALS_API_KEY;
const IMAGES_API_KEY = import.meta.env.VITE_IMAGES_API_KEY;


// DOM Elements
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

// Render results
function renderResults(animalData, images) {
  // Clear previous results
  resultsSection.innerHTML = "";

  // If no data, show a message
  if (animalData.length === 0) {
    resultsSection.innerHTML = `<p>No results found. Try a different animal name.</p>`;
    return;
  }

  // Process each animal result
  animalData.forEach((animal) => {
    const card = document.createElement("div");
    card.classList.add("result-card");

    const image1 = images[0]?.src.medium || "https://via.placeholder.com/300";
    const image2 = images[1]?.src.medium || "https://via.placeholder.com/300";

    card.innerHTML = `
      <img src="${image1}" alt="${animal.name}" />
      <h3>${animal.name}</h3>
      <p><strong>Scientific Name:</strong> ${animal.taxonomy.scientific_name || "N/A"}</p>
      <p><strong>Location:</strong> ${animal.locations.join(", ") || "N/A"}</p>
      <p><strong>Diet:</strong> ${animal.characteristics.diet || "N/A"}</p>
      <p><strong>Biggest Threat:</strong> ${animal.characteristics.biggest_threat || "N/A"}</p>
      <p><strong>Lifespan:</strong> ${animal.characteristics.lifespan || "N/A"}</p>
      <a href="${images[0]?.url}" target="_blank">View Image 1</a> | 
      <a href="${images[1]?.url}" target="_blank">View Image 2</a>
    `;

    resultsSection.appendChild(card);
  });
}

// Main search function
async function searchAnimal() {
  const animalName = animalInput.value.trim();

  if (!animalName) {
    alert("Please enter an animal name.");
    return;
  }

  // Fetch data from APIs
  const [animalDetails, animalImages] = await Promise.all([
    fetchAnimalDetails(animalName),
    fetchAnimalImages(animalName),
  ]);

  // Render results
  renderResults(animalDetails, animalImages);
}

// Event listener for search button
searchBtn.addEventListener("click", searchAnimal);
