\c nc_news_test

SELECT * FROM topics;

SELECT * FROM users
WHERE users.username = 'tickle122';

SELECT articles.article_id, count(comment_id) FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id;