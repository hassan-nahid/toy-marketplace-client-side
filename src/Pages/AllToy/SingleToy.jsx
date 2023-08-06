import { useLoaderData } from "react-router-dom";
import SIngleToyCard from "./SIngleToyCard";

const SingleToy = () => {
    const allToys = useLoaderData();
    
    console.log(allToys)
    return (
        <div>
            {
                allToys.map(allToy => <SIngleToyCard
                key={allToy._id}
                allToy={allToy}
                ></SIngleToyCard>)
            }
        </div>
    );
};

export default SingleToy;