import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactStars from 'react-rating-stars-component';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { UserAuth } from '../../../provider/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReactTabs = () => {
    const [data, setData] = useState(null);
    const { user } = UserAuth();

    useEffect(() => {
        // Fetch the data from category.json or your server API
        fetch('https://toy-marketplace-server-one-livid.vercel.app/categories')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    if (!data) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    // Filter categories based on the given category names
    const filteredCategories = data.filter(
        (category) =>
            category.name === 'Race Car' || category.name === 'Truck' || category.name === 'Sports Car'
    );

    return (
        <div className="my-10" data-aos="flip-right">
            <h2 className="text-3xl font-semibold text-center my-4 text-red-600">Category</h2>
            <Tabs>
                <TabList>
                    {filteredCategories.map((category) => (
                        <Tab key={category.name}>{category.name}</Tab>
                    ))}
                </TabList>

                {filteredCategories.map((category) => (
                    <TabPanel key={category.name}>
                        <div className="p-4">
                            {category.subcategories.map((subcategory) => (
                                <div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto"
                                    key={subcategory.toys[0].id}
                                >
                                    {subcategory.toys.map((toy) => (
                                        <div key={toy.id} className="border p-4 rounded-lg w-full">
                                            <img src={toy.picture} alt={toy.toyName} className="w-full h-48 object-cover mb-4" />
                                            <h3 className="text-lg font-semibold">{toy.toyName}</h3>
                                            <p className="text-sm font-bold">Price: ${toy.price}</p>
                                            {/* Add the star rating component */}
                                            <div className="flex items-center">
                                                <ReactStars
                                                    count={5}
                                                    value={toy.rating}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                    edit={false} // Disable user interaction
                                                    half={true} // Display half-filled stars
                                                />
                                                <span className="ml-2">{toy.rating}</span>
                                            </div>
                                            <Link to={`/viewsingletoy/${toy.id}`}>
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
