// types.ts
export interface IProduit {
    libelle: string;
    prix: number;
    poids: number;
    type: string;
    toxicite?: string;
    etat?: string;
}

export interface IClient {
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
    email?: string;
}

export interface IDestinataire {
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
    email?: string;
}