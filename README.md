
  

#  CSCI4140-G4

  
  

CSCI 4140 Database Assignments

# A5


All assignment related files are in subfolder /a5.

A valid NodeJS installation is required to run the API server.

First, set up database:

1.  The database must first be initialized by running the A5-Create.sql and A5-InitialData.sql scripts within the [A5/DB-erd-scripts](https://git.cs.dal.ca/jcheung/csci4140-g4/-/tree/master/a5/DB-ERD-SCRIPT) folder.
    

2.  After database initialization, execute the trigger and procedure creation scripts found in the [/A5/DB-erd-scripts/triggers_and_procedures](https://git.cs.dal.ca/jcheung/csci4140-g4/-/tree/master/a5/DB-ERD-SCRIPT/triggers_and_procedures) folder.
    

Then, follow the instructions below to start the API server and the user interface:

3.  In the a5 folder, navigate to the WEBSERVICE subfolder and install the web server with npm install.
    

4.  Navigate to a5/WEBSERVICE/config/dbConfig and fill in your database information.
    

5.  Start the server by using npm start.
    

6.  The web server will proceed to run on port 8000.
    

7.  Navigate to the a5/UI  folder and install the UI using npm install
    

8.  Start the user interface by using npm start
    

9.  The user interface will be accessible on localhost:3000
  

#  A4

  
  
All UI and DB assignment related files are in subfolder /a4.

The updated API server related files are in the subfolder /a3.

A valid NodeJS installation is required to run the API server.

The database must first be initialized by running the A4-Create.sql and A4-InitialData-ModifiedForA3.sql scripts within the [a4/DB-erd-scripts](https://git.cs.dal.ca/jcheung/csci4140-g4/-/tree/master/a4/DB-erd-scripts) folder. After database initialization, execute the trigger and procedure creation scripts found in the [/a4/DB-erd-scripts/triggers_and_procedures](https://git.cs.dal.ca/jcheung/csci4140-g4/-/tree/master/a4/DB-erd-scripts/triggers_and_procedures) folder. Then, follow the instructions below to start the API server and the user interface:

1.  Navigate to the a3 folder and install the web server with npm install.
    

2.  Navigate to a3/config/dbConfig and fill in your database information.
    

3.  Start the server by using npm start (or: node a3/server.js).
    

4.  The web server will proceed to run on port 8000.
    

5.  Navigate to the a4 folder and install the UI using npm install
    

6.  Start the user interface by using npm start
    

7.  The user interface will be accessible on localhost:3000
  
  

#  A3

  
  

All assignment related files are in subfolder a3

  

The database must first be initialized by running the A3-Create.sql and A3-InitialData-ModifiedForA3.sql scripts within the [a3/DB-erd-scripts](https://git.cs.dal.ca/jcheung/csci4140-g4/-/tree/master/a3/DB-erd-scripts) folder. After database initialization, execute the trigger and stored procedure creation scripts found in the [a3/DB-erd-scripts/triggers_and_procedures](https://git.cs.dal.ca/jcheung/csci4140-g4/-/tree/master/a3/DB-erd-scripts/triggers_and_procedures) folder. Then, follow the instructions below to start the API server:

  

1.  Navigate to the a3 folder and install the application using `npm install`

  

2.  Navigate to a3/config/dbConfig and fill in your database information

  

3.  Start the server by using `npm start`

  

4.  The application will run on port 8000.

  

#  A2

  
  

All assignment related files are in subfolder a2

  

The database must first be initialized by running the A2-Create.sql and A2-InitialData.sql scripts within the [a2/DB-erd-scripts](https://git.cs.dal.ca/jcheung/csci4140-g4/-/tree/master/a2/DB-erd-scripts) folder. After database initialization, follow the instructions below to start the API server:

  

1.  Install the application using `npm install`

  

2.  Navigate to a2/config/dbConfig and fill in your database information

  

3.  Start the server by using `npm start`

  
  

#  A1

  
  

1.  Navigate to the folder a1

  

2.  Execute Create.sql to generate the database tables

  

3.  Execute Initialdata.sql to insert dummy values into the database

  

The ER Model file can be found in /a1/ER Model.mwb