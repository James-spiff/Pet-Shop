CREATE DATABASE pupsdb;

CREATE TABLE pups(
    pup_id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    description VARCHAR(255) NOT NULL,
    pup_image bytea NOT NULL,
    breed VARCHAR(50) NOT NULL,
    sex BOOLEAN NOT NULL,
    pup_status BOOLEAN NOT NULL,
    age VARCHAR(20) NOT NULL,
    price DECIMAL NOT NULL,
    numReviews DECIMAL DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT NULL
);

CREATE TABLE user(

);