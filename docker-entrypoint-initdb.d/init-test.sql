-- Drop tables in the reverse order of dependencies
DROP TABLE IF EXISTS `Report`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Role`;
DROP TABLE IF EXISTS `city`;

-- Recreate tables
CREATE TABLE IF NOT EXISTS `city` (
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

CREATE TABLE IF NOT EXISTS `Role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`role_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `User` (
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
    REFERENCES `city` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `his_role`
    FOREIGN KEY (`role`)
    REFERENCES `Role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Report` (
  `report_id` INT NOT NULL AUTO_INCREMENT,
  `enseigne` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `location` VARCHAR(255) NULL,
  `photoUrl` VARCHAR(255) NULL,
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
    REFERENCES `User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `this_city`
    FOREIGN KEY (`city`)
    REFERENCES `city` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;
