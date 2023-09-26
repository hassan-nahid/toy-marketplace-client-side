import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { useEffect } from 'react';
import { useState } from 'react';

const Slider = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/category.json');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(categories)

    return (
        <>
        {
            categories.map(item => <div key={item._id}>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    <SwiperSlide><img className='w-96 h-96' src={item.picture} alt="" /></SwiperSlide>
                </Swiper>
            </div>)
        }
        </>
    );
};

export default Slider;