import ProductImage from "./ProductImage";

export interface ProductModel {
    id: number;
    type: string;
    group: string;
    category: string;
    name: string;
    images: ProductImage[];
    description: string;
    colors: {
        id: number;
        name: string;
        src: string;
    }[];
    sizes: {
        id: number;
        name: string;
        extraCoefficient: number;
    }[];
    basePrice: number;
    salePrice: number;
    inStock: number;
    preserveMethods: {  
        id: number;
        description: string;
    }[];
    model: {
        height: string;
        weight: string;
        threeRoundMeasurements: string;
    }
    tag: string
}
