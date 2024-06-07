const form = document.getElementById('addCargoForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Récupération des éléments du DOM
    const transportType = document.querySelector('input[name="type"]:checked');
    const departureDate = document.getElementById("departureDate");
    const arrivalDate = document.getElementById("arrivalDate");
    const stopCriteria = document.getElementById("stopCriteria");
    const criteriaValue = document.getElementById("criteriaValue");
    const countryName = document.getElementById("countryName");
    const arrivalCountry = document.getElementById("arrivalCountry");
    const distance = document.getElementById("distance");
    // Récupérer les valeurs par défaut de l'état et du statut
    const etat = "Ouvert"; // Valeur par défaut de l'état
    const statut = "En attente"; // Valeur par défaut du statut


    // Création d'un nouvel objet FormData
    const formData = new FormData();

    // Ajout des données du formulaire à l'objet FormData
    formData.append('action', 'addCargaison');
    formData.append('type', transportType.value);
    formData.append('dateDepart', departureDate.value);
    formData.append('dateArrivee', arrivalDate.value);
    formData.append('stopCriteria', stopCriteria.value);
    formData.append('criteriaValue', criteriaValue.value);
    formData.append('countryName', countryName.value);
    formData.append('arrivalCountry', arrivalCountry.value);
    formData.append('distance', distance.value);
    formData.append('etat', etat);
    formData.append('statut', statut);


    /* formData.forEach((value, key) => {
        console.log(key, value);
    });
 */
    fetch('../data/api.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (data.status === "success") {
                    alert(data.message);
                    const modal = document.getElementById('modal');
                    if (modal) modal.classList.add('hidden');

                    // Actualiser la liste des cargaisons
                    const cargoList = document.getElementById('cargo-list');
                    const newRow = createNewCargoRow(data.cargoId, transportType.value, departureDate.value, arrivalDate.value, distance);
                    cargoList.insertBefore(newRow, cargoList.firstChild);
                } else {
                    alert('Erreur lors de l\'ajout de la cargaison');
                }
            } catch (e) {
                console.error('Erreur de parsing JSON:', e, text);
            }
        })
        .catch(error => console.error('Erreur:', error));

    /* function updatePaginationButtons() {
        const pageLinks = paginationContainer.querySelectorAll('.page-link');
        pageLinks.forEach(btn => {
            btn.classList.remove('bg-blue-800', 'font-bold');
            if (parseInt(btn.textContent) === currentPage) {
                btn.classList.add('bg-blue-800', 'font-bold');
            }
        });
    }  */
})

const addCargoForm = document.getElementById('addCargoForm');
const addCargoModal = document.getElementById('addCargoModal');
const addCargoBtn = document.getElementById('addCargoBtn');
const cancelBtn = document.getElementById('cancelBtn');
const cargoList = document.getElementById('cargo-list');
const searchInput = document.getElementById('searchInput');
const paginationContainer = document.getElementById('pagination');
const editCargoModal = document.getElementById('editCargoModal');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const editCargoForm = document.getElementById('editCargoForm');
const deleteCargoBtn = document.getElementById('deleteCargoBtn');
const dateDepartInput = document.getElementById('dateDepart');
const dateArriveeInput = document.getElementById('dateArrivee');
const stopCriteriaSelect = document.getElementById('stopCriteria');
const criteriaValueInput = document.getElementById('criteriaValue');
const choixSelect = document.getElementById("choix");
const champSaisi = document.getElementById("champ-saisi");
const labelValeur = document.querySelector("#champ-saisi label");
const inputValeur = document.getElementById("valeur");

let departMarker, arriveeMarker;
let distance = null;
let currentPage = 1;
const itemsPerPage = 5;
let allItems = [];
const cargoCounters = {
    maritime: 0,
    aerien: 0,
    terrestre: 0
};

// Afficher et masquer le modal d'ajout de cargaison
addCargoBtn.addEventListener('click', () => {
    addCargoModal.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    addCargoModal.style.display = 'none';
    resetForm();
});

// Afficher et masquer le modal de modification de cargaison
cancelEditBtn.addEventListener('click', () => {
    editCargoModal.style.display = 'none';
    editCargoForm.reset();
});

