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

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adminID` int NOT NULL AUTO_INCREMENT,
  `adminUsername` varchar(100) NOT NULL,
  `adminPass` varchar(255) NOT NULL,
  PRIMARY KEY (`adminID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (3,'admin','$2b$10$rv0wMpgwyxi7JY1mRL4WIecU0V5kZafiStFJ6Y9KKy2XP0YZoY0Gm');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `custom_name` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `folder_name` varchar(255) NOT NULL,
  `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uploadedBy` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (2,'vro','vro.jpeg','uploads/folder/to313m53rrlc1.jpeg','folder','2025-04-21 06:50:14',NULL),(3,'mongo','MongoDB Cheat Sheet.zip','uploads/folder 2/MongoDB Cheat Sheet.zip','folder 2','2025-04-22 06:15:37',NULL);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folders`
--

DROP TABLE IF EXISTS `folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folders` (
  `folderID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `dateofCreation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ownerID` int DEFAULT NULL,
  `ownerType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`folderID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders`
--

LOCK TABLES `folders` WRITE;
/*!40000 ALTER TABLE `folders` DISABLE KEYS */;
INSERT INTO `folders` VALUES (2,'folder','2025-04-21 06:50:07',NULL,NULL),(3,'folder 2','2025-04-22 06:15:22',NULL,NULL);
/*!40000 ALTER TABLE `folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `studID` int NOT NULL AUTO_INCREMENT,
  `studentName` varchar(100) NOT NULL,
  `studentEmail` varchar(100) NOT NULL,
  `studentID` char(6) NOT NULL,
  `studentPassword` varchar(255) NOT NULL,
  `course` varchar(100) NOT NULL,
  `section` varchar(5) NOT NULL,
  PRIMARY KEY (`studID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Marc Doe','marcdoe@email.com','21001','$2b$10$zifE2ORosY12i2zXBjxoFerIL7PFwHur71cFiqFqjX83ti3VCAdN6','Information Technology','IT401'),(2,'Norma Doe','normadoe@email.com','25001','$2b$10$nqh07nBuRai3bxuNnrSok.V/WqmqvsnmduOFv4vgLi.ml1GJRJGQe','Computer Science','CS101');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectfiles`
--

DROP TABLE IF EXISTS `subjectfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectfiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `custom_name` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `folder_name` varchar(255) NOT NULL,
  `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uploadedBy` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectfiles`
--

LOCK TABLES `subjectfiles` WRITE;
/*!40000 ALTER TABLE `subjectfiles` DISABLE KEYS */;
INSERT INTO `subjectfiles` VALUES (4,'hello vro','to313m53rrlc1.jpeg','subject-uploads/Subject/1745300084267-772939033.jpeg','Subject','2025-04-22 05:34:44',NULL);
/*!40000 ALTER TABLE `subjectfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectfolders`
--

DROP TABLE IF EXISTS `subjectfolders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectfolders` (
  `subjectFoldID` int NOT NULL AUTO_INCREMENT,
  `subjectname` varchar(255) NOT NULL,
  `folderCreation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`subjectFoldID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectfolders`
--

LOCK TABLES `subjectfolders` WRITE;
/*!40000 ALTER TABLE `subjectfolders` DISABLE KEYS */;
INSERT INTO `subjectfolders` VALUES (4,'Subject','2025-04-22 05:34:19');
/*!40000 ALTER TABLE `subjectfolders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `teacherID` int NOT NULL AUTO_INCREMENT,
  `teacherName` varchar(100) NOT NULL,
  `teacherEmail` varchar(100) NOT NULL,
  `teacherPassword` varchar(255) NOT NULL,
  `department` varchar(100) NOT NULL,
  PRIMARY KEY (`teacherID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (1,'Jin Kazama','jinkazama@email.com','$2b$10$h3IsCHU8zHSe6/.NG4ANbOR4/eSXsvyFmxqgLjj3BKLjVIfluOi4m','CS Department');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 20:17:47
