
import  { useState } from 'react';


const Logo = () => (
  <div className="flex items-center space-x-2">
    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
    </svg>
    <span className="text-2xl font-bold text-white">My Platform</span>
  </div>
);

const NavLinks = () => (
  <nav className="hidden md:flex items-center space-x-6">
    {['Problems', 'DSA Visualizer', 'DSA', 'Interview Prep'].map((item) => (
      <a key={item} href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
        {item}
      </a>
    ))}
  </nav>
);

const AuthButtons = ({ onToggleLogin }) => (
  <div className="flex items-center space-x-4">
    <button onClick={onToggleLogin} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
      Sign In
    </button>
    <button className="hidden sm:block px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300">
      Log In
    </button>
  </div>
);

const UserProfile = ({ onToggleLogin }) => (
  <div className="relative">
    <button onClick={onToggleLogin} className="flex items-center space-x-2">
      <img
        src="https://picsum.photos/seed/user/40/40"
        alt="User profile"
        className="w-10 h-10 rounded-full border-2 border-indigo-400"
      />
    </button>
  </div>
);

const Header = ({ isLoggedIn, onToggleLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm shadow-md shadow-indigo-500/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex flex-1 justify-center">
            <NavLinks />
          </div>
          <div className="hidden md:flex items-center">
            {isLoggedIn ? <UserProfile onToggleLogin={onToggleLogin} /> : <AuthButtons onToggleLogin={onToggleLogin} />}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              {['Problems', 'DSA Visualizer', 'DSA', 'Interview Prep'].map((item) => (
                <a key={item} href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-700">
                 {isLoggedIn ? <UserProfile onToggleLogin={onToggleLogin} /> : <AuthButtons onToggleLogin={onToggleLogin} />}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;