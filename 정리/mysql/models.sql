show tables;
show create table students;
show create table subjects;
show create table clubs;
show create table professors;
show create table enroll;

CREATE TABLE `students` (
   `id` int unsigned NOT NULL AUTO_INCREMENT,
   `name` varchar(10) NOT NULL,
   `yy` varchar(30) DEFAULT NULL,
   `phoneNumber` varchar(13) DEFAULT NULL,
   `email` varchar(25) DEFAULT NULL,
   `birth` varchar(10) NOT NULL,
   `address` varchar(5) NOT NULL,
   `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subjects` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(31) NOT NULL,
   `professorId` int NOT NULL DEFAULT '1',
   PRIMARY KEY (`id`),
   KEY `fk_subject_professor` (`professorId`),
   CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`professorId`) REFERENCES `professors` (`id`) ON DELETE SET DEFAULT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `clubs` (
   `id` int unsigned NOT NULL AUTO_INCREMENT,
   `name` varchar(31) NOT NULL,
   `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `leader` int unsigned DEFAULT NULL,
   PRIMARY KEY (`id`),
   KEY `fk_leader_students` (`leader`),
   CONSTRAINT `clubs_ibfk_1` FOREIGN KEY (`leader`) REFERENCES `students` (`id`)
   ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
   
CREATE TABLE `professors` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(31) NOT NULL,
   `likeCnt` smallint DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 CREATE TABLE `enroll` (
   `id` int NOT NULL AUTO_INCREMENT,
   `subjectId` int NOT NULL,
   `studentId` int unsigned NOT NULL,
   PRIMARY KEY (`id`),
   KEY `fk_enroll_subject` (`subjectId`),
   KEY `fk_enroll_student` (`studentId`),
   CONSTRAINT `enroll_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`id`) ON DELETE SET DEFAULT,
   CONSTRAINT `enroll_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE SET DEFAULT
 ) ENGINE=InnoDB AUTO_INCREMENT=1024 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;