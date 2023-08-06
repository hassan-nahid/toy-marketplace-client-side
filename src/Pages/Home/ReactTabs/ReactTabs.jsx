import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ReactTabs = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch the data from category.json
        fetch('/category.json')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    if (!data) {
        return <p>Loading data...</p>;
    }

    // Filter categories based on the given category names
    const filteredCategories = data.categories.filter(
        (category) =>
            category.name === 'Race Car' || category.name === 'Truck' || category.name === 'Sports Car'
    );


    return (
        <div className='my-10' data-aos="flip-right">
            <h2 className='text-3xl font-semibold text-center my-4'>Category</h2>
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
                                <div className='sm:flex gap-5 mx-auto justify-center lg:flex-row' key={subcategory.name}>
                                    {subcategory.toys.map((toy) => (
                                        <div key={toy.id} className="border p-4 rounded-lg w-full">
                                            <img
                                                src={toy.picture}
                                                alt={toy.name}
                                                className="w-full h-48 object-cover mb-4"
                                            />
                                            <h3 className="text-lg font-semibold">{toy.name}</h3>
                                            <p className="text-sm font-bold">${toy.price}</p>
                                            <p className="text-sm">Rating: {toy.rating}</p>
                                            <button className="btn btn-outline btn-error my-2">
                                                View Details
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default ReactTabs;
