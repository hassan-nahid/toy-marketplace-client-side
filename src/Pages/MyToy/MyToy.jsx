import { Link, useLoaderData } from 'react-router-dom';
import { UserAuth } from '../../provider/AuthContext';

const MyToy = () => {
    const { user } = UserAuth();
    const allNewToys = useLoaderData();

    if (!user || !user.email) {
        return (
            <div className='flex justify-center my-14'>
                <Link to="/">
                    <button className='btn btn-outline btn-error'>Go Back Home</button>
                </Link>
            </div>
        );
    }

    const filteredToys = allNewToys.filter(toy => toy.sellerEmail === user.email);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Toys</h1>
            <div className="overflow-x-auto">
                <table className="w-full border rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 md:py-2 lg:py-3 xl:py-2 text-left">Name</th>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 md:py-2 lg:py-3 xl:py-2 text-left">Price</th>
                            <th className="hidden md:table-cell px-4 py-2 sm:px-6 sm:py-3 md:py-2 lg:py-3 xl:py-2 text-left">Quantity</th>
                            <th className="hidden md:table-cell px-4 py-2 sm:px-6 sm:py-3 md:py-2 lg:py-3 xl:py-2 text-left">Description</th>
                            <th className="hidden md:table-cell px-4 py-2 sm:px-6 sm:py-3 md:py-2 lg:py-3 xl:py-2 text-left">Seller Name</th>
                            <th className="hidden md:table-cell px-4 py-2 sm:px-6 sm:py-3 md:py-2 lg:py-3 xl:py-2 text-left">Seller Email</th>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 md:py-2 lg:py-3 xl:py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredToys.map(toy => (
                            <tr key={toy._id}>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3 whitespace-nowrap">{toy.name}</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">${toy.price}</td>
                                <td className="hidden md:table-cell px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">{toy.availableQuantity}</td>
                                <td className="hidden md:table-cell px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">{toy.description}</td>
                                <td className="hidden md:table-cell px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">{toy.sellerName}</td>
                                <td className="hidden md:table-cell px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">{toy.sellerEmail}</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">
                                    <button className='btn btn-sm btn-outline btn-success'>Update</button>
                                    <button className='btn btn-sm btn-outline btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyToy;
