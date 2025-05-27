import React from 'react';
import { useFeed } from './FeedContext'; // Corrected import path

const ArticleCard = ({ article }) => {
  // Add error handling for useFeed
  try {
    const { saveArticle, removeSavedArticle, savedArticles } = useFeed();
    const isSaved = savedArticles.some(saved => saved.id === article.id);

    const handleSave = () => {
      if (isSaved) {
        removeSavedArticle(article.id);
      } else {
        saveArticle(article);
      }
    };

    return (
      <div className="article-card">
        {article.image && (
          <div className="article-image">
            <img src={article.image} alt={article.title} />
          </div>
        )}
        <div className="article-content">
          <h3>{article.title}</h3>
          <p className="meta">
            {article.category} • {article.department} • {article.date}
          </p>
          <p>{article.content}</p>
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags">
              {article.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <button onClick={handleSave} className="save-btn">
            {isSaved ? 'Unsave' : 'Save'}
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in ArticleCard:", error);
    return (
      <div className="article-card error">
        <div className="article-content">
          <h3>Error displaying article</h3>
          <p>This article couldn't be loaded properly.</p>
        </div>
      </div>
    );
  }
};

export default ArticleCard;