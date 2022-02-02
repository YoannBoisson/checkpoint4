-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ingesta
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ingesta
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ingesta` DEFAULT CHARACTER SET utf8 ;
USE `ingesta` ;

-- -----------------------------------------------------
-- Table `ingesta`.`activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ingesta`.`activity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `level` VARCHAR(45) NOT NULL,
  `coefficient` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ingesta`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ingesta`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `date_of_birth` VARCHAR(45) NOT NULL,
  `sex` TINYINT NOT NULL,
  `weight` INT NOT NULL,
  `height` INT NOT NULL,
  `id_activity` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_activity_idx` (`id_activity` ASC) VISIBLE,
  CONSTRAINT `id_activity`
    FOREIGN KEY (`id_activity`)
    REFERENCES `ingesta`.`activity` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ingesta`.`food`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ingesta`.`food` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `energy` INT NOT NULL,
  `protein` INT NOT NULL,
  `carbohydrate` INT NOT NULL,
  `lipid` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ingesta`.`user_food`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ingesta`.`user_food` (
  `id_user` INT NOT NULL,
  `id_food` INT NOT NULL,
  PRIMARY KEY (`id_user`, `id_food`),
  INDEX `id_food_idx` (`id_food` ASC) VISIBLE,
  CONSTRAINT `id_food`
    FOREIGN KEY (`id_food`)
    REFERENCES `ingesta`.`food` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `ingesta`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
