import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import auth from '../../firebase/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLoaderData } from 'react-router-dom';

const ToyEdit = () => {
    const loadData = useLoaderData();
    const [pictureUrl, setPictureUrl] = useState(loadData[0]?.picture || '');
    const [name, setName] = useState(loadData[0]?.toyName || '');
    const [subCategory, setSubCategory] = useState(loadData[0]?.subCategory || '');
    const [price, setPrice] = useState(loadData[0]?.price || 0);
    const [rating, setRating] = useState(loadData[0]?.rating || 0);
    const [availableQuantity, setAvailableQuantity] = useState(loadData[0]?.availableQuantity || 0);
    const [description, setDescription] = useState(loadData[0]?.description || '');
    
    const [user] = useAuthState(auth);
    const [categories, setCategories] = useState([]);

    const sellerName = user ? user.displayName : name;
    const sellerEmail = user ? user.email : '';
    console.log(loadData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/category.json");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !pictureUrl || !subCategory || !price || !rating || !availableQuantity || !description) {
            toast.error('All fields must be filled', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
    
        if (rating > 5) {
            toast.error('Rating cannot be more than 5', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
    
        const updatedToy = {
            subCategory,
            picture: pictureUrl,
            toyName: name,
            seller: {
                name: sellerName,
                email: sellerEmail
            },
            price: Number(price),
            rating: Number(rating),
            availableQuantity: Number(availableQuantity),
            description
        };
    
        try {
            const response = await fetch(`http://localhost:5000/update_toy/${loadData[0]?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedToy),
            });
    
            if (response.ok) {
                toast.success('Toy updated successfully!', {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                console.error('Error updating toy');
                toast.error('Error updating toy', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } catch (error) {
            console.error('Error sending request:', error);
            toast.error('Error sending request', {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };
    
    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Deen Inspire | Edit Toy</title>
            </Helmet>
            <h2 className="text-3xl font-Semibold text-center text-red-600 my-4">Edit Toy</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Toy Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter toy name" className="mt-1 p-2 w-full border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Picture URL of the toy:</label>
                    <input type="text" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} placeholder="Enter picture URL" className="mt-1 p-2 w-full border rounded" />
                </div>
                {user?.displayName === null ? <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Seller Name:</label>
                    <input type="text" value={sellerName} className="mt-1 p-2 w-full border rounded bg-gray-100" />
                </div> : <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Seller Name:</label>
                    <input type="text" value={sellerName} disabled className="mt-1 p-2 w-full border rounded bg-gray-100" />
                </div>}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Seller Email:</label>
                    <input type="email" value={sellerEmail} disabled className="mt-1 p-2 w-full border rounded bg-gray-100" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Sub-category:</label>
                    <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="mt-1 p-2 w-full border rounded">
                        <option value="">Select sub-category</option>
                        {categories.map((subCat) => (
                            <option key={subCat._id} value={subCat.subCategory}>{subCat.subCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" className="mt-1 p-2 w-full border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Rating:</label>
                    <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Enter rating (1-5)" className="mt-1 p-2 w-full border rounded" max="5" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Available Quantity:</label>
                    <input type="number" value={availableQuantity} onChange={(e) => setAvailableQuantity(e.target.value)} placeholder="Enter available quantity" className="mt-1 p-2 w-full border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Detail Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter detail description" className="mt-1 p-2 w-full border rounded"></textarea>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline btn-error">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ToyEdit;
