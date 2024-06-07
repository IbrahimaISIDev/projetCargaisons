<!-- <style>
    #top-left-modal {
        display: none;
        /* Hide the modal by default */
    }
</style> -->
<style>
    #addCargoModal {
        background-color: rgba(0, 0, 0, 0.5);
        /* Fond semi-transparent */
        display: none;
        /* Autres styles */
    }
</style>
<style>
    #addCargoModal {
        background-color: rgba(0, 0, 0, 0.5);
        /* Fond semi-transparent */
        display: none;
    }

    #editCargoModal {
        background-color: rgba(0, 0, 0, 0.5);
        /* Fond semi-transparent */
        display: none;
    }
</style>

<div class="p-4 mt-8 sm:ml-64">
    <!-- Dashboard  Start-->
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-5xl font-bold text-center text-gray-900">
                    Gestion des Cargaisons
                </h1>
            </div>
        </header>
        <main class="flex-1 p-6">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <!-- Statistiques Clés -->
                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex items-center">
                        <span class="block-shrink-0 bg-indigo-500 rounded-full p-5">
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </span>
                        <div class="ml-6">
                            <h3 class="text-2xl mb-2 font-bold text-gray-900 ">
                                Cargaisons en cours</h3>
                            <p class="text-5xl font-bold text-gray-900" id="nbEnCours">24</p>
                            <div class="mt-6">
                                <a href="#" class="inline-flex items-center px-3 py-3 text-lg font-bold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="allDetailsEnCOurs">
                                    Voir les détails
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-green-500 rounded-full p-5">
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </div>
                        <div class="ml-6">
                            <h3 class="text-2xl mb-2 font-bold text-gray-900">Cargaisons terminées</h3>
                            <p class="text-5xl font-bold text-gray-900" id="terminés">120</p></span>
                            <a href="#" class="inline-flex items-center px-3 py-3 text-lg font-bold mt-6 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="allFinishDetails">
                                Voir les détails
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-red-500 rounded-full p-5">
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </div>
                        <div class="ml-6">
                            <h3 class="text-2xl font-bold mb-2 text-gray-900">Notifications</h3>
                            <p class="text-5xl font-bold text-gray-900" id="nbNotifications">5</p>
                            <a href="#" class="inline-flex items-center px-3 py-3 text-lg mt-6 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Voir les détails
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="min-h-screen max-w-12xl bg-gray-100 py-6">
                <div class="max-w-full mx-auto bg-white shadow rounded-lg p-6">
                    <span class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold bg-b text-gray-900 mb-4">Liste des Cargaisons</h2>
                        <span>
                            <button class="bg-blue-800 text-xl text-white font-bold px-4 py-2 rounded-lg" id="addCargoBtn" type="button">Add</button>
                            <button class="bg-blue-800 text-xl text-white font-bold px-4 py-2 rounded-lg mb-2" id="viewCargoBtn">View</button>
                        </span>
                    </span>
                    <div class="mb-4">
                        <span class="flex gap-2 justify-center">
                            <input class="border border-gray-300 p-3 rounded-lg w-full" type="text" placeholder="Rechercher..." id="searchInput">
                            <button class="bg-blue-800 text-white px-6 py-2 font-bold text-xl rounded-lg" onclick="search()">Rechercher</button>
                        </span>
                    </div>
                    <table class="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th class="py-2 px-4 bg-gray-200 text-left">ID</th>
                                <th class="py-2 px-4 bg-gray-200 text-left">Type</th>
                                <th class="py-2 px-4 bg-gray-200 text-left">Date départ</th>
                                <th class="py-2 px-4 bg-gray-200 text-left">Date d'arrivée</th>
                                <th class="py-2 px-4 bg-gray-200 text-left">Distance(Km)</th>
                                <th class="py-2 px-4 bg-gray-200 text-left">État</th>
                                <th class="py-2 px-4 bg-gray-200 text-left">Status</th>
                                <th class="py-2 px-4 bg-gray-200 text-left">Détails</th>
                                <th class="py-2 px-4 bg-gray-200 text-left">Modifier</th>
                                <th class="py-2 px-4 bg-gray-200 text-left">Ajouter</th>
                            </tr>
                        </thead>
                        <tbody id="cargo-list">
                            <!-- Les lignes seront ajoutées dynamiquement -->
                        </tbody>
                    </table>
                    <div id="pagination" class="flex justify-end mt-4 bg-gray-400"></div>
                </div>
            </div>

            <!-- Modal pour ajouter une cargaison -->
            <!--             <div id="addCargoModal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50" style="display: none;">
 -->
            <div id="addCargoModal" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50" style="display:none;">

                <div class="bg-white rounded-lg p-4 relative w-full max-w-2xl">
                    <h1 class="text-4xl font-bold mb-6 flex items-center justify-center">Ajouter une Cargaison</h1>
                    <form id="addCargoForm" class="space-y-4">
                        <div>
                            <div class="mt-2 space-y-2 text-xl" id="transportType">
                                <label class="inline-flex items-center">
                                    <input type="radio" name="type" value="Maritime" class="form-radio">
                                    <span class="ml-4 mr-4 font-bold">Maritime</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" name="type" value="Terrestre" class="form-radio">
                                    <span class="ml-4 mr-4 font-bold">Terrestre</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" name="type" value="Aérienne" class="form-radio">
                                    <span class="ml-4 mr-4 font-bold">Aérienne</span>
                                </label>
                            </div>
                            <span id="typeError" class="text-red-500"></span>
                        </div>
                        <div class="flex justify-between">
                            <span>
                                <label class="block text-lg font-medium text-gray-700" id="departureDate">Date de Départ</label>
                                <input type="date" id="departureDate" name="dateDepart" class="mt-1 block w-72 border-gray-300 rounded-md mb-3 shadow-lg p-3">
                                <span id="dateDepartError" class="text-red-500"></span>
                            </span>
                            <span>
                                <label class="block text-lg font-medium text-gray-700">Date d'Arrivée</label>
                                <input type="date" id="arrivalDate" name="dateArrivee" class="mt-1 block w-72 border-gray-300 rounded-md shadow-lg p-3">
                                <span id="dateArriveeError" class="text-red-500"></span>
                            </span>
                        </div>
                        <div>
                            <label class="block text-xl mb-2 font-medium text-gray-700">Limite du chargement</label>
                            <select id="stopCriteria" class="mt-1 block w-full border-gray-300 rounded-md shadow-lg p-3">
                                <option value="nombre" id="maxProducts">Nombre Total de Produits</option>
                                <option value="masse" id="maxWeight">Masse Totale des Produits</option>
                                <span id="optionError" class="text-red-500"></span>
                            </select>
                            <input type="number" id="criteriaValue" class="mt-4 block w-full border-gray-300 rounded-md shadow-lg p-3" placeholder="Entrez la valeur">
                            <span id="criteriaValueError" class="text-red-500"></span>
                        </div>
                        <!-- Ajoutez ce code HTML dans votre fichier -->
                        <div id="mapModal" class="hidden fixed z-10 inset-0 overflow-y-auto">
                            <div class="flex items-center justify-center min-h-screen">
                                <div class="bg-white rounded-lg shadow-lg p-6">
                                    <div id="mapContainer" class="h-96 w-96"></div>
                                    <button id="closeMapModal" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="map">
                            <label class="block text-xl mb-2 font-medium text-gray-700">Choisir le Trajet</label>
                            <div id="map" class="w-full h-64 bg-gray-200"></div>
                            <span class="flex justify-between mb-2">
                                <input type="text" id="countryName" class="mt-1 w-72 border-gray-300 rounded-md shadow-lg" readonly>
                                <input type="text" id="arrivalCountry" class="mt-1 w-72 border-gray-300 rounded-md shadow-lg" readonly>
                            </span>
                            <span id="mapError" class="text-red-500"></span>
                        </div>
                        <div>
                            <label class="block text-lg font-medium text-gray-700">Distance(Km)</label>
                            <input type="text" id="distance" name="distance" class="mt-1 block w-full border-gray-300 rounded-md shadow-lg" readonly>
                        </div>
                        <div id="message" class="text-red-500"></div>
                        <div class="flex justify-between">
                            <button type="button" class="bg-red-500 text-white px-4 py-2 rounded" id="cancelBtn">Annuler</button>
                            <button id="addCargoBtn" type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>


            <!-- Modal pour la modification de cargaison -->
            <div id="editCargoModal" class="flex fixed inset-0 bg-gray-900 bg-opacity-75 items-center justify-center z-50" style="display: none;">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="bg-white rounded-lg p-6 w-96 max-w-3xl">
                        <h3 class="text-2xl font-bold mb-4">Modifier la cargaison</h3>
                        <form id="editCargoForm">
                            <input type="hidden" id="editCargoId">
                            <div class="mb-4">
                                <label for="editType" class="block text-sm font-bold mb-2">Type:</label>
                                <input type="text" id="editType" class="border p-2 rounded-lg w-full">
                            </div>
                            <div class="mb-4">
                                <label for="editDateDepart" class="block text-sm font-bold mb-2">Date de
                                    départ:</label>
                                <input type="date" id="editDateDepart" class="border p-2 rounded-lg w-full">
                            </div>
                            <div class="mb-4">
                                <label for="editDateArrivee" class="block text-sm font-bold mb-2">Date
                                    d'arrivée:</label>
                                <input type="date" id="editDateArrivee" class="border p-2 rounded-lg w-full">
                            </div>
                            <div class="mb-4">
                                <label for="editEtat" class="block text-sm font-bold mb-2">État:</label>
                                <select id="editEtat" class="border p-2 rounded-lg w-full">
                                    <option value="">Veuillez choisir un état</option>
                                    <option value="Ouvert">Ouvert</option>
                                    <option value="Fermé">Fermé</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label for="editStatus" class="block text-sm font-bold mb-2">Status:</label>
                                <select id="editStatus" class="border p-2 rounded-lg w-full">
                                    <option value="">Veuillez choisir un status</option>
                                    <option value="En attente">En attente</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Terminé">Terminé</option>
                                </select>
                            </div>

                            <div class="flex justify-between">
                                <button type="button" id="cancelEditBtn" class="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Annuler</button>
                                <button type="submit" class="bg-blue-800 text-white px-4 py-2 rounded-lg">Enregistrer</button>
                            </div>
                            <button id="deleteCargoBtn" class="bg-red-800 text-lg font-bold text-white px-4 py-2 rounded-lg mt-6 w-full">Supprimer</button>
                        </form>
                    </div>
                </div>
            </div>

    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js" integrity="sha512-WpK/HU8oG0I5KFQ7xOpi7zpF+U9vOB+N4u1+Q6kLOp6dhXtl1nFUVHvA/P/V0kmvR4J2y3WqK0rDmiIvTb1gIQ==" crossorigin=""></script>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const addCargoModal = document.getElementById('addCargoModal');
            const addCargoBtn = document.getElementById('addCargoBtn');
            const cancelBtn = document.getElementById('cancelBtn');
            const addCargoForm = document.getElementById('addCargoForm');
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
            const itemsPerPage = 3;
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

                const newRow = createNewCargoRow(cargoId, type, dateDepart, dateArrivee, distance.toFixed(2));
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
                map.eachLayer(function(layer) {
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
            function createNewCargoRow(id, type, dateDepart, dateArrivee, distance) {
                const newRow = document.createElement('tr');
                newRow.classList.add('border-b');
                newRow.innerHTML = `
                <td class="py-2 px-4">${id}</td>
                <td class="py-2 px-4">${type}</td>
                <td class="py-2 px-4">${dateDepart}</td>
                <td class="py-2 px-4">${dateArrivee}</td>
                <td class="py-2 px-4">${distance}</td>
                <td class="py-2 px-4"><button>Ouvert</button></td>
                <td class="py-2 px-4"><button>En attente</button></td>
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

                newRow.querySelector('.editCargoBtn').addEventListener('click', () => {
                    const cells = newRow.querySelectorAll('td');
                    document.getElementById('editCargoId').value = cells[0].textContent;
                    document.getElementById('editType').value = cells[1].textContent;
                    document.getElementById('editDateDepart').value = cells[2].textContent;
                    document.getElementById('editDateArrivee').value = cells[3].textContent;

                    editCargoModal.style.display = 'flex';
                });

                return newRow;
            }

            // Filtrer les éléments affichés
            function filterItems() {
                const filterText = searchInput.value.toLowerCase();
                const filteredItems = allItems.filter(row => {
                    const cells = row.querySelectorAll('td');
                    return Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filterText));
                });

                renderPage(filteredItems, 1);
                renderPagination(filteredItems);
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
            function renderPagination(items) {
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
            }

            // Gestion de la carte et des marqueurs
            const map = L.map("map").setView([0, 0], 2);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 18,
            }).addTo(map);

            map.on("click", function(e) {
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

            choixSelect.addEventListener("change", function() {
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
        });
    </script>
    <script src="dist/jsondata.js"></script>
    <script src="dist/addCargo1.js"></script>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

    <!--  <script>
        // Fonction pour afficher le modal
        function afficherModalAjoutCargaison() {
            var modal = document.getElementById("addCargoModal");
            modal.style.display = "block"; // Afficher le modal
        }

        // Attacher la fonction à un événement, par exemple un clic sur un bouton
        document.getElementById("addCargoBtn").addEventListener("click", afficherModalAjoutCargaison);

        document.addEventListener('DOMContentLoaded', () => {
            const addCargoBtn = document.getElementById('addCargoBtn');
            const addCargoModal = document.getElementById('addCargoModal');
            const cancelBtn = document.getElementById('cancelBtn');
            const addCargoForm = document.getElementById('addCargoForm');
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
            let pointDepart = null;
            let pointArrivee = null;

            const itemsPerPage = 3; // Nombre d'éléments par page
            let currentPage = 1; // Page actuelle
            let allItems = []; // Tous les éléments cargo

            const cargoCounters = {
                maritime: 0,
                aerien: 0,
                terrestre: 0
            };


            addCargoBtn.addEventListener('click', () => {
                addCargoModal.classList.remove('hidden');
            });

            cancelBtn.addEventListener('click', () => {
                addCargoModal.style.display = "none";
                resetForm();
            });

            cancelEditBtn.addEventListener('click', () => {
                editCargoModal.style.display = "none";
                editCargoForm.reset();
            });

            addCargoForm.addEventListener('submit', (e) => {
                e.preventDefault();

                /*  if (!validateForm()) {
                     return;
                 } */

                const type = addCargoForm.type.value;
                const dateDepart = addCargoForm.dateDepart.value;
                const dateArrivee = addCargoForm.dateArrivee.value;
                const stopCriteria = addCargoForm.stopCriteria.value;
                const criteriaValue = addCargoForm.criteriaValue.value;
                console.log(type);
                console.log(dateArrivee);
                console.log(dateDepart);
                const cargoId = generateCargoId(type);

                const newRow = createNewCargoRow(cargoId, type, dateDepart, dateArrivee, distance);
                allItems.unshift(newRow);
                updateItems(allItems);
                renderPage(allItems, 1); // Afficher la première page

                addCargoModal.classList.add('hidden');
                addCargoForm.reset();
                resetForm();
            });

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

                editCargoModal.classList.add('hidden');
                updateItems(allItems);
            });

            deleteCargoBtn.addEventListener('click', () => {
                const cargoId = document.getElementById('editCargoId').value;
                const rowIndex = allItems.findIndex(row => row.querySelector('td').textContent === cargoId);
                if (rowIndex !== -1) {
                    allItems.splice(rowIndex, 1);
                    updateItems(allItems);
                }
                editCargoModal.classList.add('hidden');
            });

            /*   function resetForm() {
                  dateDepartInput.value = '';
                  dateArriveeInput.value = '';
                  stopCriteriaSelect.value = '';
                  criteriaValueInput.value = '';
                  document.getElementById('depart').value = '';
                  document.getElementById('arrivee').value = '';
                  departMarker = null;
                  arriveeMarker = null;
                  map.eachLayer(function(layer) {
                      if (layer instanceof L.Marker) {
                          map.removeLayer(layer);
                      }
                  });
              } */

            function generateCargoId(type) {
                if (!cargoCounters[type]) {
                    cargoCounters[type] = 0;
                }
                cargoCounters[type]++;
                return `${type.charAt(0).toUpperCase()}${cargoCounters[type].toString().padStart(3, '0')}`;
            }

            function createNewCargoRow(id, type, dateDepart, dateArrivee, distance) {
                const newRow = document.createElement('tr');
                newRow.classList.add('border-b');
                newRow.innerHTML = `
            <td class="py-2 px-4">${id}</td>
            <td class="py-2 px-4">${type}</td>
            <td class="py-2 px-4">${dateDepart}</td>
            <td class="py-2 px-4">${dateArrivee}</td>
            <td class="py-2 px-4">${distance}</td>
            <td class="py-2 px-4"><button>Ouvert</button></td>
            <td class="py-2 px-4"><button>En attente</button></td>
            <td class="py-2 px-4">
                <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg">Voir</button>
            </td>
            <td class="py-2 px-4">
                <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg editCargoBtn">
                Modifier
            </button>
        </td>
    `;

                newRow.querySelector('.editCargoBtn').addEventListener('click', () => {
                    const cells = newRow.querySelectorAll('td');
                    document.getElementById('editCargoId').value = cells[0].textContent;
                    document.getElementById('editType').value = cells[1].textContent;
                    document.getElementById('editDateDepart').value = cells[2].textContent;
                    document.getElementById('editDateArrivee').value = cells[3].textContent;

                    editCargoModal.classList.remove('hidden');
                });

                return newRow;
            }

            function filterItems() {
                const filterText = searchInput.value.toLowerCase();
                const filteredItems = allItems.filter(row => {
                    const cells = row.querySelectorAll('td');
                    return Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filterText));
                });

                renderPage(filteredItems, 1); // Toujours réinitialiser à la première page après le filtrage
                renderPagination(filteredItems);
            }

            function updateItems(items) {
                allItems = items;
                filterItems(); // Mettre à jour les éléments affichés en fonction du filtre actuel
            }

            function renderPage(items, page) {
                cargoList.innerHTML = '';
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const paginatedItems = items.slice(start, end);
                for (const item of paginatedItems) {
                    cargoList.appendChild(item);
                }
            }

            function renderPagination(items) {
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
            }

            searchInput.addEventListener('input', filterItems);
            updateItems(Array.from(document.querySelectorAll('#cargo-list tr')));

            // Reste du code pour la carte, la pagination, le filtrage, etc.
            const map = L.map("map").setView([0, 0], 2);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 18,
            }).addTo(map);

            let departMarker, arriveeMarker;

            map.on("click", function(e) {
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

            let distance = null;

            function calculateDistance(start, end) {
                const R = 6371; // Earth's radius in km
                const dLat = ((end.lat - start.lat) * Math.PI) / 180;
                const dLon = ((end.lng - start.lng) * Math.PI) / 180;
                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos((start.lat * Math.PI) / 180) * Math.cos((end.lat * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                distance = R * c;
                document.getElementById("distance").value = distance.toFixed(2);
            }

            const choixSelect = document.getElementById("choix");
            const champSaisi = document.getElementById("champ-saisi");
            const labelValeur = document.querySelector("#champ-saisi label");
            const inputValeur = document.getElementById("valeur");

            choixSelect.addEventListener("change", function() {
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

        });
    </script>
    <script src="dist/addCargo1.js"></script>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script> -->

    </body>

    </html>