// Soumettre le formulaire d'ajout de cargaison
addCargoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = addCargoForm.type.value;
    const dateDepart = addCargoForm.dateDepart.value;
    const dateArrivee = addCargoForm.dateArrivee.value;
    const cargoId = generateCargoId(type);

    const newRow = createNewCargoRow(cargoId, type, dateDepart, dateArrivee, distance.toFixed(2), etat, statut);
    allItems.unshift(newRow);
    updateItems(allItems);
    renderPage(allItems, 1);

    addCargoModal.style.display = 'none';
    addCargoForm.reset();
    resetForm();
});

// Soumettre le formulaire de modification de cargaison
editCargoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const cargoId = document.getElementById('editCargoId').value;
    const dateDepart = document.getElementById('editDateDepart').value;
    const dateArrivee = document.getElementById('editDateArrivee').value;
    const etat = document.getElementById('editEtat').value;
    const status = document.getElementById('editStatus').value;

    const rowIndex = allItems.findIndex(row => row.querySelector('td').textContent === cargoId);

    if (rowIndex !== -1) {
        const cells = allItems[rowIndex].querySelectorAll('td');
        cells[2].textContent = dateDepart;
        cells[3].textContent = dateArrivee;
        cells[5].innerHTML = `<button>${etat}</button>`;
        cells[6].innerHTML = `<button>${status}</button>`;
    }

    editCargoModal.style.display = 'none';
    updateItems(allItems);
});

// Supprimer une cargaison
deleteCargoBtn.addEventListener('click', () => {
    const cargoId = document.getElementById('editCargoId').value;
    const rowIndex = allItems.findIndex(row => row.querySelector('td').textContent === cargoId);
    if (rowIndex !== -1) {
        allItems.splice(rowIndex, 1);
        updateItems(allItems);
    }
    editCargoModal.style.display = 'none';
});

// Réinitialiser le formulaire
function resetForm() {
    dateDepartInput.value = '';
    dateArriveeInput.value = '';
    stopCriteriaSelect.value = '';
    criteriaValueInput.value = '';
    document.getElementById('depart').value = '';
    document.getElementById('arrivee').value = '';
    departMarker = null;
    arriveeMarker = null;
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

// Générer un identifiant unique pour chaque cargaison
function generateCargoId(type) {
    if (!cargoCounters[type]) {
        cargoCounters[type] = 0;
    }
    cargoCounters[type]++;
    return `${type.charAt(0).toUpperCase()}${cargoCounters[type].toString().padStart(3, '0')}`;
}

// Créer une nouvelle ligne de cargaison
function createNewCargoRow(cargaison) {
    const newRow = document.createElement('tr');
    newRow.classList.add('border-b');
    newRow.innerHTML = `
        <td class="py-2 px-4">${cargaison.id}</td>
        <td class="py-2 px-4">${cargaison.type}</td>
        <td class="py-2 px-4">${cargaison.dateDepart}</td>
        <td class="py-2 px-4">${cargaison.dateArrivee}</td>
        <td class="py-2 px-4">${cargaison.distance}</td>
        <td class="py-2 px-4"><button>${cargaison.etat}</button></td>
        <td class="py-2 px-4"><button>${cargaison.statut}</button></td>
        <td class="py-2 px-4">
            <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg">Voir</button>
        </td>
        <td class="py-2 px-4">
            <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg editCargoBtn">Modifier</button>
        </td>
        <td class="py-2 px-4">
            <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg editCargoBtn"> + Produit</button>
        </td>
    `;

    // ... (ajout des écouteurs d'événements pour les boutons, si nécessaire)

    return newRow;
}

newRow.querySelector('.editCargoBtn').addEventListener('click', () => {
    const cells = newRow.querySelectorAll('td');
    document.getElementById('editCargoId').value = cells[0].textContent;
    document.getElementById('editType').value = cells[1].textContent;
    document.getElementById('editDateDepart').value = cells[2].textContent;
    document.getElementById('editDateArrivee').value = cells[3].textContent;

    editCargoModal.style.display = 'flex';
});

return newRow;


// Filtrer les éléments affichés
/* function filterItems() {
    const filterText = searchInput.value.toLowerCase();
    const filteredItems = allItems.filter(row => {
        const cells = row.querySelectorAll('td');
        return Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filterText));
    });

    renderPage(filteredItems, 1);
    renderPagination(filteredItems);
}  */

function filterItems() {
    const filterText = searchInput.value.toLowerCase();
    if (filterText.length >= 3) {
        const filteredItems = allItems.filter(row => {
            const cells = row.querySelectorAll('td');
            return Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filterText));
        });

        renderPage(filteredItems, 1);
        renderPagination(filteredItems);
    } else {
        renderPage(allItems, 1);
        renderPagination(allItems);
    }
}

