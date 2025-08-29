

const Hero = () => {
  return (
    <section className="relative py-20 sm:py-32">
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/tech/1920/1080"
          alt="Coding background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Master Algorithms, <br className="hidden sm:block" />
          <span className="text-indigo-400">Ace Your Interviews.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
          Our platform provides everything you need to sharpen your coding skills, from interactive problems to in-depth visualizers. Prepare for success and land your dream tech role.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
          >
            Start Solving
          </a>
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-gray-200 bg-gray-700/50 rounded-lg shadow-lg hover:bg-gray-600/50 transform hover:scale-105 transition-all duration-300"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
