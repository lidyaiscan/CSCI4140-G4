DELIMITER $$

-- Trigger when a status is changed from a paid state (2-4) to 5 (Cancelled)
CREATE TRIGGER `POSG4_AFTER_UPDATE_STATUS_REFUND` AFTER UPDATE ON `POsG4` FOR EACH ROW BEGIN
	DECLARE qty INTEGER;
    DECLARE partNo INTEGER;
	DECLARE finished INTEGER DEFAULT 0;

	DECLARE cw CURSOR FOR SELECT partNoG4, qtyG4 from POsG4 NATURAL JOIN POLinesG4 WHERE poNoG4=5;
    	-- declare NOT FOUND handler
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

	IF new.statusG4 = 5 AND old.statusG4 != 1 THEN -- dont trigger a refund on an unpaid order
    
    SELECT SUM(linePriceG4) FROM POLinesG4 WHERE poNoG4=old.poNoG4 INTO @total;
    
    -- Step 1: Refund money
    UPDATE ClientG4 SET moneyOwedG4 = (moneyOwedG4 - @total) WHERE clientCompIdG4=old.clientCompIdG4;
	
    -- Step 2: Restock Items
    OPEN cw;
		getPart: LOOP
			FETCH cw INTO partNo, qty;
			IF finished = 1 THEN 
				LEAVE getPart;
			END IF;
			-- run repeated query
            UPDATE PartsG4 SET qtyG4=(qtyG4+qty) WHERE partNoG4=partNo; 
		END LOOP getPart;
		CLOSE cw;
    
    END IF;

END$$

DELIMITER ;