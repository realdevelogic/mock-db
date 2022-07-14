CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (START WITH 100001 INCREMENT BY 1),
  category_id INT NOT NULL REFERENCES product_categories(id),
  brand_id INT NOT NULL REFERENCES product_brands(id),
  name VARCHAR(155) NOT NULL,
  thumbnail VARCHAR(255),
  unlimited BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT FALSE,
  images TEXT,
  features TEXT,
  short_description VARCHAR(255) NOT NULL,
  long_description TEXT,
  price NUMERIC(12, 0) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  edited_at TIMESTAMP NULL
);