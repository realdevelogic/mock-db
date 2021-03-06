CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 121535155 INCREMENT BY 1),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL,
  profile_picture VARCHAR(255) DEFAULT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  dateofbirth DATE NOT NULL,
  phonenumber VARCHAR(20) UNIQUE NOT NULL,
  phone_isverified BOOLEAN NOT NULL DEFAULT FALSE,
  email_isverified BOOLEAN DEFAULT FALSE,
  card_isverified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL
);