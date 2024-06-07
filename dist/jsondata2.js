document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addCargoForm");
    const addCargoModal = document.getElementById("addCargoModal");
    const addCargoBtn = document.getElementById("addCargoBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const cargoList = document.getElementById("cargo-list");
    const searchInput = document.getElementById("searchInput");
    const paginationContainer = document.getElementById("pagination");
    const editCargoModal = document.getElementById("editCargoModal");
    const cancelEditBtn = document.getElementById("cancelEditBtn");
    const editCargoForm = document.getElementById("editCargoForm");
    const statusModal = document.getElementById("statusModal");
    const cancelStatusBtn = document.getElementById("cancelStatusBtn");

    let currentPage = 1;
    const itemsPerPage = 5;
    let allItems = [];

    // Afficher et masquer le modal de statut
    statusModal.addEventListener("click", () => {
        statusModal.style.display = "flex";
    });

    cancelStatusBtn.addEventListener("click", () => {
        statusModal.style.display = "none";
    });

    // Afficher et masquer le modal d'ajout de cargaison
    addCargoBtn.addEventListener("click", () => {
        addCargoModal.style.display = "flex";
    });

    cancelBtn.addEventListener("click", () => {
        addCargoModal.style.display = "none";
        resetForm();
    });

    // Afficher et masquer le modal de modification de cargaison
    cancelEditBtn.addEventListener("click", () => {
        editCargoModal.style.display = "none";
        editCargoForm.reset();
    });

    // Soumettre le formulaire d'ajout de cargaison
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const transportType = document.querySelector('input[name="type"]:checked');
        const stopCriteria = document.getElementById("stopCriteria");
        const criteriaValue = document.getElementById("criteriaValue");
        const countryName = document.getElementById("countryName");
        const arrivalCountry = document.getElementById("arrivalCountry");
        const distance = document.getElementById("distance");

        const etat = document.getElementById("etatSelect").value;
        const statut = document.getElementById("statutSelect").value;

        const dateDepartInput = document.getElementById("departureDate");
        const dateArriveeInput = document.getElementById("arrivalDate");

        const formData = new FormData();

        formData.append("action", "addCargaison");
        formData.append("type", transportType.value);
        formData.append("dateDepart", dateDepartInput.value);
        formData.append("dateArrivee", dateArriveeInput.value);
        formData.append("stopCriteria", stopCriteria.value);
        formData.append("criteriaValue", criteriaValue.value);
        formData.append("countryName", countryName.value);
        formData.append("arrivalCountry", arrivalCountry.value);
        formData.append("distance", distance.value);
        formData.append("etat", etat);
        formData.append("statut", statut);

        fetch("../data/api.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    alert(data.message);
                    addCargoModal.style.display = "none";
                    resetForm();

                    const newCargoId = data.id;
                    const newCargo = {
                        id: newCargoId,
                        type: transportType.value,
                        dateDepart: dateDepartInput.value,
                        dateArrivee: dateArriveeInput.value,
                        distance: distance.value,
                        etat: etat,
                        statut: statut,
                    };

                    allItems.unshift(createNewCargoRow(newCargo));
                    renderPage(allItems, currentPage);
                    renderPagination(allItems);
                    filterItems();
                } else {
                    alert("Erreur lors de l'ajout de la cargaison");
                }
            })
            .catch((error) => console.error("Erreur:", error));
    });

    function createNewCargoRow(cargaison) {
        const newRow = document.createElement("tr");
        newRow.classList.add("border-b");
        newRow.innerHTML = `
              <td class="py-2 px-4">${cargaison.id}</td>
              <td class="py-2 px-4">${cargaison.type}</td>
              <td class="py-2 px-4">${cargaison.dateDepart}</td>
              <td class="py-2 px-4">${cargaison.dateArrivee}</td>
              <td class="py-2 px-4">${cargaison.distance}</td>
              <td class="py-2 px-4"><button class="bg-green-700 text-white font-bold px-4 py-2 rounded-lg etatBtn">${cargaison.etat}</button></td>
              <td class="py-2 px-4"><button class="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg statutBtn">${cargaison.statut}</button></td>
              <td class="py-2 px-4">
                  <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg viewCargoBtn">Voir</button>
                  </td>
              <td class="py-2 px-4">
                  <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg editCargoBtn">Modifier</button>
              </td>
              <td class="py-2 px-4">
                  <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg addProductBtn">+ Produit</button>
              </td>
          `;

        newRow.querySelector(".etatBtn").addEventListener("click", function () {
            toggleEtatBtn(this);
        });

        newRow.querySelector(".statutBtn").addEventListener("click", function () {
            showStatusModal(this);
        });

        newRow.querySelector(".editCargoBtn").addEventListener("click", () => {
            const cells = newRow.querySelectorAll("td");
            document.getElementById("editCargoId").value = cells[0].textContent;
            document.getElementById("editType").value = cells[1].textContent;
            document.getElementById("editDateDepart").value = cells[2].textContent;
            document.getElementById("editDateArrivee").value = cells[3].textContent;

            editCargoModal.style.display = "flex";
        });

        return newRow;
    }

    function toggleEtatBtn(btn) {
        if (btn.innerHTML === "Ouvert") {
            btn.innerHTML = "Fermé";
            btn.classList.remove("bg-green-700");
            btn.classList.add("bg-red-700");
        } else {
            btn.innerHTML = "Ouvert";
            btn.classList.remove("bg-red-700");
            btn.classList.add("bg-green-700");
        }
    }

    function showStatusModal(btn) {
        const currentStatus = btn.innerHTML;
        const modal = document.createElement("div");
        modal.innerHTML = `
              <div class="modal-backdrop"></div>
              <div class="modal">
                  <h2>Changer le statut</h2>
                  <select id="newStatus">
                      <option value="En attente" ${currentStatus === "En attente" ? "selected" : ""}>En attente</option>
                      <option value="En cours" ${currentStatus === "En cours" ? "selected" : ""}>En cours</option>
                      <option value="Terminé" ${currentStatus === "Terminé" ? "selected" : ""}>Terminé</option>
                  </select>
                  <button id="applyStatusChange">Appliquer</button>
                  <button id="cancelStatusChange">Annuler</button>
              </div>
          `;
        document.body.appendChild(modal);

        modal.querySelector("#applyStatusChange").addEventListener("click", () => {
            const newStatus = document.getElementById("newStatus").value;
            updateStatusBtn(btn, newStatus);
            modal.remove();
        });

        modal.querySelector("#cancelStatusChange").addEventListener("click", () => {
            modal.remove();
        });
    }

    function updateStatusBtn(btn, newStatus) {
        btn.innerHTML = newStatus;
        btn.classList.remove("bg-gray-700", "bg-yellow-700", "bg-green-700");
        if (newStatus === "En attente") {
            btn.classList.add("bg-gray-700");
        } else if (newStatus === "En cours") {
            btn.classList.add("bg-yellow-700");
        } else if (newStatus === "Terminé") {
            btn.classList.add("bg-green-700");
        }
    }

    // Filtrer les éléments affichés
    function filterItems() {
        const filterText = searchInput.value.toLowerCase();
        if (filterText.length >= 3) {
            const filteredItems = allItems.filter((row) => {
                const cells = row.querySelectorAll("td");
                return Array.from(cells).some((cell) =>
                    cell.textContent.toLowerCase().includes(filterText)
                );
            });

            renderPage(filteredItems, 1);
            renderPagination(filteredItems);
        } else {
            renderPage(allItems, currentPage);
            renderPagination(allItems);
        }
    }

    searchInput.addEventListener("input", filterItems);

    // Mettre à jour les éléments affichés
    function updateItems(items) {
        allItems = items;
        filterItems();
    }

    // Afficher une page spécifique
    function renderPage(items, page) {
        cargoList.innerHTML = "";
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = items.slice(start, end);

        pageItems.forEach((row) => {
            cargoList.appendChild(row);
        });
    }

    function renderPagination(items) {
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(items.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement("a");
            pageLink.href = "#";
            pageLink.textContent = i;
            pageLink.classList.add("pagination-link");

            // Appliquer les styles directement
            pageLink.style.backgroundColor = "blue";
            pageLink.style.color = "white";
            pageLink.style.border = "1px solid blue";
            pageLink.style.borderRadius = "4px";
            pageLink.style.padding = "4px 8px";
            pageLink.style.margin = "5px";
            pageLink.style.fontWeight = "bold";

            pageLink.addEventListener("click", (e) => {
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
    fetch("../data/api.php?action=getCargaisons")
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                const cargaisons = data.cargaisons.map((cargaison) =>
                    createNewCargoRow(cargaison)
                );
                updateItems(cargaisons);
            } else {
                alert("Erreur lors du chargement des cargaisons");
            }
        })
        .catch((error) => console.error("Erreur:", error));
});

