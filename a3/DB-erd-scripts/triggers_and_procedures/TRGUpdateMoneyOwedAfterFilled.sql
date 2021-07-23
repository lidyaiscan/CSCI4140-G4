DELIMITER $$

-- Trigger when a status is changed to filled
CREATE TRIGGER `POSG4_AFTER_UPDATE_STATUS_FILLED` AFTER UPDATE ON `POsG4` FOR EACH ROW BEGIN
    DECLARE qty INTEGER;
    DECLARE partNo INTEGER;
	DECLARE finished INTEGER DEFAULT 0;

	DECLARE cw CURSOR FOR SELECT partNoG4, qtyG4 from POsG4 NATURAL JOIN POLinesG4 WHERE poNoG4=old.poNoG4;
    -- declare NOT FOUND handler
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

	IF new.statusG4 = 6 THEN

    SELECT SUM(linePriceG4) FROM POLinesG4 WHERE poNoG4=old.poNoG4 INTO @total;

    -- Step 1: update money
    UPDATE ClientG4 SET moneyOwedG4 = (moneyOwedG4 + @total) WHERE clientCompIdG4=old.clientCompIdG4;

END IF;

END$$

DELIMITER ;