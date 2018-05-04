CREATE DATABASE IF NOT EXISTS primer_parcial_lab4;
USE primer_parcial_lab4;

CREATE TABLE personas(
    id int(255) auto_increment not null,
    name varchar(255) not null,
    email varchar(50),
    sex varchar(50),
    image varchar(255),
    CONSTRAINT pk_productos PRIMARY KEY(id)
)ENGINE=InnoDb;

