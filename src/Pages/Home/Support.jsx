import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Support = () => {

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div className="my-4" data-aos="fade-down">
            <h1 className="text-center text-3xl font-semibold my-4">Support</h1>
            <div className="bg-red-600 flex justify-between flex-wrap p-4">
                <div className="flex flex-col justify-center items-center">
                    <img src="https://i0.wp.com/abctoysbd.com/wp-content/uploads/2022/05/delivery-xxl-50x50-1.png?fit=50%2C50&ssl=1" alt="" />
                    <div>
                        <p className="text-white font-semibold">FAST SHIPPING</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img src="https://i0.wp.com/abctoysbd.com/wp-content/uploads/2022/05/download-2-xxl-50x50-1.png?fit=50%2C50&ssl=1" alt="" />
                    <div>
                        <p className="text-white font-semibold">ONLINE PAYMENT</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img src="https://i0.wp.com/abctoysbd.com/wp-content/uploads/2022/05/phone-xxl-50x50-1.png?fit=50%2C50&ssl=1" alt="" />
                    <div>
                        <p className="text-white font-semibold">24/7 SUPPORT</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img src="https://i0.wp.com/abctoysbd.com/wp-content/uploads/2022/05/delivery-xxl-50x50-2.png?fit=50%2C50&ssl=1" alt="" />
                    <div>
                        <p className="text-white font-semibold">On time Delivery.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;