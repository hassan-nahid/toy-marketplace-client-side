import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.config';
import ReactStars from "react-rating-stars-component";



const ReactTabs = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [user, , ] = useAuthState(auth);

    useEffect(() => {
        fetch("/category.json")
            .then(data => data.json())
            .then(result => {
                setCategories(result);
                if (result.length > 0) {
                    setSelectedCategory(result[0]?.subCategory);
                }
            });
    }, []);

    useEffect(() => {
        // Fetch the data from category.json or your server API
        fetch('http://localhost:5000/alltoys')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    if (!data || !categories) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    const handleTabSelect = (index) => {
        const selectedCat = categories[index]?.subCategory;
        setSelectedCategory(selectedCat);
    };

    const filteredData = data.filter((item) => item?.subCategory === selectedCategory);

    return (
        <div className="my-10" data-aos="flip-right">
            <h2 className="text-3xl font-semibold text-center my-4 text-red-600">Category</h2>
            <Tabs onSelect={handleTabSelect} selectedIndex={categories.findIndex(cat => cat.subCategory === selectedCategory)}>
                <TabList>
                    {categories.map((category) => (
                        <Tab key={category?._id}>{category?.subCategory}</Tab>
                    ))}
                </TabList>

                {categories.map((category) => (
                    <TabPanel key={category?._id}>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredData.slice(0, 6).map((item) => (
                                <div key={item._id} className="border p-4 rounded-lg w-full">
                                    <img src={item.picture} alt={item.toyName} className="w-full h-48 object-cover mb-4" />
                                    <h3 className="text-lg font-semibold">{item.toyName}</h3>
                                    <p className="text-sm font-bold">Price: ${item.price}</p>
                                    <div className="flex items-center">
                                        <ReactStars
                                            count={5}
                                            value={item.rating}
                                            size={24}
                                            activeColor="#ffd700"
                                            edit={false}
                                            half={true}
                                        />
                                        <span className="ml-2">{item.rating}</span>
                                    </div>
                                    <Link to={`/singletoy/${item._id}`}>
                                        <button
                                            className="btn btn-outline btn-error my-2"
                                            onClick={() => {
                                                if (!user) {
                                                    toast.error('You have to log in first to view details');
                                                }
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                ))}
            </Tabs>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default ReactTabs;
