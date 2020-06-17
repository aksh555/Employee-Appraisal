# Employee Appraisal Management
MEAN stack web app

## Features

- Management admin can Register/Login 
- Perform CRUD operations on Employee appraisal
- View dynamic charts using Chatjs library
- Generate employe appraisal report PDF through jspdf

## Setup
 - Clone the repository
 - Navigate to emp-frontend folder.
 - Run `npm install` to install dependencies.
 - Run `npm start` or `ng serve` to start the angular app.
 - Start the mongoDB server using `sudo systemctl start mongod`
 - Navigate to emp-backend folder.
 - Run `npm install` to install dependencies.
 - Run `npm start` or `node server.js` to start the server.
 - Open `http://localhost:4200` in the browser to use the app.
 
 To view the database contents, enter into mongodb shell using `mongo`. Switch to the database using `use employee` and finally `db.users.find().pretty()` and `db.employee.find().pretty()` to view admin and employee details.
