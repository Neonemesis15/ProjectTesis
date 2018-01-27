CREATE DATABASE  IF NOT EXISTS `bdlucky` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bdlucky`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bdlucky
-- ------------------------------------------------------
-- Server version	5.5.24-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `idcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  PRIMARY KEY (`idcategoria`),
  UNIQUE KEY `IDX_categorias_2` (`titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` (`idcategoria`, `titulo`) VALUES (1,'Baladas en español de los 70s'),(2,'Nuevo');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cds`
--

DROP TABLE IF EXISTS `cds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cds` (
  `idcd` int(11) NOT NULL AUTO_INCREMENT,
  `idcategoria` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  PRIMARY KEY (`idcd`),
  UNIQUE KEY `IDX_cds_3` (`idcategoria`,`titulo`),
  KEY `FK_cds_1` (`idcategoria`),
  CONSTRAINT `FK_cds_1` FOREIGN KEY (`idcategoria`) REFERENCES `categorias` (`idcategoria`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cds`
--

LOCK TABLES `cds` WRITE;
/*!40000 ALTER TABLE `cds` DISABLE KEYS */;
INSERT INTO `cds` (`idcd`, `idcategoria`, `titulo`) VALUES (1,1,'Lo mejor de Roberto Carlos');
/*!40000 ALTER TABLE `cds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `citas` (
  `idcita` int(11) NOT NULL AUTO_INCREMENT,
  `idpaciente` int(11) NOT NULL,
  `idmedico` int(11) NOT NULL,
  `diahora` datetime NOT NULL,
  PRIMARY KEY (`idcita`),
  UNIQUE KEY `IDX_citas_2` (`idpaciente`,`idmedico`,`diahora`),
  KEY `FK_citas_2` (`idmedico`),
  CONSTRAINT `FK_citas_1` FOREIGN KEY (`idpaciente`) REFERENCES `pacientes` (`idpaciente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_citas_2` FOREIGN KEY (`idmedico`) REFERENCES `medicos` (`idmedico`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` (`idcita`, `idpaciente`, `idmedico`, `diahora`) VALUES (1,1,5,'2015-10-06 16:30:30'),(2,3,1,'2015-10-10 10:30:00'),(3,4,3,'2015-10-16 15:30:45'),(4,6,4,'2015-10-12 16:30:30'),(5,7,4,'2015-10-15 10:30:15'),(6,8,1,'2015-10-11 10:30:30');
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `idcliente` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` varchar(100) NOT NULL,
  PRIMARY KEY (`idcliente`),
  UNIQUE KEY `IDX_clientes_2` (`cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`idcliente`, `cliente`) VALUES (10,'Alca Alva, Jenny Luisa'),(7,'Alipio Pino, Victor Manuel'),(2,'Alva Bustamante, Carmen Erika '),(3,'Ballesteros Adama, Ana Luisa'),(4,'Canta Valladares, Jorge Luis'),(9,'Infante Canta, Ricardo Manuel'),(5,'Ruis Tello, Carmen Rosa'),(1,'Ruiz Abanto, Juan Julio'),(8,'Sandoval Arca, Luz Elena'),(11,'Torres Pesantes, Wilson'),(6,'Zevallos Puente, Luis Carlos');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidades`
--

DROP TABLE IF EXISTS `especialidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `especialidades` (
  `idespecialidad` int(11) NOT NULL AUTO_INCREMENT,
  `especialidad` varchar(50) NOT NULL,
  PRIMARY KEY (`idespecialidad`),
  UNIQUE KEY `IDX_especialidades_2` (`especialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidades`
--

LOCK TABLES `especialidades` WRITE;
/*!40000 ALTER TABLE `especialidades` DISABLE KEYS */;
INSERT INTO `especialidades` (`idespecialidad`, `especialidad`) VALUES (1,'Cardiología'),(2,'Gastroenterología'),(3,'Medicina General');
/*!40000 ALTER TABLE `especialidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturadetalles`
--

DROP TABLE IF EXISTS `facturadetalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facturadetalles` (
  `iddetalle` int(11) NOT NULL AUTO_INCREMENT,
  `idfactura` int(11) NOT NULL,
  `idproducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`iddetalle`),
  UNIQUE KEY `IDX_facturadetalles_4` (`idfactura`,`idproducto`),
  KEY `FK_facturadetalles_2` (`idproducto`),
  CONSTRAINT `FK_facturadetalles_1` FOREIGN KEY (`idfactura`) REFERENCES `facturas` (`idfactura`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_facturadetalles_2` FOREIGN KEY (`idproducto`) REFERENCES `productos` (`idproducto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturadetalles`
--

LOCK TABLES `facturadetalles` WRITE;
/*!40000 ALTER TABLE `facturadetalles` DISABLE KEYS */;
INSERT INTO `facturadetalles` (`iddetalle`, `idfactura`, `idproducto`, `cantidad`) VALUES (1,1,4,3);
/*!40000 ALTER TABLE `facturadetalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facturas` (
  `idfactura` int(11) NOT NULL AUTO_INCREMENT,
  `idcliente` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idfactura`),
  KEY `FK_facturas_1` (`idcliente`),
  CONSTRAINT `FK_facturas_1` FOREIGN KEY (`idcliente`) REFERENCES `clientes` (`idcliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` (`idfactura`, `idcliente`, `fecha`) VALUES (1,10,'2017-10-17 18:06:40');
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_cadenacomercial`
--

DROP TABLE IF EXISTS `mdl_cadenacomercial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_cadenacomercial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_cadenaComercial` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_cadenacomercial`
--

LOCK TABLES `mdl_cadenacomercial` WRITE;
/*!40000 ALTER TABLE `mdl_cadenacomercial` DISABLE KEYS */;
INSERT INTO `mdl_cadenacomercial` (`id`, `nombre`, `descripcion`) VALUES (1,'Metro','Supermecados Metro'),(2,'Tottus','Supermercados Tottus'),(3,'Wong','Supermercados Wong'),(4,'Plaza Vea','Supermercados Plaza Vea');
/*!40000 ALTER TABLE `mdl_cadenacomercial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_cadenacomercialdetalle`
--

DROP TABLE IF EXISTS `mdl_cadenacomercialdetalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_cadenacomercialdetalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCadenaComercial` int(11) NOT NULL,
  `idPuntoDeVenta` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_cadenaComercialDetalle` (`idCadenaComercial`,`idPuntoDeVenta`),
  KEY `fk_cadenaComercialDetalle_puntoDeVenta` (`idPuntoDeVenta`),
  KEY `ix_cadenaComercialDetalle` (`id`),
  CONSTRAINT `fk_cadenaComercialDetalle_cadenaComercialDetalle` FOREIGN KEY (`idCadenaComercial`) REFERENCES `mdl_cadenacomercial` (`id`),
  CONSTRAINT `fk_cadenaComercialDetalle_puntoDeVenta` FOREIGN KEY (`idPuntoDeVenta`) REFERENCES `mdl_puntodeventa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_cadenacomercialdetalle`
--

LOCK TABLES `mdl_cadenacomercialdetalle` WRITE;
/*!40000 ALTER TABLE `mdl_cadenacomercialdetalle` DISABLE KEYS */;
INSERT INTO `mdl_cadenacomercialdetalle` (`id`, `idCadenaComercial`, `idPuntoDeVenta`) VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9);
/*!40000 ALTER TABLE `mdl_cadenacomercialdetalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_campañapublicitaria`
--

DROP TABLE IF EXISTS `mdl_campañapublicitaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_campañapublicitaria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idFabricante` int(11) NOT NULL,
  `idCanal` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_campañaPublicitaria_fabricante` (`idFabricante`),
  KEY `fk_campañaPublicitaria_canal` (`idCanal`),
  KEY `ix_campañaPublicitaria` (`id`),
  CONSTRAINT `fk_campañaPublicitaria_canal` FOREIGN KEY (`idCanal`) REFERENCES `mdl_canal` (`id`),
  CONSTRAINT `fk_campañaPublicitaria_fabricante` FOREIGN KEY (`idFabricante`) REFERENCES `mdl_fabricante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_campañapublicitaria`
--

LOCK TABLES `mdl_campañapublicitaria` WRITE;
/*!40000 ALTER TABLE `mdl_campañapublicitaria` DISABLE KEYS */;
INSERT INTO `mdl_campañapublicitaria` (`id`, `idFabricante`, `idCanal`, `nombre`, `descripcion`, `fechaInicio`, `fechaFin`) VALUES (1,1,1,'Empecemos esta Navidad con una sonrisa mas blanca que la nieve','Descuento en todos los productos de la línea Luminos White por temporada Navideña','2017-12-01','2017-12-31'),(2,1,5,'Llego la Navidad a tu Farmacia','Descuento y precios especiales en Cremas Dentales, por temporada Navideña','2017-11-01','2017-12-31');
/*!40000 ALTER TABLE `mdl_campañapublicitaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_canal`
--

DROP TABLE IF EXISTS `mdl_canal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_canal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_canal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_canal`
--

LOCK TABLES `mdl_canal` WRITE;
/*!40000 ALTER TABLE `mdl_canal` DISABLE KEYS */;
INSERT INTO `mdl_canal` (`id`, `nombre`, `descripcion`) VALUES (1,'Supermercados','Establecimientos Comerciales de venta al por menor que ofrece bienes de consumo entre los que se pueden encontrar alimentos, articulos de higiene, perfumeria, limpieza, etc.'),(2,'Mayoristas','Establecimientos donde se vende los productos al por mayor, el empresario se ponen en contacto directo con los consumidores.'),(3,'Minoristas','Establecimientos donde se vende los productos al por menor, los intermediarios se ponen en contacto con los consumidores finales'),(4,'Bodegas','Establecimientos donde se venden los productos de consumo masivo que generalmente se encuentran en los barrios'),(5,'Farmacias','Establecimientos donde se venden productos medicinales, articulos de higiene personal y perfumería');
/*!40000 ALTER TABLE `mdl_canal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_categoria`
--

DROP TABLE IF EXISTS `mdl_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_categoria`
--

LOCK TABLES `mdl_categoria` WRITE;
/*!40000 ALTER TABLE `mdl_categoria` DISABLE KEYS */;
INSERT INTO `mdl_categoria` (`id`, `nombre`, `descripcion`) VALUES (1,'Enjuage Bucal','Linea de Enjuages Bucales'),(2,'Suavizante','Línea de Suavizantes'),(3,'Jabon de tocador','Línea de Jabones de Tocador'),(4,'Cepillo de dientes','Línea de Cepillos Dentales'),(5,'Pasta de dientes','Linea de Pastas Dentales'),(6,'Desodorantes','Linea de Desodorantes');
/*!40000 ALTER TABLE `mdl_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_clasificacion`
--

DROP TABLE IF EXISTS `mdl_clasificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_clasificacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMarca` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `idFabricante` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_clasificacion_marca` (`idMarca`),
  KEY `fk_clasificacion_categoria` (`idCategoria`),
  KEY `fk_clasificacion_fabricante` (`idFabricante`),
  KEY `ix_clasificacion` (`id`),
  CONSTRAINT `fk_clasificacion_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `mdl_categoria` (`id`),
  CONSTRAINT `fk_clasificacion_fabricante` FOREIGN KEY (`idFabricante`) REFERENCES `mdl_fabricante` (`id`),
  CONSTRAINT `fk_clasificacion_marca` FOREIGN KEY (`idMarca`) REFERENCES `mdl_marca` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_clasificacion`
--

LOCK TABLES `mdl_clasificacion` WRITE;
/*!40000 ALTER TABLE `mdl_clasificacion` DISABLE KEYS */;
INSERT INTO `mdl_clasificacion` (`id`, `idMarca`, `idCategoria`, `idFabricante`) VALUES (1,1,1,1),(2,2,2,1),(3,3,3,1),(4,4,3,1),(5,5,4,1),(6,5,5,1),(7,6,5,1),(8,7,6,1),(9,8,6,1);
/*!40000 ALTER TABLE `mdl_clasificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_cronogramavisitas`
--

DROP TABLE IF EXISTS `mdl_cronogramavisitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_cronogramavisitas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuarioPorVisitaDetalle` int(11) NOT NULL,
  `idPuntoDeVentaPorVisita` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_cronogramaVisitas` (`idUsuarioPorVisitaDetalle`,`idPuntoDeVentaPorVisita`),
  KEY `fk_cronogramaVisitas_puntoDeVenta` (`idPuntoDeVentaPorVisita`),
  KEY `ix_cronogramaVisitas` (`id`),
  CONSTRAINT `fk_cronogramaVisitas_puntoDeVenta` FOREIGN KEY (`idPuntoDeVentaPorVisita`) REFERENCES `mdl_puntodeventaporvisita` (`id`),
  CONSTRAINT `fk_cronogramaVisitas_usuario` FOREIGN KEY (`idUsuarioPorVisitaDetalle`) REFERENCES `mdl_usuarioporvisitadetalle` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_cronogramavisitas`
--

LOCK TABLES `mdl_cronogramavisitas` WRITE;
/*!40000 ALTER TABLE `mdl_cronogramavisitas` DISABLE KEYS */;
INSERT INTO `mdl_cronogramavisitas` (`id`, `idUsuarioPorVisitaDetalle`, `idPuntoDeVentaPorVisita`) VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5);
/*!40000 ALTER TABLE `mdl_cronogramavisitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_cuestionario`
--

DROP TABLE IF EXISTS `mdl_cuestionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_cuestionario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_cuestionario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_cuestionario`
--

LOCK TABLES `mdl_cuestionario` WRITE;
/*!40000 ALTER TABLE `mdl_cuestionario` DISABLE KEYS */;
INSERT INTO `mdl_cuestionario` (`id`, `nombre`, `descripcion`) VALUES (1,'Cuestionario de Precios','Recoleccion de precios de los diferentes productos en los puntos de venta'),(2,'Cuestionario de Stock','Recolección del stock de los diferentes productos en los puntos de venta'),(3,'Cuestionario de Existencia','Recolección de la verificación de la existencia de materiales publicitarios en los puntos de venta');
/*!40000 ALTER TABLE `mdl_cuestionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_cuestionarioexistencia`
--

DROP TABLE IF EXISTS `mdl_cuestionarioexistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_cuestionarioexistencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCronogramaVisitas` int(11) NOT NULL,
  `idPopClasificacionPorCuestionario` int(11) NOT NULL,
  `existencia` tinyint(1) NOT NULL DEFAULT '1',
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_cuestionarioExistencia_cronograma` (`idCronogramaVisitas`),
  KEY `fk_cuestionarioExistencia_materialPublicitario` (`idPopClasificacionPorCuestionario`),
  KEY `ix_cuestionarioExistencia` (`id`),
  CONSTRAINT `fk_cuestionarioExistencia_cronograma` FOREIGN KEY (`idCronogramaVisitas`) REFERENCES `mdl_cronogramavisitas` (`id`),
  CONSTRAINT `fk_cuestionarioExistencia_materialPublicitario` FOREIGN KEY (`idPopClasificacionPorCuestionario`) REFERENCES `mdl_popclasificacionporcuestionario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_cuestionarioexistencia`
--

LOCK TABLES `mdl_cuestionarioexistencia` WRITE;
/*!40000 ALTER TABLE `mdl_cuestionarioexistencia` DISABLE KEYS */;
INSERT INTO `mdl_cuestionarioexistencia` (`id`, `idCronogramaVisitas`, `idPopClasificacionPorCuestionario`, `existencia`, `estado`) VALUES (1,1,1,1,1),(2,1,2,1,1),(3,1,3,1,1),(4,1,4,1,1),(5,1,5,1,1),(6,2,1,1,1),(7,2,2,1,1),(8,2,3,1,1),(9,2,4,1,1),(10,2,5,1,1),(11,3,1,1,1),(12,3,2,1,1),(13,3,3,1,1),(14,3,4,1,1),(15,3,5,1,1);
/*!40000 ALTER TABLE `mdl_cuestionarioexistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_cuestionarioporvisita`
--

DROP TABLE IF EXISTS `mdl_cuestionarioporvisita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_cuestionarioporvisita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idVisita` int(11) NOT NULL,
  `idCuestionario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_cuestionarioPorVisita` (`idVisita`,`idCuestionario`),
  KEY `fk_cuestionarioPorVisita_cuestionario` (`idCuestionario`),
  KEY `ix_cuestionarioPorVisita` (`id`),
  CONSTRAINT `fk_cuestionarioPorVisita_cuestionario` FOREIGN KEY (`idCuestionario`) REFERENCES `mdl_cuestionario` (`id`),
  CONSTRAINT `fk_cuestionarioPorVisita_visita` FOREIGN KEY (`idVisita`) REFERENCES `mdl_visita` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_cuestionarioporvisita`
--

LOCK TABLES `mdl_cuestionarioporvisita` WRITE;
/*!40000 ALTER TABLE `mdl_cuestionarioporvisita` DISABLE KEYS */;
INSERT INTO `mdl_cuestionarioporvisita` (`id`, `idVisita`, `idCuestionario`) VALUES (1,1,1),(2,1,3);
/*!40000 ALTER TABLE `mdl_cuestionarioporvisita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_departamento`
--

DROP TABLE IF EXISTS `mdl_departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_departamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPais` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `fk_departamento_pais` (`idPais`),
  KEY `ix_departamento` (`id`),
  CONSTRAINT `fk_departamento_pais` FOREIGN KEY (`idPais`) REFERENCES `mdl_pais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_departamento`
--

LOCK TABLES `mdl_departamento` WRITE;
/*!40000 ALTER TABLE `mdl_departamento` DISABLE KEYS */;
INSERT INTO `mdl_departamento` (`id`, `idPais`, `nombre`) VALUES (1,1,'Arequipa'),(2,1,'Lima'),(3,1,'Cuzco'),(4,1,'Junin'),(5,1,'Puno'),(6,1,'Tacna');
/*!40000 ALTER TABLE `mdl_departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_dimensioncadenacomercial`
--

DROP TABLE IF EXISTS `mdl_dimensioncadenacomercial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_dimensioncadenacomercial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_dimensionCadenaComercial` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_dimensioncadenacomercial`
--

LOCK TABLES `mdl_dimensioncadenacomercial` WRITE;
/*!40000 ALTER TABLE `mdl_dimensioncadenacomercial` DISABLE KEYS */;
INSERT INTO `mdl_dimensioncadenacomercial` (`id`, `nombre`) VALUES (1,'Metro'),(2,'Tottus'),(3,'Wong'),(4,'Plaza Vea');
/*!40000 ALTER TABLE `mdl_dimensioncadenacomercial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_dimensionproducto`
--

DROP TABLE IF EXISTS `mdl_dimensionproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_dimensionproducto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `categoria` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `marca` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `fabricante` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_dimensionProducto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_dimensionproducto`
--

LOCK TABLES `mdl_dimensionproducto` WRITE;
/*!40000 ALTER TABLE `mdl_dimensionproducto` DISABLE KEYS */;
INSERT INTO `mdl_dimensionproducto` (`id`, `nombre`, `categoria`, `marca`, `fabricante`) VALUES (1,'Mw Colgate Plax Tea 500 Ml','Enjuage Bucal','Plax','Colgate & Palmolive'),(2,'Plax Complete Care 500ml','Enjuage Bucal','Plax','Colgate & Palmolive'),(3,'Plax Ice 500ml','Enjuage Bucal','Plax','Colgate & Palmolive'),(4,'Plax Sin Alcohol 500ml','Enjuage Bucal','Plax','Colgate & Palmolive'),(5,'Plax Luminous 500ml','Enjuage Bucal','Plax','Colgate & Palmolive'),(6,'SUAVITEL Fresca Primavera 3L','Suavizante','Suavitel','Colgate & Palmolive'),(7,'SUAVITEL Fresca Lavanda 1900 cc','Suavizante','Suavitel','Colgate & Palmolive'),(8,'SUAVITEL Fresca Primavera 1900 cc','Suavizante','Suavitel','Colgate & Palmolive'),(9,'SUAVITEL Fresca Primavera 5L','Suavizante','Suavitel','Colgate & Palmolive'),(10,'SUAVITEL Fresca Primavera 1000 cc','Suavizante','Suavitel','Colgate & Palmolive'),(11,'Palmolive Aloe Oliva 3pack 130GR','Jabon de tocador','Palmolive','Colgate & Palmolive'),(12,'Protex Avena 3pack 110gr','Jabon de tocador','Protex','Colgate & Palmolive'),(13,'Protex Fresh 3pack 110gr','Jabon de tocador','Protex','Colgate & Palmolive'),(14,'Protex Herbal 3 pack','Jabon de tocador','Protex','Colgate & Palmolive'),(15,'Protex Limpieza Profunda 3pack 110gr','Jabon de tocador','Protex','Colgate & Palmolive'),(16,'Protex Propolis 3pack 110gr','Jabon de tocador','Protex','Colgate & Palmolive'),(17,'Protex Vitaminta E 3 pack','Jabon de tocador','Protex','Colgate & Palmolive'),(18,'360+Total TP','Cepillo de dientes','Colgate','Colgate & Palmolive'),(19,'360° Luminous','Cepillo de dientes','Colgate','Colgate & Palmolive'),(20,'360° Surround 2x1','Cepillo de dientes','Colgate','Colgate & Palmolive'),(21,'Extra Clean 2x1','Cepillo de dientes','Colgate','Colgate & Palmolive'),(22,'Kit Portable','Cepillo de dientes','Colgate','Colgate & Palmolive'),(23,'TB Max White 2x1','Cepillo de dientes','Colgate','Colgate & Palmolive'),(24,'Triple Acción 2x1','Cepillo de dientes','Colgate','Colgate & Palmolive'),(25,'Twister 3x2','Cepillo de dientes','Colgate','Colgate & Palmolive'),(26,'ZigZag 2x1','Cepillo de dientes','Colgate','Colgate & Palmolive'),(27,'Tripack CDC Mint 75 ml','Pasta de dientes','Colgate','Colgate & Palmolive'),(28,'Colgate Smiles 75ml Barbie','Pasta de dientes','Colgate','Colgate & Palmolive'),(29,'Colgate Smiles 75ml Spiderman','Pasta de dientes','Colgate','Colgate & Palmolive'),(30,'Luminous White 75ml','Pasta de dientes','Colgate','Colgate & Palmolive'),(31,'Tripack CDC Triple Action 75 ml','Pasta de dientes','Colgate','Colgate & Palmolive'),(32,'Tripack Kolynos SW 75ml','Pasta de dientes','Kolynos','Colgate & Palmolive'),(33,'TP CLGTE Tot Prof Cln 75ML','Pasta de dientes','Colgate','Colgate & Palmolive'),(34,'TP CLGTE Tot Prof White 75ML','Pasta de dientes','Colgate','Colgate & Palmolive'),(35,'TP CLGTE Tot Prof Enc Salud 75ML','Pasta de dientes','Colgate','Colgate & Palmolive'),(36,'CDC Total 75 ml bipack','Pasta de dientes','Colgate','Colgate & Palmolive'),(37,'Bipack Triple Accion 100ml','Pasta de dientes','Colgate','Colgate & Palmolive'),(38,'LSS N&P Spray','Desodorantes','Lady Speed Stick','Colgate & Palmolive'),(39,'LSS Perfect Tone Spray','Desodorantes','Lady Speed Stick','Colgate & Palmolive'),(40,'LSS PH Active Spray','Desodorantes','Lady Speed Stick','Colgate & Palmolive'),(41,'MSS Adn Spray','Desodorantes','Speed Stick','Colgate & Palmolive'),(42,'MSS N&P Spray','Desodorantes','Speed Stick','Colgate & Palmolive'),(43,'MSS Waterproof Spray','Desodorantes','Speed Stick','Colgate & Palmolive'),(44,'MSS X5 Spray','Desodorantes','Speed Stick','Colgate & Palmolive');
/*!40000 ALTER TABLE `mdl_dimensionproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_dimensiontiempo`
--

DROP TABLE IF EXISTS `mdl_dimensiontiempo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_dimensiontiempo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `año` int(11) DEFAULT NULL,
  `mes` int(11) DEFAULT NULL,
  `semana` int(11) DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_dimensionTiempo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_dimensiontiempo`
--

LOCK TABLES `mdl_dimensiontiempo` WRITE;
/*!40000 ALTER TABLE `mdl_dimensiontiempo` DISABLE KEYS */;
INSERT INTO `mdl_dimensiontiempo` (`id`, `año`, `mes`, `semana`, `nombre`) VALUES (1,2017,12,1,'Dec-01'),(2,2017,12,2,'Dec-02'),(3,2017,12,3,'Dec-03'),(4,2017,12,4,'Dec-04');
/*!40000 ALTER TABLE `mdl_dimensiontiempo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_distrito`
--

DROP TABLE IF EXISTS `mdl_distrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_distrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idProvincia` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `fk_distrito_provincia` (`idProvincia`),
  KEY `ix_distrito` (`id`),
  CONSTRAINT `fk_distrito_provincia` FOREIGN KEY (`idProvincia`) REFERENCES `mdl_provincia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_distrito`
--

LOCK TABLES `mdl_distrito` WRITE;
/*!40000 ALTER TABLE `mdl_distrito` DISABLE KEYS */;
INSERT INTO `mdl_distrito` (`id`, `idProvincia`, `nombre`) VALUES (1,1,'Ancon'),(2,1,'Ate'),(3,1,'Barranco'),(4,1,'Breña'),(5,1,'Carabayllo'),(6,1,'Chaclacayo'),(7,1,'Chorrillos'),(8,1,'Cieneguilla'),(9,1,'Comas'),(10,1,'El Agustino'),(11,1,'La Molina'),(12,1,'La Victoria'),(13,1,'Lima'),(14,1,'Lince'),(15,1,'Los Olivos'),(16,1,'Lurigancho'),(17,1,'Lurin'),(18,1,'Magdalena del Mar'),(19,1,'Miraflores'),(20,1,'Pachacamac'),(21,1,'Pucusana'),(22,1,'Pueblo Libre'),(23,1,'Puente Piedra'),(24,1,'Punta Hermosa'),(25,1,'Punta Negra'),(26,1,'Rimac'),(27,1,'San Bartolo'),(28,1,'San Borja'),(29,1,'San Isidro'),(30,1,'San Juan de Lurigancho'),(31,1,'San Luis'),(32,1,'San Martin de Porres'),(33,1,'San Miguel'),(34,1,'Santa Anita'),(35,1,'Santa Maria del Mar'),(36,1,'Santa Rosa'),(37,1,'Santiago de Surco'),(38,1,'Surquillo'),(39,1,'Villa el Salvador'),(40,1,'Villa Maria del Triunfo'),(41,1,'Independencia'),(42,1,'Jesús Maria');
/*!40000 ALTER TABLE `mdl_distrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_elemento`
--

DROP TABLE IF EXISTS `mdl_elemento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_elemento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCuestionario` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_elemento_cuestionario` (`idCuestionario`),
  KEY `ix_elemento` (`id`),
  CONSTRAINT `fk_elemento_cuestionario` FOREIGN KEY (`idCuestionario`) REFERENCES `mdl_cuestionario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_elemento`
--

LOCK TABLES `mdl_elemento` WRITE;
/*!40000 ALTER TABLE `mdl_elemento` DISABLE KEYS */;
INSERT INTO `mdl_elemento` (`id`, `idCuestionario`, `nombre`, `descripcion`) VALUES (1,1,'Precio de Venta','Precio de venta al público'),(2,1,'Precio de Compra','Precio de compra del dueño del Punto de Venta'),(3,1,'Precio de Oferta','Precio en caso el producto se encuentre en oferta'),(4,1,'Precio de Promocion','Precio en caso el producto se encuentre en promoción'),(5,2,'Stock en Almacen','Cantidad de productos en Stock'),(6,3,'Existencia','Verificar la existencia del producto en el Punto de Venta');
/*!40000 ALTER TABLE `mdl_elemento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_fabricante`
--

DROP TABLE IF EXISTS `mdl_fabricante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_fabricante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_fabricante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_fabricante`
--

LOCK TABLES `mdl_fabricante` WRITE;
/*!40000 ALTER TABLE `mdl_fabricante` DISABLE KEYS */;
INSERT INTO `mdl_fabricante` (`id`, `nombre`, `descripcion`) VALUES (1,'Colgate & Palmolive','Empresa dedicada a la fabricación, distribución y venta de productos de higiene bucal, higiene personal y limpieza del hogar');
/*!40000 ALTER TABLE `mdl_fabricante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_hechospresencia`
--

DROP TABLE IF EXISTS `mdl_hechospresencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_hechospresencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idTiempo` int(11) NOT NULL,
  `idCadenaComercial` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `porcentaje` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_hechosPresencia` (`idTiempo`,`idCadenaComercial`,`idProducto`),
  KEY `fk_hechosPresencia_cadenaComercial` (`idCadenaComercial`),
  KEY `fk_hechosPresencia_producto` (`idProducto`),
  KEY `ix_hechosPresencia` (`id`),
  CONSTRAINT `fk_hechosPresencia_cadenaComercial` FOREIGN KEY (`idCadenaComercial`) REFERENCES `mdl_dimensioncadenacomercial` (`id`),
  CONSTRAINT `fk_hechosPresencia_producto` FOREIGN KEY (`idProducto`) REFERENCES `mdl_dimensionproducto` (`id`),
  CONSTRAINT `fk_hechosPresencia_tiempo` FOREIGN KEY (`idTiempo`) REFERENCES `mdl_dimensiontiempo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=705 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_hechospresencia`
--

LOCK TABLES `mdl_hechospresencia` WRITE;
/*!40000 ALTER TABLE `mdl_hechospresencia` DISABLE KEYS */;
INSERT INTO `mdl_hechospresencia` (`id`, `idTiempo`, `idCadenaComercial`, `idProducto`, `porcentaje`) VALUES (1,1,1,1,87.69),(2,1,2,1,99.27),(3,1,3,1,93.28),(4,1,4,1,88.58),(5,2,1,1,83.06),(6,2,2,1,89.57),(7,2,3,1,98.64),(8,2,4,1,84.52),(9,3,1,1,86.69),(10,3,2,1,99.87),(11,3,3,1,99.27),(12,3,4,1,96.74),(13,4,1,1,85.91),(14,4,2,1,99.32),(15,4,3,1,98.86),(16,4,4,1,96.37),(17,1,1,2,85.24),(18,1,2,2,97.09),(19,1,3,2,89.73),(20,1,4,2,97.40),(21,2,1,2,97.78),(22,2,2,2,96.71),(23,2,3,2,90.21),(24,2,4,2,80.93),(25,3,1,2,94.03),(26,3,2,2,87.33),(27,3,3,2,94.57),(28,3,4,2,90.84),(29,4,1,2,90.52),(30,4,2,2,80.08),(31,4,3,2,88.85),(32,4,4,2,84.01),(33,1,1,3,93.48),(34,1,2,3,95.39),(35,1,3,3,96.49),(36,1,4,3,96.30),(37,2,1,3,92.02),(38,2,2,3,91.18),(39,2,3,3,99.87),(40,2,4,3,85.81),(41,3,1,3,89.41),(42,3,2,3,89.65),(43,3,3,3,80.02),(44,3,4,3,91.14),(45,4,1,3,95.66),(46,4,2,3,84.86),(47,4,3,3,97.34),(48,4,4,3,92.10),(49,1,1,4,88.50),(50,1,2,4,86.21),(51,1,3,4,85.55),(52,1,4,4,89.09),(53,2,1,4,88.82),(54,2,2,4,96.83),(55,2,3,4,97.67),(56,2,4,4,97.89),(57,3,1,4,96.41),(58,3,2,4,88.41),(59,3,3,4,92.80),(60,3,4,4,98.78),(61,4,1,4,95.50),(62,4,2,4,81.15),(63,4,3,4,99.26),(64,4,4,4,92.84),(65,1,1,5,86.40),(66,1,2,5,93.52),(67,1,3,5,88.37),(68,1,4,5,81.28),(69,2,1,5,81.32),(70,2,2,5,82.74),(71,2,3,5,89.76),(72,2,4,5,80.55),(73,3,1,5,93.49),(74,3,2,5,85.80),(75,3,3,5,88.53),(76,3,4,5,85.26),(77,4,1,5,80.70),(78,4,2,5,87.74),(79,4,3,5,96.57),(80,4,4,5,99.64),(81,1,1,6,88.50),(82,1,2,6,83.56),(83,1,3,6,92.31),(84,1,4,6,90.85),(85,2,1,6,97.34),(86,2,2,6,94.14),(87,2,3,6,98.67),(88,2,4,6,90.94),(89,3,1,6,98.67),(90,3,2,6,80.56),(91,3,3,6,86.76),(92,3,4,6,92.12),(93,4,1,6,80.34),(94,4,2,6,85.35),(95,4,3,6,85.72),(96,4,4,6,92.54),(97,1,1,7,85.55),(98,1,2,7,90.13),(99,1,3,7,94.02),(100,1,4,7,99.69),(101,2,1,7,96.40),(102,2,2,7,82.93),(103,2,3,7,85.44),(104,2,4,7,98.40),(105,3,1,7,95.70),(106,3,2,7,83.28),(107,3,3,7,89.33),(108,3,4,7,96.80),(109,4,1,7,95.99),(110,4,2,7,89.57),(111,4,3,7,99.86),(112,4,4,7,90.60),(113,1,1,8,93.44),(114,1,2,8,95.38),(115,1,3,8,96.58),(116,1,4,8,96.74),(117,2,1,8,93.99),(118,2,2,8,99.70),(119,2,3,8,96.56),(120,2,4,8,83.69),(121,3,1,8,88.75),(122,3,2,8,92.69),(123,3,3,8,97.22),(124,3,4,8,88.03),(125,4,1,8,88.46),(126,4,2,8,98.23),(127,4,3,8,85.75),(128,4,4,8,94.05),(129,1,1,9,93.03),(130,1,2,9,82.99),(131,1,3,9,95.87),(132,1,4,9,90.36),(133,2,1,9,84.18),(134,2,2,9,89.83),(135,2,3,9,96.61),(136,2,4,9,93.58),(137,3,1,9,98.04),(138,3,2,9,89.49),(139,3,3,9,93.30),(140,3,4,9,98.05),(141,4,1,9,90.37),(142,4,2,9,97.66),(143,4,3,9,97.22),(144,4,4,9,93.09),(145,1,1,10,93.81),(146,1,2,10,89.76),(147,1,3,10,87.40),(148,1,4,10,87.72),(149,2,1,10,96.37),(150,2,2,10,98.71),(151,2,3,10,84.46),(152,2,4,10,86.14),(153,3,1,10,97.31),(154,3,2,10,88.14),(155,3,3,10,88.76),(156,3,4,10,99.40),(157,4,1,10,90.72),(158,4,2,10,95.41),(159,4,3,10,84.88),(160,4,4,10,98.17),(161,1,1,11,96.20),(162,1,2,11,86.50),(163,1,3,11,83.92),(164,1,4,11,80.06),(165,2,1,11,88.57),(166,2,2,11,82.68),(167,2,3,11,87.67),(168,2,4,11,90.30),(169,3,1,11,88.51),(170,3,2,11,91.65),(171,3,3,11,92.72),(172,3,4,11,88.64),(173,4,1,11,85.03),(174,4,2,11,99.22),(175,4,3,11,81.02),(176,4,4,11,87.45),(177,1,1,12,94.19),(178,1,2,12,88.61),(179,1,3,12,80.48),(180,1,4,12,96.56),(181,2,1,12,81.37),(182,2,2,12,97.14),(183,2,3,12,81.62),(184,2,4,12,96.68),(185,3,1,12,98.53),(186,3,2,12,82.60),(187,3,3,12,97.42),(188,3,4,12,99.30),(189,4,1,12,84.25),(190,4,2,12,83.36),(191,4,3,12,84.05),(192,4,4,12,90.18),(193,1,1,13,98.74),(194,1,2,13,83.17),(195,1,3,13,99.63),(196,1,4,13,88.64),(197,2,1,13,84.29),(198,2,2,13,95.54),(199,2,3,13,84.84),(200,2,4,13,97.58),(201,3,1,13,93.36),(202,3,2,13,94.09),(203,3,3,13,90.35),(204,3,4,13,89.47),(205,4,1,13,96.32),(206,4,2,13,93.20),(207,4,3,13,97.04),(208,4,4,13,85.60),(209,1,1,14,96.87),(210,1,2,14,87.55),(211,1,3,14,87.16),(212,1,4,14,93.14),(213,2,1,14,84.20),(214,2,2,14,81.59),(215,2,3,14,95.35),(216,2,4,14,91.96),(217,3,1,14,93.78),(218,3,2,14,92.99),(219,3,3,14,83.63),(220,3,4,14,99.18),(221,4,1,14,85.03),(222,4,2,14,87.58),(223,4,3,14,82.80),(224,4,4,14,91.27),(225,1,1,15,87.96),(226,1,2,15,85.99),(227,1,3,15,86.06),(228,1,4,15,92.35),(229,2,1,15,83.56),(230,2,2,15,80.76),(231,2,3,15,93.10),(232,2,4,15,83.24),(233,3,1,15,96.90),(234,3,2,15,94.78),(235,3,3,15,83.18),(236,3,4,15,91.58),(237,4,1,15,88.37),(238,4,2,15,87.10),(239,4,3,15,90.40),(240,4,4,15,90.71),(241,1,1,16,82.33),(242,1,2,16,99.52),(243,1,3,16,90.63),(244,1,4,16,94.58),(245,2,1,16,81.02),(246,2,2,16,81.37),(247,2,3,16,83.79),(248,2,4,16,94.84),(249,3,1,16,82.84),(250,3,2,16,89.67),(251,3,3,16,99.85),(252,3,4,16,90.22),(253,4,1,16,91.54),(254,4,2,16,87.03),(255,4,3,16,80.56),(256,4,4,16,81.72),(257,1,1,17,86.90),(258,1,2,17,89.35),(259,1,3,17,86.03),(260,1,4,17,82.10),(261,2,1,17,92.41),(262,2,2,17,95.77),(263,2,3,17,81.61),(264,2,4,17,80.76),(265,3,1,17,98.96),(266,3,2,17,92.50),(267,3,3,17,85.62),(268,3,4,17,90.61),(269,4,1,17,96.20),(270,4,2,17,89.17),(271,4,3,17,97.26),(272,4,4,17,98.77),(273,1,1,18,82.09),(274,1,2,18,94.11),(275,1,3,18,84.30),(276,1,4,18,99.17),(277,2,1,18,82.96),(278,2,2,18,97.28),(279,2,3,18,97.53),(280,2,4,18,95.82),(281,3,1,18,86.48),(282,3,2,18,84.97),(283,3,3,18,85.41),(284,3,4,18,92.13),(285,4,1,18,84.41),(286,4,2,18,85.65),(287,4,3,18,95.05),(288,4,4,18,98.30),(289,1,1,19,86.32),(290,1,2,19,96.73),(291,1,3,19,84.68),(292,1,4,19,93.20),(293,2,1,19,91.98),(294,2,2,19,80.28),(295,2,3,19,85.47),(296,2,4,19,86.52),(297,3,1,19,96.20),(298,3,2,19,81.41),(299,3,3,19,98.45),(300,3,4,19,88.02),(301,4,1,19,84.76),(302,4,2,19,99.74),(303,4,3,19,84.43),(304,4,4,19,82.92),(305,1,1,20,81.30),(306,1,2,20,97.73),(307,1,3,20,84.76),(308,1,4,20,90.62),(309,2,1,20,98.83),(310,2,2,20,82.27),(311,2,3,20,94.88),(312,2,4,20,87.56),(313,3,1,20,93.17),(314,3,2,20,83.18),(315,3,3,20,96.39),(316,3,4,20,92.39),(317,4,1,20,92.81),(318,4,2,20,86.88),(319,4,3,20,95.94),(320,4,4,20,99.08),(321,1,1,21,87.58),(322,1,2,21,80.65),(323,1,3,21,80.51),(324,1,4,21,80.58),(325,2,1,21,81.40),(326,2,2,21,85.27),(327,2,3,21,82.13),(328,2,4,21,94.83),(329,3,1,21,87.78),(330,3,2,21,94.41),(331,3,3,21,88.70),(332,3,4,21,80.25),(333,4,1,21,95.18),(334,4,2,21,95.13),(335,4,3,21,90.13),(336,4,4,21,85.23),(337,1,1,22,95.80),(338,1,2,22,83.27),(339,1,3,22,88.97),(340,1,4,22,95.04),(341,2,1,22,88.28),(342,2,2,22,96.29),(343,2,3,22,96.59),(344,2,4,22,94.08),(345,3,1,22,80.66),(346,3,2,22,81.02),(347,3,3,22,83.15),(348,3,4,22,92.69),(349,4,1,22,93.99),(350,4,2,22,91.86),(351,4,3,22,97.35),(352,4,4,22,91.19),(353,1,1,23,83.87),(354,1,2,23,85.80),(355,1,3,23,97.37),(356,1,4,23,89.48),(357,2,1,23,95.27),(358,2,2,23,87.91),(359,2,3,23,93.72),(360,2,4,23,84.89),(361,3,1,23,83.29),(362,3,2,23,81.79),(363,3,3,23,99.06),(364,3,4,23,89.95),(365,4,1,23,92.54),(366,4,2,23,92.89),(367,4,3,23,86.79),(368,4,4,23,95.31),(369,1,1,24,96.19),(370,1,2,24,94.99),(371,1,3,24,86.41),(372,1,4,24,87.06),(373,2,1,24,96.09),(374,2,2,24,99.28),(375,2,3,24,88.11),(376,2,4,24,82.70),(377,3,1,24,89.19),(378,3,2,24,97.83),(379,3,3,24,81.57),(380,3,4,24,94.38),(381,4,1,24,87.17),(382,4,2,24,92.70),(383,4,3,24,82.01),(384,4,4,24,91.96),(385,1,1,25,93.76),(386,1,2,25,92.93),(387,1,3,25,83.35),(388,1,4,25,97.96),(389,2,1,25,99.74),(390,2,2,25,84.84),(391,2,3,25,84.96),(392,2,4,25,90.30),(393,3,1,25,96.62),(394,3,2,25,92.18),(395,3,3,25,91.04),(396,3,4,25,98.67),(397,4,1,25,80.22),(398,4,2,25,85.09),(399,4,3,25,84.79),(400,4,4,25,88.67),(401,1,1,26,89.01),(402,1,2,26,99.01),(403,1,3,26,88.05),(404,1,4,26,83.19),(405,2,1,26,91.83),(406,2,2,26,89.57),(407,2,3,26,92.36),(408,2,4,26,93.10),(409,3,1,26,88.42),(410,3,2,26,82.78),(411,3,3,26,88.67),(412,3,4,26,94.99),(413,4,1,26,88.92),(414,4,2,26,99.67),(415,4,3,26,91.56),(416,4,4,26,98.82),(417,1,1,27,99.40),(418,1,2,27,80.53),(419,1,3,27,84.46),(420,1,4,27,80.70),(421,2,1,27,90.12),(422,2,2,27,88.49),(423,2,3,27,92.10),(424,2,4,27,95.05),(425,3,1,27,98.94),(426,3,2,27,89.53),(427,3,3,27,90.85),(428,3,4,27,85.64),(429,4,1,27,95.68),(430,4,2,27,81.46),(431,4,3,27,80.27),(432,4,4,27,96.98),(433,1,1,28,84.08),(434,1,2,28,89.45),(435,1,3,28,95.00),(436,1,4,28,86.67),(437,2,1,28,88.33),(438,2,2,28,81.66),(439,2,3,28,83.29),(440,2,4,28,91.48),(441,3,1,28,87.52),(442,3,2,28,83.17),(443,3,3,28,93.29),(444,3,4,28,96.95),(445,4,1,28,84.88),(446,4,2,28,93.54),(447,4,3,28,93.07),(448,4,4,28,84.74),(449,1,1,29,84.49),(450,1,2,29,88.23),(451,1,3,29,87.65),(452,1,4,29,93.60),(453,2,1,29,85.02),(454,2,2,29,84.29),(455,2,3,29,86.41),(456,2,4,29,99.19),(457,3,1,29,96.69),(458,3,2,29,85.89),(459,3,3,29,99.37),(460,3,4,29,99.21),(461,4,1,29,97.92),(462,4,2,29,91.97),(463,4,3,29,86.11),(464,4,4,29,94.61),(465,1,1,30,94.74),(466,1,2,30,89.88),(467,1,3,30,85.19),(468,1,4,30,96.28),(469,2,1,30,85.85),(470,2,2,30,80.39),(471,2,3,30,84.43),(472,2,4,30,80.95),(473,3,1,30,91.48),(474,3,2,30,94.53),(475,3,3,30,98.20),(476,3,4,30,87.43),(477,4,1,30,82.53),(478,4,2,30,90.36),(479,4,3,30,84.23),(480,4,4,30,90.08),(481,1,1,31,97.69),(482,1,2,31,98.19),(483,1,3,31,97.92),(484,1,4,31,95.01),(485,2,1,31,81.29),(486,2,2,31,81.41),(487,2,3,31,83.19),(488,2,4,31,91.72),(489,3,1,31,89.01),(490,3,2,31,89.90),(491,3,3,31,82.49),(492,3,4,31,82.72),(493,4,1,31,86.15),(494,4,2,31,82.60),(495,4,3,31,94.54),(496,4,4,31,84.90),(497,1,1,32,80.89),(498,1,2,32,89.74),(499,1,3,32,86.01),(500,1,4,32,80.86),(501,2,1,32,86.27),(502,2,2,32,88.77),(503,2,3,32,85.02),(504,2,4,32,98.81),(505,3,1,32,98.99),(506,3,2,32,98.51),(507,3,3,32,95.59),(508,3,4,32,82.40),(509,4,1,32,85.26),(510,4,2,32,99.09),(511,4,3,32,99.66),(512,4,4,32,81.02),(513,1,1,33,86.12),(514,1,2,33,87.54),(515,1,3,33,99.32),(516,1,4,33,94.02),(517,2,1,33,92.10),(518,2,2,33,98.47),(519,2,3,33,96.05),(520,2,4,33,84.85),(521,3,1,33,96.11),(522,3,2,33,85.98),(523,3,3,33,81.57),(524,3,4,33,89.93),(525,4,1,33,84.94),(526,4,2,33,94.91),(527,4,3,33,99.74),(528,4,4,33,93.96),(529,1,1,34,90.58),(530,1,2,34,91.01),(531,1,3,34,83.30),(532,1,4,34,83.47),(533,2,1,34,87.44),(534,2,2,34,86.81),(535,2,3,34,91.74),(536,2,4,34,98.26),(537,3,1,34,96.09),(538,3,2,34,85.66),(539,3,3,34,80.05),(540,3,4,34,83.24),(541,4,1,34,96.06),(542,4,2,34,90.59),(543,4,3,34,84.79),(544,4,4,34,92.14),(545,1,1,35,86.36),(546,1,2,35,95.35),(547,1,3,35,97.68),(548,1,4,35,82.36),(549,2,1,35,98.77),(550,2,2,35,86.74),(551,2,3,35,97.41),(552,2,4,35,86.81),(553,3,1,35,81.84),(554,3,2,35,88.76),(555,3,3,35,98.28),(556,3,4,35,85.13),(557,4,1,35,90.79),(558,4,2,35,98.58),(559,4,3,35,80.53),(560,4,4,35,86.91),(561,1,1,36,92.94),(562,1,2,36,84.00),(563,1,3,36,81.16),(564,1,4,36,93.81),(565,2,1,36,85.58),(566,2,2,36,86.44),(567,2,3,36,95.48),(568,2,4,36,98.07),(569,3,1,36,83.91),(570,3,2,36,85.35),(571,3,3,36,95.03),(572,3,4,36,99.08),(573,4,1,36,90.33),(574,4,2,36,94.42),(575,4,3,36,81.11),(576,4,4,36,82.26),(577,1,1,37,87.98),(578,1,2,37,93.13),(579,1,3,37,81.72),(580,1,4,37,89.19),(581,2,1,37,80.78),(582,2,2,37,96.34),(583,2,3,37,99.34),(584,2,4,37,87.71),(585,3,1,37,80.52),(586,3,2,37,99.46),(587,3,3,37,95.76),(588,3,4,37,80.43),(589,4,1,37,94.85),(590,4,2,37,92.95),(591,4,3,37,80.22),(592,4,4,37,82.24),(593,1,1,38,90.54),(594,1,2,38,85.98),(595,1,3,38,98.28),(596,1,4,38,93.48),(597,2,1,38,92.55),(598,2,2,38,82.31),(599,2,3,38,93.88),(600,2,4,38,82.49),(601,3,1,38,90.80),(602,3,2,38,86.54),(603,3,3,38,80.30),(604,3,4,38,81.89),(605,4,1,38,88.53),(606,4,2,38,96.98),(607,4,3,38,99.31),(608,4,4,38,85.61),(609,1,1,39,90.13),(610,1,2,39,93.82),(611,1,3,39,98.71),(612,1,4,39,92.09),(613,2,1,39,84.32),(614,2,2,39,85.33),(615,2,3,39,93.68),(616,2,4,39,92.42),(617,3,1,39,81.07),(618,3,2,39,88.06),(619,3,3,39,97.11),(620,3,4,39,81.37),(621,4,1,39,95.52),(622,4,2,39,93.51),(623,4,3,39,80.95),(624,4,4,39,84.26),(625,1,1,40,98.41),(626,1,2,40,99.31),(627,1,3,40,81.30),(628,1,4,40,88.55),(629,2,1,40,98.88),(630,2,2,40,88.72),(631,2,3,40,86.99),(632,2,4,40,88.79),(633,3,1,40,82.97),(634,3,2,40,88.50),(635,3,3,40,93.56),(636,3,4,40,82.32),(637,4,1,40,90.91),(638,4,2,40,87.59),(639,4,3,40,85.21),(640,4,4,40,83.31),(641,1,1,41,80.90),(642,1,2,41,94.56),(643,1,3,41,90.10),(644,1,4,41,86.81),(645,2,1,41,83.77),(646,2,2,41,98.40),(647,2,3,41,80.71),(648,2,4,41,88.33),(649,3,1,41,99.53),(650,3,2,41,92.66),(651,3,3,41,84.71),(652,3,4,41,85.59),(653,4,1,41,93.79),(654,4,2,41,92.19),(655,4,3,41,99.60),(656,4,4,41,81.41),(657,1,1,42,88.26),(658,1,2,42,97.08),(659,1,3,42,80.60),(660,1,4,42,91.75),(661,2,1,42,96.95),(662,2,2,42,89.49),(663,2,3,42,96.63),(664,2,4,42,94.65),(665,3,1,42,83.38),(666,3,2,42,92.96),(667,3,3,42,94.63),(668,3,4,42,94.28),(669,4,1,42,87.50),(670,4,2,42,94.68),(671,4,3,42,90.89),(672,4,4,42,90.41),(673,1,1,43,99.38),(674,1,2,43,85.68),(675,1,3,43,90.25),(676,1,4,43,94.21),(677,2,1,43,80.30),(678,2,2,43,98.86),(679,2,3,43,93.40),(680,2,4,43,90.43),(681,3,1,43,91.96),(682,3,2,43,88.49),(683,3,3,43,86.59),(684,3,4,43,87.47),(685,4,1,43,97.59),(686,4,2,43,85.54),(687,4,3,43,94.92),(688,4,4,43,97.97),(689,1,1,44,85.09),(690,1,2,44,91.56),(691,1,3,44,82.52),(692,1,4,44,97.94),(693,2,1,44,82.12),(694,2,2,44,96.79),(695,2,3,44,97.60),(696,2,4,44,97.61),(697,3,1,44,95.27),(698,3,2,44,83.49),(699,3,3,44,91.68),(700,3,4,44,87.89),(701,4,1,44,84.45),(702,4,2,44,98.55),(703,4,3,44,99.40),(704,4,4,44,81.35);
/*!40000 ALTER TABLE `mdl_hechospresencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_marca`
--

DROP TABLE IF EXISTS `mdl_marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_marca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_marca` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_marca`
--

LOCK TABLES `mdl_marca` WRITE;
/*!40000 ALTER TABLE `mdl_marca` DISABLE KEYS */;
INSERT INTO `mdl_marca` (`id`, `nombre`, `descripcion`) VALUES (1,'Plax','Linea de Enjuages Bucales'),(2,'Suavitel','Línea de Suavizantes'),(3,'Palmolive','Línea de Jabones de Tocador'),(4,'Protex','Línea de Jabones de Tocador'),(5,'Colgate','Linea de Cuidado Bucal'),(6,'Kolynos','Linea de Cuidado Bucal'),(7,'Lady Speed Stick','Desodorantes para Mujeres'),(8,'Speed Stick','Desodorantes para Hombres');
/*!40000 ALTER TABLE `mdl_marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_materialpublicitario`
--

DROP TABLE IF EXISTS `mdl_materialpublicitario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_materialpublicitario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_materialPublicitario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_materialpublicitario`
--

LOCK TABLES `mdl_materialpublicitario` WRITE;
/*!40000 ALTER TABLE `mdl_materialpublicitario` DISABLE KEYS */;
INSERT INTO `mdl_materialpublicitario` (`id`, `nombre`, `descripcion`) VALUES (1,'Afiche','Sirven como aviso publicitario en las ventanas o paredes, sirbe para informar y ambientar el punto de venta'),(2,'Botones','Elementos que van sujetos al pecho y buscan dar mas información sobre la marca o el producto buscado atraer la atención del consumidor.'),(3,'Bandejas de Impulso','Son bandejas portátiles que el degustador lleva amarrado a el para ir dando de gustaciones a el publico de forma practica a medida que camina por el almacén sus beneficios son el poder hablar con el cliente y responder dudas o inquietudes y orientarlo. '),(4,'Uniformes','Es el vestuario especifico del trabajador que trabaja para una marca con ello se quiere establecer de que marca hace parte para atender dudas,inquietudes o preguntas.'),(5,'Mascotas o disfraces','Son disfraces de animales personificados en personas para impulsar las ventas de cualquier producto, es una forma mas atractiva de llamar la atención de adultos, niños y así impulsar su venta.'),(6,'Colgantes','Son piezas las cuales tienen avisos promocionales, marcas o productos que por lo general son colocados en el techo del almacén su función es la de brindar una información de forma llamativa ya que sobresale por sus colores vibrantes'),(7,'Avisos Luminosos','Es un elemento decorativo luminoso utilizado para atraer la vista del consumidor destacando productos y novedades de ciertas marcas se puede colocar en cualquier lugar que se vea visible utilizan luces neón, trípode entre otras con animaciones para su mayor atracción.'),(8,'Exhibidores Estiba','Son estantes provisionales y temporales ubicados en grandes almacenes con un área libre este ayuda a generar ventas y demanda al llamar la atención del cliente por su ambientación.'),(9,'Exhibidores de Piso','exhibidores individuales que son colocados al lado de la góndola para dar a conocer promociones o novedades, atrae la atención del consumidor haciéndola mas atractiva.'),(10,'Puntas de Gondola','Es el sitio estratégico para ubicar productos por que permite muy buena visibilidad, son los extremos de la góndola usados para colocar productos utilizados en cenefas, colgantes, cabe zotes entre otros, genera mayor rotación de productos y hace  exhibición mas notoria y atractiva.'),(11,'Muebles de Degustacion','Mesas portátiles diseñadas para la degustacion del consumidores sirve para todo tipo de productos esto llama la atención del consumidor haciéndolo un comprador potencial'),(12,'Carros para Impulso','Son estructuras móviles que sirven para dar degustacion, muestras o promociones de cierto producto o marca permite una fácil movilidad dentro el almacén permitiendo destacar innovaciones o lanzamientos de un producto.'),(13,'Exhibidores Temporales','Son estantes temporales colocados mientras transcurre algún evento, se caracteriza por realzar a la vista del cliente un producto o marca lo cual resulta mas atractivo.'),(14,'Bandejas','En donde se organizan determinados productos de sierta marca con el fin de que allá mayor organización y una mejor exhibición. '),(15,'Buzones','Son cajas rectangulares situada en ciertos puntos cono en sala de ventas para que el consumidor inserte una tarjeta y así participa en alguna promoción sorteo etc, sirve como complemento de exhibición.'),(16,'Inflables','Son estantes inflables grandes que sirven como punto de referencia para el cliente se estableen para dar alguna información generalmente cundo hay promociones y por su tamaño nunca pasan de apercibidos.'),(17,'Stickers','Adhesivos que se utilizan como publicidad de productos resaltando una promoción o característica especial.'),(18,'Fiyers','Material impreso que es para repartir a los consumidores o potenciales compradores  y brindarles una información de algún producto o servicio.'),(19,'Stop Portero','Ubicado generalmente ala la entrada de los establecimientos tiene gran tamaño su propósito es atraer al cliente a un producto especifico generalmente que este en promoción su objetivo es motivar la compra.'),(20,'Tent Cards','Utilizado como un mensaje publicitario variado dado a su forma triangular se puede visualizar por dos lados están ubicados generalmente en puntos de atecion al cliente o mostradores.'),(21,'Cuellos de Botella','Utilizados para informar sobre promociones de ciertas bebidas, es colocado en la parte superior de estas como un complemento publicitario.'),(22,'Banderines','Son generalmente pequeños utilizados para ambientar las áreas del almacén colocado en los techos con el objetivo de destacar una marca o una información.'),(23,'Floor Prints','Se usa para destacar un producto o una marca que este situada en variadas zonas con el objetivo que sea mas visual y fácil de ubicar es colocado en el suelo y lo que busca es generar recordación en el consumidor.'),(24,'Habladores','Es utilizado como un formato que va adherido a la gongola su uso es decorativo e informativo y es utilizado en la parte superior o en los lados del producto para ciertos eventos en particular.'),(25,'Banners','Utilizado como material decorativo que pretende mejorar la visualización y ubicación de un producto se coloca colgante se puede encontrar en techos o postes.'),(26,'Dangler','Es un material atractivo utilizado para informar y llamar la atención del cliente por su ubicación y forma ya que tiene un sistema de movimiento llamativo este sobre sale de la góndola.'),(27,'Stoper','Conocido también como Rompe Tráfico, es un elemento de señalizacion atractivo enfocado en llamar la atención del cliente por su ubicación es mas fácil de reconocer y ver mas fácil orientando mejor al cliente.'),(28,'Cabezotes','Es usado como material decorativo, se usa en las puntas de góndola como complementación en la exhibición de un producto normalmente son amplios para la mayor visibilidad del cliente.'),(29,'Cenefas','Es una decoración ubicada en los entrepaños de las góndolas con el fin de informar y dar mas visibilidad sobre un producto su propósito es llamar la atención del cliente.'),(30,'Material P.O.P.','Es utilizado como un implemento de información al cliente promoviendo productos y servicios de un punto de venta resaltando la exhibición con sus colores y letra haciéndolo llamativo para atraer la atención del cliente y así generar compra..');
/*!40000 ALTER TABLE `mdl_materialpublicitario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_pais`
--

DROP TABLE IF EXISTS `mdl_pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_pais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `ix_pais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_pais`
--

LOCK TABLES `mdl_pais` WRITE;
/*!40000 ALTER TABLE `mdl_pais` DISABLE KEYS */;
INSERT INTO `mdl_pais` (`id`, `nombre`) VALUES (1,'Perú'),(2,'Colombia'),(3,'Argentina'),(4,'Venezuela'),(5,'Bolivia'),(6,'Chile');
/*!40000 ALTER TABLE `mdl_pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_perfil`
--

DROP TABLE IF EXISTS `mdl_perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `ix_perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_perfil`
--

LOCK TABLES `mdl_perfil` WRITE;
/*!40000 ALTER TABLE `mdl_perfil` DISABLE KEYS */;
INSERT INTO `mdl_perfil` (`id`, `nombre`, `descripcion`) VALUES (1,'Administrador','Administrador del Sistema'),(2,'Cliente','Cliente del Sistema'),(3,'Controller','Controller del Sistema'),(4,'Analista','Analista del Sistema'),(5,'Supervisor','Supervisor del Sistema'),(6,'Mercaderista','Mercaderista del Sistema');
/*!40000 ALTER TABLE `mdl_perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_periodo`
--

DROP TABLE IF EXISTS `mdl_periodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_periodo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `año` int(11) DEFAULT NULL,
  `mes` int(11) DEFAULT NULL,
  `semana` int(11) DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_periodo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_periodo`
--

LOCK TABLES `mdl_periodo` WRITE;
/*!40000 ALTER TABLE `mdl_periodo` DISABLE KEYS */;
INSERT INTO `mdl_periodo` (`id`, `año`, `mes`, `semana`, `nombre`, `fechaInicio`, `fechaFin`) VALUES (1,2017,12,1,'Semana 1 - Dic - 2017','2017-12-01','2017-12-10'),(2,2017,12,2,'Semana 2 - Dic - 2017','2017-12-11','2017-12-17'),(3,2017,12,3,'Semana 3 - Dic - 2017','2017-12-18','2017-12-24'),(4,2017,12,4,'Semana 4 - Dic - 2017','2017-12-25','2017-12-31');
/*!40000 ALTER TABLE `mdl_periodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_persona`
--

DROP TABLE IF EXISTS `mdl_persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_persona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `apellidoPaterno` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `apellidoMaterno` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `fechaNacimiento` date DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_persona` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_persona`
--

LOCK TABLES `mdl_persona` WRITE;
/*!40000 ALTER TABLE `mdl_persona` DISABLE KEYS */;
INSERT INTO `mdl_persona` (`id`, `nombres`, `apellidoPaterno`, `apellidoMaterno`, `fechaNacimiento`, `telefono`) VALUES (1,'Juan Andres','Zapata','Rodriguez','1999-12-01',988718212),(2,'Jose','Muroy','Ames','1989-04-23',988718213),(3,'Pedro','Mallaupoma','Ceballos','1985-11-11',988718214),(4,'Juan','Perez','Quispe','1975-12-12',988718215),(5,'Juan','Salazar','Acosta','1976-08-15',988718216),(6,'Gemma','Vilchez','Leon','1979-10-24',988718217),(7,'Jessica','Medina','Chavez','1980-06-01',988718218),(8,'Diana','Alvarez','Manani','1984-12-07',988718219),(9,'Alisson','Malasquez','De la Rosa','1975-02-23',988718220);
/*!40000 ALTER TABLE `mdl_persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_popclasificacion`
--

DROP TABLE IF EXISTS `mdl_popclasificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_popclasificacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMaterialPublicitario` int(11) NOT NULL,
  `idClasificacion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_popClasificacion_materialPublicitario` (`idMaterialPublicitario`),
  KEY `fk_popClasificacion_clasificacion` (`idClasificacion`),
  KEY `ix_popClasificacion` (`id`),
  CONSTRAINT `fk_popClasificacion_clasificacion` FOREIGN KEY (`idClasificacion`) REFERENCES `mdl_clasificacion` (`id`),
  CONSTRAINT `fk_popClasificacion_materialPublicitario` FOREIGN KEY (`idMaterialPublicitario`) REFERENCES `mdl_materialpublicitario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_popclasificacion`
--

LOCK TABLES `mdl_popclasificacion` WRITE;
/*!40000 ALTER TABLE `mdl_popclasificacion` DISABLE KEYS */;
INSERT INTO `mdl_popclasificacion` (`id`, `idMaterialPublicitario`, `idClasificacion`) VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,2,6),(7,2,7),(8,2,8);
/*!40000 ALTER TABLE `mdl_popclasificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_popclasificacionporcuestionario`
--

DROP TABLE IF EXISTS `mdl_popclasificacionporcuestionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_popclasificacionporcuestionario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCuestionarioPorVisita` int(11) NOT NULL,
  `idPopClasificacion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_popClasificacionPorCuestionario` (`idCuestionarioPorVisita`,`idPopClasificacion`),
  KEY `fk_popClasificacionPorCuestionario_popClasificacion` (`idPopClasificacion`),
  KEY `ix_popClasificacionPorCuestionario` (`id`),
  CONSTRAINT `fk_popClasificacionPorCuestionario_cuestionario` FOREIGN KEY (`idCuestionarioPorVisita`) REFERENCES `mdl_cuestionarioporvisita` (`id`),
  CONSTRAINT `fk_popClasificacionPorCuestionario_popClasificacion` FOREIGN KEY (`idPopClasificacion`) REFERENCES `mdl_popclasificacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_popclasificacionporcuestionario`
--

LOCK TABLES `mdl_popclasificacionporcuestionario` WRITE;
/*!40000 ALTER TABLE `mdl_popclasificacionporcuestionario` DISABLE KEYS */;
INSERT INTO `mdl_popclasificacionporcuestionario` (`id`, `idCuestionarioPorVisita`, `idPopClasificacion`) VALUES (1,2,1),(2,2,2),(3,2,3),(4,2,4),(5,2,5),(6,2,6),(7,2,7),(8,2,8);
/*!40000 ALTER TABLE `mdl_popclasificacionporcuestionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_producto`
--

DROP TABLE IF EXISTS `mdl_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idClasificacion` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `SKU` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_producto_clasificacion` (`idClasificacion`),
  KEY `ix_producto` (`id`),
  CONSTRAINT `fk_producto_clasificacion` FOREIGN KEY (`idClasificacion`) REFERENCES `mdl_clasificacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_producto`
--

LOCK TABLES `mdl_producto` WRITE;
/*!40000 ALTER TABLE `mdl_producto` DISABLE KEYS */;
INSERT INTO `mdl_producto` (`id`, `idClasificacion`, `nombre`, `descripcion`, `SKU`) VALUES (1,1,'Mw Colgate Plax Tea 500 Ml','Enjuage Bucal Mw Colgate Plax Tea 500 Ml','COL001'),(2,1,'Plax Complete Care 500ml','Enjuage Bucal Plax Complete Care 500ml','COL002'),(3,1,'Plax Ice 500ml','Enjuage Bucal Plax Ice 500ml','COL003'),(4,1,'Plax Sin Alcohol 500ml','Enjuage Bucal Plax Sin Alcohol 500ml','COL004'),(5,1,'Plax Luminous 500ml','Enjuage Bucal Plax Luminous 500ml','COL005'),(6,2,'SUAVITEL Fresca Primavera 3L','Suavizante Suavitel Fresca Primavera 3L','COL006'),(7,2,'SUAVITEL Fresca Lavanda 1900 cc','Suavizante Suavitel Fresca Lavanda 1900 cc','COL007'),(8,2,'SUAVITEL Fresca Primavera 1900 cc','Suavizante Suavitel Fresca Primavera 1900 cc','COL008'),(9,2,'SUAVITEL Fresca Primavera 5L','Suavizante Suavitel Fresca Primavera 5L','COL009'),(10,2,'SUAVITEL Fresca Primavera 1000 cc','Suavizante Suavitel Fresca Primavera 1000 cc','COL010'),(11,3,'Palmolive Aloe Oliva 3pack 130GR','Jabon de Tocador Palmolive Aloe Oliva 3pack 130GR','COL011'),(12,4,'Protex Avena 3pack 110gr','Jabon de Tocador Protex Avena 3pack 110gr','COL012'),(13,4,'Protex Fresh 3pack 110gr','Jabon de Tocador Protex Fresh 3pack 110gr','COL013'),(14,4,'Protex Herbal 3 pack','Jabon de Tocador Protex Herbal 3 pack','COL014'),(15,4,'Protex Limpieza Profunda 3pack 110gr','Jabon de Tocador Protex Limpieza Profunda 3pack 110gr','COL015'),(16,4,'Protex Propolis 3pack 110gr','Jabon de Tocador Protex Propolis 3pack 110gr','COL016'),(17,4,'Protex Vitaminta E 3 pack','Jabon de Tocador Protex Vitaminta E 3 pack','COL017'),(18,5,'360+Total TP','Cepillo de Dientes 360+Total TP','COL018'),(19,5,'360° Luminous','Cepillo de Dientes 360° Luminous','COL019'),(20,5,'360° Surround 2x1','Cepillo de Dientes 360° Surround 2x1','COL020'),(21,5,'Extra Clean 2x1','Cepillo de Dientes Extra Clean 2x1','COL021'),(22,5,'Kit Portable','Cepillo de Dientes Kit Portable','COL022'),(23,5,'TB Max White 2x1','Cepillo de Dientes TB Max White 2x1','COL023'),(24,5,'Triple Acción 2x1','Cepillo de Dientes Triple Acción 2x1','COL024'),(25,5,'Twister 3x2','Cepillo de Dientes Twister 3x2','COL025'),(26,5,'ZigZag 2x1','Cepillo de Dientes ZigZag 2x1','COL026'),(27,6,'Tripack CDC Mint 75 ml','Pasta de Dientes Tripack CDC Mint 75 ml','COL027'),(28,6,'Colgate Smiles 75ml Barbie','Pasta de Dientes Colgate Smiles 75ml Barbie','COL028'),(29,6,'Colgate Smiles 75ml Spiderman','Pasta de Dientes Colgate Smiles 75ml Spiderman','COL029'),(30,6,'Luminous White 75ml','Pasta de Dientes Luminous White 75ml','COL030'),(31,6,'Tripack CDC Triple Action 75 ml','Pasta de Dientes Tripack CDC Triple Action 75 ml','COL031'),(32,7,'Tripack Kolynos SW 75ml','Pasta de Dientes Tripack Kolynos SW 75ml','COL032'),(33,6,'TP CLGTE Tot Prof Cln 75ML','Pasta de Dientes TP CLGTE Tot Prof Cln 75ML','COL033'),(34,6,'TP CLGTE Tot Prof White 75ML','Pasta de Dientes TP CLGTE Tot Prof White 75ML','COL034'),(35,6,'TP CLGTE Tot Prof Enc Salud 75ML','Pasta de Dientes TP CLGTE Tot Prof Enc Salud 75ML','COL035'),(36,6,'CDC Total 75 ml bipack','Pasta de Dientes CDC Total 75 ml bipack','COL036'),(37,6,'Bipack Triple Accion 100ml','Pasta de Dientes Bipack Triple Accion 100ml','COL037'),(38,8,'LSS N&P Spray','Desodorante Femenino Lady Speed Stick N&P Spray','COL038'),(39,8,'LSS Perfect Tone Spray','Desodorante Femenino Lady Speed Stick Perfect Tone Spray','COL039'),(40,8,'LSS PH Active Spray','Desodorante Femenino Lady Speed Stick PH Active Spray','COL040'),(41,9,'MSS Adn Spray','Desodorante Masculino Speed Stick Adn Spray','COL041'),(42,9,'MSS N&P Spray','Desodorante Masculino Speed Stick N&P Spray','COL042'),(43,9,'MSS Waterproof Spray','Desodorante Masculino Speed Stick Waterproof Spray','COL043'),(44,9,'MSS X5 Spray','Desodorante Masculino Speed Stick X5 Spray','COL044');
/*!40000 ALTER TABLE `mdl_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_productoporcuestionario`
--

DROP TABLE IF EXISTS `mdl_productoporcuestionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_productoporcuestionario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCuestionarioPorVisita` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_productoPorCuestionario` (`idCuestionarioPorVisita`,`idProducto`),
  KEY `fk_productoPorCuestionario_producto` (`idProducto`),
  KEY `ix_productoPorCuestionario` (`id`),
  CONSTRAINT `fk_productoPorCuestionario_cuestionario` FOREIGN KEY (`idCuestionarioPorVisita`) REFERENCES `mdl_cuestionarioporvisita` (`id`),
  CONSTRAINT `fk_productoPorCuestionario_producto` FOREIGN KEY (`idProducto`) REFERENCES `mdl_producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_productoporcuestionario`
--

LOCK TABLES `mdl_productoporcuestionario` WRITE;
/*!40000 ALTER TABLE `mdl_productoporcuestionario` DISABLE KEYS */;
INSERT INTO `mdl_productoporcuestionario` (`id`, `idCuestionarioPorVisita`, `idProducto`) VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11);
/*!40000 ALTER TABLE `mdl_productoporcuestionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_provincia`
--

DROP TABLE IF EXISTS `mdl_provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_provincia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idDepartamento` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `fk_provincia_departamento` (`idDepartamento`),
  KEY `ix_provincia` (`id`),
  CONSTRAINT `fk_provincia_departamento` FOREIGN KEY (`idDepartamento`) REFERENCES `mdl_departamento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_provincia`
--

LOCK TABLES `mdl_provincia` WRITE;
/*!40000 ALTER TABLE `mdl_provincia` DISABLE KEYS */;
INSERT INTO `mdl_provincia` (`id`, `idDepartamento`, `nombre`) VALUES (1,2,'Lima'),(2,2,'Barranca'),(3,2,'Cajatambo'),(4,2,'Canta'),(5,2,'Cañete'),(6,2,'Huaral'),(7,2,'Huarochiri'),(8,2,'Huarua'),(9,2,'Oyon'),(10,2,'Yauyos');
/*!40000 ALTER TABLE `mdl_provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_puntodeventa`
--

DROP TABLE IF EXISTS `mdl_puntodeventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_puntodeventa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idTipoPuntoDeVenta` int(11) NOT NULL,
  `idUbigeo` int(11) NOT NULL,
  `razonSocial` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `direccion` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_puntoDeVenta_tipoPuntoDeVenta` (`idTipoPuntoDeVenta`),
  KEY `fk_puntoDeVenta_ubigeo` (`idUbigeo`),
  KEY `ix_puntoDeVenta` (`id`),
  CONSTRAINT `fk_puntoDeVenta_tipoPuntoDeVenta` FOREIGN KEY (`idTipoPuntoDeVenta`) REFERENCES `mdl_tipopuntodeventa` (`id`),
  CONSTRAINT `fk_puntoDeVenta_ubigeo` FOREIGN KEY (`idUbigeo`) REFERENCES `mdl_ubigeo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_puntodeventa`
--

LOCK TABLES `mdl_puntodeventa` WRITE;
/*!40000 ALTER TABLE `mdl_puntodeventa` DISABLE KEYS */;
INSERT INTO `mdl_puntodeventa` (`id`, `idTipoPuntoDeVenta`, `idUbigeo`, `razonSocial`, `direccion`, `telefono`) VALUES (1,3,2,'Metro la Marina','Av. La Marina 2500, San Miguel 15088',6138888),(2,3,2,'Metro Pershing','Av. Gregorio Escobedo 1050, Jesús María 15072',6138888),(3,3,2,'Metro Garzón','General Garzón 1337, Jesús María 15072',6138888),(4,3,2,'Metro Arenales','Centro Comerciales Arenales, Av. Arenales 1737, Lince 15046',6138888),(5,3,2,'Metro Alfonso Ugarte','Avenida Alfonso Ugarte, Breña 15082',6138888),(6,3,2,'Metro Emancipacion','Jirón Cuzco 245, Cercado de Lima 15001',6138888),(7,3,2,'Metro Manco Capac','Av. Manco Cápac 493, Cercado de Lima 15033',6138888),(8,3,2,'Metro la Victoria','Javier Luna Pizarro 1550, Cercado de Lima 15033',6138888),(9,3,2,'Metro Canada','Av. Canadá 1110, La Victoria 15034',6138888);
/*!40000 ALTER TABLE `mdl_puntodeventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_puntodeventaporvisita`
--

DROP TABLE IF EXISTS `mdl_puntodeventaporvisita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_puntodeventaporvisita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idVisita` int(11) NOT NULL,
  `idPuntoDeVenta` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_puntoDeVentaPorVisita` (`idVisita`,`idPuntoDeVenta`),
  KEY `fk_puntoDeVentaPorVisita_puntoDeVenta` (`idPuntoDeVenta`),
  KEY `ix_puntoDeVentaPorVisita` (`id`),
  CONSTRAINT `fk_puntoDeVentaPorVisita_puntoDeVenta` FOREIGN KEY (`idPuntoDeVenta`) REFERENCES `mdl_puntodeventa` (`id`),
  CONSTRAINT `fk_puntoDeVentaPorVisita_visita` FOREIGN KEY (`idVisita`) REFERENCES `mdl_visita` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_puntodeventaporvisita`
--

LOCK TABLES `mdl_puntodeventaporvisita` WRITE;
/*!40000 ALTER TABLE `mdl_puntodeventaporvisita` DISABLE KEYS */;
INSERT INTO `mdl_puntodeventaporvisita` (`id`, `idVisita`, `idPuntoDeVenta`) VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8);
/*!40000 ALTER TABLE `mdl_puntodeventaporvisita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_tipomaterialpublicitario`
--

DROP TABLE IF EXISTS `mdl_tipomaterialpublicitario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_tipomaterialpublicitario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_tipomaterialpublicitario`
--

LOCK TABLES `mdl_tipomaterialpublicitario` WRITE;
/*!40000 ALTER TABLE `mdl_tipomaterialpublicitario` DISABLE KEYS */;
INSERT INTO `mdl_tipomaterialpublicitario` (`id`, `nombre`, `descripcion`) VALUES (1,'Afiche','Sirven como aviso publicitario en las ventanas o paredes, sirbe para informar y ambientar el punto de venta'),(2,'Botones','Elementos que van sujetos al pecho y buscan dar mas información sobre la marca o el producto buscado atraer la atención del consumidor.'),(3,'Bandejas de Impulso','Son bandejas portátiles que el degustador lleva amarrado a el para ir dando de gustaciones a el publico de forma practica a medida que camina por el almacén sus beneficios son el poder hablar con el cliente y responder dudas o inquietudes y orientarlo. '),(4,'Uniformes','Es el vestuario especifico del trabajador que trabaja para una marca con ello se quiere establecer de que marca hace parte para atender dudas,inquietudes o preguntas.'),(5,'Mascotas o disfraces','Son disfraces de animales personificados en personas para impulsar las ventas de cualquier producto, es una forma mas atractiva de llamar la atención de adultos, niños y así impulsar su venta.'),(6,'Colgantes','Son piezas las cuales tienen avisos promocionales, marcas o productos que por lo general son colocados en el techo del almacén su función es la de brindar una información de forma llamativa ya que sobresale por sus colores vibrantes'),(7,'Avisos Luminosos','Es un elemento decorativo luminoso utilizado para atraer la vista del consumidor destacando productos y novedades de ciertas marcas se puede colocar en cualquier lugar que se vea visible utilizan luces neón, trípode entre otras con animaciones para su mayor atracción.'),(8,'Exhibidores Estiba','Son estantes provisionales y temporales ubicados en grandes almacenes con un área libre este ayuda a generar ventas y demanda al llamar la atención del cliente por su ambientación.'),(9,'Exhibidores de Piso','exhibidores individuales que son colocados al lado de la góndola para dar a conocer promociones o novedades, atrae la atención del consumidor haciéndola mas atractiva.'),(10,'Puntas de Gondola','Es el sitio estratégico para ubicar productos por que permite muy buena visibilidad, son los extremos de la góndola usados para colocar productos utilizados en cenefas, colgantes, cabe zotes entre otros, genera mayor rotación de productos y hace  exhibición mas notoria y atractiva.'),(11,'Muebles de Degustacion','Mesas portátiles diseñadas para la degustacion del consumidores sirve para todo tipo de productos esto llama la atención del consumidor haciéndolo un comprador potencial'),(12,'Carros para Impulso','Son estructuras móviles que sirven para dar degustacion, muestras o promociones de cierto producto o marca permite una fácil movilidad dentro el almacén permitiendo destacar innovaciones o lanzamientos de un producto.'),(13,'Exhibidores Temporales','Son estantes temporales colocados mientras transcurre algún evento, se caracteriza por realzar a la vista del cliente un producto o marca lo cual resulta mas atractivo.'),(14,'Bandejas','En donde se organizan determinados productos de sierta marca con el fin de que allá mayor organización y una mejor exhibición. '),(15,'Buzones','Son cajas rectangulares situada en ciertos puntos cono en sala de ventas para que el consumidor inserte una tarjeta y así participa en alguna promoción sorteo etc, sirve como complemento de exhibición.'),(16,'Inflables','Son estantes inflables grandes que sirven como punto de referencia para el cliente se estableen para dar alguna información generalmente cundo hay promociones y por su tamaño nunca pasan de apercibidos.'),(17,'Stickers','Adhesivos que se utilizan como publicidad de productos resaltando una promoción o característica especial.'),(18,'Fiyers','Material impreso que es para repartir a los consumidores o potenciales compradores  y brindarles una información de algún producto o servicio.'),(19,'Stop Portero','Ubicado generalmente ala la entrada de los establecimientos tiene gran tamaño su propósito es atraer al cliente a un producto especifico generalmente que este en promoción su objetivo es motivar la compra.'),(20,'Tent Cards','Utilizado como un mensaje publicitario variado dado a su forma triangular se puede visualizar por dos lados están ubicados generalmente en puntos de atecion al cliente o mostradores.'),(21,'Cuellos de Botella','Utilizados para informar sobre promociones de ciertas bebidas, es colocado en la parte superior de estas como un complemento publicitario.'),(22,'Banderines','Son generalmente pequeños utilizados para ambientar las áreas del almacén colocado en los techos con el objetivo de destacar una marca o una información.'),(23,'Floor Prints','Se usa para destacar un producto o una marca que este situada en variadas zonas con el objetivo que sea mas visual y fácil de ubicar es colocado en el suelo y lo que busca es generar recordación en el consumidor.'),(24,'Habladores','Es utilizado como un formato que va adherido a la gongola su uso es decorativo e informativo y es utilizado en la parte superior o en los lados del producto para ciertos eventos en particular.'),(25,'Banners','Utilizado como material decorativo que pretende mejorar la visualización y ubicación de un producto se coloca colgante se puede encontrar en techos o postes.'),(26,'Dangler','Es un material atractivo utilizado para informar y llamar la atención del cliente por su ubicación y forma ya que tiene un sistema de movimiento llamativo este sobre sale de la góndola.'),(27,'Stoper','Conocido también como Rompe Tráfico, es un elemento de señalizacion atractivo enfocado en llamar la atención del cliente por su ubicación es mas fácil de reconocer y ver mas fácil orientando mejor al cliente.'),(28,'Cabezotes','Es usado como material decorativo, se usa en las puntas de góndola como complementación en la exhibición de un producto normalmente son amplios para la mayor visibilidad del cliente.'),(29,'Cenefas','Es una decoración ubicada en los entrepaños de las góndolas con el fin de informar y dar mas visibilidad sobre un producto su propósito es llamar la atención del cliente.'),(30,'Material P.O.P.','Es utilizado como un implemento de información al cliente promoviendo productos y servicios de un punto de venta resaltando la exhibición con sus colores y letra haciéndolo llamativo para atraer la atención del cliente y así generar compra..');
/*!40000 ALTER TABLE `mdl_tipomaterialpublicitario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_tipopuntodeventa`
--

DROP TABLE IF EXISTS `mdl_tipopuntodeventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_tipopuntodeventa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `ix_tipoPuntoDeVenta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_tipopuntodeventa`
--

LOCK TABLES `mdl_tipopuntodeventa` WRITE;
/*!40000 ALTER TABLE `mdl_tipopuntodeventa` DISABLE KEYS */;
INSERT INTO `mdl_tipopuntodeventa` (`id`, `nombre`, `descripcion`) VALUES (1,'Bodega','Punto de Venta de Abarrotes donde se venden productos de primera necesidad'),(2,'Farmacia','Punto de Venta donde se venden Productos Medicinales'),(3,'Supermercado','Punto de Venta (Sucursal) donde se venden productos de primera necesidad por mayor y por menor');
/*!40000 ALTER TABLE `mdl_tipopuntodeventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_ubigeo`
--

DROP TABLE IF EXISTS `mdl_ubigeo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_ubigeo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPais` int(11) NOT NULL,
  `idDepartamento` int(11) NOT NULL,
  `idProvincia` int(11) NOT NULL,
  `idDistrito` int(11) NOT NULL,
  `codigo` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `fk_ubigeo_pais` (`idPais`),
  KEY `fk_ubigeo_departamento` (`idDepartamento`),
  KEY `fk_ubigeo_provincia` (`idProvincia`),
  KEY `fk_ubigeo_distrio` (`idDistrito`),
  KEY `ix_ubigeo` (`id`),
  CONSTRAINT `fk_ubigeo_departamento` FOREIGN KEY (`idDepartamento`) REFERENCES `mdl_departamento` (`id`),
  CONSTRAINT `fk_ubigeo_distrio` FOREIGN KEY (`idDistrito`) REFERENCES `mdl_distrito` (`id`),
  CONSTRAINT `fk_ubigeo_pais` FOREIGN KEY (`idPais`) REFERENCES `mdl_pais` (`id`),
  CONSTRAINT `fk_ubigeo_provincia` FOREIGN KEY (`idProvincia`) REFERENCES `mdl_provincia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_ubigeo`
--

LOCK TABLES `mdl_ubigeo` WRITE;
/*!40000 ALTER TABLE `mdl_ubigeo` DISABLE KEYS */;
INSERT INTO `mdl_ubigeo` (`id`, `idPais`, `idDepartamento`, `idProvincia`, `idDistrito`, `codigo`) VALUES (1,1,2,1,1,'020101'),(2,1,2,1,2,'020102'),(3,1,2,1,3,'020103'),(4,1,2,1,4,'020104'),(5,1,2,1,5,'020105'),(6,1,2,1,6,'020106'),(7,1,2,1,7,'020107'),(8,1,2,1,8,'020108'),(9,1,2,1,9,'020109'),(10,1,2,1,10,'020110'),(11,1,2,1,11,'020113'),(12,1,2,1,12,'020114'),(13,1,2,1,13,'020115'),(14,1,2,1,14,'020116'),(15,1,2,1,15,'020117'),(16,1,2,1,16,'020118'),(17,1,2,1,17,'020119'),(18,1,2,1,18,'020120'),(19,1,2,1,19,'020121'),(20,1,2,1,20,'020122'),(21,1,2,1,21,'020123'),(22,1,2,1,22,'020124'),(23,1,2,1,23,'020125'),(24,1,2,1,24,'020126'),(25,1,2,1,25,'020127'),(26,1,2,1,26,'020128'),(27,1,2,1,27,'020129'),(28,1,2,1,28,'020130'),(29,1,2,1,29,'020131'),(30,1,2,1,30,'020132'),(31,1,2,1,31,'020133'),(32,1,2,1,32,'020134'),(33,1,2,1,33,'020135'),(34,1,2,1,34,'020136'),(35,1,2,1,35,'020137'),(36,1,2,1,36,'020138'),(37,1,2,1,37,'020139'),(38,1,2,1,38,'020140'),(39,1,2,1,39,'020141'),(40,1,2,1,40,'020142'),(41,1,2,1,41,'020111'),(42,1,2,1,42,'020112');
/*!40000 ALTER TABLE `mdl_ubigeo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_usuario`
--

DROP TABLE IF EXISTS `mdl_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPerfil` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `nombreUsuario` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_usuario` (`idPerfil`,`idPersona`),
  KEY `fk_usuario_persona` (`idPersona`),
  KEY `ix_usuario` (`id`),
  CONSTRAINT `fk_usuario_perfil` FOREIGN KEY (`idPerfil`) REFERENCES `mdl_perfil` (`id`),
  CONSTRAINT `fk_usuario_persona` FOREIGN KEY (`idPersona`) REFERENCES `mdl_persona` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_usuario`
--

LOCK TABLES `mdl_usuario` WRITE;
/*!40000 ALTER TABLE `mdl_usuario` DISABLE KEYS */;
INSERT INTO `mdl_usuario` (`id`, `idPerfil`, `idPersona`, `nombreUsuario`, `password`) VALUES (1,1,1,'psalas','12345'),(2,2,3,'vbalta','12345'),(3,5,4,'jperez','12345'),(4,5,5,'jsalazar','12345'),(5,6,6,'gvilchez','12345'),(6,6,7,'jmedina','12345'),(7,6,8,'dalvarez','12345'),(8,6,9,'amalasquez','12345');
/*!40000 ALTER TABLE `mdl_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_usuarioporvisita`
--

DROP TABLE IF EXISTS `mdl_usuarioporvisita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_usuarioporvisita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idVisita` int(11) NOT NULL,
  `idUsuarioResponsable` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_usuarioPorVisita` (`idVisita`,`idUsuarioResponsable`),
  KEY `fk_usuarioPorVisita_UsuarioResponsable` (`idUsuarioResponsable`),
  KEY `ix_usuarioPorVisita` (`id`),
  CONSTRAINT `fk_usuarioPorVisita_UsuarioResponsable` FOREIGN KEY (`idUsuarioResponsable`) REFERENCES `mdl_usuario` (`id`),
  CONSTRAINT `fk_usuarioPorVisita_visita` FOREIGN KEY (`idVisita`) REFERENCES `mdl_visita` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_usuarioporvisita`
--

LOCK TABLES `mdl_usuarioporvisita` WRITE;
/*!40000 ALTER TABLE `mdl_usuarioporvisita` DISABLE KEYS */;
INSERT INTO `mdl_usuarioporvisita` (`id`, `idVisita`, `idUsuarioResponsable`) VALUES (1,1,4);
/*!40000 ALTER TABLE `mdl_usuarioporvisita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_usuarioporvisitadetalle`
--

DROP TABLE IF EXISTS `mdl_usuarioporvisitadetalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_usuarioporvisitadetalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuarioPorVisita` int(11) NOT NULL,
  `idUsuarioAsignado` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_usuarioPorVisitaDetalle` (`idUsuarioPorVisita`,`idUsuarioAsignado`),
  KEY `fk_usuarioPorVisitaDetalle_UsuarioAsignado` (`idUsuarioAsignado`),
  KEY `ix_usuarioPorVisitaDetalle` (`id`),
  CONSTRAINT `fk_usuarioPorVisitaDetalle_UsuarioAsignado` FOREIGN KEY (`idUsuarioAsignado`) REFERENCES `mdl_usuario` (`id`),
  CONSTRAINT `fk_usuarioPorVisitaDetalle_usuarioPorVisita` FOREIGN KEY (`idUsuarioPorVisita`) REFERENCES `mdl_usuarioporvisita` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_usuarioporvisitadetalle`
--

LOCK TABLES `mdl_usuarioporvisitadetalle` WRITE;
/*!40000 ALTER TABLE `mdl_usuarioporvisitadetalle` DISABLE KEYS */;
INSERT INTO `mdl_usuarioporvisitadetalle` (`id`, `idUsuarioPorVisita`, `idUsuarioAsignado`) VALUES (1,1,5),(2,1,6),(3,1,7),(4,1,8);
/*!40000 ALTER TABLE `mdl_usuarioporvisitadetalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdl_visita`
--

DROP TABLE IF EXISTS `mdl_visita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mdl_visita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCampañaPublicitaria` int(11) NOT NULL,
  `idPeriodo` int(11) NOT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_visita_campañaPublicitaria` (`idCampañaPublicitaria`),
  KEY `fk_visita_periodo` (`idPeriodo`),
  CONSTRAINT `fk_visita_campañaPublicitaria` FOREIGN KEY (`idCampañaPublicitaria`) REFERENCES `mdl_campañapublicitaria` (`id`),
  CONSTRAINT `fk_visita_periodo` FOREIGN KEY (`idPeriodo`) REFERENCES `mdl_periodo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdl_visita`
--

LOCK TABLES `mdl_visita` WRITE;
/*!40000 ALTER TABLE `mdl_visita` DISABLE KEYS */;
INSERT INTO `mdl_visita` (`id`, `idCampañaPublicitaria`, `idPeriodo`, `descripcion`) VALUES (1,1,1,'Visita de Prueba'),(2,1,2,'Visita de Recolección de Productos de la competencia'),(3,1,3,'Visita de Recolección de Precios Finales'),(4,1,4,'Visita de Recolección de Existencias en Stock en Zona Norte');
/*!40000 ALTER TABLE `mdl_visita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicos`
--

DROP TABLE IF EXISTS `medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicos` (
  `idmedico` int(11) NOT NULL AUTO_INCREMENT,
  `idespecialidad` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idmedico`),
  UNIQUE KEY `IDX_medicos_2` (`nombre`),
  KEY `FK_medicos_1` (`idespecialidad`),
  CONSTRAINT `FK_medicos_1` FOREIGN KEY (`idespecialidad`) REFERENCES `especialidades` (`idespecialidad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicos`
--

LOCK TABLES `medicos` WRITE;
/*!40000 ALTER TABLE `medicos` DISABLE KEYS */;
INSERT INTO `medicos` (`idmedico`, `idespecialidad`, `nombre`) VALUES (1,3,'Barriga Briceño José'),(2,3,'Febres Campos Roberto'),(3,2,'Ferrando Delgado Raúl'),(4,1,'Ramos Vásquez Jorge'),(5,1,'Telles Salas María Luisa');
/*!40000 ALTER TABLE `medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pacientes` (
  `idpaciente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `nacimiento` date DEFAULT NULL,
  PRIMARY KEY (`idpaciente`),
  UNIQUE KEY `IDX_pacientes_2` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` (`idpaciente`, `nombre`, `nacimiento`) VALUES (1,'Marquez Beltran, Miguel Angel','1956-10-16'),(2,'Vega Galvez, Tomas Alfonso','1990-04-20'),(3,'Dueñas Anco, Jessica','1985-10-13'),(4,'Nicho Sanchez, Pilar Liliam','1987-08-19'),(5,'Shironoshita Shirazawa, Roberto','1970-02-25'),(6,'Novoa Lucano, Henry Segundo','1972-04-11'),(7,'Cardama Barco, Betsy Lita','1986-05-20'),(8,'Silva Valenzuela, Juan Carlos','1979-11-06');
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `idproducto` int(11) NOT NULL AUTO_INCREMENT,
  `producto` varchar(200) NOT NULL,
  `precio` double(13,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `fotopath` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idproducto`),
  UNIQUE KEY `IDX_productos_2` (`producto`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`idproducto`, `producto`, `precio`, `stock`, `fotopath`) VALUES (1,'Inka Cola',5.00,999,'images/inca-kola.jpg'),(2,'Pepsi Cola',5.50,999,'images/pepsi.jpg'),(3,'Coca Cola',6.00,999,'images/cocacola.jpg'),(4,'Cristal',4.00,997,'images/cristal.jpg'),(5,'Cusqueña',3.50,1000,'images/cusquena.jpg'),(6,'Pilsen',3.50,1000,'images/pilsen.jpg'),(7,'Borgoña',15.00,1000,'images/borgona.jpg'),(8,'Magdalena',15.50,999,'images/magdalena.jpg'),(9,'CRUD Java MySql NetBeans',15.00,10,NULL),(10,'Hibernate JavaServer Faces',15.00,20,NULL),(11,'Spring Hibernate Struts2',20.00,30,NULL),(12,'Spring MyBatis JavaServer Faces',20.00,10,NULL),(13,'Combos Anidados - MySQL jQuery',10.00,40,NULL),(14,'Consultas Paginadas - PostgreSQL',10.00,15,NULL),(15,'StoreProcedure - MySQL',10.00,12,NULL),(16,'Autenticación y Autorización ',15.00,20,NULL),(17,'Consulta paginada con jqGrid',15.00,30,NULL),(18,'XML con Java (mantenimiento) ',15.00,22,NULL),(19,'JSON con Java (mantenimiento) ',15.00,22,NULL),(20,'Manejo de Fechas y Horas',15.00,30,NULL);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temas`
--

DROP TABLE IF EXISTS `temas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temas` (
  `idtema` int(11) NOT NULL AUTO_INCREMENT,
  `idcd` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `duracion` int(11) NOT NULL COMMENT 'en segundos',
  PRIMARY KEY (`idtema`),
  UNIQUE KEY `IDX_temas_3` (`idcd`,`titulo`),
  KEY `FK_temas_1` (`idcd`),
  CONSTRAINT `FK_temas_1` FOREIGN KEY (`idcd`) REFERENCES `cds` (`idcd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temas`
--

LOCK TABLES `temas` WRITE;
/*!40000 ALTER TABLE `temas` DISABLE KEYS */;
INSERT INTO `temas` (`idtema`, `idcd`, `titulo`, `duracion`) VALUES (1,1,'Un millón de amigos',172),(2,1,'El día que me quieras',290),(3,1,'Que será de ti',304),(4,1,'El gato que está triste y azul',310),(5,1,'Cóncavo y convexo',260);
/*!40000 ALTER TABLE `temas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutoriales`
--

DROP TABLE IF EXISTS `tutoriales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutoriales` (
  `idtutorial` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `precio` double(10,2) NOT NULL,
  PRIMARY KEY (`idtutorial`),
  UNIQUE KEY `IDX_tutoriales_1` (`titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutoriales`
--

LOCK TABLES `tutoriales` WRITE;
/*!40000 ALTER TABLE `tutoriales` DISABLE KEYS */;
INSERT INTO `tutoriales` (`idtutorial`, `titulo`, `tipo`, `precio`) VALUES (1,'Consulta Paginada con jQuery','Separata',10.00),(2,'Combos Anidados con jQuery','Video',10.00),(3,'Transacciones en MySQL','Separata',15.00),(4,'Store Procedure en Oracle','Separata',15.00),(5,'PDF con Spring','Video',15.00),(39,'Spring nuevos registros','Separata',10.10);
/*!40000 ALTER TABLE `tutoriales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `apellidos` varchar(50) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` tinyblob NOT NULL,
  `autorizacion` varchar(10) NOT NULL COMMENT 'ADMIN / CLIENT',
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `IDX_usuarios_2` (`apellidos`,`nombres`),
  UNIQUE KEY `IDX_usuarios_3` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`idusuario`, `apellidos`, `nombres`, `usuario`, `password`, `autorizacion`) VALUES (1,'Balta Alva','Victor Manuel','vbalta',AES_ENCRYPT(12345, 'parainfo') ,'ADMIN'),(2,'Vasquez Paragulla','Juan Julio','jvasquez',AES_ENCRYPT(12345, 'parainfo') ,'CLIENT');

/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventadetalles`
--

DROP TABLE IF EXISTS `ventadetalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventadetalles` (
  `iddetalle` int(11) NOT NULL AUTO_INCREMENT,
  `idventa` int(11) NOT NULL,
  `idproducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`iddetalle`),
  KEY `FK_ventadetalles_1` (`idventa`),
  KEY `FK_ventadetalles_2` (`idproducto`),
  CONSTRAINT `FK_ventadetalles_1` FOREIGN KEY (`idventa`) REFERENCES `ventas` (`idventa`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ventadetalles_2` FOREIGN KEY (`idproducto`) REFERENCES `productos` (`idproducto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventadetalles`
--

LOCK TABLES `ventadetalles` WRITE;
/*!40000 ALTER TABLE `ventadetalles` DISABLE KEYS */;
INSERT INTO `ventadetalles` (`iddetalle`, `idventa`, `idproducto`, `cantidad`) VALUES (1,1,1,1),(2,1,2,1),(3,1,3,1),(4,1,8,1);
/*!40000 ALTER TABLE `ventadetalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas` (
  `idventa` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` varchar(200) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idventa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` (`idventa`, `cliente`, `fecha`) VALUES (1,'Cliente No Habitual','2017-10-17 17:43:56');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-26 11:14:41
