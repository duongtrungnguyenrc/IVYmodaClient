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
    preserveMethods: [];
    tag: string;
}
export default NewProduct;