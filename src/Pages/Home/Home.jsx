import Banner from "./Banner";
import Gallery from "./Gallery";
import ReactTabs from "./ReactTabs/ReactTabs";
import Support from "./Support";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Gallery></Gallery>
            <ReactTabs></ReactTabs>
            <Support></Support>
        </div>
    );
};

export default Home;