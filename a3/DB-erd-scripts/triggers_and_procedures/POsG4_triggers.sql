DELIMITER $$
CREATE TRIGGER TRG_PO_HISTORY_AFTER_INSERT_G4
AFTER INSERT ON POsG4
FOR EACH ROW
BEGIN
   	INSERT INTO `HistoryG4`(`poNoG4`,`statusNoG4`,`dateG4`) VALUES (NEW.poNoG4,NEW.statusG4 ,default);
END; $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER TRG_PO_HISTORY_AFTER_UPDATE_G4
AFTER UPDATE ON POsG4
FOR EACH ROW
BEGIN
   		INSERT INTO `HistoryG4`(`poNoG4`,`statusNoG4`,`dateG4`) VALUES (NEW.poNoG4,NEW.statusG4 ,default);
END; $$
DELIMITER ;

-- ------------------------------------------------------------------------------------------------------------
-- TEST
-- 1. run script : INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(100, 2, '2021-05-11 02:08:38', 1);
-- 2. check if there is a new row in POsG4 and HistoryG4 that matches the new entered info
-- 3. run script: UPDATE POsG4 SET statusG4 = 2 WHERE poNoG4 = 100;
-- 4. check if there is a new row in POsG4 and HistoryG4 that matches the new entered info

-- ------------------------------------------------------------------------------------------------------------