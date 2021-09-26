DROP DATABASE IF EXISTS city_paws_db;

CREATE DATABASE city_paws_db;

CREATE TABLE comment (
    id int NOT NULL AUTO_INCREMENT,
    comment varchar(255),
    rating int,
    postedAt varchar(255),
    password varchar(255),
    status varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    firstName varchar(255),
    lastName varchar(255),
    email varchar(255),
    password varchar(255),
    status varchar(255),
    PRIMARY KEY (id)
    likes_id BOOLEAN NOT NULL,
  CONSTRAINT fk_comment FOREIGN KEY (comment_id) REFERENCES comment(id) ON DELETE SET NULL,
);

CREATE TABLE likes (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  user_id INTEGER,
  comment_id INTEGER
);



