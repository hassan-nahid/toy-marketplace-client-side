const Banner = () => {
    return (
      <div className="relative my-6">
        <img
          className="w-full max-h-96 rounded-lg"
          src="cars-toy.jpg"
          alt="Your Best And New Toy Here"
        />
        {/* https://parkers-images.bauersecure.com/wp-images/186240/best-car-toys-kids.jpg */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-2xl text-white font-semibold mb-3">Your Best And New Toy Here</h2>
          <button className="btn text-red-600">Shop Now</button>
        </div>
      </div>
    );
  };
  
  export default Banner;
  