# Start Page

This is just a simple start page project that stores its data in a MySQL database.

![Sample image](https://github.com/dwatling/dwatling.github.io/blob/master/images/start-page-snapshot.png)

[Video Series](https://youtu.be/UFfujAuuijA)

## Docker

```docker pull synaptiklabs/startpage```

Add the following environment variables to the container:

* MYSQL_HOST (e.g. 127.0.0.1)
* MYSQL_DB (e.g. startpage)
* MYSQL_USER (e.g. startpage)
* MYSQL_PASSWORD (e.g. startpage)

Before the container starts up, you will need to create the schema and user. 

You can create the schema with the following SQL:

```
CREATE DATABASE `startpage` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `tag` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `label` varchar(45) NOT NULL,
  `url` varchar(255) NOT NULL,
  `icon` varchar(4096) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```