// Mettre à jour les éléments affichés
function updateItems(items) {
    allItems = items;
    filterItems();
}

// Afficher une page spécifique
function renderPage(items, page) {
    cargoList.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);
    for (const item of paginatedItems) {
        cargoList.appendChild(item);
    }
}

// Afficher la pagination
/* function renderPagination(items) {
    paginationContainer.innerHTML = '';
    const pageCount = Math.ceil(items.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const pageLink = document.createElement('button');
        pageLink.classList.add('page-link', 'px-2', 'py-1', 'mx-1', 'bg-blue-600', 'text-white', 'rounded');
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            currentPage = i;
            renderPage(items, currentPage);
        });
        paginationContainer.appendChild(pageLink);
    }
} */

function renderPagination(items) {
    paginationContainer.innerHTML = '';
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Ajouter un bouton pour la première page
    const firstPageBtn = document.createElement('button');
    firstPageBtn.classList.add('page-link', 'px-2', 'py-1', 'mx-1', 'bg-blue-600', 'text-white', 'rounded');
    firstPageBtn.textContent = '<<';
    firstPageBtn.addEventListener('click', () => {
        currentPage = 1;
        renderPage(items, currentPage);
        updatePaginationButtons();
    });
    paginationContainer.appendChild(firstPageBtn);

    // Ajouter les boutons pour chaque page
    for (let i = 1; i <= pageCount; i++) {
        const pageLink = document.createElement('button');
        pageLink.classList.add('page-link', 'px-2', 'py-1', 'mx-1', 'bg-blue-600', 'text-white', 'rounded');
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            currentPage = i;
            renderPage(items, currentPage);
            updatePaginationButtons();
        });
        paginationContainer.appendChild(pageLink);
    }

    // Ajouter un bouton pour la dernière page
    const lastPageBtn = document.createElement('button');
    lastPageBtn.classList.add('page-link', 'px-2', 'py-1', 'mx-1', 'bg-blue-600', 'text-white', 'rounded');
    lastPageBtn.textContent = '>>';
    lastPageBtn.addEventListener('click', () => {
        currentPage = pageCount;
        renderPage(items, currentPage);
        updatePaginationButtons();
    });
    paginationContainer.appendChild(lastPageBtn);

    // Mettre à jour les boutons de pagination
    updatePaginationButtons();
}

// Mettre à jour les classes des boutons de pagination pour indiquer la page actuelle
function updatePaginationButtons() {
    const pageLinks = paginationContainer.querySelectorAll('.page-link');
    pageLinks.forEach(btn => {
        btn.classList.remove('bg-blue-800', 'font-bold');
        if (parseInt(btn.textContent) === currentPage) {
            btn.classList.add('bg-blue-800', 'font-bold');
        }
    });
}


// Gestion de la carte et des marqueurs
const map = L.map("map").setView([0, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
}).addTo(map);

map.on("click", function (e) {
    if (!departMarker) {
        departMarker = createMarker(e.latlng, "Lieu de départ");
        updateInputWithLocationName(e.latlng, "depart");
    } else if (!arriveeMarker) {
        arriveeMarker = createMarker(e.latlng, "Lieu d'arrivée");
        updateInputWithLocationName(e.latlng, "arrivee");
        calculateDistance(departMarker.getLatLng(), arriveeMarker.getLatLng());
    }
});

function createMarker(latlng, popupText) {
    return L.marker(latlng)
        .addTo(map)
        .bindPopup(popupText)
        .openPopup();
}

