import React from 'react';
import { useFeed } from './FeedContext';
import ArticleCard from './ArticleCard';

const SavedPage = () => {
  const { savedArticles } = useFeed();

  return (
    <div className="saved-page">
      <h1>Saved Articles</h1>
      <div className="articles-container">
        {savedArticles.length > 0 ? (
          savedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <p>You haven't saved any articles yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedPage;