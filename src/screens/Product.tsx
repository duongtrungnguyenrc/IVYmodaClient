import { useSearchParams } from 'react-router-dom';
import { NavLinks, ProductDetail } from "../components";
import { Content, ProductGallery } from "../components";
import { useEffect, useState } from 'react';

import axios from '../services/CustomAxios';
import { ProductModel } from '../models/Product';
import DefaultLayout from '../layouts/DefaultLayout';

function Product() {
     const [searchParams] = useSearchParams();
     const [ product, setProduct ] = useState<ProductModel>();

     useEffect(() => {
          const fetchProduct = async () => {
               const response = await axios.get(`/product/detail?id=${searchParams.get("id")}`);

               if(response.status == 200) {                    
                    setProduct(response.data.data);
               }

          }
          
          fetchProduct();
     }, [])
     
     
    return ( 
          <DefaultLayout>
               <Content>
                    <NavLinks/>
                    <section className="d-flex mb-5">
                    
                         {
                              product && (
                                   <>
                                        <ProductGallery images={product.images}/>
                                        <ProductDetail product={product}/>
                                   </>
                              )
                         }
                    </section>
                    {/* <SpecialCategory title={"best seller"} apiRoute={"product/all?page=1&limit=10&Tag=BEST_SELLER"}/> */}
               </Content>
          </DefaultLayout>
     );
}

export default Product;