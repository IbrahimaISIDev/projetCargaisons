class Cargo {
    id: string;
    type: string;
    dateDepart: string;
    dateArrivee: string;
    distance: string;
    etat: string;
    statut: string;

    constructor(id: string, type: string, dateDepart: string, dateArrivee: string, distance: string, etat: string, statut: string) {
        this.id = id;
        this.type = type;
        this.dateDepart = dateDepart;
        this.dateArrivee = dateArrivee;
        this.distance = distance;
        this.etat = etat;
        this.statut = statut;
    }
}

class CargoManager {
    currentPage: number;
    itemsPerPage: number;
    allItems: Cargo[];
    cargoList: HTMLElement | null;
    searchInput: HTMLInputElement | null;
    paginationContainer: HTMLElement | null;
    addCargoModal: HTMLFormElement | null;
    departMarker: L.Marker | null;
    arriveeMarker: L.Marker | null;
    map: L.Map | null;

    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.allItems = [];
        this.cargoList = document.getElementById('cargo-list');
        this.searchInput = document.getElementById('searchInput') as HTMLInputElement;
        this.paginationContainer = document.getElementById('pagination');
        this.addCargoModal = document.getElementById('addCargoForm') as HTMLFormElement;
        this.departMarker = null;
        this.arriveeMarker = null;
        this.map = null;
        this.init();
    }

    init() {
        this.addEventListeners();
        this.fetchCargaisons();
        this.initMap();
    }

    addEventListeners() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.filterItems.bind(this));
        }

        if (this.addCargoModal) {
            this.addCargoModal.addEventListener('submit', this.onSubmit.bind(this));
        }
    }

    filterItems() {
        const filterText = this.searchInput?.value.toLowerCase();
        if (filterText && filterText.length >= 3) {
            const filteredItems = this.allItems.filter(row => {
                return Object.values(row).some(val => typeof val === 'string' && val.toLowerCase().includes(filterText));
            });
            this.renderPage(filteredItems, 1);
            this.renderPagination(filteredItems);
        } else {
            this.renderPage(this.allItems, 1);
            this.renderPagination(this.allItems);
        }
    }
    renderPage(items: Cargo[], page: number) {
        if (this.cargoList) {
            this.cargoList.innerHTML = '';
            const start = (page - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const pageItems = items.slice(start, end);

            pageItems.forEach(row => {
                if (this.cargoList) {
                    this.cargoList.appendChild(this.createNewCargoRow(row));
                }
            });
        } else {
            console.error("Cargo list element is not available.");
        }
    }


    renderPagination(items: Cargo[]) {
        if (!this.paginationContainer) return;
        this.paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(items.length / this.itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i.toString();
            pageLink.classList.add('pagination-link');

            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentPage = i;
                this.renderPage(items, i);
            });

            this.paginationContainer.appendChild(pageLink);
        }
    }

    fetchCargaisons() {
        fetch('../data/api.php?action=getCargaisons')
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    const cargaisons = data.cargaisons.map((cargaison: any) => {
                        return new Cargo(
                            cargaison.id,
                            cargaison.type,
                            cargaison.dateDepart,
                            cargaison.dateArrivee,
                            cargaison.distance,
                            cargaison.etat,
                            cargaison.statut
                        );
                    });
                    this.allItems = cargaisons;
                    this.renderPage(cargaisons, this.currentPage);
                    this.renderPagination(cargaisons);
                } else {
                    alert('Erreur lors du chargement des cargaisons');
                }
            })
            .catch(error => console.error('Erreur:', error));
    }

    resetForm() {
        if (this.addCargoModal) {
            this.addCargoModal.reset();
        }
    }

    createNewCargoRow(cargaison: Cargo): HTMLElement {
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

        newRow.querySelector('.editCargoBtn')?.addEventListener('click', () => {
            const cells = newRow.querySelectorAll('td');
            const editCargoModal = document.getElementById('editCargoModal') as HTMLElement;
            const editCargoId = document.getElementById('editCargoId') as HTMLInputElement;
            const editType = document.getElementById('editType') as HTMLInputElement;
            const editDateDepart = document.getElementById('editDateDepart') as HTMLInputElement;
            const editDateArrivee = document.getElementById('editDateArrivee') as HTMLInputElement;

            if (editCargoModal && editCargoId && editType && editDateDepart && editDateArrivee) {
                editCargoId.value = cells[0].textContent || '';
                editType.value = cells[1].textContent || '';
                editDateDepart.value = cells[2].textContent || '';
                editDateArrivee.value = cells[3].textContent || '';
                editCargoModal.style.display = 'flex';
            }
        });

        return newRow;
    }

    onSubmit(e: Event) {
        e.preventDefault();

        const formData = new FormData(this.addCargoModal as HTMLFormElement);
        formData.append('action', 'addCargaison');
        formData.append('etat', 'Ouvert');
        formData.append('statut', 'En attente');

        fetch('../data/api.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert(data.message);
                    const newCargoId = data.id;
                    const newCargo = new Cargo(
                        newCargoId,
                        formData.get('type') as string,
                        formData.get('dateDepart') as string,
                        formData.get('dateArrivee') as string,
                        formData.get('distance') as string,
                        'Ouvert',
                        'En attente'
                    );
                    this.allItems.unshift(newCargo);
                    this.renderPage(this.allItems, this.currentPage);
                    this.renderPagination(this.allItems);
                    (this.addCargoModal as HTMLFormElement).style.display = 'none';
                    this.resetForm();
                } else {
                    alert('Erreur lors de l\'ajout de la cargaison');
                }
            })
            .catch(error => console.error('Erreur:', error));
    }

    initMap() {
        this.map = L.map("map").setView([0, 0], 2);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
        }).addTo(this.map);

        this.map.on("click", (e: L.LeafletMouseEvent) => {
            this.handleMapClick(e);
        });
    }

    handleMapClick(e: L.LeafletMouseEvent) {
        const latlng = e.latlng;
        if (!this.departMarker) {
            this.departMarker = this.createMarker(latlng, "Lieu de départ");
            this.updateInputWithLocationName(latlng, "countryName");
        } else if (!this.arriveeMarker) {
            this.arriveeMarker = this.createMarker(latlng, "Lieu d'arrivée");
            this.updateInputWithLocationName(latlng, "arrivalCountry");
            this.calculateDistance();
        }
    }


    createMarker(latlng: L.LatLngExpression, popupText: string): L.Marker {
        return L.marker(latlng)
            .addTo(this.map as L.Map)
            .bindPopup(popupText)
            .openPopup();
    }

    updateInputWithLocationName(latlng: L.LatLngExpression, inputId: string) {
        if (Array.isArray(latlng)) {
            // Vérification de type pour LatLngTuple
            const [lat, lng] = latlng;
            this.fetchLocationName(lat, lng, inputId);
        } else {
            // Vérification de type pour LatLngLiteral
            const { lat, lng } = latlng;
            this.fetchLocationName(lat, lng, inputId);
        }
    }

    fetchLocationName(lat: number, lng: number, inputId: string) {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            .then((response) => response.json())
            .then((data) => {
                const locationName = data.display_name || `${lat}, ${lng}`;
                const inputElement = document.getElementById(inputId) as HTMLInputElement;
                if (inputElement) {
                    inputElement.value = locationName;
                } else {
                    console.error("Invalid inputId:", inputId);
                }
            })
            .catch((error) => {
                console.error("Error fetching location name:", error);
                const inputElement = document.getElementById(inputId) as HTMLInputElement;
                if (inputElement) {
                    inputElement.value = `${lat}, ${lng}`;
                }
            });
    }



    calculateDistance() {
        if (this.departMarker && this.arriveeMarker) {
            const start = this.departMarker.getLatLng();
            const end = this.arriveeMarker.getLatLng();
            const R = 6371; // Earth's radius in km
            const dLat = ((end.lat - start.lat) * Math.PI) / 180;
            const dLon = ((end.lng - start.lng) * Math.PI) / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((start.lat * Math.PI) / 180) * Math.cos((end.lat * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            const distanceInput = document.getElementById("distance") as HTMLInputElement;
            if (distanceInput) {
                distanceInput.value = distance.toFixed(2);
            }
        }
    }
}

new CargoManager();        