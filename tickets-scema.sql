CREATE TABLE `ticket_events`.`tickets` (
  `id` int(11) NOT NULL,
  `event_id` int(3) UNSIGNED ZEROFILL NOT NULL,
  `event_date` datetime NOT NULL,
  `ticket_adult_price` int(255) NOT NULL,
  `ticket_adult_quantity` int(45) NOT NULL,
  `ticket_kid_price` int(255) NOT NULL,
  `ticket_kid_quantity` int(45) NOT NULL,
  `ticket_reduced_price` int(255) NOT NULL,
  `ticket_reduced_quantity` int(45) NOT NULL,
  `ticket_group_price` int(255) NOT NULL,
  `ticket_group_quantity` int(45) NOT NULL,
  `barcode` int(255) NOT NULL,
  `user_id` int(5) UNSIGNED ZEROFILL NOT NULL,
  `equal_price` int(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



ALTER TABLE tickets ADD ? ${new_type_ticket_price} varchar(255) NOT NULL AFTER ticket_group_quantity, ADD ${new_type_ticket_quantity} varchar(40) NOT NULL AFTER ${new_type_ticket_price}