DELIMITER $$

-- Trigger when a status is changed from a paid state (2-4) to 5 (Cancelled)
CREATE TRIGGER `posg4_AFTER_UPDATE_STATUS_REFUND` AFTER UPDATE ON `posg4` FOR EACH ROW BEGIN
	IF new.statusG4 = 5 AND old.statusG4 != 1 THEN -- dont trigger a refund on an unpaid order
    
    SELECT SUM(linePriceG4) FROM g4.POLinesg4 WHERE poNoG4=old.poNoG4 INTO @total;
    
    UPDATE ClientG4 SET moneyOwedG4 = (moneyOwedG4 - @total) WHERE clientCompIdG4=old.clientCompIdG4;
    END IF;
END$$

DELIMITER ;