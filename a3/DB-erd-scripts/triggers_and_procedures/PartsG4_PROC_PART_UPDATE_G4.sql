DELIMITER //
CREATE PROCEDURE `PROC_CHECK_QTY_G4`(IN inPartNoG4 INT(11), IN inPartNameG4 VARCHAR(255), IN inPartDescriptionG4 VARCHAR(255), IN inCurrentPriceG4 DECIMAL(19,4), IN inQtyG4 INT(11), inMinQtyG4 int(11))
BEGIN
	-- DECLARE THE VARIABLES FOR THE QUANTITY CALCULATION.
	DECLARE CURR_QTY INT;
	DECLARE MIN_QTY INT;
	-- DEFINE AN ERROR HANDLING. FIRST ROLLBACK THEN RETHROW THE ERROR TO THE REQUESTOR APPLICATION.
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING, NOT FOUND
    BEGIN
		ROLLBACK;
        RESIGNAL;
	END;
    -- TRANSACTION
	START TRANSACTION;
    IF ISNULL(inPartNameG4) OR ISNULL(inPartDescriptionG4) OR ISNULL(inCurrentPriceG4) OR ISNULL(inQtyG4) OR ISNULL(inMinQtyG4) THEN
		-- USER DEFINED ERROR (NULL VALUE IS NOT ACCEPTED).
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT='Null value is not accepted.';
    ELSEIF (SIGN(inQtyG4) < 0) OR (SIGN(inMinQtyG4) < 0) THEN
		-- USER DEFINED ERROR (QTY OR MINQTY CANNOT BE LESS THAN ZERO).
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT='QTY and minQTY cannot be less than zero.';
    ELSE
    -- UPDATE THE INFORMATION IN THE PARTSG4 TABLE.
    UPDATE PartsG4 SET partNameG4=inPartNameG4, partDescriptionG4=inPartDescriptionG4,
			currentPriceG4=inCurrentPriceG4, qtyG4=inQtyG4, minQtyG4=inMinQtyG4 WHERE partNoG4=inPartNoG4;

	-- RECALCULATE AND UPDATE THE REORDER FLAG.
	SELECT qtyG4 INTO CURR_QTY FROM PartsG4 WHERE partNoG4 = inPartNoG4;
	SELECT minQtyG4 INTO MIN_QTY FROM PartsG4 WHERE partNoG4 = inPartNoG4;
   	IF (CURR_QTY < MIN_QTY) THEN
		-- MARK THE PART TO BE REORDERED SINCE THE CURRENT QUANTITY IS BELOW THE MANDATORY THRESHOLD.
		UPDATE PartsG4 SET reorderG4 = 1 WHERE partNoG4 = inPartNoG4;
	ELSE
		-- MARK THE PART NOT TO BE REORDERED.
		UPDATE PartsG4 SET reorderG4 = 0 WHERE partNoG4 = inPartNoG4;
	END IF;
	-- RETURN THE UPDATED INFORMATION BACK TO THE REQUESTOR.
	SELECT * FROM PartsG4 WHERE partNoG4=inPartNoG4;
    END IF;
    -- COMMIT THE ENTIRE CHANGE.
    COMMIT;
END //
DELIMITER ;
