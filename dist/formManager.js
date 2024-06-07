class ProductFormManager {
    constructor() {
        this.produitFields = document.getElementById('productForm');
        this.chimiqueFields = document.getElementById('chimiqueFields');
        this.materielFields = document.getElementById('materielFields');
        this.typeSelect = document.getElementById('type');
        this.addEventListeners();
    }
    addEventListeners() {
        this.typeSelect.addEventListener('change', this.handleTypeChange.bind(this));
    }
    handleTypeChange() {
        const type = this.typeSelect.value;
        this.chimiqueFields.style.display = type === 'chimique' ? 'grid' : 'none';
        this.materielFields.style.display = type === 'materiel' ? 'grid' : 'none';
    }
}
class StepFormManager {
    constructor() {
        this.currentStep = 1;
        this.initEventListeners();
        this.updateFormVisibility();
    }
    initEventListeners() {
        var _a, _b, _c, _d;
        (_a = document.getElementById('nextToStep2')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.goToStep(2));
        (_b = document.getElementById('nextToStep3')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.goToStep(3));
        (_c = document.getElementById('backToStep1')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => this.goToStep(1));
        (_d = document.getElementById('backToStep2')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => this.goToStep(2));
        const typeSelect = document.getElementById('type');
        typeSelect.addEventListener('change', () => this.toggleProductSpecificFields(typeSelect.value));
    }
    goToStep(step) {
        this.currentStep = step;
        this.updateFormVisibility();
    }
    updateFormVisibility() {
        const steps = [1, 2, 3];
        steps.forEach(step => {
            const stepElement = document.getElementById(`step${step}`);
            if (stepElement) {
                stepElement.classList.toggle('hidden', step !== this.currentStep);
            }
        });
    }
    toggleProductSpecificFields(type) {
        const chimiqueFields = document.getElementById('chimiqueFields');
        const materielFields = document.getElementById('materielFields');
        if (chimiqueFields && materielFields) {
            chimiqueFields.classList.toggle('hidden', type !== 'chimique');
            materielFields.classList.toggle('hidden', type !== 'materiel');
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new ProductFormManager();
    new StepFormManager();
});
export {};
