\c nc_news_test


-- SELECT * FROM comments;
-- SELECT * FROM users;

-- SELECT * FROM topics;

-- SELECT * FROM users
-- WHERE users.username = 'tickle122';

-- SELECT articles.article_id, count(comment_id) FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id;

-- SELECT distinct article_id FROM comments;

-- SELECT article_id FROM articles;

-- UPDATE articles 
-- SET votes = votes + 10 
-- WHERE article_id = 1;

-- SELECT article_id, votes FROM articles;

  -- WHERE comments.article_id = 1
--   INSERT INTO comments (author, article_id, votes, created_at, body)
--   VALUES ('butter_bridge', 1, DEFAULT, CURRENT_TIMESTAMP, 'This is a comment')
--   ;

-- SELECT * FROM comments;

SELECT articles.article_id, count(comments.comment_id)
FROM articles INNER JOIN comments ON articles.article_id = comments.article_id
WHERE articles.article_id = 1
GROUP BY articles.article_id

;



