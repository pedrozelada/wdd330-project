// API Configuration
const API_URL = "https://extinct-api.herokuapp.com/api/v1/animal/";
const PAGE_SIZE = 10; // Number of animals per page

let currentPage = 1;
let animals = []; // Store all animals data

// Fetch Animals from API
async function fetchAnimals() {
  try {
    const response = await fetch(`${API_URL}804`);
    if (!response.ok) throw new Error("Failed to fetch data from the API");

    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    console.error("Error fetching animals:", error);
    return [];
  }
}

// Render Animal Cards with Pagination
function renderAnimals(animals, page) {
  const container = document.getElementById("animal-list");
  container.innerHTML = "";

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedAnimals = animals.slice(startIndex, endIndex);

  paginatedAnimals.forEach((animal) => {
    const card = document.createElement("div");
    card.classList.add("animal-card");

    const imageSrc =
      animal.imageSrc && animal.imageSrc !== "false"
        ? animal.imageSrc
        : "https://via.placeholder.com/240x160?text=No+Image";

    card.innerHTML = `
      <img src="${imageSrc}" alt="${animal.commonName}" class="animal-img" />
      <h3>${animal.commonName}</h3>
      <button class="details-btn" data-animal='${JSON.stringify(animal)}'>
        More Details
      </button>
    `;
    container.appendChild(card);
    
    // Seleccionamos el botón de detalles dentro de la tarjeta
    const detailsBtn = card.querySelector('.details-btn');
    
    // Añadir el event listener al botón de detalles
    detailsBtn.addEventListener('click', () => {
        
        displayTopicDetails(animal);
        });
  });

  renderPaginationControls();
}

// Render Pagination Controls
function renderPaginationControls() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(animals.length / PAGE_SIZE);

  // Page status
  const pageStatus = document.createElement("div");
  pageStatus.textContent = `Page ${currentPage} of ${totalPages}`;
  pageStatus.classList.add("page-status");

  // Input for page number
  const pageInputContainer = document.createElement("div");
  pageInputContainer.classList.add("page-input-container");

  const pageInput = document.createElement("input");
  pageInput.type = "number";
  pageInput.min = 1;
  pageInput.max = totalPages;
  pageInput.placeholder = "Go to page...";
  pageInput.classList.add("page-input");

  const goButton = document.createElement("button");
  goButton.textContent = "Go";
  goButton.classList.add("go-btn");

  goButton.addEventListener("click", () => {
    const targetPage = parseInt(pageInput.value);
    if (targetPage >= 1 && targetPage <= totalPages) {
      currentPage = targetPage;
      renderAnimals(animals, currentPage);
    } else {
      alert(`Please enter a page number between 1 and ${totalPages}`);
    }
  });

  pageInputContainer.appendChild(pageInput);
  pageInputContainer.appendChild(goButton);

  // Navigation buttons
  const navButtons = document.createElement("div");
  navButtons.classList.add("nav-buttons");

  const firstButton = createNavButton("<<", () => goToPage(1));
  const prevButton = createNavButton("<", () => goToPage(currentPage - 1));
  const nextButton = createNavButton(">", () => goToPage(currentPage + 1));
  const lastButton = createNavButton(">>", () => goToPage(totalPages));

  navButtons.appendChild(firstButton);
  navButtons.appendChild(prevButton);
  navButtons.appendChild(nextButton);
  navButtons.appendChild(lastButton);

  // Append all to the container
  paginationContainer.appendChild(pageStatus);
  paginationContainer.appendChild(pageInputContainer);
  paginationContainer.appendChild(navButtons);

  function createNavButton(label, onClick) {
    const button = document.createElement("button");
    button.textContent = label;
    button.classList.add("page-nav-btn");
    button.addEventListener("click", onClick);
    return button;
  }

  function goToPage(page) {
    const totalPages = Math.ceil(animals.length / PAGE_SIZE);
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      renderAnimals(animals, currentPage);
    }
  }
}

// Handle Modal Display
// function setupDetailsModal() {
//   const modal = document.getElementById("details-modal");
//   const modalContent = document.getElementById("modal-content");
//   const closeModal = document.getElementById("close-modal");

//   document.body.addEventListener("click", (event) => {
//     if (event.target.classList.contains("details-btn")) {
//       const animal = JSON.parse(event.target.dataset.animal);

//       modalContent.innerHTML = `
//         <h2>${animal.commonName}</h2>
//         <img src="${animal.imageSrc || "https://via.placeholder.com/240x160"}" 
//              alt="${animal.commonName}" class="modal-img" />
//         <p><strong>Scientific Name:</strong> ${animal.binomialName}</p>
//         <p><strong>Location:</strong> ${animal.location}</p>
//         <p><strong>Last Record:</strong> ${animal.lastRecord}</p>
//         <p>${animal.shortDesc}</p>
//         <a href="${animal.wikiLink}" target="_blank">More Info on Wikipedia</a>
//       `;
//       modal.style.display = "block";
//     }
//   });

//   closeModal.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   });
// }


let topicDetails = document.querySelector('#animal-details');
function displayTopicDetails(animal) {
  topicDetails.innerHTML = '';
  topicDetails.innerHTML = `
     <button id="closeModal">❌</button>
     <h2>${animal.commonName}</h2>
         <img src="${animal.imageSrc || "https://via.placeholder.com/240x160"}" 
              alt="${animal.commonName}" class="modal-img" />
         <p><strong>Scientific Name:</strong> ${animal.binomialName}</p>
         <p><strong>Location:</strong> ${animal.location}</p>
         <p><strong>Last Record:</strong> ${animal.lastRecord}</p>
         <p>${animal.shortDesc}</p>
         <a href="${animal.wikiLink}" target="_blank">More Info on Wikipedia</a>
  `;
  topicDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    topicDetails.close();
  });
}


// Initialize Application
async function init() {
  animals = await fetchAnimals();
  renderAnimals(animals, currentPage);
 // setupDetailsModal();
}

init();
