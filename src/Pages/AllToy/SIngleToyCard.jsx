import ReactStars from "react-rating-stars-component";

const SIngleToyCard = ({ allToy }) => {
    const { toyName, picture, seller, price, rating, availableQuantity, description, subCategory } = allToy;
    console.log(allToy)
    return (
        <div className="my-8 flex flex-col md:flex-row lg:flex-row justify-center gap-5 items-center">
            <div className="w-full lg:w-[50%]">
                <img className="m-4 w-[80%]" src={picture} alt="" />
            </div>
            <div className="w-full lg:w-[50%] p-4 border">
                <h2 className="text-red-600 text-xl font-semibold">Toy Name:{toyName}</h2>
                <p className="font-semibold my-2 text-yellow-700">Price: ${price}</p>
                <h1 className="font-semibold">Seller Name: {seller.name}</h1>
                <h1 className="font-semibold">Seller Email: {seller.email}</h1>
                <h3 className="font-semibold">Available Quantity: {availableQuantity}</h3>
                <h3 className="font-semibold">Category: {subCategory}</h3>
                <h2 className="font-semibold mb-2">{description}</h2>
                <div className="flex items-center">
                    <ReactStars
                        count={5}
                        value={rating}
                        size={24}
                        activeColor="#ffd700"
                    />
                    <p className="mt-1 pl-1">{rating}</p>
                </div>
            </div>
        </div>
    );
};

export default SIngleToyCard;