document.addEventListener("DOMContentLoaded", () => {
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
            .then((response) => response.json())
            .then((data) => {
                const locationName =
                    data.display_name || `${latlng.lat}, ${latlng.lng}`;
                document.getElementById(inputId).value = locationName;
            })
            .catch((error) => {
                console.error("Error fetching location name:", error);
                document.getElementById(inputId).value = `${latlng.lat}, ${latlng.lng}`;
            });
    }

    function calculateDistance(start, end) {
        const R = 6371; // Earth's radius in km
        const dLat = ((end.lat - start.lat) * Math.PI) / 180;
        const dLon = ((end.lng - start.lng) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((start.lat * Math.PI) / 180) *
            Math.cos((end.lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        document.getElementById("distance").value = distance.toFixed(2) + " km";
    }

    document
        .getElementById("resetMarkers")
        .addEventListener("click", () => {
            if (departMarker) {
                map.removeLayer(departMarker);
                departMarker = null;
            }
            if (arriveeMarker) {
                map.removeLayer(arriveeMarker);
                arriveeMarker = null;
            }
            document.getElementById("countryName").value = "";
            document.getElementById("arrivalCountry").value = "";
            document.getElementById("distance").value = "";
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addCargoForm");
    const addCargoModal = document.getElementById("addCargoModal");
    const allItems = [];
    let currentPage = 1;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("../data/api.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    alert(data.message);
                    addCargoModal.style.display = "none";
                    resetForm();
                    const newCargo = {
                        id: data.id,
                        type: formData.get("type"),
                        dateDepart: formData.get("dateDepart"),
                        dateArrivee: formData.get("dateArrivee"),
                        distance: formData.get("distance"),
                        etat: formData.get("etat"),
                        statut: formData.get("statut"),
                    };
                    allItems.unshift(createNewCargoRow(newCargo));
                    filterItems();
                    renderPage(allItems, 1);
                    renderPagination(allItems);
                } else {
                    alert("Erreur lors de l'ajout de la cargaison");
                }
            })
            .catch((error) => console.error("Erreur:", error));
    });

    function createNewCargoRow(cargaison) {
        const newRow = document.createElement("tr");
        newRow.classList.add("border-b");
        newRow.innerHTML = `
        <td class="py-2 px-4">${cargaison.id}</td>
        <td class="py-2 px-4">${cargaison.type}</td>
        <td class="py-2 px-4">${cargaison.dateDepart}</td>
        <td class="py-2 px-4">${cargaison.dateArrivee}</td>
        <td class="py-2 px-4">${cargaison.distance}</td>
        <td class="py-2 px-4"><button class="bg-green-700 text-white font-bold px-4 py-2 rounded-lg etatBtn">${cargaison.etat}</button></td>
        <td class="py-2 px-4"><button class="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg statutBtn">${cargaison.statut}</button></td>
        <td class="py-2 px-4">
        <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg viewCargoBtn">Voir</button>
        </td>
        <td class="py-2 px-4">
        <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg editCargoBtn">Modifier</button>
        </td>
        <td class="py-2 px-4">
        <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg addProductBtn">+ Produit</button>
        </td>
        `;

        newRow.querySelector(".etatBtn").addEventListener("dblclick", function () {
            toggleEtatBtn(this);
            updateCargoStatus(cargaison.id, "etat", this.innerHTML);
        });

        newRow.querySelector(".statutBtn").addEventListener("dblclick", function () {
            showStatusModal(this, cargaison.id);
        });

        return newRow;
    }

    function toggleEtatBtn(btn) {
        const newEtat = btn.innerHTML === "Ouvert" ? "Fermé" : "Ouvert";
        btn.innerHTML = newEtat;
        btn.classList.toggle("bg-green-700");
        btn.classList.toggle("bg-red-700");
    }

    function showStatusModal(btn, cargoId) {
        const currentStatus = btn.innerHTML;
        const modal = document.createElement("div");
        modal.innerHTML = `
              <div class="modal-backdrop"></div>
              <div class="modal">
                  <h2>Changer le statut</h2>
                  <select id="newStatus">
                      <option value="En attente" ${currentStatus === "En attente" ? "selected" : ""}>En attente</option>
                      <option value="En cours" ${currentStatus === "En cours" ? "selected" : ""}>En cours</option>
                      <option value="Terminé" ${currentStatus === "Terminé" ? "selected" : ""}>Terminé</option>
                  </select>
                  <button id="applyStatusChange">Appliquer</button>
                  <button id="cancelStatusChange">Annuler</button>
              </div>
              `;
        document.body.appendChild(modal);

        modal.querySelector("#applyStatusChange").addEventListener("click", () => {
            const newStatus = document.getElementById("newStatus").value;
            updateStatusBtn(btn, newStatus);
            updateCargoStatus(cargoId, "statut", newStatus);
            modal.remove();
        });

        modal.querySelector("#cancelStatusChange").addEventListener("click", () => {
            modal.remove();
        });
    }

    function updateStatusBtn(btn, newStatus) {
        btn.innerHTML = newStatus;
        btn.classList.remove("bg-gray-700", "bg-yellow-700", "bg-green-700");
        if (newStatus === "En attente") {
            btn.classList.add("bg-gray-700");
        } else if (newStatus === "En cours") {
            btn.classList.add("bg-yellow-700");
        } else if (newStatus === "Terminé") {
            btn.classList.add("bg-green-700");
        }
    }

    function updateCargoStatus(id, field, value) {
        fetch("../data/api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: `update${field.charAt(0).toUpperCase() + field.slice(1)}`,
                id: id,
                value: value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== "success") {
                    alert("Erreur lors de la mise à jour");
                }
            })
            .catch((error) => console.error("Erreur:", error));
    }

    function renderPage(items, page) {
        const tableBody = document.getElementById("cargoTableBody");
        tableBody.innerHTML = "";
        const itemsPerPage = 10;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = items.slice(start, end);
        pageItems.forEach((item) => {
            tableBody.appendChild(createNewCargoRow(item));
        });
    }

    function renderPagination(items) {
        const pagination = document.getElementById("pagination");
        pagination.innerHTML = "";
        const itemsPerPage = 10;
        const pageCount = Math.ceil(items.length / itemsPerPage);
        for (let i = 1; i <= pageCount; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.innerHTML = i;
            pageBtn.addEventListener("click", function () {
                currentPage = i;
                renderPage(items, i);
            });
            pagination.appendChild(pageBtn);
        }
    }

    function filterItems() {
        const search = document.getElementById("searchInput").value.toLowerCase();
        const filteredItems = allItems.filter((item) => {
            return (
                item.type.toLowerCase().includes(search) ||
                item.dateDepart.toLowerCase().includes(search) ||
                item.dateArrivee.toLowerCase().includes(search) ||
                item.distance.toString().includes(search) ||
                item.etat.toLowerCase().includes(search) ||
                item.statut.toLowerCase().includes(search)
            );
        });
        renderPage(filteredItems, 1);
        renderPagination(filteredItems);
    }

    function resetForm() {
        form.reset();
    }

    document.getElementById("searchInput").addEventListener("input", filterItems);
});




