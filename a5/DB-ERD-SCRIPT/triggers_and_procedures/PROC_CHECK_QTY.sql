DELIMITER //
CREATE PROCEDURE `PROC_CHECK_QTY_G4`(IN inPONo INT(11), IN inReq VARCHAR(255))

BEGIN
	-- DECLARE THE VARIABLES FOR THE QUANTITY CALCULATION.
	DECLARE CURR_QTY INT;
	DECLARE MIN_QTY INT;
    DECLARE PARTNO INT;
    DECLARE ORDER_QTY INT;
    DECLARE POLINESNO INT;
    DECLARE done INT DEFAULT 0;
    DECLARE MY_CURSOR CURSOR FOR SELECT lineNoG4 FROM POLinesG4 WHERE poNoG4 = inPONo;
-- DEFINE AN ERROR HANDLING. FIRST ROLLBACK THEN RETHROW THE ERROR TO THE REQUESTER APPLICATION.
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    -- TRANSACTION
    START TRANSACTION;
    SET @COMMITPROMPT = 0;
	-- CURSOR CHECK QTY.
    OPEN MY_CURSOR;
    checker: LOOP
    	FETCH NEXT FROM MY_CURSOR INTO POLINESNO;
        IF done = 1 THEN
        	LEAVE checker;
        END IF;
    	-- Do something with poLineNo here
        SELECT qtyG4 INTO ORDER_QTY FROM POLinesG4 WHERE lineNoG4 = POLINESNO;
        SELECT partNoG4 INTO PARTNO FROM POLinesG4 WHERE lineNoG4 = POLINESNO;
        SELECT qtyG4 INTO CURR_QTY FROM PartsG4 WHERE partNoG4 = PARTNO;
        SELECT minQtyG4 INTO MIN_QTY FROM PartsG4 WHERE partNoG4 = PARTNO;
        IF (CURR_QTY >= ORDER_QTY) THEN
            -- update new qty.
            UPDATE PartsG4 SET qtyG4 = CURR_QTY - ORDER_QTY WHERE partNoG4 = PARTNO;
			IF ((CURR_QTY - ORDER_QTY) < MIN_QTY) THEN
				UPDATE PartsG4 SET reorderG4 = 1 WHERE partNoG4 = PARTNO;
			END IF;
        ELSE
        	SET @COMMITPROMPT = 1;
            ROLLBACK;
        END IF;
    END LOOP checker;
    CLOSE MY_CURSOR;

-- decide to rollback or commit
    IF(STRCMP(inReq, 'ROLLBACK') = 0) THEN
        ROLLBACK;
        SET @COMMITPROMPT = 2;
        SELECT @COMMITPROMPT;
    ELSEIF(STRCMP(inReq, 'COMMIT') = 0) THEN
        COMMIT;
        UPDATE POsG4 SET statusG4 = 6 WHERE poNoG4 = inPONo;
        SET @COMMITPROMPT = 2;
        SELECT @COMMITPROMPT;
    ELSEIF(STRCMP(inReq, 'CHECK') != 0) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT='Null value is not accepted.';
    ELSE
    	ROLLBACK;
        SELECT @COMMITPROMPT;
    END IF;

END //
DELIMITER ;