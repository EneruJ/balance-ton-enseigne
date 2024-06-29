-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS `database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Switch to the database
USE `database`;

-- Create the table city
CREATE TABLE IF NOT EXISTS database.city (
  `city_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `postal_code` VARCHAR(45) NULL,
  `latitude` VARCHAR(45) NULL,
  `longitude` VARCHAR(45) NULL,
  `timezone` VARCHAR(45) NULL,
  `population` VARCHAR(45) NULL,
  `area` VARCHAR(45) NULL,
  `details` VARCHAR(45) NULL,
  PRIMARY KEY (`city_id`)
) ENGINE = InnoDB;

-- Create the table `Role`
CREATE TABLE IF NOT EXISTS database.Role (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`role_id`)
) ENGINE = InnoDB;

-- Create the table `User`
CREATE TABLE IF NOT EXISTS database.User (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `city` INT NOT NULL,
  `role` INT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  INDEX `his_city_idx` (`city` ASC),
  INDEX `his_role_idx` (`role` ASC),
  CONSTRAINT `his_city`
    FOREIGN KEY (`city`)
    REFERENCES `database`.`city` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `his_role`
    FOREIGN KEY (`role`)
    REFERENCES `database`.`Role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Create the table `Report`
CREATE TABLE IF NOT EXISTS database.Report (
  `report_id` INT NOT NULL AUTO_INCREMENT,
  `enseigne` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `location` VARCHAR(45) NULL,
  `photoUrl` VARCHAR(45) NULL,
  `city` INT NOT NULL,
  `user_id` INT NOT NULL,
  `status` VARCHAR(45) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  INDEX `created_by_idx` (`user_id` ASC),
  INDEX `this_city_idx` (`city` ASC),
  CONSTRAINT `created_by`
    FOREIGN KEY (`user_id`)
    REFERENCES `database`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `this_city`
    FOREIGN KEY (`city`)
    REFERENCES `database`.`city` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;
