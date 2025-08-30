import React, { useState, useEffect, FormEvent } from 'react';
import { BLANK_PROBLEM, LANGUAGES } from '../constant';
import { ChevronLeftIcon } from './icons';

// interface ProblemFormPageProps {
//   problemToEdit: Problem | null;
//   onSave: (problem: Problem) => void;
//   onCancel: () => void;
// }

// Separate component to prevent re-renders of the whole form on input change
const CodeInput = ({ value, onChange, placeholder }) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-48 p-3 font-mono text-sm bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
    />
);

const Difficulty = {
  Easy : 'Easy',
  Medium : 'Medium',
  Hard : 'Hard',
}

export const ProblemFormPage = ({ problemToEdit, onSave, onCancel }) => {
  const [problem, setProblem] = useState(() => problemToEdit || BLANK_PROBLEM);
  const [currentLanguage, setCurrentLanguage] = useState('JavaScript');
  const [tagsInput, setTagsInput] = useState(() => problemToEdit?.tags.join(', ') || '');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem(prev => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (e, field) => {
    const { value } = e.target;
    setProblem(prev => ({
      ...prev,
      code: {
        ...prev.code,
        [currentLanguage]: {
          ...prev.code[currentLanguage],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalProblem = {
      ...problem,
      id: problemToEdit?.id || Date.now().toString(),
      tags: tagsInput.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    onSave(finalProblem);
  };
  
  const pageTitle = problemToEdit ? 'Edit Problem' : 'Create New Problem';

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
            <button onClick={onCancel} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-4 transition-colors">
                <ChevronLeftIcon />
                Back to Problems
            </button>
            <h1 className="text-4xl font-bold text-white">{pageTitle}</h1>
            <p className="text-gray-400 mt-1">Fill out the details for the programming challenge.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-indigo-300">Problem Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Problem Name</label>
                        <input type="text" name="name" id="name" value={problem.name} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                        <select name="difficulty" id="difficulty" value={problem.difficulty} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
                        <input type="text" name="tags" id="tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-indigo-300">Test Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="visibleTestCases" className="block text-sm font-medium text-gray-300 mb-1">Visible Test Cases</label>
                        <textarea name="visibleTestCases" id="visibleTestCases" value={problem.visibleTestCases} onChange={handleChange} rows={5} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    </div>
                    <div>
                        <label htmlFor="hiddenTestCases" className="block text-sm font-medium text-gray-300 mb-1">Hidden Test Cases</label>
                        <textarea name="hiddenTestCases" id="hiddenTestCases" value={problem.hiddenTestCases} onChange={handleChange} rows={5} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    </div>
                </div>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-indigo-300">Code Snippets</h2>
                <div className="border-b border-gray-700 mb-4">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {LANGUAGES.map(lang => (
                        <button key={lang.id} type="button" onClick={() => setCurrentLanguage(lang.id)} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${currentLanguage === lang.id ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>
                            {lang.name}
                        </button>
                    ))}
                    </nav>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Initial Code</label>
                        <CodeInput value={problem.code[currentLanguage].initialCode} onChange={(e) => handleCodeChange(e, 'initialCode')} placeholder={`Initial code for ${currentLanguage}...`} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Reference Solution</label>
                        <CodeInput value={problem.code[currentLanguage].referenceCode} onChange={(e) => handleCodeChange(e, 'referenceCode')} placeholder={`Reference solution for ${currentLanguage}...`} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors">Save Problem</button>
            </div>
        </form>
      </div>
    </div>
  );
};
