interface CartProduct {
    id: number;
    imgSrc: string;
    productName: string;
    salePrice: number;
    quantity: number;
    size: {
        id: number;
        name: string;
    };
    color: {
        id: number;
        name: string;
    };
}
export default CartProduct;