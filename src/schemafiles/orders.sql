CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  order_amount NUMERIC(12,0) NOT NULL,
  ship_address VARCHAR(50) NOT NULL
);