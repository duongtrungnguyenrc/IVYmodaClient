import ProductColor from "./ProductColor";
import ProductImage from "./ProductImage";
import ProductModel from "./ProductModel";
import ProductPreserveMethod from "./ProductPreserveMethod";
import ProductSize from "./ProductSize";
import ProducrUpdateRecord from "./ProductUpdateRecord";

export default interface Product {
    id: number;
    type: string;
    group: string;
    category: string;
    name: string;
    images: ProductImage[];
    description: string;
    colors: ProductColor[];
    sizes: ProductSize[];
    basePrice: number;
    salePrice: number;
    inStock: number;
    preserveMethods: ProductPreserveMethod[];
    model: ProductModel;
    tag: string;
    updateRecords: ProducrUpdateRecord[];
}
