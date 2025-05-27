import React from 'react';
import { useFeed } from './FeedContext';  // Updated import path
import ArticleCard from './ArticleCard';
import FilterPanel from './FilterPanel';

const FeedPage = () => {
  // Add error handling for useFeed
  try {
    const { articles, filter, preferences } = useFeed();

    const filteredArticles = articles.filter(article => {
      // Filter by category
      if (filter.category !== 'all' && article.category !== filter.category) {
        return false;
      }
      
      // Filter by department
      if (filter.department !== 'all' && article.department !== filter.department) {
        return false;
      }
      
      // Filter by search query
      if (filter.searchQuery && 
          !article.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) &&
          !article.content.toLowerCase().includes(filter.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by user preferences (only show preferred categories)
      if (!preferences.categories.includes(article.category)) {
        return false;
      }
      
      return true;
    });

    return (
      <div className="feed-page">
        <h1>University News Feed</h1>
        <FilterPanel />
        <div className="articles-container">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <p>No articles match your filters. Try adjusting your preferences.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in FeedPage:", error);
    return (
      <div className="feed-page">
        <h1>University News Feed</h1>
        <p>Error loading feed. Please try again later.</p>
      </div>
    );
  }
};

export default FeedPage;