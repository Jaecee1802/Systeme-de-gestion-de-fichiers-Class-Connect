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
  `adminUsername` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `adminPass` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`adminID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
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
  `custom_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `original_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `folder_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ownerID` int DEFAULT NULL,
  `ownerRole` enum('teacher','student','admin') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_file` (`ownerID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folders`
--

DROP TABLE IF EXISTS `folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dateofCreation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ownerID` int DEFAULT NULL,
  `ownerRole` enum('teacher','student','admin') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_students` (`ownerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders`
--

LOCK TABLES `folders` WRITE;
/*!40000 ALTER TABLE `folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentgrades`
--

DROP TABLE IF EXISTS `studentgrades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentgrades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activityname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `grade` tinyint DEFAULT NULL,
  `overallgrade` tinyint DEFAULT NULL,
  `studentID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_studentid` (`studentID`),
  CONSTRAINT `fk_studentid` FOREIGN KEY (`studentID`) REFERENCES `students` (`studID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentgrades`
--

LOCK TABLES `studentgrades` WRITE;
/*!40000 ALTER TABLE `studentgrades` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentgrades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `studID` int NOT NULL AUTO_INCREMENT,
  `studentName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `studentEmail` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `studentID` char(6) COLLATE utf8mb4_general_ci NOT NULL,
  `studentPassword` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `course` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `section` varchar(5) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`studID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectdeadlines`
--

DROP TABLE IF EXISTS `subjectdeadlines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectdeadlines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `deadline` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `folderID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_folderid` (`folderID`),
  CONSTRAINT `fk_folderid` FOREIGN KEY (`folderID`) REFERENCES `subjectfolders` (`subjectFoldID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectdeadlines`
--

LOCK TABLES `subjectdeadlines` WRITE;
/*!40000 ALTER TABLE `subjectdeadlines` DISABLE KEYS */;
INSERT INTO `subjectdeadlines` VALUES (2,'2025-05-10 11:33:00','2025-05-10 03:31:33',12),(3,'2025-05-10 11:49:00','2025-05-10 03:47:46',12),(4,'2025-05-10 11:52:00','2025-05-10 03:50:40',12);
/*!40000 ALTER TABLE `subjectdeadlines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectfiles`
--

DROP TABLE IF EXISTS `subjectfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectfiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `custom_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `original_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `folder_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectfiles`
--

LOCK TABLES `subjectfiles` WRITE;
/*!40000 ALTER TABLE `subjectfiles` DISABLE KEYS */;
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
  `subjectname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `folderCreation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`subjectFoldID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectfolders`
--

LOCK TABLES `subjectfolders` WRITE;
/*!40000 ALTER TABLE `subjectfolders` DISABLE KEYS */;
INSERT INTO `subjectfolders` VALUES (12,'Subject','2025-05-10 03:30:13');
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
  `teacherName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `teacherEmail` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `teacherPassword` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `department` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`teacherID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
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

-- Dump completed on 2025-05-10 12:09:23
