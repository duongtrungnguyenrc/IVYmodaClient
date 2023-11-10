interface NewProduct {
    category: number;
    model: number;
    name: string;
    images: { 
        src: string, 
        name: string 
    }[];
    colors: { 
        src: string, 
        name: string, 
        extraCoefficient: number 
    }[];
    sizes: { 
        name: string, 
        extraCoefficient: number 
    }[];
    updateDescription: string;
    rating: [];
    description: string;
    basePrice: number;
    salePrice: number;
    inStock: number;
    preserveMethods: { description: string }[];
    tag: string;

    [key: string]: any;
}
export default NewProduct;