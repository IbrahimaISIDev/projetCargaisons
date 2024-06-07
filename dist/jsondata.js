document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('addCargoForm');
    const addCargoModal = document.getElementById('addCargoModal');
    const addCargoBtn = document.getElementById('addCargoBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const cargoList = document.getElementById('cargo-list');
    const searchInput = document.getElementById('searchInput');
    const paginationContainer = document.getElementById('pagination');
    const editCargoModal = document.getElementById('editCargoModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editCargoForm = document.getElementById('editCargoForm');
    const dateDepartInput = document.getElementById('departureDate'); // Modification de l'identifiant
    const dateArriveeInput = document.getElementById('arrivalDate'); // Modification de l'identifiant

    let currentPage = 1;
    const itemsPerPage = 5;
    let allItems = [];

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
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Récupération des éléments du DOM
        const transportType = document.querySelector('input[name="type"]:checked');
        const stopCriteria = document.getElementById("stopCriteria");
        const criteriaValue = document.getElementById("criteriaValue");
        const countryName = document.getElementById("countryName");
        const arrivalCountry = document.getElementById("arrivalCountry");
        const distance = document.getElementById("distance");
        const etat = "Ouvert"; // Valeur par défaut de l'état
        const statut = "En attente"; // Valeur par défaut du statut

        /*  // Validation du formulaire
        if (!validateForm(dateDepartInput, dateArriveeInput, stopCriteria, criteriaValue)) {
            // Si la validation échoue, ne pas soumettre le formulaire
            return;
        }
*/
        // Création d'un nouvel objet FormData
        const formData = new FormData();

        // Ajout des données du formulaire à l'objet FormData
        formData.append('action', 'addCargaison');
        formData.append('type', transportType.value);
        formData.append('dateDepart', dateDepartInput.value); // Utilisation de l'identifiant corrigé
        formData.append('dateArrivee', dateArriveeInput.value); // Utilisation de l'identifiant corrigé
        formData.append('stopCriteria', stopCriteria.value);
        formData.append('criteriaValue', criteriaValue.value);
        formData.append('countryName', countryName.value);
        formData.append('arrivalCountry', arrivalCountry.value);
        formData.append('distance', distance.value);
        formData.append('etat', etat);
        formData.append('statut', statut);

        fetch('../data/api.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert(data.message);
                    addCargoModal.style.display = 'none';
                    resetForm();

                    const newCargoId = data.id;
                    const newCargo = {
                        id: newCargoId,
                        type: transportType.value,
                        dateDepart: dateDepartInput.value,
                        dateArrivee: dateArriveeInput.value,
                        distance: distance.value,
                        etat: etat,
                        statut: statut
                    };

                    allItems.unshift(createNewCargoRow(newCargo));
                    renderPage(allItems, currentPage);
                    renderPagination(allItems);
                } else {
                    alert('Erreur lors de l\'ajout de la cargaison');
                }
            })
            .catch(error => console.error('Erreur:', error));
    });

    function createNewCargoRow(cargaison) {
        const newRow = document.createElement('tr');
        newRow.classList.add('border-b');
        newRow.innerHTML = `
                <td class="py-2 px-4">${cargaison.id}</td>
                <td class="py-2 px-4">${cargaison.type}</td>
                <td class="py-2 px-4">${cargaison.dateDepart}</td>
                <td class="py-2 px-4">${cargaison.dateArrivee}</td>
                <td class="py-2 px-4">${cargaison.distance}</td>
                <td class="py-2 px-4"><button class="bg-green-700 text-white font-bold px-4 py-2 rounded-lg">${cargaison.etat}</button></td>
                <td class="py-2 px-4"><button class="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg">${cargaison.statut}</button></td>
                <td class="py-2 px-4">
                    <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg">Voir</button>
                </td>
                <td class="py-2 px-4">
                    <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg editCargoBtn">Modifier</button>
                </td>
                <td class="py-2 px-4">
                    <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg" id="btnAddProduct"> + Produit</button>
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

    searchInput.addEventListener('input', filterItems);

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
        const pageItems = items.slice(start, end);

        pageItems.forEach(row => {
            cargoList.appendChild(row);
        });
    }

    // Afficher la pagination
    function renderPagination(items) {
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(items.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.classList.add('pagination-link');

            // Appliquer les styles directement
            pageLink.style.backgroundColor = 'blue';
            pageLink.style.color = 'white';
            pageLink.style.border = '1px solid blue';
            pageLink.style.borderRadius = '4px';
            pageLink.style.padding = '4px 8px';
            pageLink.style.margin = '5px';
            pageLink.style.fontWeight = 'bold';

            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                renderPage(items, i);
            });

            paginationContainer.appendChild(pageLink);
        }
    }

    // Réinitialiser le formulaire
    function resetForm() {
        form.reset();
    }

    // Charger et afficher les cargaisons au chargement de la page
    fetch('../data/api.php?action=getCargaisons')
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const cargaisons = data.cargaisons.map(cargaison => createNewCargoRow(cargaison));
                updateItems(cargaisons);
            } else {
                alert('Erreur lors du chargement des cargaisons');
            }
        })
        .catch(error => console.error('Erreur:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    // Création de la carte
    const map = L.map("map").setView([0, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
    }).addTo(map);

    let departMarker, arriveeMarker;

    // Ajout de marqueurs et gestion des noms de lieux
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
                if (inputId === "depart") {
                    document.getElementById("countryName").value = locationName;
                } else if (inputId === "arrivee") {
                    document.getElementById("arrivalCountry").value = locationName;
                } else {
                    console.error("Invalid inputId:", inputId);
                    // Gérer le cas où l'identifiant est incorrect
                }
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
});

document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const addProductBtn = document.getElementById('btnAddProduct');
    const addProductModal = document.getElementById('addProductModal');
    const addProductForm = document.getElementById('addProductForm');
    const btnAddProductInsideModal = document.getElementById('btnAddProductInsideModal');
    const closeModalBtns = document.querySelectorAll('#addProductModal .closeModal');

    // Show Add Product Modal
    addProductBtn.addEventListener('click', function () {
        addProductModal.style.display = 'flex';
    });

    // Hide Add Product Modal
    closeModalBtns.forEach(button => {
        button.addEventListener('click', function () {
            addProductModal.style.display = 'none';
        });
    });

    // Add Product Form Submit
    addProductForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Validate and add product
        addProduct();
    });

    // Example function to add product (implementation required)
    function addProduct() {
        // Your logic to add a product
        console.log('Product added');
        addProductModal.style.display = 'none';
    }

    // Move to next step
    document.getElementById('nextToStep2').addEventListener('click', function () {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    });

    document.getElementById('nextToStep3').addEventListener('click', function () {
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
    });

    // Move back to previous step
    document.getElementById('backToStep1').addEventListener('click', function () {
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step1').style.display = 'block';
    });

    document.getElementById('backToStep2').addEventListener('click', function () {
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    });
});




/* // Sélectionnez les éléments HTML nécessaires
const toggleModalBtn = document.querySelector('[data-modal-toggle="addProductModal"]');
const modal = document.getElementById('addProductModal');

// Ajoutez un gestionnaire d'événements pour afficher/masquer le modal
toggleModalBtn.addEventListener('click', () => {
    modal.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', function () {
    const modalToggleButtons = document.querySelectorAll('[data-modal-toggle]');

    modalToggleButtons.forEach(button => {
        const modalId = button.dataset.modalTarget;
        const modal = document.getElementById(modalId);

        button.addEventListener('click', function () {
            modal.classList.toggle('hidden');
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const modalToggleButtons = document.querySelectorAll('[data-modal-toggle]');

    modalToggleButtons.forEach(button => {
        const modalId = button.dataset.modalTarget;
        const modal = document.getElementById(modalId);

        button.addEventListener('click', function () {
            modal.classList.toggle('hidden');
        });
    });
}); */

/* document.addEventListener("DOMContentLoaded", function () {
    const addProductModal = document.getElementById("addProductModal");
    const btnAddProduct = document.getElementById("btnAddProduct"); // Bouton pour ouvrir le modal
    const btnAddProductInsideModal = document.getElementById("btnAddProductInsideModal"); // Bouton à l'intérieur du modal
    const addProductForm = document.getElementById("addProductForm");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");
    const nextToStep2 = document.getElementById("nextToStep2");
    const nextToStep3 = document.getElementById("nextToStep3");
    const backToStep1 = document.getElementById("backToStep1");
    const backToStep2 = document.getElementById("backToStep2");

    // Ajouter un gestionnaire d'événements au bouton "+ Produit" pour ouvrir le modal
    if (btnAddProduct) {
        btnAddProduct.addEventListener("click", function () {
            addProductModal.classList.remove("hidden");
        });
    } else {
        console.error("Le bouton 'Ajouter un Produit' n'a pas été trouvé.");
    }

    // Ajouter un gestionnaire d'événements au bouton à l'intérieur du modal pour soumettre le formulaire
    if (btnAddProductInsideModal) {
        btnAddProductInsideModal.addEventListener("click", function () {
            // Code pour soumettre le formulaire (AJAX, fetch, etc.)
            // Vous pouvez récupérer les valeurs des champs avec addProductForm.elements
            // et les envoyer à votre backend pour traitement
            // Une fois le traitement terminé, vous pouvez fermer le modal ou effectuer d'autres actions nécessaires
            addProductModal.classList.add("hidden");
        });
    } else {
        console.error("Le bouton 'Ajouter un Produit' à l'intérieur du modal n'a pas été trouvé.");
    }

    // Afficher la deuxième étape et masquer la première
    nextToStep2.addEventListener("click", function () {
        step1.classList.add("hidden");
        step2.classList.remove("hidden");
    });

    // Afficher la troisième étape et masquer la deuxième
    nextToStep3.addEventListener("click", function () {
        step2.classList.add("hidden");
        step3.classList.remove("hidden");
    });

    // Retourner à la première étape depuis la deuxième
    backToStep1.addEventListener("click", function () {
        step2.classList.add("hidden");
        step1.classList.remove("hidden");
    });

    // Retourner à la deuxième étape depuis la troisième
    backToStep2.addEventListener("click", function () {
        step3.classList.add("hidden");
        step2.classList.remove("hidden");
    });

    // Soumettre le formulaire
    addProductForm.addEventListener("submit", function (event) {
        event.preventDefault();
        // Code pour soumettre le formulaire (AJAX, fetch, etc.)
        // Vous pouvez récupérer les valeurs des champs avec addProductForm.elements
        // et les envoyer à votre backend pour traitement
        // Une fois le traitement terminé, vous pouvez fermer le modal ou effectuer d'autres actions nécessaires
        addProductModal.classList.add("hidden");
    });
});


// Sélectionnez tous les boutons "+ Produit" dans le tableau
const btnAddProduct = document.querySelectorAll("#btnAddProduct");

// Ajoutez un écouteur d'événements pour chaque bouton "+ Produit"
btnAddProduct.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        event.preventDefault(); // Empêche le comportement par défaut du bouton (comme le rechargement de la page)

        // Affichez le modal d'ajout de produit
        // Assurez-vous que votre modal a l'ID "addProductModal"
        document.getElementById("addProductModal").classList.remove("hidden");
        document.getElementById("addProductModal").classList.add("flex");

        // Vous pouvez également ajouter du code ici pour récupérer des informations spécifiques à la ligne du tableau sur laquelle le bouton a été cliqué, si nécessaire.
    });
}); */



/* function validateForm(dateDepartInput, dateArriveeInput, stopCriteriaSelect, criteriaValueInput) {
    clearErrors();
    let isValid = true;

    const selectedType = getSelectedType();
    if (!selectedType) {
        showError('typeError', 'Veuillez choisir un type de cargaison.');
        isValid = false;
    }

    const now = new Date().toISOString().split('T')[0];
    if (dateDepartInput.value < now) {
        showError('dateDepartError', 'La date de départ ne doit pas être inférieure à la date actuelle.');
        isValid = false;
    }

    if (dateArriveeInput.value <= dateDepartInput.value) {
        showError('dateArriveeError', 'La date d\'arrivée doit être supérieure à la date de départ.');
        isValid = false;
    }

    if (stopCriteriaSelect.value && criteriaValueInput.value <= 0) {
        showError('criteriaValueError', 'La valeur doit être positive.');
        isValid = false;
    }
    if (!criteriaValueInput.value) {
        showError('criteriaValueError', 'Le champ ne doit pas être vide.');
        isValid = false;
    }
    return isValid;
}


function clearErrors() {
    document.getElementById('typeError').textContent = '';
    document.getElementById('dateDepartError').textContent = '';
    document.getElementById('dateArriveeError').textContent = '';
    document.getElementById('criteriaValueError').textContent = '';
    document.getElementById('mapError').textContent = '';
}

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}
 */