import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import auth from '../../firebase/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const MyToy = () => {
    const [user] = useAuthState(auth);
    const [toyData, setData] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/all_toys/${user.email}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [user?.email]);



    const handleDelete = (id) => {
        fetch(`http://localhost:5000/delete_toy/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    // Filter the state data to remove the deleted toy
                    const remaining = toyData.filter(toy => toy._id !== id);
                    setData(remaining);
                    toast.success('Toy deleted successfully');
                } else {
                    throw new Error('Toy not deleted');
                }
            })
            .catch(error => {
                console.error('Error deleting toy:', error);
                toast.error('Error deleting toy');
            });
    };
    

    if (!user || !user.email) {
        return (
            <div className='flex justify-center my-14'>
                <Link to="/">
                    <button className='btn btn-outline btn-error'>Go Back Home</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 w-full">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Deen Inspire | My Toys</title>
            </Helmet>
            <h1 className="text-3xl font-semibold text-center text-red-600 my-4">My Toys</h1>
            <div className="overflow-x-auto w-full">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Index
                            </th>
                            <th>Toy Info</th>
                            <th>Price & Rating</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {toyData.map((toy, index) => (
                            <tr key={toy._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={toy.picture}
                                                    alt={toy.toyName}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Price: ${toy.price}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Rating: {toy.rating} stars</span>
                                </td>
                                <td>{toy.availableQuantity}</td>
                                <th className='flex gap-1 flex-wrap'>
                                    <Link to={`/singletoy/${toy._id}`}  className="btn text-white btn-primary btn-xs">details</Link>
                                    <Link to={`/dashboard/toy_edit/${toy._id}`} className="btn text-white btn-warning btn-xs">Edit</Link>
                                    <button onClick={() => handleDelete(toy._id)} className="btn text-white btn-error btn-xs">Delete</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>
                                Index
                            </th>
                            <th>Toy Info</th>
                            <th>Price & Rating</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default MyToy;
