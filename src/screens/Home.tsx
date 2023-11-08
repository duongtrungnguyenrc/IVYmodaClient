import { Header, Footer, Slider, Content, MainGallery } from "../components"; 
import SpecialCategory from "../components/SpecialCategory/SpecialCategory";
import DefaultLayout from "../layouts/DefaultLayout";

const Home = () => {
    console.log("homerender");
    
    return (
        <DefaultLayout>
            <Content>
                {/* SLIDER */}

                <Slider/>

                {/* HOME NEW PREOD */}

                {/* <SpecialCategory title={"new arrival"} apiKey={"new_items"}/> */}

                {/* HOME BEST SELLER */}

                {/* <SpecialCategory title={"best seller"} apiKey={"best_seller_items"}/> */}

                {/* MAIN GALLERY */}

                <MainGallery/>
                
            </Content>
        </DefaultLayout>
    )
}

export default Home;