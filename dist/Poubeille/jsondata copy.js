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
    let distanceValue = null;
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

        // Ajout des données du formulaire à l'objet FormData
        formData.append('action', 'addCargaison');

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
                        const modal = document.getElementById('addCargoModal');
                        modal.style.display = 'none';

                        // Déclaration de l'événement personnalisé à l'intérieur de la fonction
                        const newCargoEvent = new CustomEvent('newCargo', {
                            detail: {
                                cargaison: {
                                    id: data.id,
                                    type: transportType.value,
                                    dateDepart: departureDate.value,
                                    dateArrivee: arrivalDate.value,
                                    distance: distance.value,
                                    etat: etat,
                                    statut: statut
                                }
                            }
                        });

                        // Déclencher l'événement
                        window.dispatchEvent(newCargoEvent);

                        // Actualiser la liste des cargaisons
                        const newRow = createNewCargoRow({
                            id: data.id,
                            type: transportType.value,
                            dateDepart: departureDate.value,
                            dateArrivee: arrivalDate.value,
                            distance: distance.value,
                            etat: etat,
                            statut: statut
                        });
                        cargoList.insertBefore(newRow, cargoList.firstChild);
                    } else {
                        alert('Erreur lors de l\'ajout de la cargaison');
                    }
                } catch (e) {
                    console.error('Erreur de parsing JSON:', e, text);
                }
            })
            .catch(error => console.error('Erreur:', error));
    });

    // Créer un événement personnalisé
    const newCargoEvent = new CustomEvent('newCargo', {
        detail: {
            cargaison: {
                id: data.id,
                type: transportType.value,
                dateDepart: departureDate.value,
                dateArrivee: arrivalDate.value,
                distance: distance.value,
                etat: etat,
                statut: statut
            }
        }
    });

    // Déclencher l'événement
    window.dispatchEvent(newCargoEvent);

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
                <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg addProductBtn"> + Produit</button>
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

