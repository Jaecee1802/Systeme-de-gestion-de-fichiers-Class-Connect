-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: classconnectaccounts
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS admin;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  adminID int NOT NULL AUTO_INCREMENT,
  adminUsername varchar(100) NOT NULL,
  adminPass varchar(255) NOT NULL,
  PRIMARY KEY (adminID)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES admin WRITE;
/*!40000 ALTER TABLE admin DISABLE KEYS */;
INSERT INTO admin VALUES (3,'admin','$2b$10$rv0wMpgwyxi7JY1mRL4WIecU0V5kZafiStFJ6Y9KKy2XP0YZoY0Gm');
/*!40000 ALTER TABLE admin ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS files;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE files (
  id int NOT NULL AUTO_INCREMENT,
  custom_name varchar(255) NOT NULL,
  original_name varchar(255) NOT NULL,
  file_path varchar(255) NOT NULL,
  folder_name varchar(255) NOT NULL,
  upload_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  uploadedBy int DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES files WRITE;
/*!40000 ALTER TABLE files DISABLE KEYS */;
INSERT INTO files VALUES (13,'DFD Level 0 ','wmremove-transformed.jpeg','uploads/newFolder/wmremove-transformed.jpeg','newFolder','2025-04-01 05:52:55',NULL);
/*!40000 ALTER TABLE files ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folders`
--

DROP TABLE IF EXISTS folders;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE folders (
  folderID int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  dateofCreation timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (folderID)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders`
--

LOCK TABLES folders WRITE;
/*!40000 ALTER TABLE folders DISABLE KEYS */;
INSERT INTO folders VALUES (11,'admin','2025-04-01 05:47:33'),(12,'newFolder','2025-04-01 05:51:25');
/*!40000 ALTER TABLE folders ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS students;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE students (
  studID int NOT NULL AUTO_INCREMENT,
  studentName varchar(100) NOT NULL,
  studentEmail varchar(100) NOT NULL,
  studentID char(6) NOT NULL,
  studentPassword varchar(255) NOT NULL,
  course varchar(100) NOT NULL,
  section varchar(5) NOT NULL,
  PRIMARY KEY (studID)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES students WRITE;
/*!40000 ALTER TABLE students DISABLE KEYS */;
INSERT INTO students VALUES (3,'Jane Doe','janedoe@email.com','250001','password101','',''),(6,'test','test@email.com','26000','$2b$10$WfSkdmWQqNSaMg3/k/jVjugCImcCWL949pu9/qOoPBTvLMvD8okz2','Computer Science','CS101'),(9,'test 2 ','test2@email.com','260001','$2b$10$rlJQZ1SDvz2paHxIdJwBtO94eujrNSCYRUYTnT/ADb9yjmVenjnXy','Computer Science','CS101'),(12,'Mark Doe','markdoe@email.com','21002','$2b$10$n6bUTLb6GTOpC1ZqyV2so.od0k9bPzf0ZjtJNzwPTEFbPxMQr557C','Information Technology','IT401');
/*!40000 ALTER TABLE students ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS teachers;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE teachers (
  teacherID int NOT NULL AUTO_INCREMENT,
  teacherName varchar(100) NOT NULL,
  teacherEmail varchar(100) NOT NULL,
  teacherPassword varchar(255) NOT NULL,
  department varchar(100) NOT NULL,
  PRIMARY KEY (teacherID)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES teachers WRITE;
/*!40000 ALTER TABLE teachers DISABLE KEYS */;
INSERT INTO teachers VALUES (1,'test ','test@email.com','$2b$10$BhIxbohp/kBV.83oURSHz.bBDEUnxHcihm0R5BAOXWlYdYagd/XwG','CS Department');
/*!40000 ALTER TABLE teachers ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-03  6:56:44
