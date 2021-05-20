-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema G4
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema G4
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `G4` DEFAULT CHARACTER SET latin1 ;
USE `G4` ;

-- -----------------------------------------------------
-- Table `G4`.`ClientG4`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `G4`.`ClientG4` (
  `clientCompIdG4` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompName` VARCHAR(255) NOT NULL,
  `clientCityG4` VARCHAR(255) NOT NULL,
  `clientCompPasswordG4` VARCHAR(255) NOT NULL,
  `moneyOwedG4` DECIMAL(19,4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`clientCompIdG4`),
  UNIQUE INDEX `clientCompIdG4_UNIQUE` (`clientCompIdG4` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `G4`.`StatusG4`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `G4`.`StatusG4` (
  `statusNoG4` INT(11) NOT NULL AUTO_INCREMENT,
  `statusDescriptionG4` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`statusNoG4`),
  UNIQUE INDEX `statusNoG4_UNIQUE` (`statusNoG4` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `G4`.`POsG4`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `G4`.`POsG4` (
  `poNoG4` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompIdG4` INT(11) NOT NULL,
  `datePOG4` DATETIME NOT NULL DEFAULT now(),
  `statusG4` INT(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`poNoG4`),
  INDEX `fk_POsG4_ClientG4_idx` (`clientCompIdG4` ASC) ,
  INDEX `fk_POsG4_StatusG41_idx` (`statusG4` ASC) ,
  UNIQUE INDEX `poNoG4_UNIQUE` (`poNoG4` ASC) ,
  CONSTRAINT `fk_POsG4_ClientG4`
    FOREIGN KEY (`clientCompIdG4`)
    REFERENCES `G4`.`ClientG4` (`clientCompIdG4`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_POsG4_StatusG41`
    FOREIGN KEY (`statusG4`)
    REFERENCES `G4`.`StatusG4` (`statusNoG4`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `G4`.`PartsG4`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `G4`.`PartsG4` (
  `partNoG4` INT(11) NOT NULL AUTO_INCREMENT,
  `partNameG4` VARCHAR(255) NOT NULL,
  `partDescriptionG4` VARCHAR(255) NOT NULL,
  `currentPriceG4` DECIMAL(19,4) NOT NULL DEFAULT 0,
  `qtyG4` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`partNoG4`),
  UNIQUE INDEX `partNoG4_UNIQUE` (`partNoG4` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `G4`.`POLinesG4`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `G4`.`POLinesG4` (
  `lineNoG4` INT(11) NOT NULL AUTO_INCREMENT,
  `poNoG4` INT(11) NOT NULL,
  `partNoG4` INT(11) NOT NULL,
  `linePriceG4` DECIMAL(19,4) NOT NULL DEFAULT 0,
  `qtyG4` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`lineNoG4`, `poNoG4`),
  INDEX `fk_POLinesG4_POsG41_idx` (`poNoG4` ASC) ,
  INDEX `fk_POLinesG4_PartsG41_idx` (`partNoG4` ASC) ,
  UNIQUE INDEX `lineNoG4_UNIQUE` (`lineNoG4` ASC) ,
  CONSTRAINT `fk_POLinesG4_POsG41`
    FOREIGN KEY (`poNoG4`)
    REFERENCES `G4`.`POsG4` (`poNoG4`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_POLinesG4_PartsG41`
    FOREIGN KEY (`partNoG4`)
    REFERENCES `G4`.`PartsG4` (`partNoG4`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
