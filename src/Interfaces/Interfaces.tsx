
interface Productos {
    name: string;
    image: string;
    descripcionP: string;
}

export interface Productores {
    id: string;
    name: string;
    legalRep: string;
    mission: string;
    descripcion: string;
    vision: string;
    schedule: string;
    location: string;
    type: string;
    organization: string;
    phone: string;
    social: {
        instagram: string;
        facebook: string;
    };
    history: string;
    mainImage: string;
    products: Productos[];
}
