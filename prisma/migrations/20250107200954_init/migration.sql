-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `password` VARCHAR(199) NOT NULL,
    `provider_id` VARCHAR(199) NULL,
    `customer_id` VARCHAR(199) NULL,
    `employee_id` VARCHAR(199) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `phone`(`phone`),
    INDEX `fk_customer_user`(`customer_id`),
    INDEX `fk_employee_user`(`employee_id`),
    INDEX `fk_provider_user`(`provider_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answers` (
    `id` VARCHAR(191) NOT NULL,
    `request_id` VARCHAR(199) NOT NULL,
    `employee_id` VARCHAR(199) NOT NULL,
    `answer_type` VARCHAR(199) NOT NULL,
    `category` VARCHAR(200) NULL,
    `quote_id` VARCHAR(199) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_answer_employee`(`employee_id`),
    INDEX `fk_answer_quote`(`quote_id`),
    INDEX `fk_answer_request`(`request_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `state_id` INTEGER NOT NULL,

    INDEX `fk_state_city`(`state_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `continents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `continent_id` INTEGER NOT NULL,

    INDEX `fk_continent_country`(`continent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` VARCHAR(191) NOT NULL,
    `identification` VARCHAR(50) NULL,
    `name` VARCHAR(150) NOT NULL,
    `credit_card_holder_name` VARCHAR(180) NULL,
    `gender` VARCHAR(50) NULL,
    `birthdate` DATETIME(0) NULL,
    `country` VARCHAR(100) NULL,
    `city` VARCHAR(100) NULL,
    `address` VARCHAR(100) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `id` VARCHAR(191) NOT NULL,
    `headquarters_id` VARCHAR(199) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `workstation` VARCHAR(100) NULL DEFAULT 'Vendedor',
    `updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_employee_headquarter`(`headquarters_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gammas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `image_url` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `headquarters` (
    `id` VARCHAR(191) NOT NULL,
    `provider_id` VARCHAR(199) NOT NULL,
    `city_id` INTEGER NOT NULL,
    `address` VARCHAR(60) NOT NULL,
    `cities_preferences` LONGTEXT NULL,
    `percentage_of_rent` INTEGER NOT NULL DEFAULT 0,
    `allowed_payment_method_preference` VARCHAR(150) NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_city_headquarter`(`city_id`),
    INDEX `fk_headquarter_provider`(`provider_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `providers` (
    `id` VARCHAR(191) NOT NULL,
    `nit` VARCHAR(50) NOT NULL,
    `company_name` VARCHAR(200) NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `nit`(`nit`),
    UNIQUE INDEX `company_name`(`company_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotes` (
    `id` VARCHAR(191) NOT NULL,
    `rental_price` INTEGER NOT NULL DEFAULT 0,
    `overtime_price` INTEGER NOT NULL DEFAULT 0,
    `home_delivery_price` INTEGER NOT NULL DEFAULT 0,
    `home_collection_price` INTEGER NOT NULL DEFAULT 0,
    `price_for_return_or_collection_in_a_different_city` INTEGER NOT NULL DEFAULT 0,
    `total_value` INTEGER NOT NULL DEFAULT 0,
    `allowed_payment_method` VARCHAR(100) NOT NULL,
    `vehicle_id` VARCHAR(199) NOT NULL,
    `warranty` INTEGER NOT NULL DEFAULT 0,
    `payment_method_allowed_for_guarantee` VARCHAR(100) NOT NULL,
    `available_kilometers` VARCHAR(50) NOT NULL DEFAULT 'Libre',
    `percentage_of_rent` INTEGER NOT NULL,
    `percentage_of_rent_in_values` INTEGER NOT NULL,
    `comments` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_vehicle_quote`(`vehicle_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requests` (
    `id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(199) NOT NULL,
    `quote_id` VARCHAR(199) NULL,
    `comments` TEXT NULL DEFAULT 'No hay comentarios',
    `id_entry_city` INTEGER NOT NULL,
    `receive_at_airport` BOOLEAN NOT NULL DEFAULT false,
    `id_devolution_city` INTEGER NOT NULL,
    `returns_at_airport` BOOLEAN NOT NULL DEFAULT false,
    `entry_date` DATETIME(0) NOT NULL,
    `entry_time` VARCHAR(20) NOT NULL,
    `devolution_date` DATETIME(0) NOT NULL,
    `devolution_time` VARCHAR(20) NOT NULL,
    `gamma_id` INTEGER NOT NULL,
    `transmission_id` INTEGER NOT NULL,
    `confirmed_payment` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_devolution_city`(`id_devolution_city`),
    INDEX `fk_entry_city`(`id_entry_city`),
    INDEX `fk_quote_request`(`quote_id`),
    INDEX `fk_request_customer`(`customer_id`),
    INDEX `fk_gamma_request`(`gamma_id`),
    INDEX `fk_transmission_request`(`transmission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requests_providers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `request_id` VARCHAR(199) NOT NULL,
    `provider_id` VARCHAR(199) NOT NULL,
    `sent_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_providers_requests`(`provider_id`),
    INDEX `fk_requests_providers`(`request_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `states` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` INTEGER NOT NULL,
    `country_id` INTEGER NOT NULL,

    INDEX `fk_country_state`(`country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transmissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `image_url` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(199) NOT NULL,
    `role_id` INTEGER NOT NULL,

    INDEX `fk_role_user`(`role_id`),
    INDEX `fk_user_role`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `gamma_id` INTEGER NOT NULL,

    INDEX `fk_gamma_vehicle`(`gamma_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles_providers` (
    `id` VARCHAR(191) NOT NULL,
    `vehicle_id` VARCHAR(199) NOT NULL,
    `headquarter_id` VARCHAR(199) NOT NULL,
    `color` VARCHAR(60) NOT NULL,
    `plate_end_in` VARCHAR(20) NOT NULL,
    `transmission_id` INTEGER NOT NULL,
    `mileage` INTEGER NOT NULL DEFAULT 0,

    INDEX `fk_headquarter_vehicle`(`headquarter_id`),
    INDEX `fk_vehicle_headquarter`(`vehicle_id`),
    INDEX `fk_transmission_vehicle`(`transmission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_customer_user` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_employee_user` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_provider_user` FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `fk_answer_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `fk_answer_quote` FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `fk_answer_request` FOREIGN KEY (`request_id`) REFERENCES `requests`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `fk_state_city` FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `countries` ADD CONSTRAINT `fk_continent_country` FOREIGN KEY (`continent_id`) REFERENCES `continents`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `fk_employee_headquarter` FOREIGN KEY (`headquarters_id`) REFERENCES `headquarters`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `headquarters` ADD CONSTRAINT `fk_city_headquarter` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `headquarters` ADD CONSTRAINT `fk_headquarter_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `quotes` ADD CONSTRAINT `fk_vehicle_quote` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles_providers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `fk_devolution_city` FOREIGN KEY (`id_devolution_city`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `fk_entry_city` FOREIGN KEY (`id_entry_city`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `fk_gamma_request` FOREIGN KEY (`gamma_id`) REFERENCES `gammas`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `fk_quote_request` FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `fk_request_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `fk_transmission_request` FOREIGN KEY (`transmission_id`) REFERENCES `transmissions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `requests_providers` ADD CONSTRAINT `fk_providers_requests` FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `requests_providers` ADD CONSTRAINT `fk_requests_providers` FOREIGN KEY (`request_id`) REFERENCES `requests`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `states` ADD CONSTRAINT `fk_country_state` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `fk_role_user` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `fk_gamma_vehicle` FOREIGN KEY (`gamma_id`) REFERENCES `gammas`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `vehicles_providers` ADD CONSTRAINT `fk_headquarter_vehicle` FOREIGN KEY (`headquarter_id`) REFERENCES `headquarters`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `vehicles_providers` ADD CONSTRAINT `fk_transmission_vehicle` FOREIGN KEY (`transmission_id`) REFERENCES `transmissions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `vehicles_providers` ADD CONSTRAINT `fk_vehicle_headquarter` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
