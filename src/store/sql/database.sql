CREATE DATABASE news_portal;

USE news_portal;

CREATE TABLE categories(
    id VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    data_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_category PRIMARY KEY(id)
);

CREATE TABLE news(
    id VARCHAR(255) NOT NULL,
    category_id VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    news TEXT NOT NULL,
    data_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_news PRIMARY KEY(id),
    CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES categories(id)
);

