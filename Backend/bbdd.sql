CREATE DATABASE IF NOT EXISTS primer_parcial_lab4;
USE primer_parcial_lab4;

DROP TABLE IF EXISTS personas;
CREATE TABLE personas(
    id int(255) auto_increment not null,
    name varchar(255) not null,
    email varchar(50),
    sex varchar(50),
    image varchar(255),
    CONSTRAINT pk_productos PRIMARY KEY(id)
)ENGINE=InnoDb;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios(
    id int(255) auto_increment not null,
    name varchar(255) not null,
    email varchar(50) not null,
    password varchar(255) not null,
    CONSTRAINT pk_usuarios PRIMARY KEY(id)
)ENGINE=InnoDb;

INSERT INTO usuarios VALUES (null, 'admin', 'admin@email.com', '81dc9bdb52d04dc20036dbd8313ed055') 