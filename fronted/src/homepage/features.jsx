
import { CodeIcon, EyeIcon, BookOpenIcon, UsersIcon } from '../assets/icons';


const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-indigo-500 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2">
    <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-indigo-600/20 text-indigo-400">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  const featuresData = [
    {
      icon: <CodeIcon />,
      title: 'Extensive Problem Bank',
      description: 'Solve a wide variety of DSA problems, from easy to hard, covering all essential topics for top tech company interviews.'
    },
    {
      icon: <EyeIcon />,
      title: 'DSA Visualizer',
      description: 'Understand complex algorithms and data structures by watching them in action with our interactive, step-by-step visualizers.'
    },
    {
      icon: <BookOpenIcon />,
      title: 'Curated DSA Paths',
      description: 'Follow structured learning paths curated by industry experts to master Data Structures and Algorithms systematically.'
    },
    {
      icon: <UsersIcon />,
      title: 'Interview Prep Kits',
      description: 'Get ready for your next big interview with company-specific problem lists, mock interviews, and behavioral question guides.'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why Choose Our Platform?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            We provide the tools and resources you need to excel in your coding journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;