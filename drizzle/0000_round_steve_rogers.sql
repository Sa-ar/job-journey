-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `processes` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`company` varchar(255),
	`position` varchar(255),
	`steps` json,
	`current_step_index` int DEFAULT 0,
	`is_failed` tinyint DEFAULT 0,
	`is_deleted` tinyint DEFAULT 0);

*/