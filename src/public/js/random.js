// API link
const API_URL = "https://extinct-api.herokuapp.com/api/v1/animal/";

const animalContainer = document.getElementById("animal-container");
const savedCountElement = document.getElementById("saved-count");
const savedListElement = document.getElementById("saved-list");
const showSavedButton = document.getElementById("show-saved");

// Utility function to get saved animals from local storage
function getSavedAnimals() {
  const savedAnimals = localStorage.getItem("savedAnimals");
  return savedAnimals ? JSON.parse(savedAnimals) : [];
}

// Utility function to save an animal to local storage
function saveAnimalName(name) {
  const savedAnimals = getSavedAnimals();
  if (!savedAnimals.includes(name)) {
    savedAnimals.push(name);
    localStorage.setItem("savedAnimals", JSON.stringify(savedAnimals));
    updateSavedCount();
  }
}

// Update the saved count display
function updateSavedCount() {
  const savedAnimals = getSavedAnimals();
  savedCountElement.textContent = `Saved Animals: ${savedAnimals.length}`;
}

// Display the saved animal names
function showSavedAnimals() {
  const savedAnimals = getSavedAnimals();
  savedListElement.innerHTML = ""; // Clear the list

  if (savedAnimals.length === 0) {
    savedListElement.innerHTML = "<li>No animals saved yet.</li>";
    return;
  }

  savedAnimals.forEach((name) => {
    const listItem = document.createElement("li");
    listItem.textContent = name;
    savedListElement.appendChild(listItem);
  });
}

// Create the animal card and save its name to local storage
const createAnimalCard = (animal) => {
  animalContainer.innerHTML = ""; // Clear the container

  if (!animal) {
    animalContainer.innerHTML = "<p>Error fetching animal data. Try again later.</p>";
    return;
  }

  // Create the HTML structure for the animal card
  const animalCard = `
    <div class="animal-card">
      <h3>${animal.commonName} (${animal.binomialName})</h3>
      <img src="${animal.imageSrc || "https://via.placeholder.com/240x160?text=No+Image"}" 
           alt="${animal.commonName}" class="animal-image" />
      <p><strong>Location:</strong> ${animal.location}</p>
      <p><strong>Last Recorded:</strong> ${animal.lastRecord}</p>
      <p><strong>Description:</strong> ${animal.shortDesc}</p>
      <a href="${animal.wikiLink}" target="_blank">Learn more on Wikipedia</a>
    </div>
  `;

  animalContainer.innerHTML = animalCard;

  // Save the animal's common name to local storage
  saveAnimalName(animal.commonName);
};

// Fetch animals from the API and display a random one
async function loadRandomAnimal() {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) throw new Error("Failed to fetch data from the API");

    const jsonData = await response.json();
    const animals = jsonData.data;

    if (animals.length > 0) {
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
      createAnimalCard(randomAnimal);
    } else {
      animalContainer.innerHTML = "<p>No animals found.</p>";
    }
  } catch (error) {
    console.error("Error fetching animal:", error);
    animalContainer.innerHTML = "<p>Error fetching animal data. Try again later.</p>";
  }
}

// Event listener for "Show Saved Animals" button
showSavedButton.addEventListener("click", showSavedAnimals);

// Initialize saved animals count and load a random animal
updateSavedCount();
loadRandomAnimal();
