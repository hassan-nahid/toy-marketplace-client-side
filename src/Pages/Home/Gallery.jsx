import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";



const Gallery = () => {
    useEffect(()=> {
        AOS.init({duration:2000});
    },[]);
    return (
        <div data-aos="fade-up">
            <h2 className="text-3xl text-center font-semibold mt-10 mb-4 text-red-600">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Place your images here */}
                <img
                    src="https://media.4rgos.it/s/Argos/1998719_R_SET?$Main768$&w=620&h=620"
                    alt="Image 1"
                    className="rounded-lg hover:scale-110 transition-transform"
                />
                <img
                    src="https://rukminim2.flixcart.com/image/850/1000/xif0q/vehicle-pull-along/s/j/r/die-cast-metal-car-toy-mini-model-of-fire-truck-for-kids-vasuki-original-imagj3rmwunkjhgp.jpeg?q=20"
                    alt="Image 2"
                    className="rounded-lg hover:scale-110 transition-transform"
                />
                <img
                    src="https://www.mightymoms.club/review/wp-content/uploads/2022/08/Best-Choice-mighty-moms.jpg"
                    alt="Image 3"
                    className="rounded-lg hover:scale-110 transition-transform"
                />
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiPiGKjFMwycI-4gvUAo4rQjl8disxCekNcw&usqp=CAU"
                    alt="Image 4"
                    className="rounded-lg hover:scale-110 transition-transform"
                />
            </div>
        </div>
    );
};

export default Gallery;