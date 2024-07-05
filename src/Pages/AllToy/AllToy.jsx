import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";

const AllToy = () => {
    const allToys = useLoaderData();
    const [searchQuery, setSearchQuery] = useState("");
    const [limit, setLimit] = useState(20);

    // Function to handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter the toys based on the search query
    const filteredToys = allToys.filter((toy) =>
        toy.toyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 my-2">
            <Helmet>
                <meta charSet="utf-8" />
                <title>ABC TOYS | All TOY</title>
            </Helmet>

            {/* Search input */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by Toy Name..."
                className="px-4 py-2 mb-4 w-full rounded-md border border-gray-300"
            />

            {/* All Toys cards */}
            <div className="flex flex-col gap-4 mt-4">
                {filteredToys.slice(0, limit).map((allToy) => (
                    <div key={allToy._id} className="card lg:card-side bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src={allToy.picture}
                                alt={allToy.toyName}
                                className="w-56 h-56 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{allToy.toyName}</h2>
                            <p>Seller: {allToy.seller.name}</p>
                            <p>Sub-category: {allToy.subCategory}</p>
                            <p>Price: ${allToy.price}</p>
                            <p>Available Quantity: {allToy.availableQuantity}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/singletoy/${allToy._id}`}>
                                    <button className="btn btn-outline btn-error">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load more button */}
            {limit < filteredToys.length && (
                <button
                    onClick={() => setLimit(limit + 20)}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default AllToy;
