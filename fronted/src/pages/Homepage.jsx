import Header from "../homepage/header";
import Hero from "../homepage/hero";
import Features from "../homepage/features";
import Footer from "../homepage/footer";

function Homepage()
{
    return (
    <>
    <div>
       <Header></Header>
    </div>

    <div>
       <Hero></Hero>
    </div>
       
    <div>
       <Features></Features>
    </div>

    <div>
        <Footer></Footer>
    </div>
    </>
    )
}

export default Homepage;