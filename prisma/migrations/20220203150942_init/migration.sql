-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `article_category_id_fkey`;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
