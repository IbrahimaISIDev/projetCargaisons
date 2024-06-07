// Sélectionnez le bouton "+ Produit"
const addProductBtn = document.getElementById('showModalProduct');

// Sélectionnez le modal pour ajouter un produit
const addProductModal = document.getElementById('addProductModal');

// Ajoutez un gestionnaire d'événements au clic sur le bouton "+ Produit"
addProductBtn.addEventListener('click', function () {
    // Affichez le modal pour ajouter un produit
    addProductModal.style.display = 'block';


    // Récupération des éléments du formulaire
    const form = document.getElementById('multiStepForm');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    // Récupération des boutons de navigation
    const nextToStep2 = document.getElementById('nextToStep2');
    const backToStep1 = document.getElementById('backToStep1');
    const nextToStep3 = document.getElementById('nextToStep3');
    const backToStep2 = document.getElementById('backToStep2');

    // Fonction pour afficher une étape et cacher les autres
    function showStep(stepToShow) {
        step1.classList.add('hidden');
        step2.classList.add('hidden');
        step3.classList.add('hidden');
        stepToShow.classList.remove('hidden');
    }

    // Événements pour la navigation
    nextToStep2.addEventListener('click', () => showStep(step2));
    backToStep1.addEventListener('click', () => showStep(step1));
    nextToStep3.addEventListener('click', () => showStep(step3));
    backToStep2.addEventListener('click', () => showStep(step2));

    // Afficher la première étape par défaut
    showStep(step1);

    // Gestion des champs conditionnels
    const typeSelect = document.getElementById('type');
    const chimiqueFields = document.getElementById('chimiqueFields');
    const materielFields = document.getElementById('materielFields');

    typeSelect.addEventListener('change', () => {
        chimiqueFields.classList.add('hidden');
        materielFields.classList.add('hidden');

        if (typeSelect.value === 'chimique') {
            chimiqueFields.classList.remove('hidden');
        } else if (typeSelect.value === 'materiel') {
            materielFields.classList.remove('hidden');
        }
    });

});