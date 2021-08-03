USE `G4`;

-- ClientG4 table --
INSERT INTO ClientG4 (`clientCompIdG4`, `clientCompNameG4`, `clientCityG4`, `clientCompPasswordG4`, `moneyOwedG4`) VALUES (1, 'Ford', 'Halifax', '12345', 10000);
INSERT INTO ClientG4 (`clientCompIdG4`, `clientCompNameG4`, `clientCityG4`, `clientCompPasswordG4`, `moneyOwedG4`) VALUES (2, 'Toyota', 'Toronto', 'abc123', 3.50);
INSERT INTO ClientG4 (`clientCompIdG4`, `clientCompNameG4`, `clientCityG4`, `clientCompPasswordG4`, `moneyOwedG4`) VALUES (3, 'Nissan', 'Vancouver', 'nitro', 1020.10);
INSERT INTO ClientG4 (`clientCompIdG4`, `clientCompNameG4`, `clientCityG4`, `clientCompPasswordG4`, `moneyOwedG4`) VALUES (4, 'Honda', 'Truro', 'cats', 300.10);
INSERT INTO ClientG4 (`clientCompIdG4`, `clientCompNameG4`, `clientCityG4`, `clientCompPasswordG4`, `moneyOwedG4`) VALUES (5, 'GMC', 'Boston', 'dogs', 9888.01);
INSERT INTO ClientG4 (`clientCompIdG4`, `clientCompNameG4`, `clientCityG4`, `clientCompPasswordG4`, `moneyOwedG4`) VALUES (6, 'Chevrolet', 'San Francisco', 'birds', 150.15);
INSERT INTO ClientG4 (`clientCompIdG4`, `clientCompNameG4`, `clientCityG4`, `clientCompPasswordG4`, `moneyOwedG4`) VALUES (7, 'Acura', 'Denver', 'trees', 9222.01);
INSERT INTO ClientG4 (`clientCompIdG4`, `clientCompNameG4`, `clientCityG4`, `clientCompPasswordG4`, `moneyOwedG4`) VALUES (8, 'Lexus', 'Dallas', 'chickens', 111.19);
INSERT INTO ClientG4 (`clientCompIdG4`, `clientCompNameG4`, `clientCityG4`, `clientCompPasswordG4`, `moneyOwedG4`) VALUES (9, 'Audi', 'Houston', 'plants', 200.10);
INSERT INTO ClientG4 (`clientCompIdG4`, `clientCompNameG4`, `clientCityG4`, `clientCompPasswordG4`, `moneyOwedG4`) VALUES (10, 'Bentley', 'New York', 'cars100', 1600);

-- PartsG4 table --
INSERT INTO PartsG4 (`partNoG4`, `partNameG4`, `partDescriptionG4`, `currentPriceG4`, `qtyG4`, `minQtyG4`, `reorderG4`) VALUES(1, 'Engine', 'The heart and soul of your vehicle is the internal combustion engine', '3789.99', 12, 5, 0);
INSERT INTO PartsG4 (`partNoG4`, `partNameG4`, `partDescriptionG4`, `currentPriceG4`, `qtyG4`, `minQtyG4`, `reorderG4`) VALUES(2, 'Transmission', 'The transmission is a gearbox filled with gears and gear trains that makes effective use of the engine’s torque to change the gears and power the vehicle', '2339.99', 5, 6, 1);
INSERT INTO PartsG4 (`partNoG4`, `partNameG4`, `partDescriptionG4`, `currentPriceG4`, `qtyG4`, `minQtyG4`, `reorderG4`) VALUES(3, 'Battery', 'The battery delivers the electricity needed to run your vehicle’s electrical components', '59.99', 35, 25, 0);
INSERT INTO PartsG4 (`partNoG4`, `partNameG4`, `partDescriptionG4`, `currentPriceG4`, `qtyG4`, `minQtyG4`, `reorderG4`) VALUES(4, 'Alternartor', 'Part of the electrical system, the alternator charges the battery and powers the electrical system while your car is running', '119.99', 48, 45, 0);
INSERT INTO PartsG4 (`partNoG4`, `partNameG4`, `partDescriptionG4`, `currentPriceG4`, `qtyG4`, `minQtyG4`, `reorderG4`) VALUES(5, 'Radiator', 'The radiator is responsible for helping the engine keep cool by removing heat from coolant before it is pumped back through the engine', '349.99', 8, 10, 1);
INSERT INTO PartsG4 (`partNoG4`, `partNameG4`, `partDescriptionG4`, `currentPriceG4`, `qtyG4`, `minQtyG4`, `reorderG4`) VALUES(6, 'Brakes', 'Found on all four wheels, your brakes are one of the most important safety systems on your vehicle', '79.99', 24, 15, 0);
INSERT INTO PartsG4 (`partNoG4`, `partNameG4`, `partDescriptionG4`, `currentPriceG4`, `qtyG4`, `minQtyG4`, `reorderG4`) VALUES(7, 'Muffler', 'Keeps the exhaust system quiet through the use of baffles or other materials that reduce or muffle the sound', '159.99', 19, 10, 0);
INSERT INTO PartsG4 (`partNoG4`, `partNameG4`, `partDescriptionG4`, `currentPriceG4`, `qtyG4`, `minQtyG4`, `reorderG4`) VALUES(8, 'Tailpipe', 'Carries exhaust fumes from the muffler to outside of the vehicle', '89.99', 32, 100, 1);
INSERT INTO PartsG4 (`partNoG4`, `partNameG4`, `partDescriptionG4`, `currentPriceG4`, `qtyG4`, `minQtyG4`, `reorderG4`) VALUES(9, 'Fuel Tank', 'Typically located before the rear axle, the fuel tank holds the gasoline that powers your vehicle', '129.99', 27, 25, 0);
INSERT INTO PartsG4 (`partNoG4`, `partNameG4`, `partDescriptionG4`, `currentPriceG4`, `qtyG4`, `minQtyG4`, `reorderG4`) VALUES(10, 'Front Axle', 'Part of the suspension system, the front axle is where the front wheel hubs are attached', '259.99', 13, 50, 1);

