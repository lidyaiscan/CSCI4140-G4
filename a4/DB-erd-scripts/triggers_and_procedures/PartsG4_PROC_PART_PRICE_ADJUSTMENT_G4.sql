DELIMITER //
CREATE PROCEDURE `PROC_PART_PRICE_ADJUSTMENT_G4`(IN inPartNoG4 INT(11), IN inCurrentPriceG4 DECIMAL(19,4))
BEGIN
	-- DEFINE AN ERROR HANDLING. FIRST ROLLBACK THEN RETHROW THE ERROR TO THE REQUESTOR APPLICATION.
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING, NOT FOUND
    BEGIN
		ROLLBACK;
        RESIGNAL;
	END;	
    -- TRANSACTION
	START TRANSACTION;
    IF ISNULL(inPartNoG4) OR ISNULL(inCurrentPriceG4) THEN
		-- USER DEFINED ERROR (NULL VALUE IS NOT ACCEPTED).
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT='Null value is not accepted.';
    ELSEIF SIGN(inCurrentPriceG4) < 0 THEN -- FOR NOW, PRICE SHOULD BE A POSITIVE NUMBER.
		-- USER DEFINED ERROR (PRICE CANNOT BE LESS THAN ZERO).
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT='Price cannot be less than zero.';
    ELSE
    -- UPDATE THE INFORMATION IN THE PARTSG4 TABLE.
    UPDATE PartsG4 SET currentPriceG4=inCurrentPriceG4 WHERE partNoG4=inPartNoG4;
	-- RETURN THE UPDATED INFORMATION BACK TO THE REQUESTOR.
	SELECT * FROM PartsG4 WHERE partNoG4=inPartNoG4;
    END IF;
    -- COMMIT THE ENTIRE CHANGE.
    COMMIT;
END //
DELIMITER ;