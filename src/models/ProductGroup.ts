interface ProductGroup {
    id: string;
    name: string;
    type: string;
    productCategories: {
        id: number; 
        name: string 
}[];
}