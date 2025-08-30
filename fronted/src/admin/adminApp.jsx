
import React, { useState, useCallback, useEffect } from 'react';
import { LoginPage } from './component/LoginPage';
import { ProblemListPage } from './component/problemListPage';
import { ProblemFormPage } from './component/probleFormPage';
import { MOCK_PROBLEMS } from './constant';

// type Page = 'login' | 'list' | 'form';

function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('list');
  const [problems, setProblems] = useState(MOCK_PROBLEMS);
  const [editingProblemId, setEditingProblemId] = useState(null);

  // Persist login state
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
        setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = useCallback((password) => {
    // In a real app, this would be a secure API call.
    if (password === 'admin') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  }, []);

  const navigateToForm = useCallback((id) => {
    setEditingProblemId(id);
    setCurrentPage('form');
  }, []);

  const navigateToList = useCallback(() => {
    setEditingProblemId(null);
    setCurrentPage('list');
  }, []);

  const handleSaveProblem = useCallback((problemToSave) => {
    setProblems(prevProblems => {
      const exists = prevProblems.some(p => p.id === problemToSave.id);
      if (exists) {
        return prevProblems.map(p => p.id === problemToSave.id ? problemToSave : p);
      }
      return [...prevProblems, problemToSave];
    });
    navigateToList();
  }, [navigateToList]);

  const handleDeleteProblem = useCallback((id) => {
    setProblems(prevProblems => prevProblems.filter(p => p.id !== id));
  }, []);
  
  const problemToEdit = problems.find(p => p.id === editingProblemId) || null;

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <main>
      {currentPage === 'list' && (
        <ProblemListPage
          problems={problems}
          onAdd={() => navigateToForm(null)}
          onEdit={navigateToForm}
          onDelete={handleDeleteProblem}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'form' && (
        <ProblemFormPage
          problemToEdit={problemToEdit}
          onSave={handleSaveProblem}
          onCancel={navigateToList}
        />
      )}
    </main>
  );
}

export default AdminApp;