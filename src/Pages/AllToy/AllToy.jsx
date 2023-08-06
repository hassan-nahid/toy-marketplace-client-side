import { useState } from "react";
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
            {/* Search input */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by Toy Name..."
                className="px-4 py-2 mb-4 w-full rounded-md border border-gray-300"
            />

            {/* All Toys table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="px-4 py-2 hidden sm:table-cell">Seller</th>
                            <th className="px-4 py-2">Toy Name</th>
                            <th className="px-4 py-2 hidden sm:table-cell">Sub-category</th>
                            <th className="px-4 py-2 hidden sm:table-cell">Price</th>
                            <th className="px-4 py-2 hidden sm:table-cell">
                                Available Quantity
                            </th>
                            <th className="px-4 py-2">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredToys.slice(0, limit).map((allToy) => (
                            <tr key={allToy._id} className="border-b border-gray-300">
                                <td className="px-4 py-2 hidden sm:table-cell">
                                    {allToy.seller.name}
                                </td>
                                <td className="px-4 py-2">{allToy.toyName}</td>
                                <td className="px-4 py-2 hidden sm:table-cell">
                                    {allToy.subCategory}
                                </td>
                                <td className="px-4 py-2 hidden sm:table-cell">
                                    {allToy.price}
                                </td>
                                <td className="px-4 py-2 hidden sm:table-cell">
                                    {allToy.availableQuantity}
                                </td>
                                <td className="px-4 py-2">
                                    {/* View Details button (you can implement the onClick function here) */}
                                    <Link to={`/singletoy/${allToy._id}`}><button className="btn btn-outline btn-error px-4 py-2 rounded-md">
                                        View Details
                                    </button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
