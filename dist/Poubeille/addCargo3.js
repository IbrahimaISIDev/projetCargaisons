"use strict";
class FormManager {
    constructor(cargoManager, addCargoModalId, editCargoModalId, addCargoFormId, editCargoFormId, dateDepartInputId, dateArriveeInputId, stopCriteriaSelectId, criteriaValueInputId) {
        this.cargoManager = cargoManager;
        this.addCargoModal = document.getElementById(addCargoModalId);
        this.editCargoModal = document.getElementById(editCargoModalId);
        this.addCargoForm = document.getElementById(addCargoFormId);
        this.editCargoForm = document.getElementById(editCargoFormId);
        this.dateDepartInput = document.getElementById(dateDepartInputId);
        this.dateArriveeInput = document.getElementById(dateArriveeInputId);
        this.stopCriteriaSelect = document.getElementById(stopCriteriaSelectId);
        this.criteriaValueInput = document.getElementById(criteriaValueInputId);
        this.pointDepart = null;
        this.pointArrivee = null;
        this.addCargoForm.addEventListener('submit', (e) => this.handleAddCargo(e));
        this.editCargoForm.addEventListener('submit', (e) => this.handleEditCargo(e));
    }
    /* document.addEventListener('DOMContentLoaded', () => {
      const cargoManager = new CargoManager('cargoTableBody', 'searchInput', 'paginationContainer');
      const formManager = new FormManager(
          cargoManager,
          'addCargoModal',
          'editCargoModal',
          'addCargoForm',
          'editCargoForm',
          'dateDepart',
          'dateArrivee',
          'stopCriteria',
          'criteriaValue'
      );
  
      const map = L.map('map').setView([48.8566, 2.3522], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
      }).addTo(map);
  
      let pointDepart: L.Marker | null = null;
      let pointArrivee: L.Marker | null = null;
  
      map.on('click', function (e) {
          const { lat, lng } = e.latlng;
  
          if (pointDepart === null) {
              pointDepart = L.marker([lat, lng], { draggable: true }).addTo(map);
              formManager.setPointDepart(pointDepart);
          } else if (pointArrivee === null) {
              pointArrivee = L.marker([lat, lng], { draggable: true }).addTo(map);
              formManager.setPointArrivee(pointArrivee);
          } else {
              alert('Vous avez déjà sélectionné les points de départ et d\'arrivée.');
          }
      });
  });
  */
    handleAddCargo(e) {
        e.preventDefault();
        if (!this.validateForm()) {
            return;
        }
        const type = this.addCargoForm.elements.namedItem('type').value;
        const dateDepart = this.dateDepartInput.value;
        const dateArrivee = this.dateArriveeInput.value;
        const stopCriteria = this.stopCriteriaSelect.value;
        const criteriaValue = this.criteriaValueInput.value;
        const cargoId = this.cargoManager.generateCargoId(type);
        const distance = this.calculateDistance(this.pointDepart.getLatLng(), this.pointArrivee.getLatLng());
        const newCargo = {
            id: cargoId,
            type,
            dateDepart,
            dateArrivee,
            distance,
            etat: 'Ouvert',
            status: 'En attente'
        };
        this.cargoManager.addCargo(newCargo);
        this.addCargoModal.classList.add('hidden');
        this.addCargoForm.reset();
        this.resetForm();
    }
    handleEditCargo(e) {
        e.preventDefault();
        const cargoId = document.getElementById('editCargoId').value;
        const dateDepart = document.getElementById('editDateDepart').value;
        const dateArrivee = document.getElementById('editDateArrivee').value;
        const etat = document.getElementById('editEtat').value;
        const status = document.getElementById('editStatus').value;
        const rows = Array.from(document.querySelectorAll('#cargoTableBody tr'));
        const rowToEdit = rows.find(row => row.querySelector('td').textContent === cargoId);
        if (rowToEdit) {
            const cells = rowToEdit.querySelectorAll('td');
            cells[2].textContent = dateDepart;
            cells[3].textContent = dateArrivee;
            cells[5].textContent = etat;
            cells[6].textContent = status;
            this.editCargoModal.classList.add('hidden');
            this.editCargoForm.reset();
        }
    }
    validateForm() {
        const dateDepart = new Date(this.dateDepartInput.value);
        const dateArrivee = new Date(this.dateArriveeInput.value);
        if (isNaN(dateDepart.getTime()) || isNaN(dateArrivee.getTime())) {
            alert('Veuillez entrer des dates valides.');
            return false;
        }
        if (dateDepart >= dateArrivee) {
            alert('La date de départ doit être antérieure à la date d\'arrivée.');
            return false;
        }
        if (this.pointDepart === null || this.pointArrivee === null) {
            alert('Veuillez sélectionner les points de départ et d\'arrivée sur la carte.');
            return false;
        }
        return true;
    }
    calculateDistance(point1, point2) {
        return point1.distanceTo(point2) / 1000; // Distance en kilomètres
    }
    resetForm() {
        this.pointDepart = null;
        this.pointArrivee = null;
    }
    setPointDepart(point) {
        this.pointDepart = point;
    }
    setPointArrivee(point) {
        this.pointArrivee = point;
    }
}
class CargoManager {
    constructor(cargoListId, searchInputId, paginationContainerId) {
        this.cargoList = document.getElementById(cargoListId);
        this.searchInput = document.getElementById(searchInputId);
        this.paginationContainer = document.getElementById(paginationContainerId);
        this.itemsPerPage = 3;
        this.currentPage = 1;
        this.allItems = [];
        this.cargoCounters = { maritime: 0, aerien: 0 };
        this.searchInput.addEventListener('input', () => this.filterItems());
    }
    addCargo(cargo) {
        const newRow = this.createNewCargoRow(cargo);
        this.allItems.unshift(newRow);
        this.updateItems(this.allItems);
        this.renderPage(this.allItems, 1);
    }
    createNewCargoRow(cargo) {
        const newRow = document.createElement('tr');
        newRow.classList.add('border-b');
        newRow.innerHTML = `
          <td class="py-2 px-4">${cargo.id}</td>
          <td class="py-2 px-4">${cargo.type}</td>
          <td class="py-2 px-4">${cargo.dateDepart}</td>
          <td class="py-2 px-4">${cargo.dateArrivee}</td>
          <td class="py-2 px-4">${cargo.distance.toFixed(2)}</td>
          <td class="py-2 px-4"><button>${cargo.etat}</button></td>
          <td class="py-2 px-4"><button>${cargo.status}</button></td>
          <td class="py-2 px-4">
              <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg">Voir</button>
          </td>
          <td class="py-2 px-4">
              <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg editCargoBtn">
              Modifier
          </button>
      `;
        newRow.querySelector('.editCargoBtn').addEventListener('click', () => {
            const cells = newRow.querySelectorAll('td');
            document.getElementById('editCargoId').value = cells[0].textContent;
            document.getElementById('editType').value = cells[1].textContent;
            document.getElementById('editDateDepart').value = cells[2].textContent;
            document.getElementById('editDateArrivee').value = cells[3].textContent;
            document.getElementById('editCargoModal').classList.remove('hidden');
        });
        return newRow;
    }
    filterItems() {
        const filterText = this.searchInput.value.toLowerCase();
        const filteredItems = this.allItems.filter(row => {
            const cells = row.querySelectorAll('td');
            return Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filterText));
        });
        this.renderPage(filteredItems, 1);
        this.renderPagination(filteredItems);
    }
    updateItems(items) {
        this.allItems = items;
        this.filterItems();
    }
    renderPage(items, page) {
        this.cargoList.innerHTML = '';
        const start = (page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedItems = items.slice(start, end);
        for (const item of paginatedItems) {
            this.cargoList.appendChild(item);
        }
    }
    renderPagination(items) {
        this.paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(items.length / this.itemsPerPage);
        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement('button');
            pageLink.classList.add('page-link', 'px-2', 'py-1', 'mx-1', 'bg-blue-600', 'text-white', 'rounded');
            pageLink.textContent = i.toString();
            pageLink.addEventListener('click', () => {
                this.currentPage = i;
                this.renderPage(items, this.currentPage);
            });
            this.paginationContainer.appendChild(pageLink);
        }
    }
    generateCargoId(type) {
        if (!this.cargoCounters[type]) {
            this.cargoCounters[type] = 0;
        }
        this.cargoCounters[type]++;
        return `${type.charAt(0).toUpperCase()}${this.cargoCounters[type].toString().padStart(3, '0')}`;
    }
}
/* document.addEventListener('DOMContentLoaded', () => {
  // Sélection des éléments DOM avec typage
  const addCargoBtn = document.getElementById('addCargoBtn') as HTMLButtonElement;
  const addCargoModal = document.getElementById('addCargoModal') as HTMLElement;
  const cancelBtn = document.getElementById('cancelBtn') as HTMLButtonElement;
  const addCargoForm = document.getElementById('addCargoForm') as HTMLFormElement;
  const cargoList = document.getElementById('cargo-list') as HTMLElement;
  const searchInput = document.getElementById('searchInput') as HTMLInputElement;
  const paginationContainer = document.getElementById('pagination') as HTMLElement;

  const editCargoModal = document.getElementById('editCargoModal') as HTMLElement;
  const cancelEditBtn = document.getElementById('cancelEditBtn') as HTMLButtonElement;
  const editCargoForm = document.getElementById('editCargoForm') as HTMLFormElement;
  const deleteCargoBtn = document.getElementById('deleteCargoBtn') as HTMLButtonElement;

  const dateDepartInput = document.getElementById('dateDepart') as HTMLInputElement;
  const dateArriveeInput = document.getElementById('dateArrivee') as HTMLInputElement;
  const stopCriteriaSelect = document.getElementById('stopCriteria') as HTMLSelectElement;
  const criteriaValueInput = document.getElementById('criteriaValue') as HTMLInputElement;

  const itemsPerPage = 3;
  let currentPage = 1;
  let allItems: HTMLElement[] = [];

  let pointDepart: L.Marker | null = null;
  let pointArrivee: L.Marker | null = null;

  const cargoCounters: { [key: string]: number } = {
      maritime: 0,
      aerien: 0,
  };

  // Gestionnaire d'événements
  addCargoBtn.addEventListener('click', () => {
      addCargoModal.classList.remove('hidden');
  });

  cancelBtn.addEventListener('click', () => {
      addCargoModal.classList.add('hidden');
      resetForm();
  });

  cancelEditBtn.addEventListener('click', () => {
      editCargoModal.classList.add('hidden');
      editCargoForm.reset();
  });

  addCargoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm()) {
          return;
      }

      const type = (addCargoForm.elements.namedItem('type') as HTMLInputElement).value;
      const dateDepart = dateDepartInput.value;
      const dateArrivee = dateArriveeInput.value;
      const stopCriteria = stopCriteriaSelect.value;
      const criteriaValue = criteriaValueInput.value;

      const cargoId = generateCargoId(type);
      const distance = calculateDistance(pointDepart!.getLatLng(), pointArrivee!.getLatLng());

      const newRow = createNewCargoRow(cargoId, type, dateDepart, dateArrivee, distance.toFixed(2));
      allItems.unshift(newRow);
      updateItems(allItems);
      renderPage(allItems, 1);

      addCargoModal.classList.add('hidden');
      addCargoForm.reset();
      resetForm();
  });

  editCargoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const cargoId = (document.getElementById('editCargoId') as HTMLInputElement).value;
      const dateDepart = (document.getElementById('editDateDepart') as HTMLInputElement).value;
      const dateArrivee = (document.getElementById('editDateArrivee') as HTMLInputElement).value;
      const etat = (document.getElementById('editEtat') as HTMLInputElement).value;
      const status = (document.getElementById('editStatus') as HTMLInputElement).value;

      const rowIndex = allItems.findIndex(row => row.querySelector('td')!.textContent === cargoId);
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
      const cargoId = (document.getElementById('editCargoId') as HTMLInputElement).value;
      const rowIndex = allItems.findIndex(row => row.querySelector('td')!.textContent === cargoId);
      if (rowIndex !== -1) {
          allItems.splice(rowIndex, 1);
          updateItems(allItems);
      }
      editCargoModal.classList.add('hidden');
  });

  // Reset du formulaire
  function resetForm() {
      dateDepartInput.value = '';
      dateArriveeInput.value = '';
      stopCriteriaSelect.value = '';
      criteriaValueInput.value = '';
      (document.getElementById('depart') as HTMLInputElement).value = '';
      (document.getElementById('arrivee') as HTMLInputElement).value = '';
      pointDepart = null;
      pointArrivee = null;
      map.eachLayer(function (layer) {
          if (layer instanceof L.Marker) {
              map.removeLayer(layer);
          }
      });
  }

  function generateCargoId(type: string): string {
      if (!cargoCounters[type]) {
          cargoCounters[type] = 0;
      }
      cargoCounters[type]++;
      return `${type.charAt(0).toUpperCase()}${cargoCounters[type].toString().padStart(3, '0')}`;
  }

  function createNewCargoRow(id: string, type: string, dateDepart: string, dateArrivee: string, distance: string): HTMLElement {
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

      newRow.querySelector('.editCargoBtn')!.addEventListener('click', () => {
          const cells = newRow.querySelectorAll('td');
          (document.getElementById('editCargoId') as HTMLInputElement).value = cells[0].textContent!;
          (document.getElementById('editType') as HTMLInputElement).value = cells[1].textContent!;
          (document.getElementById('editDateDepart') as HTMLInputElement).value = cells[2].textContent!;
          (document.getElementById('editDateArrivee') as HTMLInputElement).value = cells[3].textContent!;

          editCargoModal.classList.remove('hidden');
      });

      return newRow;
  }

  function filterItems() {
      const filterText = searchInput.value.toLowerCase();
      const filteredItems = allItems.filter(row => {
          const cells = row.querySelectorAll('td');
          return Array.from(cells).some(cell => cell.textContent!.toLowerCase().includes(filterText));
      });

      renderPage(filteredItems, 1);
      renderPagination(filteredItems);
  }

  function updateItems(items: HTMLElement[]) {
      allItems = items;
      filterItems();
  }

  function renderPage(items: HTMLElement[], page: number) {
      cargoList.innerHTML = '';
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedItems = items.slice(start, end);
      for (const item of paginatedItems) {
          cargoList.appendChild(item);
      }
  }

  function renderPagination(items: HTMLElement[]) {
      paginationContainer.innerHTML = '';
      const pageCount = Math.ceil(items.length / itemsPerPage);
      for (let i = 1; i <= pageCount; i++) {
          const pageLink = document.createElement('button');
          pageLink.classList.add('page-link', 'px-2', 'py-1', 'mx-1', 'bg-blue-600', 'text-white', 'rounded');
          pageLink.textContent = i.toString();
          pageLink.addEventListener('click', () => {
              currentPage = i;
              renderPage(items, currentPage);
          });

          paginationContainer.appendChild(pageLink);
      }
  }

  searchInput.addEventListener('input', filterItems);
  renderPage(allItems, currentPage);
  renderPagination(allItems);
});

function validateForm(): boolean {
  const dateDepartInput = document.getElementById('dateDepart') as HTMLInputElement;
  const dateArriveeInput = document.getElementById('dateArrivee') as HTMLInputElement;

  const dateDepart = new Date(dateDepartInput.value);
  const dateArrivee = new Date(dateArriveeInput.value);

  if (isNaN(dateDepart.getTime()) || isNaN(dateArrivee.getTime())) {
      alert('Veuillez entrer des dates valides.');
      return false;
  }

  if (dateDepart >= dateArrivee) {
      alert('La date de départ doit être antérieure à la date d\'arrivée.');
      return false;
  }

  if (pointDepart === null || pointArrivee === null) {
      alert('Veuillez sélectionner les points de départ et d\'arrivée sur la carte.');
      return false;
  }

  return true;
}

function calculateDistance(point1: L.LatLng, point2: L.LatLng): number {
  return point1.distanceTo(point2) / 1000; // Distance en kilomètres
}
 */ 
