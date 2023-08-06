import  { useState } from "react";
import { useLoaderData } from "react-router-dom";

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
    <div className="p-4">
      {/* Search input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by Toy Name..."
        className="px-4 py-2 mb-4 w-full rounded-md border border-gray-300"
      />

      {/* All Toys table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">Seller</th>
            <th className="px-4 py-2">Toy Name</th>
            <th className="px-4 py-2">Sub-category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Available Quantity</th>
            <th className="px-4 py-2">View Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredToys.slice(0, limit).map((allToy) => (
            <tr key={allToy._id} className="border-b border-gray-300">
              <td className="px-4 py-2">{allToy.seller.name}</td>
              <td className="px-4 py-2">{allToy.toyName}</td>
              <td className="px-4 py-2">{allToy.subCategory}</td>
              <td className="px-4 py-2">{allToy.price}</td>
              <td className="px-4 py-2">{allToy.availableQuantity}</td>
              <td className="px-4 py-2">
                {/* View Details button (you can implement the onClick function here) */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
