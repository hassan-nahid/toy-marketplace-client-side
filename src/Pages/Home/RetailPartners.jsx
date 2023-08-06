import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const RetailPartners = () => {

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div className="my-24 mx-4" data-aos="fade-up">
            <h1 className="text-center text-3xl font-semibold my-4">Retail Partners</h1>
            <div className="flex justify-between flex-wrap mx-auto">
                <img className="w-36 h-36" src="https://images-platform.99static.com//g-pg-7A5KCg_Wn3iD7SYkwKL0qk=/0x0:1182x1182/fit-in/500x500/99designs-contests-attachments/80/80402/attachment_80402256" alt="" />
                <img className="w-36 h-36" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSot2E9MkSyQa1iOtt3ZbS_7D-H_J4WgGIltg&usqp=CAU" alt="" />
                <img className="w-36 h-36" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcLBVGdRA8taZwldoF01zbhCvZlLiAAra9hQ&usqp=CAU" alt="" />
                <img className="w-36 h-36" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8n98KF-qx2uwoqMxfpTxdTVZ7GxeiKiaYyw&usqp=CAU" alt="" />
            </div>
        </div>
    );
};

export default RetailPartners;