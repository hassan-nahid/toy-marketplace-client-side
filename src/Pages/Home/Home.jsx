import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Gallery from "./Gallery";
import ReactTabs from "./ReactTabs/ReactTabs";
import RetailPartners from "./RetailPartners";
import Support from "./Support";

const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ABC TOYS | Home</title>
            </Helmet>
            <Banner></Banner>
            <Gallery></Gallery>
            <ReactTabs></ReactTabs>
            <RetailPartners></RetailPartners>
            <Support></Support>
        </div>
    );
};

export default Home;