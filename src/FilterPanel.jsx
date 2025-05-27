import React from 'react';
import { useFeed } from './FeedContext';

const FilterPanel = () => {
  const { filter, setFilter, preferences } = useFeed();

  const handleCategoryChange = (e) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handleDepartmentChange = (e) => {
    setFilter({ ...filter, department: e.target.value });
  };

  const handleSearchChange = (e) => {
    setFilter({ ...filter, searchQuery: e.target.value });
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>Category:</label>
        <select value={filter.category} onChange={handleCategoryChange}>
          <option value="all">All Categories</option>
          {preferences.categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Department:</label>
        <select value={filter.department} onChange={handleDepartmentChange}>
          <option value="all">All Departments</option>
          {preferences.departments.map(dept => (
            <option key={dept} value={dept}>
              {dept.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Search:</label>
        <input 
          type="text" 
          placeholder="Search articles..." 
          value={filter.searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default FilterPanel;