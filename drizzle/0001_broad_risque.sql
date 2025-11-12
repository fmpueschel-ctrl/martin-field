CREATE TABLE `agent_activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`activityType` enum('synergy_discovered','stakeholder_identified','opportunity_found','content_analyzed','recommendation_made') NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`relatedType` enum('company','book','philosophy','stakeholder','synergy'),
	`relatedId` int,
	`confidence` int,
	`status` enum('pending','reviewed','accepted','rejected') DEFAULT 'pending',
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `agent_activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`subtitle` text,
	`description` text,
	`coverImageUrl` varchar(512),
	`amazonUrl` varchar(512),
	`publishedYear` int,
	`isbn` varchar(32),
	`publisher` varchar(255),
	`pages` int,
	`language` varchar(8) DEFAULT 'de',
	`status` enum('published','unpublished','coming_soon') DEFAULT 'published',
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `books_id` PRIMARY KEY(`id`),
	CONSTRAINT `books_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`tagline` text,
	`description` text,
	`websiteUrl` varchar(512),
	`logoUrl` varchar(512),
	`industry` varchar(128),
	`location` varchar(255),
	`founded` int,
	`sortOrder` int DEFAULT 0,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`),
	CONSTRAINT `companies_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `content_blocks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`contentType` enum('markdown','html','text') DEFAULT 'markdown',
	`category` varchar(64),
	`language` varchar(8) DEFAULT 'de',
	`isPublic` boolean DEFAULT true,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_blocks_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_blocks_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `philosophical_works` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`subtitle` text,
	`description` text,
	`content` text,
	`category` enum('trimony','brian','manifestation','consciousness','other') NOT NULL,
	`imageUrl` varchar(512),
	`documentUrl` varchar(512),
	`sortOrder` int DEFAULT 0,
	`isPublic` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `philosophical_works_id` PRIMARY KEY(`id`),
	CONSTRAINT `philosophical_works_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `stakeholders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('person','organization','institution','media') NOT NULL,
	`role` varchar(255),
	`email` varchar(320),
	`website` varchar(512),
	`linkedinUrl` varchar(512),
	`description` text,
	`relevance` text,
	`status` enum('potential','contacted','engaged','partner','inactive') DEFAULT 'potential',
	`priority` enum('low','medium','high') DEFAULT 'medium',
	`tags` text,
	`notes` text,
	`lastContactedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stakeholders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `synergies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`sourceType` enum('company','book','philosophy','stakeholder') NOT NULL,
	`sourceId` int NOT NULL,
	`targetType` enum('company','book','philosophy','stakeholder') NOT NULL,
	`targetId` int NOT NULL,
	`synergyType` enum('conceptual','practical','business','research') NOT NULL,
	`strength` enum('weak','medium','strong') DEFAULT 'medium',
	`discoveredBy` enum('manual','ai_agent') DEFAULT 'manual',
	`isActive` boolean DEFAULT true,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `synergies_id` PRIMARY KEY(`id`)
);
