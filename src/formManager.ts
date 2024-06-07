// formManager.ts
import { IProduit, IClient, IDestinataire } from './types';

class ProductFormManager {
    private produitFields: HTMLElement;
    private chimiqueFields: HTMLElement;
    private materielFields: HTMLElement;
    private typeSelect: HTMLSelectElement;

    constructor() {
        this.produitFields = document.getElementById('productForm') as HTMLElement;
        this.chimiqueFields = document.getElementById('chimiqueFields') as HTMLElement;
        this.materielFields = document.getElementById('materielFields') as HTMLElement;
        this.typeSelect = document.getElementById('type') as HTMLSelectElement;
        this.addEventListeners();
    }

    private addEventListeners(): void {
        this.typeSelect.addEventListener('change', this.handleTypeChange.bind(this));
    }

    private handleTypeChange(): void {
        const type = this.typeSelect.value;
        this.chimiqueFields.style.display = type === 'chimique' ? 'grid' : 'none';
        this.materielFields.style.display = type === 'materiel' ? 'grid' : 'none';
    }
}

class StepFormManager {
    private currentStep: number;

    constructor() {
        this.currentStep = 1;
        this.initEventListeners();
        this.updateFormVisibility();
    }

    private initEventListeners(): void {
        document.getElementById('nextToStep2')?.addEventListener('click', () => this.goToStep(2));
        document.getElementById('nextToStep3')?.addEventListener('click', () => this.goToStep(3));
        document.getElementById('backToStep1')?.addEventListener('click', () => this.goToStep(1));
        document.getElementById('backToStep2')?.addEventListener('click', () => this.goToStep(2));
        const typeSelect = document.getElementById('type') as HTMLSelectElement;
        typeSelect.addEventListener('change', () => this.toggleProductSpecificFields(typeSelect.value));
    }

    private goToStep(step: number): void {
        this.currentStep = step;
        this.updateFormVisibility();
    }

    private updateFormVisibility(): void {
        const steps = [1, 2, 3];
        steps.forEach(step => {
            const stepElement = document.getElementById(`step${step}`);
            if (stepElement) {
                stepElement.classList.toggle('hidden', step !== this.currentStep);
            }
        });
    }

    private toggleProductSpecificFields(type: string): void {
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