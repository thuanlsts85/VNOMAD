

##Project Name
================

This project is built based on instructions from Software Engineering: Process & Tools course in order to develop a online appointment booking can be used for multiple businesses. It contains a fullstack web application with appropriate technologies, processes and tools. 
<img src="https://xbsoftware.com/wp-content/uploads/2019/12/online-appointment-scheduling-system-for-salons-main-update.png">
## Features 
The system can be flexible for diverse businesses such as dentist, hair spa, etc.
* Booking a time slot for an appointment 
* Input personal details as contact, address, email
* Display bookings with relevent details
* Able to retrive stored information
* Tracking booking'status
* Registration
* Signin and Signout

## Tools 
- Back-end: 
  - Spring MVC 4
  - Hibernate 4.3.6.Final
  - PostgresSQL 9.4.1211
- Front-end: 
  - HTML
  - CSS
  - ReactJS
  - JavaScript 
 - Build tools: 
  - Maven version 3.6.3
 - Unit test: 
  - Junit 4 or 5
  
## Installation
The project run on local server; therefore it is neccessary to follow some steps to install the system on local server:
- You need to have PostgresSQL, Maven, Java, npm installed 
- Create a new Postgres database 
- Rename jdbc on "App.config" with your new database and change username and passowrd
- For back-end: 
  - Run the project with Maven build in terminal:
  ```
  mvn clean install
  ```
 - Start jetty server: 
   ```
   mvn jetty:run
   ```
 - Front-end: 
   - Make sure that you have node.js and npm
   - cd resource/sept-front
   - run App.js in terminal
   ```
   npm install
  
   npm start
   ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request 

## History

- Three version up to now with following tags:
  - v1.1
  - v1.1
  - v2.0 
  - v3.0 (the lastest)


## Credits

- Group 7: 
  - Nguyen Quang Linh 3007
  - Nguyen Thanh Dat
  - Doan Son Lam
  - Mai Viet Cuong



