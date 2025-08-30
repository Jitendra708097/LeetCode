import React, { useState, useMemo, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon } from './icons';
import { Modal } from '../component/modal';

// interface ProblemListPageProps {
//   problems: Problem[];
//   onEdit: (id: string) => void;
//   onDelete: (id: string) => void;
//   onAdd: () => void;
//   onLogout: () => void;
// }

const DifficultyBadge = ({ difficulty }) => {
  const colorClasses = {
    ['Easy']: 'bg-green-600 text-green-100',
    ['Medium']: 'bg-yellow-600 text-yellow-100',
    ['Hard']: 'bg-red-600 text-red-100',
  };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClasses[difficulty]}`}>
      {difficulty}
    </span>
  );
};

export const ProblemListPage = ({ problems, onEdit, onDelete, onAdd, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [problemToDelete, setProblemToDelete] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProblems = useMemo(() => {
    return problems.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [problems, searchTerm]);

  const handleDeleteClick = (problem) => {
    setProblemToDelete(problem);
  };

  const handleConfirmDelete = () => {
    if (problemToDelete) {
      onDelete(problemToDelete.id);
      setProblemToDelete(null);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-400 mb-4 sm:mb-0">DSA Problems</h1>
          <div className="flex items-center space-x-4">
             <button onClick={onLogout} className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors text-sm">Logout</button>
            <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-transform transform hover:scale-105">
              <PlusIcon />
              <span>New Problem</span>
            </button>
          </div>
        </header>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Difficulty</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tags</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredProblems.map((problem, index) => (
                  <tr key={problem.id} className={`hover:bg-gray-700/50 transition-colors duration-500`} style={{ animationDelay: `${index * 50}ms`, animation: `fadeInUp 0.5s ease-out forwards`, opacity: 0 }}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{problem.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><DifficultyBadge difficulty={problem.difficulty} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.map(tag => <span key={tag} className="px-2 py-0.5 text-xs bg-gray-700 rounded-full">{tag}</span>)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-4">
                        <button onClick={() => onEdit(problem.id)} className="text-indigo-400 hover:text-indigo-300 transition-colors" aria-label={`Edit ${problem.name}`}><EditIcon /></button>
                        <button onClick={() => handleDeleteClick(problem)} className="text-red-400 hover:text-red-300 transition-colors" aria-label={`Delete ${problem.name}`}><TrashIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProblems.length === 0 && <p className="text-center py-8 text-gray-400">No problems found.</p>}
          </div>
        </div>
      </div>
      <Modal
        isOpen={!!problemToDelete}
        onClose={() => setProblemToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Problem"
      >
        Are you sure you want to delete the problem "{problemToDelete?.name}"? This action cannot be undone.
      </Modal>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