function updateInputWithLocationName(latlng, inputId) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
        .then((response) => response.json())
        .then((data) => {
            const locationName = data.display_name || `${latlng.lat}, ${latlng.lng}`;
            document.getElementById(inputId).value = locationName;
        })
        .catch((error) => {
            console.error("Error fetching location name:", error);
            document.getElementById(inputId).value = `${latlng.lat}, ${latlng.lng}`;
        });
}

function calculateDistance(start, end) {
    const R = 6371;
    const dLat = ((end.lat - start.lat) * Math.PI) / 180;
    const dLon = ((end.lng - start.lng) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((start.lat * Math.PI) / 180) * Math.cos((end.lat * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance = R * c;
    document.getElementById("distance").value = distance.toFixed(2);
}

choixSelect.addEventListener("change", function () {
    if (this.value === "poids" || this.value === "nombre") {
        showInputField("Entrez la valeur", "Entrez la valeur");
    } else {
        hideInputField();
    }
});

function showInputField(labelText, placeholderText) {
    champSaisi.classList.remove("hidden");
    labelValeur.textContent = labelText;
    inputValeur.placeholder = placeholderText;
    inputValeur.classList.remove("hidden");
}

function hideInputField() {
    champSaisi.classList.add("hidden");
    inputValeur.classList.add("hidden");
}

searchInput.addEventListener('input', filterItems);
updateItems(Array.from(document.querySelectorAll('#cargo-list tr')));

document.addEventListener("DOMContentLoaded", function () {
    // Initialiser la carte
    const map = L.map("map").setView([0, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
    }).addTo(map);

    let departMarker, arriveeMarker;

    map.on("click", function (e) {
        if (!departMarker) {
            departMarker = createMarker(e.latlng, "Lieu de départ");
            updateInputWithLocationName(e.latlng, "countryName");
        } else if (!arriveeMarker) {
            arriveeMarker = createMarker(e.latlng, "Lieu d'arrivée");
            updateInputWithLocationName(e.latlng, "arrivalCountry");
            calculateDistance(departMarker.getLatLng(), arriveeMarker.getLatLng());
        }
    });

    function createMarker(latlng, popupText) {
        return L.marker(latlng)
            .addTo(map)
            .bindPopup(popupText)
            .openPopup();
    }

    function updateInputWithLocationName(latlng, inputId) {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
            .then(response => response.json())
            .then(data => {
                const locationName = data.display_name || `${latlng.lat}, ${latlng.lng}`;
                document.getElementById(inputId).value = locationName;
            })
            .catch(error => {
                console.error("Error fetching location name:", error);
                document.getElementById(inputId).value = `${latlng.lat}, ${latlng.lng}`;
            });
    }

    function calculateDistance(start, end) {
        const R = 6371; // Rayon de la Terre en km
        const dLat = ((end.lat - start.lat) * Math.PI) / 180;
        const dLon = ((end.lng - start.lng) * Math.PI) / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((start.lat * Math.PI) / 180) * Math.cos((end.lat * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        document.getElementById("distance").value = distance.toFixed(2);
    }

    // Gestion des événements du modal
    const mapModal = document.getElementById("mapModal");
    const closeMapModal = document.getElementById("closeMapModal");

    closeMapModal.addEventListener("click", function () {
        mapModal.classList.add("hidden");
    });

    // Ajouter le bouton pour ouvrir le modal de la carte (à ajouter dans le HTML si nécessaire)
    const openMapModalBtn = document.getElementById("openMapModalBtn");
    if (openMapModalBtn) {
        openMapModalBtn.addEventListener("click", function () {
            mapModal.classList.remove("hidden");
            setTimeout(() => {
                map.invalidateSize();
            }, 100); // Assurez-vous que la carte est correctement redimensionnée
        });
    }

    // Réinitialiser le formulaire
    function resetForm() {
        departMarker = null;
        arriveeMarker = null;
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
        document.getElementById("countryName").value = '';
        document.getElementById("arrivalCountry").value = '';
        document.getElementById("distance").value = '';
    }

    // Gestion des boutons du formulaire
    const cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.addEventListener("click", resetForm);
});
