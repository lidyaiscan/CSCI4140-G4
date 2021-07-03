DELIMITER //
CREATE PROCEDURE `PROC_CANCEL_THE_PROGRESSING_PO_G4`(IN inPoNoG4 INT(11))
BEGIN
	DECLARE statusNo INT;
    DECLARE poNo INT;
	-- DEFINE AN ERROR HANDLING. FIRST ROLLBACK THEN RETHROW THE ERROR TO THE REQUESTOR APPLICATION.
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING, NOT FOUND
    BEGIN
		ROLLBACK;
        RESIGNAL;
	END;
    -- TRANSACTION
	START TRANSACTION;
    set poNo = TRIM(inPoNoG4);
    IF ISNULL(inPoNoG4) THEN
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT='Null value is not accepted.';
    ELSE
		SELECT statusNoG4 INTO statusNo FROM POsG4 JOIN StatusG4 ON POsG4.statusG4 =StatusG4.statusNoG4 WHERE poNoG4 = poNo;
		IF statusNo = 1 THEN 
			UPDATE POsG4
			SET statusG4 = 5
			WHERE poNoG4 = poNo;
		ELSEIF statusNo = 2 THEN 
			UPDATE POsG4
			SET statusG4 = 5
			WHERE poNoG4 = poNo;
		ELSEIF statusNo = 3 THEN 
			UPDATE POsG4
			SET statusG4 = 5
			WHERE poNoG4 = poNo;
		ELSEIF statusNo = 4 THEN 
			UPDATE POsG4
			SET statusG4 = 5
			WHERE poNoG4 = poNo;
            	-- posg4_AFTER_UPDATE_STATUS_REFUND trigger will do the refound money and restock qty in parts
       		ELSEIF statusNo = 5 THEN
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT='This purchurse order has already been canceled';
        END IF;
    END IF;
    -- COMMIT THE ENTIRE CHANGE.
    COMMIT;
END //
DELIMITER ;