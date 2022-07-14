CREATE TABLE IF NOT EXISTS user_favorites (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  product_id INT NOT NULL REFERENCES products(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);