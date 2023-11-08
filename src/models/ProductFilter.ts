interface ProductFilter {
    color: string;
    size: string;
    tag: string;
    rangePrice: { min: number; max: number };
  }
export default ProductFilter;