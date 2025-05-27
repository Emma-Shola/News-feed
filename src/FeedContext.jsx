import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const FeedContext = createContext();

// Create the provider component
export const FeedProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [preferences, setPreferences] = useState({
    categories: ['academics', 'events', 'sports', 'research'],
    departments: ['computer-science', 'engineering', 'business'],
    tags: ['scholarship', 'deadline', 'workshop']
  });
  const [filter, setFilter] = useState({
    category: 'all',
    department: 'all',
    searchQuery: ''
  });

  // Load initial data
  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockArticles = [
      {
        id: 1,
        title: 'Computer Science Department Seminar',
        content: 'Join us for a seminar on AI advancements this Friday...',
        category: 'academics',
        department: 'computer-science',
        tags: ['workshop'],
        date: '2023-06-15',
        image: '/images/seminar.jpg'
      },
      {
        id: 2,
        title: 'Basketball Team Wins Championship',
        content: 'University team wins regional championship...',
        category: 'sports',
        department: 'all',
        tags: [],
        date: '2023-06-10',
        image: '/images/basketball.jpg'
      },
    ];
    setArticles(mockArticles);
    
    // Load saved articles from localStorage
    const saved = JSON.parse(localStorage.getItem('savedArticles')) || [];
    setSavedArticles(saved);

    // Load preferences from localStorage if they exist
    const savedPrefs = JSON.parse(localStorage.getItem('userPreferences'));
    if (savedPrefs) {
      setPreferences(savedPrefs);
    }
  }, []);

  const saveArticle = (article) => {
    const updatedSaved = [...savedArticles, article];
    setSavedArticles(updatedSaved);
    localStorage.setItem('savedArticles', JSON.stringify(updatedSaved));
  };

  const removeSavedArticle = (articleId) => {
    const updatedSaved = savedArticles.filter(article => article.id !== articleId);
    setSavedArticles(updatedSaved);
    localStorage.setItem('savedArticles', JSON.stringify(updatedSaved));
  };

  const updatePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
  };

  return (
    <FeedContext.Provider value={{
      articles,
      savedArticles,
      preferences,
      filter,
      setFilter,
      saveArticle,
      removeSavedArticle,
      updatePreferences
    }}>
      {children}
    </FeedContext.Provider>
  );
};

// Custom hook for consuming the context
export const useFeed = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
};