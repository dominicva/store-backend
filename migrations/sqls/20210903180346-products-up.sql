CREATE TABLE products
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(50),
  previous_owner VARCHAR(100),
  weight integer,
  price decimal
)