-- StatusG4 table --
INSERT INTO StatusG4 (`statusNoG4`, `statusDescriptionG4`) VALUES (1, 'Ordered');
INSERT INTO StatusG4 (`statusNoG4`, `statusDescriptionG4`) VALUES (2, 'Client paid. Preparing for shipment');
INSERT INTO StatusG4 (`statusNoG4`, `statusDescriptionG4`) VALUES (3, 'On the way');
INSERT INTO StatusG4 (`statusNoG4`, `statusDescriptionG4`) VALUES (4, 'Received');
INSERT INTO StatusG4 (`statusNoG4`, `statusDescriptionG4`) VALUES (5, 'Canceled');
INSERT INTO StatusG4 (`statusNoG4`, `statusDescriptionG4`) VALUES (6, 'Filled');


-- POsG4 table --
INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(1, 2, '2021-05-11 02:08:38', 1);
INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(2, 1, '2020-07-31 01:20:31', 1);
INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(3, 3, '2021-04-23 05:25:34', 4);
INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(4, 4, '2021-01-09 07:09:11', 3);
INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(5, 5, '2020-11-28 06:10:15', 2);
INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(6, 6, '2021-04-19 08:14:00', 1);
INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(7, 7, '2021-03-22 09:04:08', 2);
INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(8, 8, '2020-12-02 03:23:16', 4);
INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(9, 9, '2019-05-20 01:10:24', 5);
INSERT INTO POsG4 (`poNoG4`, `clientCompIdG4`, `datePOG4`, `statusG4`) VALUES(10, 10, '2021-05-09 10:15:01', 1);


-- POLinesG4 table --
INSERT INTO POLinesG4 (`lineNoG4`, `poNoG4`, `partNoG4`, `linePriceG4`, `qtyG4`) VALUES(1, 2, 3, 3789.99, 12);
INSERT INTO POLinesG4 (`lineNoG4`, `poNoG4`, `partNoG4`, `linePriceG4`, `qtyG4`) VALUES(2, 2, 1, 555.99, 6);
INSERT INTO POLinesG4 (`lineNoG4`, `poNoG4`, `partNoG4`, `linePriceG4`, `qtyG4`) VALUES(3, 5, 5, 111.99, 15);
INSERT INTO POLinesG4 (`lineNoG4`, `poNoG4`, `partNoG4`, `linePriceG4`, `qtyG4`) VALUES(4, 4, 3, 222.99, 719);
INSERT INTO POLinesG4 (`lineNoG4`, `poNoG4`, `partNoG4`, `linePriceG4`, `qtyG4`) VALUES(5, 1, 2, 333.99, 15);
INSERT INTO POLinesG4 (`lineNoG4`, `poNoG4`, `partNoG4`, `linePriceG4`, `qtyG4`) VALUES(6, 3, 7, 444.99, 12);
INSERT INTO POLinesG4 (`lineNoG4`, `poNoG4`, `partNoG4`, `linePriceG4`, `qtyG4`) VALUES(7, 2, 8, 555.99, 11);
INSERT INTO POLinesG4 (`lineNoG4`, `poNoG4`, `partNoG4`, `linePriceG4`, `qtyG4`) VALUES(8, 2, 9, 666.99, 50);
INSERT INTO POLinesG4 (`lineNoG4`, `poNoG4`, `partNoG4`, `linePriceG4`, `qtyG4`) VALUES(9, 7, 5, 777.99, 60);
INSERT INTO POLinesG4 (`lineNoG4`, `poNoG4`, `partNoG4`, `linePriceG4`, `qtyG4`) VALUES(10, 10, 8, 888.99, 80);

-- PaymentG4 table --
INSERT INTO PaymentG4 (`paymentNoG4`, `poNoG4`, `amountPaidG4`, `datePaidG4`) VALUES (1, 5, 111.9900, '2020-11-28 08:10:10');
INSERT INTO PaymentG4 (`paymentNoG4`, `poNoG4`, `amountPaidG4`, `datePaidG4`) VALUES (2, 7, 777.9900, '2021-03-22 10:04:00');


-- HistoryG4 table --
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(1,1,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(2,1,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(3,1,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(4,1,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(5,1,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(6,1,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(7,1,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(8,1,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(9,1,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(10,1,default);

INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(3,2,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(4,2,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(5,2,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(6,2,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(7,2,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(8,2,default);

INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(3,3,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(4,3,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(5,3,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(6,3,default);

INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(3,4,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(4,4,default);

INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(1,5,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(2,5,default);
INSERT INTO HistoryG4 (`poNoG4`,`statusNoG4`,`dateG4`)VALUES(8,5,default);

-- AgentsPasswordsG4 table --
INSERT INTO AgentsPasswordsG4 (`usernameG4`,`passwordG4`)VALUES('John','cats');
INSERT INTO AgentsPasswordsG4 (`usernameG4`,`passwordG4`)VALUES('Jane','dogs');

