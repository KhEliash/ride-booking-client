import Banner from "@/components/modules/Home/Banner";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import RidestatsAndBenefits from "@/components/modules/Home/RidestatsAndBenefits";
import WhatUserSay from "@/components/modules/Home/WhatUserSay";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";

 
const Home = () => {
    return (
        <div className="  flex flex-col items-center justify-center">
           <Banner/>
           <RidestatsAndBenefits/>
           <HowItWorks/>
           <WhyChooseUs/>
           <WhatUserSay/>
        </div>
    );
};

export default Home;