/* document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addCargoForm");
    const addCargoModal = document.getElementById("addCargoModal");
    const addCargoBtn = document.getElementById("addCargoBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const cargoList = document.getElementById("cargo-list");
    const searchInput = document.getElementById("searchInput");
    const paginationContainer = document.getElementById("pagination");
    const editCargoModal = document.getElementById("editCargoModal");
    const cancelEditBtn = document.getElementById("cancelEditBtn");
    const editCargoForm = document.getElementById("editCargoForm");
    const statusModal = document.getElementById("statusModal");
    const cancelStatusBtn = document.getElementById("cancelStatusBtn");

    let currentPage = 1;
    const itemsPerPage = 5;
    let allItems = [];

    // Afficher et masquer le modal de statut
    statusModal.addEventListener("click", () => {
        statusModal.style.display = "flex";
    });

    cancelStatusBtn.addEventListener("click", () => {
        statusModal.style.display = "none";
    });

    // Afficher et masquer le modal d'ajout de cargaison
    addCargoBtn.addEventListener("click", () => {
        addCargoModal.style.display = "flex";
    });

    cancelBtn.addEventListener("click", () => {
        addCargoModal.style.display = "none";
        resetForm();
    });

    // Afficher et masquer le modal de modification de cargaison
    cancelEditBtn.addEventListener("click", () => {
        editCargoModal.style.display = "none";
        editCargoForm.reset();
    });

    // Soumettre le formulaire d'ajout de cargaison
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const transportType = document.querySelector('input[name="type"]:checked');
        const stopCriteria = document.getElementById("stopCriteria");
        const criteriaValue = document.getElementById("criteriaValue");
        const countryName = document.getElementById("countryName");
        const arrivalCountry = document.getElementById("arrivalCountry");
        const distance = document.getElementById("distance");

        const etat = document.getElementById("etatSelect").value;
        const statut = document.getElementById("statutSelect").value;

        const dateDepartInput = document.getElementById("departureDate");
        const dateArriveeInput = document.getElementById("arrivalDate");

        const formData = new FormData();

        formData.append("action", "addCargaison");
        formData.append("type", transportType.value);
        formData.append("dateDepart", dateDepartInput.value);
        formData.append("dateArrivee", dateArriveeInput.value);
        formData.append("stopCriteria", stopCriteria.value);
        formData.append("criteriaValue", criteriaValue.value);
        formData.append("countryName", countryName.value);
        formData.append("arrivalCountry", arrivalCountry.value);
        formData.append("distance", distance.value);
        formData.append("etat", etat);
        formData.append("statut", statut);

        fetch("../data/api.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    alert(data.message);
                    addCargoModal.style.display = "none";
                    resetForm();

                    const newCargoId = data.id;
                    const newCargo = {
                        id: newCargoId,
                        type: transportType.value,
                        dateDepart: dateDepartInput.value,
                        dateArrivee: dateArriveeInput.value,
                        distance: distance.value,
                        etat: etat,
                        statut: statut,
                    };

                    allItems.unshift(createNewCargoRow(newCargo));
                    renderPage(allItems, currentPage);
                    renderPagination(allItems);
                    filterItems();
                } else {
                    alert("Erreur lors de l'ajout de la cargaison");
                }
            })
            .catch((error) => console.error("Erreur:", error));
    });

    function createNewCargoRow(cargaison) {
        const newRow = document.createElement("tr");
        newRow.classList.add("border-b");
        newRow.innerHTML = `
              <td class="py-2 px-4">${cargaison.id}</td>
              <td class="py-2 px-4">${cargaison.type}</td>
              <td class="py-2 px-4">${cargaison.dateDepart}</td>
              <td class="py-2 px-4">${cargaison.dateArrivee}</td>
              <td class="py-2 px-4">${cargaison.distance}</td>
              <td class="py-2 px-4"><button class="bg-green-700 text-white font-bold px-4 py-2 rounded-lg etatBtn">${cargaison.etat}</button></td>
              <td class="py-2 px-4"><button class="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg statutBtn">${cargaison.statut}</button></td>
              <td class="py-2 px-4">
                  <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg viewCargoBtn">Voir</button>
              </td>
              <td class="py-2 px-4">
                  <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg editCargoBtn">Modifier</button>
              </td>
              <td class="py-2 px-4">
                  <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg addProductBtn">+ Produit</button>
              </td>
          `;

        newRow.querySelector(".etatBtn").addEventListener("dblclick", function () {
            toggleEtatBtn(this);
            updateCargoStatus(cargaison.id, "etat", this.innerHTML);
        });

        newRow.querySelector(".statutBtn").addEventListener("dblclick", function () {
            showStatusModal(this, cargaison.id);
        });

        return newRow;
    }

    function toggleEtatBtn(btn) {
        const newEtat = btn.innerHTML === "Ouvert" ? "Fermé" : "Ouvert";
        btn.innerHTML = newEtat;
        btn.classList.toggle("bg-green-700");
        btn.classList.toggle("bg-red-700");
    }

    function showStatusModal(btn, cargoId) {
        const currentStatus = btn.innerHTML;
        const modal = document.createElement("div");
        modal.innerHTML = `
              <div class="modal-backdrop"></div>
              <div class="modal">
                  <h2>Changer le statut</h2>
                  <select id="newStatus">
                      <option value="En attente" ${currentStatus === "En attente" ? "selected" : ""}>En attente</option>
                      <option value="En cours" ${currentStatus === "En cours" ? "selected" : ""}>En cours</option>
                      <option value="Terminé" ${currentStatus === "Terminé" ? "selected" : ""}>Terminé</option>
                  </select>
                  <button id="applyStatusChange">Appliquer</button>
                  <button id="cancelStatusChange">Annuler</button>
                  </div>
                  `;
        document.body.appendChild(modal);
        modal.querySelector("#applyStatusChange").addEventListener("click", () => {
            const newStatus = document.getElementById("newStatus").value;
            updateStatusBtn(btn, newStatus);
            updateCargoStatus(cargoId, "statut", newStatus);
            modal.remove();
        });

        modal.querySelector("#cancelStatusChange").addEventListener("click", () => {
            modal.remove();
        });
    }

    function updateStatusBtn(btn, newStatus) {
        btn.innerHTML = newStatus;
        btn.classList.remove("bg-gray-700", "bg-yellow-700", "bg-green-700");
        if (newStatus === "En attente") {
            btn.classList.add("bg-gray-700");
        } else if (newStatus === "En cours") {
            btn.classList.add("bg-yellow-700");
        } else if (newStatus === "Terminé") {
            btn.classList.add("bg-green-700");
        }
    }

    function updateCargoStatus(id, field, value) {
        fetch("../data/api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: `update${field.charAt(0).toUpperCase() + field.slice(1)}`,
                id: id,
                value: value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== "success") {
                    alert("Erreur lors de la mise à jour");
                }
            })
            .catch((error) => console.error("Erreur:", error));
    }

    // Filtrer les éléments affichés
    function filterItems() {
        const filterText = searchInput.value.toLowerCase();
        if (filterText.length >= 3) {
            const filteredItems = allItems.filter((row) => {
                const cells = row.querySelectorAll("td");
                return Array.from(cells).some((cell) =>
                    cell.textContent.toLowerCase().includes(filterText)
                );
            });

            renderPage(filteredItems, 1);
            renderPagination(filteredItems);
        } else {
            renderPage(allItems, currentPage);
            renderPagination(allItems);
        }
    }

    searchInput.addEventListener("input", filterItems);

    // Mettre à jour les éléments affichés
    function updateItems(items) {
        allItems = items;
        filterItems();
    }

    // Afficher une page spécifique
    function renderPage(items, page) {
        cargoList.innerHTML = "";
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = items.slice(start, end);

        pageItems.forEach((row) => {
            cargoList.appendChild(row);
        });
    }

    function renderPagination(items) {
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(items.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement("a");
            pageLink.href = "#";
            pageLink.textContent = i;
            pageLink.classList.add("pagination-link");

            // Appliquer les styles directement
            pageLink.style.backgroundColor = "blue";
            pageLink.style.color = "white";
            pageLink.style.border = "1px solid blue";
            pageLink.style.borderRadius = "4px";
            pageLink.style.padding = "4px 8px";
            pageLink.style.margin = "5px";
            pageLink.style.fontWeight = "bold";

            pageLink.addEventListener("click", (e) => {
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
    fetch("../data/api.php?action=getCargaisons")
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                const cargaisons = data.cargaisons.map((cargaison) =>
                    createNewCargoRow(cargaison)
                );
                updateItems(cargaisons);
            } else {
                alert("Erreur lors du chargement des cargaisons");
            }
        })
        .catch((error) => console.error("Erreur:", error));
});

document.addEventListener("DOMContentLoaded", () => {
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
            .then((response) => response.json())
            .then((data) => {
                const locationName =
                    data.display_name || `${latlng.lat}, ${latlng.lng}`;
                document.getElementById(inputId).value = locationName;
            })
            .catch((error) => {
                console.error("Error fetching location name:", error);
                document.getElementById(inputId).value = `${latlng.lat}, ${latlng.lng}`;
            });
    }

    function calculateDistance(start, end) {
        const R = 6371; // Earth's radius in km
        const dLat = ((end.lat - start.lat) * Math.PI) / 180;
        const dLon = ((end.lng - start.lng) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((start.lat * Math.PI) / 180) *
            Math.cos((end.lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        document.getElementById("distance").value = distance.toFixed(
            2
        ) + " km";
    }

    document
        .getElementById("clearMapBtn")
        .addEventListener("click", function () {
            if (departMarker) {
                map.removeLayer(departMarker);
                departMarker = null;
                document.getElementById("countryName").value = "";
            }
            if (arriveeMarker) {
                map.removeLayer(arriveeMarker);
                arriveeMarker = null;
                document.getElementById("arrivalCountry").value = "";
            }
            document.getElementById("distance").value = "";
        });
}); */