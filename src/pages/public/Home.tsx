import { Slider, Content, MainGallery } from "../../components"; 
import SpecialCategory from "../../components/SpecialCategory/SpecialCategory";
import DefaultLayout from "../../layouts/DefaultLayout";

const Home = () => {    
    return (
        <DefaultLayout>
            <Content>
                {/* SLIDER */}

                <Slider/>

                {/* HOME NEW PREOD */}

                <SpecialCategory title={"new arrival"} tag="NEW"/>

                {/* HOME BEST SELLER */}

                <SpecialCategory title={"best seller"} tag="BEST_SELLER"/>

                {/* MAIN GALLERY */}

                <MainGallery/>
                
            </Content>
        </DefaultLayout>
    )
}

export default Home;