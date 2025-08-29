
import { TwitterIcon, GithubIcon, LinkedInIcon } from '../assets/icons';

const Footer = () => {
  const footerLinks = {
    'Platform': ['Problems', 'Visualizer', 'Contests', 'Leaderboard'],
    'Resources': ['Docs', 'Blog', 'Help Center', 'Cheatsheets'],
    'Company': ['About Us', 'Careers', 'Contact', 'Privacy Policy'],
  };

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
               <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
               </svg>
               <span className="text-2xl font-bold text-white">My Platform</span>
            </div>
            <p className="mt-4 text-gray-400 max-w-sm">
              The ultimate platform to prepare for technical interviews and enhance your coding skills.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white tracking-wider uppercase">{title}</h4>
              <ul className="mt-4 space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} My Platform. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"><TwitterIcon /></a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"><GithubIcon /></a>
            <a href="https://www.linkedin.com/in/jitendra-sharma-998690268/" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"><LinkedInIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;