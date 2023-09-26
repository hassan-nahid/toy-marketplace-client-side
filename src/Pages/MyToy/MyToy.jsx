import { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { UserAuth } from '../../provider/AuthContext';
import { Helmet } from 'react-helmet';

const MyToy = () => {
    const { user } = UserAuth();
    const allNewToys = useLoaderData();
    const [data, setData] = useState([])
    const [updateStates, setUpdateStates] = useState(() => {
        const savedUpdateStates = localStorage.getItem('updateStates');
        return savedUpdateStates ? JSON.parse(savedUpdateStates) : {};
    });
    const [sortedByPriceAsc, setSortedByPriceAsc] = useState(true); // Initial sort order

    useEffect(() => {
        setData(allNewToys);
    }, [allNewToys]);

    useEffect(() => {
        localStorage.setItem('updateStates', JSON.stringify(updateStates));
    }, [updateStates]);


    const handleDelete = id => {
        const proceed = window.confirm("Are you sure you want to delete?");
        if (proceed) {
            fetch(`https://toy-marketplace-server-seven-mu.vercel.app/allnewtoys/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deleteCount > 0) {
                        alert('Delete successful');
                        const remaining = allNewToys.filter(allNewToy => allNewToy._id !== id)
                        setData(remaining)
                    }
                })
                .catch(error => {
                    console.error('Delete error:', error);
                });
        }
    }




    if (!user || !user.email) {
        return (
            <div className='flex justify-center my-14'>
                <Link to="/">
                    <button className='btn btn-outline btn-error'>Go Back Home</button>
                </Link>
            </div>
        );
    }

    let sortedToys = [...data]; // Create a copy of the toy list

    if (sortedByPriceAsc) {
        sortedToys.sort((a, b) => a.price - b.price); // Sort in ascending order
    } else {
        sortedToys.sort((a, b) => b.price - a.price); // Sort in descending order
    }

    const handleUpdateClick = (toyId) => {
        setUpdateStates(prevStates => ({
            ...prevStates,
            [toyId]: true
        }));
    };

    const toggleSortOrder = () => {
        setSortedByPriceAsc(prevValue => !prevValue);
    };

    return (
        <div className="p-4">
            <Helmet>
                <meta charSet="utf-8" />
                <title>ABC TOYS | My Toys</title>
            </Helmet>
            <h1 className="text-3xl font-semibold text-center text-red-600 my-4">My Toys</h1>
            <div className="overflow-x-auto">
                <div className="flex mb-2">
                    <label htmlFor="sortOrder" className="mr-2">Sort Order:</label>
                    <select
                        id="sortOrder"
                        className="btn btn-outline btn-primary"
                        value={sortedByPriceAsc ? 'asc' : 'desc'}
                        onChange={toggleSortOrder}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
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
                        {sortedToys.map(toy => (
                            <tr key={toy._id}>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3 whitespace-nowrap">{toy.name}</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">${toy.price}</td>
                                <td className="hidden md:table-cell px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">{toy.availableQuantity}</td>
                                <td className="hidden md:table-cell px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">{toy.description}</td>
                                <td className="hidden md:table-cell px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">{toy.sellerName}</td>
                                <td className="hidden md:table-cell px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">{toy.sellerEmail}</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 md:py-3 lg:py-4 xl:py-3">
                                    <button
                                        className={`btn btn-sm ${updateStates[toy._id] ? 'btn-success-disabled' : 'btn-outline btn-success'}`}
                                        onClick={() => handleUpdateClick(toy._id)}
                                        disabled={updateStates[toy._id]}
                                    >
                                        {updateStates[toy._id] ? 'Updated' : 'Update'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(toy._id)}
                                        className='btn btn-sm btn-outline btn-danger my-1'>Delete</button>
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
