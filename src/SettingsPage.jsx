import React, { useState, useEffect } from 'react';
import { useFeed } from './FeedContext';

const SettingsPage = () => {
  const { preferences, updatePreferences } = useFeed();
  const [localPrefs, setLocalPrefs] = useState(preferences);

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences]);

  const handleCategoryToggle = (category) => {
    const newCategories = localPrefs.categories.includes(category)
      ? localPrefs.categories.filter(c => c !== category)
      : [...localPrefs.categories, category];
    
    setLocalPrefs({ ...localPrefs, categories: newCategories });
  };

  const handleDepartmentToggle = (department) => {
    const newDepartments = localPrefs.departments.includes(department)
      ? localPrefs.departments.filter(d => d !== department)
      : [...localPrefs.departments, department];
    
    setLocalPrefs({ ...localPrefs, departments: newDepartments });
  };

  const handleTagToggle = (tag) => {
    const newTags = localPrefs.tags.includes(tag)
      ? localPrefs.tags.filter(t => t !== tag)
      : [...localPrefs.tags, tag];
    
    setLocalPrefs({ ...localPrefs, tags: newTags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePreferences(localPrefs);
  };

  // All possible options
  const allCategories = ['academics', 'events', 'sports', 'research', 'health', 'arts'];
  const allDepartments = ['computer-science', 'engineering', 'business', 'medicine', 'law', 'humanities'];
  const allTags = ['scholarship', 'deadline', 'workshop', 'lecture', 'competition', 'volunteer'];

  return (
    <div className="settings-page">
      <h1>Preferences</h1>
      <form onSubmit={handleSubmit}>
        <div className="preference-section">
          <h3>Categories</h3>
          <div className="preference-options">
            {allCategories.map(category => (
              <label key={category} className="preference-option">
                <input
                  type="checkbox"
                  checked={localPrefs.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="preference-section">
          <h3>Departments</h3>
          <div className="preference-options">
            {allDepartments.map(department => (
              <label key={department} className="preference-option">
                <input
                  type="checkbox"
                  checked={localPrefs.departments.includes(department)}
                  onChange={() => handleDepartmentToggle(department)}
                />
                {department.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
            ))}
          </div>
        </div>

        <div className="preference-section">
          <h3>Tags</h3>
          <div className="preference-options">
            {allTags.map(tag => (
              <label key={tag} className="preference-option">
                <input
                  type="checkbox"
                  checked={localPrefs.tags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                />
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="save-preferences-btn">
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;